import {readFile} from 'node:fs/promises';
export async function run({page,out,writeFile}){
 const baseline=JSON.parse(await readFile(out+'/before-record-checksums.json','utf8'));
 const result=await page.evaluate(async baseline=>{
  const api=window.productLabDesktop,s=await api.status(),night=await api.museNightStatus();
  const {records}=await(await fetch('/api/lab')).json(),office=(await(await fetch('/api/lab?view=office')).json()).view;
  const id='f0634edd-0539-465e-b259-eb508e777b85',j=s.jobs.find(j=>j.id===id),run=office.runs.find(r=>r.id==='job:'+id);
  if(!s.musePaused||s.active!==0||night.submitted!==2||night.successful!==0||j?.state!=='needs_attention'||!j.providerId||run?.group!=='attention')throw Error('Final preservation gate failed');
  const digest=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(v))))).map(x=>x.toString(16).padStart(2,'0')).join('');
  const changedRecords=[],missingRecords=[],changedJobs=[],missingJobs=[];
  for(const b of baseline.records){const r=records.find(r=>r.id===b.id);if(!r)missingRecords.push(b.id);else if(await digest(r)!==b.hash)changedRecords.push({id:r.id,kind:r.kind});}
  for(const b of baseline.jobs){const j=s.jobs.find(j=>j.id===b.id);if(!j)missingJobs.push(b.id);else if(await digest(j)!==b.hash)changedJobs.push({id:j.id,state:j.state});}
  if(changedRecords.length||missingRecords.length||missingJobs.length||changedJobs.some(j=>j.id!=='3271665c-dddb-480a-be77-4c1a40846365'))throw Error('Prior data preservation failed');
  let rejected=false;try{const p=await api.musePackagePreview({projectId:'M20261114-p112'});await api.musePackageStart({projectId:p.projectId,revision:p.revision});}catch{rejected=true;}
  const after=await api.status(),nightAfter=await api.museNightStatus();
  if(!rejected||after.jobs.length!==s.jobs.length||nightAfter.submitted!==night.submitted)throw Error('Paused send guard failed');
  return {at:new Date().toISOString(),musePaused:s.musePaused,active:s.active,night,recordCount:records.length,baselineRecords:baseline.records.length,changedRecords,missingRecords,baselineJobs:baseline.jobs.length,jobCount:s.jobs.length,missingJobs,changedJobs,pausedSendRejected:rejected,receiptPreserved:!!j.providerId,group:run.group,historyCount:run.history.length};
 },baseline);
 await page.goto(new URL(page.url()).origin+'/?view=signals');const card=page.locator('article[data-run-id="job:f0634edd-0539-465e-b259-eb508e777b85"]');await card.waitFor();
 result.shots=[];
 for(const [width,height] of [[1366,768],[1920,1080]]){
  await page.setViewportSize({width,height});await card.scrollIntoViewIfNeeded();
  if(await card.getAttribute('data-group')!=='attention')throw Error('UI must show the same needs-attention group');
  await page.screenshot({path:out+'/final-signals-'+width+'.png'});result.shots.push('final-signals-'+width+'.png');
  await card.locator('.compact-card-open').click();const modal=page.getByRole('dialog');await modal.waitFor();await page.waitForTimeout(650);
  if(!(await modal.innerText()).includes('Kết quả chưa rõ'))throw Error('Missing actionable reconciliation reason');
  await page.screenshot({path:out+'/final-history-'+width+'.png'});result.shots.push('final-history-'+width+'.png');await page.keyboard.press('Escape');await modal.waitFor({state:'hidden'});
 }
 await writeFile(out+'/final-real-audit.json',JSON.stringify(result,null,2));return result;
}
