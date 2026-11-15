import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
let script=fs.readFileSync(root+'scripts/check-t026-desktop.mjs','utf8');
script=script.replace("'../desktop/node_modules/playwright/index.mjs'","'file:///"+root+"desktop/node_modules/playwright/index.mjs'")
 .replace('outputs/T-026-desktop-ui','outputs/M-20261114-toggle-desktop-ui')
 .replace("HERMES_INSTAGRAM_API_ENABLED:'0'","HERMES_INSTAGRAM_API_ENABLED:'0',HERMES_MUSE_ONLY:'1'");
const from=script.indexOf(" for(const view of ['signals'"),to=script.indexOf(" assert.equal((await page.evaluate",from);
if(from<0||to<0)throw Error('Desktop check anchor missing');
script=script.slice(0,from)+`
 await page.goto(origin+'/?view=accounts');
 const control=page.locator('.muse-switch-card [role="switch"]');await control.waitFor();
 await page.waitForFunction(()=>!document.querySelector('.muse-switch-card [role="switch"]').disabled);
 await control.click();const dialog=page.getByRole('dialog');await dialog.waitFor();
 assert.match(await dialog.innerText(),/Các lượt cũ không tự chạy lại/);assert.doesNotMatch(await dialog.innerText(),/tài khoản có thể bị khoá/);
 for(const [width,height] of [[1366,768],[1920,1080]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(500);
  await page.screenshot({path:join(out,'toggle-confirm-'+width+'.png')});screens.push({view:'toggle-confirm',width});
 }
 await dialog.getByRole('button',{name:'Bật Muse',exact:true}).click();await dialog.waitFor({state:'hidden'});
 assert.equal((await page.evaluate(()=>window.productLabDesktop.status())).musePaused,false);
 await control.click();await page.waitForFunction(()=>document.querySelector('.muse-switch-card [role="switch"]').getAttribute('aria-checked')==='false');
 const final=await page.evaluate(()=>window.productLabDesktop.status());assert.equal(final.musePaused,true);assert.equal(final.active,0);assert.equal(final.jobs.length,0);
`+script.slice(to);
fs.writeFileSync(root+'outputs/M-20261114-toggle-desktop-check.mjs',script);
