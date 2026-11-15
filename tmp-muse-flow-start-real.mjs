import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local',out=root+'/outputs/M-20261114-muse-flow-live';
const require=createRequire(root+'/package.json'),{chromium}=require('./desktop/node_modules/playwright');
const browser=await chromium.connectOverCDP('http://127.0.0.1:9238');
try{
 const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('http://127.0.0.1'));assert.ok(page);
 const preflight=await page.evaluate(async()=>{
  const api=window.productLabDesktop,before=await api.status();if(before.musePaused||before.active||before.museNight.stopped)throw Error('Muse chưa sẵn sàng hoặc đang bận. Không đổi công tắc.');
  const profile=before.profiles.find(p=>p.enabled);if(!profile)throw Error('Không có hồ sơ đang bật.');
  await api.checkProfile({id:profile.id});
  const after=await api.status(),checked=after.profiles.find(p=>p.id===profile.id);
  return {musePaused:after.musePaused,active:after.active,health:checked.health,quotaState:checked.quota?.state,night:after.museNight};
 });
 console.log(JSON.stringify({preflight}));
 assert.equal(preflight.musePaused,false);assert.equal(preflight.health,'ready');assert.equal(preflight.quotaState,'available');
 const baseline=await page.evaluate(async()=>{
  const rows=(await(await fetch('/api/lab')).json()).records,s=await window.productLabDesktop.status();
  const hash=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(v))))).map(v=>v.toString(16).padStart(2,'0')).join('');
  const product=rows.find(r=>r.kind==='product'&&/OKSBS-001/i.test(r.data.name));if(!product)throw Error('Không thấy sản phẩm trong ảnh');
  const project=rows.filter(r=>r.kind==='production'&&r.data.productId===product.id&&r.data.productRevision===product.revision).sort((a,b)=>b.updatedAt-a.updatedAt)[0];
  if(!project||project.data.scenes.length!==5||project.data.exports.length)throw Error('Dự án khác trạng thái đã kiểm');
  return {productId:product.id,projectId:project.id,submitted:s.museNight.submitted,records:await Promise.all(rows.map(async r=>({id:r.id,hash:await hash(r)}))),jobs:await Promise.all(s.jobs.map(async j=>({id:j.id,hash:await hash(j)})))};
 });
 await writeFile(out+'/baseline.json',JSON.stringify(baseline));
 await page.goto(new URL('/?view=production&product='+encodeURIComponent(baseline.productId),page.url()).href);
 await page.locator('[data-screen=video]').waitFor();
 assert.equal(await page.locator('select[aria-label="Sản phẩm"]').inputValue(),baseline.productId);
 await page.getByRole('button',{name:'Làm video',exact:true}).click();
 await page.waitForTimeout(1500);
 const start=await page.evaluate(async projectId=>{const s=await window.productLabDesktop.status();return {musePaused:s.musePaused,active:s.active,submitted:s.museNight.submitted,stopped:s.museNight.stopped,jobs:s.jobs.filter(j=>j.request.projectId===projectId).map(j=>({sceneId:j.request.sceneId,state:j.state,failureCode:j.failureCode??null})),ui:document.querySelector('[data-screen=video] [role=alert]')?.textContent??null};},baseline.projectId);
 await writeFile(out+'/start.json',JSON.stringify({at:new Date().toISOString(),preflight,start},null,2));console.log(JSON.stringify({start}));
}finally{await browser.close();}
