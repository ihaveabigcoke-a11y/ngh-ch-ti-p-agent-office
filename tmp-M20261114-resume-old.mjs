export async function run({page,out,writeFile}){
 const result=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status(),job=s.jobs.find(j=>j.id==='3271665c-dddb-480a-be77-4c1a40846365');
  if(!job||job.state!=='needs_attention'||!job.providerId)throw Error('Existing job cannot be safely resumed');
  const before=await window.productLabDesktop.museNightStatus();
  await window.productLabDesktop.resume({id:job.id});
  const after=await window.productLabDesktop.museNightStatus();
  return {jobId:job.id,action:'resume existing provider result only',submittedBefore:before.submitted,submittedAfter:after.submitted};
 });await writeFile(out+'/resume-existing-start.json',JSON.stringify(result,null,2));return result;
}
