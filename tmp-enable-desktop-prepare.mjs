import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
let script=fs.readFileSync(root+'scripts/check-t026-desktop.mjs','utf8');
script=script.replace("const out=resolve('outputs/T-026-desktop-ui')", "const out=resolve('outputs/M-20261114-enable-desktop-ui')")
 .replace("HERMES_INSTAGRAM_API_ENABLED:'0'", "HERMES_INSTAGRAM_API_ENABLED:'0',HERMES_MUSE_ONLY:'1'")
 .replace("const log=openSync", `await mkdir(join(qa,'worker'),{recursive:true});
const {Store}=await import('../desktop/src/store.mjs');
const {MuseNight}=await import('../desktop/src/muse-night.mjs');
const fixture=new Store(join(qa,'worker','worker.sqlite'));
const night=new MuseNight(fixture);night.begin();
const old=fixture.enqueue({sceneId:'keep',references:[]},'keep').job;
fixture.put({...old,state:'needs_attention',providerId:'fixture-receipt'});
await night.admit(old.id);night.outcome(old.id,{code:'MUSE_REFUSED'});fixture.set('muse_paused',true);fixture.close();
const log=openSync`);
const from=script.indexOf(" for(const view of ['signals'"),to=script.indexOf(" assert.deepEqual(errors",from);
if(from<0||to<0)throw Error('Desktop check anchor missing');
script=script.slice(0,from)+`
 await page.goto(origin+'/?view=accounts');
 const card=page.getByRole('region',{name:'Công tắc Muse'}),control=card.getByRole('switch');await control.waitFor();
 await page.waitForFunction(()=>!document.querySelector('.muse-switch-card [role="switch"]').disabled);
 await control.click();const dialog=page.getByRole('dialog');await dialog.waitFor();
 assert.match(await dialog.innerText(),/Các lượt cũ không tự chạy lại/);
 for(const [width,height] of [[1366,768],[1920,1080]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(300);
  await page.screenshot({path:join(out,'resume-confirm-'+width+'.png')});screens.push({view:'resume-confirm',width});
 }
 await dialog.getByRole('button',{name:'Bật lại Muse',exact:true}).click();await dialog.waitFor({state:'hidden'});
 const enabled=await page.evaluate(()=>window.productLabDesktop.status());
 assert.equal(enabled.musePaused,false);assert.equal(enabled.museNight.stopped,false);assert.equal(enabled.museNight.submitted,1);assert.equal(enabled.museNight.errors,1);
 assert.equal(enabled.active,0);assert.equal(enabled.jobs.length,1);assert.equal(enabled.jobs[0].state,'needs_attention');assert.equal(enabled.jobs[0].providerId,'fixture-receipt');
 await page.goto(origin+'/?view=settings');
 const unlimited=page.getByRole('checkbox',{name:'Không giới hạn lượt trong Hermes'});await unlimited.waitFor();await unlimited.check();
 await page.getByRole('button',{name:'Lưu giãn nhịp'}).click();
 await page.getByText('Đã gửi 1 · Thành công 0 · Lỗi 1 · Không giới hạn lượt trong Hermes').waitFor();
 await page.reload();await unlimited.waitFor();assert.equal(await unlimited.isChecked(),true);
 const final=await page.evaluate(()=>window.productLabDesktop.status());
 assert.equal(final.musePaused,false);assert.equal(final.museNight.limit,null);assert.equal(final.museNight.remaining,null);assert.equal(final.active,0);assert.deepEqual(final.jobs,enabled.jobs);
 for(const [width,height] of [[1366,768],[1920,1080]]){
  await page.setViewportSize({width,height});await unlimited.scrollIntoViewIfNeeded();await page.waitForTimeout(300);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:join(out,'unlimited-'+width+'.png')});screens.push({view:'unlimited',width});
 }
`+script.slice(to);
script=script.replace('defaultSignals:true,musePaused:true','defaultSignals:true,musePaused:false,explicitResume:true,receiptPreserved:true,unlimited:true,submitted:1');
script+=`
// Read only the isolated workspace created above, never the installed user data.
await delay(1500);
const persisted=new Store(join(qa,'worker','worker.sqlite'));
try{
 const status=new MuseNight(persisted).status();
 assert.equal(persisted.get('muse_paused'),false);assert.equal(status.limit,null);assert.equal(status.submitted,1);assert.equal(status.errors,1);assert.equal(status.stopped,false);
 assert.equal(new MuseNight(persisted).current().resumptions.length,1);assert.equal(persisted.jobs()[0].providerId,'fixture-receipt');
 console.log(JSON.stringify({persistedAfterElectronClose:true,receiptPreserved:true,unlimited:true}));
}finally{persisted.close();}
`;
fs.writeFileSync(root+'scripts/check-muse-resume-desktop.mjs',script);
const update=`# M-20261114-enable — bật lại Muse, 14/11/2026

Yêu cầu trực tiếp mới nhất: bật Muse và sửa lỗi giới hạn. Công tắc cho xác nhận Bật lại Muse sau khi dừng; lưu lịch sử bật lại và giữ submissions/outcomes/receipt, không chạy lại job cũ. Lỗi dịch vụ mới vẫn tạm dừng, hạn mức Muse/captcha/đăng nhập và chống gửi trùng giữ nguyên.

Cài đặt có Không giới hạn lượt trong Hermes (sessionLimit=null), giãn tối thiểu 60 giây. Người dùng đã yêu cầu bật và bỏ trần nội bộ trong lượt này; không thay hạn mức dịch vụ, không đổi vùng/tài khoản, không gửi lại kết quả chưa rõ. Các chỉ đạo cũ yêu cầu tạm dừng/khóa hết đêm bên dưới là lịch sử. SHA, build, đã kiểm/chưa kiểm ở STATUS văn phòng và ops/office/reports/M-20261114-enable.md.

---

`;
fs.writeFileSync(root+'CLAUDE.md',update+fs.readFileSync(root+'CLAUDE.md','utf8'));
console.log('Prepared isolated Electron resume check and updated current Muse instructions.');
