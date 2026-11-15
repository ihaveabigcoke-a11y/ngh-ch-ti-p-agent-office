export async function run({page,out,writeFile}){
 const r=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status(),old=s.jobs.find(j=>j.id==='3271665c-dddb-480a-be77-4c1a40846365'),probe=s.jobs.find(j=>j.id==='f0634edd-0539-465e-b259-eb508e777b85'),before=await window.productLabDesktop.museNightStatus();
  if(s.active!==0||probe?.state!=='queued'||old?.state!=='needs_attention'||!old.providerId||before.submitted!==1||before.stopped)throw Error('Restart preservation gate failed');
  const preservation={jobCount:s.jobs.length,oldState:old.state,oldResultIdKept:!!old.providerId,probeState:probe.state,submitted:before.submitted,stopReason:before.stopReason};
  await window.productLabDesktop.start({count:1,maxConcurrent:1,jobIds:[probe.id]});
  const after=await window.productLabDesktop.status();return {preservation,active:after.active,probe:after.jobs.filter(j=>j.id===probe.id).map(j=>({id:j.id,state:j.state})),night:await window.productLabDesktop.museNightStatus()};
 });await writeFile(out+'/restart-verified-probe-running.json',JSON.stringify(r,null,2));return r;
}
