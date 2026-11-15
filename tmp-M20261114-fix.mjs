import fs from 'node:fs';
const root='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/';
function edit(path,fn){const old=fs.readFileSync(root+path,'utf8'),next=fn(old);if(next===old)throw Error('No change: '+path);fs.writeFileSync(root+path,next);}
const assistant='[data-message-id][data-message-role="assistant"]';
edit('desktop/src/muse.mjs',s=>{
 s=s.replace('  async submit(page, checkpoint) {',`  mediaCards(page) {
    // Suggestions also carry has-presentation=true. Require a media element.
    return page.locator(this.config.resultCards + (this.chatMode ? \`:has(\${this.config.readyWithinCard})\` : ''));
  }

  noMedia(page, response) {
    return Object.assign(new Error('Muse đã trả lời nhưng chưa tạo file.'), {
      code: 'MUSE_NO_MEDIA', providerUrl: page.url(), providerResponse: response.slice(0, 2000),
    });
  }

  async submit(page, checkpoint) {`);
 s=s.replace('const cards = page.locator(config.resultCards);','const cards = this.mediaCards(page);');
 s=s.replaceAll(`[data-message-id][data-message-role="assistant"]:not([data-message-has-presentation="true"])`,assistant);
 s=s.replace(`            const error = new Error('Muse đã trả lời nhưng chưa tạo file.');\n            error.code = 'MUSE_NO_MEDIA';\n            error.providerUrl = page.url();\n            error.providerResponse = response.text.slice(0, 2000);\n            throw error;`,`            throw this.noMedia(page, response.text);`);
 s=s.replace('const ids = await page.locator(this.config.resultCards).evaluateAll','const ids = await this.mediaCards(page).evaluateAll');
 const old=`    await exact.locator(config.readyWithinCard).first().waitFor({state: 'visible', timeout: config.timeoutSeconds * 1000});`;
 if(!s.includes(old))throw Error('Fetch anchor missing');
 s=s.replace(old,`    const media = exact.locator(config.readyWithinCard).first();
    if (this.chatMode) {
      const deadline = Date.now() + config.timeoutSeconds * 1000;
      let settledAt = null, lastResponse = '';
      while (true) {
        await this.guard?.();
        if (await media.isVisible()) break;
        if (Date.now() >= deadline) throw Error('Chưa thấy file của mã kết quả cũ. Cần đối soát trước khi gửi tiếp.');
        const response = (await exact.innerText()).trim();
        const generating = await page.getByRole('button', {name: 'Stop', exact: true}).isVisible();
        if (response && !generating) {
          if (response !== lastResponse || settledAt === null) settledAt = Date.now();
          lastResponse = response;
          if (Date.now() - settledAt >= 15000) throw this.noMedia(page, response);
        } else settledAt = null;
        await page.waitForTimeout(750);
      }
    } else await media.waitFor({state: 'visible', timeout: config.timeoutSeconds * 1000});`);
 return s;
});
edit('desktop/test/muse.test.mjs',s=>s.replaceAll("selector.includes(':not(')",`selector === '${assistant}'`).replace("const ready = {first: () => ({waitFor: async () => {}})};","const ready = {first: () => ({waitFor: async () => {}, isVisible: async () => true})};"));
fs.appendFileSync(root+'desktop/test/muse.test.mjs',fs.readFileSync('tmp-M20261114-regression.mjs','utf8'));
