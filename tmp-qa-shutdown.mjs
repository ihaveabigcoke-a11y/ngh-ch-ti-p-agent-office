import {spawnSync} from 'node:child_process';
const command='$qaWindow=Get-Process -Id 41216 -ErrorAction Stop; $qaWindow.Refresh(); [pscustomobject]@{Id=$qaWindow.Id;Window=$qaWindow.MainWindowHandle;Close=$qaWindow.CloseMainWindow();Exited=$qaWindow.WaitForExit(10000)} | ConvertTo-Json';
const result=spawnSync('pwsh.exe',['-NoProfile','-Command',command],{windowsHide:true,encoding:'utf8'});
console.log(JSON.stringify({status:result.status,stdout:result.stdout,stderr:result.stderr}));
