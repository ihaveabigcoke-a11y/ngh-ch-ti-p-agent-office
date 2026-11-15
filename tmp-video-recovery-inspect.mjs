import {createRequire} from 'node:module';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local';
const require=createRequire(root+'/package.json'),{chromium}=require('./desktop/node_modules/playwright');
const browser=await chromium.connectOverCDP('http://127.0.0.1:9238');
try{
 const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('http://127.0.0.1'));
 const state=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status(),records=(await(await fetch('/api/lab')).json()).records;
  const productId=document.querySelector('select[aria-label="Sản phẩm"]')?.value;
  const projects=records.filter(r=>r.kind==='production'&&r.data.productId===productId).sort((a,b)=>b.updatedAt-a.updatedAt);
  const jobs=s.jobs.filter(j=>projects.some(p=>p.id===j.request.projectId));
  return {view:new URL(location.href).searchParams.get('view'),musePaused:s.musePaused,generationReady:s.generationReady,active:s.active,night:{stopped:s.museNight.stopped,submitted:s.museNight.submitted,limit:s.museNight.limit},selectedHasProduct:!!productId,savedProjectExists:projects.some(p=>p.id===localStorage.getItem('hermes-video-'+productId)),projects:projects.map((p,i)=>({index:i,isSaved:p.id===localStorage.getItem('hermes-video-'+productId),scenes:p.data.scenes.map(scene=>({id:scene.id,revision:scene.revision,provider:scene.mediaProvider,takes:scene.takes.length,reconciled:!!scene.museReconciledAt})),exports:p.data.exports.length})),jobs:jobs.map(j=>({projectIndex:projects.findIndex(p=>p.id===j.request.projectId),state:j.state,sceneId:j.request.sceneId,failureCode:j.failureCode??null,hasReceipt:!!j.providerId,lastAt:j.history?.at(-1)?.at})),manual:(await window.productLabDesktop.manualMediaStatus()).scenes.filter(r=>projects.some(p=>p.id===r.projectId)).map(r=>({projectIndex:projects.findIndex(p=>p.id===r.projectId),sceneId:r.sceneId,state:r.state,hasExport:!!r.exportedPath}))};
 });console.log(JSON.stringify(state));
}finally{await browser.close();}
