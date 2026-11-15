export async function run({page}){
 return await page.evaluate(async()=>{
  const api=window.productLabDesktop,s=await api.status(),job=s.jobs.find(j=>j.id==='f0634edd-0539-465e-b259-eb508e777b85');
  if(!job?.profileId)throw Error('No profile for acceptance job');
  await api.openProfile({id:job.profileId});
  return {openedExistingBrowser:true,jobState:job.state};
 });
}
