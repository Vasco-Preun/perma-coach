const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('./node_modules/typescript');
const source = ts.transpileModule(fs.readFileSync('app/api/contact/route.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
(async()=>{
for (const scenario of ['success','string-success','string-false','rejected','throws','bad-json','missing-success','activation','activation-success','invalid','malformed','storage-failure','chantier','preview']) {
 let reads=0, writes=0, sends=0, sent;
 const exports={};
 const sandbox={exports,process:{env:{VERCEL_ENV:scenario==='preview'?'preview':'production'}},AbortSignal,console:{error(){}},
 fetch:async(url,options)=>{
  sends++;sent=JSON.parse(options.body);
  assert.equal(url,'https://formsubmit.co/ajax/permacoach51@gmail.com');
  assert.equal(options.method,'POST');assert.ok(options.signal);
  if(scenario==='throws')throw Error('mock network failure');
  return {ok:scenario!=='rejected',json:async()=>{
   if(scenario==='bad-json')throw Error('not JSON');
   if(scenario==='activation'||scenario==='activation-success')return {success:scenario==='activation-success'?'true':'false',message:'This form needs Activation'};
   if(scenario==='string-false')return {success:'false'};
   if(scenario==='missing-success')return {};
   return {success:scenario==='string-success'?'true':true};
  }};
 },require(name){
 if(name==='next/server')return {NextResponse:{json(body,options){return {body,status:options?.status||200}}}};
 if(name==='@/lib/kv')return {getKV:async()=>{reads++;return []},setKV:async()=>{writes++;if(scenario==='storage-failure')throw Error('mock')}};
 throw Error(name);
 }};
 vm.runInNewContext(source,sandbox);
 const body={name:'Test fictif',email:'test@example.com',message:'Message fictif',consent:scenario!=='invalid',_cc:'attacker@example.com',...(scenario==='chantier'?{eventType:'chantier',eventId:'fake',subject:'Inscription chantier'}:{})};
 const result=await exports.POST({json:async()=>{if(scenario==='malformed')throw Error('mock');return body}});
 const expected=['success','string-success','chantier','preview'].includes(scenario)?200:['activation','activation-success'].includes(scenario)?503:['invalid','malformed'].includes(scenario)?400:502;
 assert.equal(result.status,expected,scenario);
 if(['invalid','malformed','preview'].includes(scenario)){assert.equal(writes,0);assert.equal(reads,0)}
 if(['invalid','malformed','storage-failure'].includes(scenario))assert.equal(sends,0);
 if(sends){
 assert.equal(sent._replyto,body.email);assert.equal(sent._url,'https://www.lesjardinsduclos.com/contact');
 assert.equal(sent.message,body.message);assert.equal(sent._cc,undefined);
 if(scenario==='chantier')assert.equal(sent.eventId,'fake');
 }
 console.log('PASS '+scenario);
}
})().catch(e=>{console.error(e);process.exitCode=1});
