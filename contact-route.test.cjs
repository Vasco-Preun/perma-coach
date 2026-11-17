const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const source=ts.transpileModule(fs.readFileSync('app/api/contact/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
(async()=>{
for(const scenario of ['success','rejected','network','no-id','invalid','malformed','missing-key','missing-sender','test-sender','storage-error','preview','chantier']){
 let reads=0,writes=0,sends=0,payload;
 const env={RESEND_API_KEY:'fake',CONTACT_FROM_EMAIL:'Site <contact@notifications.example.com>',VERCEL_ENV:scenario==='preview'?'preview':'production'};
 if(scenario==='missing-key')delete env.RESEND_API_KEY;
 if(scenario==='missing-sender')delete env.CONTACT_FROM_EMAIL;
 if(scenario==='test-sender')env.CONTACT_FROM_EMAIL='Test <onboarding@resend.dev>';
 const exports={};
 vm.runInNewContext(source,{exports,process:{env},console:{error(){}},require(name){
  if(name==='next/server')return {NextResponse:{json:(body,options)=>({body,status:options?.status||200})}};
  if(name==='@/lib/kv')return {getKV:async()=>{reads++;return []},setKV:async()=>{writes++;if(scenario==='storage-error')throw Error('mock')}};
  if(name==='resend')return {Resend:function(){
    this.emails={send:async body=>{
      sends++;payload=body;
      if(scenario==='network')throw Error('mock');
      if(scenario==='rejected')return {error:{name:'validation_error'}};
      if(scenario==='no-id')return {data:{}};
      return {data:{id:'mock'}};
    }};
  }};
  throw Error(name);
 }});
 const body={name:'Test',email:'test@example.com',message:'Fictif',consent:scenario!=='invalid',...(scenario==='chantier'?{eventType:'chantier',eventId:'fake',subject:'Chantier fictif'}:{})};
 const response=await exports.POST({json:async()=>{if(scenario==='malformed')throw Error('mock');return body}});
 const expected=['success','preview','chantier'].includes(scenario)?200:['invalid','malformed'].includes(scenario)?400:['missing-key','missing-sender','test-sender'].includes(scenario)?503:502;
 assert.equal(response.status,expected,scenario);
 if(['preview','invalid','malformed','missing-key','missing-sender','test-sender'].includes(scenario)){assert.equal(reads,0);assert.equal(writes,0)}
 if(['invalid','malformed','missing-key','missing-sender','test-sender','storage-error'].includes(scenario))assert.equal(sends,0);
 if(sends){assert.equal(payload.to,'permacoach51@gmail.com');assert.equal(payload.reply_to,body.email);assert.equal(payload.from,env.CONTACT_FROM_EMAIL);assert.ok(payload.text.includes('Fictif'))}
 console.log('PASS '+scenario);
}
})().catch(e=>{console.error(e);process.exitCode=1});
