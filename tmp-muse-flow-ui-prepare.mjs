import fs from 'node:fs';const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
let s=fs.readFileSync(root+'scripts/check-t026f-ui.mjs','utf8');
s=s.replaceAll('T-026f','M-20261114-muse-flow');
s=s.replace("import {getRenderPlan}","import {newProduction,applyProduction} from '../lib/lab/production.ts';\nimport {autoVideoShots} from '../lib/lab/auto-video.ts';\nimport {getRenderPlan}");
s=s.replace("for(const mode of ['full','empty','refused'])",`const existing={id:'existing_manual',kind:'production',revision:1,createdAt:Date.now(),updatedAt:Date.now(),data:newProduction('Dự án chờ nhập tay',p.id,p.revision)};
existing.data=applyProduction(existing.data,'import',{rows:autoVideoShots(p)},'seed_import');
for(const scene of existing.data.scenes){existing.data=applyProduction(existing.data,'storyboard',{sceneId:scene.id},'seed_board_'+scene.id);existing.data=applyProduction(existing.data,'media_provider',{sceneId:scene.id,provider:'manual'},'seed_manual_'+scene.id);}
for(const mode of ['full','empty','refused'])`);
s=s.replace("mode==='empty'?[]:[p]","mode==='empty'?[]:[p,existing]");
s=s.replace("await page.addInitScript(({mode})=>{const base=", "await page.addInitScript(({mode})=>{localStorage.setItem('hermes-video-flow_product','stale-missing-project');const base=");
s=s.replace("else await page.waitForFunction(()=>document.querySelector('[data-screen=video]').innerText.includes('Chờ file tay'),null,{timeout:20000});", "else await page.locator('[data-screen=video] [role=alert]').waitFor({timeout:20000});");
const start=s.indexOf(" if(mode==='refused'){assert.equal(manual.length,1);"),end=s.indexOf(" if(mode==='empty')",start);if(start<0||end<0)throw Error('fixture anchors');
s=s.slice(0,start)+` if(mode==='refused'){assert.equal(manual.length,0,'Muse failure must not silently export manual prompts');assert.equal(project.data.scenes.filter(s=>s.mediaProvider==='manual').length,0);assert.equal(project.data.exports.length,0);assert.equal(starts,1);assert.equal(store.jobs()[0].state,'needs_attention');assert.equal(project.data.scenes[0].museReconciledAt,undefined);assert.match(await page.locator('[data-screen=video] [role=alert]').innerText(),/Muse từ chối/);}
`+s.slice(end);
s=s.replace("assert.equal(project.data.exports.length,3);", "assert.equal(project.id,'existing_manual');assert.equal(rows.filter(r=>r.kind==='production').length,1);assert.equal(project.data.exports.length,3);");
s=s.replace("refusalManual:mode==='refused'","refusalStopsWithoutManual:mode==='refused',resumedExistingManual:mode==='full'");
fs.writeFileSync(root+'scripts/check-muse-flow-ui.mjs',s.replace(/\r\n/g,'\n'));
