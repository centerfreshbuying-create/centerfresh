/* =====================================================================
   CENTER FRESH — DATA LAYER (Supabase)
   Loads everything the site needs before the app starts, then keeps the
   database in sync whenever the app saves. The app talks to DB.get/DB.set
   exactly like before; this file decides where each piece lives.
   ===================================================================== */
(function(){
const CFG=window.CF_CONFIG;
const RECOVERY=/type=recovery/.test(location.hash+location.search);
const sb=window.supabase.createClient(CFG.url,CFG.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const KV_PUBLIC=new Set(['settings','productChanges','productDeleted','menuImages','recipes','related']);
const KV_KEYS=new Set([...KV_PUBLIC,'accounts','issues','trips','secrets']);
const LOCAL=new Set(['editMode','photov','scHide','boClosed','ful','list','recent']);
const CF=window.CF={sb,cache:{},snap:{users:{},orders:{},messages:{}},dirty:new Set(),synced:new WeakSet(),email:null,uid:null,profile:null,staff:false,saving:false,errors:0,urlMap:new Map(),ready:false};

/* stable JSON so key order from the database never looks like a change */
function canon(v){return JSON.stringify(v,function(k,x){if(x&&typeof x==='object'&&!Array.isArray(x)){const o={};Object.keys(x).sort().forEach(kk=>{if(x[kk]!==undefined)o[kk]=x[kk]});return o}return x})}
CF.canon=canon;
async function pageAll(build){const out=[];for(let from=0;;from+=1000){const {data,error}=await build().range(from,from+999);if(error)throw error;out.push(...data);if(data.length<1000)break}return out}

/* profile row <-> app user object */
const STAFF_ROLES=r=>r&&r!=='customer';
function rowToUser(r){return Object.assign({fav:[],addresses:[],cards:[],cart:[],saved:[]},r.data||{},{id:r.id,email:r.email,role:r.role,active:r.active,created:Date.parse(r.created_at)})}
function rowToOrder(r){const o=Object.assign({},r.data);o.id=String(r.id);o.status=r.status;o.email=o.email||r.email;return o}

CF.recovery=RECOVERY;
sb.auth.onAuthStateChange(ev=>{if(ev==='PASSWORD_RECOVERY')CF.recovery=true});
CF.load=async function(){
  const {data:{session}}=await sb.auth.getSession();
  if(/access_token=|error_description=|type=recovery/.test(location.hash))history.replaceState(null,'',location.pathname+location.search+'#/');
  CF.uid=session?.user?.id||null;CF.email=session?.user?.email?.toLowerCase()||null;
  const kv=await sb.from('kv').select('key,value');
  if(kv.error)throw kv.error;
  kv.data.forEach(r=>{CF.cache[r.key]=r.value;CF.snap['kv:'+r.key]=canon(r.value)});
  CF.cache.users=[];CF.cache.orders=[];CF.cache.messages=[];CF.cache.subscribers=[];CF.cache.activity=[];CF.cache.syslog=[];
  if(CF.uid){
    let me=await sb.from('profiles').select('*').eq('id',CF.uid).maybeSingle();
    if(!me.data){await new Promise(r=>setTimeout(r,800));me=await sb.from('profiles').select('*').eq('id',CF.uid).maybeSingle()}
    if(me.data){CF.profile=me.data;CF.staff=STAFF_ROLES(me.data.role)&&me.data.active}
    if(me.data&&!me.data.active){await sb.auth.signOut();CF.uid=null;CF.email=null;CF.blocked=true}
  }
  if(CF.uid){
    const users=CF.staff?await pageAll(()=>sb.from('profiles').select('*').order('created_at')):[CF.profile];
    CF.cache.users=users.map(rowToUser);
    const since=new Date(Date.now()-200*864e5).toISOString();
    const orders=CF.staff?await pageAll(()=>sb.from('orders').select('*').or(`created_at.gte.${since},status.in.(Received,Processing,"On Hold",Processed)`).order('id')):await pageAll(()=>sb.from('orders').select('*').order('id'));
    CF.cache.orders=orders.map(rowToOrder);
    if(CF.staff){
      const [m,s,l]=await Promise.all([sb.from('messages').select('*').order('id',{ascending:false}).limit(500),sb.from('subscribers').select('*').order('id',{ascending:false}).limit(5000),sb.from('logs').select('*').order('id',{ascending:false}).limit(1500)]);
      CF.cache.messages=(m.data||[]).map(r=>Object.assign({},r.data,{id:r.id,read:r.read}));
      CF.cache.subscribers=(s.data||[]).map(r=>Object.assign({email:r.email,t:Date.parse(r.created_at)},r.data));
      (l.data||[]).forEach(r=>{const e=r.kind==='act'?{t:Date.parse(r.t),who:r.who,what:r.what,ref:r.ref||''}:{t:Date.parse(r.t),level:r.level,m:r.what,who:r.who};(r.kind==='act'?CF.cache.activity:CF.cache.syslog).push(e)});
    }
  }
  CF.cache.users.forEach(u=>CF.snap.users[u.id]=canon(u));
  CF.cache.orders.forEach(o=>CF.snap.orders[o.id]=canon(o));
  CF.cache.messages.forEach(m=>CF.snap.messages[m.id]=canon(m));
  [...CF.cache.subscribers,...CF.cache.activity,...CF.cache.syslog].forEach(x=>CF.synced.add(x));
  CF.ready=true;
};

/* the DB object the app uses */
window.CFDB={
  get(k,d){
    if(k==='session')return CF.email;
    if(k.startsWith('cart_')){const u=(CF.cache.users||[]).find(x=>x.email===k.slice(5));return u?(u.cart||[]):d}
    if(LOCAL.has(k)){try{const v=localStorage.getItem('cf_'+k);return v?JSON.parse(v):d}catch(e){return d}}
    return k in CF.cache&&CF.cache[k]!==null?CF.cache[k]:d;
  },
  set(k,v){
    if(k==='session')return;
    if(k.startsWith('cart_')){const u=(CF.cache.users||[]).find(x=>x.email===k.slice(5));if(u){u.cart=v;mark('users')}return}
    if(LOCAL.has(k)){try{localStorage.setItem('cf_'+k,JSON.stringify(v))}catch(e){}return}
    CF.cache[k]=v;mark(k);
  }
};
function mark(k){CF.dirty.add(k);clearTimeout(CF.timer);CF.timer=setTimeout(flush,350)}
CF.flushNow=()=>{clearTimeout(CF.timer);return flush()};

/* replace pasted / uploaded photos (data: URLs) with files in storage */
function dataUrlToBlob(u){const [h,b]=u.split(',');const mime=h.slice(5).split(';')[0];const bin=atob(b);const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new Blob([a],{type:mime})}
async function uploadPics(obj){
  if(!CF.staff)return;
  const found=[];(function walk(o){if(!o||typeof o!=='object')return;for(const k in o){const v=o[k];if(typeof v==='string'&&v.startsWith('data:image/')&&v.length>2500)found.push([o,k]);else if(v&&typeof v==='object')walk(v)}})(obj);
  for(const [o,k] of found){const d=o[k];let url=CF.urlMap.get(d);
    if(!url){const blob=dataUrlToBlob(d),ext=(blob.type.split('/')[1]||'png').replace('jpeg','jpg'),path=`up/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
      const up=await sb.storage.from('media').upload(path,blob,{contentType:blob.type,upsert:false});if(up.error)throw up.error;
      url=sb.storage.from('media').getPublicUrl(path).data.publicUrl;CF.urlMap.set(d,url)}
    o[k]=url}
  // keep the live product list pointing at the uploaded files too
  if(found.length&&typeof P!=='undefined')P.forEach(p=>{if(typeof p.img==='string'&&CF.urlMap.has(p.img))p.img=CF.urlMap.get(p.img)});
}

async function flush(){
  if(CF.saving){CF.timer=setTimeout(flush,400);return}
  const keys=[...CF.dirty];CF.dirty.clear();if(!keys.length)return;
  CF.saving=true;setStatus('saving');let err=null;
  try{
    for(const k of keys){
      if(KV_KEYS.has(k)){
        if(!CF.staff)continue;
        const v=CF.cache[k];if(canon(v)===CF.snap['kv:'+k])continue;
        await uploadPics(v);
        const {error}=await sb.from('kv').upsert({key:k,value:v,public:KV_PUBLIC.has(k),updated_at:new Date().toISOString()});
        if(error)throw error;CF.snap['kv:'+k]=canon(v);
      } else if(k==='users'){
        for(const u of CF.cache.users){const c=canon(u);if(c===CF.snap.users[u.id])continue;
          if(!CF.staff&&u.id!==CF.uid)continue;
          const {id,email,role,active,created,...data}=u;delete data.pass;
          const old=JSON.parse(CF.snap.users[u.id]||'{}'),row={data};
          if(role!==old.role)row.role=role;if(active!==old.active)row.active=active!==false;
          await uploadPics(data);
          const {error}=await sb.from('profiles').update(row).eq('id',id);
          if(error){u.role=old.role;u.active=old.active;throw error}
          CF.snap.users[u.id]=canon(u)}
      } else if(k==='orders'){
        for(const o of CF.cache.orders){const c=canon(o);if(c===CF.snap.orders[o.id])continue;
          const row={status:o.status,date:o.date,data:o};
          if(!CF.snap.orders[o.id]){row.id=+o.id;row.email=o.email;const {error}=await sb.from('orders').insert(row);if(error)throw error}
          else{const {error}=await sb.from('orders').update(row).eq('id',+o.id);if(error)throw error}
          CF.snap.orders[o.id]=c}
      } else if(k==='messages'){
        for(const m of CF.cache.messages){const c=canon(m);if(c===CF.snap.messages[m.id])continue;
          const {id,read,...data}=m;
          if(!CF.snap.messages[m.id]){const {error}=await sb.from('messages').insert({id,data,read:false});if(error)throw error}
          else if(CF.staff){const {error}=await sb.from('messages').update({data,read:!!read}).eq('id',id);if(error)throw error}
          CF.snap.messages[m.id]=c}
      } else if(k==='subscribers'){
        for(const s of CF.cache.subscribers){if(CF.synced.has(s))continue;const {email,t,...data}=s;
          const {error}=await sb.from('subscribers').insert({email,data});if(error)throw error;CF.synced.add(s)}
      } else if(k==='activity'||k==='syslog'){
        if(!CF.staff)continue;const rows=[];
        for(const e of CF.cache[k]){if(CF.synced.has(e))continue;CF.synced.add(e);rows.push(k==='activity'?{kind:'act',who:e.who,what:e.what,ref:e.ref}:{kind:'sys',level:e.level,who:e.who,what:e.m})}
        if(rows.length){const {error}=await sb.from('logs').insert(rows.reverse());if(error)throw error}
      }
    }
  }catch(e){err=e;keys.forEach(k=>CF.dirty.add(k));CF.errors++}
  CF.saving=false;
  if(err){setStatus('error',err.message||String(err));if(CF.errors<4){CF.timer=setTimeout(flush,2500*CF.errors)}}
  else{CF.errors=0;setStatus('saved');if(CF.dirty.size)CF.timer=setTimeout(flush,200)}
}
function setStatus(s,msg){CF.status=s;const el=document.getElementById('cfsave');if(!el)return;el.dataset.s=s;el.textContent=s==='saving'?'Saving…':s==='error'?'Not saved — retrying':'All changes saved';el.title=msg||'';
  if(s==='error'&&typeof toast==='function')toast('Couldn’t save: '+(msg||'connection problem'))}
window.addEventListener('beforeunload',e=>{if(CF.dirty.size||CF.saving){e.preventDefault();e.returnValue=''}});

/* order numbers come from the database so two devices never clash */
CF.ids=[];
CF.reserveId=async()=>{if(!CF.uid||CF.ids.length)return;const {data,error}=await sb.rpc('new_order_id');if(!error&&data)CF.ids.push(String(data))};

/* live order updates for staff (and a customer's own orders) */
CF.live=function(onChange){
  if(!CF.uid)return;
  sb.channel('orders-live').on('postgres_changes',{event:'*',schema:'public',table:'orders'},p=>{
    const r=p.new;if(!r||!r.id)return;const o=rowToOrder(r),list=CF.cache.orders,i=list.findIndex(x=>x.id===o.id);
    if(i>=0&&canon(list[i])!==CF.snap.orders[o.id])return;   // we have unsaved edits to this order — keep ours
    if(i>=0){for(const k in list[i])delete list[i][k];Object.assign(list[i],o)}else list.push(o);
    CF.snap.orders[o.id]=canon(o);onChange&&onChange(o,i<0);
  }).subscribe();
};
})();
