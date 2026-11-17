const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true,channel:process.env.TEST_BROWSER_CHANNEL || 'msedge'});
 try {
  const page = await browser.newPage();
  let sent = [], apiCalls = 0;
  await page.route('https://formsubmit.co/**', async route => {
   sent.push({url:route.request().url(),method:route.request().method(),fields:new URLSearchParams(route.request().postData())});
   await route.fulfill({status:200,contentType:'text/html',body:'<h1>FormSubmit simulated</h1>'});
  });
  await page.route('**/api/contact',async route=>{apiCalls++;await route.abort()});
  await page.route('**/api/events',route=>route.fulfill({json:[{id:'test-only',type:'chantier',title:'Chantier fictif',startDate:'2027-01-01'}]}));
  for(const path of ['/contact','/inscription-chantier/test-only']) {
   await page.goto('http://localhost:3100'+path);
   const form=page.locator('form');
   await form.locator('[name="name"]').fill('Test fictif');
   await form.locator('[name="email"]').fill('test@example.com');
   await form.locator('[name="message"]').fill('Aucune demande réelle');
   if(path.includes('inscription'))await form.locator('[name="phone"]').fill('0000000000');
   else await form.locator('[name="subject"]').fill('Sujet fictif');
   const before=sent.length;
   await form.locator('button[type="submit"]').click();
   assert.equal(sent.length,before,'Unchecked consent must block submission');
   await form.locator('[name="consent"]').check();
   await Promise.all([page.waitForURL('https://formsubmit.co/**'),form.locator('button[type="submit"]').click()]);
   const item=sent.at(-1);
   assert.equal(item.url,'https://formsubmit.co/permacoach51@gmail.com');
   assert.equal(item.method,'POST');
   for(const [key,value] of Object.entries({name:'Test fictif',email:'test@example.com',message:'Aucune demande réelle',consent:'on',_url:'https://www.lesjardinsduclos.com/contact'}))assert.equal(item.fields.get(key),value);
   assert.equal(item.fields.get('_captcha'),null,'Keep provider captcha enabled');
   assert.equal(item.fields.get('_subject'),path.includes('inscription')?'Inscription au chantier : Chantier fictif':'Sujet fictif');
   if(path.includes('inscription'))assert.equal(item.fields.get('eventId'),'test-only');
   console.log('PASS browser serialization, consent, navigation: '+path);
  }
  assert.equal(apiCalls,0,'Browser must not call retired server relay');
  console.log('PASS no contact API calls; all external submissions intercepted');
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
