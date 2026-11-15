// Access the requested app through its own UI/IPC only. Never open installed files.
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local';
const require=createRequire(root+'/package.json'),{chromium}=require('./desktop/node_modules/playwright');
const browser=await chromium.connectOverCDP('http://127.0.0.1:9238');
try{
 const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('http://127.0.0.1'));
 if(!page)throw Error('Hermes chưa mở');
 await page.waitForFunction(()=>!!window.productLabDesktop);
 const result=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status(),rows=(await(await fetch('/api/lab')).json()).records;
  const product=rows.find(r=>r.kind==='product'&&/OKSBS-001/i.test(r.data.name));
  const projects=rows.filter(r=>r.kind==='production'&&r.data.productId===product?.id).sort((a,b)=>b.updatedAt-a.updatedAt);
  return {musePaused:s.musePaused,generationReady:s.generationReady,active:s.active,night:s.museNight,
   profiles:s.profiles.map(p=>({enabled:p.enabled,health:p.health,busy:p.busy,quotaState:p.quota?.state})),targetFound:!!product,
   productId:product?.id,productRevision:product?.revision,savedProject:product?localStorage.getItem('hermes-video-'+product.id):null,
   projects:projects.map(p=>({id:p.id,revision:p.revision,productRevision:p.data.productRevision,paused:p.data.paused,scenes:p.data.scenes.map(c=>({id:c.id,revision:c.revision,provider:c.mediaProvider,takes:c.takes.length,reconciled:!!c.museReconciledAt})),exports:p.data.exports.length})),
   jobs:s.jobs.filter(j=>projects.some(p=>p.id===j.request.projectId)).map(j=>({id:j.id,projectId:j.request.projectId,sceneId:j.request.sceneId,sceneRevision:j.request.sceneRevision,state:j.state,failureCode:j.failureCode??null,reconciled:!!j.reconciled,hasResult:!!j.providerId,hasResponse:!!j.providerResponse}))};
 });
 await writeFile(root+'/outputs/M-20261114-muse-flow-live/state.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}
