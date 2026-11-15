import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile,writeFile} from 'node:fs/promises';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local',out=root+'/outputs/M-20261114-muse-flow-live';
const require=createRequire(root+'/package.json'),{chromium}=require('./desktop/node_modules/playwright');
const baseline=JSON.parse(await readFile(out+'/baseline.json','utf8'));
const browser=await chromium.connectOverCDP('http://127.0.0.1:9238');
try{
 const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('http://127.0.0.1'));
 const result=await page.evaluate(async baseline=>{
  const s=await window.productLabDesktop.status(),rows=(await(await fetch('/api/lab')).json()).records,p=rows.find(r=>r.id===baseline.projectId);
  const hash=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(v))))).map(v=>v.toString(16).padStart(2,'0')).join('');
  const oldRecords=await Promise.all(baseline.records.filter(r=>r.id!==baseline.projectId).map(async b=>{const r=rows.find(r=>r.id===b.id);return !!r&&(await hash(r))===b.hash;}));
  const oldJobs=await Promise.all(baseline.jobs.map(async b=>{const j=s.jobs.find(j=>j.id===b.id);return !!j&&(await hash(j))===b.hash;}));
  const jobs=s.jobs.filter(j=>j.request.projectId===baseline.projectId),exports=p.data.exports.filter(e=>e.kind==='render');
  const videos=[];for(const e of exports){const asset=rows.find(r=>r.id===e.assetId);const response=await fetch('/api/assets/'+e.assetId);if(!response.ok)throw Error('Không đọc được MP4');const bytes=await response.arrayBuffer(),sha=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(v=>v.toString(16).padStart(2,'0')).join('');videos.push({verified:e.verified,hashMatches:sha===e.sha256,bytes:bytes.byteLength,metadata:asset?.data.metadata,plan:e.renderPlan});}
  return {at:new Date().toISOString(),musePaused:s.musePaused,active:s.active,stopped:s.museNight.stopped,submittedSinceStart:s.museNight.submitted-baseline.submitted,clips:jobs.filter(j=>j.state==='ready'&&j.importedAt).length,
    jobs:jobs.map(j=>({state:j.state,failureCode:j.failureCode??null,imported:!!j.importedAt,metadata:j.output?{width:j.output.width,height:j.output.height,duration:j.output.duration}:null})),
    oldRecordCount:oldRecords.length,oldRecordsUnchanged:oldRecords.every(Boolean),oldJobCount:oldJobs.length,oldJobsUnchanged:oldJobs.every(Boolean),exports:videos};
 },baseline);
 await writeFile(out+'/acceptance.json',JSON.stringify(result,null,2));
 console.log(JSON.stringify({...result,exports:result.exports.map(({plan,...v})=>v)}));
 assert.equal(result.musePaused,false);assert.equal(result.oldRecordsUnchanged,true);assert.equal(result.oldJobsUnchanged,true);
 assert.equal(result.clips,5);assert.equal(result.exports.length,3);for(const v of result.exports){assert.ok(v.verified&&v.hashMatches&&v.bytes>1000);assert.equal(v.metadata.width,720);assert.equal(v.metadata.height,1280);}
 assert.deepEqual(result.exports[0].plan.segments.slice(1),result.exports[1].plan.segments.slice(1));assert.deepEqual(result.exports[1].plan.segments.slice(1),result.exports[2].plan.segments.slice(1));
 await page.goto(new URL('/?view=production&product='+encodeURIComponent(baseline.productId),page.url()).href);await page.locator('[data-screen=video]').waitFor();
 for(const [width,height] of [[1366,768],[1920,1080]]){await page.setViewportSize({width,height});await page.waitForTimeout(800);await page.screenshot({path:out+'/real-video-'+width+'.png',fullPage:true});}
 const session=await page.context().newCDPSession(page);await session.send('Emulation.clearDeviceMetricsOverride');await session.detach();
}finally{await browser.close();}
