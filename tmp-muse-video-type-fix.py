from pathlib import Path
root=Path('C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local')
p=root/'desktop/src/muse.mjs'
s=p.read_text(encoding='utf-8')
s=s.replace("  async prepare(page, job) {", "  async prepare(page, job) {\n    this.mediaType = job.mediaType;")
s=s.replace("  mediaCards(page) {\n    // Suggestions also carry has-presentation=true. Require a media element.\n    return page.locator(this.config.resultCards + (this.chatMode ? `:has(${this.config.readyWithinCard})` : ''));\n  }", """  mediaCards(page, mediaType = this.mediaType) {
    // A Markdown/PDF preview is an image too; video jobs require a video element.
    const media = mediaType === 'video' ? 'video' : mediaType === 'image' ? 'img' : this.config.readyWithinCard;
    return page.locator(this.config.resultCards + (this.chatMode ? `:has(${media})` : ''));
  }""")
s=s.replace("const ids = await this.mediaCards(page).evaluateAll", "const ids = await this.mediaCards(page, job.request.mediaType).evaluateAll")
s=s.replace("const media = exact.locator(config.readyWithinCard).first();", "const media = exact.locator(this.chatMode && job.request.mediaType === 'video' ? 'video' : config.readyWithinCard).first();")
anchor="        if (await media.isVisible()) break;"
s=s.replace(anchor,anchor+"""
        // Existing receipts may point at a document preview. Do not click its image
        // and wait for a video download that cannot exist; keep the real response.
        if (job.request.mediaType === 'video' && exact.getByText &&
            await exact.getByText(/^(?:MD|PDF|TXT|DOCX|CSV|HTML)$/, {exact:true}).first().isVisible()) {
          throw this.noMedia(page, (await exact.innerText()).trim());
        }""")
p.write_text(s,encoding='utf-8',newline='\n')
p=root/'desktop/test/muse.test.mjs'
s=p.read_text(encoding='utf-8')+'''
test('Video receipt detection excludes Markdown preview images and still supports requested images',async t=>{
 const {chromium}=await import('playwright');const browser=await chromium.launch({headless:true});t.after(()=>browser.close());
 const page=await browser.newPage();await page.setContent(`<textarea aria-label="Message"></textarea><div data-message-id="doc" data-message-role="assistant" data-message-has-presentation="true"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><span>Prompt pack</span><span>MD</span></div><div data-message-id="clip" data-message-role="assistant" data-message-has-presentation="true"><video></video></div>`);
 const adapter=new MuseAdapter(config);
 assert.deepEqual(await adapter.mediaCards(page,'video').evaluateAll(es=>es.map(e=>e.dataset.messageId)),['clip']);
 assert.deepEqual(await adapter.mediaCards(page,'image').evaluateAll(es=>es.map(e=>e.dataset.messageId)),['doc']);
 adapter.mediaType='video';assert.equal(await adapter.mediaCards(page).count(),1);
 let downloads=0;const states=[];const wrapped={url:()=>config.startUrl,locator:page.locator.bind(page),getByRole:page.getByRole.bind(page),waitForTimeout:page.waitForTimeout.bind(page),waitForEvent:async()=>{downloads++;throw Error('No download for document');}};
 await assert.rejects(adapter.fetch(wrapped,{providerId:'doc',providerUrl:config.startUrl,request:{mediaType:'video'}},async state=>states.push(state),'unused.mp4'),error=>error.code==='MUSE_NO_MEDIA'&&error.providerResponse.includes('MD'));
 assert.deepEqual(states,['waiting']);assert.equal(downloads,0);
});
'''
p.write_text(s,encoding='utf-8',newline='\n')
