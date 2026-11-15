import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
let s=fs.readFileSync(root+'scripts/check-muse-resume-desktop.mjs','utf8');
s=s.slice(0,s.indexOf('// The PowerShell wrapper'))+s.slice(s.indexOf("const out=resolve('outputs/M-20261114-enable-desktop-ui');"));
s=s.replaceAll('M-20261114-enable-desktop-ui','M-20261114-video-recovery-desktop-ui');
const seedStart=s.indexOf("await mkdir(join(qa,'worker')"),seedEnd=s.indexOf('const log=openSync',seedStart);s=s.slice(0,seedStart)+s.slice(seedEnd);
const from=s.indexOf(" await page.goto(origin+'/?view=accounts');"),to=s.indexOf(' assert.deepEqual(errors',from);
s=s.slice(0,from)+`
 const {emptyProduct}=await import('../lib/lab/domain.ts');
 const created=await page.evaluate(async data=>{const response=await fetch('/api/lab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:'qa_video_recovery',kind:'product',revision:0,data})});return {ok:response.ok,response:await response.json()};},{...emptyProduct,name:'Video recovery fixture',ctaKeyword:'GLOW'});assert.equal(created.ok,true,JSON.stringify(created));
 const before=await page.evaluate(()=>window.productLabDesktop.status());
 await page.goto(origin+'/?view=production&product=qa_video_recovery');
 const screen=page.locator('[data-screen=video]');await screen.getByRole('button',{name:'Làm video',exact:true}).click();
 const recovery=page.getByRole('complementary',{name:'Tiếp tục video'});await recovery.getByText(/Gói prompt:/).waitFor();
 const firstPath=await recovery.locator('.manual-path').innerText();
 await recovery.getByRole('button',{name:'Xuất gói prompt'}).click();await page.waitForFunction(()=>!document.querySelector('[data-screen=video] header button').disabled);
 assert.equal(await screen.getByRole('alert').count(),0);const secondPath=await recovery.locator('.manual-path').innerText();assert.notEqual(firstPath,secondPath);
 await page.reload();await recovery.getByText(secondPath,{exact:true}).waitFor();
 const after=await page.evaluate(()=>window.productLabDesktop.status());assert.deepEqual(after.jobs,before.jobs);assert.equal(after.active,0);assert.equal(after.musePaused,true);
 for(const [width,height] of [[1366,768],[1920,1080]]){await page.setViewportSize({width,height});await page.waitForTimeout(250);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:join(out,'video-'+width+'.png')});screens.push({view:'video',width});}
`+s.slice(to);
s=s.replace('defaultSignals:true,musePaused:false,explicitResume:true,receiptPreserved:true,unlimited:true,submitted:1','defaultSignals:true,musePaused:true,manualExportIPC:true,repeatSameMinute:true,reloadPersists:true,museSubmissions:0');
fs.writeFileSync(root+'outputs/check-video-recovery-desktop.mjs',s);
