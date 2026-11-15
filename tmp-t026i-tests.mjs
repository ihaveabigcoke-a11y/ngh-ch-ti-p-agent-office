
test('T-026i: refresh renders three new techniques with byte-identical body segments and does not rerender on retry',async()=>{
 const {publishFixture}=await import('./fixtures/publish-board.mjs');
 const {planDistribution}=await import('../lib/lab/publish-board.ts');
 const {planHookRefresh}=await import('../lib/lab/result-cards.ts');
 const {getRenderPlan}=await import('../lib/lab/render-plan.ts');
 const f=publishFixture(),plans=planDistribution(f.records,f.input),sourceBefore=structuredClone(f.project);
 let project=planHookRefresh([...f.records,...plans],{planId:plans[0].id,revision:1,id:'refresh_auto'}),starts=0;
 const rendered=[],oldBody=structuredClone(project.data.reuseBodyPlan.segments.slice(1));
 const request=async(path,body)=>{
  if(!body)return {records:[...f.records,project]};
  assert.equal(body.revision,project.revision);
  const input=body.action==='export'?{...body.input,verified:true,sha256:'a'.repeat(64)}:body.input;
  project={...project,revision:project.revision+1,data:applyProduction(project.data,body.action,input,body.commandId)};
  return {record:project};
 };
 const bridge={status:async()=>({musePaused:false,generationReady:true,jobs:[]}),musePackagePreview:async()=>({count:3,blocked:0,night:{remaining:12,stopped:false}}),musePackageStart:async()=>{
  starts++;
  for(const scene of project.data.scenes.filter(s=>s.role==='hook')){
   project={...project,revision:project.revision+1,data:applyProduction(project.data,'attach',{sceneId:scene.id,attemptId:null,take:{assetId:'new_'+scene.id,name:'new.mp4',type:'video/mp4',size:100,sha256:'b'.repeat(64),metadata:{width:720,height:1280,duration:8,verifiedBy:'container'}}},'attach_'+scene.id)};
  }
 },renderPlannedVideo:async()=>{const plan=getRenderPlan(project.data,project.id,project.data.variants.at(-1).id);rendered.push(plan);return {sha256:'a'.repeat(64)};}};
 const options={productId:f.product.id,projectId:project.id,request,bridge,upload:async()=>({id:'output_'+rendered.length,sha256:'a'.repeat(64)}),wait:async()=>{}};
 assert.equal((await runVideoFlow(options)).state,'done');assert.equal(rendered.length,3);
 for(const plan of rendered)assert.deepEqual(plan.segments.slice(1),oldBody);
 assert.equal(new Set(project.data.variants.map(v=>v.hookTechnique)).size,3);
 assert.deepEqual(f.project,sourceBefore);
 assert.equal((await runVideoFlow(options)).state,'done');assert.equal(starts,1);assert.equal(rendered.length,3);
});

test('T-026i: rank distinct hooks by mean measured views in the same product/group; null and ties stay explicit',async()=>{
 const {publishFixture}=await import('./fixtures/publish-board.mjs');const {planDistribution}=await import('../lib/lab/publish-board.ts');const {resultHookRank}=await import('../lib/lab/result-cards.ts');
 const f=publishFixture(),plans=planDistribution(f.records,f.input),records=[...f.records,...plans];
 for(const [i,plan] of plans.entries())records.push({id:'metric_'+i,kind:'social_metric',revision:1,updatedAt:1,data:{planId:plan.id,observedAt:'2026-11-13T10:00:00Z',views:[100,50,10,100,null][i]}});
 assert.deepEqual(plans.map(p=>resultHookRank(records,p)),[1,2,3,1,null]);
 assert.equal(resultHookRank(records,{...plans[0],data:{...plans[0].data,comparison:undefined}}),null);
});
