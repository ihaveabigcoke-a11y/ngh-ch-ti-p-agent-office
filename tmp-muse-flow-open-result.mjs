import {createRequire} from 'node:module';
import {readFile} from 'node:fs/promises';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local',require=createRequire(root+'/package.json'),{chromium}=require('./desktop/node_modules/playwright');
const baseline=JSON.parse(await readFile(root+'/outputs/M-20261114-muse-flow-live/baseline.json','utf8'));
const browser=await chromium.connectOverCDP('http://127.0.0.1:9238');
try{const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('http://127.0.0.1'));console.log(await page.evaluate(async projectId=>{const s=await window.productLabDesktop.status();if(s.active)throw Error('Chờ tác vụ đang chạy xong.');const job=s.jobs.find(j=>j.request.projectId===projectId&&j.providerId&&j.state==='needs_attention');if(!job)throw Error('Không có kết quả cũ cần kiểm');await window.productLabDesktop.openResult({id:job.id});return {openedExistingResult:true,musePaused:s.musePaused,newSubmission:false};},baseline.projectId));}finally{await browser.close();}
