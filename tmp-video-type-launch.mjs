import {mkdir,writeFile} from 'node:fs/promises';
import {openSync,closeSync} from 'node:fs';
import {spawn} from 'node:child_process';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local',out=root+'/outputs/M-20261114-video-type-live';
await mkdir(out,{recursive:true});
const hook=out+'/debug.cjs';
await writeFile(hook,`if(process.versions.electron&&process.type==='browser')setImmediate(()=>{const {app}=require('electron'),fs=require('fs');fs.writeFileSync('${out}/electron.pid',String(process.pid));app.commandLine.appendSwitch('remote-debugging-port','9238');app.commandLine.appendSwitch('remote-debugging-address','127.0.0.1');});`);
const env={...process.env,NODE_OPTIONS:'--require='+hook,HERMES_MUSE_ONLY:'1',HERMES_INSTAGRAM_API_ENABLED:'0',PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD:'1'};
delete env.PRODUCT_LAB_QA_USER_DATA;
const log=openSync(out+'/launcher.log','w');
const child=spawn('cmd.exe',['/d','/c','START-HERMES-CLIP.cmd'],{cwd:root,env,windowsHide:true,detached:true,stdio:['ignore',log,log]});child.unref();closeSync(log);console.log('Started Hermes launcher; Muse is not paused or closed.');

