import fs from 'node:fs';const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
const p=root+'desktop/src/worker.mjs';let s=fs.readFileSync(p,'utf8');s=s.replace('async run(id, profileId, resume = false) {','async run(id, profileId, resume = false, {recoverExisting=false}={}) {').replace('const check = !resume && this.assertJobNotSkipped(id);','const check = !(resume&&recoverExisting) && this.assertJobNotSkipped(id);').replace('void this.run(id, job.profileId, true).finally','void this.run(id, job.profileId, true, {recoverExisting}).finally');fs.writeFileSync(p,s);
const path=root+'desktop/test/worker-controls.test.mjs';s=fs.readFileSync(path,'utf8');s+=`
test('Explicit recovery inspects a skipped thread, proves no file, preserves receipt and marks only the old attempt reconciled',t=>fixture(async(worker,store)=>{
 const old=store.enqueue(request,'skipped-recovery').job;
 store.put({...old,state:'needs_attention',profileId:'profile',providerUrl:'https://muse.ai/thread/old',providerResponse:'No video',failureCode:'MUSE_NO_MEDIA'});
 worker.readProductionRecord=async id=>({id,data:{scenes:[{id:request.sceneId,museReconciledAt:Date.now()+1000}]}});
 let inspected=0,closed=0,submits=0;worker.context=async()=>({newPage:async()=>({close:async()=>{closed++;}})});worker.connectVpn=async()=>{};
 t.mock.method(MuseAdapter.prototype,'inspectResponse',async()=>{inspected++;return {providerId:null};});t.mock.method(MuseAdapter.prototype,'submit',async()=>{submits++;throw Error('No submit in recovery');});
 await assert.rejects(worker.recheckResult({id:old.id}),/bỏ qua/);
 const checked=await worker.recheckResult({id:old.id,recoverExisting:true});assert.equal(checked.reconciled,true);assert.equal(checked.state,'failed');assert.equal(checked.providerResponse,'No video');assert.equal(inspected,1);assert.equal(closed,1);assert.equal(submits,0);
 const retry=store.retry(old.id);assert.equal(retry.reconciled,false);assert.equal(retry.reconciledAt,null);assert.equal(store.job(old.id).reconciled,true);assert.equal(store.batch(),null);
}));
test('Explicit recovery downloads a known old result with resume=true, never prepare or submit',t=>fixture(async(worker,store)=>{
 const old=store.enqueue(request,'late-result').job;store.put({...old,state:'needs_attention',profileId:'profile',providerId:'media-file',providerUrl:'https://muse.ai/thread/old'});
 worker.readProductionRecord=async id=>({id,data:{scenes:[{id:request.sceneId,museReconciledAt:Date.now()+1000}]}});
 let admitted;worker.runAdmitted=async(id,profile,resume)=>{admitted={id,profile,resume};};worker.tick=()=>{};
 await worker.resume(old.id,{recoverExisting:true});await new Promise(r=>setTimeout(r,0));assert.deepEqual(admitted,{id:old.id,profile:'profile',resume:true});assert.equal(store.jobs().length,1);assert.equal(store.batch(),null);
}));
`;fs.writeFileSync(path,s.replace(/\r\n/g,'\n'));
