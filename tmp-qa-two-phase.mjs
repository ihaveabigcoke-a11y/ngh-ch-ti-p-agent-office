import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
const path=root+'scripts/check-muse-resume-desktop.mjs';let s=fs.readFileSync(path,'utf8');
const marker="const out=resolve('outputs/M-20261114-enable-desktop-ui');";
if(!s.includes(marker))throw Error('Output anchor missing');
s=s.replace(marker,`// The PowerShell wrapper closes Electron after this CDP process has exited.
if(process.argv.includes('--verify')){
 const output=resolve('outputs/M-20261114-enable-desktop-ui');
 const {qa}=JSON.parse(await readFile(join(output,'shutdown.json'),'utf8'));
 assert.equal(resolve(qa).startsWith(output+'\\\\'),true,'Only read the isolated QA workspace');
 const {Store}=await import('../desktop/src/store.mjs');
 const {MuseNight}=await import('../desktop/src/muse-night.mjs');
 const persisted=new Store(join(qa,'worker','worker.sqlite'));
 try{
  const night=new MuseNight(persisted),status=night.status();
  assert.equal(persisted.get('muse_paused'),false);assert.equal(status.limit,null);assert.equal(status.submitted,1);assert.equal(status.errors,1);assert.equal(status.stopped,false);
  assert.equal(night.current().resumptions.length,1);assert.equal(persisted.jobs()[0].providerId,'fixture-receipt');
  await writeFile(join(output,'result.json'),JSON.stringify({...JSON.parse(await readFile(join(output,'ui-result.json'),'utf8')),persistedAfterElectronClose:true},null,2));
  console.log(JSON.stringify({passed:true,persistedAfterElectronClose:true,receiptPreserved:true,unlimited:true}));
 }finally{persisted.close();}
 process.exit(0);
}
`+marker);
const cleanup=s.indexOf('}finally{\n // Release the debugger');
if(cleanup<0)throw Error('Cleanup anchor missing');
s=s.slice(0,cleanup)+`}finally{
 await browser?.close().catch(()=>{});closeSync(log);
 const pid=Number(await readFile(join(qa,'electron.pid'),'utf8').catch(()=>'0'));
 await writeFile(join(out,'shutdown.json'),JSON.stringify({qa,pid}));launcher.unref();
}
process.exit(0);
`;
s=s.replace("import {spawn,execFile} from 'node:child_process';\nimport {promisify} from 'node:util';\nconst execFileAsync=promisify(execFile);","import {spawn} from 'node:child_process';");
fs.writeFileSync(path,s);
fs.writeFileSync(root+'scripts/check-muse-resume-desktop.ps1',`$ErrorActionPreference='Stop'
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
  & node scripts/check-muse-resume-desktop.mjs
  $uiCode=$LASTEXITCODE
  $checkpoint=Get-Content -LiteralPath outputs/M-20261114-enable-desktop-ui/shutdown.json -Raw | ConvertFrom-Json
  $qaWindow=Get-Process -Id $checkpoint.pid -ErrorAction Stop
  $qaWindow.Refresh()
  $handle=$qaWindow.MainWindowHandle
  if(-not $qaWindow.CloseMainWindow()){throw 'QA window did not accept normal close'}
  if(-not $qaWindow.WaitForExit(15000)){throw 'QA Electron did not exit'}
  if($uiCode -ne 0){throw 'QA UI checks failed'}
  & node scripts/check-muse-resume-desktop.mjs --verify
  if($LASTEXITCODE -ne 0){throw 'QA persistence checks failed'}
}finally{Pop-Location}
`);
console.log('QA now separates UI, normal Windows closure and post-exit persistence verification.');
