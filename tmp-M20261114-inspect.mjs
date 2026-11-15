export async function run({page,out,writeFile}){
 const result=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status(),night=await window.productLabDesktop.museNightStatus();
  const {records}=await (await fetch('/api/lab')).json();
  const products=records.filter(r=>r.kind==='product'&&!r.data.archived).sort((a,b)=>b.updatedAt-a.updatedAt).slice(0,6).map(p=>({id:p.id,revision:p.revision,name:p.data.name,productKey:p.data.productKey,ctaKeyword:p.data.ctaKeyword,hasImage:!!p.data.imageUrl,imageLocal:String(p.data.imageUrl??'').startsWith('/api/assets/')}));
  const projects=records.filter(r=>r.kind==='production').sort((a,b)=>b.updatedAt-a.updatedAt).slice(0,6).map(p=>({id:p.id,productId:p.data.productId,revision:p.revision,scenes:p.data.scenes.length,references:p.data.references.map(r=>({id:r.id,assetId:r.assetId,role:r.role})),takes:p.data.scenes.reduce((n,s)=>n+s.takes.length,0),exports:p.data.exports.length}));
  return {time:new Date().toISOString(),musePaused:s.musePaused,paused:s.paused,active:s.active,generationReady:s.generationReady,profileCount:s.profiles.length,profiles:s.profiles.map(p=>({id:p.id,enabled:p.enabled,health:p.health,status:p.status,open:p.open,busy:p.busy,quota:p.quota})),night,jobCounts:s.jobs.reduce((o,j)=>(o[j.state]=(o[j.state]||0)+1,o),{}),attention:s.jobs.filter(j=>['needs_attention','unknown'].includes(j.state)).map(j=>({id:j.id,state:j.state,projectId:j.request.projectId,sceneId:j.request.sceneId,failureCode:j.failureCode??null})),products,projects};
 });
 await writeFile(out+'/initial-summary.json',JSON.stringify(result,null,2));return result;
}
