import fs from 'node:fs';
const p='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/scripts/check-muse-resume-desktop.mjs';
let s=fs.readFileSync(p,'utf8');
const from="'(Get-Process -Id '+pid+' -ErrorAction SilentlyContinue).CloseMainWindow() | Out-Null'";
const to="'$qaWindow=Get-Process -Id '+pid+' -ErrorAction Stop; $qaWindow.Refresh(); if(-not $qaWindow.CloseMainWindow()){throw \\\"QA window did not accept close\\\"}; Wait-Process -Id '+pid+' -Timeout 15 -ErrorAction Stop'";
if(!s.includes(from))throw Error('Close anchor missing');
s=s.replace(from,to).replace('await delay(1500);','');
fs.writeFileSync(p,s);
console.log('QA now verifies normal window/process closure before persistence claims.');
