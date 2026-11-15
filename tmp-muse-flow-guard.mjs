import fs from 'node:fs';const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
function edit(file,old,value){let s=fs.readFileSync(root+file,'utf8').replace(/\r\n/g,'\n');if(!s.includes(old))throw Error(file);fs.writeFileSync(root+file,s.replace(old,value));}
edit('desktop/src/worker.mjs',"async recheckResult({id}) {\n    // Inspection reads", "async recheckResult({id,recoverExisting=false}) {\n    if(!recoverExisting)await this.assertJobNotSkipped(id);\n    // Inspection reads");
edit('desktop/src/worker.mjs',"async resume(id) {\n    // A known", "async resume(id,{recoverExisting=false}={}) {\n    if(!recoverExisting)await this.assertJobNotSkipped(id);\n    // A known");
edit('desktop/src/main.mjs',"resume:p=>worker.resume(p.id)","resume:p=>worker.resume(p.id,{recoverExisting:p.recoverExisting===true})");
edit('components/lab/compact-video.tsx',"bridge.recheckResult({id:job.id})","bridge.recheckResult({id:job.id,recoverExisting:true})");
edit('components/lab/compact-video.tsx',"bridge.resume({id:job.id})","bridge.resume({id:job.id,recoverExisting:true})");
fs.appendFileSync(root+'.git/office-locks/codex-M-20261114-muse-flow.txt','desktop/src/main.mjs\ndesktop/test/worker-controls.test.mjs\n');
