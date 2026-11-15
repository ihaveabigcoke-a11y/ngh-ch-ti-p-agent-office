export async function run({page,out,writeFile}){
 const result=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status(),office=(await(await fetch('/api/lab?view=office')).json()).view;
  const jobs=s.jobs.filter(j=>j.id==='3271665c-dddb-480a-be77-4c1a40846365'||j.request.projectId==='M20261114-p112');
  return {time:new Date().toISOString(),active:s.active,musePaused:s.musePaused,night:await window.productLabDesktop.museNightStatus(),jobs:jobs.map(j=>({id:j.id,state:j.state,projectId:j.request.projectId,sceneId:j.request.sceneId,hasProviderId:!!j.providerId,imported:!!j.importedAt,assetId:j.uploadedAssetId??null,failureCode:j.failureCode??null,error:j.error?String(j.error).replace(/https?:\/\/\S+/g,'[URL]').replace(/[\w.+-]+@[\w.-]+/g,'[account]').slice(0,230):null,output:j.output?{sha256:j.output.sha256,metadata:j.output.metadata}:null,history:j.history.slice(-5).map(e=>({at:e.at,state:e.state})),office:office.runs.filter(r=>r.id==='job:'+j.id).map(r=>({group:r.group,lastEvent:r.lastEvent,needsAction:r.needsAction}))}))};
 });await writeFile(out+'/poll-'+Date.now()+'.json',JSON.stringify(result,null,2));return result;
}
