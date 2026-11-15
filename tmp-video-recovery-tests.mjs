import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
const path=root+'tests/auto-video.test.mjs';
let s=fs.readFileSync(path,'utf8').replace("import {runVideoFlow}","import {runVideoFlow,productVideoLibrary,videoRecovery}").replace("['MUSE_REFUSED',null]","['MUSE_REFUSED','MUSE_NO_MEDIA',null]");
s+=`
test('Video library preserves every project for the selected product without attaching old takes',()=>{
 const make=(id,productId,updatedAt)=>({id,kind:'production',updatedAt,data:{productId,scenes:[{id:'same_scene',name:'Clip',mediaType:'video',takes:[{id:'same_take',assetId:id+'_asset',review:'pending'}]},{id:'image',mediaType:'image',takes:[{id:'img',assetId:'img'}]}],exports:[{id:'render',kind:'render',verified:true,assetId:id+'_render'},{id:'prompt',kind:'prompt',verified:true,assetId:'not_video'},{id:'unverified',kind:'render',verified:false,assetId:'not_verified'}]}});
 const old=make('old','p',1),other=make('other','q',3),current=make('current','p',2);current.data.scenes=[];current.data.exports=[];
 const records=[old,current,other],before=structuredClone(records),library=productVideoLibrary(records,'p');
 assert.deepEqual(library.clips.map(r=>r.take.assetId),['old_asset']);assert.deepEqual(library.exports.map(r=>r.output.assetId),['old_render']);
 assert.equal(library.clips[0].project.id,'old');assert.deepEqual(records,before);assert.deepEqual(productVideoLibrary(records,'missing'),{clips:[],exports:[]});
});
test('Video recovery explains no-media, isolates products and revisions, and preserves uncertain receipts',()=>{
 const project={id:'current',data:{scenes:[{id:'scene',revision:2,mediaProvider:'manual',takes:[]}]}};
 const job={id:'j',state:'needs_attention',failureCode:'MUSE_NO_MEDIA',request:{projectId:'current',sceneId:'scene',sceneRevision:2}};
 const state={musePaused:true,jobs:[job]},before=structuredClone(state);
 assert.match(videoRecovery(project,state).message,/chưa tạo video/);assert.equal(videoRecovery(project,state).manual,true);
 assert.equal(videoRecovery(project,state).attention,false);assert.deepEqual(state,before);
 assert.equal(videoRecovery(project,{...state,jobs:[{...job,request:{...job.request,projectId:'other'}}]}).noMedia,false);
 assert.equal(videoRecovery(project,{...state,jobs:[{...job,request:{...job.request,sceneRevision:1}}]}).noMedia,false);
 assert.equal(videoRecovery(project,{...state,jobs:[{...job,failureCode:'TIMEOUT'}]}).attention,true);
 const delivered=structuredClone(project);delivered.data.scenes[0].takes=[{sceneRevision:2,review:'pending'}];
 assert.equal(videoRecovery(delivered,state).message,'');
});
`;
fs.writeFileSync(path,s);
// Preserve the checkout's CRLF convention so review shows only the real changes.
for(const p of ['components/lab/compact-video.tsx','lib/lab/auto-video.ts','desktop/src/manual-media.mjs','desktop/test/manual-media.test.mjs','tests/auto-video.test.mjs']){
 const full=root+p;fs.writeFileSync(full,fs.readFileSync(full,'utf8').replace(/\r?\n/g,'\r\n'));
}
