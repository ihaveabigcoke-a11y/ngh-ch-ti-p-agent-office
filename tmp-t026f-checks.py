from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local');o=Path(r'D:\agent-office\ngh-ch-ti-p-agent-office')
def write(p,s):p.write_text(s,encoding='utf-8',newline='\n')
p=r/'lib/lab/auto-video.ts';s=p.read_text(encoding='utf-8');s=s.replace("const plan=getRenderPlan(p,project!.id,vid);plan.segments=plan.segments.map((s,j)=>({...s,inSec:0,outSec:[4,4,7][j]}));plan.overlays=", "const variant=p.variants.find(v=>v.id===vid)!;const pins=[variant.hook!,...p.bodies.find(b=>b.id===variant.bodyId)!.items];const plan:any={productionId:project!.id,variantId:vid,bodyId:variant.bodyId,ratio:'9:16',size:[720,1280],audio:'keep',segments:pins.map((pin,j)=>{const scene=p.scenes.find(s=>s.id===pin.sceneId)!,take=scene.takes.find(t=>t.id===pin.takeId)!;return {shotId:scene.id,sceneId:scene.id,takeId:take.id,assetId:take.assetId,sha256:take.sha256,inSec:0,outSec:[4,4,7][j]};})};plan.overlays=");write(p,s)
write(r/'scripts/check-t026f-ui.mjs',(o/'tmp-check-t026f-ui.mjs').read_text(encoding='utf-8'))
p=r/'tests/operations.test.mjs';write(p,p.read_text(encoding='utf-8')+'''
test('T-026f: three techniques are different and names are stable and filesystem safe',async()=>{
 const {autoVideoShots,videoName,hookTechniques}=await import('../lib/lab/auto-video.ts');
 const product={id:'p',data:{name:'Đèn',productKey:'DEN',situation:'Reading at night',ctaKeyword:'GLOW'}};
 const shots=autoVideoShots(product);assert.equal(shots.length,5);assert.equal(new Set(shots.slice(0,3).map(s=>s.prompt)).size,3);assert.deepEqual(hookTechniques,['problem','absurd','curiosity']);assert.ok(shots.every(s=>s.duration===8));
 assert.equal(videoName(product,1,'problem','account/one',Date.parse('2026-11-13T10:00:00Z')),'DEN_H1-problem_account-one_261113');
});
''')
p=r/'desktop/test/muse-night.test.mjs';write(p,p.read_text(encoding='utf-8')+'''
test('T-026f: configurable session limit persists without clearing receipts or stop latch',async()=>{
 const store=new Store(':memory:');try{let now=Date.now();const n=new MuseNight(store,{now:()=>now,sleep:async ms=>now+=ms});n.configure({intervalSeconds:60,sessionLimit:2});n.begin();await n.admit('a');await n.admit('b');assert.throws(()=>n.assertRoom(),{code:'MUSE_NIGHT_LIMIT'});n.configure({intervalSeconds:60,sessionLimit:5});assert.equal(n.status().remaining,3);assert.equal(new MuseNight(store).status().submitted,2);n.outcome('a',{code:'MUSE_REFUSED'});n.configure({intervalSeconds:60,sessionLimit:10});assert.throws(()=>n.assertRoom(),{code:'MUSE_NIGHT_STOP'});assert.throws(()=>n.configure({intervalSeconds:59,sessionLimit:10}));}finally{store.close();}
});
''')
