from pathlib import Path
root=Path('C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local')
p=root/'desktop/src/muse.mjs'
s=p.read_text(encoding='utf-8')
s=s.replace("job.request.mediaType", "job.request?.mediaType")
s=s.replace("id: element.getAttribute('data-message-id'), text: element.textContent?.trim() || '',", """id: element.getAttribute('data-message-id'), text: element.textContent?.trim() || '',
          documentPreview: element.getAttribute('data-message-has-presentation') === 'true'
            && !element.querySelector('video')
            && [...element.querySelectorAll('span')].some(node => /^(?:MD|PDF|TXT|DOCX|CSV|HTML)$/i.test(node.textContent?.trim() || '')),""")
s=s.replace("Date.now() - completedAt >= 15000 && explicitMediaRefusal(lastResponse)", "Date.now() - completedAt >= 15000 && (explicitMediaRefusal(lastResponse) || (this.mediaType === 'video' && response.documentPreview))")
old="""        // Existing receipts may point at a document preview. Do not click its image
        // and wait for a video download that cannot exist; keep the real response.
        if (job.request?.mediaType === 'video' && exact.getByText &&
            await exact.getByText(/^(?:MD|PDF|TXT|DOCX|CSV|HTML)$/, {exact:true}).first().isVisible()) {
          throw this.noMedia(page, (await exact.innerText()).trim());
        }
"""
assert old in s
s=s.replace(old,'')
s=s.replace("if (Date.now() - settledAt >= 15000 && explicitMediaRefusal(response)) throw this.noMedia(page, response);", """// A saved receipt can point at a document thumbnail from older versions.
          // Wait for a stable, finished reply before ruling out a late video.
          const documentPreview = job.request?.mediaType === 'video' && exact.getByText
            && await exact.getByText(/^(?:MD|PDF|TXT|DOCX|CSV|HTML)$/i, {exact:true}).first().isVisible();
          if (Date.now() - settledAt >= 15000 && (explicitMediaRefusal(response) || documentPreview)) throw this.noMedia(page, response);""")
p.write_text(s,encoding='utf-8',newline='\n')
p=root/'desktop/test/muse.test.mjs'
s=p.read_text(encoding='utf-8')
s=s.replace("test('Video receipt detection excludes Markdown preview images and still supports requested images',async t=>{", "test('Video receipt detection excludes document preview images and preserves image mode',async t=>{")
s=s.replace(" let downloads=0;const states=[];const wrapped=", " let now=0;t.mock.method(Date,'now',()=>now);\n let downloads=0;const states=[];const wrapped=")
# Only the newly added document test uses this exact sequence.
s=s.replace("waitForTimeout:page.waitForTimeout.bind(page),waitForEvent:async()=>{downloads++", "waitForTimeout:async()=>{now+=1000;},waitForEvent:async()=>{downloads++")
s += '''
test('A new document thumbnail never becomes a video receipt; settled documents stop without another send',async t=>{
 const {chromium}=await import('playwright');const browser=await chromium.launch({headless:true});t.after(()=>browser.close());
 const page=await browser.newPage();await page.setContent('<textarea aria-label="Message"></textarea><button id="send">Send</button>');
 let now=0,sends=0;t.mock.method(Date,'now',()=>now);await page.exposeFunction('sent',()=>sends++);
 await page.evaluate(()=>{document.querySelector('#send').onclick=()=>{window.sent();document.body.insertAdjacentHTML('beforeend','<div data-message-id="user" data-message-role="user">Create video</div><div data-message-id="doc" data-message-role="assistant" data-message-has-presentation="true"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><span>Prompt pack</span><span>MD</span></div>');};});
 const wrapped={locator:page.locator.bind(page),getByRole:page.getByRole.bind(page),url:()=>config.startUrl,waitForTimeout:async()=>{now+=1000;}};
 const adapter=new MuseAdapter(config);adapter.mediaType='video';const states=[];
 await assert.rejects(adapter.submit(wrapped,async state=>states.push(state)),e=>e.code==='MUSE_NO_MEDIA'&&e.providerResponse.includes('Prompt pack'));
 assert.equal(sends,1);assert.deepEqual(states,['submitting']);assert.ok(now>=15000&&now<20000);
 adapter.session=async()=>true;wrapped.goto=async()=>{};
 const response=await page.locator('[data-message-id="doc"]').innerText();
 const result=await adapter.inspectResponse(wrapped,{providerUrl:'https://muse.ai/thread/saved',providerResponse:response,request:{mediaType:'video',prompt:'Create video'}});
 assert.equal(result.providerId,null);assert.equal(sends,1);
 // A later real video takes precedence over the document and does not resend.
 await page.evaluate(()=>document.body.insertAdjacentHTML('beforeend','<div data-message-id="clip" data-message-role="assistant" data-message-has-presentation="true"><video></video></div>'));
 const late=await adapter.inspectResponse(wrapped,{providerUrl:'https://muse.ai/thread/saved',providerResponse:response,request:{mediaType:'video',prompt:'Create video'}});
 assert.equal(late.providerId,'clip');assert.equal(sends,1);
});
'''
p.write_text(s,encoding='utf-8',newline='\n')
print('Updated Muse detection and document receipt regression tests.')
