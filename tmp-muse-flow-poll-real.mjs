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
  const jobs=s.jobs.filter(j=>j.request.projectId===baseline.projectId),classify=text=>!text?null:/country|region|location/i.test(text)?'region-mentioned':/cannot|could not|not available|unable/i.test(text)?'unavailable-mentioned':'other-response';
  return {musePaused:s.musePaused,generationReady:s.generationReady,active:s.active,stopped:s.museNight.stopped,stopReason:s.museNight.stopReason,submittedSinceStart:s.museNight.submitted-baseline.submitted,
   jobs:jobs.map(j=>({id:j.id,sceneId:j.request.sceneId,state:j.state,failureCode:j.failureCode??null,hasResult:!!j.providerId,hasOutput:!!j.output,imported:!!j.importedAt,responseKind:classify(j.providerResponse),lastEvent:j.history?.at(-1)?.note})),
   scenes:p.data.scenes.map(c=>({id:c.id,provider:c.mediaProvider,takes:c.takes.length})),exports:p.data.exports.length,
   progress:[...document.querySelectorAll('[data-screen=video]>[role=status]')].map(e=>e.textContent),errors:[...document.querySelectorAll('[data-screen=video] [role=alert]')].map(e=>e.textContent)};
 },baseline);
 await writeFile(out+'/latest.json',JSON.stringify({at:new Date().toISOString(),...result},null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}
