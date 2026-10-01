/**
 * Cloudflare Worker in front of the static site. Every request goes straight to
 * the static assets except POST /api/lead, which emails each form submission to
 * the sales inbox through Cloudflare Email Routing (send_email binding).
 *
 * Setup (once, in the Cloudflare dashboard → uiuxdesignservices.us → Email → Email Routing):
 *   1. Enable Email Routing for the domain.
 *   2. Destination addresses: add and verify every address in LEAD_RECIPIENTS.
 */
import { EmailMessage } from "cloudflare:email";

type SendEmail = { send(message: EmailMessage): Promise<void> };
type Env = { ASSETS: { fetch(request: Request): Promise<Response> }; LEADS?: SendEmail };

export const LEAD_RECIPIENTS = ["umar.sarwar@corp.tkxel.com", "rizwan.siddiqui@tkxel.com"];
const FROM = "leads@uiuxdesignservices.us";
const SITE = "uiuxdesignservices.us";

const FIELDS: [key: string, label: string][] = [
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["job_title", "Job title"],
  ["interest", "Service"],
  ["description", "Project details"],
  ["marketing_consent", "Marketing emails"],
  ["source", "Form"],
  ["page", "Page"],
];

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max = 3000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (s: string) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(s);

function b64(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin).replace(/.{76}/g, "$&\r\n");
}
const header = (s: string) => `=?UTF-8?B?${b64(s).replace(/\r\n/g, "")}?=`;

const isChecklist = (lead: Record<string, string>) => /checklist|lead-magnet/i.test(lead.source);

function emailHtml(lead: Record<string, string>, received: string) {
  const name = lead.name || lead.email;
  const checklist = isChecklist(lead);
  const rows = FIELDS.filter(([k]) => lead[k])
    .map(([k, label]) => {
      let v = esc(lead[k]).replace(/\n/g, "<br>");
      if (k === "email") v = `<a href="mailto:${esc(lead.email)}" style="color:#E2225F;text-decoration:none">${v}</a>`;
      if (k === "phone") v = `<a href="tel:${esc(lead.phone.replace(/[^\d+]/g, ""))}" style="color:#E2225F;text-decoration:none">${v}</a>`;
      if (k === "page") v = `<a href="${esc(lead.page)}" style="color:#E2225F;text-decoration:none;word-break:break-all">${v}</a>`;
      return `<tr><td style="padding:14px 0;border-bottom:1px solid #EFEDF2;width:150px;vertical-align:top;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#8A8790;font-family:'IBM Plex Mono',Menlo,monospace">${label}</td><td style="padding:14px 0;border-bottom:1px solid #EFEDF2;vertical-align:top;font-size:15px;line-height:1.55;color:#020101">${v}</td></tr>`;
    })
    .join("");
  const replySubject = checklist ? "Your UI UX Design Readiness Checklist" : `Your ${lead.interest || "UI UX design"} enquiry`;
  const replyLabel = checklist ? "Send the checklist" : `Reply to ${esc(name)}`;
  const reply = lead.email && isEmail(lead.email)
    ? `<tr><td style="padding:28px 0 4px"><a href="mailto:${esc(lead.email)}?subject=${encodeURIComponent(replySubject)}" style="display:inline-block;background:#E2225F;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 28px;border-radius:999px;white-space:nowrap">${replyLabel}</a></td></tr>`
    : "";
  return `<!doctype html><html><body style="margin:0;padding:0;background:#F5F4F7;font-family:Manrope,'Segoe UI',Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F4F7;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
  <tr><td style="background:#020101;border-radius:20px 20px 0 0;padding:26px 32px">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="width:34px;height:34px;background:#E2225F;border-radius:10px;text-align:center;vertical-align:middle;color:#fff;font-weight:800;font-size:18px">U</td>
      <td style="padding-left:10px;color:#fff;font-size:20px;letter-spacing:-.02em"><b>uiux</b> design</td>
    </tr></table>
  </td></tr>
  <tr><td style="background:#ffffff;padding:36px 32px 32px;border-radius:0 0 20px 20px">
    <p style="margin:0 0 10px;font-family:'IBM Plex Mono',Menlo,monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E2225F">${checklist ? "Checklist request" : "New lead"}</p>
    <h1 style="margin:0 0 6px;font-size:26px;line-height:1.25;letter-spacing:-.02em;color:#020101">${checklist ? `${esc(name)} requested the UI UX Design Readiness Checklist` : `${esc(name)}${lead.interest ? ` wants to talk about ${esc(lead.interest)}` : " sent a message"}`}</h1>${checklist ? `<p style="margin:0 0 12px;padding:12px 16px;background:#FFF0F4;border-radius:12px;font-size:14px;line-height:1.5;color:#020101"><b>Action:</b> email the checklist to this person within one business day.</p>` : ""}
    <p style="margin:0 0 20px;font-size:14px;color:#8A8790">${esc(received)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #EFEDF2">${rows}${reply}</table>
  </td></tr>
  <tr><td style="padding:20px 32px;text-align:center;font-size:12px;line-height:1.6;color:#8A8790">Sent from the ${esc(lead.source || "website")} form on <a href="https://${SITE}/" style="color:#8A8790">${SITE}</a>.<br>Reply to this email to answer the lead directly.</td></tr>
</table></td></tr></table></body></html>`;
}

