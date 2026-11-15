from pathlib import Path
r=Path('C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local')
def edit(file,old,new):
 p=r/file;s=p.read_text(encoding='utf-8');assert old in s,file;p.write_text(s.replace(old,new),encoding='utf-8')
edit('lib/lab/auto-video.ts','type FlowOptions={productId:',"type FlowOptions={mediaMode?:'muse'|'manual';productId:")
edit('lib/lab/auto-video.ts'," const progress=(s:string)=>o.onProgress?.(s);",""" const progress=(s:string)=>o.onProgress?.(s);
 function stop(reason:string,state='blocked'){progress(reason);return {state,project,reason};}
 const museOnly=o.mediaMode==='muse';""")
edit('lib/lab/auto-video.ts',"  if(status.musePaused!==false||!status.generationReady||missing().some((s:any)=>s.mediaProvider==='manual'))return manual();\n  await command('media_provider',{provider:'muse'},'muse');", """  if(o.mediaMode==='manual')return manual();
  if(status.musePaused!==false||!status.generationReady)return museOnly?stop(status.museNight?.stopReason||'Muse chưa sẵn sàng. Bật Muse và kiểm tra phiên trong Tài khoản; chưa gửi cảnh nào.') : manual();
  if(museOnly){
   // Explicit Làm video resumes Muse for missing scenes, including old manual fallbacks.
   // Provider commands never clear receipts or reconciliation marks.
   for(const s of missing())if(s.mediaProvider==='manual')await command('media_provider',{sceneId:s.id,provider:'muse'},'resume_muse_'+s.id+'_'+project!.revision);
  }else if(missing().some((s:any)=>s.mediaProvider==='manual'))return manual();
  if(project!.data.mediaProvider!=='muse')await command('media_provider',{provider:'muse'},'muse_'+project!.revision);""")
edit('lib/lab/auto-video.ts',"  if(preview.night?.stopped||(preview.night?.remaining!=null&&preview.count>preview.night.remaining))return manual();\n  if(preview.blocked){progress('Cần đối soát');return {state:'attention',project};}","""  if(preview.blocked)return stop('Có lượt Muse cần đối soát. Mở Tín hiệu để kiểm tra kết quả cũ; app chưa gửi thêm.','attention');
  if(preview.night?.stopped||(preview.night?.remaining!=null&&preview.count>preview.night.remaining))return museOnly?stop(preview.night?.stopReason||'Số lượt còn lại chưa đủ. Kiểm tra giới hạn trong Cài đặt; chưa gửi cảnh nào.'):manual();""")
