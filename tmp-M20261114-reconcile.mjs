export async function run({page,out,writeFile}){
 const result=await page.evaluate(async()=>{
  const s=await window.productLabDesktop.status(),j=s.jobs.find(j=>j.request.projectId==='T025-p112-20261113'&&j.state==='needs_attention');
  if(!j)return {rechecked:false,reason:'No matching attention job'};
  if(j.providerId||!j.providerResponse||!j.providerUrl||!j.profileId)return {rechecked:false,id:j.id,state:j.state,hasProviderId:!!j.providerId,hasResponse:!!j.providerResponse,hasUrl:!!j.providerUrl,hasProfile:!!j.profileId,history:j.history.slice(-5).map(e=>({state:e.state,at:e.at})),reason:'Cannot automatically inspect this old job; preserving it without resubmission'};
  const r=await window.productLabDesktop.recheckResult({id:j.id});
  const office=(await(await fetch('/api/lab?view=office')).json()).view;
  return {rechecked:true,id:r.id,before:j.state,after:r.state,hasProviderId:!!r.providerId,hasOutput:!!r.output,historyCount:r.history.length,office:office.runs.filter(x=>x.id==='job:'+r.id).map(x=>({id:x.id,group:x.group,event:x.event})),night:await window.productLabDesktop.museNightStatus()};
 });
 await writeFile(out+'/reconcile-old-job.json',JSON.stringify(result,null,2));
 const image=await page.evaluate(async()=>{
  const {records}=await (await fetch('/api/lab')).json();const product=records.find(r=>r.kind==='product'&&r.data.productKey==='112');
  const project=records.find(r=>r.kind==='production'&&r.data.productId===product.id&&r.data.references.length),ref=project.data.references.find(r=>r.role==='product');const asset=records.find(r=>r.id===ref.assetId);
  const response=await fetch('/api/assets/'+asset.id);if(!response.ok)throw Error('Reference read failed');
  return {bytes:Array.from(new Uint8Array(await response.arrayBuffer())),id:asset.id,type:asset.data.type,sha256:asset.data.sha256,productId:product.id,productRevision:product.revision,productName:product.data.name};
 });
 await writeFile(out+'/reference-product',Buffer.from(image.bytes));delete image.bytes;
 await writeFile(out+'/selected-product.json',JSON.stringify(image,null,2));return {reconcile:result,reference:image};
}
