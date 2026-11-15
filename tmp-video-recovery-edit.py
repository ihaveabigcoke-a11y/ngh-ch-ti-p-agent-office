from pathlib import Path
r=Path('C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local')
def replace(path,old,new):
 p=r/path;s=p.read_text(encoding='utf-8');assert old in s,path;p.write_text(s.replace(old,new),encoding='utf-8')
replace('desktop/src/manual-media.mjs',"const destination=join(base,`${rows[0].productCode}-${stamp(date)}`);\n    try {await stat(destination); throw Error('Đã có gói trong phút này. Giữ gói cũ; xuất lại vào phút tiếp theo.');} catch(error) {if(error.code!=='ENOENT')throw error;}","let destination=join(base,`${rows[0].productCode}-${stamp(date)}`);\n    // Preserve prior packs, including other projects for the same product.\n    // The instance serializes exports; a collision gets a new immutable path.\n    try {await stat(destination); destination += '-' + randomUUID();} catch(error) {if(error.code!=='ENOENT')throw error;}")
replace('desktop/test/manual-media.test.mjs',"await assert.rejects(media.exportPack({projectId:'project_fixture'},new Date(2026,10,12,19,5)),/Đã có gói/);", """const second=await media.exportPack({projectId:'project_fixture'},new Date(2026,10,12,19,5));
  assert.notEqual(second.path,pack.path);
  assert.equal(await readFile(join(pack.path,`${code}.txt`),'utf8'),prompt,'old prompt is immutable');
  assert.deepEqual(await readFile(join(pack.path,`${code}-ref-1.webp`)),packed,'old reference is immutable');
  assert.equal(await readFile(join(second.path,`${code}.txt`),'utf8'),prompt);
  assert.equal((await scene('one')).exportedPath,second.path);
  const parallel=await Promise.all([1,2].map(()=>media.exportPack({projectId:'project_fixture'},new Date(2026,10,12,19,5))));
  assert.equal(new Set([pack,second,...parallel].map(p=>p.path)).size,4);
  for(const exported of parallel)assert.equal(await readFile(join(exported.path,`${code}.txt`),'utf8'),prompt);""")
