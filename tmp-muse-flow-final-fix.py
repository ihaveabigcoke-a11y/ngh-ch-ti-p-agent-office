from pathlib import Path
root=Path('C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local')
def edit(path,old,new):
    p=root/path
    text=p.read_text(encoding='utf-8')
    assert old in text, path
    p.write_text(text.replace(old,new),encoding='utf-8',newline='\n')
edit('lib/lab/auto-video.ts','Muse đang tạm dừng nên chưa tạo clip mới. Kiểm tra trong Tài khoản hoặc dùng file nhập tay.','Chưa tạo clip mới. Kiểm tra công tắc và phiên trong Tài khoản trước khi tiếp tục.')
edit('desktop/src/worker.mjs',"{this.store.set('muse_paused',true);this.pause();}","{this.pause();} // Stop dispatch on a service block; never change the user's Muse switch.")
# The service stop and no-resend assertions remain; the explicit user requirement changes the switch invariant.
edit('desktop/test/muse-night.test.mjs',"fake Muse worker: refusal pauses without profile failover", "fake Muse worker: refusal stops dispatch, keeps Muse enabled, without profile failover")
edit('desktop/test/muse-night.test.mjs',"assert.equal(store.get('muse_paused'),true);await assert.rejects(worker.setMusePaused({paused:false}));", "assert.equal(store.get('muse_paused'),false);assert.equal(worker.status().generationReady,true);assert.equal(worker.paused,true);assert.equal(worker.night.current().submissions.length,1);await assert.rejects(worker.setMusePaused({paused:false}),{code:'MUSE_NIGHT_STOP'});")
# Match production behavior in the isolated UI fixture: service failure blocks new dispatch, not Muse itself.
edit('scripts/check-muse-flow-ui.mjs',"store.set('muse_paused',true);throw Error('Muse từ chối (fixture)');", "throw Error('Muse từ chối (fixture)');")
edit('scripts/check-muse-flow-ui.mjs','musePaused:refused,generationReady:true','musePaused:false,generationReady:true')
edit('scripts/check-muse-flow-ui.mjs',"assert.equal(manual.length,0,'Muse failure must not silently export manual prompts');", "assert.equal(store.get('muse_paused'),false,'A failed job must leave Muse enabled');assert.equal(manual.length,0,'Muse failure must not silently export manual prompts');")
lock=root/'.git/office-locks/codex-M-20261114-muse-flow.txt'
with lock.open('a',encoding='utf-8') as f:f.write('\ndesktop/test/muse-night.test.mjs\nCLAUDE.md\n')