edit('lib/lab/auto-video.ts',"if(status.musePaused||night.stopped)return manual();throw error;", "if(status.musePaused||night.stopped)return museOnly?stop(night.stopReason||(error as Error).message):manual();throw error;")
edit('lib/lab/auto-video.ts',"if(status.musePaused||night.stopped)return manual();", "if(status.musePaused||night.stopped)return museOnly?stop(night.stopReason||'Muse đã dừng. Mở Tín hiệu để xem lý do; các cảnh chưa tự chuyển sang nhập tay.'):manual();")
edit('lib/lab/auto-video.ts',"{progress('Cần đối soát');return {state:'attention',project};}","return stop('Lượt Muse chưa rõ kết quả. Mở Tín hiệu để đối soát; chưa gửi lại.','attention');")
edit('lib/lab/auto-video.ts',"   await wait(5000);await refresh();if(!missing().length)break;", "   await wait(5000);await refresh();progress('Đã nhận '+(project!.data.scenes.length-missing().length)+'/'+project!.data.scenes.length+' clip');if(!missing().length)break;")
edit('lib/lab/auto-video.ts',"  if(missing().length){progress('Đang tạo');return {state:'waiting',project};}","  if(missing().length)return stop('Muse vẫn đang xử lý hoặc chưa có clip. Mở Tín hiệu xem tiến độ; bấm Làm video để tiếp tục kiểm kết quả, không tạo dự án mới.','waiting');")
edit('lib/lab/auto-video.ts',"Cảnh còn thiếu đang chờ file nhập tay. Xuất gói prompt, tạo clip rồi chép vào Hộp nhận.","Dự án đang ở chế độ nhập tay, không có tác vụ tự tạo video. Bấm Làm video để chuyển các cảnh còn thiếu sang Muse.")
edit('lib/lab/auto-video.ts',"export const hookTechniques=", """export function resumableVideoProject(records:LabRecord[],product:LabRecord,savedId:string|null){
 const projects=records.filter(r=>r.kind==='production'&&r.data.productId===product.id&&r.data.productRevision===product.revision&&r.data.scenes?.length&&r.data.scenes.some((s:any)=>s.id==='auto_0')&&r.data.scenes.every((s:any)=>/^auto_[0-4]$/.test(s.id)||r.data.reuseBodyPlan?.segments.slice(1).some((segment:any)=>segment.sceneId===s.id))).sort((a,b)=>b.updatedAt-a.updatedAt);
 return projects.find(p=>p.id===savedId)??projects[0]??null;
}
export const hookTechniques=""")
edit('components/lab/compact-video.tsx','runVideoFlow,productVideoLibrary,videoRecovery','runVideoFlow,productVideoLibrary,videoRecovery,resumableVideoProject')
edit('components/lab/compact-video.tsx',"async function run(){", "async function run(mediaMode:'muse'|'manual'='muse'){")
edit('components/lab/compact-video.tsx',"let id=localStorage.getItem('hermes-video-'+product.id);if(!id){", "let id=resumableVideoProject(records,product,localStorage.getItem('hermes-video-'+product.id))?.id;if(!id){")
edit('components/lab/compact-video.tsx',"await runVideoFlow({productId:product.id,projectId:id,", "localStorage.setItem('hermes-video-'+product.id,id);const result=await runVideoFlow({mediaMode,productId:product.id,projectId:id,")
edit('components/lab/compact-video.tsx',"onProgress:setProgress});}catch(e)", "onProgress:setProgress});if('reason' in result&&result.reason)setError(result.reason);}catch(e)")
edit('components/lab/compact-video.tsx',"const sceneIds=scenes.filter((s:any)=>s.mediaProvider==='manual'", "const sceneIds=scenes.filter((s:any)=>s.mediaProvider==='manual'")
edit('components/lab/compact-video.tsx',"{error&&<p role=\"alert\">{error}</p>}", "{error&&<p role=\"alert\">{error}</p>}{busy&&<p role=\"status\">{progress||'Đang chuẩn bị…'} · Giữ màn Video mở tới khi hoàn tất.</p>}")
edit('components/lab/compact-video.tsx',"◷ Chờ file tay", "Nhập tay · không tự tạo")
edit('components/lab/compact-video.tsx',"<a href=\"?view=accounts\">Tài khoản Muse</a>", "<a href=\"?view=accounts\">Tài khoản Muse</a><Button tone=\"neutral\" disabled={busy||demo} onClick={()=>void run('manual')}>Chọn nhập file tay</Button>")
# Keep explicit refusals fast, but don't mistake asynchronous tool acknowledgements for final failure.
edit('desktop/src/muse.mjs',"// Selectors are configured", """export const explicitMediaRefusal = text => /(?:could not|cannot|can't|unable to)\\s+(?:create|generate|make)\\b.{0,60}\\b(?:video|image|file)\\b|\\b(?:video|image)\\s+generation\\s+(?:isn't|is not|is currently not|is not currently)\\s+available\\b/i.test(text);

// Selectors are configured""")
edit('desktop/src/muse.mjs',"if (Date.now() - completedAt >= 15000) {", "if (Date.now() - completedAt >= 15000 && explicitMediaRefusal(lastResponse)) {")
edit('desktop/src/muse.mjs',"    throw Error('Chưa thấy mã kết quả mới. Cần đối soát trước khi gửi tiếp.');", "    if(lastResponse)throw this.noMedia(page,lastResponse);\n    throw Error('Chưa thấy mã kết quả mới. Cần đối soát trước khi gửi tiếp.');")
edit('desktop/src/muse.mjs',"if (Date.now() - settledAt >= 15000) throw this.noMedia(page, response);", "if (Date.now() - settledAt >= 15000 && explicitMediaRefusal(response)) throw this.noMedia(page, response);")
