export async function run({page,out,writeFile}){
 const r=await page.evaluate(async()=>{
  const p=await window.productLabDesktop.musePackagePreview({projectId:'M20261114-p112'});
  if(p.count!==1||p.blocked||p.night.stopped||p.night.intervalSeconds<60)throw Error('Preflight gate not satisfied');
  const start=await window.productLabDesktop.musePackageStart({projectId:p.projectId,revision:p.revision});
  const s=await window.productLabDesktop.status();return {started:start.count,jobIds:start.jobIds,night:start.night,active:s.active,jobStates:s.jobs.filter(j=>start.jobIds.includes(j.id)).map(j=>({id:j.id,state:j.state,sceneId:j.request.sceneId}))};
 });await writeFile(out+'/probe-start.json',JSON.stringify(r,null,2));return r;
}
