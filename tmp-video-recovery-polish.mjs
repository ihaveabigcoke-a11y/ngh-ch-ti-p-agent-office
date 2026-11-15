import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
const p=root+'components/lab/compact-video.tsx';let s=fs.readFileSync(p,'utf8');
s=s.replace('project=active?.data.productId===product?.id?active:', 'activeRecord=active?(records.find(r=>r.id===active.id&&r.revision>=active.revision)??active):null,project=activeRecord?.data.productId===product?.id?activeRecord:');
s=s.replace('productVideoLibrary(active?[active,...records.filter(r=>r.id!==active.id)]:records','productVideoLibrary(activeRecord?[activeRecord,...records.filter(r=>r.id!==activeRecord.id)]:records');
s=s.replace('void refreshStatus();','void refreshStatus().catch(()=>{});');fs.writeFileSync(p,s);
for(const file of ['components/lab/compact-video.tsx','lib/lab/auto-video.ts','desktop/src/manual-media.mjs','desktop/test/manual-media.test.mjs','tests/auto-video.test.mjs']){const p=root+file;fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n'));}
const lock=root+'.git/office-locks/codex-M-20261114-video-recovery.txt';let l=fs.readFileSync(lock,'utf8');if(!l.includes('scripts/check-video-recovery-ui.mjs'))l+='\nscripts/check-video-recovery-ui.mjs\n';fs.writeFileSync(lock,l);
