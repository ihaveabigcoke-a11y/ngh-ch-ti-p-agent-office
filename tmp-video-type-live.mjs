import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local';
const require=createRequire(root+'/package.json'),{chromium}=require('./desktop/node_modules/playwright');
const out=root+'/outputs/M-20261114-video-type-live';await mkdir(out,{recursive:true});
const baseline=JSON.parse(await readFile(root+'/outputs/M-20261114-muse-flow-live/baseline.json','utf8'));
const browser=await chromium.connectOverCDP('http://127.0.0.1:9238');
try {
 const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('http://127.0.0.1'));
 assert.ok(page,'Hermes renderer must be open');await page.waitForFunction(()=>!!window.productLabDesktop);
 const mode=process.argv[2]??'status';
 if(mode==='recover'){
  const started=await page.evaluate(async projectId=>{
   const s=await window.productLabDesktop.status();if(s.musePaused||s.active)throw Error('Muse must be enabled and idle');
   const job=s.jobs.find(j=>j.request.projectId===projectId&&j.state==='needs_attention'&&j.providerId&&j.failureCode!=='MUSE_NO_MEDIA');
   if(!job)return {found:false};
   await window.productLabDesktop.resume({id:job.id,recoverExisting:true});return {found:true,existingReceiptOnly:true};
  },baseline.projectId);console.log(JSON.stringify(started));
 }
 const result=await page.evaluate(async baseline=>{
  const s=await window.productLabDesktop.status(),rows=(await(await fetch('/api/lab')).json()).records;
  const hash=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(value))))).map(v=>v.toString(16).padStart(2,'0')).join('');
  const oldRecords=await Promise.all(baseline.records.filter(r=>r.id!==baseline.projectId).map(async b=>{const r=rows.find(r=>r.id===b.id);return !!r&&(await hash(r))===b.hash;}));
  const oldJobs=await Promise.all(baseline.jobs.map(async b=>{const j=s.jobs.find(j=>j.id===b.id);return !!j&&(await hash(j))===b.hash;}));
  const jobs=s.jobs.filter(j=>j.request.projectId===baseline.projectId),project=rows.find(r=>r.id===baseline.projectId);
  return {at:new Date().toISOString(),musePaused:s.musePaused,generationReady:s.generationReady,active:s.active,nightStopped:s.museNight.stopped,submittedSinceBaseline:s.museNight.submitted-baseline.submitted,
   oldRecords:oldRecords.length,oldRecordsUnchanged:oldRecords.every(Boolean),oldJobs:oldJobs.length,oldJobsUnchanged:oldJobs.every(Boolean),
   jobs:jobs.map(j=>({scene:j.request.sceneId,state:j.state,failureCode:j.failureCode??null,hasReceipt:!!j.providerId,hasOutput:!!j.output,documentResponse:/\b(?:MD|PDF|prompt pack|prompts)\b/i.test(j.providerResponse??''),regionMentioned:/country|region/i.test(j.providerResponse??''),refusalMentioned:/cannot|could not|not available|unavailable|unable|isn't available/i.test(j.providerResponse??'')})),
   clips:jobs.filter(j=>j.state==='ready'&&j.importedAt).length,exports:(project?.data.exports??[]).filter(e=>e.kind==='render').length};
 },baseline);
 await writeFile(out+'/'+mode+'-result.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 assert.equal(result.musePaused,false);assert.equal(result.oldRecordsUnchanged,true);assert.equal(result.oldJobsUnchanged,true);
 if(mode==='capture'){
  assert.equal(result.active,0);assert.equal(result.jobs.filter(j=>j.failureCode==='MUSE_NO_MEDIA').length,2);
  const origin=new URL(page.url()).origin;
  for(const view of ['production','accounts']){
   await page.goto(origin+'/?view='+view+'&product='+encodeURIComponent(baseline.productId));await page.waitForTimeout(1500);
   for(const [width,height] of [[1366,768],[1920,1080]]){
    await page.setViewportSize({width,height});await page.waitForTimeout(300);
    const target=view==='accounts'?page.getByRole('region',{name:'Công tắc Muse'}):page.locator('[data-screen=video]');
    await target.screenshot({path:out+'/'+view+'-'+width+'.png'});
   }
  }
  await page.goto(origin+'/?view=production&product='+encodeURIComponent(baseline.productId));
  const session=await page.context().newCDPSession(page);await session.send('Emulation.clearDeviceMetricsOverride');await session.detach();
 }
}finally{await browser.close();} // CDP disconnect only; never closes the user's Electron app.
