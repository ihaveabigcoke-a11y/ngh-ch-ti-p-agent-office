// User-requested enable operation through Hermes UI only. No direct access to installed files.
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {openSync,closeSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {createRequire} from 'node:module';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local';
const require=createRequire(root+'/package.json'),{chromium}=require('./desktop/node_modules/playwright');
const out=root+'/outputs/M-20261114-enable-live';await mkdir(out,{recursive:true});
const hook=out+'/debug.cjs';
await writeFile(hook,`if(process.versions.electron&&process.type==='browser')setImmediate(()=>{
 const {app}=require('electron'),fs=require('fs');
 fs.writeFileSync('${out}/electron.pid',String(process.pid));
 app.commandLine.appendSwitch('remote-debugging-port','9238');
 app.commandLine.appendSwitch('remote-debugging-address','127.0.0.1');
 app.on('browser-window-created',(_event,win)=>win.webContents.once('did-finish-load',()=>setImmediate(()=>fs.writeFileSync('${out}/loaded','ready'))));
});`);
const log=openSync(out+'/launcher.log','w'),env={...process.env,NODE_OPTIONS:'--require='+hook,HERMES_MUSE_ONLY:'1',HERMES_INSTAGRAM_API_ENABLED:'0',PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD:'1'};
delete env.PRODUCT_LAB_QA_USER_DATA;
const launch=spawn('powershell.exe',['-NoProfile','-Command',"& '"+root+"/START-HERMES-CLIP.cmd'"],{cwd:root,windowsHide:true,stdio:['ignore',log,log],env});
let browser;
try{
 for(let i=0;i<150;i++){try{await readFile(out+'/loaded');break;}catch{await delay(300);}}
 browser=await chromium.connectOverCDP('http://127.0.0.1:9238');
 const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('http://127.0.0.1'));
 assert.ok(page,'Hermes window must load');page.setDefaultTimeout(15000);
 await page.waitForFunction(()=>!!window.productLabDesktop);
 const origin=new URL(page.url()).origin;
 // Compare old job state/receipts in renderer memory; export only aggregate booleans/counts.
 const before=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status();
  const projection=s.jobs.map(j=>({id:j.id,state:j.state,providerId:j.providerId??null}));
  window.__museEnableBefore=JSON.stringify(projection);
  return {musePaused:s.musePaused,active:s.active,jobs:s.jobs.length,submitted:s.museNight.submitted,stopped:s.museNight.stopped,limit:s.museNight.limit};
 });
 assert.equal(before.active,0,'Wait for active tasks before changing recovery settings');
 // Keep the projection across UI navigation without writing account details to disk.
 const oldProjection=await page.evaluate(()=>window.__museEnableBefore);
 await page.goto(origin+'/?view=settings');
 const unlimited=page.getByRole('checkbox',{name:'Không giới hạn lượt trong Hermes'});await unlimited.waitFor();
 await page.getByRole('button',{name:'Lưu giãn nhịp'}).waitFor();
 await page.waitForFunction(()=>!Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Lưu giãn nhịp')?.disabled);
 await unlimited.check();await page.getByRole('button',{name:'Lưu giãn nhịp'}).click();
 await page.waitForFunction(async()=>{const s=await window.productLabDesktop.museNightStatus();return s.limit===null;});
 await page.goto(origin+'/?view=accounts');
 const card=page.getByRole('region',{name:'Công tắc Muse'}),control=card.getByRole('switch');await control.waitFor();
 await page.waitForFunction(()=>!document.querySelector('.muse-switch-card [role=switch]').disabled);
 if(!await control.isChecked()){
  await control.click();const dialog=page.getByRole('dialog');await dialog.waitFor();
  await dialog.getByRole('button',{name:/^Bật (lại )?Muse$/}).click();await dialog.waitFor({state:'hidden'});
 }
 await page.reload();await control.waitFor();await page.waitForFunction(()=>document.querySelector('.muse-switch-card [role=switch]').checked);
 await delay(1200);
 const after=await page.evaluate(async previous=>{
  const s=await window.productLabDesktop.status();
  const projection=s.jobs.map(j=>({id:j.id,state:j.state,providerId:j.providerId??null}));
  return {musePaused:s.musePaused,generationReady:s.generationReady,active:s.active,jobs:s.jobs.length,oldJobsAndReceiptsUnchanged:JSON.stringify(projection)===previous,night:{stopped:s.museNight.stopped,limit:s.museNight.limit,remaining:s.museNight.remaining,submitted:s.museNight.submitted,intervalSeconds:s.museNight.intervalSeconds}};
 },oldProjection);
 assert.equal(after.musePaused,false);assert.equal(after.night.stopped,false);assert.equal(after.night.limit,null);assert.equal(after.night.remaining,null);
 assert.equal(after.active,0);assert.equal(after.jobs,before.jobs);assert.equal(after.oldJobsAndReceiptsUnchanged,true);assert.equal(after.night.submitted,before.submitted);
 for(const [width,height] of [[1366,768],[1920,1080]]){
  await page.setViewportSize({width,height});await card.scrollIntoViewIfNeeded();await card.screenshot({path:out+'/enabled-switch-'+width+'.png'});
 }
 const result={passed:true,operation:'Enable Muse by explicit user request',at:new Date().toISOString(),before,after,newSubmissions:0,newServiceGenerationTest:false,usedHermesUi:true,directInstalledFileAccess:false};
 await writeFile(out+'/result.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser?.close().catch(()=>{});closeSync(log);launch.unref();}
// Leave the requested app open for the user, without booting unrelated queues.
