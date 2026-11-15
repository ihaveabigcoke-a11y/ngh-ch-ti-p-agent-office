
test('Muse suggestions with presentation metadata are not media; real DOM refusal preserves receipt without downloading', async t => {
  const {chromium}=await import('playwright');
  const browser=await chromium.launch({headless:true});t.after(()=>browser.close());
  const page=await browser.newPage();
  const response="Video generation isn't available for this account in your country or region.";
  let sends=0;await page.exposeFunction('recordSend',()=>sends++);
  await page.setContent(`<textarea aria-label="Message"></textarea><button id="send">Send</button>`);
  await page.evaluate(response=>{
    document.querySelector('#send').onclick=()=>{
      window.recordSend();
      const user=document.createElement('div');user.dataset.messageId='request';user.dataset.messageRole='user';user.textContent='Make this video';document.body.append(user);
      const reply=document.createElement('div');reply.dataset.messageId='suggestions';reply.dataset.messageRole='assistant';reply.dataset.messageHasPresentation='true';reply.textContent=response;document.body.append(reply);
      const suggestion=document.createElement('button');suggestion.textContent='Yes, make the still image';reply.append(suggestion);
    };
  },response);
  const adapter=new MuseAdapter(config),states=[];
  await assert.rejects(adapter.submit(page,async(state,patch)=>states.push({state,patch})),e=>{
    assert.equal(e.code,'MUSE_NO_MEDIA');assert.ok(e.providerResponse.startsWith(response));return true;
  });
  assert.equal(sends,1);assert.deepEqual(states.map(s=>s.state),['submitting']);
  assert.equal(await adapter.mediaCards(page).count(),0);
  await page.evaluate(()=>{const media=document.createElement('div');media.dataset.messageId='real-media';media.dataset.messageRole='assistant';media.dataset.messageHasPresentation='true';media.innerHTML='<video></video>';document.body.append(media);});
  assert.deepEqual(await adapter.mediaCards(page).evaluateAll(es=>es.map(e=>e.dataset.messageId)),['real-media']);
  await page.locator('[data-message-id="real-media"]').evaluate(e=>e.remove());
  // Reconciliation must use the same media filter and preserve the full saved reply.
  const saved=await page.locator('[data-message-id="suggestions"]').innerText();
  adapter.session=async()=>true;
  const inspectPage={locator:page.locator.bind(page),getByRole:page.getByRole.bind(page),goto:async()=>{},waitForTimeout:async()=>{}};
  const inspected=await adapter.inspectResponse(inspectPage,{providerUrl:'https://muse.ai/thread/saved',providerResponse:saved,request:{prompt:'Make this video'}});
  assert.equal(inspected.providerId,null);assert.equal(inspected.response,saved);
  // Existing receipts may already point to a suggestion card: do not wait 15 minutes.
  const fetchPage={...inspectPage,url:()=>config.startUrl,waitForTimeout:page.waitForTimeout.bind(page)};
  await assert.rejects(adapter.fetch(fetchPage,{providerId:'suggestions',providerUrl:config.startUrl,request:{mediaType:'video'}},async()=>{},'unused.mp4'),e=>{
    assert.equal(e.code,'MUSE_NO_MEDIA');assert.equal(e.providerResponse,saved);return true;
  });
  assert.equal(sends,1);
});

test('Muse resumed-result waiting checks account guard before downloading',async()=>{
  let downloads=0;
  const adapter=new MuseAdapter(config);adapter.guard=async()=>{throw Object.assign(Error('Account warning'),{code:'MUSE_ACCOUNT_WARNING'});};
  const exact={scrollIntoViewIfNeeded:async()=>{},locator:()=>({first:()=>({isVisible:async()=>false})})};
  const page={url:()=>config.startUrl,locator:selector=>selector===config.loggedIn?{waitFor:async()=>{},isVisible:async()=>true}:exact,waitForEvent:async()=>downloads++};
  await assert.rejects(adapter.fetch(page,{providerId:'saved',providerUrl:config.startUrl},async()=>{},'unused.mp4'),{code:'MUSE_ACCOUNT_WARNING'});
  assert.equal(downloads,0);
});
