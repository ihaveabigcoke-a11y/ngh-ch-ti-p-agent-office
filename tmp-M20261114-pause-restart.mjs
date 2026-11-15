export async function run({page,out,writeFile}){
 const r=await page.evaluate(async()=>{
  await window.productLabDesktop.pause();const s=await window.productLabDesktop.status();
  const pending=s.jobs.find(j=>j.id==='f0634edd-0539-465e-b259-eb508e777b85');if(pending?.state!=='queued')throw Error('Probe is no longer queued; do not restart');
  return {paused:s.paused,musePaused:s.musePaused,active:s.active,newJob:{id:pending.id,state:pending.state},oldJob:s.jobs.filter(j=>j.id==='3271665c-dddb-480a-be77-4c1a40846365').map(j=>({id:j.id,state:j.state,hasProviderId:!!j.providerId})),night:await window.productLabDesktop.museNightStatus()};
 });await writeFile(out+'/before-graceful-restart.json',JSON.stringify(r,null,2));return r;
}
