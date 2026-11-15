export async function run({page,out,writeFile}){
 const before=await page.evaluate(async()=>{
  const {records}=await (await fetch('/api/lab')).json(),s=await window.productLabDesktop.status();
  const digest=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(v))))).map(v=>v.toString(16).padStart(2,'0')).join('');
  return {records:await Promise.all(records.map(async r=>({id:r.id,kind:r.kind,hash:await digest(r)}))),jobs:await Promise.all(s.jobs.map(async j=>({id:j.id,hash:await digest(j)})))};
 });
 await writeFile(out+'/before-record-checksums.json',JSON.stringify(before,null,2));
 const check=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status(),p=s.profiles.find(p=>p.enabled);
  if(!p)throw Error('No enabled profile');
  await window.productLabDesktop.checkProfile({id:p.id});
  const after=await window.productLabDesktop.status(),checked=after.profiles.find(x=>x.id===p.id);
  return {profileId:p.id,health:checked.health,busy:checked.busy,quota:checked.quota,musePaused:after.musePaused,night:await window.productLabDesktop.museNightStatus()};
 });
 await writeFile(out+'/profile-preflight.json',JSON.stringify(check,null,2));return check;
}
