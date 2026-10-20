const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(()=>chromium.launch());
  const svg = require('fs').readFileSync(process.argv[2], 'utf8');
  for (const [w, name] of [[760, 'desktop'], [354, 'phone']]) {
    const p = await b.newPage({ viewport: { width: w + 40, height: 800 }, deviceScaleFactor: 2 });
    await p.setContent(`<body style="margin:20px;background:#fff"><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" style="width:${w}px;display:block"></body>`);
    await p.waitForTimeout(300);
    await p.locator('img').screenshot({ path: `${process.argv[3]||"sample"}-${name}.png` });
    await p.close();
  }
  await b.close();
})();
