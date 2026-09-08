/**
 * End-to-end smoke test against a running server (npm start on :3000).
 * Walks the paths a real member takes: register -> post a critique thread with
 * a photo -> read back the EXIF -> reply -> critique -> vote.
 *
 *   npm run build && npm start &   # then:
 *   npm run check:e2e
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3000";
const stamp = Date.now().toString(36);
const USER = {
  username: `tester${stamp}`,
  email: `tester${stamp}@example.com`,
  password: "password123",
};

const failures: string[] = [];
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(name);
}

async function makeTestJpeg(): Promise<string> {
  const buffer = await sharp({
    create: { width: 2400, height: 1600, channels: 3, background: { r: 120, g: 60, b: 40 } },
  })
    .withExif({
      IFD0: { Make: "FUJIFILM", Model: "X100VI" },
      IFD2: {
        LensModel: "XF23mmF1.4 R LM WR",
        FocalLength: "23",
        FNumber: "2",
        ExposureTime: "0.004",
        ISOSpeedRatings: "1600",
        DateTimeOriginal: "2026:05:02 21:10:00",
      },
    })
    .jpeg()
    .toBuffer();
  const file = path.join(os.tmpdir(), `e2e-${stamp}.jpg`);
  await writeFile(file, buffer);
  return file;
}

async function main() {
  const imagePath = await makeTestJpeg();
  // PLAYWRIGHT_BROWSERS_PATH points at the preinstalled Chromium in CI images;
  // fall back to Playwright's own resolution locally.
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);

  // --- register ------------------------------------------------------------
  await page.goto(`${BASE}/register`);
  await page.fill("#username", USER.username);
  await page.fill("#reg-email", USER.email);
  await page.fill("#reg-password", USER.password);
  await page.locator('main form button[type="submit"]').first().click();
  await page.waitForURL(`${BASE}/`, { timeout: 20000 });
  check("register + auto sign-in", await page.locator('a[href^="/u/"]').first().isVisible());

  // --- create a critique thread with a photo -------------------------------
  await page.goto(`${BASE}/new`);
  await page.locator('input[value="CRITIQUE"]').click({ force: true });
  await page.selectOption("#categoryId", { label: "Photo critique" });
  const title = `E2E critique request ${stamp}`;
  await page.fill("#title", title);
  await page.fill("#body", "Automated smoke test thread. Checking that the upload pipeline reads EXIF and the critique panel renders.");
  await page.fill("#tags", "e2e, street");
  await page.setInputFiles('input[type="file"]', imagePath);
  await page.locator('main form button[type="submit"]').last().click();
  await page.waitForURL(/\/t\//, { timeout: 40000 });
  check("create thread with photo", page.url().includes("/t/"));

  const threadUrl = page.url();
  // The redirect lands via a client-side RSC navigation; reload so the assertions
  // read the fully rendered document rather than a still-streaming one.
  await page.goto(threadUrl, { waitUntil: "networkidle" });
  const bodyText = await page.locator("body").innerText();
  check("EXIF camera shown", bodyText.includes("X100VI") || bodyText.includes("Fujifilm X100VI"), "camera line");
  check("EXIF exposure shown", bodyText.includes("f/2") && bodyText.includes("ISO 1600"), "exposure line");
  check("gear auto-linked", (await page.locator('a[href="/gear/fujifilm-x100vi"]').count()) > 0);
  // On your own photo the panel must appear but refuse a self-critique.
  check(
    "critique panel present, self-critique blocked",
    bodyText.includes("Critique") && bodyText.includes("can't critique it"),
  );

  // --- reply ---------------------------------------------------------------
  await page.fill('textarea[name="body"]', "Automated reply from the smoke test.");
  await page.locator('main form:has(textarea[name="body"]) button[type="submit"]').last().click();
  await page.waitForTimeout(3000);
  await page.goto(threadUrl);
  check("reply posted", (await page.locator("body").innerText()).includes("Automated reply from the smoke test."));

  // --- vote ----------------------------------------------------------------
  const before = Number((await page.locator('[aria-live="polite"]').first().innerText()).trim());
  await page.locator('button[aria-label="Upvote"]').first().click();
  await page.waitForTimeout(2500);
  const after = Number((await page.locator('[aria-live="polite"]').first().innerText()).trim());
  check("upvote registers", after === before + 1, `${before} -> ${after}`);

  // --- critique on someone else's photo ------------------------------------
  await page.goto(`${BASE}/c/critique`);
  const otherThread = page.locator('h2 a[href^="/t/"]').filter({ hasNotText: title }).first();
  await otherThread.click();
  await page.waitForLoadState("networkidle");
  const writeLink = page.getByRole("button", { name: /Write a critique/ }).first();
  if (await writeLink.count()) {
    await writeLink.click();
    for (const dim of ["composition", "lighting", "editing"]) {
      await page.locator(`input[name="${dim}"][value="4"]`).first().click({ force: true });
    }
    await page.fill('textarea[name="comment"]', "Automated critique: the frame reads well but the horizon line needs a degree of rotation to settle.");
    await page.locator('main form:has(textarea[name="comment"]) button[type="submit"]').first().click();
    await page.waitForTimeout(3000);
    check("critique submitted", (await page.locator("body").innerText()).includes("Automated critique"));
  } else {
    check("critique form reachable", false, "no critique button found");
  }

  // --- gear page picks up the new photo ------------------------------------
  await page.goto(`${BASE}/gear/fujifilm-x100vi`);
  const gearText = await page.locator("body").innerText();
  check("gear page lists sample photos", !gearText.includes("No photos shot with this yet"));

  // --- search finds the thread ---------------------------------------------
  await page.goto(`${BASE}/search?q=${encodeURIComponent(stamp)}`);
  check("search finds new thread", (await page.locator("body").innerText()).includes(title));

  // --- sign out -------------------------------------------------------------
  await page.goto(`${BASE}/`);
  await page.getByRole("button", { name: "Sign out" }).click();
  await page.waitForTimeout(2000);
  check("sign out", (await page.locator("body").innerText()).includes("Join"));

  await browser.close();

  console.log(failures.length === 0 ? "\nAll smoke checks passed." : `\n${failures.length} check(s) failed: ${failures.join(", ")}`);
  process.exit(failures.length === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