function emailText(lead: Record<string, string>, received: string) {
  return [`New lead from ${SITE}`, received, "", ...FIELDS.filter(([k]) => lead[k]).map(([k, label]) => `${label}: ${lead[k]}`)].join("\n");
}

function mime(to: string, lead: Record<string, string>) {
  const received = new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" }) + " ET";
  const boundary = `b_${crypto.randomUUID()}`;
  const name = lead.name || lead.email || "Website visitor";
  const subject = isChecklist(lead) ? `Checklist request: ${lead.email}` : `New lead: ${name}${lead.interest ? ` · ${lead.interest}` : ""}`;
  return [
    `From: ${header("uiux design · Leads")} <${FROM}>`,
    `To: <${to}>`,
    ...(lead.email && isEmail(lead.email) ? [`Reply-To: ${header(name)} <${lead.email}>`] : []),
    `Subject: ${header(subject)}`,
    `Message-ID: <${crypto.randomUUID()}@${SITE}>`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    b64(emailText(lead, received)),
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    b64(emailHtml(lead, received)),
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

async function handleLead(request: Request, env: Env) {
  if (request.method !== "POST") return json(405, { ok: false, error: "Method not allowed" });
  const origin = request.headers.get("origin") ?? "";
  if (origin && !/uiuxdesignservices\.us$|\.workers\.dev$|localhost(:\d+)?$/.test(new URL(origin).host)) return json(403, { ok: false });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }
  if (clean(body.company_website)) return json(200, { ok: true }); // honeypot

  const lead: Record<string, string> = {};
  for (const [k] of FIELDS) lead[k] = clean(body[k]);
  if (!lead.name) lead.name = [clean(body.first_name, 100), clean(body.last_name, 100)].filter(Boolean).join(" ");
  if (lead.marketing_consent) lead.marketing_consent = "Yes";
  if (!isEmail(lead.email)) return json(422, { ok: false, error: "A valid email is required" });
  if (!env.LEADS) return json(503, { ok: false, error: "Email is not configured" });

  const results = await Promise.allSettled(LEAD_RECIPIENTS.map((to) => env.LEADS!.send(new EmailMessage(FROM, to, mime(to, lead)))));
  const sent = results.filter((r) => r.status === "fulfilled").length;
  results.forEach((r, i) => r.status === "rejected" && console.error(`lead email to ${LEAD_RECIPIENTS[i]} failed:`, r.reason));
  return sent ? json(200, { ok: true }) : json(502, { ok: false, error: "Email could not be sent" });
}

const worker = {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/lead" || url.pathname === "/api/lead/") return handleLead(request, env);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
