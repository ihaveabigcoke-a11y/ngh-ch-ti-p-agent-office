import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
let s=fs.readFileSync(root+'desktop/test/muse-package.test.mjs','utf8');
s=s.replace("enqueue:async request=>{calls++;return store.enqueue(request,request.sceneId);},start:async()=>true","approvedIds:[],enqueue:async request=>{calls++;return store.enqueue(request,request.sceneId);},start:async({jobIds})=>{worker.approvedIds.push(...jobIds);return true;}");
s+=`
test('Muse package resumes queued and retries only demonstrably unsent failures without losing old receipts',async()=>{
 const store=new Store(':memory:');try{
 const p=renderFixture().production;p.scenes.forEach(s=>s.takes=[]);
 const records=[{id:'render_project',kind:'production',revision:1,data:p},{id:p.productId,kind:'product',revision:1,data:{}}];
 const worker={store,approvedIds:[],night:new MuseNight(store),config:()=>({enabled:true}),enqueue:async request=>store.enqueue(request,request.sceneId),retry:async id=>store.retry(id),start:async({jobIds})=>{worker.approvedIds.push(...jobIds);return true;}};
 store.set('muse_paused',false);const service=new MusePackage({worker,manual:{records:async()=>records},domain:{sceneGate}});
 for(const [index,state] of ['queued','cancelled','failed'].entries()){const scene=p.scenes[index],j=store.enqueue({projectId:'render_project',productId:p.productId,productRevision:1,sceneId:scene.id,sceneRevision:scene.revision},scene.id).job;store.put({...j,state});}
 const originals=structuredClone(store.jobs()),preview=(await service.preview({projectId:'render_project'})).public;
 assert.equal(preview.count,5);assert.equal(preview.queuedCount,1);assert.equal(preview.retryableCount,2);assert.equal(preview.newCount,2);
 const result=await service.start({projectId:'render_project',revision:1});assert.equal(result.count,5);assert.equal(store.jobs().length,7);
 for(const old of originals)assert.deepEqual(store.job(old.id),old);
 assert.equal((await service.preview({projectId:'render_project'})).public.count,0);
 for(const state of ['needs_attention','failed']){const job=store.jobs()[0];store.put({...job,state,submitBatchId:'sent',history:[{state:'submitting'}]});assert.equal((await service.preview({projectId:'render_project'})).public.blocked,1);await assert.rejects(service.start({projectId:'render_project',revision:1}),/Đối soát/);}
 }finally{store.close();}
});
`;
fs.writeFileSync(root+'desktop/test/muse-package.test.mjs',s);
s=fs.readFileSync(root+'tests/auto-video.test.mjs','utf8').replace('productVideoLibrary,videoRecovery','productVideoLibrary,videoRecovery,resumableVideoProject');
s+=`
test('Explicit Muse mode escapes manual scenes and never silently exports manual packs',async()=>{
 for(const paused of [false,true]){
 const product={id:'p',kind:'product',revision:1,data:{...emptyProduct,name:'Fixture'}};
 let project={id:'auto_existing',kind:'production',revision:1,data:newProduction('Existing','p',1)};
 project.data=applyProduction(project.data,'scene',{id:'auto_0',name:'Hook',prompt:'Show the product',mediaType:'video',ratio:'9:16',duration:8,referenceIds:[]},'scene',1);
 project.data=applyProduction(project.data,'storyboard',{sceneId:'auto_0'},'board',1);
 project.data=applyProduction(project.data,'media_provider',{sceneId:'auto_0',provider:'manual'},'manual',1);
 let starts=0;const request=async(path,body)=>{if(!body)return {records:[product,project]};project={...project,revision:project.revision+1,data:applyProduction(project.data,body.action,body.input,body.commandId,2)};return {record:project};};
 const result=await runVideoFlow({mediaMode:'muse',productId:'p',projectId:project.id,request,maxPolls:0,upload:()=>assert.fail('No media yet'),bridge:{status:async()=>({musePaused:paused,generationReady:!paused,jobs:[]}),musePackagePreview:async()=>({count:1,blocked:0,night:{remaining:null}}),musePackageStart:async()=>{starts++;},manualMediaExport:()=>assert.fail('Muse mode must not request user files')}});
 assert.equal(result.state,paused?'blocked':'waiting');assert.equal(starts,paused?0:1);assert.equal(project.data.scenes[0].mediaProvider,paused?'manual':'muse');assert.equal(project.data.exports.length,0);
 }
});
test('Video project recovery ignores stale localStorage and reuses the existing automatic project',()=>{
 const product={id:'p',revision:2},current={id:'current',kind:'production',updatedAt:10,data:{productId:'p',productRevision:2,scenes:[{id:'auto_0'}]}},old={...current,id:'old',data:{...current.data,productRevision:1}};
 assert.equal(resumableVideoProject([old,current],product,'old').id,'current');assert.equal(resumableVideoProject([old],product,'old'),null);
});
`;
fs.writeFileSync(root+'tests/auto-video.test.mjs',s);
s=fs.readFileSync(root+'desktop/test/muse.test.mjs','utf8');
s+=`
test('Muse waits past a stable text acknowledgement for a late video without resending',async t=>{
 let now=0,sent=false,clicks=0;t.mock.method(Date,'now',()=>now);
 const page={locator:selector=>({evaluateAll:async()=>selector==='[data-message-id][data-message-role="assistant"]'?(sent?[{id:'reply',text:'I am preparing your video.'}]:[]):selector.includes('role="user"')?[]:sent&&now>=22000?['late-video']:[]}),getByRole:(_r,{name})=>({click:async()=>{assert.equal(name,'Send');sent=true;clicks++;},isVisible:async()=>false}),waitForTimeout:async()=>{now+=1000;},url:()=>config.startUrl};
 const states=[];assert.equal(await new MuseAdapter(config).submit(page,async s=>states.push(s)),'late-video');assert.equal(clicks,1);assert.ok(now>=22000);assert.deepEqual(states,['submitting','submitted']);
});
test('A neutral text-only reply times out with its receipt and does not retry forever',async t=>{
 let now=0,sent=false,clicks=0;t.mock.method(Date,'now',()=>now);const timeoutSeconds=25;
 const page={locator:selector=>({evaluateAll:async()=>selector==='[data-message-id][data-message-role="assistant"]'&&sent?[{id:'reply',text:'Preparing your video.'}]:[]}),getByRole:()=>({click:async()=>{sent=true;clicks++;},isVisible:async()=>false}),waitForTimeout:async()=>{now+=1000;},url:()=>config.startUrl};
 await assert.rejects(new MuseAdapter({...config,timeoutSeconds}).submit(page,async()=>{}),e=>e.code==='MUSE_NO_MEDIA'&&e.providerResponse==='Preparing your video.');assert.equal(clicks,1);assert.equal(now,25000);
});
`;
fs.writeFileSync(root+'desktop/test/muse.test.mjs',s);
for(const file of ['components/lab/compact-video.tsx','lib/lab/auto-video.ts','desktop/src/muse.mjs','desktop/test/muse.test.mjs','desktop/test/muse-package.test.mjs','tests/auto-video.test.mjs']){const p=root+file;fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n'));}
