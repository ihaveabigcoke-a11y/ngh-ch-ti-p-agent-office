import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
fs.writeFileSync(root+'desktop/test/muse-resume.test.mjs',`import test from 'node:test';
import assert from 'node:assert/strict';
import {Store} from '../src/store.mjs';
import {Worker} from '../src/worker.mjs';
import {MuseNight} from '../src/muse-night.mjs';

test('Explicit Muse resume preserves receipt and audit; never opens browser or dispatches old jobs',async()=>{
 for(const code of ['MUSE_REFUSED','MUSE_LOGIN_REQUIRED','MUSE_QUOTA_EXHAUSTED','MUSE_CAPTCHA','MUSE_ACCOUNT_WARNING',null]){
  const store=new Store(':memory:');try{
   let now=Date.parse('2026-11-14T04:00:00+07:00'),calls=0;
   const clock={now:()=>now,sleep:async ms=>{now+=ms;}},worker=new Worker(store,'outputs/muse-resume-fixture',{launchPersistentContext:async()=>calls++},{});
   worker.night=new MuseNight(store,clock);worker.night.begin();
   const old=store.enqueue({sceneId:'old',references:[]},'old').job;
   store.put({...old,state:'needs_attention',providerId:'keep_receipt'});
   const queued=store.enqueue({sceneId:'queued',references:[]},'queued').job;
   await worker.night.admit(old.id);worker.night.outcome(old.id,code?{code}:Error('first'));
   if(!code)worker.night.outcome('second',Error('second'));
   const before=structuredClone(worker.night.current()),jobs=structuredClone(store.jobs());
   await assert.rejects(worker.setMusePaused({paused:false}),{code:'MUSE_NIGHT_STOP'});
   await worker.setMusePaused({paused:false,resumeStopped:true});worker.tick();
   assert.equal(worker.status().musePaused,false);assert.equal(worker.paused,true);assert.equal(calls,0);
   assert.deepEqual(worker.approvedIds,[]);assert.deepEqual(store.jobs(),jobs);
   assert.deepEqual(worker.night.current().submissions,before.submissions);assert.deepEqual(worker.night.current().outcomes,before.outcomes);
   assert.equal(worker.night.current().resumptions.length,1);assert.equal(worker.night.current().resumptions[0].stopReason,before.stopReason);
   assert.equal(worker.night.status().remaining,11);assert.equal(worker.night.current().consecutiveErrors,0);
   await worker.setMusePaused({paused:false,resumeStopped:true});assert.equal(worker.night.current().resumptions.length,1);
   const restarted=new MuseNight(store,clock);assert.equal(restarted.status().stopped,false);
   await assert.rejects(restarted.admit(old.id),{code:'MUSE_DELIVERY_UNCONFIRMED'});
   await restarted.admit(queued.id);assert.ok(restarted.current().submissions[1].at-before.submissions[0].at>=60000);
   restarted.outcome(queued.id,{code:'MUSE_QUOTA_EXHAUSTED'});assert.equal(restarted.status().stopped,true);
   assert.throws(()=>restarted.assertRoom(),{code:'MUSE_NIGHT_STOP'});
  }finally{store.close();}
 }
});

test('Resume refuses while an admitted job/chat is active and requires a real boolean confirmation',async()=>{
 const store=new Store(':memory:');try{
  const worker=new Worker(store,'outputs/muse-resume-fixture',{},{});worker.night.begin();worker.night.outcome('old',{code:'MUSE_REFUSED'});
  const before=structuredClone(worker.night.current());
  await assert.rejects(worker.setMusePaused({paused:false,resumeStopped:'true'}));
  for(const map of [worker.active,worker.chatting]){
   if(map instanceof Map)map.set('p','job');else map.add('p');
   await assert.rejects(worker.setMusePaused({paused:false,resumeStopped:true}),{code:'MUSE_RESUME_BUSY'});
   assert.deepEqual(worker.night.current(),before);assert.equal(worker.status().musePaused,true);map.clear();
  }
 }finally{store.close();}
});

test('Unlimited is null, admits beyond 12 with spacing, survives restart and never resets ledger or duplicate protection',async()=>{
 const store=new Store(':memory:');try{
  let now=Date.parse('2026-11-14T01:00:00+07:00');const clock={now:()=>now,sleep:async ms=>{now+=ms;}},night=new MuseNight(store,clock);
  night.configure({intervalSeconds:60,sessionLimit:2});night.begin();await night.admit('a');await night.admit('b');
  assert.throws(()=>night.assertRoom(),{code:'MUSE_NIGHT_LIMIT'});const old=structuredClone(night.current());
  night.configure({intervalSeconds:60,sessionLimit:null});assert.deepEqual(night.current(),old);
  assert.equal(night.status().remaining,null);assert.equal(night.status().limit,null);
  await Promise.all(Array.from({length:14},(_,i)=>night.admit('new_'+i)));
  const restarted=new MuseNight(store,clock);assert.equal(restarted.status().submitted,16);assert.equal(restarted.status().remaining,null);
  const rows=restarted.current().submissions;for(let i=1;i<rows.length;i++)assert.ok(rows[i].at-rows[i-1].at>=60000);
  await assert.rejects(restarted.admit('a'),{code:'MUSE_DELIVERY_UNCONFIRMED'});
  restarted.configure({intervalSeconds:60,sessionLimit:12});assert.equal(restarted.status().remaining,0);assert.throws(()=>restarted.assertRoom(),{code:'MUSE_NIGHT_LIMIT'});
  restarted.configure({intervalSeconds:60,sessionLimit:null});restarted.outcome('new_13',{code:'MUSE_QUOTA_EXHAUSTED'});
  assert.equal(restarted.status().stopped,true);assert.throws(()=>restarted.assertRoom(),{code:'MUSE_NIGHT_STOP'});
  assert.throws(()=>restarted.configure({intervalSeconds:59,sessionLimit:null}));
 }finally{store.close();}
});

test('Resuming clears stale dispatch approvals while leaving queued jobs and receipts recoverable',async()=>{
 const store=new Store(':memory:');try{
  const worker=new Worker(store,'outputs/muse-resume-fixture',{},{});worker.night.begin();worker.night.outcome('old',{code:'MUSE_REFUSED'});
  const job=store.enqueue({sceneId:'pending',references:[]},'pending').job;worker.approvedIds=[job.id];worker.paused=false;worker.budget=1;
  const version=worker.dispatchVersion;await worker.setMusePaused({paused:false,resumeStopped:true});worker.tick();
  assert.equal(worker.paused,true);assert.equal(worker.budget,0);assert.equal(worker.active.size,0);assert.deepEqual(worker.approvedIds,[]);
  assert.ok(worker.dispatchVersion>version);assert.equal(store.job(job.id).state,'queued');assert.equal(worker.night.status().submitted,0);
 }finally{store.close();}
});
`);
fs.appendFileSync(root+'tests/auto-video.test.mjs',`
test('Muse unlimited null starts the package; finite zero remains manual; unresolved receipts still block',async()=>{
 for(const [remaining,blocked,expected] of [[null,0,'waiting'],[0,0,'manual'],[null,1,'attention']]){
  const product={id:'p',kind:'product',revision:1,createdAt:1,updatedAt:1,data:{...emptyProduct,name:'Fixture',ctaKeyword:'GLOW'}};
  let project,starts=0,manual=0;
  const request=async(path,body)=>{
   if(!body)return {records:[product,...(project?[project]:[])]};
   const data=body.action==='create'?newProduction(body.input.name,product.id,product.revision):applyProduction(project.data,body.action,body.input,body.commandId,123);
   project={id:body.id,kind:'production',revision:(project?.revision??0)+1,createdAt:1,updatedAt:123,data};return {record:project};
  };
  const result=await runVideoFlow({productId:'p',projectId:'auto_unlimited',request,upload:()=>assert.fail('No media fixture'),maxPolls:0,bridge:{status:async()=>({musePaused:false,generationReady:true,jobs:[]}),musePackagePreview:async()=>({count:5,blocked,night:{remaining,stopped:false}}),musePackageStart:async()=>{starts++;},manualMediaExport:async()=>{manual++;}},wait:async()=>{}});
  assert.equal(result.state,expected);assert.equal(starts,expected==='waiting'?1:0);assert.equal(manual,expected==='manual'?1:0);
 }
});
`);
let ui=fs.readFileSync(root+'scripts/check-muse-switch-ui.mjs','utf8');
ui=ui.replaceAll('M-20261114-toggle','M-20261114-enable');
ui=ui.replace("setMusePaused:async payload=>", "museNightStatus:()=>window.fixtureMuseNight(),saveMusePacing:payload=>window.fixtureMusePacing(payload),setMusePaused:async payload=>");
ui=ui.replace(" await page.addInitScript", " await page.exposeFunction('fixtureMuseNight',()=>worker.night.status());\n await page.exposeFunction('fixtureMusePacing',payload=>worker.night.configure(payload));\n await page.addInitScript");
ui=ui.replace("assert.equal(await dialog.getByRole('button',{name:'Bật Muse',exact:true}).isDisabled(),true);", "assert.equal(await dialog.getByRole('button',{name:'Bật lại Muse',exact:true}).isEnabled(),true);");
ui=ui.replace("assert.equal(await control.isDisabled(),true);", "assert.equal(await control.isEnabled(),true);");
ui=ui.replace(" assert.deepEqual(store.job(job.id),original);assert.equal(toggleCalls,3)", ` await control.click();await dialog.waitFor();
 await dialog.getByRole('button',{name:'Bật lại Muse',exact:true}).click();await dialog.waitFor({state:'hidden'});
 assert.equal(await control.isChecked(),true);assert.equal(worker.night.status().stopped,false);
 assert.equal(worker.night.current().resumptions.length,1);assert.equal(worker.night.status().errors,1);
 await capture('resumed');
 await page.goto(origin+'/?view=settings');
 const unlimited=page.getByRole('checkbox',{name:'Không giới hạn lượt trong Hermes'});await unlimited.waitFor();
 await unlimited.check();await page.getByRole('button',{name:'Lưu giãn nhịp'}).click();
 await page.getByText('Đã gửi 0 · Thành công 0 · Lỗi 1 · Không giới hạn lượt trong Hermes').waitFor();
 assert.equal(worker.night.status().limit,null);assert.equal(worker.night.status().remaining,null);
 await capture('unlimited');await page.reload();await unlimited.waitFor();assert.equal(await unlimited.isChecked(),true);
 assert.deepEqual(store.job(job.id),original);assert.equal(toggleCalls,4)`);
ui=ui.replace('stoppedCannotEnable:true','explicitResume:true,unlimitedPersists:true');
fs.writeFileSync(root+'scripts/check-muse-switch-ui.mjs',ui);
console.log('Added recovery, cap, dispatch and UI regression checks.');
