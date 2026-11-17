const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('./node_modules/typescript');
const source = ts.transpileModule(fs.readFileSync('app/api/contact/route.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
(async()=>{
for (const scenario of ['success','rejected','throws','missing-config','invalid','malformed','storage-failure','chantier']) {
 let writes=0, sends=0, sent;
 const env=scenario==='missing-config'?{}:{RESEND_API_KEY:'fake',CONTACT_FROM_EMAIL:'Test <contact@example.com>'};
 const exports={};
 const sandbox={exports,process:{env},console:{log(){},error(){}},require(name){
 if(name==='next/server')return {NextResponse:{json(body,options){return {body,status:options?.status||200}}}};
 if(name==='@/lib/kv')return {getKV:async()=>[],setKV:async()=>{writes++;if(scenario==='storage-failure')throw Error('mock')}};
 if(name==='resend')return {Resend:class {emails={send:async(payload)=>{sends++;sent=payload;if(scenario==='throws')throw Error('mock');return scenario==='rejected'?{error:{name:'validation_error'}}:{data:{id:'mock'}}}}}};
 throw Error(name);
 }};
 vm.runInNewContext(source,sandbox);
 const body={name:'Test fictif',email:'test@example.com',message:'Message fictif',consent:scenario!=='invalid',...(scenario==='chantier'?{eventType:'chantier',eventId:'fake',subject:'Test chantier'}:{})};
 const result=await exports.POST({json:async()=>{if(scenario==='malformed')throw Error('mock');return body}});
 const expected={success:200,rejected:502,throws:502,'missing-config':503,invalid:400,malformed:400,'storage-failure':500,chantier:200}[scenario];
 assert.equal(result.status,expected,scenario);
 if(['invalid','malformed','missing-config'].includes(scenario)){assert.equal(writes,0);assert.equal(sends,0)}
 if(scenario==='storage-failure')assert.equal(sends,0);
 if(sends){assert.equal(sent.reply_to,body.email);assert.equal(sent.from,env.CONTACT_FROM_EMAIL)}
 console.log('PASS '+scenario);
}
})().catch(e=>{console.error(e);process.exitCode=1});
