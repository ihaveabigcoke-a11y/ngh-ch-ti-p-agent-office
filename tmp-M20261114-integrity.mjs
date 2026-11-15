import {readFile} from 'node:fs/promises';
export async function run({page,out,writeFile}){
 const baseline=JSON.parse(await readFile(out+'/before-record-checksums.json','utf8'));
 const result=await page.evaluate(async baseline=>{
  const s=await window.productLabDesktop.status(), api=window.productLabDesktop;
  const {records}=await(await fetch('/api/lab')).json();
  const digest=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(v))))).map(x=>x.toString(16).padStart(2,'0')).join('');
  const changedRecords=[],missingRecords=[],changedJobs=[],missingJobs=[];
  for(const b of baseline.records){const r=records.find(r=>r.id===b.id);if(!r)missingRecords.push(b.id);else if(await digest(r)!==b.hash)changedRecords.push({id:r.id,kind:r.kind});}
  for(const b of baseline.jobs){const j=s.jobs.find(j=>j.id===b.id);if(!j)missingJobs.push(b.id);else if(await digest(j)!==b.hash)changedJobs.push({id:j.id,state:j.state});}
  const preview=await api.musePackagePreview({projectId:'M20261114-p112'});
  if(preview.count!==0)throw Error('Unexpected new scenes; refuse duplicate probe');
  const before=await api.museNightStatus();let rejected=false,reason='';
  try{await api.musePackageStart({projectId:preview.projectId,revision:preview.revision});}catch(e){rejected=true;reason=e.message;}
  const after=await api.museNightStatus(),final=await api.status();
  const result={at:new Date().toISOString(),baselineRecords:baseline.records.length,baselineJobs:baseline.jobs.length,missingRecords,changedRecords,missingJobs,changedJobs,newRecords:records.filter(r=>!baseline.records.some(b=>b.id===r.id)).map(r=>({id:r.id,kind:r.kind})),duplicate:{previewCount:preview.count,blocked:preview.blocked,rejected,reason,jobCountBefore:s.jobs.length,jobCountAfter:final.jobs.length,submittedBefore:before.submitted,submittedAfter:after.submitted}};
  if(!rejected||s.jobs.length!==final.jobs.length||before.submitted!==after.submitted)throw Error('Duplicate gate failed');
  return result;
 },baseline);
 await writeFile(out+'/integrity-'+Date.now()+'.json',JSON.stringify(result,null,2));return result;
}