replace('lib/lab/auto-video.ts',"export const hookTechniques=", """/** Read-only library across projects; never attaches old takes to the new timeline. */
export function productVideoLibrary(records:LabRecord[],productId:string){
 const projects=records.filter(r=>r.kind==='production'&&r.data.productId===productId).sort((a,b)=>b.updatedAt-a.updatedAt);
 return {
  clips:projects.flatMap(project=>(project.data.scenes??[]).filter((s:any)=>s.mediaType==='video').flatMap((scene:any)=>(scene.takes??[]).filter((t:any)=>t.assetId).map((take:any)=>({project,scene,take})))),
  exports:projects.flatMap(project=>(project.data.exports??[]).filter((e:any)=>e.kind==='render'&&e.verified&&e.assetId).map((output:any)=>({project,output}))),
 };
}
export function videoRecovery(project:LabRecord|undefined,status:any){
 const missing=(project?.data.scenes??[]).filter((s:any)=>!s.takes.some((t:any)=>t.sceneRevision===s.revision&&t.review!=='rejected'));
 const jobs=(status?.jobs??[]).filter((j:any)=>j.request?.projectId===project?.id&&missing.some((s:any)=>s.id===j.request.sceneId&&s.revision===j.request.sceneRevision));
 const unresolved=jobs.filter((j:any)=>['unknown','needs_attention'].includes(j.state));
 const noMedia=unresolved.some((j:any)=>j.failureCode==='MUSE_NO_MEDIA');
 const attention=unresolved.some((j:any)=>!['MUSE_NO_MEDIA','MUSE_REFUSED'].includes(j.failureCode));
 const manual=missing.some((s:any)=>s.mediaProvider==='manual');
 const message=noMedia?'Muse đã trả lời nhưng chưa tạo video. Lượt cũ được giữ; xem phản hồi trước khi gửi lại.':attention?'Kết quả lượt Muse chưa rõ. Mở Tín hiệu để đối soát trước khi gửi lại.':missing.length&&manual?'Cảnh còn thiếu đang chờ file nhập tay. Xuất gói prompt, tạo clip rồi chép vào Hộp nhận.':missing.length&&status?.musePaused?'Muse đang tạm dừng nên chưa tạo clip mới. Kiểm tra trong Tài khoản hoặc dùng file nhập tay.':'';
 return {message,manual,attention,noMedia};
}
export const hookTechniques=""")
replace('lib/lab/auto-video.ts',"if(scenes.length)await o.bridge.manualMediaExport({projectId:project!.id,sceneIds:scenes.map((s:any)=>s.id)});", "const pack=scenes.length?await o.bridge.manualMediaExport({projectId:project!.id,sceneIds:scenes.map((s:any)=>s.id)}):null;")
replace('lib/lab/auto-video.ts',"return {state,project};", "return {state,project,pack};")
replace('components/lab/compact-video.tsx',"import {runVideoFlow}","import {runVideoFlow,productVideoLibrary,videoRecovery}")
replace('components/lab/compact-video.tsx',"import './compact-flow.css';", "import {useDesktopStatus} from '@/lib/lab/use-desktop-status';\nimport {useManualMedia} from './manual-media';\nimport './compact-flow.css';")
replace('components/lab/compact-video.tsx',",[musePaused,setMusePaused]=useState(true)","")
replace('components/lab/compact-video.tsx'," const autoStarted=", " const {status,refresh:refreshStatus}=useDesktopStatus(!demo),manual=useManualMedia(!demo),musePaused=status?.musePaused!==false;\n const autoStarted=")
replace('components/lab/compact-video.tsx',"const poll=()=>void desktopBridge()?.status().then(s=>setMusePaused(s.musePaused!==false)).catch(()=>{});poll();const timer=setInterval(poll,5000);return()=>{clearInterval(timer);controller.current?.abort();};", "return()=>{controller.current?.abort();};")
replace('components/lab/compact-video.tsx',",clips=scenes.flatMap((s:any)=>s.takes.map((t:any)=>({...t,scene:s})));", ";\n const library=productVideoLibrary(active?[active,...records.filter(r=>r.id!==active.id)]:records,product?.id??''),recovery=videoRecovery(project,status);\n const packs=[...new Set((manual.status?.scenes??[]).filter(s=>s.projectId===project?.id&&s.exportedPath).map(s=>s.exportedPath!))];\n async function openInbox(){if(!project||lock.current)return;setError('');try{await desktopBridge()!.manualMediaOpen({projectId:project.id});await manual.refresh();}catch(e){setError((e as Error).message);}}\n async function exportPack(){if(!project||lock.current)return;lock.current=true;setBusy(true);setError('');try{const sceneIds=scenes.filter((s:any)=>s.mediaProvider==='manual'&&!s.takes.some((t:any)=>t.sceneRevision===s.revision&&t.review!=='rejected')).map((s:any)=>s.id);await desktopBridge()!.manualMediaExport({projectId:project.id,sceneIds});await manual.refresh();}catch(e){setError((e as Error).message);}finally{lock.current=false;setBusy(false);}}")
replace('components/lab/compact-video.tsx',"void desktopBridge()?.status().then(s=>setMusePaused(s.musePaused!==false)).catch(()=>{});lock.current=false;", "void refreshStatus();void manual.refresh();lock.current=false;")
replace('components/lab/compact-video.tsx',"{musePaused?'Muse đang tạm dừng':'Muse sẵn sàng'}", "{!status?'Đang kiểm tra Muse':musePaused?'Muse đang tạm dừng':status.generationReady?'Muse sẵn sàng':'Muse chưa sẵn sàng'}")
replace('components/lab/compact-video.tsx',"setActive(null);setProgress('');", "setActive(null);setProgress('');setError('');setHookIndex(0);")
replace('components/lab/compact-video.tsx',"{error&&<p role=\"alert\">{error}</p>}", """{error&&<p role="alert">{error}</p>}
 {product&&recovery.message&&<aside className="info-panel" aria-label="Tiếp tục video"><p role="status">{recovery.message}</p><div className="compact-toolbar"><a href="?view=signals">Xem Tín hiệu</a><a href="?view=accounts">Tài khoản Muse</a>{recovery.manual&&<><Button tone="neutral" disabled={busy||demo} onClick={()=>void exportPack()}>Xuất gói prompt</Button><Button tone="neutral" disabled={busy||demo} onClick={()=>void openInbox()}>Mở Hộp nhận</Button></>}</div>{recovery.manual&&<p>Tạo clip theo gói, giữ mã cảnh trong tên file rồi chép vào Hộp nhận. Sau khi nhận đủ clip, bấm Làm video.</p>}{packs.map(path=><p className="manual-path" key={path}>Gói prompt: {path}</p>)}{manual.error&&<p role="alert">{manual.error}</p>}</aside>}
""")
replace('components/lab/compact-video.tsx',"<details><summary>Thư viện</summary><div className=\"compact-cards\">{clips.map((t:any)=><div className=\"compact-picture\" key={t.id}><video src={'/api/assets/'+t.assetId} poster={'/api/assets/'+t.assetId+'?thumbnail=1'} muted playsInline loop preload=\"none\" controls onMouseEnter={e=>void e.currentTarget.play().catch(()=>{})} onMouseLeave={e=>e.currentTarget.pause()}/></div>)}</div></details>","""<details key={product?.id} open={!exports.length&&library.clips.length>0}><summary>Thư viện sản phẩm ({library.clips.length} clip)</summary>{!library.clips.length&&<p>Chưa nhận được clip cho sản phẩm này.</p>}<div className="compact-cards">{library.clips.map(({project:source,scene,take:t}:any)=><article className="compact-card" key={source.id+'-'+scene.id+'-'+t.id}><div className="compact-picture"><video src={'/api/assets/'+t.assetId} poster={'/api/assets/'+t.assetId+'?thumbnail=1'} playsInline preload="metadata" controls/></div><h3>{scene.name}</h3><p>{source.data.name}{source.id!==project?.id?' · Dự án trước':''}{t.review==='rejected'?' · Đã loại':''}</p></article>)}</div>{library.exports.some(e=>e.project.id!==project?.id)&&<><h2>Bản xuất từ dự án trước</h2><div className="compact-cards" data-previous-exports>{library.exports.filter(e=>e.project.id!==project?.id).map(({project:source,output:e}:any)=><article key={source.id+'-'+e.id} className="compact-card"><div className="compact-picture"><video src={'/api/assets/'+e.assetId} poster={'/api/assets/'+e.assetId+'?thumbnail=1'} controls playsInline preload="metadata"/></div><h3>{e.filename}</h3><p>{source.data.name}</p></article>)}</div></>}</details>""")
