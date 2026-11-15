import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
const path=root+'scripts/check-muse-resume-desktop.mjs';let s=fs.readFileSync(path,'utf8');
const line=s.split('\n').find(line=>line.includes("const pid=Number(await readFile"));
if(!line)throw Error('Close line missing');
s=s.replace(line,` const pid=Number(await readFile(join(qa,'electron.pid'),'utf8').catch(()=>'0'));
 if(pid>0){
  const close=JSON.parse(execFileSync('pwsh.exe',['-NoProfile','-Command','$qaWindow=Get-Process -Id '+pid+' -ErrorAction Stop; $qaWindow.Refresh(); [pscustomobject]@{Id=$qaWindow.Id;Window=$qaWindow.MainWindowHandle;Close=$qaWindow.CloseMainWindow();Exited=$qaWindow.WaitForExit(15000)} | ConvertTo-Json'],{windowsHide:true,encoding:'utf8'}));
  assert.equal(close.Close,true,'QA window must accept normal close');assert.equal(close.Exited,true,'QA Electron must finish closing');
 }`);
fs.writeFileSync(path,s.replaceAll('\r\n','\n'));
console.log('QA shutdown uses verified handle/close/wait sequence with explicit assertions.');
