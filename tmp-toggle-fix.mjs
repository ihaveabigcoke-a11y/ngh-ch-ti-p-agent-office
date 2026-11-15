import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
function edit(path,fn){const before=fs.readFileSync(root+path,'utf8'),after=fn(before);if(before===after)throw Error('Missing edit anchor: '+path);fs.writeFileSync(root+path,after);}
edit('desktop/src/contracts.mjs',s=>s.replace("return ({MUSE_PAUSED:",`return ({MUSE_NIGHT_STOP:error?.message==='Hai lượt lỗi Muse liên tiếp. Dừng hết đêm; dùng manual.'?'Phiên Muse đã dừng sau hai lỗi liên tiếp. Giữ các lượt cũ để đối soát; nhập file cho cảnh còn lại.':error?.message==='Muse từ chối/giới hạn hoặc phiên không còn hợp lệ. Dừng hết đêm; dùng manual.'?'Phiên Muse đã dừng sau phản hồi từ chối, giới hạn hoặc phiên đăng nhập không hợp lệ. Giữ các lượt cũ để đối soát; nhập file cho cảnh còn lại.':'Chưa thể bật Muse trong phiên đã dừng. Xem lý do tại Tài khoản Muse; giữ các lượt cũ để đối soát.',MUSE_NIGHT_LIMIT:'Đã dùng hết số lượt Muse được đặt cho phiên này. Xem giới hạn trong Cài đặt hoặc nhập file cho cảnh còn lại.',MUSE_CAPTCHA:'Muse yêu cầu xác minh captcha. Giữ tạm dừng và kiểm tra phiên Muse trước khi tiếp tục.',MUSE_ACCOUNT_WARNING:'Muse hiển thị cảnh báo tài khoản hoặc giới hạn. Giữ tạm dừng và kiểm tra thông báo trong Muse.',MUSE_REFUSED:'Muse đã từ chối yêu cầu. Giữ biên nhận để đối soát; nhập file cho cảnh còn lại.',MUSE_PAUSED:`));
edit('lib/lab/desktop-client.ts',s=>s.replace('export type DesktopStatus={','export type DesktopStatus={museNight?:{stopped:boolean;stopReason:string|null};'));
fs.copyFileSync(new URL('tmp-muse-switch.tsx',import.meta.url),root+'components/lab/muse-switch.tsx');
edit('desktop/test/muse-night.test.mjs',s=>s+`
test('Muse stop errors explain the cause without leaking arbitrary exception text',async()=>{
 const {safeMessage}=await import('../src/contracts.mjs');
 assert.match(safeMessage({code:'MUSE_NIGHT_STOP',message:'Hai lượt lỗi Muse liên tiếp. Dừng hết đêm; dùng manual.'}),/hai lỗi liên tiếp/);
 assert.match(safeMessage({code:'MUSE_NIGHT_STOP',message:'Muse từ chối/giới hạn hoặc phiên không còn hợp lệ. Dừng hết đêm; dùng manual.'}),/từ chối, giới hạn/);
 const privateMessage='PRIVATE_EXCEPTION_CONTENT';
 for(const code of ['MUSE_NIGHT_STOP','MUSE_NIGHT_LIMIT','MUSE_CAPTCHA','MUSE_ACCOUNT_WARNING','MUSE_REFUSED']){
  const message=safeMessage({code,message:privateMessage});assert.ok(message.length>20);assert.ok(!message.includes(privateMessage));assert.ok(!message.startsWith('Tác vụ dừng.'));
 }
 assert.ok(!safeMessage({code:'UNKNOWN',message:privateMessage}).includes(privateMessage));
});

test('Enabling a stopped Muse session preserves its pause, receipts and dispatch state',async()=>{
 for(const refusal of [true,false]){
  const store=new Store(':memory:');try{
   const worker=new Worker(store,'outputs/muse-toggle-fixture',{},{});worker.night.begin();store.set('muse_paused',true);
   await worker.night.admit('old');worker.night.outcome('old',refusal?{code:'MUSE_REFUSED'}:Error('first'));
   if(!refusal)worker.night.outcome('another',Error('second'));
   const before=structuredClone(worker.night.current()),version=worker.dispatchVersion;
   await assert.rejects(worker.setMusePaused({paused:false}),{code:'MUSE_NIGHT_STOP'});
   assert.deepEqual(worker.night.current(),before);assert.equal(store.get('muse_paused'),true);assert.equal(worker.paused,true);assert.equal(worker.dispatchVersion,version);assert.equal(worker.active.size,0);assert.equal(worker.contexts.size,0);
  }finally{store.close();}
 }
});
`);
