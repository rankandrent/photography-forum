/* eslint-disable @typescript-eslint/no-require-imports -- standalone Node helper for the visual designer, not app code */
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(()=>chromium.launch());
  const p = await b.newPage({ viewport: { width: 1300, height: 900 } });
  await p.setContent('<body style="margin:0">'+require('fs').readFileSync(process.argv[2],'utf8')+'</body>');
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    const svg=document.querySelector('svg'); const out=[];
    const R=(el)=>{const b=el.getBBox(); const m=el.getCTM(); const pt=svg.createSVGPoint(); pt.x=b.x;pt.y=b.y; const a=pt.matrixTransform(m); return {x:+a.x.toFixed(1),y:+a.y.toFixed(1),w:+b.width.toFixed(1),h:+b.height.toFixed(1)};};
    const cards=[...svg.children].filter(g=>g.tagName==='g'&&/translate\(\d+ 152\)/.test(g.getAttribute('transform')||''));
    for(const g of cards){
      const card=R(g.children[0]), stage=R(g.children[1]);
      const devs=[...g.querySelectorAll(':scope > g[filter="url(#dev)"], :scope > g > g[filter]')];
      const d=devs.length?devs.map(R):[];
      const dx0=Math.min(...d.map(v=>v.x)), dy0=Math.min(...d.map(v=>v.y)), dx1=Math.max(...d.map(v=>v.x+v.w)), dy1=Math.max(...d.map(v=>v.y+v.h));
      const texts=[...g.querySelectorAll(':scope > text')].map(t=>({c:t.getAttribute('class'),t:t.textContent,...R(t)}));
      const line=[...g.querySelectorAll(':scope > line')].map(R).pop();
      out.push({cardX:card.x,cardW:card.w,cardBottom:card.y+card.h,stage:[stage.x-card.x,stage.y-card.y,stage.w,stage.h],
        devCenterOffset:[+(((dx0+dx1)/2)-(stage.x+stage.w/2)).toFixed(1), +(((dy0+dy1)/2)-(stage.y+stage.h/2)).toFixed(1)],
        labGapFromStage:+(texts[0].y-(stage.y+stage.h)).toFixed(1),
        rows:texts.map(t=>`${t.c}:${(t.y-card.y).toFixed(1)}-${(t.y+t.h-card.y).toFixed(1)} r=${(card.x+card.w-(t.x+t.w)).toFixed(1)}`),
        divider:line?+(line.y-card.y).toFixed(1):null, bottomPad:+(card.y+card.h-Math.max(...texts.map(t=>t.y+t.h))).toFixed(1)});
    }
    return out;
  });
  console.log(JSON.stringify(r,null,1)); await b.close();
})();
