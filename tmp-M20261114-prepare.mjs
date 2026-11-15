export async function run({page,out,writeFile}){
 const result=await page.evaluate(async()=>{
  const {records}=await(await fetch('/api/lab')).json(),product=records.find(r=>r.kind==='product'&&r.data.productKey==='112'),id='M20261114-p112';
  if(!product)throw Error('Product 112 not found');
  let project=records.find(r=>r.id===id);const source=records.find(r=>r.kind==='production'&&r.data.productId===product.id&&r.data.references.length),ref=source.data.references.find(r=>r.role==='product');
  const command=async(action,input,key)=>{const commandId=id+'_'+key;if(project?.data.receipts.includes(commandId))return;const response=await fetch('/api/production',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,revision:project?.revision??0,action,input,commandId})});const body=await response.json();if(!response.ok)throw Error(body.error||'Production command failed');project=body.record;};
  if(!project)await command('create',{name:'Kiểm Muse thật 14/11 · Vòng cổ TIZE',productId:product.id,locale:'en-US'},'create');
  await command('reference',{id:'muse_live_reference',name:'Ảnh nguồn vòng cổ',role:'product',assetId:ref.assetId,sourceUrl:'',notes:'Ảnh nguồn đã có trong app; kiểm kỹ thuật, chưa duyệt quảng cáo hoặc công dụng.'},'reference');
  const common='Create an 8-second vertical 9:16 product video. Match the green tubular collar and black-and-green switch housing in the reference image. Keep the reference product physically consistent. No safety guarantees, waterproof demonstrations, invented features, logos, packaging text, captions or on-screen text. Natural room audio only. A staged tabletop demonstration; no animal needs to be handled.';
  const prompts=[
   'Clearly staged visual comedy: hands search a cluttered entryway tray for a plain collar, then pause beside the reference green collar. Exaggerate the inconvenience only, not product performance.',
   'Clearly staged absurd workaround: hands put a ridiculously oversized cardboard arrow beside an ordinary collar on a table, then set down the reference green collar. Do not modify or attach anything to an animal.',
   'Begin with an extreme close-up of the reference collar switch housing; slowly pull back to reveal the complete green tubular collar on a neutral table. Keep its shape and materials consistent.',
   'Hands carefully lift the reference green collar from a plain unbranded tray and turn it on the tabletop to show the switch housing and flexible tube. Do not invent packaging or specifications.',
   'A simple slow tabletop product turn showing the same complete green collar and switch housing. Use only the appearance shown in the reference, with restrained light and no exaggerated performance claims.'
  ];
  if(!project.data.scenes.length)await command('import',{rows:prompts.map((p,i)=>({id:'auto_'+i,name:['Phóng đại vấn đề','Tự chế ngớ ngẩn','Gây tò mò','Mở hộp','Kết quả'][i],role:i<3?'hook':'body',prompt:common+'\n'+p,ratio:'9:16',duration:8,mediaType:'video',referenceIds:['muse_live_reference'],fromSec:i<3?0:i===3?4:8,toSec:i<3?4:i===3?8:15,overlayText:i===3?'Vs…':null}))},'shots');
  await command('media_provider',{provider:'muse'},'muse');
  await command('storyboard',{sceneId:'auto_0'},'board_auto_0');
  const preview=await window.productLabDesktop.musePackagePreview({projectId:id,revision:project.revision});
  const s=await window.productLabDesktop.status();return {projectId:id,productId:product.id,revision:project.revision,sceneCount:project.data.scenes.length,approved:project.data.scenes.filter(x=>x.storyboardApproved).length,preview,adapter:{resultCards:s.adapter.resultCards,readyWithinCard:s.adapter.readyWithinCard,resultIdAttribute:s.adapter.resultIdAttribute,timeoutSeconds:s.adapter.timeoutSeconds,downloadButtonName:s.adapter.downloadButtonName}};
 });await writeFile(out+'/prepared-project.json',JSON.stringify(result,null,2));return result;
}
