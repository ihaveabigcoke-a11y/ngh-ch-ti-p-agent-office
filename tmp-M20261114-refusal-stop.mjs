export async function run({page,out,writeFile}){
 const r=await page.evaluate(async()=>{
  const api=window.productLabDesktop;await api.setMusePaused({paused:true});
  const s=await api.status();return {time:new Date().toISOString(),musePaused:s.musePaused,paused:s.paused,active:s.active,night:await api.museNightStatus(),jobs:s.jobs.filter(j=>j.id==='f0634edd-0539-465e-b259-eb508e777b85'||j.id==='3271665c-dddb-480a-be77-4c1a40846365').map(j=>({id:j.id,state:j.state,hasProviderId:!!j.providerId,history:j.history.slice(-4).map(h=>({state:h.state,at:h.at}))}))};
 });
 r.observedProviderMessage="Video generation isn't available for this account in your country or region, so I can't make the 8-second video. It's a lasting restriction, not a temporary outage, so retrying won't help.";
 r.source='Visible response in the existing worker browser; provider-visible.png';
 await writeFile(out+'/refusal-observed-stop.json',JSON.stringify(r,null,2));return r;
}
