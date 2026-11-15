import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
function edit(path,from,to){const s=fs.readFileSync(root+path,'utf8');if(!s.includes(from))throw Error('Missing anchor '+path);fs.writeFileSync(root+path,s.replace(from,to));}
edit('desktop/src/muse-night.mjs','sessionLimit:z.number().int().min(1).max(1000).default(12)','sessionLimit:z.number().int().min(1).max(1000).nullable().default(12)');
edit('desktop/src/muse-night.mjs','remaining:Math.max(0,this.settings().sessionLimit-submitted)','remaining:this.settings().sessionLimit===null?null:Math.max(0,this.settings().sessionLimit-submitted)');
edit('desktop/src/muse-night.mjs','stopReason:row?.stopReason??null','stopReason:row?.stopReason?.replace(\'Dừng hết đêm; dùng manual.\',\'Kiểm tra Muse trước khi bật lại.\')??null');
edit('desktop/src/muse-night.mjs','if(count>s.remaining)','if(s.remaining!==null&&count>s.remaining)');
edit('desktop/src/muse-night.mjs',' async admit(jobId,allowed=()=>true){',` // Called only by the explicit enable confirmation; never by begin/configure/start.
 resume(){const row=this.current();if(!row?.stopReason)return this.status();
  this.save({...row,consecutiveErrors:0,stopReason:null,resumptions:[...(row.resumptions??[]),{at:this.now(),stopReason:row.stopReason,consecutiveErrors:row.consecutiveErrors,submitted:row.submissions.length}]});
  return this.status();
 }
 async admit(jobId,allowed=()=>true){`);
edit('desktop/src/worker.mjs','async setMusePaused({paused})','async setMusePaused({paused,resumeStopped=false})');
edit('desktop/src/worker.mjs',"    if(!paused&&this.night.current()?.stopReason)this.night.assertRoom();",`    if(typeof resumeStopped!=='boolean')throw Error('Xác nhận bật lại Muse không hợp lệ.');
    if(!paused&&this.night.current()?.stopReason){
      if(!resumeStopped)this.night.assertRoom();
      if(this.active.size||this.chatting.size)throw Object.assign(Error('Chờ tác vụ Muse đang chạy kết thúc rồi bật lại.'),{code:'MUSE_RESUME_BUSY'});
      // Cancel old approvals before lifting the stop. Receipts and jobs stay intact.
      this.pause();this.night.resume();
    }`);
edit('desktop/src/contracts.mjs',"MUSE_NIGHT_STOP:error?.message===", "MUSE_RESUME_BUSY:'Chờ tác vụ Muse đang chạy kết thúc rồi bật lại.',MUSE_NIGHT_STOP:error?.message===");
edit('desktop/src/contracts.mjs',"'Chưa thể bật Muse trong phiên đã dừng. Xem lý do tại Tài khoản Muse; giữ các lượt cũ để đối soát.'", "'Phiên Muse đã dừng sau từ chối, giới hạn hoặc lỗi. Xem lý do và xác nhận Bật lại Muse; các lượt cũ được giữ để đối soát.'");
edit('components/lab/muse-switch.tsx',"if(busy||(!paused&&stopReason))return;", "if(busy)return;");
edit('components/lab/muse-switch.tsx','setMusePaused({paused})','setMusePaused({paused,resumeStopped:!paused&&!!stopReason})');
edit('components/lab/muse-switch.tsx','disabled={demo||busy||!status||(paused&&!!stopReason)}','disabled={demo||busy||!status}');
edit('components/lab/muse-switch.tsx','title="Bật Muse"','title={stopReason?"Bật lại Muse":"Bật Muse"}');
edit('components/lab/muse-switch.tsx','disabled={busy||!!stopReason} onClick={()=>void save(false)}>Bật Muse</Button>','disabled={busy} onClick={()=>void save(false)}>{stopReason?\'Bật lại Muse\':\'Bật Muse\'}</Button>');
edit('components/lab/muse-package.tsx','remaining:number;limit:number;','remaining:number|null;limit:number|null;');
edit('components/lab/muse-package.tsx','Đêm còn ${preview.night.remaining}/${preview.night.limit} lượt','${preview.night.remaining===null?\'Không giới hạn lượt trong Hermes\':`Phiên còn ${preview.night.remaining}/${preview.night.limit} lượt`}');
edit('components/lab/muse-package.tsx','preview.count>preview.night.remaining','(preview.night.remaining!==null&&preview.count>preview.night.remaining)');
edit('components/lab/muse-package.tsx','const [limit,setLimit]=useState(12),','const [unlimited,setUnlimited]=useState(false),[limit,setLimit]=useState(12),');
edit('components/lab/muse-package.tsx','setLimit(s.limit);','setLimit(s.limit??12);setUnlimited(s.limit===null);');
edit('components/lab/muse-package.tsx','<label>Trần lượt mỗi phiên<input','<label><input type="checkbox" checked={unlimited} onChange={e=>setUnlimited(e.target.checked)}/> Không giới hạn lượt trong Hermes</label><p>Hạn mức tài khoản do Muse quyết định; Hermes vẫn kiểm trước khi gửi.</p><label>Trần lượt mỗi phiên<input disabled={unlimited}');
edit('components/lab/muse-package.tsx','sessionLimit:limit','sessionLimit:unlimited?null:limit');
edit('components/lab/muse-package.tsx','onClick={()=>void desktopBridge()!.saveMusePacing','onClick={()=>{setError(\'\');void desktopBridge()!.saveMusePacing');
edit('components/lab/muse-package.tsx',".then(setStatus).catch(e=>setError(e.message))}>Lưu giãn nhịp", ".then(s=>{setStatus(s);window.dispatchEvent(new Event('product-lab:workspace-changed'));}).catch(e=>setError(e.message));}}>Lưu giãn nhịp");
edit('components/lab/muse-package.tsx','Còn {status.remaining} lượt','{status.remaining===null?\'Không giới hạn lượt trong Hermes\':`Còn ${status.remaining} lượt`}');
edit('lib/lab/auto-video.ts','preview.night?.stopped||preview.count>preview.night?.remaining','preview.night?.stopped||(preview.night?.remaining!=null&&preview.count>preview.night.remaining)');
console.log('Patched Muse resume and optional internal cap; receipts and provider checks unchanged.');
