/* =====================================================================
   NUTMEG BACK OFFICE
   Fulfill · Control · Manage · Admin, staff roles, wrench tools,
   customer account pages and help pages.
   Loaded after the store page script and shares its data.
   ===================================================================== */

/* ---------- styles ---------- */
document.head.insertAdjacentHTML('beforeend',`<style>
.bo{display:grid;grid-template-columns:232px 1fr;gap:26px;margin:22px auto;align-items:start}
.bo-side{position:sticky;top:140px;max-height:calc(100vh - 160px);overflow-y:auto;background:#fff;border:1.5px solid var(--line);border-radius:var(--r-m);padding:12px}
.bo-side h4{margin:12px 8px 4px;font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.bo-side h4:first-child{margin-top:2px}
.bo-side a{display:block;text-decoration:none;padding:.42em .7em;border-radius:var(--r-s);font-size:.92rem;font-weight:600}
.bo-side a:hover{background:var(--leaf)}
.bo-side a.on{background:var(--brown);color:#fff}
.bo-main{min-width:0}
.bo-main h1{font-size:clamp(1.6rem,3vw,2.2rem)}
.bo-head{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap;margin-bottom:14px}
.fbar{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;background:#fff;border:1.5px solid var(--line);border-radius:var(--r-m);padding:12px;margin-bottom:14px}
.fbar label{margin:0;font-size:.75rem;color:var(--muted);font-weight:700}
.fbar select,.fbar input{width:auto;min-width:120px;padding:.45em .6em;font-size:.9rem}
.fbar>div{display:flex;flex-direction:column;gap:3px}
.vtabs{display:flex;gap:4px;border-bottom:2px solid var(--line);margin-bottom:14px;flex-wrap:wrap}
.vtabs a{text-decoration:none;padding:.55em 1em;font-weight:700;border-bottom:3px solid transparent;margin-bottom:-2px;color:var(--muted)}
.vtabs a.on{color:var(--brown);border-bottom-color:var(--lime)}
.schips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
.schips a{text-decoration:none;border-radius:999px;padding:.32em .8em;font-weight:700;font-size:.85rem;background:#fff;border:1.5px solid var(--line)}
.schips a.on{background:var(--brown);color:#fff;border-color:var(--brown)}
.schips a b{margin-left:4px;opacity:.7}
.status.Received{background:var(--leaf);color:var(--lime-deep)}
.status.On{background:#ffe3c2;color:#8a4b00}
.status.Canceled,.status.Cancelled{background:#fde2df;color:var(--tomato)}
.status.Processed{background:#dbeafe;color:#1e4f9a}
.status.Charged{background:#e7e5e1;color:var(--brown)}
.stage{font-size:.78rem;font-weight:700;color:var(--muted)}
.ocard{background:#fff;border:1.5px solid var(--line);border-radius:var(--r-m);padding:14px;margin-bottom:10px}
.ocard .top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center}
.prog{height:6px;background:var(--line);border-radius:99px;overflow:hidden;margin:8px 0}
.prog i{display:block;height:100%;background:var(--lime)}
.pk{display:grid;grid-template-columns:64px 1fr auto;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);align-items:center}
.pk .thumb{width:64px;height:64px;font-size:2rem}
.pk.done{opacity:.6}
.pk.out .nm{text-decoration:line-through}
.pk .ctr{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;align-items:center}
.pk input{width:84px;padding:.4em .5em}
.tagx{display:inline-block;font-size:.72rem;font-weight:800;border-radius:999px;padding:.12em .55em;margin-right:4px;background:var(--leaf);color:var(--lime-deep)}
.tagx.red{background:#fde2df;color:var(--tomato)}
.tagx.amber{background:#fff2cc;color:#8a6200}
.tagx.blue{background:#dbeafe;color:#1e4f9a}
.kv{display:grid;grid-template-columns:max-content 1fr;gap:4px 14px;font-size:.93rem}
.kv b{color:var(--muted);font-weight:600}
.setnav{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
.setnav a{text-decoration:none;padding:.4em .85em;border-radius:999px;border:1.5px solid var(--line);font-weight:700;font-size:.86rem;background:#fff}
.setnav a.on{background:var(--brown);color:#fff;border-color:var(--brown)}
.tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.tile{background:#fff;border:2px solid var(--line);border-radius:var(--r-l);padding:18px;text-align:left;cursor:pointer;font:inherit}
.tile:hover{border-color:var(--lime-deep)}
.tile b{font-family:var(--display);font-size:1.6rem;display:block}
.wrench{position:fixed;right:calc(18px + env(safe-area-inset-right,0px));bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:55;width:56px;height:56px;border-radius:50%;border:0;background:var(--brown);color:#fff;font-size:1.5rem;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25)}
.wrench.on{background:var(--lime);color:var(--brown)}
.edit-pen{position:absolute;left:14px;bottom:62px;z-index:2;border:0;background:var(--brown);color:#fff;border-radius:999px;padding:.25em .7em;font-weight:700;font-size:.8rem;cursor:pointer}
.tag.oos{background:#6d6456}
.tag.hid{background:#1e4f9a}
.acct-nav{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0 18px}
.acct-nav a{text-decoration:none;padding:.45em .9em;border-radius:999px;border:1.5px solid var(--line);font-weight:700;font-size:.88rem;background:#fff}
.acct-nav a.on{background:var(--brown);color:#fff;border-color:var(--brown)}
.mini{font-size:.85rem}
.bulkbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;background:var(--leaf);border-radius:var(--r-m);padding:10px 12px;margin-bottom:10px}
.bulkbar select{width:auto}
body.standalone header.top,body.standalone footer.site,body.standalone .wrench{display:none}
body.standalone .bo{grid-template-columns:1fr;margin-top:12px}
body.standalone .bo-side{display:none}
body.standalone .pk{grid-template-columns:84px 1fr auto}
body.standalone .pk .thumb{width:84px;height:84px}
body.standalone .pk button{font-size:1.05rem;padding:.6em 1em}
@media (max-width:900px){.bo{grid-template-columns:1fr}.bo-side{position:static;max-height:none;display:flex;flex-wrap:wrap;gap:4px}.bo-side h4{width:100%}.pk{grid-template-columns:48px 1fr}.pk .ctr{grid-column:1/-1;justify-content:flex-start}}
@media print{body.printing #print table{width:100%;border-collapse:collapse}body.printing #print td,body.printing #print th{border-bottom:1px solid #ccc;padding:4px}.lbl-card{page-break-after:always;border:2px solid #000;padding:16px;margin-bottom:12px}}
</style>`);

/* ---------- small helpers ---------- */
const $=id=>document.getElementById(id);
const qa=v=>esc(JSON.stringify(v));                 // safe value inside onclick="..."
const todayStr=()=>ymd(new Date());
const fmtT=t=>t?new Date(t).toLocaleString([], {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'—';
const ROLES={admin:'Admin',manager:'Manager',shopper:'Personal Shopper',cashier:'Cashier',driver:'Driver',production:'Production',customer:'Customer'};
const ACCESS={
 manager:['orders','order','shopper','pick','cashier','charge','delivery','pickup','production','standalone','order-items','cashier-items','stock','check','issues','reports','bulk','customers','customer','accounts','banners','categories','menus','discounts','circular','featured','import','products','activity'],
 shopper:['shopper','pick','standalone','order-items','production'],
 cashier:['cashier','charge','cashier-items','orders','order','pickup'],
 driver:['delivery'],
 production:['production','order-items']
};
var realRole=()=>user()?.role||'customer';
var roleOf=()=>{const r=realRole();return ['admin','store_manager','chain_manager'].includes(r)?'admin':r};
const isStaffU=()=>!!me&&roleOf()!=='customer';
const can=sec=>roleOf()==='admin'||(ACCESS[roleOf()]||[]).includes(sec);
var staffList=role=>USERS.filter(u=>u.role&&u.role!=='customer'&&u.active!==false&&(!role||u.role===role||u.role==='admin'||u.role==='manager'));
const uname=e=>{const u=USERS.find(x=>x.email===e);return u?((u.first||'')+' '+(u.last||'')).trim()||u.email:(e||'—')};
let ACT=DB.get('activity',[]),SYS=DB.get('syslog',[]),ACCTS=DB.get('accounts',[]);
function act(what,ref=''){ACT.unshift({t:Date.now(),who:me||'customer',what,ref:String(ref)});if(ACT.length>3000)ACT.length=3000;DB.set('activity',ACT)}
function syslog(m,level='info'){SYS.unshift({t:Date.now(),level,m,who:me||''});if(SYS.length>2000)SYS.length=2000;DB.set('syslog',SYS)}
const saveAccts=()=>DB.set('accounts',ACCTS);
function xlsx(rows,sheet,file){if(!window.XLSX){toast('Excel tools are still loading — try again');return}const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows.length?rows:[{Note:'No data'}]),sheet);XLSX.writeFile(wb,file)}
function printHTML(html){$('print').innerHTML=`<div style="font-family:Figtree,system-ui,sans-serif;max-width:760px;margin:0 auto">${html}</div>`;document.body.classList.add('printing');window.print();document.body.classList.remove('printing')}
function hashSet(k,v){const [p,qs]=location.hash.slice(1).split('?');const u=new URLSearchParams(qs||'');u.set(k,v??'');if(k!=='page')u.delete('page');location.hash=p+'?'+u}

/* ---------- settings defaults ---------- */
const BO_DEFAULTS={
 boxTypes:{Dry:true,Case:false,Fridge:false,Freeze:false,Bag:false,'Heavy Box':false},
 checkoutText:'',
 oosOptions:[['Substitute with similar','Our shopper picks the closest match'],['Call or text me to review','We call or text before replacing'],['No substitutions — refund','Leave it out of the order']],
 shopperMode:{requireWeight:true,subsNeedApproval:true,showPhotos:true,claimOnStart:true,printLabelsOnDone:false},
 pickRoute:['Produce','Fresh Bakery','Groceries','Candy & Sweets','Beverages','Household','Beauty & Personal','Health','Baby Care','Media','Provisions','Dairy & Eggs','Fish','Fresh Meat','Deli','Sushi','Breakfast Bar','Catering','Frozen'],
 printer:{receipt:'80mm',labelsPerBox:1,showPrices:true,footer:'Thank you for shopping at Center Fresh!'},
 production:{depts:['Deli','Catering','Sushi','Breakfast Bar'],leadHours:2,note:''},
 scale:{unit:'lb',tare:0,variancePct:15},
 stockCtl:{track:false,hideOOS:false,low:5,oosOnPick:true},
 tax:{rate:6.625,depts:['Household','Beauty & Personal','Candy & Sweets','Media'],onFee:false},
 capacity:20, capacityBySlot:{},
 pickupFee:null,
 discounts:[], circular:null, banners:null, cats:null
};
for(const k in BO_DEFAULTS) if(!(k in S)) S[k]=JSON.parse(JSON.stringify(BO_DEFAULTS[k]));
const CF_ZIPS={'Borough Park':'11219, 11204, 11218','Midwood':'11230, 11210','Flatbush':'11226, 11210','Kensington':'11218','Bensonhurst':'11214, 11204','Williamsburg':'11211, 11249, 11206'};
if(!Array.isArray(S.areas)) S.areas=S.towns.map(t=>({name:t,fee:S.fee,min:S.minOrder,zips:CF_ZIPS[t]||'',active:true}));
const syncTowns=()=>{S.towns=S.areas.filter(a=>a.active).map(a=>a.name)};syncTowns();
if(Array.isArray(S.banners)&&S.banners.length) BANNERS.splice(0,BANNERS.length,...S.banners);
if(S.cats) for(const d in S.cats) if(DEPTS[d]) DEPTS[d][1]=S.cats[d];
EDIT_KEYS.push('published','stock','oos','brand','attrs','review','upc','taxable');

/* ---------- order status model ---------- */
const OST=['Received','Processing','On Hold','Canceled','Processed','Charged'];
const ATTRS=['Parve','Dairy','Meat','Gluten Free','Organic','Sugar Free','Cholov Yisroel','Pas Yisroel','Yoshon','Vegan'];
ORDERS.forEach(o=>{
  const m={Cancelled:'Canceled',Completed:'Charged','Out for delivery':'Processed','Ready for pickup':'Processed'};
  if(m[o.status]){if(o.status==='Out for delivery')o.stage='Out for delivery';if(o.status==='Ready for pickup')o.stage='Ready';o.status=m[o.status]}
  o.stage=o.stage||'Waiting';o.boxes=o.boxes||{};o.log=o.log||[];
});
const scls=s=>s.split(' ')[0];
const stBadge=s=>`<span class="status ${scls(s)}">${s}</span>`;
const prodDepts=()=>S.production.depts;
const isProdItem=it=>{const p=prod(it.pid);return p&&prodDepts().includes(p.dept)};
const hasProd=o=>o.items.some(isProdItem);
const areaOf=n=>S.areas.find(a=>a.name===n);
var nextOrderId=()=>String(Math.max(1000,...ORDERS.map(o=>+o.id||0))+1);

/* ---------- product helpers ---------- */
const BRANDCOUNT={};P.forEach(p=>{const w=(p.name||'').split(' ')[0];BRANDCOUNT[w]=(BRANDCOUNT[w]||0)+1});
const brandOf=p=>p.brand||(()=>{const w=(p.name||'').split(' ')[0];return BRANDCOUNT[w]>=3&&!/^(fresh|organic|nutmeg|mini|large|small|chicken|beef|salmon|apple|red|green|white|whole|sliced)$/i.test(w)?w:''})();
const oosP=p=>!!p&&(p.oos||(S.stockCtl.track&&p.stock!=null&&p.stock<=0));
const vis=p=>p.published!==false&&!(S.stockCtl.hideOOS&&oosP(p));
const taxableP=p=>!!p&&(p.taxable!=null?p.taxable:S.tax.depts.includes(p.dept));

/* ---------- money: estimated and final totals ---------- */
function lineFinal(it){
  const pk=it.pick||{},p=prod(it.pid);
  if(pk.status==='out') return 0;
  if(pk.status==='sub'&&pk.sub) return pk.sub.qty*pk.sub.price;
  if(it.mode!=='case'&&p&&p.unit==='lb'&&pk.weight!=null&&pk.weight!=='') return +pk.weight*unitPrice(p);
  if(pk.qty!=null&&pk.qty!==''&&+pk.qty!==it.qty) return lineTotal({...it,qty:+pk.qty});
  return lineTotal(it);
}
function totals(o,final){
  let sub=0,tax=0;
  o.items.forEach(it=>{const v=final?lineFinal(it):lineTotal(it);sub+=v;const tp=final&&it.pick?.status==='sub'?prod(it.pick.sub.pid):prod(it.pid);if(taxableP(tp))tax+=v*S.tax.rate/100});
  const fee=window.feeFor?window.feeFor(o,sub):(o.method==='Delivery'?(areaOf(o.town)?.fee??S.fee):(S.pickupFee??S.fee));
  let disc=0;const d=o.discRule;if(d){disc=d.type==='%'?sub*d.amount/100:Math.min(sub,d.amount)}
  if(S.tax.onFee)tax+=fee*S.tax.rate/100;
  const tip=+o.tip||0;
  return {sub,tax,fee,disc,tip,total:sub-disc+tax+fee+tip};
}
window.recalc=function(o){const t=totals(o,false);Object.assign(o,{subtotal:t.sub,tax:t.tax,fee:t.fee,discount:t.disc,total:t.total})};
function finalize(o){const t=totals(o,true);o.finalT=t;o.final=t.total}
function sumRows(t,labelTotal){return `<div class="sum"><span>Subtotal</span><span>${money(t.sub)}</span></div>${t.disc?`<div class="sum"><span>Discount</span><span>−${money(t.disc)}</span></div>`:''}<div class="sum"><span>Tax</span><span>${money(t.tax)}</span></div><div class="sum"><span>Service fee</span><span>${money(t.fee)}</span></div>${t.tip?`<div class="sum"><span>Tip</span><span>${money(t.tip)}</span></div>`:''}<div class="sum t"><span>${labelTotal||'Total'}</span><span>${money(t.total)}</span></div>`}

/* ---------- time slot capacity ---------- */
const _slotsFor=window.slotsFor;
const slotLoad=(d,s)=>ORDERS.filter(o=>o.date===d&&o.slot===s&&o.status!=='Canceled').length;
const slotCap=(d,s)=>{const k=new Date(d+'T00:00').getDay()+'|'+s;return S.capacityBySlot[k]??S.capacity};
window.slotsFor=d=>_slotsFor(d).filter(s=>slotLoad(d,s)<slotCap(d,s));
function allWindows(d){const w=S.windows[new Date(d+'T00:00').getDay()];if(!w)return[];const o=[];for(let h=w[0];h+2<=w[1];h++)o.push(`${h12(h)} – ${h12(h+2)}`);return o}

/* ---------- storefront: visibility, cards, out of stock ---------- */
const _matches=window.matches;
window.matches=t=>{const r=_matches(t);return isStaffU()?r:r.filter(vis)};
function withVisible(fn){return function(...a){if(isStaffU())return fn(...a);const all=P;P=all.filter(vis);try{return fn(...a)}finally{P=all}}}
window.vList=withVisible(window.vList);
window.vHome=withVisible(window.vHome);
let editMode=DB.get('editMode',false);
const _card=window.card;
window.card=p=>{let h=_card(p);const extra=(oosP(p)?'<span class="tag oos">Out of stock</span>':'')+(p.published===false?'<span class="tag hid">Hidden</span>':'')+(isStaffU()&&editMode&&can('check')?`<button class="edit-pen" onclick="editP('${p.id}')">✎ Edit</button>`:'');return h.replace('<article class="pc">','<article class="pc">'+extra)};
const _ctl=window.ctl;
window.ctl=p=>oosP(p)?'<span class="nop">Out of stock</span>':_ctl(p);
const _addToCart=window.addToCart;
window.addToCart=function(pid,...a){if(oosP(prod(pid))){toast('Sorry, this item is out of stock.');return}return _addToCart(pid,...a)};
const _vProduct=window.vProduct;
window.vProduct=id=>{const p=prod(id);if(p&&!isStaffU()&&p.published===false)return vPage('404');let h=_vProduct(id);
  if(p&&oosP(p))h=h.replace('<div style="margin:14px 0">','<div style="margin:14px 0"><span class="status Canceled" style="margin-right:8px">Out of stock</span>');
  if(p&&isStaffU()&&can('check'))h=h.replace('<h1>',`<button class="btn sm ghost" style="float:right" onclick="editP('${p.id}')">✎ Edit product</button><h1>`);return h};

/* ---------- header, nav, router ---------- */
window.renderActs=function(){
  const u=user(),n=getCart().length;
  $('acts').innerHTML=(u?`<a href="#/account">👤 <span class="lbl">${esc(u.first)}</span></a><a href="#/my-items">♡ <span class="lbl">My Items</span></a><a href="#/orders">🧾 <span class="lbl">Orders</span></a>${isStaffU()?'<a href="#/admin">🧰 <span class="lbl">Back office</span></a>':''}`
     :`<button onclick="openLogin()">👤 <span class="lbl">Sign in</span></button>`)+
   `<button class="cartbtn" onclick="openDrawer()" aria-label="Cart, ${n} items">🛒 <span class="lbl">Cart</span> <span class="n">${n}</span></button>`;
  renderWrench();
};
const circActive=()=>{const c=S.circular;if(!c||!c.items?.length||!c.published)return false;const t=todayStr();return (!c.from||c.from<=t)&&(!c.to||c.to>=t)};
const _renderNav=window.renderNav;
window.renderNav=parts=>{_renderNav(parts);if(circActive())$('deptnav').insertAdjacentHTML('afterbegin',`<a class="sp ${parts[0]==='circular'?'on':''}" href="#/circular">Weekly Circular</a>`)};
const _oldRoute=window.route;
window.removeEventListener('hashchange',_oldRoute);
window.route=function(){
  const h=location.hash.slice(1)||'/';const [path,qs]=h.split('?');const q=new URLSearchParams(qs||'');const parts=path.split('/').filter(Boolean).map(decodeURIComponent);
  closeSugg();const r=parts[0]||'';let html=null;
  document.body.classList.toggle('standalone',r==='admin'&&parts[1]==='standalone');document.body.classList.toggle('bo-mode',r==='admin'&&isStaffU());
  if(r==='admin')html=vBO(parts.slice(1),q);
  else if(r==='account')html=vAcct(parts[1]||'info');
  else if(r==='circular')html=vCircular();
  else if(r==='hours')html=vHours();
  else if(r==='customer-service'||r==='contact')html=vCS();
  else if(r==='wrench')html=vWrench(q);
  if(html===null){_oldRoute();bindAfter(r);return}
  $('app').innerHTML=html;renderNav(parts);window.scrollTo(0,0);bindAfter(r,parts);
};
window.addEventListener('hashchange',()=>route());
function bindAfter(r,parts){if(r==='checkout')coInit();if(r==='admin'&&parts&&parts[1]==='order'&&parts[2])aoSlots(parts[2],true)}

/* ---------- checkout with service areas, capacity, tax and discounts ---------- */
let coDisc=null;
window.vCheckout=function(){
  if(!me) return gate('Sign in to check out.');
  const c=getCart(),u=user(),st=subtotal(c);
  if(!c.length) return `<div class="wrap"><div class="empty"><div class="e">🧺</div><h2>Your cart is empty</h2><a class="btn lime" href="#/">Start shopping</a></div></div>`;
  const areas=S.areas.filter(a=>a.active),addrs=u.addresses||[],def=addrs.find(a=>a.def)||addrs[0]||{street:u.address||'',town:u.town||''};
  const dates=nextDates();coDisc=null;coSel={date:null,slot:null};
  return `<div class="wrap"><h1 style="margin-top:28px">Check out</h1><form class="two" onsubmit="return placeOrder(event)">
  <div>
   <div class="panel"><h3>How would you like to get it?</h3><div class="opt">
    <label><input type="radio" name="method" value="Delivery" checked onchange="coMethod();coUpdate()"><b>Delivery</b><small>${areas.map(a=>esc(a.name)).join(', ')}</small></label>
    <label><input type="radio" name="method" value="Pickup" onchange="coMethod();coUpdate()"><b>Pickup</b><small>At the store</small></label></div>
    <div id="addr">${addrs.length?`<label for="cab">Saved addresses</label><select id="cab" onchange="coAddr(this.value)">${addrs.map((a,i)=>`<option value="${i}" ${a===def?'selected':''}>${esc((a.label?a.label+' — ':'')+a.street+', '+a.town)}</option>`).join('')}<option value="new">Use a new address</option></select>`:''}
     <div class="grid2"><div><label for="ca">Street address</label><input id="ca" value="${esc(def.street||'')}" autocomplete="street-address"></div><div><label for="capt">Apt / floor</label><input id="capt" value="${esc(def.apt||'')}"></div></div>
     <div class="grid2"><div><label for="ct">Town</label><select id="ct" onchange="coUpdate()">${areas.map(a=>`<option ${a.name===def.town?'selected':''}>${esc(a.name)}</option>`).join('')}</select></div><div><label for="cd">Delivery instructions</label><input id="cd" value="${esc(def.notes||'')}" placeholder="Gate code, side door…"></div></div></div>
   </div>
   <div class="panel"><h3>Choose a day and time</h3>
    ${dates.length?`<div class="chips" id="dates">${dates.map((d,i)=>`<a href="javascript:void 0" class="${i?'':'on'}" onclick="coDate('${d}',this)">${prettyDate(d)}</a>`).join('')}</div><div class="slots" id="slots"></div>`:'<p class="err">No time windows are open this week. Please call the store.</p>'}
    <p class="small muted" style="margin-bottom:0">Same-day orders close at ${h12(S.cutoffs[0])} Sunday–Thursday and ${h12(S.cutoffs[5])} Friday. Full windows aren’t shown.</p></div>
   ${S.checkoutText?`<div class="panel" style="background:var(--leaf);border-color:transparent"><h3>Before you order</h3><p style="margin:0;white-space:pre-line">${esc(S.checkoutText)}</p></div>`:''}
   <div class="panel"><h3>If an item is out of stock</h3><div class="opt">${S.oosOptions.map(([v,d],i)=>`<label><input type="radio" name="subs" value="${esc(v)}" ${i?'':'checked'}><b>${esc(v)}</b><small>${esc(d)}</small></label>`).join('')}</div></div>
   <div class="panel"><h3>Contact &amp; payment</h3><div class="grid2"><div><label for="cp">Cell phone</label><input id="cp" type="tel" required value="${esc(u.phone||'')}"></div>
    <div><label for="crc">Receipt</label><select id="crc"><option>Email receipt</option><option>Paper receipt with order</option></select></div></div>
    <label for="cpay">Payment</label><select id="cpay">${(u.cards||[]).map(cd=>`<option>Card on file — ${esc(cd.brand)} ending ${esc(cd.last4)}</option>`).join('')}<option>Card — the store will call to authorize</option><option>Pay at pickup / delivery</option>${ACCTS.some(a=>a.customers.includes(me))?'<option>Charge to house account</option>':''}</select>
    <p class="small muted">Your card is authorized for the estimated total. The final charge is adjusted for actual weights, availability and substitutions.</p>
    <label for="cn">Order notes <span class="muted small">(optional)</span></label><textarea id="cn" rows="2"></textarea></div>
  </div>
  <div class="panel" style="position:sticky;top:150px"><h3>Order summary</h3>
   ${c.map(it=>{const p=prod(it.pid);return `<div class="sum small"><span>${esc(p?.name)} × ${qtyLabel(it,p)}</span><span>${money(lineTotal(it))}</span></div>`}).join('')}
   <hr style="border:0;border-top:1px solid var(--line);margin:12px 0">
   <label for="ccode" style="margin-top:0">Discount code</label><div class="row" style="flex-wrap:nowrap"><input id="ccode" style="text-transform:uppercase"><button type="button" class="btn sm ghost" onclick="coApply()">Apply</button></div><div class="small" id="cmsg"></div>
   <div id="cosum" style="margin-top:10px"></div>
   <div class="err" id="coerr"></div>
   <button class="btn lime" id="cobtn" type="submit" style="width:100%;margin-top:14px">Place order</button></div>
  </form></div>`;
};
function coInit(){const f=document.querySelector('#dates a');if(f)f.click();coMethod();coUpdate()}
function coAddr(i){const u=user();if(i==='new'){['ca','capt','cd'].forEach(k=>$(k).value='');return}const a=u.addresses[i];$('ca').value=a.street;$('capt').value=a.apt||'';$('cd').value=a.notes||'';$('ct').value=a.town;coUpdate()}
function coPseudo(){const m=document.querySelector('input[name=method]:checked')?.value||'Delivery';return {items:getCart(),method:m,town:$('ct')?.value,discRule:coDisc}}
function coUpdate(){
  const o=coPseudo(),t=totals(o,false),el=$('cosum');if(!el)return;
  const min=o.method==='Delivery'?(areaOf(o.town)?.min??S.minOrder):S.minOrder,short=t.sub<min;
  el.innerHTML=sumRows(t,'Estimated total')+(short?`<p class="small err">Minimum order${o.method==='Delivery'?' for '+esc(o.town):''} is ${money(min)}.</p>`:'');
  $('cobtn').disabled=short;
}
function findCode(code){code=String(code||'').trim().toUpperCase();const d=S.discounts.find(x=>x.code.toUpperCase()===code&&x.active);if(!d)return [null,'That code isn’t valid.'];
  if(d.expires&&d.expires<todayStr())return [null,'That code has expired.'];
  if(d.maxUses&&(d.uses||0)>=d.maxUses)return [null,'That code has been used up.'];
  if(d.once&&ORDERS.some(o=>o.email===me&&o.code===d.code&&o.status!=='Canceled'))return [null,'You’ve already used this code.'];
  return [d,''];}
function coApply(){const [d,err]=findCode($('ccode').value);const st=subtotal(getCart());
  if(d&&d.min&&st<d.min){coDisc=null;$('cmsg').innerHTML=`<span class="err">This code needs an order of ${money(d.min)} or more.</span>`}
  else if(d){coDisc={code:d.code,type:d.type,amount:d.amount};$('cmsg').innerHTML=`<span style="color:var(--lime-deep);font-weight:700">${esc(d.code)} applied — ${d.type==='%'?d.amount+'% off':money(d.amount)+' off'}</span>`}
  else{coDisc=null;$('cmsg').innerHTML=`<span class="err">${err}</span>`}coUpdate()}
window.placeOrder=function(e){
  e.preventDefault();const err=$('coerr'),c=getCart(),u=user();
  const method=document.querySelector('input[name=method]:checked').value,street=$('ca').value.trim(),town=$('ct').value,apt=$('capt').value.trim();
  if(method==='Delivery'&&!street){err.textContent='Enter a street address for delivery.';return false}
  if(!coSel.date||!coSel.slot){err.textContent='Choose a day and a time window.';return false}
  if(!slotsFor(coSel.date).includes(coSel.slot)){err.textContent='That window just closed or filled up. Please choose another.';return false}
  const o={id:nextOrderId(),email:me,name:(u.first+' '+u.last).trim(),phone:$('cp').value.trim(),method,address:method==='Delivery'?street+(apt?', '+apt:''):'',town:method==='Delivery'?town:'',instructions:method==='Delivery'?$('cd').value.trim():'',
    date:coSel.date,slot:coSel.slot,subs:document.querySelector('input[name=subs]:checked').value,receipt:$('crc').value,pay:$('cpay').value,notes:$('cn').value.trim(),
    code:coDisc?.code||'',discRule:coDisc,items:c.map(it=>({...it,name:prod(it.pid)?.name,price:unitPrice(prod(it.pid))})),status:'Received',stage:'Waiting',boxes:{},created:Date.now(),log:[{t:Date.now(),m:'Order placed'}]};
  recalc(o);
  const min=method==='Delivery'?(areaOf(town)?.min??S.minOrder):S.minOrder;if(o.subtotal<min){err.textContent=`Minimum order is ${money(min)}.`;return false}
  ORDERS.push(o);
  if(coDisc){const d=S.discounts.find(x=>x.code===coDisc.code);if(d)d.uses=(d.uses||0)+1}
  if(method==='Delivery'){u.addresses=u.addresses||[];if(!u.addresses.some(a=>a.street===street&&a.town===town))u.addresses.push({label:'',street,apt,town,notes:o.instructions,def:!u.addresses.length});u.address=street;u.town=town}
  u.phone=o.phone;saveAll();setCart([]);go('/order/'+o.id);toast('Order placed — thank you!');return false;
};
window.oCancel=function(id){if(!confirm('Cancel this order?'))return;const o=findO(id);o.status='Canceled';o.log.push({t:Date.now(),m:'Canceled by customer'});saveAll();route();toast('Order canceled')};
const _vOrder=window.vOrder;
window.vOrder=id=>{const o=findO(id);let h=_vOrder(id);if(!o)return h;
  const lbl=o.status==='Charged'?'Completed':o.status==='Processed'?(o.method==='Pickup'?(o.stage==='Picked up'?'Picked up':'Ready for pickup'):(o.stage==='Delivered'?'Delivered':o.stage==='Out for delivery'?'Out for delivery':'Packed')):o.status;
  return h.replace(new RegExp('<span class="status [^"]*" style="font-size:1rem">[^<]*</span>'),`<span class="status ${scls(o.status)}" style="font-size:1rem">${lbl}</span>`)};
window.printReceipt=function(id){
  const o=findO(id),fin=o.status==='Processed'||o.status==='Charged',t=fin?totals(o,true):totals(o,false);
  printHTML(`<div style="max-width:${S.printer.receipt==='80mm'?'300px':'760px'};margin:0 auto"><h2 style="margin:0">${esc(S.brand?.name||'Center Fresh Supermarket')}</h2><p class="small">${esc(S.address)} ${esc(S.phone)}</p><h3>Order #${o.id}</h3>
   <p>${esc(o.name)} · ${esc(o.phone)}<br>${o.method}: ${prettyDate(o.date)}, ${o.slot}${o.address?'<br>'+esc(o.address)+', '+esc(o.town):''}</p>
   <table><tbody>${o.items.map(it=>{const pk=it.pick||{};const nm=pk.status==='sub'?`${esc(pk.sub.name)} <i>(for ${esc(it.name)})</i>`:esc(it.name);const q=pk.status==='out'?'Out of stock':(pk.weight?pk.weight+' lb':qtyLabel(pk.qty!=null?{...it,qty:+pk.qty}:it,prod(it.pid)));return `<tr><td>${nm}${it.note?`<div class="small">“${esc(it.note)}”</div>`:''}</td><td>${q}</td>${S.printer.showPrices?`<td style="text-align:right">${money(fin?lineFinal(it):lineTotal(it))}</td>`:''}</tr>`}).join('')}</tbody></table>
   ${S.printer.showPrices?sumRows(t,fin?'Total':'Estimated total'):''}${o.notes?`<p>Notes: ${esc(o.notes)}</p>`:''}<p class="small">${esc(S.printer.footer)}</p></div>`);
};
function printLabels(id){const o=findO(id),types=Object.entries(o.boxes||{}).filter(([,n])=>n>0);const all=[];types.forEach(([t,n])=>{for(let i=0;i<n;i++)all.push(t)});if(!all.length)all.push('Dry');
  const N=all.length,cp=S.printer.labelsPerBox||1;let html='';all.forEach((t,i)=>{for(let k=0;k<cp;k++)html+=`<div class="lbl-card"><div style="font-size:28px;font-weight:800">#${o.id} — ${esc(o.name)}</div><div style="font-size:20px">${o.method==='Delivery'?esc(o.town)+' · '+esc(o.address):'PICKUP'}</div><div style="font-size:18px">${prettyDate(o.date)}, ${o.slot}</div><div style="font-size:24px;font-weight:800;margin-top:8px">${esc(t)} · Box ${i+1} of ${N}</div></div>`});printHTML(html)}

/* ---------- customer account pages ---------- */
function vAcct(sub){
  if(!me) return gate('Sign in to manage your account.');
  const u=user(),tabs=[['info','Personal Info'],['addresses','Addresses'],['cards','Cards'],['password','Change Password'],['pin','Change PIN']];
  const nav=`<nav class="acct-nav">${tabs.map(([k,l])=>`<a class="${k===sub?'on':''}" href="#/account/${k}">${l}</a>`).join('')}<a href="#/my-items">My Items</a><a href="#/orders">My Orders</a></nav>`;
  let body='';
  if(sub==='info')body=`<form class="panel" onsubmit="return accInfo(event)"><div class="grid2"><div><label for="af">First name</label><input id="af" value="${esc(u.first)}"></div><div><label for="al">Last name</label><input id="al" value="${esc(u.last)}"></div></div>
    <label>Email</label><input value="${esc(u.email)}" disabled><label for="aph">Cell phone</label><input id="aph" type="tel" value="${esc(u.phone||'')}">
    <div class="row" style="margin-top:16px"><button class="btn" type="submit">Save</button><button type="button" class="btn ghost" onclick="logout()">Sign out</button></div></form>`;
  else if(sub==='addresses'){const A=u.addresses||[];body=`${A.length?A.map((a,i)=>`<div class="panel row" style="justify-content:space-between"><div><b>${esc(a.label||'Address '+(i+1))}</b>${a.def?' <span class="tagx">Default</span>':''}<div>${esc(a.street)}${a.apt?', '+esc(a.apt):''}, ${esc(a.town)}</div>${a.notes?`<div class="small muted">${esc(a.notes)}</div>`:''}</div><div class="row">${a.def?'':`<button class="btn sm ghost" onclick="accAddrDef(${i})">Make default</button>`}<button class="btn sm ghost" onclick="accAddrDel(${i})">Remove</button></div></div>`).join(''):'<p class="muted">No saved addresses yet.</p>'}
    <form class="panel" onsubmit="return accAddrAdd(event)"><h3>Add an address</h3><div class="grid2"><div><label for="nl">Label</label><input id="nl" placeholder="Home, Work…"></div><div><label for="nt2">Town</label><select id="nt2">${S.areas.filter(a=>a.active).map(a=>`<option>${esc(a.name)}</option>`).join('')}</select></div></div>
    <div class="grid2"><div><label for="ns">Street address</label><input id="ns" required></div><div><label for="na">Apt / floor</label><input id="na"></div></div><label for="nn">Delivery instructions</label><input id="nn"><button class="btn" style="margin-top:14px" type="submit">Save address</button></form>`}
  else if(sub==='cards'){const C=u.cards||[];body=`<p class="panel small" style="background:var(--leaf);border-color:transparent">For your security, full card numbers are never stored on this website. Save a card nickname here so you can choose it at checkout — the store authorizes the card with its payment processor or by phone.</p>
    ${C.map((c,i)=>`<div class="panel row" style="justify-content:space-between"><div><b>${esc(c.brand)} ending ${esc(c.last4)}</b><div class="small muted">${esc(c.name||'')} ${c.exp?'· exp '+esc(c.exp):''}</div></div><button class="btn sm ghost" onclick="accCardDel(${i})">Remove</button></div>`).join('')}
    <form class="panel" onsubmit="return accCardAdd(event)"><h3>Add a card</h3><div class="grid2"><div><label for="cb">Card type</label><select id="cb"><option>Visa</option><option>Mastercard</option><option>American Express</option><option>Discover</option></select></div><div><label for="c4">Last 4 digits</label><input id="c4" inputmode="numeric" maxlength="4" pattern="\\d{4}" required></div></div>
    <div class="grid2"><div><label for="cnm">Name on card</label><input id="cnm"></div><div><label for="cx">Expires (MM/YY)</label><input id="cx" maxlength="5" placeholder="MM/YY"></div></div><button class="btn" style="margin-top:14px" type="submit">Save card</button></form>`}
  else if(sub==='password')body=`<form class="panel" onsubmit="return accPw(event)"><label for="p0">Current password</label><input id="p0" type="password" required autocomplete="current-password"><label for="p1">New password</label><input id="p1" type="password" minlength="6" required autocomplete="new-password"><label for="p2">Confirm new password</label><input id="p2" type="password" minlength="6" required autocomplete="new-password"><div class="err" id="perr"></div><button class="btn" style="margin-top:14px" type="submit">Change password</button></form>`;
  else if(sub==='pin')body=`<form class="panel" onsubmit="return accPin(event)"><p class="muted small">Your PIN confirms it’s you when you call the store to place or change an order${isStaffU()?', and signs you in to Standalone Mode':''}.</p>${u.pin?'<label for="q0">Current PIN</label><input id="q0" type="password" inputmode="numeric" maxlength="4" required>':''}<label for="q1">New 4-digit PIN</label><input id="q1" type="password" inputmode="numeric" maxlength="4" pattern="\\d{4}" required><div class="err" id="qerr"></div><button class="btn" style="margin-top:14px" type="submit">${u.pin?'Change PIN':'Set PIN'}</button></form>`;
  return `<div class="wrap" style="max-width:760px"><h1 style="margin-top:28px">My account</h1>${nav}${body}</div>`;
}
function accInfo(e){e.preventDefault();const u=user();u.first=$('af').value.trim();u.last=$('al').value.trim();u.phone=$('aph').value.trim();saveAll();renderActs();toast('Saved');return false}
function accAddrAdd(e){e.preventDefault();const u=user();u.addresses=u.addresses||[];u.addresses.push({label:$('nl').value.trim(),town:$('nt2').value,street:$('ns').value.trim(),apt:$('na').value.trim(),notes:$('nn').value.trim(),def:!u.addresses.length});saveAll();route();toast('Address saved');return false}
function accAddrDef(i){const u=user();u.addresses.forEach((a,j)=>a.def=j===i);saveAll();route()}
function accAddrDel(i){const u=user(),was=u.addresses[i].def;u.addresses.splice(i,1);if(was&&u.addresses[0])u.addresses[0].def=true;saveAll();route()}
function accCardAdd(e){e.preventDefault();const u=user();u.cards=u.cards||[];u.cards.push({brand:$('cb').value,last4:$('c4').value,name:$('cnm').value.trim(),exp:$('cx').value.trim()});saveAll();route();toast('Card saved');return false}
function accCardDel(i){const u=user();u.cards.splice(i,1);saveAll();route()}
function accPw(e){e.preventDefault();const u=user();if(u.pass!==hash($('p0').value)){$('perr').textContent='Current password is wrong.';return false}if($('p1').value!==$('p2').value){$('perr').textContent='New passwords don’t match.';return false}u.pass=hash($('p1').value);saveAll();route();toast('Password changed');return false}
function accPin(e){e.preventDefault();const u=user();if(u.pin&&u.pin!==hash($('q0').value)){$('qerr').textContent='Current PIN is wrong.';return false}if(!/^\d{4}$/.test($('q1').value)){$('qerr').textContent='Use exactly 4 digits.';return false}u.pin=hash($('q1').value);saveAll();route();toast('PIN saved');return false}
window.vAccount=()=>vAcct('info');

/* ---------- help pages ---------- */
function vCS(){
  const contact=vPage('contact').replace(/^<div class="wrap"><h1[^>]*>.*?<\/h1>/,'').replace(/<\/div>$/,'');
  return `<div class="wrap"><h1 style="margin-top:28px">Customer Service</h1><div class="two" style="margin-top:0"><div>${contact}</div>
   <div class="panel"><h3>Reach the store</h3>${S.phone?`<p>📞 <a href="tel:${esc(S.phone)}">${esc(S.phone)}</a></p>`:''}${S.email?`<p>✉️ <a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>`:''}
   <p><a href="#/hours">Store hours</a> · <a href="#/delivery">Delivery info</a> · <a href="#/faq">FAQ</a></p><p class="small muted">Questions about an order? Include your order number so we can find it fast.</p></div></div></div>`;
}
function vHours(){
  const days=[0,1,2,3,4,5,6].map(i=>{const w=S.windows[i];return `<tr><td>${DAYS[i]}</td><td>${w?h12(w[0])+' – '+h12(w[1]):'No delivery'}</td><td>${S.cutoffs[i]!=null?h12(S.cutoffs[i]):'—'}</td></tr>`}).join('');
  return `<div class="wrap"><h1 style="margin-top:28px">Store Hours</h1><div class="two" style="margin-top:0"><div class="panel"><h3>Store</h3>${S.hours?`<p style="white-space:pre-line;margin:0">${esc(S.hours)}</p>`:'<p class="muted">Store hours will appear here.</p>'}${S.address?`<p class="muted">${esc(S.address)}</p>`:''}</div>
   <div class="panel tbl-wrap"><h3>Delivery &amp; pickup windows</h3><table><thead><tr><th>Day</th><th>Windows</th><th>Same-day cutoff</th></tr></thead><tbody>${days}</tbody></table></div></div></div>`;
}
function vCircular(){
  const c=S.circular;if(!circActive())return `<div class="wrap"><div class="empty"><div class="e">🗞️</div><h2>No circular this week</h2><a class="btn lime" href="#/specials">See specials</a></div></div>`;
  const items=c.items.map(i=>prod(i.pid)).filter(p=>p&&vis(p));
  return `<div class="wrap"><h1 style="margin-top:28px">${esc(c.title||'Weekly Circular')}</h1><p class="muted">${c.from?'Valid '+prettyDate(c.from):''}${c.to?' through '+prettyDate(c.to):''}${c.note?' · '+esc(c.note):''}</p><div class="pgrid">${items.map(card).join('')}</div></div>`;
}

/* ---------- wrench: quick catalog tools ---------- */
const WF={unpublished:['Unpublished',p=>p.published===false],specific:['Specific only (added or changed here)',p=>!BASE[p.id]||!!OVR[p.id]],nocat:['Missing category',p=>p.sub==='Other'||!p.sub],noattr:['Missing attributes',p=>!(p.attrs&&p.attrs.length)],nobrand:['Missing brand',p=>!brandOf(p)],noweight:['Missing weight / size',p=>!p.size],review:['Ready for review',p=>!!p.review]};
function renderWrench(){let b=$('wrenchBtn');const show=isStaffU()&&can('check');if(!show){b?.remove();return}
  if(!b){document.body.insertAdjacentHTML('beforeend','<button class="wrench" id="wrenchBtn" title="Catalog tools (W)" aria-label="Catalog tools" onclick="openWrench()">🔧</button>');b=$('wrenchBtn')}b.classList.toggle('on',editMode)}
function openWrench(){
  modal(`<h2>Catalog tools</h2><label class="check" style="font-size:1.05rem"><input type="checkbox" ${editMode?'checked':''} onchange="setEdit(this.checked)"> Edit mode — show an Edit button on every product</label>
   <h3 style="margin-top:18px">Show products</h3><div class="setnav">${Object.entries(WF).map(([k,[l,f]])=>`<a href="#/wrench?f=${k}" onclick="closeModal()">${l} <b>${P.filter(f).length.toLocaleString()}</b></a>`).join('')}</div>
   <div class="row" style="margin-top:12px"><button class="btn ghost" onclick="clearCache()">Clear cache</button><button class="btn ghost" onclick="showHotkeys()">Hotkeys</button></div>`);
}
function setEdit(v){editMode=v;DB.set('editMode',v);renderWrench();route()}
function clearCache(){try{sessionStorage.clear()}catch(e){}syslog('Cache cleared');toast('Cache cleared — reloading');setTimeout(()=>location.reload(),400)}
function showHotkeys(){modal(`<h2>Hotkeys</h2><table><tbody>${[['/','Search products'],['C','Open cart'],['B','Back office'],['O','Order Manager'],['S','Personal Shopper'],['W','Catalog tools'],['E','Toggle edit mode'],['?','Show hotkeys'],['Esc','Close windows']].map(([k,d])=>`<tr><td><kbd style="font-weight:800;background:var(--leaf);padding:2px 8px;border-radius:6px">${k}</kbd></td><td>${d}</td></tr>`).join('')}</tbody></table>`)}
document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select')||e.metaKey||e.ctrlKey||e.altKey)return;const k=e.key;
  if(k==='/'){e.preventDefault();$('q').focus();return}
  if(k==='c'||k==='C'){openDrawer();return}
  if(!isStaffU())return;
  if(k==='b'||k==='B')go('/admin');else if(k==='o'||k==='O')go('/admin/orders');else if(k==='s'||k==='S')go('/admin/shopper');
  else if((k==='w'||k==='W')&&can('check'))openWrench();else if((k==='e'||k==='E')&&can('check'))setEdit(!editMode);else if(k==='?')showHotkeys()});
function vWrench(q){
  if(!isStaffU()||!can('check'))return gate('Staff only.');
  const f=q.get('f')||'unpublished',[label,fn]=WF[f]||WF.unpublished,pg=+q.get('page')||1,N=48,list=P.filter(fn),pages=Math.max(1,Math.ceil(list.length/N));
  return `<div class="wrap"><div class="crumbs"><a href="#/admin">Back office</a> / Catalog tools</div><h1>${esc(label)}</h1><div class="setnav">${Object.entries(WF).map(([k,[l]])=>`<a class="${k===f?'on':''}" href="#/wrench?f=${k}">${l}</a>`).join('')}</div>
   <div class="toolbar"><span class="muted">${list.length.toLocaleString()} products</span><div class="row"><label class="check" style="margin:0"><input type="checkbox" ${editMode?'checked':''} onchange="setEdit(this.checked)"> Edit mode</label><a class="btn sm ghost" href="#/admin/bulk?wf=${f}">Bulk edit these</a></div></div>
   ${list.length?`<div class="pgrid">${list.slice((pg-1)*N,pg*N).map(card).join('')}</div>`:'<div class="empty"><div class="e">✅</div><h3>Nothing to fix here</h3></div>'}
   ${pages>1?`<nav class="pager">${pageNums(pg,pages).map(n=>n==='…'?'<b class="muted">…</b>':n===pg?`<span>${n}</span>`:`<a href="#/wrench?f=${f}&page=${n}">${n}</a>`).join('')}</nav>`:''}</div>`;
}

/* ---------- product editor with the new fields ---------- */
window.editP=function(id){
  const p=id?prod(id):{name:'',dept:DEPT_NAMES[0],sub:DEPTS[DEPT_NAMES[0]][1][0],price:null,unit:'ea',size:'',img:'🛒',pop:50};
  const num=(k,l)=>`<div><label for="e_${k}">${l}</label><input id="e_${k}" type="number" step="0.01" value="${p[k]??''}"></div>`;
  modal(`<h2>${id?'Edit product':'Add product'}</h2>
   <label for="e_name">Name</label><input id="e_name" value="${esc(p.name)}">
   <div class="grid2"><div><label for="e_brand">Brand</label><input id="e_brand" value="${esc(p.brand||brandOf(p))}"></div><div><label for="e_size">Size / weight</label><input id="e_size" value="${esc(p.size)}"></div></div>
   <div class="grid2"><div><label for="e_dept">Department</label><select id="e_dept" onchange="e_sub.innerHTML=DEPTS[this.value][1].map(s=>'<option>'+s+'</option>').join('')">${DEPT_NAMES.map(d=>`<option ${d===p.dept?'selected':''}>${esc(d)}</option>`).join('')}</select></div>
    <div><label for="e_sub">Category</label><select id="e_sub">${DEPTS[p.dept][1].map(s=>`<option ${s===p.sub?'selected':''}>${esc(s)}</option>`).join('')}</select></div></div>
   <div class="grid2">${num('price','Price')}<div><label for="e_unit">Sold</label><select id="e_unit"><option value="ea" ${p.unit!=='lb'?'selected':''}>Each</option><option value="lb" ${p.unit==='lb'?'selected':''}>Per pound</option></select></div>
    ${num('sale','Sale price')}${num('pop','Popularity (0–100)')}${num('caseQty','Units per case')}${num('caseP','Case price')}${num('dealN','Multi-buy: quantity')}${num('dealT','Multi-buy: total price')}
    <div><label for="e_upc">UPC / POS code</label><input id="e_upc" value="${esc(p.upc||'')}"></div>${num('stock','Stock on hand')}</div>
   <label>Attributes</label><div class="row" style="gap:6px 14px">${ATTRS.map(a=>`<label class="check" style="margin:0"><input type="checkbox" class="e_attr" value="${a}" ${(p.attrs||[]).includes(a)?'checked':''}> ${a}</label>`).join('')}</div>
   <div class="row" style="margin-top:12px;align-items:flex-start"><span class="${tcls(p)}" style="--h:${hue(p.dept)};width:84px;height:84px;font-size:2.4rem;flex-shrink:0">${pimg(p)}</span><div style="flex:1">
    <label for="e_file" style="margin-top:0">Upload photo</label><input id="e_file" type="file" accept="image/*"><label for="e_url">Or photo link</label><input id="e_url" placeholder="https://…" value="${/^https?:/.test(p.img||'')?esc(p.img):''}"></div></div>
   <div class="row" style="gap:6px 16px;margin-top:12px">
    <label class="check" style="margin:0"><input type="checkbox" id="e_pub" ${p.published!==false?'checked':''}> Published</label>
    <label class="check" style="margin:0"><input type="checkbox" id="e_feat" ${p.featured?'checked':''}> Featured</label>
    <label class="check" style="margin:0"><input type="checkbox" id="e_oos" ${p.oos?'checked':''}> Out of stock</label>
    <label class="check" style="margin:0"><input type="checkbox" id="e_rev" ${p.review?'checked':''}> Ready for review</label>
    <label class="check" style="margin:0"><select id="e_tax" style="width:auto"><option value="" ${p.taxable==null?'selected':''}>Tax: department default</option><option value="1" ${p.taxable===true?'selected':''}>Taxable</option><option value="0" ${p.taxable===false?'selected':''}>Not taxable</option></select></label></div>
   ${isPic(p.img)?'<label class="check"><input type="checkbox" id="e_rm"> Remove photo</label>':''}
   <div class="row" style="margin-top:16px"><button class="btn" onclick="saveP('${id||''}')">${id?'Save changes':'Add product'}</button>${id?`<button class="btn danger" onclick="delP('${id}')">Delete</button>`:''}</div>`);
};
window.saveP=async function(id){
  const g=k=>$('e_'+k).value,n=k=>{const v=parseFloat(g(k));return isNaN(v)||v<=0?null:v};
  if(!g('name').trim()){toast('Name is required');return}
  const old=id?prod(id):null,f=$('e_file').files[0],url=g('url').trim(),rm=$('e_rm')?.checked,emoji=old?.emoji||DEPTS[g('dept')][0];
  let img=old?old.img:emoji;if(f)img=await shrink(f);else if(url)img=url;if(rm&&!f&&!url)img=emoji;
  const st=parseFloat(g('stock')),tx=g('tax');
  const d={name:g('name').trim(),brand:g('brand').trim()||null,dept:g('dept'),sub:g('sub'),price:n('price'),unit:g('unit'),size:g('size').trim(),img,emoji,sale:n('sale'),caseQty:n('caseQty'),caseP:n('caseP'),dealN:n('dealN'),dealT:n('dealT'),pop:n('pop')||50,
    upc:g('upc').trim()||null,stock:isNaN(st)?null:st,attrs:[...document.querySelectorAll('.e_attr:checked')].map(x=>x.value),published:$('e_pub').checked,featured:$('e_feat').checked,oos:$('e_oos').checked,review:$('e_rev').checked,taxable:tx===''?null:tx==='1'};
  if(!d.attrs.length)d.attrs=null;if(d.brand===brandOf({name:d.name}))d.brand=null;if(d.published)d.published=undefined;if(!d.oos)d.oos=undefined;if(!d.review)d.review=undefined;
  if(old)Object.assign(old,d);else P.push({id:'p'+Date.now(),...d});
  act((old?'Edited product ':'Added product ')+d.name,old?.id||'');saveAll();closeModal();route();toast(old?'Product saved':'Product added');
};
/* =====================================================================
   BACK OFFICE LAYOUT + FULFILL
   ===================================================================== */
const BO_MENU=[
 ['Fulfill',[['orders','Order Manager'],['shopper','Personal Shopper'],['cashier','Cashier'],['delivery','Delivery Manager'],['pickup','Pickup Manager'],['production','Production Manager'],['standalone','Standalone Mode']]],
 ['Control',[['order-items','Order Items'],['cashier-items','Cashier Items'],['stock','Stock Control'],['check','Check Products'],['issues','Data Issues'],['reports','Reports'],['bulk','Bulk Edit']]],
 ['Manage',[['settings','Settings'],['customers','Customers'],['accounts','Accounts']]],
 ['Admin',[['banners','Banners'],['categories','Categories'],['menus','Deli Menu'],['discounts','Discounts'],['circular','Edit Circular'],['featured','Featured Products'],['sync','Item Master Sync'],['import','Products Import'],['roles','User Roles'],['activity','View Activity'],['log','View Log']]]
];
const BO_VIEWS={};   // filled below and in the other parts
function vBO(parts,q){
  if(!me) return gate('Sign in with a staff account to open the back office.');
  if(!isStaffU()) return gate('This area is for store staff.');
  let sec=parts[0];
  if(!sec){sec=BO_MENU.flatMap(g=>g[1]).map(x=>x[0]).find(can)||'';if(!sec)return gate('Your account has no back-office access yet.');}
  if(!can(sec)) return `<div class="wrap"><div class="empty"><div class="e">🔒</div><h2>No access</h2><p class="muted">Your role (${ROLES[realRole()]||ROLES[roleOf()]}) can’t open this section.</p><a class="btn" href="#/admin">Back office home</a></div></div>`;
  const side=`<nav class="bo-side" aria-label="Back office"><a class="bo-brand" href="#/admin"><img class="brand-logo" src="${esc(brandLogo())}" alt=""><span>${esc(S.brand?.name||'Center Fresh Supermarket')}</span></a>${BO_MENU.map(([g,items])=>{const vis=items.filter(([k])=>can(k));return vis.length?`<h4>${g}</h4>`+vis.map(([k,l])=>`<a class="${k===sec||(k==='orders'&&sec==='order')||(k==='shopper'&&sec==='pick')||(k==='cashier'&&sec==='charge')||(k==='customers'&&sec==='customer')?'on':''}" href="#/admin/${k}">${l}</a>`).join(''):''}).join('')}</nav>`;
  const view=BO_VIEWS[sec];
  const body=view?view(q,parts.slice(1)):`<h1>${esc(sec)}</h1><p class="muted">Not found.</p>`;
  const top=`<header class="bo-top"><div class="row" style="gap:10px;flex-wrap:nowrap;min-width:0"><b class="bo-title">Back office</b><input type="search" class="bo-find" placeholder="Find order # or customer" onkeydown="if(event.key==='Enter'){const v=this.value.trim();const o=findO(v);o?go('/admin/order/'+o.id):go('/admin/orders?date=&s='+encodeURIComponent(v))}" aria-label="Find an order"></div><div class="row" style="gap:6px;flex-wrap:nowrap"><a class="btn sm ghost" href="#/">View store</a><span class="bo-user">${esc(uname(me))}<small>${ROLES[realRole()]||ROLES[roleOf()]}</small></span><button class="btn sm ghost" onclick="logout()">Sign out</button></div></header>`;
  return `<div class="bo">${side}<section class="bo-main">${top}<div class="bo-body">${body}</div></section></div>`;
}
const head=(title,sub='',right='')=>`<div class="bo-head"><div><h1 style="margin:0">${title}</h1>${sub?`<p class="muted" style="margin:.3em 0 0">${sub}</p>`:''}</div><div class="row">${right}</div></div>`;

/* ---------- shared filters ---------- */
function fq(q){return {date:q.has('date')?q.get('date'):todayStr(),area:q.get('area')||'',slot:q.get('slot')||'',prod:q.get('prod')||'',shopper:q.get('shopper')||'',status:q.get('status')||'',method:q.get('method')||'',s:q.get('s')||'',view:q.get('view')||'full'}}
function filt(f,skip=[]){const has=k=>!skip.includes(k)&&f[k];return ORDERS.filter(o=>(!has('date')||o.date===f.date)&&(!has('area')||(f.area==='__pickup'?o.method==='Pickup':o.town===f.area))&&(!has('slot')||o.slot===f.slot)&&(!has('prod')||(f.prod==='yes')===hasProd(o))&&(!has('shopper')||(f.shopper==='__none'?!o.shopper:o.shopper===f.shopper))&&(!has('status')||o.status===f.status)&&(!has('method')||o.method===f.method)&&(!has('s')||(o.id+' '+o.name+' '+o.phone+' '+o.email).toLowerCase().includes(f.s.toLowerCase())))}
function fbar(f,keys){
  const sel=(k,label,opts)=>`<div><label>${label}</label><select onchange="hashSet('${k}',this.value)">${opts.map(([v,l])=>`<option value="${esc(v)}" ${String(f[k])===String(v)?'selected':''}>${esc(l)}</option>`).join('')}</select></div>`;
  const slots=[...new Set(ORDERS.filter(o=>!f.date||o.date===f.date).map(o=>o.slot))].sort();
  const out=[];
  keys.forEach(k=>{
    if(k==='date')out.push(`<div><label>Day</label><input type="date" value="${f.date}" onchange="hashSet('date',this.value)"></div><div><label>&nbsp;</label><div class="row" style="gap:4px"><button class="btn sm ghost" onclick="hashSet('date','${todayStr()}')">Today</button><button class="btn sm ghost" onclick="hashSet('date','')">All days</button></div></div>`);
    if(k==='area')out.push(sel('area','Service area',[['','All areas'],...S.areas.map(a=>[a.name,a.name]),['__pickup','Pickup']]));
    if(k==='slot')out.push(sel('slot','Time slot',[['','All slots'],...slots.map(s=>[s,s])]));
    if(k==='prod')out.push(sel('prod','Production',[['','All orders'],['yes','Has production items'],['no','No production items']]));
    if(k==='shopper')out.push(sel('shopper','Shopper',[['','All shoppers'],['__none','Unassigned'],...staffList('shopper').map(u=>[u.email,uname(u.email)])]));
    if(k==='status')out.push(sel('status','Status',[['','All statuses'],...OST.map(s=>[s,s])]));
    if(k==='method')out.push(sel('method','Type',[['','Delivery & pickup'],['Delivery','Delivery'],['Pickup','Pickup']]));
    if(k==='s')out.push(`<div><label>Search</label><input type="search" value="${esc(f.s)}" placeholder="Order #, name, phone" onkeydown="if(event.key==='Enter')hashSet('s',this.value)"></div>`);
  });
  return `<div class="fbar">${out.join('')}</div>`;
}
const pickProgress=o=>{const n=o.items.length,d=o.items.filter(i=>i.pick?.status).length;return [d,n]};
const sortByRoute=items=>items.map((it,i)=>({it,i})).sort((a,b)=>{const pa=prod(a.it.pid),pb=prod(b.it.pid);return (S.pickRoute.indexOf(pa?.dept)+100)%100-(S.pickRoute.indexOf(pb?.dept)+100)%100||(pa?.sub||'').localeCompare(pb?.sub||'')});
function setOStatus(o,s,why=''){if(o.status===s)return;o.log.push({t:Date.now(),m:`Status: ${o.status} → ${s}${why?' ('+why+')':''}`,by:me});o.status=s;act(`Order #${o.id} → ${s}`,o.id)}

/* ---------- ORDER MANAGER ---------- */
BO_VIEWS.orders=q=>{
  const f=fq(q),list=filt(f).sort((a,b)=>a.date.localeCompare(b.date)||a.slot.localeCompare(b.slot)||a.id.localeCompare(b.id));
  const cnt=s=>filt(f,['status']).filter(o=>o.status===s).length;
  return head('Order Manager','Every order, every day.',`<button class="btn sm ghost" onclick='exportOM(${JSON.stringify(list.map(o=>o.id))})'>Export to Excel</button>`)+fbar(f,['date','method','area','status','shopper','s'])+
  `<div class="schips"><a class="${!f.status?'on':''}" href="javascript:hashSet('status','')">All <b>${filt(f,['status']).length}</b></a>${OST.map(s=>`<a class="${f.status===s?'on':''}" href="javascript:hashSet('status','${s}')">${s} <b>${cnt(s)}</b></a>`).join('')}</div>
  ${list.length?`<div class="bulkbar"><b id="omn">0 selected</b><select id="omact"><option value="">Change status…</option>${OST.map(s=>`<option>${s}</option>`).join('')}</select><select id="omshop"><option value="">Assign shopper…</option>${staffList('shopper').map(u=>`<option value="${esc(u.email)}">${esc(uname(u.email))}</option>`).join('')}</select><button class="btn sm" onclick="omBulk()">Apply</button></div>
  <div class="panel tbl-wrap"><table><thead><tr><th><input type="checkbox" onchange="document.querySelectorAll('.omc').forEach(c=>c.checked=this.checked);omCount()" aria-label="Select all"></th><th>#</th><th>Customer</th><th>When</th><th>Where</th><th>Items</th><th>Total</th><th>Status</th><th>Shopper</th><th></th></tr></thead><tbody>
  ${list.map(o=>{const [d,n]=pickProgress(o);return `<tr><td><input type="checkbox" class="omc" value="${o.id}" onchange="omCount()" aria-label="Select order ${o.id}"></td><td><a href="#/admin/order/${o.id}"><b>${o.id}</b></a></td><td>${esc(o.name)}<div class="mini"><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a></div></td>
   <td>${prettyDate(o.date)}<div class="mini muted">${o.slot}</div></td><td>${o.method==='Delivery'?esc(o.town)+'<div class="mini muted">'+esc(o.address)+'</div>':'Pickup'}${hasProd(o)?' <span class="tagx amber">Production</span>':''}</td>
   <td>${o.items.length}${d?`<div class="mini muted">${d}/${n} picked</div>`:''}</td><td>${money(o.final||o.total)}</td><td>${stBadge(o.status)}<div class="stage">${o.status==='Processed'?esc(o.stage):''}</div></td><td class="mini">${o.shopper?esc(uname(o.shopper)):'—'}</td>
   <td><div class="row" style="gap:4px;flex-wrap:nowrap"><a class="btn sm ghost" href="#/admin/order/${o.id}">Open</a>${['Received','Processing','On Hold'].includes(o.status)&&can('pick')?`<a class="btn sm" href="#/admin/pick/${o.id}">Pick</a>`:''}</div></td></tr>`}).join('')}</tbody></table></div>`
  :'<div class="empty"><div class="e">📦</div><h3>No orders match</h3><p class="muted">Try another day or clear the filters.</p></div>'}`;
};
function omCount(){$('omn').textContent=document.querySelectorAll('.omc:checked').length+' selected'}
function omBulk(){const ids=[...document.querySelectorAll('.omc:checked')].map(c=>c.value),s=$('omact').value,sh=$('omshop').value;if(!ids.length||(!s&&!sh)){toast('Select orders and an action');return}
  ids.forEach(id=>{const o=findO(id);if(s)setOStatus(o,s,'bulk');if(sh){o.shopper=sh;o.log.push({t:Date.now(),m:'Shopper: '+uname(sh),by:me})}});saveAll();route();toast(`${ids.length} orders updated`)}
function exportOM(ids){xlsx(ids.map(findO).flatMap(o=>o.items.map(it=>({Order:o.id,Status:o.status,Stage:o.stage,Customer:o.name,Phone:o.phone,Email:o.email,Type:o.method,Area:o.town,Address:o.address,Date:o.date,Slot:o.slot,Shopper:uname(o.shopper),Item:it.name,Qty:qtyLabel(it,prod(it.pid)),Note:it.note||'',Picked:it.pick?.status||'',Weight:it.pick?.weight??'',Estimated:+lineTotal(it).toFixed(2),Final:+lineFinal(it).toFixed(2),OrderTotal:+(o.final||o.total).toFixed(2)}))),'Orders',`CenterFresh_Orders_${todayStr()}.xlsx`)}

/* ---------- ORDER EDITOR ---------- */
BO_VIEWS.order=(q,rest)=>{
  const o=findO(rest[0]);if(!o)return head('Order not found');
  const t=totals(o,false),tf=['Processed','Charged'].includes(o.status)?totals(o,true):null,dates=[...new Set([o.date,...Array.from({length:14},(_,i)=>ymd(new Date(Date.now()+i*864e5)))])].filter(d=>allWindows(d).length||d===o.date);
  return `<div class="crumbs"><a href="#/admin/orders">Order Manager</a> / #${o.id}</div>`+head(`Order #${o.id}`,`${esc(o.name)} · placed ${fmtT(o.created)}`,`${stBadge(o.status)}`)+
  `<div class="two" style="margin-top:0"><div>
   <div class="panel"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Items</h3><span class="muted small">${o.status==='Charged'?'Charged orders are locked':'Changes save right away'}</span></div>
    ${sortByRoute(o.items).map(({it,i})=>{const p=prod(it.pid),pk=it.pick||{},lock=o.status==='Charged';return `<div class="line"><span class="${tcls(p)}" style="--h:${hue(p?.dept)}">${p?pimg(p):'🛒'}</span><div><div class="nm">${esc(it.name)} ${pk.status==='out'?'<span class="tagx red">Out</span>':pk.status==='sub'?`<span class="tagx blue">Sub: ${esc(pk.sub.name)}</span>`:pk.status==='picked'?'<span class="tagx">Picked</span>':''}${isProdItem(it)?` <span class="tagx amber">Production${it.prodDone?' ✓':''}</span>`:''}</div>
     <div class="mini muted">${esc(p?.size||'')}${it.mode==='case'?' · by the case':''}${pk.weight?` · weighed ${pk.weight} lb`:''}</div>${it.note?`<span class="note">“${esc(it.note)}”</span>`:''}
     ${lock?`<div class="mini">Qty ${qtyLabel(it,p)}</div>`:`<div class="row" style="margin-top:6px;gap:10px"><span class="step"><button onclick="aoQty('${o.id}',${i},-1)" aria-label="Less">−</button><span>${qtyLabel(it,p)}</span><button onclick="aoQty('${o.id}',${i},1)" aria-label="More">+</button></span><button class="linkbtn" onclick="aoNote('${o.id}',${i})">Note</button><button class="linkbtn red" onclick="aoDel('${o.id}',${i})">Remove</button></div>`}</div>
     <b>${money(tf?lineFinal(it):lineTotal(it))}</b></div>`}).join('')}
    ${o.status!=='Charged'?`<label for="aoq">Add an item</label><input id="aoq" type="search" placeholder="Search products" oninput="aoSearch('${o.id}',this.value)"><div id="aor"></div>`:''}</div>
   <div class="panel"><h3>History</h3><div class="mini">${o.log.slice().reverse().map(l=>`<div>${fmtT(l.t)} — ${esc(l.m)}${l.by?' · '+esc(uname(l.by)):''}</div>`).join('')}</div></div>
  </div><div>
   <div class="panel"><h3>Status</h3><div class="grid2"><div><label>Order status</label><select onchange="aoSet('${o.id}','status',this.value)">${OST.map(s=>`<option ${s===o.status?'selected':''}>${s}</option>`).join('')}</select></div>
    <div><label>${o.method} stage</label><select onchange="aoSet('${o.id}','stage',this.value)">${(o.method==='Delivery'?['Waiting','Ready','Out for delivery','Delivered']:['Waiting','Ready','Picked up']).map(s=>`<option ${s===o.stage?'selected':''}>${s}</option>`).join('')}</select></div>
    <div><label>Shopper</label><select onchange="aoSet('${o.id}','shopper',this.value)"><option value="">Unassigned</option>${staffList('shopper').map(u=>`<option value="${esc(u.email)}" ${u.email===o.shopper?'selected':''}>${esc(uname(u.email))}</option>`).join('')}</select></div>
    ${o.method==='Delivery'?`<div><label>Driver</label><select onchange="aoSet('${o.id}','driver',this.value)"><option value="">Unassigned</option>${staffList('driver').map(u=>`<option value="${esc(u.email)}" ${u.email===o.driver?'selected':''}>${esc(uname(u.email))}</option>`).join('')}</select></div>`:''}</div>
    <div class="row" style="margin-top:14px;gap:6px">${can('pick')&&!['Charged','Canceled'].includes(o.status)?`<a class="btn sm" href="#/admin/pick/${o.id}">Pick order</a>`:''}${can('charge')&&o.status==='Processed'?`<a class="btn sm lime" href="#/admin/charge/${o.id}">Charge</a>`:''}<button class="btn sm ghost" onclick="printReceipt('${o.id}')">Print</button><button class="btn sm ghost" onclick="printLabels('${o.id}')">Labels</button></div></div>
   <div class="panel"><h3>Customer &amp; ${o.method.toLowerCase()}</h3><div class="kv"><b>Name</b><span>${esc(o.name)}</span><b>Phone</b><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a><b>Email</b><span>${esc(o.email)}</span>${o.address?`<b>Address</b><span>${esc(o.address)}, ${esc(o.town)}</span>`:''}${o.instructions?`<b>Instructions</b><span>${esc(o.instructions)}</span>`:''}<b>Substitutions</b><span>${esc(o.subs)}</span><b>Payment</b><span>${esc(o.pay)}</span>${o.code?`<b>Code</b><span>${esc(o.code)}</span>`:''}${o.notes?`<b>Notes</b><span>${esc(o.notes)}</span>`:''}${o.hold?`<b>On hold</b><span>${esc(o.hold)}</span>`:''}</div>
    <div class="grid2" style="margin-top:8px"><div><label>Day</label><select id="aod" onchange="aoSlots('${o.id}')">${dates.map(d=>`<option value="${d}" ${d===o.date?'selected':''}>${prettyDate(d)}</option>`).join('')}</select></div><div><label>Time slot</label><select id="aos" onchange="aoTime('${o.id}')"></select></div></div></div>
   <div class="panel">${sumRows(t,'Estimated total')}${tf?`<hr style="border:0;border-top:1px solid var(--line)">${sumRows(tf,o.status==='Charged'?'Charged':'Final total')}`:''}</div>
  </div></div>`;
};
function aoSlots(id,init){const o=findO(id),d=$('aod')?.value||o.date,w=allWindows(d);if(!$('aos'))return;$('aos').innerHTML=w.map(s=>`<option ${s===o.slot&&d===o.date?'selected':''}>${s}</option>`).join('')+(w.includes(o.slot)||d!==o.date?'':`<option selected>${o.slot}</option>`);if(!init&&d!==o.date)aoTime(id)}
function aoTime(id){const o=findO(id),d=$('aod').value,s=$('aos').value;if(d===o.date&&s===o.slot)return;o.log.push({t:Date.now(),m:`Time: ${prettyDate(d)}, ${s}`,by:me});o.date=d;o.slot=s;act(`Order #${id} moved to ${d} ${s}`,id);saveAll();toast('Time updated')}
function aoSet(id,k,v){const o=findO(id);if(k==='status'){setOStatus(o,v);if(v==='Processed')finalize(o)}else{o[k]=v;o.log.push({t:Date.now(),m:`${k[0].toUpperCase()+k.slice(1)}: ${k==='stage'?v:uname(v)}`,by:me});act(`Order #${id} ${k} → ${k==='stage'?v:uname(v)}`,id)}saveAll();route()}
function aoQty(id,i,d){const o=findO(id),it=o.items[i],p=prod(it.pid);it.qty=+(it.qty+d*(p?stepOf(p,it.mode):1)).toFixed(2);if(it.qty<=0){aoDel(id,i);return}recalc(o);if(o.final)finalize(o);o.log.push({t:Date.now(),m:`Qty ${it.name} → ${it.qty}`,by:me});saveAll();route()}
function aoDel(id,i){const o=findO(id),it=o.items[i];if(!confirm(`Remove ${it.name}?`))return;o.items.splice(i,1);recalc(o);if(o.final)finalize(o);o.log.push({t:Date.now(),m:'Removed '+it.name,by:me});act(`Removed ${it.name} from #${id}`,id);saveAll();route()}
function aoNote(id,i){const o=findO(id),it=o.items[i],v=prompt('Note for the shopper',it.note||'');if(v===null)return;it.note=v.slice(0,S.noteMax);saveAll();route()}
function aoSearch(id,t){const r=matches(t).slice(0,8);$('aor').innerHTML=t.trim()?r.map(p=>`<div class="sg" style="grid-template-columns:40px 1fr auto auto"><span class="${tcls(p)}" style="--h:${hue(p.dept)};width:40px;height:40px;font-size:1.2rem">${pimg(p)}</span><span>${esc(p.name)}<div class="mini muted">${esc(p.size)}</div></span>${priceHTML(p)}${hasPrice(p)?`<button class="add-btn" onclick="aoAdd('${id}','${p.id}')">Add</button>`:'<span></span>'}</div>`).join('')||'<p class="muted small">No matches</p>':''}
function aoAdd(id,pid){const o=findO(id),p=prod(pid),ex=o.items.find(i=>i.pid===pid&&i.mode==='unit'&&!i.note);if(ex)ex.qty+=stepOf(p,'unit');else o.items.push({pid,qty:1,mode:'unit',note:'',name:p.name,price:unitPrice(p)});recalc(o);o.log.push({t:Date.now(),m:'Added '+p.name,by:me});act(`Added ${p.name} to #${id}`,id);saveAll();route();toast('Added '+p.name)}

/* ---------- PERSONAL SHOPPER ---------- */
BO_VIEWS.shopper=q=>{
  const f=fq(q),base=filt(f,['status']),list=filt(f).sort((a,b)=>a.slot.localeCompare(b.slot)||a.id.localeCompare(b.id));
  const v=f.view,tabs=[['full','Full'],['instructions','Instructions'],['report','Report'],['exceptions','Exceptions']];
  let body='';
  if(v==='full')body=list.length?list.map(o=>{const [d,n]=pickProgress(o);return `<div class="ocard"><div class="top"><div><b style="font-size:1.1rem">#${o.id}</b> · ${esc(o.name)} ${stBadge(o.status)} ${hasProd(o)?'<span class="tagx amber">Production</span>':''}</div><div class="row" style="gap:6px"><span class="mini muted">${o.slot} · ${o.method==='Delivery'?esc(o.town):'Pickup'} · ${o.shopper?esc(uname(o.shopper)):'Unassigned'}</span>${['Received','Processing','On Hold'].includes(o.status)?`<a class="btn sm" href="#/admin/pick/${o.id}">${o.status==='Received'?'Start picking':'Continue'}</a>`:`<a class="btn sm ghost" href="#/admin/pick/${o.id}">View</a>`}</div></div>
    <div class="prog"><i style="width:${n?d/n*100:0}%"></i></div><div class="mini muted">${d}/${n} items · ${o.items.map(it=>esc(it.name)+' × '+qtyLabel(it,prod(it.pid))).join(' · ')}</div></div>`}).join(''):'<div class="empty"><div class="e">🧺</div><h3>No orders to pick</h3></div>';
  if(v==='instructions')body=list.filter(o=>o.notes||o.instructions||o.items.some(i=>i.note)||o.subs).map(o=>`<div class="ocard"><div class="top"><b>#${o.id} · ${esc(o.name)}</b><span class="mini muted">${o.slot}</span></div><div class="kv" style="margin-top:8px"><b>Substitutions</b><span>${esc(o.subs)}</span>${o.notes?`<b>Order notes</b><span>${esc(o.notes)}</span>`:''}${o.instructions?`<b>Delivery</b><span>${esc(o.instructions)}</span>`:''}</div>${o.items.filter(i=>i.note).map(i=>`<div class="mini" style="margin-top:4px">• <b>${esc(i.name)}</b>: “${esc(i.note)}”</div>`).join('')}</div>`).join('')||'<p class="muted">No instructions for these orders.</p>';
  if(v==='report'){const slots=[...new Set(base.map(o=>o.slot))].sort(),shoppers=[...new Set(base.map(o=>o.shopper||''))];
    body=`<div class="panel tbl-wrap"><h3>By time slot</h3><table><thead><tr><th>Slot</th>${OST.map(s=>`<th>${s}</th>`).join('')}<th>Items</th></tr></thead><tbody>${slots.map(sl=>{const os=base.filter(o=>o.slot===sl);return `<tr><td>${sl}</td>${OST.map(s=>`<td>${os.filter(o=>o.status===s).length||''}</td>`).join('')}<td>${os.reduce((a,o)=>a+o.items.length,0)}</td></tr>`}).join('')}</tbody></table></div>
    <div class="panel tbl-wrap"><h3>By shopper</h3><table><thead><tr><th>Shopper</th><th>Orders</th><th>Done</th><th>Items picked</th><th>Out of stock</th><th>Substituted</th></tr></thead><tbody>${shoppers.map(sh=>{const os=base.filter(o=>(o.shopper||'')===sh),its=os.flatMap(o=>o.items);return `<tr><td>${sh?esc(uname(sh)):'Unassigned'}</td><td>${os.length}</td><td>${os.filter(o=>['Processed','Charged'].includes(o.status)).length}</td><td>${its.filter(i=>i.pick?.status==='picked').length}</td><td>${its.filter(i=>i.pick?.status==='out').length}</td><td>${its.filter(i=>i.pick?.status==='sub').length}</td></tr>`}).join('')}</tbody></table></div>`}
  if(v==='exceptions'){const rows=[];list.forEach(o=>{if(o.status==='On Hold')rows.push([o,null,'On hold',o.hold||'']);o.items.forEach(it=>{const pk=it.pick||{},p=prod(it.pid);if(pk.status==='out')rows.push([o,it,'Out of stock','']);if(pk.status==='sub')rows.push([o,it,'Substituted',`${pk.sub.name} × ${pk.sub.qty}`]);if(p?.unit==='lb'&&pk.weight&&it.mode!=='case'){const pct=Math.abs(pk.weight-it.qty)/it.qty*100;if(pct>S.scale.variancePct)rows.push([o,it,'Weight variance',`ordered ${it.qty} lb, weighed ${pk.weight} lb (${pct.toFixed(0)}%)`])}})});
    body=rows.length?`<div class="panel tbl-wrap"><table><thead><tr><th>Order</th><th>Item</th><th>Exception</th><th>Details</th><th>Customer wants</th></tr></thead><tbody>${rows.map(([o,it,k,d])=>`<tr><td><a href="#/admin/pick/${o.id}">#${o.id}</a><div class="mini">${esc(o.name)} · <a href="tel:${esc(o.phone)}">${esc(o.phone)}</a></div></td><td>${it?esc(it.name):'—'}</td><td><span class="tagx ${k==='Out of stock'?'red':k==='Substituted'?'blue':'amber'}">${k}</span></td><td class="mini">${esc(d)}</td><td class="mini">${esc(o.subs)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty"><div class="e">✅</div><h3>No exceptions</h3></div>'}
  return head('Personal Shopper','Pick orders, record weights, substitutions and boxes.',`<a class="btn sm ghost" href="#/admin/standalone">Standalone Mode</a>`)+fbar(f,['date','area','slot','prod','shopper'])+
   `<div class="schips"><a class="${!f.status?'on':''}" href="javascript:hashSet('status','')">All <b>${base.length}</b></a>${OST.map(s=>`<a class="${f.status===s?'on':''}" href="javascript:hashSet('status','${s}')">${s} <b>${base.filter(o=>o.status===s).length}</b></a>`).join('')}</div>
   <nav class="vtabs">${tabs.map(([k,l])=>`<a class="${k===v?'on':''}" href="javascript:hashSet('view','${k}')">${l}</a>`).join('')}</nav>${body}`;
};

/* ---------- PICKING SCREEN ---------- */
BO_VIEWS.pick=(q,rest)=>pickView(rest[0],false);
function pickView(id,standalone){
  const o=findO(id);if(!o)return head('Order not found');
  const [d,n]=pickProgress(o),lock=['Processed','Charged','Canceled'].includes(o.status),boxes=Object.entries(S.boxTypes).filter(([,on])=>on).map(([k])=>k);
  const back=standalone?'#/admin/standalone':'#/admin/shopper';
  return `<div class="crumbs"><a href="${back}">${standalone?'Standalone Mode':'Personal Shopper'}</a> / #${o.id}</div>`+
  head(`#${o.id} · ${esc(o.name)}`,`${o.method}${o.town?' · '+esc(o.town):''} · ${prettyDate(o.date)}, ${o.slot} · ${o.shopper?'Shopper: '+esc(uname(o.shopper)):'Unassigned'}`,stBadge(o.status))+
  `<div class="panel" style="background:var(--leaf);border-color:transparent"><div class="kv"><b>Substitutions</b><span><b>${esc(o.subs)}</b></span>${o.notes?`<b>Order notes</b><span>${esc(o.notes)}</span>`:''}<b>Phone</b><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a>${o.hold?`<b>On hold</b><span>${esc(o.hold)}</span>`:''}</div></div>
  <div class="prog"><i style="width:${n?d/n*100:0}%"></i></div><p class="mini muted">${d} of ${n} items done</p>
  <div class="row" style="gap:8px;margin-bottom:10px">${o.status==='Received'?`<button class="btn lime" onclick="pkStart('${id}')">Start picking</button>`:''}${!lock&&o.status!=='On Hold'?`<button class="btn ghost" onclick="pkHold('${id}')">Put on hold</button>`:''}${o.status==='On Hold'?`<button class="btn" onclick="pkResume('${id}')">Resume</button>`:''}${lock&&o.status!=='Canceled'?`<button class="btn ghost" onclick="pkReopen('${id}')">Reopen</button>`:''}<button class="btn ghost" onclick="printReceipt('${id}')">Print pick list</button></div>
  <div class="panel">${sortByRoute(o.items).map(({it,i})=>{const p=prod(it.pid),pk=it.pick||{},lb=p?.unit==='lb'&&it.mode!=='case';
    return `<div class="pk ${pk.status?'done':''} ${pk.status==='out'?'out':''}">${S.shopperMode.showPhotos?`<span class="${tcls(p)}" style="--h:${hue(p?.dept)}">${p?pimg(p):'🛒'}</span>`:'<span></span>'}
     <div><div class="nm" style="font-weight:700">${esc(it.name)}</div><div class="mini muted">${esc(p?.dept||'')} › ${esc(p?.sub||'')} · ${esc(p?.size||'')}${p?.upc?' · '+esc(p.upc):''}</div>
      <div><b style="font-size:1.1rem">${qtyLabel(it,p)}</b>${it.mode==='case'?' <span class="tagx">CASE</span>':''}${isProdItem(it)?` <span class="tagx amber">Production${it.prodDone?' ready':''}</span>`:''}</div>${it.note?`<span class="note">“${esc(it.note)}”</span>`:''}
      ${pk.status==='sub'?`<div class="mini"><span class="tagx blue">Substituted</span> ${esc(pk.sub.name)} × ${pk.sub.qty} @ ${money(pk.sub.price)}</div>`:''}${pk.status==='out'?'<div class="mini"><span class="tagx red">Out of stock</span></div>':''}</div>
     <div class="ctr">${lock?`<span class="mini">${pk.weight?pk.weight+' lb':pk.qty!=null?'Qty '+pk.qty:''}</span>`:`
      <label class="mini" style="margin:0">Qty <input type="number" step="${stepOf(p||{},it.mode)}" min="0" value="${pk.qty??it.qty}" onchange="pkVal('${id}',${i},'qty',this.value)"></label>
      ${lb?`<label class="mini" style="margin:0">Weight lb <input type="number" step="0.01" min="0" value="${pk.weight??''}" placeholder="0.00" onchange="pkVal('${id}',${i},'weight',this.value)"></label>`:''}
      <button class="btn sm ${pk.status==='picked'?'lime':''}" onclick="pkMark('${id}',${i},'picked')">✓ Picked</button><button class="btn sm ghost" onclick="pkMark('${id}',${i},'out')">Out</button><button class="btn sm ghost" onclick="pkSub('${id}',${i})">Substitute</button>${pk.status?`<button class="linkbtn" onclick="pkMark('${id}',${i},'')">Undo</button>`:''}`}</div></div>`}).join('')}</div>
  ${!lock?`<div class="panel"><h3>Boxes</h3><div class="row">${boxes.map(b=>`<label class="mini" style="margin:0">${esc(b)} <input type="number" min="0" value="${o.boxes?.[b]||0}" style="width:80px" onchange="pkBox('${id}','${b}',this.value)"></label>`).join('')}</div></div>
  <div class="row" style="justify-content:flex-end;margin-bottom:30px"><button class="btn lime" style="font-size:1.1rem;padding:.8em 1.6em" onclick="pkDone('${id}',${standalone})">Complete order</button></div>`:''}`;
}
function pkClaim(o){if(S.shopperMode.claimOnStart&&!o.shopper)o.shopper=me;if(o.status==='Received'){setOStatus(o,'Processing','picking started');o.pickStart=Date.now()}}
function pkStart(id){const o=findO(id);pkClaim(o);saveAll();route()}
function pkVal(id,i,k,v){const o=findO(id),it=o.items[i];pkClaim(o);it.pick=it.pick||{};it.pick[k]=v===''?null:+v;saveAll()}
function pkMark(id,i,st){const o=findO(id),it=o.items[i];pkClaim(o);it.pick=it.pick||{};if(!st){it.pick={};}else{it.pick.status=st;if(it.pick.qty==null)it.pick.qty=it.qty;if(st!=='sub')delete it.pick.sub;it.pick.by=me;it.pick.t=Date.now()}
  if(st==='out'&&S.stockCtl.oosOnPick){const p=prod(it.pid);if(p&&!p.oos){p.oos=true;act(`${p.name} marked out of stock while picking #${id}`,p.id)}}
  saveAll();route()}
function pkSub(id,i){const it=findO(id).items[i];modal(`<h2>Substitute</h2><p class="muted">For <b>${esc(it.name)}</b> × ${qtyLabel(it,prod(it.pid))}. Customer wants: <b>${esc(findO(id).subs)}</b></p><input type="search" id="sbq" placeholder="Search for a replacement" oninput="pkSubSearch('${id}',${i},this.value)" value="${esc((it.name||'').split(' ').slice(-1)[0])}"><div id="sbr" style="margin-top:8px"></div>`);pkSubSearch(id,i,$('sbq').value);$('sbq').focus()}
function pkSubSearch(id,i,t){$('sbr').innerHTML=matches(t).filter(p=>hasPrice(p)&&!oosP(p)).slice(0,10).map(p=>`<div class="sg" style="grid-template-columns:44px 1fr auto auto"><span class="${tcls(p)}" style="--h:${hue(p.dept)};width:44px;height:44px;font-size:1.2rem">${pimg(p)}</span><span>${esc(p.name)}<div class="mini muted">${esc(p.size)}</div></span>${priceHTML(p)}<button class="add-btn" onclick="pkSubPick('${id}',${i},'${p.id}')">Use</button></div>`).join('')||'<p class="muted small">No priced, in-stock matches.</p>'}
function pkSubPick(id,i,pid){const o=findO(id),it=o.items[i],p=prod(pid);pkClaim(o);it.pick={status:'sub',qty:it.qty,sub:{pid,name:p.name,price:unitPrice(p),qty:it.mode==='case'?(p.caseQty?1:it.qty*(prod(it.pid)?.caseQty||1)):it.qty},by:me,t:Date.now()};
  if(S.shopperMode.subsNeedApproval&&/call|text|review/i.test(o.subs))o.log.push({t:Date.now(),m:`Substitution needs customer OK: ${it.name} → ${p.name}`,by:me});
  act(`Substituted ${it.name} → ${p.name} on #${id}`,id);saveAll();closeModal();route()}
function pkBox(id,b,v){const o=findO(id);o.boxes=o.boxes||{};o.boxes[b]=Math.max(0,parseInt(v)||0);saveAll()}
function pkHold(id){const r=prompt('Why is this order on hold?');if(r===null)return;const o=findO(id);o.hold=r;setOStatus(o,'On Hold',r);saveAll();route()}
function pkResume(id){const o=findO(id);setOStatus(o,'Processing','resumed');o.hold='';saveAll();route()}
function pkReopen(id){const o=findO(id);if(o.status==='Charged'&&!confirm('This order was already charged. Reopen it anyway?'))return;setOStatus(o,'Processing','reopened');saveAll();route()}
function pkDone(id,standalone){
  const o=findO(id),miss=o.items.filter(it=>!it.pick?.status);
  if(miss.length){toast(`${miss.length} item${miss.length>1?'s':''} still need picking`);return}
  if(S.shopperMode.requireWeight){const nw=o.items.filter(it=>{const p=prod(it.pid);return it.pick.status==='picked'&&p?.unit==='lb'&&it.mode!=='case'&&!(it.pick.weight>0)});if(nw.length){toast(`Enter the weight for ${nw[0].name}`);return}}
  if(!Object.values(o.boxes||{}).some(n=>n>0)){toast('Enter how many boxes');return}
  const pend=o.items.filter(it=>isProdItem(it)&&!it.prodDone);if(pend.length&&!confirm(`${pend.length} production item(s) aren’t marked ready. Complete anyway?`))return;
  o.pickEnd=Date.now();o.stage=o.method==='Pickup'?'Ready':'Waiting';setOStatus(o,'Processed','picking complete');finalize(o);
  if(S.stockCtl.track)o.items.forEach(it=>{const p=prod(it.pick.status==='sub'?it.pick.sub.pid:it.pid);if(p&&p.stock!=null&&it.pick.status!=='out'){p.stock=Math.max(0,p.stock-(it.pick.status==='sub'?it.pick.sub.qty:(+it.pick.qty||it.qty)*(it.mode==='case'?(p.caseQty||1):1)))}});
  saveAll();toast(`Order #${id} processed — ${money(o.final)}`);if(S.shopperMode.printLabelsOnDone)printLabels(id);go(standalone?'/admin/standalone':'/admin/shopper');
}

/* ---------- STANDALONE MODE ---------- */
BO_VIEWS.standalone=(q,rest)=>{
  if(rest[0])return `<div class="row" style="justify-content:flex-end"><a class="btn sm ghost" href="#/admin/shopper">Exit Standalone Mode</a></div>`+pickView(rest[0],true);
  const d=q.get('date')||todayStr(),mine=ORDERS.filter(o=>o.date===d&&['Received','Processing','On Hold'].includes(o.status)&&(!o.shopper||o.shopper===me)).sort((a,b)=>a.slot.localeCompare(b.slot));
  return `<div class="row" style="justify-content:space-between;margin-bottom:12px"><div><h1 style="margin:0">Standalone Mode</h1><p class="muted" style="margin:.2em 0 0">${esc(uname(me))} · ${prettyDate(d)} · tap an order to pick it</p></div><div class="row"><input type="date" value="${d}" onchange="go('/admin/standalone?date='+this.value)" style="width:auto"><a class="btn ghost" href="#/admin/shopper">Exit</a></div></div>
  ${mine.length?`<div class="tiles">${mine.map(o=>{const [dd,n]=pickProgress(o);return `<button class="tile" onclick="go('/admin/standalone/${o.id}')"><b>#${o.id}</b>${esc(o.name)}<div class="mini muted">${o.slot} · ${o.method==='Delivery'?esc(o.town):'Pickup'}</div><div class="prog"><i style="width:${n?dd/n*100:0}%"></i></div>${stBadge(o.status)} <span class="mini">${dd}/${n}</span></button>`}).join('')}</div>`:'<div class="empty"><div class="e">🎉</div><h2>Nothing left to pick</h2></div>'}`;
};

/* ---------- CASHIER ---------- */
BO_VIEWS.cashier=q=>{
  const f=fq(q),list=filt(f,['status']).filter(o=>f.status?o.status===f.status:o.status==='Processed').sort((a,b)=>a.slot.localeCompare(b.slot));
  return head('Cashier','Review final weights and charge processed orders.')+fbar(f,['date','method','area','s'])+
  `<div class="schips">${['Processed','Charged'].map(s=>`<a class="${(f.status||'Processed')===s?'on':''}" href="javascript:hashSet('status','${s}')">${s==='Processed'?'Ready to charge':'Charged'} <b>${filt(f,['status']).filter(o=>o.status===s).length}</b></a>`).join('')}</div>
  ${list.length?`<div class="panel tbl-wrap"><table><thead><tr><th>#</th><th>Customer</th><th>When</th><th>Estimated</th><th>Final</th><th>Payment</th><th></th></tr></thead><tbody>${list.map(o=>{const t=totals(o,true);return `<tr><td><b>${o.id}</b></td><td>${esc(o.name)}</td><td>${o.slot}<div class="mini muted">${o.method}</div></td><td>${money(o.total)}</td><td><b>${money(o.status==='Charged'?o.final:t.total)}</b></td><td class="mini">${esc(o.charge?.method||o.pay)}</td><td><a class="btn sm ${o.status==='Processed'?'lime':'ghost'}" href="#/admin/charge/${o.id}">${o.status==='Processed'?'Charge':'View'}</a></td></tr>`}).join('')}</tbody></table></div>`:'<div class="empty"><div class="e">💳</div><h3>Nothing to charge</h3><p class="muted">Orders appear here after the shopper completes them.</p></div>'}`;
};
BO_VIEWS.charge=(q,rest)=>{
  const o=findO(rest[0]);if(!o)return head('Order not found');
  const t=totals(o,true),done=o.status==='Charged',acct=ACCTS.find(a=>a.customers.includes(o.email));
  return `<div class="crumbs"><a href="#/admin/cashier">Cashier</a> / #${o.id}</div>`+head(`Charge #${o.id}`,`${esc(o.name)} · ${esc(o.pay)}`,stBadge(o.status))+
  `<div class="two" style="margin-top:0"><div class="panel tbl-wrap"><table><thead><tr><th>Item</th><th>Ordered</th><th>Final</th><th>Amount</th></tr></thead><tbody>${o.items.map(it=>{const pk=it.pick||{},p=prod(it.pid);return `<tr><td>${pk.status==='sub'?`${esc(pk.sub.name)}<div class="mini muted">for ${esc(it.name)}</div>`:esc(it.name)}${taxableP(pk.status==='sub'?prod(pk.sub.pid):p)?' <span class="tagx">TAX</span>':''}</td><td class="mini">${qtyLabel(it,p)} · ${money(lineTotal(it))}</td><td class="mini">${pk.status==='out'?'<span class="tagx red">Out</span>':pk.weight?pk.weight+' lb':pk.status==='sub'?pk.sub.qty:(pk.qty??it.qty)}</td><td><b>${money(lineFinal(it))}</b></td></tr>`}).join('')}</tbody></table></div>
  <div class="panel"><div id="chsum">${sumRows(t,done?'Charged':'Total to charge')}</div>
   ${done?`<div class="kv" style="margin-top:12px"><b>Method</b><span>${esc(o.charge.method)}</span><b>Reference</b><span>${esc(o.charge.ref||'—')}</span><b>By</b><span>${esc(uname(o.charge.by))}</span><b>When</b><span>${fmtT(o.charge.t)}</span></div><div class="row" style="margin-top:14px"><button class="btn ghost" onclick="printReceipt('${o.id}')">Print receipt</button>${can('settings')||roleOf()==='manager'?`<button class="btn ghost" onclick="chVoid('${o.id}')">Void charge</button>`:''}</div>`
   :`<label for="chtip">Tip</label><input id="chtip" type="number" step="0.01" min="0" value="${o.tip||''}" oninput="chTip('${o.id}',this.value)">
   <label for="chm">Payment method</label><select id="chm"><option>Card on file</option><option>Card present</option><option>Cash</option><option>Check</option>${acct?`<option>House account — ${esc(acct.name)}</option>`:''}</select>
   <label for="chr">Reference / approval code / last 4</label><input id="chr" placeholder="Optional">
   <div class="row" style="margin-top:14px"><button class="btn lime" onclick="chCharge('${o.id}')">Charge ${money(t.total)}</button><button class="btn ghost" onclick="printReceipt('${o.id}')">Print</button><a class="btn ghost" href="#/admin/pick/${o.id}">Back to picking</a></div>`}</div></div>`;
};
function chTip(id,v){const o=findO(id);o.tip=Math.max(0,parseFloat(v)||0);const t=totals(o,true);$('chsum').innerHTML=sumRows(t,'Total to charge');document.querySelector('[onclick^="chCharge"]').textContent='Charge '+money(t.total)}
function chCharge(id){const o=findO(id);o.tip=Math.max(0,parseFloat($('chtip').value)||0);finalize(o);const m=$('chm').value;
  o.charge={method:m,ref:$('chr').value.trim(),by:me,t:Date.now(),amount:o.final};
  if(m.startsWith('House account')){const a=ACCTS.find(x=>x.customers.includes(o.email));if(a){a.balance=+(a.balance+o.final).toFixed(2);a.tx=a.tx||[];a.tx.unshift({t:Date.now(),type:'charge',amount:o.final,ref:'#'+o.id,by:me});saveAccts()}}
  setOStatus(o,'Charged',money(o.final)+' · '+m);saveAll();if(o.receipt?.startsWith('Paper'))printReceipt(id);toast(`Charged ${money(o.final)}`);go('/admin/cashier')}
function chVoid(id){if(!confirm('Void this charge and send the order back to Processed?'))return;const o=findO(id);
  if(o.charge?.method?.startsWith('House account')){const a=ACCTS.find(x=>x.customers.includes(o.email));if(a){a.balance=+(a.balance-o.charge.amount).toFixed(2);a.tx.unshift({t:Date.now(),type:'void',amount:-o.charge.amount,ref:'#'+o.id,by:me});saveAccts()}}
  o.log.push({t:Date.now(),m:'Charge voided',by:me});o.charge=null;setOStatus(o,'Processed','charge voided');saveAll();route()}

/* ---------- DELIVERY MANAGER ---------- */
BO_VIEWS.delivery=q=>{
  const f=fq(q),list=filt({...f,method:'Delivery'}).filter(o=>o.status!=='Canceled'&&(roleOf()!=='driver'||o.driver===me||!o.driver)).sort((a,b)=>a.slot.localeCompare(b.slot)||(a.town||'').localeCompare(b.town||'')||(a.address||'').localeCompare(b.address||''));
  const drivers=staffList('driver'),stg=['Waiting','Ready','Out for delivery','Delivered'];
  return head('Delivery Manager','Assign drivers and track deliveries.',`<button class="btn sm ghost" onclick='routeSheet(${JSON.stringify(list.map(o=>o.id))})'>Print route sheet</button>`)+fbar(f,['date','area','slot','s'])+
  `<div class="stats">${stg.map(s=>`<div><b>${list.filter(o=>o.stage===s&&o.status!=='Received').length}</b>${s}</div>`).join('')}<div><b>${list.filter(o=>['Received','Processing','On Hold'].includes(o.status)).length}</b>Still picking</div></div>
  ${list.length?`<div class="panel tbl-wrap"><table><thead><tr><th>#</th><th>Customer</th><th>Address</th><th>Slot</th><th>Boxes</th><th>Order</th><th>Driver</th><th>Delivery</th></tr></thead><tbody>${list.map(o=>{const bx=Object.entries(o.boxes||{}).filter(([,n])=>n).map(([k,n])=>n+' '+k).join(', ')||'—';return `<tr><td><a href="#/admin/order/${o.id}"><b>${o.id}</b></a></td><td>${esc(o.name)}<div class="mini"><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a></div></td><td>${esc(o.address)}<div class="mini muted">${esc(o.town)}${o.instructions?' · '+esc(o.instructions):''}</div></td><td class="mini">${o.slot}</td><td class="mini">${bx}</td><td>${stBadge(o.status)}</td>
   <td><select style="width:auto" onchange="aoSetQuiet('${o.id}','driver',this.value)" aria-label="Driver"><option value="">—</option>${drivers.map(u=>`<option value="${esc(u.email)}" ${u.email===o.driver?'selected':''}>${esc(uname(u.email))}</option>`).join('')}</select></td>
   <td>${['Processed','Charged'].includes(o.status)?`<div class="row" style="gap:4px;flex-wrap:nowrap">${o.stage!=='Out for delivery'&&o.stage!=='Delivered'?`<button class="btn sm" onclick="dlStage('${o.id}','Out for delivery')">Out</button>`:''}${o.stage!=='Delivered'?`<button class="btn sm lime" onclick="dlStage('${o.id}','Delivered')">Delivered</button>`:`<span class="tagx">Delivered ${o.deliveredAt?new Date(o.deliveredAt).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}):''}</span>`}</div>`:'<span class="mini muted">Not packed yet</span>'}</td></tr>`}).join('')}</tbody></table></div>`:'<div class="empty"><div class="e">🚚</div><h3>No deliveries</h3></div>'}`;
};
function aoSetQuiet(id,k,v){const o=findO(id);o[k]=v;o.log.push({t:Date.now(),m:`${k}: ${uname(v)}`,by:me});act(`Order #${id} ${k} → ${uname(v)}`,id);saveAll();toast('Saved')}
function dlStage(id,s){const o=findO(id);o.stage=s;if(s==='Delivered')o.deliveredAt=Date.now();if(s==='Out for delivery'){o.outAt=Date.now();if(!o.driver&&roleOf()==='driver')o.driver=me}o.log.push({t:Date.now(),m:'Delivery: '+s,by:me});act(`Order #${id}: ${s}`,id);saveAll();route()}
function routeSheet(ids){const os=ids.map(findO).filter(o=>['Processed','Charged'].includes(o.status));
  printHTML(`<h2>Route sheet — ${prettyDate(os[0]?.date||todayStr())}</h2><table><thead><tr><th>#</th><th>Customer</th><th>Address</th><th>Slot</th><th>Boxes</th><th>Driver</th><th>Signature</th></tr></thead><tbody>${os.map(o=>`<tr><td>${o.id}</td><td>${esc(o.name)}<br>${esc(o.phone)}</td><td>${esc(o.address)}, ${esc(o.town)}${o.instructions?'<br><i>'+esc(o.instructions)+'</i>':''}</td><td>${o.slot}</td><td>${Object.entries(o.boxes||{}).filter(([,n])=>n).map(([k,n])=>n+' '+k).join(', ')}</td><td>${esc(uname(o.driver))}</td><td style="width:120px"></td></tr>`).join('')}</tbody></table>`)}

/* ---------- PICKUP MANAGER ---------- */
BO_VIEWS.pickup=q=>{
  const f=fq(q),list=filt({...f,method:'Pickup'}).filter(o=>o.status!=='Canceled').sort((a,b)=>a.slot.localeCompare(b.slot));
  return head('Pickup Manager','Orders waiting at the store.')+fbar(f,['date','slot','s'])+
  `<div class="stats"><div><b>${list.filter(o=>!['Processed','Charged'].includes(o.status)).length}</b>Being picked</div><div><b>${list.filter(o=>['Processed','Charged'].includes(o.status)&&o.stage!=='Picked up').length}</b>Ready for pickup</div><div><b>${list.filter(o=>o.stage==='Picked up').length}</b>Picked up</div></div>
  ${list.length?`<div class="panel tbl-wrap"><table><thead><tr><th>#</th><th>Customer</th><th>Slot</th><th>Boxes</th><th>Order</th><th>Paid</th><th>Pickup</th></tr></thead><tbody>${list.map(o=>`<tr><td><a href="#/admin/order/${o.id}"><b>${o.id}</b></a></td><td>${esc(o.name)}<div class="mini"><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a></div></td><td class="mini">${o.slot}</td><td class="mini">${Object.entries(o.boxes||{}).filter(([,n])=>n).map(([k,n])=>n+' '+k).join(', ')||'—'}</td><td>${stBadge(o.status)}</td><td>${o.status==='Charged'?'✅':can('charge')&&o.status==='Processed'?`<a class="btn sm ghost" href="#/admin/charge/${o.id}">Charge</a>`:'—'}</td>
   <td>${['Processed','Charged'].includes(o.status)?(o.stage==='Picked up'?`<span class="tagx">Picked up ${o.pickedAt?new Date(o.pickedAt).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}):''}</span>`:`<button class="btn sm lime" onclick="puDone('${o.id}')">Picked up</button>`):'<span class="mini muted">Not ready</span>'}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty"><div class="e">🛍️</div><h3>No pickups</h3></div>'}`;
};
function puDone(id){const o=findO(id);o.stage='Picked up';o.pickedAt=Date.now();o.log.push({t:Date.now(),m:'Picked up by customer',by:me});act(`Order #${id} picked up`,id);saveAll();route()}

/* ---------- PRODUCTION MANAGER ---------- */
BO_VIEWS.production=q=>{
  const f=fq(q),os=filt(f).filter(o=>!['Canceled','Charged'].includes(o.status)||o.status==='Charged'&&o.date===f.date);
  const groups={};os.forEach(o=>o.items.forEach((it,i)=>{if(!isProdItem(it))return;const p=prod(it.pid);const k=it.pid;groups[k]=groups[k]||{p,lines:[]};groups[k].lines.push({o,it,i})}));
  const arr=Object.values(groups).sort((a,b)=>a.p.dept.localeCompare(b.p.dept)||a.p.name.localeCompare(b.p.name));
  const total=arr.reduce((a,g)=>a+g.lines.length,0),done=arr.reduce((a,g)=>a+g.lines.filter(l=>l.it.prodDone).length,0);
  return head('Production Manager',`Prepared foods for ${esc(prodDepts().join(', '))}.`,`<button class="btn sm ghost" onclick="printProd()">Print production list</button>`)+fbar(f,['date','slot','area'])+
  `<div class="stats"><div><b>${arr.length}</b>Products</div><div><b>${total}</b>Order lines</div><div><b>${done}</b>Ready</div><div><b>${total-done}</b>To make</div></div>
  ${arr.length?arr.map(g=>{const qty=g.lines.reduce((a,l)=>a+(l.it.mode==='case'?0:l.it.qty),0),cases=g.lines.reduce((a,l)=>a+(l.it.mode==='case'?l.it.qty:0),0);return `<div class="ocard"><div class="top"><div class="row" style="gap:10px;flex-wrap:nowrap"><span class="${tcls(g.p)}" style="--h:${hue(g.p.dept)};width:48px;height:48px;font-size:1.4rem">${pimg(g.p)}</span><div><b>${esc(g.p.name)}</b><div class="mini muted">${esc(g.p.dept)} · ${esc(g.p.size)}</div></div></div><div class="row"><b style="font-size:1.3rem">${qty?qty+(g.p.unit==='lb'?' lb':''):''}${cases?` ${cases} case${cases>1?'s':''}`:''}</b><button class="btn sm ghost" onclick='prAll(${JSON.stringify(g.lines.map(l=>[l.o.id,l.i]))})'>All ready</button></div></div>
   <table style="margin-top:8px"><tbody>${g.lines.map(l=>`<tr><td><a href="#/admin/order/${l.o.id}">#${l.o.id}</a> ${esc(l.o.name)}</td><td class="mini">${l.o.slot}</td><td>${qtyLabel(l.it,g.p)}</td><td class="mini">${l.it.note?'“'+esc(l.it.note)+'”':''}</td><td><label class="check" style="margin:0"><input type="checkbox" ${l.it.prodDone?'checked':''} onchange="prDone('${l.o.id}',${l.i},this.checked)"> Ready</label></td></tr>`).join('')}</tbody></table></div>`}).join(''):'<div class="empty"><div class="e">🍲</div><h3>No production items</h3><p class="muted">Items from production departments show here. Set the departments in Settings → Production Settings.</p></div>'}`;
};
function prDone(id,i,v){const o=findO(id);o.items[i].prodDone=v;o.log.push({t:Date.now(),m:`Production ${v?'ready':'not ready'}: ${o.items[i].name}`,by:me});saveAll()}
function prAll(lines){lines.forEach(([id,i])=>{findO(id).items[i].prodDone=true});act('Production batch marked ready');saveAll();route()}
function printProd(){printHTML($('app').querySelector('.bo-main').innerHTML.replace(/<button[^>]*>.*?<\/button>/g,'').replace(/<div class="fbar">[\s\S]*?<\/div><div class="stats">/,'<div class="stats">'))}
/* =====================================================================
   CONTROL: products and stock
   ===================================================================== */
function prodTable(list,cols,opts={}){
  const pg=opts.page||1,N=opts.per||50,pages=Math.max(1,Math.ceil(list.length/N)),items=list.slice((pg-1)*N,pg*N);
  return `<p class="mini muted">${list.length.toLocaleString()} products</p><div class="panel tbl-wrap"><table><thead><tr><th></th><th>Product</th>${cols.map(c=>`<th>${c[0]}</th>`).join('')}<th></th></tr></thead><tbody>
  ${items.map(p=>`<tr><td><span class="${tcls(p)}" style="--h:${hue(p.dept)};width:44px;height:44px;font-size:1.3rem">${pimg(p)}</span></td><td><b>${esc(p.name)}</b><div class="mini muted">${esc(p.size)}${brandOf(p)?' · '+esc(brandOf(p)):''} · ${esc(p.dept)} › ${esc(p.sub)}</div></td>${cols.map(c=>`<td>${c[1](p)}</td>`).join('')}<td><button class="btn sm ghost" onclick="editP('${p.id}')">Edit</button></td></tr>`).join('')}</tbody></table></div>
  ${pages>1?`<nav class="pager">${pg>1?`<a href="javascript:hashSet('page',${pg-1})">‹</a>`:''}${pageNums(pg,pages).map(n=>n==='…'?'<b class="muted">…</b>':n===pg?`<span>${n}</span>`:`<a href="javascript:hashSet('page',${n})">${n}</a>`).join('')}${pg<pages?`<a href="javascript:hashSet('page',${pg+1})">›</a>`:''}</nav>`:''}`;
}
function pfilter(q){const t=(q.get('q')||'').toLowerCase(),d=q.get('dept')||'',sb=q.get('sub')||'';return P.filter(p=>(!t||(p.name+' '+p.size+' '+(p.upc||'')+' '+brandOf(p)).toLowerCase().includes(t))&&(!d||p.dept===d)&&(!sb||p.sub===sb))}
function pbar(q,extra=''){const d=q.get('dept')||'';return `<div class="fbar"><div><label>Search</label><input type="search" value="${esc(q.get('q')||'')}" placeholder="Name, brand, UPC" onkeydown="if(event.key==='Enter')hashSet('q',this.value)"></div>
  <div><label>Department</label><select onchange="hashSet('sub','');hashSet('dept',this.value)"><option value="">All departments</option>${DEPT_NAMES.map(x=>`<option ${x===d?'selected':''}>${esc(x)}</option>`).join('')}</select></div>
  ${d?`<div><label>Category</label><select onchange="hashSet('sub',this.value)"><option value="">All</option>${DEPTS[d][1].map(s=>`<option ${s===q.get('sub')?'selected':''}>${esc(s)}</option>`).join('')}</select></div>`:''}${extra}</div>`}

/* ---------- ORDER ITEMS / CASHIER ITEMS ---------- */
function aggItems(os,final){const m={};os.forEach(o=>o.items.forEach(it=>{const pk=it.pick||{};let pid=it.pid,name=it.name,qty=it.qty,mode=it.mode;
  if(final){if(pk.status==='out')return;if(pk.status==='sub'){pid=pk.sub.pid;name=pk.sub.name;qty=pk.sub.qty;mode='unit'}else if(pk.weight){qty=+pk.weight}else if(pk.qty!=null)qty=+pk.qty}
  const k=pid+'|'+mode;m[k]=m[k]||{pid,name,mode,qty:0,orders:new Set(),notes:0,amount:0};m[k].qty+=qty;m[k].orders.add(o.id);if(it.note)m[k].notes++;m[k].amount+=final?lineFinal(it):lineTotal(it)}));
  return Object.values(m).map(r=>({...r,orders:r.orders.size,p:prod(r.pid)})).sort((a,b)=>(S.pickRoute.indexOf(a.p?.dept)+100)%100-(S.pickRoute.indexOf(b.p?.dept)+100)%100||(a.p?.sub||'').localeCompare(b.p?.sub||'')||a.name.localeCompare(b.name))}
BO_VIEWS['order-items']=q=>{
  const f=fq(q),st=q.get('st')||'open',os=filt(f).filter(o=>st==='open'?['Received','Processing','On Hold'].includes(o.status):o.status!=='Canceled'),rows=aggItems(os,false);window._oi=rows.map(r=>({Department:r.p?.dept,Category:r.p?.sub,Product:r.name,Size:r.p?.size,UPC:r.p?.upc||'',Quantity:+r.qty.toFixed(2),Unit:r.mode==='case'?'case':r.p?.unit,Orders:r.orders,Notes:r.notes}));
  return head('Order Items','Everything to pull for the selected orders, in pick-route order.',`<button class="btn sm ghost" onclick="xlsx(window._oi,'Order Items','CenterFresh_Order_Items.xlsx')">Export</button><button class="btn sm ghost" onclick="printProd()">Print</button>`)+
  fbar(f,['date','slot','area','prod'])+`<div class="schips"><a class="${st==='open'?'on':''}" href="javascript:hashSet('st','open')">Not yet picked</a><a class="${st==='all'?'on':''}" href="javascript:hashSet('st','all')">All orders</a></div>
  <p class="mini muted">${os.length} orders · ${rows.length} products</p>${rows.length?`<div class="panel tbl-wrap"><table><thead><tr><th></th><th>Product</th><th>Aisle</th><th>Qty</th><th>Orders</th><th>Notes</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.p?`<span class="${tcls(r.p)}" style="--h:${hue(r.p.dept)};width:40px;height:40px;font-size:1.2rem">${pimg(r.p)}</span>`:''}</td><td><b>${esc(r.name)}</b><div class="mini muted">${esc(r.p?.size||'')}</div></td><td class="mini">${esc(r.p?.dept||'')} › ${esc(r.p?.sub||'')}</td><td><b>${+r.qty.toFixed(2)}</b> ${r.mode==='case'?'case':r.p?.unit==='lb'?'lb':''}</td><td>${r.orders}</td><td>${r.notes||''}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty"><div class="e">📋</div><h3>Nothing to pull</h3></div>'}`;
};
BO_VIEWS['cashier-items']=q=>{
  const f=fq(q),os=filt(f).filter(o=>['Processed','Charged'].includes(o.status)),rows=aggItems(os,true),tot=rows.reduce((a,r)=>a+r.amount,0);window._ci=rows.map(r=>({Department:r.p?.dept,Product:r.name,UPC:r.p?.upc||'',Quantity:+r.qty.toFixed(2),Unit:r.mode==='case'?'case':r.p?.unit,Orders:r.orders,Amount:+r.amount.toFixed(2)}));
  return head('Cashier Items','What was actually sold: final weights, substitutions included, out-of-stock removed.',`<button class="btn sm ghost" onclick="xlsx(window._ci,'Cashier Items','CenterFresh_Cashier_Items.xlsx')">Export</button>`)+
  fbar(f,['date','method','area'])+`<div class="stats"><div><b>${os.length}</b>Orders</div><div><b>${rows.length}</b>Products</div><div><b>${money(tot)}</b>Item sales</div></div>
  ${rows.length?`<div class="panel tbl-wrap"><table><thead><tr><th>Product</th><th>Department</th><th>UPC</th><th>Qty</th><th>Orders</th><th>Amount</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${esc(r.name)}</b></td><td class="mini">${esc(r.p?.dept||'')}</td><td class="mini">${esc(r.p?.upc||'')}</td><td>${+r.qty.toFixed(2)} ${r.mode==='case'?'case':r.p?.unit==='lb'?'lb':''}</td><td>${r.orders}</td><td>${money(r.amount)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty"><div class="e">🧾</div><h3>No processed orders</h3></div>'}`;
};

/* ---------- STOCK CONTROL ---------- */
BO_VIEWS.stock=q=>{
  const show=q.get('show')||'',low=S.stockCtl.low;let list=pfilter(q);
  if(show==='oos')list=list.filter(oosP);if(show==='low')list=list.filter(p=>p.stock!=null&&p.stock<=low&&p.stock>0);if(show==='tracked')list=list.filter(p=>p.stock!=null);
  return head('Stock Control',S.stockCtl.track?`Stock tracking is on. Items at 0 ${S.stockCtl.hideOOS?'are hidden from':'show as out of stock on'} the website.`:'Stock counts are off — only items marked “Out of stock” are blocked. Turn tracking on in Settings → Stock Control Settings.',`<a class="btn sm ghost" href="#/admin/settings?s=stock">Settings</a>`)+
  pbar(q)+`<div class="schips">${[['','All'],['oos','Out of stock'],['low','Low stock'],['tracked','Counted']].map(([k,l])=>`<a class="${k===show?'on':''}" href="javascript:hashSet('show','${k}')">${l} <b>${k==='oos'?P.filter(oosP).length:k==='low'?P.filter(p=>p.stock!=null&&p.stock<=low&&p.stock>0).length:k==='tracked'?P.filter(p=>p.stock!=null).length:P.length}</b></a>`).join('')}</div>`+
  prodTable(list,[['In stock',p=>`<label class="check" style="margin:0"><input type="checkbox" ${p.oos?'':'checked'} onchange="stOos('${p.id}',!this.checked)"> ${p.oos?'<span class="tagx red">Out</span>':'Yes'}</label>`],['On hand',p=>`<input type="number" min="0" value="${p.stock??''}" placeholder="—" style="width:84px" onchange="stQty('${p.id}',this.value)" aria-label="Stock for ${esc(p.name)}">${p.stock!=null&&p.stock<=low?' <span class="tagx amber">Low</span>':''}`]],{page:+q.get('page')||1});
};
function stOos(id,v){const p=prod(id);p.oos=v||undefined;act(`${p.name} ${v?'out of stock':'back in stock'}`,id);saveAll();toast(v?'Marked out of stock':'Back in stock')}
function stQty(id,v){const p=prod(id),x=parseFloat(v);p.stock=isNaN(x)?null:Math.max(0,x);if(p.stock>0&&p.oos)p.oos=undefined;act(`Stock ${p.name} → ${p.stock??'not counted'}`,id);saveAll();toast('Stock saved')}

/* ---------- CHECK PRODUCTS / DATA ISSUES ---------- */
const CHECKS={noprice:['No price',p=>!hasPrice(p)],nophoto:['No photo',p=>!isPic(p.img)],nocat:['No category',p=>p.sub==='Other'||!p.sub],nobrand:['No brand',p=>!brandOf(p)],noweight:['No size / weight',p=>!p.size],noupc:['No UPC',p=>!p.upc],unpub:['Unpublished',p=>p.published===false],review:['Ready for review',p=>!!p.review]};
BO_VIEWS.check=q=>{
  const c=q.get('c')||'',list=pfilter(q).filter(p=>!c||CHECKS[c][1](p));
  return head('Check Products','Browse the catalog and find products that need attention.',`<button class="btn sm lime" onclick="editP()">Add product</button>`)+pbar(q)+
  `<div class="schips"><a class="${!c?'on':''}" href="javascript:hashSet('c','')">All</a>${Object.entries(CHECKS).map(([k,[l,fn]])=>`<a class="${k===c?'on':''}" href="javascript:hashSet('c','${k}')">${l} <b>${P.filter(fn).length.toLocaleString()}</b></a>`).join('')}</div>`+
  prodTable(list,[['Price',p=>`<input type="number" step="0.01" min="0" value="${p.price??''}" placeholder="—" style="width:84px" onchange="quickPrice('${p.id}',this.value)" aria-label="Price">${p.unit==='lb'?' /lb':''}`],['Sale',p=>p.sale?money(p.sale):'—'],['Flags',p=>Object.entries(CHECKS).filter(([,[,fn]])=>fn(p)).map(([,[l]])=>`<span class="tagx amber">${l}</span>`).join(' ')||'<span class="tagx">OK</span>']],{page:+q.get('page')||1});
};
function dataIssues(){
  const out=[],names={};
  P.forEach(p=>{const k=(p.name+'|'+p.size).toLowerCase();(names[k]=names[k]||[]).push(p)});
  Object.values(names).filter(a=>a.length>1).forEach(a=>out.push(['Duplicate product',a[0],`${a.length} products share this name and size`]));
  P.forEach(p=>{
    if(p.sale&&p.price&&p.sale>=p.price)out.push(['Sale price not lower',p,`Sale ${money(p.sale)} vs price ${money(p.price)}`]);
    if(p.sale&&!p.price)out.push(['Sale price without a price',p,'']);
    if((p.caseQty&&!p.caseP)||(!p.caseQty&&p.caseP))out.push(['Incomplete case pricing',p,'Needs both units per case and case price']);
    if(p.caseQty&&p.caseP&&p.price&&p.caseP>=p.caseQty*p.price)out.push(['Case price not a saving',p,`${p.caseQty} × ${money(p.price)} = ${money(p.caseQty*p.price)}, case ${money(p.caseP)}`]);
    if((p.dealN&&!p.dealT)||(!p.dealN&&p.dealT))out.push(['Incomplete multi-buy',p,'']);
    if(p.price&&p.price>500)out.push(['Unusually high price',p,money(p.price)]);
    if(p.stock!=null&&p.stock<0)out.push(['Negative stock',p,String(p.stock)]);
    if(p.featured&&!hasPrice(p))out.push(['Featured but not priced',p,'Shows as “Price coming soon” on the homepage']);
  });
  const upcs={};P.filter(p=>p.upc).forEach(p=>(upcs[p.upc]=upcs[p.upc]||[]).push(p));Object.entries(upcs).filter(([,a])=>a.length>1).forEach(([u,a])=>out.push(['Duplicate UPC',a[0],`${u} is on ${a.length} products`]));
  ORDERS.filter(o=>!['Canceled','Charged'].includes(o.status)).forEach(o=>o.items.forEach(it=>{if(!prod(it.pid))out.push(['Open order has a deleted product',{id:'',name:it.name},`Order #${o.id}`])}));
  return out;
}
BO_VIEWS.issues=q=>{
  const all=dataIssues(),kinds=[...new Set(all.map(r=>r[0]))],k=q.get('k')||'',rows=all.filter(r=>!k||r[0]===k);
  return head('Data Issues','Problems in product and order data that can confuse customers or staff.')+
  `<div class="schips"><a class="${!k?'on':''}" href="javascript:hashSet('k','')">All <b>${all.length}</b></a>${kinds.map(x=>`<a class="${x===k?'on':''}" href="javascript:hashSet('k',${qa(x)})">${esc(x)} <b>${all.filter(r=>r[0]===x).length}</b></a>`).join('')}</div>
  ${rows.length?`<div class="panel tbl-wrap"><table><thead><tr><th>Issue</th><th>Product</th><th>Details</th><th></th></tr></thead><tbody>${rows.slice(0,500).map(([kind,p,d])=>`<tr><td><span class="tagx amber">${esc(kind)}</span></td><td>${esc(p.name)}<div class="mini muted">${esc(p.size||'')}</div></td><td class="mini">${esc(d)}</td><td>${p.id?`<button class="btn sm ghost" onclick="editP('${p.id}')">Fix</button>`:''}</td></tr>`).join('')}</tbody></table>${rows.length>500?'<p class="mini muted">Showing the first 500.</p>':''}</div>`:'<div class="empty"><div class="e">✅</div><h3>No data issues found</h3></div>'}`;
};

/* ---------- REPORTS ---------- */
BO_VIEWS.reports=q=>{
  const type=q.get('t')||'sales',from=q.get('from')||ymd(new Date(Date.now()-29*864e5)),to=q.get('to')||todayStr();
  const os=ORDERS.filter(o=>o.date>=from&&o.date<=to&&o.status!=='Canceled'),sold=os.filter(o=>['Processed','Charged'].includes(o.status));
  const tabs=[['sales','Sales'],['brands','Brands'],['marketing','Marketing'],['shopper','Personal Shopper'],['tips','Tips']];
  let rows=[],body='';
  const T=o=>o.finalT||totals(o,['Processed','Charged'].includes(o.status));
  if(type==='sales'){
    const days={};os.forEach(o=>{const t=T(o),d=days[o.date]=days[o.date]||{Date:o.date,Orders:0,Delivery:0,Pickup:0,Items:0,Subtotal:0,Discounts:0,Tax:0,Fees:0,Tips:0,Total:0};d.Orders++;d[o.method]++;d.Items+=o.items.length;d.Subtotal+=t.sub;d.Discounts+=t.disc;d.Tax+=t.tax;d.Fees+=t.fee;d.Tips+=t.tip;d.Total+=t.total});
    rows=Object.values(days).sort((a,b)=>a.Date.localeCompare(b.Date));
    const dept={};os.forEach(o=>o.items.forEach(it=>{const p=prod(it.pid);const k=p?.dept||'Other';dept[k]=(dept[k]||0)+(['Processed','Charged'].includes(o.status)?lineFinal(it):lineTotal(it))}));
    const sum=k=>rows.reduce((a,r)=>a+r[k],0);
    body=`<div class="stats"><div><b>${os.length}</b>Orders</div><div><b>${money(sum('Total'))}</b>Total sales</div><div><b>${money(os.length?sum('Total')/os.length:0)}</b>Average order</div><div><b>${money(sum('Tax'))}</b>Tax</div><div><b>${money(sum('Fees'))}</b>Service fees</div></div>
     <div class="panel tbl-wrap"><h3>By day</h3><table><thead><tr>${['Date','Orders','Delivery','Pickup','Subtotal','Discounts','Tax','Fees','Tips','Total'].map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><td>${prettyDate(r.Date)}</td><td>${r.Orders}</td><td>${r.Delivery}</td><td>${r.Pickup}</td><td>${money(r.Subtotal)}</td><td>${money(r.Discounts)}</td><td>${money(r.Tax)}</td><td>${money(r.Fees)}</td><td>${money(r.Tips)}</td><td><b>${money(r.Total)}</b></td></tr>`).join('')}</tbody></table></div>
     <div class="panel tbl-wrap"><h3>By department</h3><table><tbody>${Object.entries(dept).sort((a,b)=>b[1]-a[1]).map(([d,v])=>`<tr><td>${esc(d)}</td><td>${money(v)}</td></tr>`).join('')}</tbody></table></div>`;
    rows=rows.map(r=>{const o={...r};['Subtotal','Discounts','Tax','Fees','Tips','Total'].forEach(k=>o[k]=+o[k].toFixed(2));return o});
  }
  if(type==='brands'){const b={};os.forEach(o=>o.items.forEach(it=>{const p=prod(it.pid);const k=p?brandOf(p)||'(no brand)':'(deleted)';b[k]=b[k]||{Brand:k,Units:0,Orders:new Set(),Sales:0};b[k].Units+=it.qty;b[k].Orders.add(o.id);b[k].Sales+=['Processed','Charged'].includes(o.status)?lineFinal(it):lineTotal(it)}));
    rows=Object.values(b).map(r=>({Brand:r.Brand,Units:+r.Units.toFixed(2),Orders:r.Orders.size,Sales:+r.Sales.toFixed(2)})).sort((a,b)=>b.Sales-a.Sales);
    body=`<div class="panel tbl-wrap"><table><thead><tr><th>Brand</th><th>Units</th><th>Orders</th><th>Sales</th></tr></thead><tbody>${rows.slice(0,300).map(r=>`<tr><td>${esc(r.Brand)}</td><td>${r.Units}</td><td>${r.Orders}</td><td>${money(r.Sales)}</td></tr>`).join('')}</tbody></table></div>`}
  if(type==='marketing'){const cust=USERS.filter(u=>(u.role||'customer')==='customer'),newC=cust.filter(u=>u.created&&ymd(new Date(u.created))>=from&&ymd(new Date(u.created))<=to),buyers={};os.forEach(o=>buyers[o.email]=(buyers[o.email]||0)+1);
    const repeat=Object.values(buyers).filter(n=>n>1).length,codes={};os.filter(o=>o.code).forEach(o=>{codes[o.code]=codes[o.code]||{Code:o.code,Orders:0,Discount:0,Sales:0};const t=T(o);codes[o.code].Orders++;codes[o.code].Discount+=t.disc;codes[o.code].Sales+=t.total});
    const subsN=SUBS.filter(s=>ymd(new Date(s.t))>=from&&ymd(new Date(s.t))<=to).length;
    rows=Object.values(codes).map(r=>({...r,Discount:+r.Discount.toFixed(2),Sales:+r.Sales.toFixed(2)}));
    body=`<div class="stats"><div><b>${newC.length}</b>New customers</div><div><b>${Object.keys(buyers).length}</b>Customers who ordered</div><div><b>${repeat}</b>Ordered more than once</div><div><b>${subsN}</b>New specials subscribers</div><div><b>${SUBS.length}</b>Total subscribers</div></div>
     <div class="panel tbl-wrap"><h3>Discount codes</h3>${rows.length?`<table><thead><tr><th>Code</th><th>Orders</th><th>Discount given</th><th>Sales</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.Code)}</td><td>${r.Orders}</td><td>${money(r.Discount)}</td><td>${money(r.Sales)}</td></tr>`).join('')}</tbody></table>`:'<p class="muted">No codes used in this period.</p>'}</div>
     <div class="panel tbl-wrap"><h3>Top customers</h3><table><tbody>${Object.entries(buyers).sort((a,b)=>b[1]-a[1]).slice(0,20).map(([e,n])=>`<tr><td>${esc(uname(e))}</td><td class="mini">${esc(e)}</td><td>${n} orders</td></tr>`).join('')}</tbody></table></div>`}
  if(type==='shopper'){const s={};sold.concat(os.filter(o=>o.status==='Processing')).forEach(o=>{const k=o.shopper||'';const r=s[k]=s[k]||{Shopper:uname(k)||'Unassigned',Orders:0,Items:0,Picked:0,Out:0,Substituted:0,Minutes:0,Timed:0};r.Orders++;o.items.forEach(it=>{r.Items++;const st=it.pick?.status;if(st==='picked')r.Picked++;if(st==='out')r.Out++;if(st==='sub')r.Substituted++});if(o.pickStart&&o.pickEnd){r.Minutes+=(o.pickEnd-o.pickStart)/6e4;r.Timed++}});
    rows=Object.values(s).map(r=>({Shopper:r.Shopper,Orders:r.Orders,Items:r.Items,Picked:r.Picked,'Out of stock':r.Out,Substituted:r.Substituted,'Avg minutes per order':r.Timed?+(r.Minutes/r.Timed).toFixed(1):''}));
    body=`<div class="panel tbl-wrap"><table><thead><tr>${Object.keys(rows[0]||{Shopper:1}).map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${Object.values(r).map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>${rows.length?'':'<p class="muted">No picked orders in this period.</p>'}</div>`}
  if(type==='tips'){const tipped=os.filter(o=>+o.tip>0);rows=tipped.map(o=>({Order:o.id,Date:o.date,Customer:o.name,Type:o.method,Driver:uname(o.driver),Shopper:uname(o.shopper),Tip:+o.tip}));
    const byD={};tipped.forEach(o=>{const k=o.method==='Delivery'?uname(o.driver):'Pickup';byD[k]=(byD[k]||0)+ +o.tip});
    body=`<div class="stats"><div><b>${money(rows.reduce((a,r)=>a+r.Tip,0))}</b>Total tips</div><div><b>${rows.length}</b>Tipped orders</div><div><b>${os.length?Math.round(rows.length/os.length*100):0}%</b>Of orders</div></div>
     <div class="panel tbl-wrap"><h3>By driver</h3><table><tbody>${Object.entries(byD).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${money(v)}</td></tr>`).join('')||'<tr><td class="muted">No tips</td></tr>'}</tbody></table></div>
     <div class="panel tbl-wrap"><table><thead><tr><th>Order</th><th>Date</th><th>Customer</th><th>Driver</th><th>Tip</th></tr></thead><tbody>${rows.map(r=>`<tr><td>#${r.Order}</td><td>${r.Date}</td><td>${esc(r.Customer)}</td><td>${esc(r.Driver)}</td><td>${money(r.Tip)}</td></tr>`).join('')}</tbody></table></div>`}
  window._rep=rows;
  return head('Reports',`${prettyDate(from)} – ${prettyDate(to)}`,`<button class="btn sm ghost" onclick="xlsx(window._rep,'Report','CenterFresh_${type}_report_${from}_to_${to}.xlsx')">Export to Excel</button>`)+
  `<div class="fbar"><div><label>From</label><input type="date" value="${from}" onchange="hashSet('from',this.value)"></div><div><label>To</label><input type="date" value="${to}" onchange="hashSet('to',this.value)"></div><div><label>&nbsp;</label><div class="row" style="gap:4px"><button class="btn sm ghost" onclick="hashSet('from','${todayStr()}');hashSet('to','${todayStr()}')">Today</button><button class="btn sm ghost" onclick="hashSet('from','${ymd(new Date(Date.now()-6*864e5))}')">7 days</button><button class="btn sm ghost" onclick="hashSet('from','${ymd(new Date(Date.now()-29*864e5))}')">30 days</button></div></div></div>
  <nav class="vtabs">${tabs.map(([k,l])=>`<a class="${k===type?'on':''}" href="javascript:hashSet('t','${k}')">${l}</a>`).join('')}</nav>${body}`;
};

/* ---------- BULK EDIT ---------- */
BO_VIEWS.bulk=q=>{
  const wf=q.get('wf')||'';let list=pfilter(q);if(wf&&WF[wf])list=list.filter(WF[wf][1]);
  window._bulk=list.map(p=>p.id);
  return head('Bulk Edit','Change many products at once. Filter first, then choose what to change.')+
  pbar(q,`<div><label>Quick filter</label><select onchange="hashSet('wf',this.value)"><option value="">None</option>${Object.entries(WF).map(([k,[l]])=>`<option value="${k}" ${k===wf?'selected':''}>${l}</option>`).join('')}</select></div>`)+
  `<div class="panel"><h3>${list.length.toLocaleString()} products selected</h3>
   <div class="grid2"><div><label for="bk">Change</label><select id="bk" onchange="bkForm()">
    <option value="dept">Department &amp; category</option><option value="price">Set price</option><option value="pricepct">Raise / lower price by %</option><option value="sale">Set sale price</option><option value="salepct">Sale = % off price</option><option value="clearsale">Clear sale prices</option>
    <option value="pub">Publish</option><option value="unpub">Unpublish</option><option value="feat">Feature</option><option value="unfeat">Unfeature</option><option value="oos">Mark out of stock</option><option value="ins">Mark in stock</option>
    <option value="brand">Set brand</option><option value="attr">Add attribute</option><option value="tax">Tax setting</option><option value="case">Case pricing</option><option value="unit">Sold by (each / lb)</option><option value="review">Mark ready for review</option><option value="unreview">Clear review flag</option></select></div><div id="bkf"></div></div>
   <button class="btn lime" style="margin-top:14px" onclick="bkApply()">Apply to ${list.length.toLocaleString()} products</button></div>`+
  prodTable(list,[['Price',p=>p.price?money(p.price):'—'],['Sale',p=>p.sale?money(p.sale):'—']],{page:+q.get('page')||1,per:30});
};
function bkForm(){const k=$('bk').value,f=$('bkf');const num=(id,l)=>`<label for="${id}">${l}</label><input id="${id}" type="number" step="0.01">`;
  f.innerHTML={dept:`<label for="bd">Department</label><select id="bd" onchange="bs.innerHTML=DEPTS[this.value][1].map(s=>'<option>'+s+'</option>').join('')">${DEPT_NAMES.map(d=>`<option>${esc(d)}</option>`).join('')}</select><label for="bs">Category</label><select id="bs">${DEPTS[DEPT_NAMES[0]][1].map(s=>`<option>${esc(s)}</option>`).join('')}</select>`,
   price:num('bv','New price'),pricepct:num('bv','Percent (use −5 to lower)'),sale:num('bv','Sale price'),salepct:num('bv','Percent off'),brand:'<label for="bv">Brand</label><input id="bv">',
   attr:`<label for="bv">Attribute</label><select id="bv">${ATTRS.map(a=>`<option>${a}</option>`).join('')}</select>`,tax:'<label for="bv">Tax</label><select id="bv"><option value="">Department default</option><option value="1">Taxable</option><option value="0">Not taxable</option></select>',
   case:num('bv','Units per case')+num('bv2','Case price (blank = units × price less 5%)'),unit:'<label for="bv">Sold</label><select id="bv"><option value="ea">Each</option><option value="lb">Per pound</option></select>'}[k]||''}
function bkApply(){const k=$('bk').value,ids=window._bulk||[],v=$('bv')?.value,n=parseFloat(v);if(!ids.length){toast('No products selected');return}
  if(!confirm(`Apply this change to ${ids.length} products?`))return;let c=0;
  ids.forEach(id=>{const p=prod(id);if(!p)return;c++;
    switch(k){case'dept':p.dept=$('bd').value;p.sub=$('bs').value;break;case'price':if(n>0)p.price=n;break;case'pricepct':if(p.price&&!isNaN(n))p.price=+(p.price*(1+n/100)).toFixed(2);break;
     case'sale':if(n>0)p.sale=n;break;case'salepct':if(p.price&&n>0)p.sale=+(p.price*(1-n/100)).toFixed(2);break;case'clearsale':p.sale=null;break;
     case'pub':p.published=undefined;break;case'unpub':p.published=false;break;case'feat':p.featured=true;break;case'unfeat':p.featured=false;break;case'oos':p.oos=true;break;case'ins':p.oos=undefined;break;
     case'brand':p.brand=v.trim()||null;break;case'attr':p.attrs=[...new Set([...(p.attrs||[]),v])];break;case'tax':p.taxable=v===''?null:v==='1';break;
     case'case':{const cq=parseFloat($('bv').value),cp=parseFloat($('bv2').value);if(cq>0){p.caseQty=cq;p.caseP=cp>0?cp:(p.price?+(p.price*cq*.95).toFixed(2):null)}break}
     case'unit':p.unit=v;break;case'review':p.review=true;break;case'unreview':p.review=undefined;break}});
  act(`Bulk edit (${k}) on ${c} products`);syslog(`Bulk edit ${k} on ${c} products`);saveAll();route();toast(`${c} products updated`)}
/* =====================================================================
   MANAGE + ADMIN
   ===================================================================== */
const SET_SECTIONS=[['box','Box Types'],['checkout','Checkout Instructions'],['oos','Out of Stock Options'],['mode','Personal Shopper Mode'],['route','Personal Shopper Route'],['printers','Printers'],['production','Production Settings'],['scale','Scale Settings'],['areas','Service Areas'],['stock','Stock Control Settings'],['general','Store General'],['tax','Tax Settings'],['slots','Time Slots Capacity']];
const chk=(id,v,l)=>`<label class="check"><input type="checkbox" id="${id}" ${v?'checked':''}> ${l}</label>`;
function saveSet(msg){saveAll();syslog('Settings saved: '+msg);act('Changed settings: '+msg);footer();toast('Saved')}
BO_VIEWS.settings=q=>{
  if(roleOf()!=='admin')return head('Settings')+'<p class="muted">Only admins can change settings.</p>';
  const s=q.get('s')||'general';let b='';
  if(s==='box')b=`<div class="panel"><p class="muted">Box types shoppers can pack into. Turned-on types appear on the picking screen and on box labels.</p>${Object.entries(S.boxTypes).map(([k,v])=>chk('bx_'+k.replace(/\W/g,''),v,esc(k))).join('')}<div class="row" style="margin-top:10px"><input id="bxnew" placeholder="Add a box type" style="max-width:240px"><button class="btn sm ghost" onclick="if(bxnew.value.trim()){S.boxTypes[bxnew.value.trim()]=true;saveSet('Box types');route()}">Add</button></div><button class="btn" style="margin-top:14px" onclick="Object.keys(S.boxTypes).forEach(k=>S.boxTypes[k]=$('bx_'+k.replace(/\\W/g,'')).checked);saveSet('Box types')">Save</button></div>`;
  if(s==='checkout')b=`<div class="panel"><p class="muted">Shown to customers on the checkout page, above the substitution choices. Leave blank to hide.</p><textarea id="ckt" rows="6">${esc(S.checkoutText)}</textarea><button class="btn" style="margin-top:14px" onclick="S.checkoutText=ckt.value.trim();saveSet('Checkout instructions')">Save</button></div>`;
  if(s==='oos')b=`<div class="panel"><p class="muted">The choices customers see for out-of-stock items. The first one is selected by default.</p><div id="oosl">${S.oosOptions.map(([v,d],i)=>`<div class="grid2 oosr"><input value="${esc(v)}" aria-label="Option ${i+1}"><input value="${esc(d)}" aria-label="Description ${i+1}"></div>`).join('')}</div>
    <div class="row" style="margin-top:10px"><button class="btn sm ghost" onclick="oosl.insertAdjacentHTML('beforeend','<div class=&quot;grid2 oosr&quot;><input placeholder=&quot;Option&quot;><input placeholder=&quot;Description&quot;></div>')">Add option</button><button class="btn" onclick="S.oosOptions=[...document.querySelectorAll('.oosr')].map(r=>[r.children[0].value.trim(),r.children[1].value.trim()]).filter(r=>r[0]);saveSet('Out of stock options');route()">Save</button></div><p class="mini muted">Clear an option’s name to remove it.</p></div>`;
  if(s==='mode'){const m=S.shopperMode;b=`<div class="panel">${chk('sm1',m.requireWeight,'Require a weight for items sold by the pound before an order can be completed')}${chk('sm2',m.subsNeedApproval,'Flag substitutions for customer approval when the customer asked to be contacted')}${chk('sm3',m.showPhotos,'Show product photos on the picking screen')}${chk('sm4',m.claimOnStart,'Assign the order to the shopper who starts picking it')}${chk('sm5',m.printLabelsOnDone,'Print box labels when an order is completed')}
    <button class="btn" style="margin-top:14px" onclick="Object.assign(S.shopperMode,{requireWeight:sm1.checked,subsNeedApproval:sm2.checked,showPhotos:sm3.checked,claimOnStart:sm4.checked,printLabelsOnDone:sm5.checked});saveSet('Personal shopper mode')">Save</button></div>`}
  if(s==='route')b=`<div class="panel"><p class="muted">The order shoppers walk the store. Pick lists and Order Items follow this order.</p><ol id="rtl" style="padding-left:20px">${S.pickRoute.map((d,i)=>`<li style="margin:4px 0"><span class="row" style="gap:6px"><b style="min-width:180px">${esc(d)}</b><button class="btn sm ghost" onclick="rtMove(${i},-1)" aria-label="Move up">↑</button><button class="btn sm ghost" onclick="rtMove(${i},1)" aria-label="Move down">↓</button></span></li>`).join('')}</ol></div>`;
  if(s==='printers'){const pr=S.printer;b=`<div class="panel"><div class="grid2"><div><label for="pr1">Receipt size</label><select id="pr1"><option value="80mm" ${pr.receipt==='80mm'?'selected':''}>80 mm receipt printer</option><option value="letter" ${pr.receipt==='letter'?'selected':''}>Letter paper</option></select></div><div><label for="pr2">Labels per box</label><input id="pr2" type="number" min="1" value="${pr.labelsPerBox}"></div></div>
    ${chk('pr3',pr.showPrices,'Show prices on receipts and pick lists')}<label for="pr4">Receipt footer</label><input id="pr4" value="${esc(pr.footer)}"><p class="mini muted">Printing uses the browser’s print window — choose the receipt or label printer there.</p>
    <button class="btn" style="margin-top:14px" onclick="Object.assign(S.printer,{receipt:pr1.value,labelsPerBox:Math.max(1,+pr2.value||1),showPrices:pr3.checked,footer:pr4.value});saveSet('Printers')">Save</button></div>`}
  if(s==='production')b=`<div class="panel"><p class="muted">Items from these departments go to the Production Manager.</p><div class="row" style="gap:6px 16px">${DEPT_NAMES.map(d=>`<label class="check" style="margin:0"><input type="checkbox" class="pdd" value="${esc(d)}" ${S.production.depts.includes(d)?'checked':''}> ${esc(d)}</label>`).join('')}</div>
    <div class="grid2"><div><label for="pd1">Lead time (hours before the slot)</label><input id="pd1" type="number" min="0" value="${S.production.leadHours}"></div><div><label for="pd2">Note for the kitchen</label><input id="pd2" value="${esc(S.production.note)}"></div></div>
    <button class="btn" style="margin-top:14px" onclick="S.production.depts=[...document.querySelectorAll('.pdd:checked')].map(x=>x.value);S.production.leadHours=+pd1.value||0;S.production.note=pd2.value;saveSet('Production')">Save</button></div>`;
  if(s==='scale')b=`<div class="panel"><div class="grid2"><div><label for="sc1">Weight unit</label><select id="sc1"><option value="lb" ${S.scale.unit==='lb'?'selected':''}>Pounds (lb)</option></select></div><div><label for="sc2">Tare to subtract (lb)</label><input id="sc2" type="number" step="0.01" value="${S.scale.tare}"></div><div><label for="sc3">Flag weight differences over (%)</label><input id="sc3" type="number" value="${S.scale.variancePct}"></div></div><p class="mini muted">Weights are typed on the picking screen. Large differences from the ordered weight show under Personal Shopper → Exceptions.</p>
    <button class="btn" style="margin-top:14px" onclick="S.scale={unit:sc1.value,tare:+sc2.value||0,variancePct:+sc3.value||15};saveSet('Scale')">Save</button></div>`;
  if(s==='areas')b=`<div class="panel tbl-wrap"><table><thead><tr><th>Area</th><th>Delivery fee</th><th>Minimum order</th><th>ZIP codes</th><th>Active</th><th></th></tr></thead><tbody>${S.areas.map((a,i)=>`<tr class="arr"><td><input value="${esc(a.name)}" style="min-width:140px"></td><td><input type="number" step="0.01" value="${a.fee}" style="width:90px"></td><td><input type="number" step="0.01" value="${a.min}" style="width:90px"></td><td><input value="${esc(a.zips||'')}" placeholder="11219, 11204"></td><td><input type="checkbox" ${a.active?'checked':''}></td><td><button class="linkbtn red" onclick="S.areas.splice(${i},1);saveSet('Service areas');route()">Remove</button></td></tr>`).join('')}</tbody></table>
    <div class="row" style="margin-top:12px"><button class="btn sm ghost" onclick="S.areas.push({name:'New area',fee:S.fee,min:S.minOrder,zips:'',active:false});route()">Add area</button><button class="btn" onclick="arSave()">Save</button></div></div>`;
  if(s==='stock'){const c=S.stockCtl;b=`<div class="panel">${chk('sk1',c.track,'Track stock counts (orders reduce stock when they’re picked)')}${chk('sk2',c.hideOOS,'Hide out-of-stock items from the website (otherwise they show “Out of stock”)')}${chk('sk3',c.oosOnPick,'When a shopper marks an item Out, mark the product out of stock')}<label for="sk4">Low stock warning at</label><input id="sk4" type="number" min="0" value="${c.low}" style="max-width:120px">
    <button class="btn" style="margin-top:14px;display:block" onclick="S.stockCtl={track:sk1.checked,hideOOS:sk2.checked,oosOnPick:sk3.checked,low:+sk4.value||0};saveSet('Stock control')">Save</button></div>`}
  if(s==='general')b=aSettings().replace(/<label for="s_towns">[\s\S]*?<input id="s_towns"[^>]*>/,`<input type="hidden" id="s_towns" value="${esc(S.towns.join(', '))}"><p class="mini muted">Delivery towns, fees and minimums per town are under <a href="#/admin/settings?s=areas">Service Areas</a>.</p>`);
  if(s==='tax')b=`<div class="panel"><div class="grid2"><div><label for="tx1">Sales tax rate (%)</label><input id="tx1" type="number" step="0.001" value="${S.tax.rate}"></div><div><label>&nbsp;</label>${chk('tx2',S.tax.onFee,'Charge tax on the service fee')}</div></div>
    <label>Taxable departments</label><div class="row" style="gap:6px 16px">${DEPT_NAMES.map(d=>`<label class="check" style="margin:0"><input type="checkbox" class="txd" value="${esc(d)}" ${S.tax.depts.includes(d)?'checked':''}> ${esc(d)}</label>`).join('')}</div>
    <p class="mini muted">Individual products can override this in the product editor or Bulk Edit. Confirm rates and which items are taxable with your accountant.</p><button class="btn" style="margin-top:14px" onclick="S.tax={rate:+tx1.value||0,onFee:tx2.checked,depts:[...document.querySelectorAll('.txd:checked')].map(x=>x.value)};saveSet('Tax')">Save</button></div>`;
  if(s==='slots'){const rows=[0,1,2,3,4,5,6].flatMap(d=>{const w=S.windows[d];if(!w)return[];const sl=[];for(let h=w[0];h+2<=w[1];h++)sl.push(`${h12(h)} – ${h12(h+2)}`);return sl.map(x=>[d,x])});
    b=`<div class="panel"><label for="cap0">Default orders per time slot</label><input id="cap0" type="number" min="1" value="${S.capacity}" style="max-width:140px"><p class="mini muted">Set a different limit for any slot below (blank uses the default). Full slots disappear from checkout. Days and hours are set under Store General.</p>
    <div class="tbl-wrap"><table><thead><tr><th>Day</th><th>Slot</th><th>Limit</th><th>Booked next ${'7'} days</th></tr></thead><tbody>${rows.map(([d,x])=>{const k=d+'|'+x,next=[...Array(7)].map((_,i)=>ymd(new Date(Date.now()+i*864e5))).find(dt=>new Date(dt+'T00:00').getDay()===d);return `<tr><td>${DAYS[d]}</td><td>${x}</td><td><input class="capx" data-k="${esc(k)}" type="number" min="0" value="${S.capacityBySlot[k]??''}" placeholder="${S.capacity}" style="width:90px"></td><td>${next?slotLoad(next,x)+' on '+prettyDate(next):''}</td></tr>`}).join('')}</tbody></table></div>
    <button class="btn" style="margin-top:14px" onclick="S.capacity=Math.max(1,+cap0.value||20);S.capacityBySlot={};document.querySelectorAll('.capx').forEach(i=>{if(i.value!=='')S.capacityBySlot[i.dataset.k]=+i.value});saveSet('Time slot capacity')">Save</button></div>`}
  return head('Settings','')+`<nav class="setnav">${SET_SECTIONS.map(([k,l])=>`<a class="${k===s?'on':''}" href="#/admin/settings?s=${k}">${l}</a>`).join('')}</nav><h2>${SET_SECTIONS.find(x=>x[0]===s)[1]}</h2>${b}`;
};
function rtMove(i,d){const a=S.pickRoute,j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];saveSet('Pick route');route()}
function arSave(){S.areas=[...document.querySelectorAll('.arr')].map(r=>{const c=r.querySelectorAll('input');return {name:c[0].value.trim(),fee:+c[1].value||0,min:+c[2].value||0,zips:c[3].value.trim(),active:c[4].checked}}).filter(a=>a.name);syncTowns();saveSet('Service areas');route()}

/* ---------- CUSTOMERS ---------- */
BO_VIEWS.customers=q=>{
  const t=(q.get('q')||'').toLowerCase(),list=USERS.filter(u=>(u.role||'customer')==='customer'&&(!t||(u.first+' '+u.last+' '+u.email+' '+(u.phone||'')).toLowerCase().includes(t)));
  const stats=e=>{const os=ORDERS.filter(o=>o.email===e&&o.status!=='Canceled');return [os.length,os.reduce((a,o)=>a+(o.final||o.total),0),os.map(o=>o.created).sort().pop()]};
  return head('Customers',`${list.length} customers`,`<button class="btn sm ghost" onclick="custExport()">Export</button>`)+`<div class="fbar"><div><label>Search</label><input type="search" value="${esc(q.get('q')||'')}" placeholder="Name, email, phone" onkeydown="if(event.key==='Enter')hashSet('q',this.value)"></div></div>
  <div class="panel tbl-wrap"><table><thead><tr><th>Name</th><th>Contact</th><th>Town</th><th>Orders</th><th>Spent</th><th>Last order</th><th></th></tr></thead><tbody>${list.map(u=>{const [n,sp,l]=stats(u.email);return `<tr><td><b>${esc(u.first+' '+u.last)}</b>${u.blocked?' <span class="tagx red">Blocked</span>':''}${u.vip?' <span class="tagx">VIP</span>':''}</td><td class="mini">${esc(u.email)}<br>${esc(u.phone||'')}</td><td>${esc(u.town||'')}</td><td>${n}</td><td>${money(sp)}</td><td class="mini">${l?new Date(l).toLocaleDateString():'—'}</td><td><a class="btn sm ghost" href="#/admin/customer/${encodeURIComponent(u.email)}">Open</a></td></tr>`}).join('')||'<tr><td colspan="7" class="muted">No customers.</td></tr>'}</tbody></table></div>
  <div class="panel tbl-wrap"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Specials subscribers (${SUBS.length})</h3><button class="btn sm ghost" onclick="exportSubs()">Export</button></div><table><tbody>${SUBS.slice(0,50).map(s=>`<tr><td>${esc(s.email)}</td><td>${esc(s.first)}</td><td>${esc(s.cell)}</td><td class="mini">${new Date(s.t).toLocaleDateString()}</td></tr>`).join('')}</tbody></table></div>`;
};
function custExport(){xlsx(USERS.filter(u=>(u.role||'customer')==='customer').map(u=>({First:u.first,Last:u.last,Email:u.email,Phone:u.phone||'',Town:u.town||'',Orders:ORDERS.filter(o=>o.email===u.email).length,Blocked:u.blocked?'yes':''})),'Customers','CenterFresh_Customers.xlsx')}
BO_VIEWS.customer=(q,rest)=>{
  const e=rest[0],u=USERS.find(x=>x.email===e);if(!u)return head('Customer not found');
  const os=ORDERS.filter(o=>o.email===e).sort((a,b)=>b.created-a.created),acct=ACCTS.find(a=>a.customers.includes(e));
  return `<div class="crumbs"><a href="#/admin/customers">Customers</a> / ${esc(u.first+' '+u.last)}</div>`+head(esc(u.first+' '+u.last),esc(u.email))+
  `<div class="two" style="margin-top:0"><div class="panel tbl-wrap"><h3>Orders (${os.length})</h3><table><tbody>${os.map(o=>`<tr><td><a href="#/admin/order/${o.id}">#${o.id}</a></td><td>${prettyDate(o.date)}</td><td>${o.method}</td><td>${stBadge(o.status)}</td><td>${money(o.final||o.total)}</td></tr>`).join('')||'<tr><td class="muted">No orders yet.</td></tr>'}</tbody></table></div>
  <div><form class="panel" onsubmit="return cuSave(event,${qa(e)})"><div class="grid2"><div><label for="cu1">First name</label><input id="cu1" value="${esc(u.first)}"></div><div><label for="cu2">Last name</label><input id="cu2" value="${esc(u.last)}"></div></div><label for="cu3">Phone</label><input id="cu3" value="${esc(u.phone||'')}">
   <label for="cu4">Staff notes</label><textarea id="cu4" rows="3">${esc(u.staffNote||'')}</textarea>${chk('cu5',u.vip,'VIP customer')}${chk('cu6',u.blocked,'Block from placing orders')}
   <div class="row" style="margin-top:12px"><button class="btn" type="submit">Save</button>${roleOf()==='admin'?`<button type="button" class="btn ghost" onclick="cuReset(${qa(e)})">Reset password</button>`:''}</div></form>
   <div class="panel"><h3>Addresses</h3>${(u.addresses||[]).map(a=>`<div class="mini">${esc(a.street)}${a.apt?', '+esc(a.apt):''}, ${esc(a.town)}</div>`).join('')||'<p class="muted mini">None saved</p>'}<h3 style="margin-top:12px">House account</h3><p class="mini">${acct?`${esc(acct.name)} · balance ${money(acct.balance)}`:'None'} · <a href="#/admin/accounts">Manage accounts</a></p></div></div></div>`;
};
function cuSave(ev,e){ev.preventDefault();const u=USERS.find(x=>x.email===e);Object.assign(u,{first:$('cu1').value.trim(),last:$('cu2').value.trim(),phone:$('cu3').value.trim(),staffNote:$('cu4').value,vip:$('cu5').checked,blocked:$('cu6').checked});act('Edited customer '+e);saveAll();toast('Saved');return false}
function cuReset(e){const pw=prompt('New temporary password (6+ characters) to give the customer:');if(!pw||pw.length<6)return;USERS.find(x=>x.email===e).pass=hash(pw);act('Reset password for '+e);saveAll();toast('Password reset')}
const _placeOrderBO=window.placeOrder;window.placeOrder=function(e){if(user()?.blocked){e.preventDefault();$('coerr').textContent='Your account can’t place online orders. Please call the store.';return false}return _placeOrderBO(e)};

/* ---------- ACCOUNTS (house charge accounts) ---------- */
BO_VIEWS.accounts=q=>head('Accounts','House charge accounts — let approved customers or organizations pay on account and settle later.',`<button class="btn sm lime" onclick="acEdit()">New account</button>`)+
  (ACCTS.length?`<div class="panel tbl-wrap"><table><thead><tr><th>Account</th><th>Customers</th><th>Limit</th><th>Balance</th><th></th></tr></thead><tbody>${ACCTS.map((a,i)=>`<tr><td><b>${esc(a.name)}</b>${a.note?`<div class="mini muted">${esc(a.note)}</div>`:''}</td><td class="mini">${a.customers.map(esc).join('<br>')||'—'}</td><td>${a.limit?money(a.limit):'—'}</td><td><b style="color:${a.limit&&a.balance>a.limit?'var(--tomato)':'inherit'}">${money(a.balance)}</b></td><td><div class="row" style="gap:4px"><button class="btn sm ghost" onclick="acPay(${i})">Record payment</button><button class="btn sm ghost" onclick="acEdit(${i})">Edit</button><button class="btn sm ghost" onclick="acHist(${i})">History</button></div></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty"><div class="e">🏦</div><h3>No accounts yet</h3><p class="muted">Customers linked to an account can choose “Charge to house account” at checkout, and the cashier can charge it.</p></div>');
function acEdit(i){const a=i!=null?ACCTS[i]:{name:'',customers:[],limit:0,balance:0,note:''};modal(`<h2>${i!=null?'Edit':'New'} account</h2><label for="ac1">Account name</label><input id="ac1" value="${esc(a.name)}"><label for="ac2">Customer emails (one per line)</label><textarea id="ac2" rows="3">${esc(a.customers.join('\n'))}</textarea><label for="ac3">Credit limit ($, 0 = none)</label><input id="ac3" type="number" value="${a.limit}"><label for="ac4">Note</label><input id="ac4" value="${esc(a.note||'')}"><button class="btn" style="margin-top:14px" onclick="acSave(${i??-1})">Save</button>`)}
function acSave(i){const a={name:$('ac1').value.trim(),customers:$('ac2').value.split(/\s+/).map(x=>x.trim().toLowerCase()).filter(Boolean),limit:+$('ac3').value||0,note:$('ac4').value};if(!a.name){toast('Name required');return}if(i>=0)Object.assign(ACCTS[i],a);else ACCTS.push({...a,balance:0,tx:[]});saveAccts();act('Saved account '+a.name);closeModal();route()}
function acPay(i){const a=ACCTS[i],v=parseFloat(prompt(`Payment received for ${a.name} (balance ${money(a.balance)}):`));if(!(v>0))return;a.balance=+(a.balance-v).toFixed(2);a.tx=a.tx||[];a.tx.unshift({t:Date.now(),type:'payment',amount:-v,by:me});saveAccts();act(`Payment ${money(v)} on ${a.name}`);route()}
function acHist(i){const a=ACCTS[i];modal(`<h2>${esc(a.name)}</h2><table><tbody>${(a.tx||[]).map(t=>`<tr><td class="mini">${fmtT(t.t)}</td><td>${t.type}</td><td>${esc(t.ref||'')}</td><td>${money(t.amount)}</td></tr>`).join('')||'<tr><td class="muted">No activity</td></tr>'}</tbody></table>`)}

/* ---------- BANNERS ---------- */
BO_VIEWS.banners=()=>head('Banners','The rotating pictures on the homepage.',`<button class="btn sm lime" onclick="bnEdit()">Add banner</button>`)+
  BANNERS.map((b,i)=>`<div class="ocard row" style="flex-wrap:nowrap;gap:14px"><img src="${esc(b.img)}" alt="" style="width:220px;aspect-ratio:4.5/1;object-fit:cover;border-radius:8px"><div style="flex:1"><b>${esc(b.h)}</b><div class="mini muted">${esc(b.p)}</div><div class="mini">Button: ${esc(b.c)} → ${esc(b.l)}</div></div><div class="row" style="gap:4px"><button class="btn sm ghost" onclick="bnMove(${i},-1)" aria-label="Move up">↑</button><button class="btn sm ghost" onclick="bnMove(${i},1)" aria-label="Move down">↓</button><button class="btn sm ghost" onclick="bnEdit(${i})">Edit</button><button class="btn sm ghost" onclick="bnDel(${i})">Remove</button></div></div>`).join('');
function bnSave(){S.banners=BANNERS.slice();saveAll();act('Updated banners');route()}
function bnMove(i,d){const j=i+d;if(j<0||j>=BANNERS.length)return;[BANNERS[i],BANNERS[j]]=[BANNERS[j],BANNERS[i]];bnSave()}
function bnDel(i){if(BANNERS.length<2){toast('Keep at least one banner');return}if(!confirm('Remove this banner?'))return;BANNERS.splice(i,1);bnSave()}
function bnEdit(i){const b=i!=null?BANNERS[i]:{img:'',h:'',p:'',l:'#/specials',c:'Shop now'};modal(`<h2>${i!=null?'Edit':'Add'} banner</h2>${b.img?`<img src="${esc(b.img)}" alt="" style="width:100%;border-radius:8px">`:''}<label for="bn0">Picture (wide, about 1800 × 400)</label><input id="bn0" type="file" accept="image/*"><label for="bn1">Headline</label><input id="bn1" value="${esc(b.h)}"><label for="bn2">Text</label><input id="bn2" value="${esc(b.p)}"><div class="grid2"><div><label for="bn3">Button text</label><input id="bn3" value="${esc(b.c)}"></div><div><label for="bn4">Button link</label><input id="bn4" value="${esc(b.l)}" placeholder="#/dept/Produce"></div></div><button class="btn" style="margin-top:14px" onclick="bnStore(${i??-1})">Save</button>`)}
async function bnStore(i){const f=$('bn0').files[0];let img=i>=0?BANNERS[i].img:'';if(f)img=await shrink(f,1800);if(!img){toast('Choose a picture');return}const b={img,h:$('bn1').value,p:$('bn2').value,c:$('bn3').value||'Shop now',l:$('bn4').value||'#/'};if(i>=0)BANNERS[i]=b;else BANNERS.push(b);closeModal();bnSave()}

/* ---------- CATEGORIES ---------- */
BO_VIEWS.categories=q=>{const d=q.get('d')||DEPT_NAMES[0],subs=DEPTS[d][1];
  return head('Categories','Departments and their categories. Renaming a category moves its products with it.')+
  `<div class="setnav">${DEPT_NAMES.map(x=>`<a class="${x===d?'on':''}" href="#/admin/categories?d=${encodeURIComponent(x)}">${esc(x)} <b>${P.filter(p=>p.dept===x).length}</b></a>`).join('')}</div>
  <div class="two" style="margin-top:0"><div class="panel tbl-wrap"><h3>${esc(d)} categories</h3><table><tbody>${subs.map((s,i)=>`<tr><td><b>${esc(s)}</b></td><td>${P.filter(p=>p.dept===d&&p.sub===s).length} products</td><td><div class="row" style="gap:4px"><button class="btn sm ghost" onclick="ctMove(${qa(d)},${i},-1)" aria-label="Move up">↑</button><button class="btn sm ghost" onclick="ctMove(${qa(d)},${i},1)" aria-label="Move down">↓</button><button class="btn sm ghost" onclick="ctRen(${qa(d)},${i})">Rename</button><button class="btn sm ghost" onclick="ctDel(${qa(d)},${i})">Delete</button></div></td></tr>`).join('')}</tbody></table>
   <div class="row" style="margin-top:12px"><input id="ctn" placeholder="New category" style="max-width:260px"><button class="btn sm" onclick="ctAdd(${qa(d)})">Add</button></div></div>
   <div class="panel"><h3>Department picture</h3><img src="${esc(DEPTS[d][2])}" alt="" style="width:160px;border-radius:12px"><input type="file" accept="image/*" onchange="ctImg(${qa(d)},this.files[0])" aria-label="Upload department picture"></div></div>`};
function ctSave(){S.cats={};DEPT_NAMES.forEach(d=>S.cats[d]=DEPTS[d][1]);saveAll();act('Updated categories');route()}
function ctAdd(d){const v=$('ctn').value.trim();if(!v||DEPTS[d][1].includes(v))return;DEPTS[d][1].push(v);ctSave()}
function ctRen(d,i){const old=DEPTS[d][1][i],v=prompt('Rename category',old);if(!v||v===old)return;DEPTS[d][1][i]=v.trim();P.forEach(p=>{if(p.dept===d&&p.sub===old)p.sub=v.trim()});ctSave()}
function ctDel(d,i){const s=DEPTS[d][1][i],n=P.filter(p=>p.dept===d&&p.sub===s).length;if(DEPTS[d][1].length<2){toast('A department needs at least one category');return}const to=DEPTS[d][1].find(x=>x!==s);if(!confirm(`Delete “${s}”?${n?` Its ${n} products move to “${to}”.`:''}`))return;P.forEach(p=>{if(p.dept===d&&p.sub===s)p.sub=to});DEPTS[d][1].splice(i,1);ctSave()}
function ctMove(d,i,k){const a=DEPTS[d][1],j=i+k;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];ctSave()}
async function ctImg(d,f){if(!f)return;DEPTS[d][2]=await shrink(f,400);S.deptImg=S.deptImg||{};S.deptImg[d]=DEPTS[d][2];saveAll();route()}
if(S.deptImg)for(const d in S.deptImg)if(DEPTS[d])DEPTS[d][2]=S.deptImg[d];

/* ---------- DELI MENU ---------- */
BO_VIEWS.menus=()=>head('Deli Menu','Upload a picture of each printed menu (items and prices).')+aMenus();

/* ---------- DISCOUNTS ---------- */
BO_VIEWS.discounts=()=>head('Discounts','Codes customers type at checkout.',`<button class="btn sm lime" onclick="dcEdit()">New code</button>`)+
  (S.discounts.length?`<div class="panel tbl-wrap"><table><thead><tr><th>Code</th><th>Discount</th><th>Minimum</th><th>Expires</th><th>Used</th><th>Active</th><th></th></tr></thead><tbody>${S.discounts.map((d,i)=>`<tr><td><b>${esc(d.code)}</b>${d.once?' <span class="tagx">Once per customer</span>':''}</td><td>${d.type==='%'?d.amount+'%':money(d.amount)} off</td><td>${d.min?money(d.min):'—'}</td><td>${d.expires||'—'}</td><td>${d.uses||0}${d.maxUses?' / '+d.maxUses:''}</td><td><input type="checkbox" ${d.active?'checked':''} onchange="S.discounts[${i}].active=this.checked;saveSet('Discounts')" aria-label="Active"></td><td><button class="btn sm ghost" onclick="dcEdit(${i})">Edit</button> <button class="btn sm ghost" onclick="if(confirm('Delete code?')){S.discounts.splice(${i},1);saveSet('Discounts');route()}">Delete</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty"><div class="e">🏷️</div><h3>No discount codes</h3></div>');
function dcEdit(i){const d=i!=null?S.discounts[i]:{code:'',type:'%',amount:10,min:0,expires:'',maxUses:0,once:false,active:true};modal(`<h2>${i!=null?'Edit':'New'} discount code</h2><label for="dc1">Code</label><input id="dc1" value="${esc(d.code)}" style="text-transform:uppercase"><div class="grid2"><div><label for="dc2">Type</label><select id="dc2"><option value="%" ${d.type==='%'?'selected':''}>Percent off</option><option value="$" ${d.type==='$'?'selected':''}>Dollars off</option></select></div><div><label for="dc3">Amount</label><input id="dc3" type="number" step="0.01" value="${d.amount}"></div><div><label for="dc4">Minimum order ($)</label><input id="dc4" type="number" value="${d.min}"></div><div><label for="dc5">Expires</label><input id="dc5" type="date" value="${d.expires}"></div><div><label for="dc6">Total uses allowed (0 = unlimited)</label><input id="dc6" type="number" value="${d.maxUses}"></div></div>${chk('dc7',d.once,'Once per customer')}${chk('dc8',d.active,'Active')}<button class="btn" style="margin-top:14px" onclick="dcSave(${i??-1})">Save</button>`)}
function dcSave(i){const d={code:$('dc1').value.trim().toUpperCase(),type:$('dc2').value,amount:+$('dc3').value||0,min:+$('dc4').value||0,expires:$('dc5').value,maxUses:+$('dc6').value||0,once:$('dc7').checked,active:$('dc8').checked};if(!d.code||!d.amount){toast('Code and amount required');return}if(S.discounts.some((x,j)=>x.code===d.code&&j!==i)){toast('That code already exists');return}if(i>=0)S.discounts[i]={...S.discounts[i],...d};else S.discounts.push({...d,uses:0});closeModal();saveSet('Discount '+d.code);route()}

/* ---------- EDIT CIRCULAR ---------- */
BO_VIEWS.circular=()=>{const c=S.circular||{title:'Weekly Circular',from:todayStr(),to:ymd(new Date(Date.now()+6*864e5)),note:'',items:[],published:false};S.circular=c;
  return head('Edit Circular','Pick this week’s deals. Publishing sets each item’s sale price and adds a “Weekly Circular” page; ending restores the old prices.',c.published?`<span class="tagx">Published</span>`:'<span class="tagx amber">Draft</span>')+
  `<div class="panel"><div class="grid2"><div><label for="cr1">Title</label><input id="cr1" value="${esc(c.title)}"></div><div><label for="cr4">Note</label><input id="cr4" value="${esc(c.note)}" placeholder="While supplies last"></div><div><label for="cr2">Starts</label><input id="cr2" type="date" value="${c.from}"></div><div><label for="cr3">Ends</label><input id="cr3" type="date" value="${c.to}"></div></div>
   <div class="row" style="margin-top:12px"><button class="btn ghost" onclick="crMeta()">Save details</button>${c.published?`<button class="btn danger" onclick="crEnd()">End circular</button>`:`<button class="btn lime" onclick="crPub()">Publish</button>`}</div></div>
  <div class="panel"><h3>Items (${c.items.length})</h3><input type="search" placeholder="Search products to add" oninput="crSearch(this.value)"><div id="crr"></div>
   <div class="tbl-wrap" style="margin-top:10px"><table><thead><tr><th>Product</th><th>Regular</th><th>Circular price</th><th></th></tr></thead><tbody>${c.items.map((it,i)=>{const p=prod(it.pid);return p?`<tr><td><b>${esc(p.name)}</b><div class="mini muted">${esc(p.size)}</div></td><td>${p.price?money(p.price):'—'}</td><td><input type="number" step="0.01" value="${it.price??''}" style="width:90px" onchange="S.circular.items[${i}].price=+this.value||null;saveAll()"></td><td><button class="linkbtn red" onclick="S.circular.items.splice(${i},1);saveAll();route()">Remove</button></td></tr>`:''}).join('')}</tbody></table></div></div>`};
function crMeta(){Object.assign(S.circular,{title:$('cr1').value,from:$('cr2').value,to:$('cr3').value,note:$('cr4').value});saveSet('Circular details')}
function crSearch(t){$('crr').innerHTML=t.trim()?matches(t).slice(0,8).map(p=>`<div class="sg" style="grid-template-columns:1fr auto auto"><span>${esc(p.name)} <span class="mini muted">${esc(p.size)}</span></span>${priceHTML(p)}<button class="add-btn" onclick="crAdd('${p.id}')">Add</button></div>`).join(''):''}
function crAdd(pid){if(S.circular.items.some(i=>i.pid===pid))return;const p=prod(pid);S.circular.items.push({pid,price:p.sale||null});saveAll();route()}
function crPub(){crMeta();const c=S.circular,bad=c.items.filter(i=>!i.price||!hasPrice(prod(i.pid)));if(bad.length&&!confirm(`${bad.length} item(s) have no circular price or no regular price and will be skipped. Publish anyway?`))return;
  c.items.forEach(i=>{const p=prod(i.pid);if(p&&i.price&&hasPrice(p)){i.prevSale=p.sale??null;p.sale=i.price}});c.published=true;act('Published circular '+c.title);saveSet('Circular published');route()}
function crEnd(){const c=S.circular;if(!confirm('End the circular and restore regular prices?'))return;c.items.forEach(i=>{const p=prod(i.pid);if(p&&'prevSale' in i){p.sale=i.prevSale;delete i.prevSale}});c.published=false;act('Ended circular');saveSet('Circular ended');route()}

/* ---------- FEATURED PRODUCTS ---------- */
BO_VIEWS.featured=q=>{const f=P.filter(p=>p.featured);
  return head('Featured Products',`${f.length} featured — shown in the homepage carousel (priced items first).`)+`<div class="panel"><input type="search" placeholder="Search products to feature" oninput="ftSearch(this.value)"><div id="ftr"></div></div>`+
  prodTable(f,[['Price',p=>p.price?money(p.price):'<span class="tagx amber">No price</span>'],['',p=>`<button class="linkbtn red" onclick="ftSet('${p.id}',false)">Unfeature</button>`]],{page:+q.get('page')||1})};
function ftSearch(t){$('ftr').innerHTML=t.trim()?matches(t).filter(p=>!p.featured).slice(0,8).map(p=>`<div class="sg" style="grid-template-columns:1fr auto auto"><span>${esc(p.name)} <span class="mini muted">${esc(p.size)}</span></span>${priceHTML(p)}<button class="add-btn" onclick="ftSet('${p.id}',true)">Feature</button></div>`).join(''):''}
function ftSet(id,v){prod(id).featured=v;act(`${v?'Featured':'Unfeatured'} ${prod(id).name}`,id);saveAll();route()}

/* ---------- ITEM MASTER SYNC (POS) ---------- */
let SYNC=null;
BO_VIEWS.sync=()=>head('Item Master Sync','Match your POS item list to the website catalog and update prices.')+
  `<div class="panel"><ol class="small" style="padding-left:18px;margin-top:0"><li>Export the item list from your POS as Excel or CSV.</li><li>Upload it and choose which columns hold the code, description and price.</li><li>Review the matches, then apply. Codes are saved on each product so the next sync matches exactly.</li></ol>
   <input type="file" accept=".xlsx,.xls,.csv" onchange="syRead(this.files[0])" aria-label="POS item list"></div><div id="syb">${SYNC?syMapHTML():''}</div>
   <div class="panel tbl-wrap"><h3>Recent syncs</h3><table><tbody>${SYS.filter(x=>x.m.startsWith('Item Master Sync')).slice(0,10).map(x=>`<tr><td class="mini">${fmtT(x.t)}</td><td>${esc(x.m)}</td></tr>`).join('')||'<tr><td class="muted">None yet</td></tr>'}</tbody></table></div>`;
function syRead(f){if(!f||!window.XLSX){toast('Excel tools are still loading — try again');return}const fr=new FileReader();fr.onload=e=>{try{const wb=XLSX.read(e.target.result,{type:'array'}),rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{defval:''});if(!rows.length)throw 0;const cols=Object.keys(rows[0]);
  const guess=re=>cols.find(c=>re.test(c))||'';SYNC={file:f.name,rows,cols,map:{code:guess(/upc|code|plu|sku|barcode|item ?(no|#|num)/i),desc:guess(/desc|name|item/i),size:guess(/size|pack/i),price:guess(/price|retail|reg/i),sale:guess(/sale|promo/i)},res:null};$('syb').innerHTML=syMapHTML()}catch(err){toast('That file couldn’t be read');syslog('Item Master Sync: could not read '+f.name,'error')}};fr.readAsArrayBuffer(f)}
function syMapHTML(){const c=SYNC.cols,sel=(k,l,req)=>`<div><label>${l}${req?'':' (optional)'}</label><select onchange="SYNC.map.${k}=this.value;SYNC.res=null"><option value="">—</option>${c.map(x=>`<option ${x===SYNC.map[k]?'selected':''}>${esc(x)}</option>`).join('')}</select></div>`;
  return `<div class="panel"><h3>${esc(SYNC.file)} — ${SYNC.rows.length.toLocaleString()} POS items</h3><div class="grid2">${sel('code','Item code / UPC',1)}${sel('desc','Description',1)}${sel('size','Size',0)}${sel('price','Regular price',1)}${sel('sale','Sale price',0)}</div><button class="btn" style="margin-top:12px" onclick="syMatch()">Find matches</button></div>${SYNC.res?syResHTML():''}`}
const toks=s=>new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g,' ').split(' ').filter(w=>w.length>1&&!['oz','lb','ct','pk','the','and','with'].includes(w)));
function sim(a,b){let n=0;a.forEach(w=>{if(b.has(w))n++});return n/Math.max(1,Math.min(a.size,b.size)+Math.abs(a.size-b.size)/2)}
function syMatch(){const m=SYNC.map;if(!m.desc||!m.price){toast('Choose the description and price columns');return}
  const byUpc={};P.forEach(p=>{if(p.upc)byUpc[String(p.upc).trim()]=p});const pt=P.map(p=>[p,toks(p.name+' '+p.size)]),idx={};pt.forEach(([p,t],i)=>t.forEach(w=>(idx[w]=idx[w]||[]).push(i)));
  const res=SYNC.rows.map(r=>{const code=m.code?String(r[m.code]).trim():'',desc=String(r[m.desc]||''),price=parseFloat(String(r[m.price]).replace(/[$,]/g,'')),sale=m.sale?parseFloat(String(r[m.sale]).replace(/[$,]/g,'')):NaN;
    let p=code&&byUpc[code],how='code',score=1;
    if(!p){const t=toks(desc+' '+(m.size?r[m.size]:'')),cand={};t.forEach(w=>(idx[w]||[]).forEach(i=>cand[i]=1));let best=null,bs=0;Object.keys(cand).forEach(i=>{const s=sim(t,pt[i][1]);if(s>bs){bs=s;best=pt[i][0]}});if(bs>=.75){p=best;how='name';score=bs}}
    return {code,desc,price:isNaN(price)?null:price,sale:isNaN(sale)?null:sale,p,how,score,on:!!p&&(how==='code'||score>=.85)}});
  SYNC.res=res;if($('syb'))$('syb').innerHTML=syMapHTML()}
function syResHTML(){const r=SYNC.res,m=r.filter(x=>x.p),um=r.filter(x=>!x.p),ch=m.filter(x=>x.price&&x.price!==x.p.price);
  return `<div class="stats"><div><b>${m.filter(x=>x.how==='code').length}</b>Matched by code</div><div><b>${m.filter(x=>x.how==='name').length}</b>Matched by name</div><div><b>${um.length}</b>Not matched</div><div><b>${ch.length}</b>Price changes</div></div>
  <div class="panel tbl-wrap"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Matches</h3><div class="row"><label class="check" style="margin:0"><input type="checkbox" id="syonly" checked> Only update matched-by-name items I’ve checked</label><button class="btn lime" onclick="syApply()">Apply</button></div></div>
   <table><thead><tr><th></th><th>POS item</th><th>Website product</th><th>How</th><th>Price</th></tr></thead><tbody>${m.slice(0,400).map((x,i)=>`<tr><td><input type="checkbox" ${x.on?'checked':''} onchange="SYNC.res[${r.indexOf(x)}].on=this.checked" aria-label="Use match"></td><td class="mini">${esc(x.code)}<br>${esc(x.desc)}</td><td class="mini"><b>${esc(x.p.name)}</b><br>${esc(x.p.size)}</td><td><span class="tagx ${x.how==='code'?'':'amber'}">${x.how==='code'?'Code':'Name '+Math.round(x.score*100)+'%'}</span></td><td>${x.p.price?money(x.p.price):'—'} → <b>${x.price?money(x.price):'—'}</b></td></tr>`).join('')}</tbody></table>${m.length>400?'<p class="mini muted">Showing 400 of '+m.length+'. All checked matches are applied.</p>':''}</div>
  <div class="panel tbl-wrap"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Not matched (${um.length})</h3><button class="btn sm ghost" onclick="xlsx(SYNC.res.filter(x=>!x.p).map(x=>({Code:x.code,Description:x.desc,Price:x.price})),'Unmatched','CenterFresh_POS_unmatched.xlsx')">Export</button></div><p class="mini muted">Add these as products in Products Import, or put their code in the UPC field of the right product.</p></div>`}
function syApply(){let n=0,pc=0;SYNC.res.forEach(x=>{if(!x.p||!x.on)return;n++;if(x.code)x.p.upc=x.code;if(x.price&&x.price!==x.p.price){x.p.price=x.price;pc++}if(x.sale>0&&x.sale<x.price)x.p.sale=x.sale});
  syslog(`Item Master Sync: ${SYNC.file} — ${n} products matched, ${pc} prices changed, ${SYNC.res.filter(x=>!x.p).length} unmatched`);act(`Item Master Sync applied (${n} products)`);saveAll();SYNC=null;route();toast(`${n} products synced, ${pc} prices changed`)}

/* ---------- PRODUCTS IMPORT ---------- */
BO_VIEWS.import=()=>head('Products Import','Bring products, prices and photos in from Excel.')+
  `<div class="panel"><h3>Price sheet</h3><p class="small muted">Lists every product with its ID. Fill in prices, sale and case prices, departments or names, then upload it. Rows are matched by ID; rows without an ID become new products.</p><div class="row"><button class="btn" onclick="priceSheet()">Download price sheet</button><label class="btn ghost" style="margin:0">Upload sheet<input type="file" accept=".xlsx,.xls,.csv" onchange="importX(this.files[0]);syslog('Products Import: '+this.files[0].name)" hidden></label></div></div>
  <div class="panel"><h3>Product photos</h3><p class="small muted">Select many photos at once. Each is matched to the product with the same name.</p><input type="file" accept="image/*" multiple onchange="bulkPhotos(this.files)" aria-label="Product photos"></div>
  <div class="panel"><h3>Prices from your POS</h3><p class="small muted">Use <a href="#/admin/sync">Item Master Sync</a> to match your register’s item list by code or name.</p></div>`;
BO_VIEWS.products=q=>aProducts(q);

/* ---------- USER ROLES ---------- */
BO_VIEWS.roles=()=>{if(roleOf()!=='admin')return head('User Roles')+'<p class="muted">Only admins can manage staff.</p>';
  const st=USERS.filter(u=>u.role&&u.role!=='customer');
  return head('User Roles','Staff accounts and what each role can open.',`<button class="btn sm lime" onclick="urEdit()">Add staff</button>`)+
  `<div class="panel tbl-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>PIN</th><th>Status</th><th></th></tr></thead><tbody>${st.map(u=>`<tr><td><b>${esc(uname(u.email))}</b></td><td class="mini">${esc(u.email)}</td><td>${ROLES[u.role]}</td><td>${u.pin?'Set':'—'}</td><td>${u.active===false?'<span class="tagx red">Inactive</span>':'<span class="tagx">Active</span>'}</td><td><button class="btn sm ghost" onclick="urEdit(${qa(u.email)})">Edit</button></td></tr>`).join('')}</tbody></table></div>
  <div class="panel tbl-wrap"><h3>What each role can open</h3><table><thead><tr><th>Section</th>${Object.keys(ROLES).filter(r=>r!=='customer').map(r=>`<th>${ROLES[r]}</th>`).join('')}</tr></thead><tbody>${BO_MENU.flatMap(g=>g[1]).map(([k,l])=>`<tr><td>${l}</td>${Object.keys(ROLES).filter(r=>r!=='customer').map(r=>`<td>${r==='admin'||(ACCESS[r]||[]).includes(k)?'✓':''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`};
function urEdit(e){const u=e?USERS.find(x=>x.email===e):{email:'',first:'',last:'',role:'shopper',active:true};modal(`<h2>${e?'Edit':'Add'} staff</h2><div class="grid2"><div><label for="ur1">First name</label><input id="ur1" value="${esc(u.first)}"></div><div><label for="ur2">Last name</label><input id="ur2" value="${esc(u.last||'')}"></div></div><label for="ur3">Email (sign-in)</label><input id="ur3" type="email" value="${esc(u.email)}" ${e?'disabled':''}>
  <label for="ur4">Role</label><select id="ur4">${Object.entries(ROLES).map(([k,l])=>`<option value="${k}" ${k===u.role?'selected':''}>${l}</option>`).join('')}</select><div class="grid2"><div><label for="ur5">${e?'New password (blank = keep)':'Password'}</label><input id="ur5" type="password" minlength="6"></div><div><label for="ur6">4-digit PIN ${e?'(blank = keep)':''}</label><input id="ur6" type="password" inputmode="numeric" maxlength="4"></div></div>${chk('ur7',u.active!==false,'Active')}<button class="btn" style="margin-top:14px" onclick="urSave(${qa(e||'')})">Save</button>`)}
function urSave(e){const em=(e||$('ur3').value).trim().toLowerCase(),pw=$('ur5').value,pin=$('ur6').value,role=$('ur4').value;if(!em){toast('Email required');return}if(pin&&!/^\d{4}$/.test(pin)){toast('PIN must be 4 digits');return}
  let u=USERS.find(x=>x.email===em);if(!u){if(pw.length<6){toast('Password must be 6+ characters');return}u={email:em,fav:[],created:Date.now()};USERS.push(u)}
  if(e===me&&role!=='admin'&&!USERS.some(x=>x.role==='admin'&&x.email!==me&&x.active!==false)){toast('Keep at least one active admin');return}
  Object.assign(u,{first:$('ur1').value.trim(),last:$('ur2').value.trim(),role,active:$('ur7').checked});if(pw)u.pass=hash(pw);if(pin)u.pin=hash(pin);act(`Staff ${em}: ${ROLES[role]}${u.active?'':' (inactive)'}`);saveAll();closeModal();route()}
const _doLoginBO=window.doLogin;window.doLogin=function(e){const em=$('le').value.trim().toLowerCase(),u=USERS.find(x=>x.email===em);if(u&&u.active===false){e.preventDefault();$('lerr').textContent='This account is turned off. Ask a store admin.';return false}const r=_doLoginBO(e);if(me===em&&isStaffU())act('Signed in');return r};

/* ---------- VIEW ACTIVITY / VIEW LOG ---------- */
BO_VIEWS.activity=q=>{const who=q.get('who')||'',t=(q.get('q')||'').toLowerCase(),list=ACT.filter(a=>(!who||a.who===who)&&(!t||(a.what+' '+a.ref).toLowerCase().includes(t)));
  return head('View Activity','What staff did, newest first.',`<button class="btn sm ghost" onclick="xlsx(ACT.map(a=>({Time:new Date(a.t).toLocaleString(),Who:uname(a.who),What:a.what,Ref:a.ref})),'Activity','CenterFresh_Activity.xlsx')">Export</button>`)+
  `<div class="fbar"><div><label>Person</label><select onchange="hashSet('who',this.value)"><option value="">Everyone</option>${[...new Set(ACT.map(a=>a.who))].map(w=>`<option value="${esc(w)}" ${w===who?'selected':''}>${esc(uname(w))}</option>`).join('')}</select></div><div><label>Search</label><input type="search" value="${esc(q.get('q')||'')}" onkeydown="if(event.key==='Enter')hashSet('q',this.value)"></div></div>
  <div class="panel tbl-wrap"><table><thead><tr><th>When</th><th>Who</th><th>What</th></tr></thead><tbody>${list.slice(0,400).map(a=>`<tr><td class="mini">${fmtT(a.t)}</td><td>${esc(uname(a.who))}</td><td>${/^\d+$/.test(a.ref)?`<a href="#/admin/order/${a.ref}">${esc(a.what)}</a>`:esc(a.what)}</td></tr>`).join('')||'<tr><td class="muted">No activity yet</td></tr>'}</tbody></table></div>`};
BO_VIEWS.log=()=>head('View Log','System events: imports, syncs, settings and errors.',`<button class="btn sm ghost" onclick="if(confirm('Clear the log?')){SYS.length=0;DB.set('syslog',SYS);route()}">Clear</button>`)+
  `<div class="panel tbl-wrap"><table><thead><tr><th>When</th><th>Level</th><th>Event</th><th>By</th></tr></thead><tbody>${SYS.slice(0,500).map(x=>`<tr><td class="mini">${fmtT(x.t)}</td><td><span class="tagx ${x.level==='error'?'red':''}">${x.level}</span></td><td>${esc(x.m)}</td><td class="mini">${esc(uname(x.who))}</td></tr>`).join('')||'<tr><td class="muted">Nothing logged yet</td></tr>'}</tbody></table></div>`;
window.addEventListener('error',e=>{try{syslog('Page error: '+e.message,'error')}catch(_){}});

const _saveSettingsBO=window.saveSettings;window.saveSettings=function(e){const r=_saveSettingsBO(e);syncTowns();saveAll();syslog('Settings saved: Store general');act('Changed settings: Store general');return r};
/* =====================================================================
   STOREFRONT REFRESH · BRANDING · STICKERS (EBT / GLUTEN FREE / SPECIALS)
   API IMPORT · AUTO-CATEGORIZE · BACK OFFICE STYLE
   ===================================================================== */

/* ---------- branding defaults ---------- */
const BRAND_DEFAULT={name:'Center Fresh Supermarket',tagline:'Fresh groceries, delivered in Brooklyn',logo:'',
  colors:{accent:'#ac1a2d',nav:'#8b1525',annc:'#94d40b',header:'#ffffff',page:'#f8f6f4',sale:'#d7263d',ebt:'#1d5fd1',gf:'#2e7d32',caption:'#ffffff'},showCaption:true};
S.brand=Object.assign(JSON.parse(JSON.stringify(BRAND_DEFAULT)),S.brand||{});S.brand.colors=Object.assign({},BRAND_DEFAULT.colors,S.brand.colors||{});
if(!S.ebt)S.ebt={on:true,depts:['Produce','Fresh Meat','Fish','Deli','Provisions','Groceries','Beverages','Dairy & Eggs','Fresh Bakery','Sushi','Candy & Sweets','Frozen']};
if(S.catsVersion!==2){S.cats=null;S.catsVersion=2}       // new category lists came with the re-sorted catalog
EDIT_KEYS.push('ebt','desc');
const brandLogo=()=>S.brand.logo||'img/cf-logo.png';
function lum(hex){const h=hex.replace('#','');const [r,g,b]=[0,2,4].map(i=>parseInt(h.substr(i,2),16)/255).map(c=>c<=.03928?c/12.92:((c+.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b}
const onColor=hex=>{try{return lum(hex)>.45?'#1d1a16':'#ffffff'}catch(e){return '#fff'}};
function shade(hex,amt){const h=hex.replace('#','');let [r,g,b]=[0,2,4].map(i=>parseInt(h.substr(i,2),16));[r,g,b]=[r,g,b].map(c=>Math.max(0,Math.min(255,Math.round(c+amt))));return '#'+[r,g,b].map(c=>c.toString(16).padStart(2,'0')).join('')}
function applyBrand(){
  const c=S.brand.colors,root=document.documentElement.style;
  root.setProperty('--accent',c.accent);root.setProperty('--on-accent',onColor(c.accent));root.setProperty('--accent-dk',shade(c.accent,-25));
  root.setProperty('--nav',c.nav);root.setProperty('--on-nav',onColor(c.nav));root.setProperty('--annc',c.annc);root.setProperty('--on-annc',onColor(c.annc));
  root.setProperty('--hdr',c.header);root.setProperty('--on-hdr',onColor(c.header));root.setProperty('--page',c.page);
  root.setProperty('--sale',c.sale);root.setProperty('--ebt',c.ebt);root.setProperty('--gf',c.gf);root.setProperty('--cap',c.caption);root.setProperty('--on-cap',onColor(c.caption));
  document.querySelectorAll('.brand-logo').forEach(i=>{i.src=brandLogo();i.alt=S.brand.name});
  document.querySelectorAll('.brand-name').forEach(e=>e.textContent=S.brand.name);
  document.title=S.brand.name+' — Shop online';
  let fav=document.querySelector('link[rel=icon]');if(S.brand.logo&&fav)fav.href=S.brand.logo;
}

/* ---------- styles ---------- */
document.head.insertAdjacentHTML('beforeend',`<style>
:root{--accent:#c2d500;--on-accent:#1d1a16;--accent-dk:#a9ba00;--nav:#4a2a0c;--on-nav:#fff;--annc:#784311;--on-annc:#fff;--hdr:#fff;--on-hdr:#1d1a16;--page:#fafaf7;--sale:#d32f2f;--ebt:#1565c0;--gf:#2e7d32;--cap:#fff;--on-cap:#1d1a16}
body{background:var(--page)}
h1,h2,h3{letter-spacing:-.015em}
.btn{border-radius:8px}.btn.lime,.add-btn,.cartbtn{background:var(--accent)!important;color:var(--on-accent)!important}
.btn.lime:hover,.add-btn:hover{background:var(--accent-dk)!important}
.btn.ghost{border-radius:8px}
/* announcement bar */
.annc{background:var(--annc);color:var(--on-annc);font-size:.84rem;font-weight:600}
.annc .in{max-width:1320px;margin:0 auto;padding:7px 20px;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}
.annc a{color:inherit;text-decoration:none;margin-left:16px;opacity:.92}.annc a:hover{opacity:1;text-decoration:underline}
.annc b{font-variant-numeric:tabular-nums}
/* header */
header.top{background:var(--hdr);color:var(--on-hdr);box-shadow:0 1px 0 rgba(0,0,0,.08)}
.bar{max-width:1320px;padding:14px 20px;gap:28px}
.logo img{height:58px}
.search{max-width:none;display:flex}
.search input{border-radius:8px 0 0 8px!important;border:2px solid #d9d6cf!important;border-right:0!important;background:#fff!important;padding:.72em 1em!important;font-size:.98rem}
.search input:focus{border-color:var(--nav)!important;box-shadow:none}
.sbtn{border:0;background:var(--nav);color:var(--on-nav);width:54px;border-radius:0 8px 8px 0;cursor:pointer;display:grid;place-items:center}
#sugg{top:calc(100% + 4px);border-radius:10px}
.acts a,.acts button{color:var(--on-hdr);border-radius:8px}
.cartbtn{border-radius:8px!important;padding:.62em 1em!important}
.cartbtn .n{background:rgba(0,0,0,.18)!important;color:inherit}
/* nav + mega menu */
nav.depts{background:var(--nav);overflow:visible;position:relative}
nav.depts .in{max-width:1320px;padding:0 12px;overflow-x:auto;scrollbar-width:none}
nav.depts .in::-webkit-scrollbar{display:none}
nav.depts a{color:var(--on-nav);opacity:.92;font-size:.86rem;padding:.75em .75em;border-bottom:3px solid transparent}
nav.depts a:hover,nav.depts a.on{opacity:1;border-bottom-color:var(--accent)}
nav.depts a.sp{color:var(--accent);opacity:1}
.mega{position:absolute;left:0;right:0;top:100%;background:#fff;color:var(--ink);box-shadow:0 18px 40px rgba(0,0,0,.18);border-top:3px solid var(--accent);display:none;z-index:45}
.mega.on{display:block}
.mega .mi2{max-width:1320px;margin:0 auto;padding:20px 24px;display:grid;grid-template-columns:200px 1fr;gap:24px}
.mega img{width:200px;height:200px;object-fit:cover;border-radius:10px}
.mega h3{margin:0 0 10px}
.mega ul{columns:3 180px;list-style:none;margin:0;padding:0}
.mega li a{display:block;color:var(--ink);text-decoration:none;padding:5px 0;font-weight:500}
.mega li a:hover{color:var(--nav);text-decoration:underline}
/* hero */
.hero3{max-width:1320px;margin:18px auto 0;padding:0 20px}
.hero3 .frame{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:1800/400;background:#eee}
.hero3 .frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .7s}
.hero3 .frame img.on{opacity:1}
.wrap{max-width:1320px}
.hero3 .cap{position:absolute;left:64px;bottom:22px;background:var(--cap);color:var(--on-cap);border-radius:10px;padding:14px 18px;max-width:min(380px,55%);box-shadow:0 6px 24px rgba(0,0,0,.18)}
.hero3 .cap h2{font-size:clamp(1.05rem,2vw,1.45rem);margin:0 0 4px}
.hero3 .cap p{margin:0 0 10px;font-size:.9rem;opacity:.85}
.hero3 .arw{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.92);cursor:pointer;font-size:1.3rem;box-shadow:0 2px 10px rgba(0,0,0,.2);display:grid;place-items:center}
.hero3 .arw.l{left:12px}.hero3 .arw.r{right:12px}
.hero3 .dots2{display:flex;justify-content:center;gap:7px;margin-top:10px}
.hero3 .dots2 button{width:9px;height:9px;border-radius:50%;border:0;background:#cfcac0;cursor:pointer;padding:0}
.hero3 .dots2 button.on{background:var(--nav);width:22px;border-radius:9px}
/* promo tiles */
.promos{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:22px auto 0}
.promo{display:flex;gap:12px;align-items:center;background:#fff;border:1px solid #e7e4dd;border-radius:12px;padding:14px 16px;text-decoration:none;color:var(--ink)}
.promo:hover{border-color:var(--nav)}
.promo .ic{width:46px;height:46px;border-radius:10px;display:grid;place-items:center;font-weight:900;font-size:.85rem;color:#fff;flex-shrink:0}
.promo b{display:block;font-size:.98rem}.promo span{font-size:.82rem;color:var(--muted)}
/* department circles */
.circles{display:grid;grid-auto-flow:column;grid-auto-columns:112px;gap:14px;overflow-x:auto;padding:4px 2px 10px;scrollbar-width:thin}
.circles a{text-align:center;text-decoration:none;color:var(--ink);font-weight:600;font-size:.84rem;line-height:1.2}
.circles img{width:100px;height:100px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 8px;border:3px solid #fff;box-shadow:0 0 0 1px #e2ded5}
.circles a:hover img{box-shadow:0 0 0 2px var(--nav)}
/* section heads + carousels */
section.blk{margin:30px auto}
.blk-h{border-bottom:1px solid #e7e4dd;padding-bottom:8px}
.blk-h h2{font-size:1.35rem;margin:0}
.blk-h a{color:var(--nav)!important;font-size:.92rem}
.crow{position:relative}
.crow .carousel{grid-auto-columns:minmax(186px,206px);scroll-behavior:smooth;scrollbar-width:none}
.crow .carousel::-webkit-scrollbar{display:none}
.crow .nb{position:absolute;top:38%;width:36px;height:36px;border-radius:50%;border:1px solid #ddd;background:#fff;cursor:pointer;z-index:3;box-shadow:0 2px 8px rgba(0,0,0,.12);font-size:1.1rem}
.crow .nb.l{left:-14px}.crow .nb.r{right:-14px}
/* product card */
.pc{border:1px solid #e7e4dd;border-radius:10px;padding:12px;transition:box-shadow .15s,border-color .15s}
.pc:hover{box-shadow:0 6px 18px rgba(0,0,0,.08);border-color:#d8d3c8}
.pc .thumb{background:#fff!important;border-radius:6px}
.pc .thumb.photo img{object-fit:contain;padding:4px}
.pc .brandl{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-top:8px;font-weight:700;min-height:1em}
.pc .nm{margin-top:2px;font-size:.93rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.5em}
.pc .sz{font-size:.8rem}
.pc .pr{margin-top:6px;min-height:1.6em}
.pc .price{font-size:1.12rem}.pc .price.sale{color:var(--sale)}
.pc .foot{display:block;padding-top:8px}
.pc .foot .add-btn{width:100%;border-radius:8px;padding:.55em;font-size:.92rem}
.pc .foot .step{width:100%;justify-content:space-between;border-radius:8px}
.pc .foot .nop{display:block;text-align:center;padding:.5em;border:1px dashed #d9d6cf;border-radius:8px}
.stk{position:absolute;top:10px;left:10px;display:flex;flex-direction:column;gap:4px;z-index:2;align-items:flex-start}
.stk span{font-size:.66rem;font-weight:900;letter-spacing:.04em;color:#fff;padding:3px 7px;border-radius:4px;line-height:1.2;text-transform:uppercase}
.stk .s-sale{background:var(--sale)}.stk .s-ebt{background:var(--ebt)}.stk .s-gf{background:var(--gf)}.stk .s-deal{background:#f5a623;color:#1d1a16}.stk .s-oos{background:#6d6456}.stk .s-hid{background:#37474f}
.badges{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}
.badges span{font-size:.75rem;font-weight:800;color:#fff;padding:4px 9px;border-radius:5px;text-transform:uppercase;letter-spacing:.03em}
.fav{top:10px;right:10px;box-shadow:none;border:1px solid #e7e4dd}
/* tag pages */
.taghead{display:flex;gap:14px;align-items:center;margin:26px 0 10px}
.taghead .ic{width:54px;height:54px;border-radius:12px;display:grid;place-items:center;color:#fff;font-weight:900}
footer.site{background:var(--nav);color:var(--on-nav)}
footer.site h3{color:var(--accent)}
footer.site a{color:var(--on-nav)}
@media (max-width:900px){.promos{grid-template-columns:1fr 1fr}.mega{display:none!important}.crow .nb{display:none}}
@media (max-width:620px){.hero3 .frame{aspect-ratio:2.2/1}.hero3 .cap{left:10px;right:10px;bottom:10px;max-width:none;padding:10px 12px}.hero3 .cap p{display:none}.promos{gap:8px}.promo{padding:10px}.promo .ic{width:38px;height:38px}.annc .in>div:last-child{display:none}}

/* ===== back office look ===== */
body.bo-mode{background:#f3f4f6}
body.bo-mode header.top,body.bo-mode footer.site,body.bo-mode .annc,body.bo-mode .wrench{display:none}
body.bo-mode .bo{display:grid;grid-template-columns:240px 1fr;gap:0;margin:0;min-height:100vh;align-items:stretch}
body.bo-mode .bo-side{position:sticky;top:0;height:100vh;max-height:none;border:0;border-radius:0;background:#1f2328;color:#c9ced6;padding:0 0 16px;overflow-y:auto}
body.bo-mode .bo-brand{display:flex!important;align-items:center;gap:10px;padding:14px 16px!important;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:6px;color:#fff!important;border-radius:0!important}
body.bo-mode .bo-brand img{height:34px;width:auto;background:#fff;border-radius:6px;padding:3px}
body.bo-mode .bo-brand span{font-weight:800;font-size:.92rem;line-height:1.15}
body.bo-mode .bo-side h4{color:#7d8590;margin:16px 18px 6px;font-size:.7rem}
body.bo-mode .bo-side a{color:#c9ced6;border-radius:0;padding:.5em 18px;font-weight:600;font-size:.88rem;border-left:3px solid transparent}
body.bo-mode .bo-side a:hover{background:rgba(255,255,255,.06);color:#fff}
body.bo-mode .bo-side a.on{background:rgba(255,255,255,.1);color:#fff;border-left-color:var(--accent)}
body.bo-mode .bo-main{min-width:0;display:flex;flex-direction:column}
body.bo-mode .bo-top{position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid #e3e5e8;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 22px}
body.bo-mode .bo-title{font-size:1rem;white-space:nowrap}
body.bo-mode .bo-find{width:280px;max-width:40vw;padding:.45em .7em;border-radius:8px;font-size:.9rem}
body.bo-mode .bo-user{font-weight:700;font-size:.88rem;display:flex;flex-direction:column;line-height:1.1;text-align:right}
body.bo-mode .bo-user small{font-weight:600;color:var(--muted);font-size:.72rem}
body.bo-mode .bo-body{padding:22px 26px 40px;max-width:1400px;width:100%}
body.bo-mode .bo-body h1{font-size:1.5rem;font-family:var(--body);font-weight:800;letter-spacing:-.01em}
body.bo-mode .bo-head{margin-bottom:16px}
body.bo-mode .panel,body.bo-mode .ocard,body.bo-mode .fbar,body.bo-mode .stats>div{border:1px solid #e3e5e8;border-radius:10px;box-shadow:0 1px 2px rgba(16,24,40,.04)}
body.bo-mode .panel h3{font-family:var(--body);font-size:1rem;font-weight:800}
body.bo-mode table{font-size:.86rem}
body.bo-mode th{background:#f8f9fa;color:#5f6670;text-transform:uppercase;font-size:.7rem;letter-spacing:.05em;position:sticky;top:0}
body.bo-mode tbody tr:hover{background:#fafbfc}
body.bo-mode td,body.bo-mode th{padding:8px 10px}
body.bo-mode .stats b{font-family:var(--body);font-size:1.6rem;font-weight:800}
body.bo-mode .stats>div{font-size:.82rem;color:#5f6670}
body.bo-mode .btn{border-radius:7px;font-size:.88rem}
body.bo-mode .btn:not(.ghost):not(.lime):not(.danger){background:#1f2328}
body.bo-mode .schips a,body.bo-mode .setnav a{border-radius:7px;border-width:1px}
body.bo-mode .schips a.on,body.bo-mode .setnav a.on,body.bo-mode .admin-nav a.on{background:#1f2328;border-color:#1f2328}
body.bo-mode .vtabs a.on{border-bottom-color:#1f2328}
body.bo-mode .fbar{background:#fff}
body.bo-mode input,body.bo-mode select,body.bo-mode textarea{border-width:1px;border-radius:7px}
body.bo-mode .crumbs{margin-top:0}
body.bo-mode.standalone .bo{grid-template-columns:1fr}
body.bo-mode.standalone .bo-side,body.bo-mode.standalone .bo-top{display:none}
@media (max-width:900px){body.bo-mode .bo{grid-template-columns:1fr}body.bo-mode .bo-side{position:static;height:auto;display:flex;flex-wrap:wrap}body.bo-mode .bo-side h4{width:100%}body.bo-mode .bo-side a{border-left:0}body.bo-mode .bo-top{position:static;flex-wrap:wrap}body.bo-mode .bo-body{padding:16px}}
</style>`);

/* ---------- stickers: EBT, gluten free, specials ---------- */
const ALCO=/\b(?:wine|vodka|whisk(?:e)?y|beer|liqueur|bourbon|tequila|scotch|arak|moscato|champagne|cabernet|merlot|rum|brandy)\b/i;
function ebtP(p){if(!p||!S.ebt.on)return false;if(p.ebt!=null)return !!p.ebt;if(ALCO.test(p.name)&&!/grape juice|cooking wine|wine vinegar|sauce|cordials/i.test(p.name))return false;
  if(p.dept==='Baby Care')return p.sub==='Baby Food';return S.ebt.depts.includes(p.dept)}
const gfP=p=>!!p&&((p.attrs||[]).includes('Gluten Free')||/gluten[- ]?free/i.test(p.name)||(/\bgf\b/i.test(p.name)&&!['Fresh Meat','Deli'].includes(p.dept)));
const circIds=()=>circActive()?new Set(S.circular.items.map(i=>i.pid)):new Set();
const specialP=p=>!!p&&hasPrice(p)&&(!!p.sale||!!p.dealN||circIds().has(p.id));
function stickers(p){return `<div class="stk">${specialP(p)?'<span class="s-sale">Sale</span>':''}${p.dealN&&hasPrice(p)?`<span class="s-deal">${dealText(p)}</span>`:''}${ebtP(p)?'<span class="s-ebt">EBT</span>':''}${gfP(p)?'<span class="s-gf">Gluten free</span>':''}${oosP(p)?'<span class="s-oos">Out of stock</span>':''}${p.published===false?'<span class="s-hid">Hidden</span>':''}</div>`}

/* ---------- new product card ---------- */
window.card=function(p){
  const fav=user()?.fav?.includes(p.id),b=brandOf(p);
  return `<article class="pc">${stickers(p)}
   <button class="fav" onclick="toggleFav('${p.id}')" aria-label="${fav?'Remove from':'Add to'} My Items">${fav?'♥':'♡'}</button>
   ${isStaffU()&&editMode&&can('check')?`<button class="edit-pen" onclick="editP('${p.id}')">✎ Edit</button>`:''}
   <a href="#/p/${p.id}" class="${tcls(p)}" style="--h:${hue(p.dept)}">${pimg(p)}</a>
   <div class="brandl">${esc(b)}</div><a href="#/p/${p.id}" class="nm">${esc(p.name)}</a><span class="sz">${esc(p.size)||'&nbsp;'}${p.unit==='lb'?' · per lb':''}</span>
   <div class="pr">${priceHTML(p)}</div><div class="foot"><span id="ctl-${p.id}">${ctl(p)}</span></div></article>`;
};
const _ctl5=window.ctl;
window.ctl=p=>{const h=_ctl5(p);return h===''?'<span class="nop">Call to order</span>':h.replace('>Add<','>Add to cart<')};
const _vProduct5=window.vProduct;
window.vProduct=id=>{const p=prod(id);let h=_vProduct5(id);if(!p)return h;
  const bd=`<div class="badges">${specialP(p)?'<span style="background:var(--sale)">Sale</span>':''}${ebtP(p)?'<span style="background:var(--ebt)">EBT eligible</span>':''}${gfP(p)?'<span style="background:var(--gf)">Gluten free</span>':''}${(p.attrs||[]).filter(a=>a!=='Gluten Free').map(a=>`<span style="background:#6d6456">${esc(a)}</span>`).join('')}</div>`;
  h=h.replace(/(<\/h1>)/,`$1${brandOf(p)?`<div class="muted small" style="text-transform:uppercase;letter-spacing:.06em;font-weight:700">${esc(brandOf(p))}</div>`:''}${bd}`);
  if(p.desc)h=h.replace('<div class="prevnext">',`<p style="white-space:pre-line">${esc(p.desc)}</p><div class="prevnext">`);
  return h};

/* ---------- announcement bar + mega menu ---------- */
function renderAnnc(){
  const ci=cutoffInfo(),el=$('annc');if(!el)return;
  const left=ci.live?`🚚 Same-day delivery — order in <b>${ci.h}h ${String(ci.m).padStart(2,'0')}m</b> (cutoff ${ci.cut})`:`🚚 Next delivery: <b>${esc(ci.next)}</b>${ci.first?' · '+esc(ci.first):''}`;
  el.innerHTML=`<div class="in"><div>${left} · ${S.towns.map(esc).join(', ')}</div><div><a href="#/hours">Store hours</a><a href="#/delivery">Delivery info</a><a href="#/customer-service">Customer service</a>${S.phone?`<a href="tel:${esc(S.phone)}">${esc(S.phone)}</a>`:''}</div></div>`;
}
setInterval(renderAnnc,30000);
window.renderNav=function(parts){
  const nav=$('deptnav');
  nav.innerHTML=(circActive()?`<a class="sp ${parts[0]==='circular'?'on':''}" href="#/circular">Weekly Circular</a>`:'')+`<a class="sp ${parts[0]==='specials'?'on':''}" href="#/specials">Specials</a>`+
    DEPT_NAMES.map(d=>`<a class="${parts[0]==='dept'&&parts[1]===d?'on':''}" data-d="${esc(d)}" href="#/dept/${encodeURIComponent(d)}">${esc(d)}</a>`).join('')+
    `<a href="#/ebt" class="${parts[0]==='ebt'?'on':''}">EBT</a><a href="#/gluten-free" class="${parts[0]==='gluten-free'?'on':''}">Gluten Free</a><a href="#/recipes" class="${parts[0]==='recipes'?'on':''}">Recipes</a><a href="#/deli" class="${parts[0]==='deli'?'on':''}">Deli Menu</a>`;
  let mega=$('mega');if(!mega){nav.parentElement.insertAdjacentHTML('beforeend','<div class="mega" id="mega"></div>');mega=$('mega')}
  let t;nav.querySelectorAll('a[data-d]').forEach(a=>{a.onmouseenter=()=>{clearTimeout(t);const d=a.dataset.d;mega.innerHTML=`<div class="mi2"><img src="${esc(DEPTS[d][2])}" alt=""><div><h3>${esc(d)}</h3><ul>${DEPTS[d][1].map(s=>`<li><a href="#/dept/${encodeURIComponent(d)}?sub=${encodeURIComponent(s)}">${esc(s)}</a></li>`).join('')}<li><a href="#/dept/${encodeURIComponent(d)}"><b>Shop all ${esc(d)} →</b></a></li></ul></div></div>`;mega.classList.add('on')};a.onmouseleave=()=>{t=setTimeout(()=>mega.classList.remove('on'),180)}});
  mega.onmouseenter=()=>clearTimeout(t);mega.onmouseleave=()=>mega.classList.remove('on');mega.onclick=()=>mega.classList.remove('on');
  renderAnnc();
};

/* ---------- new homepage ---------- */
function crow(items){return `<div class="crow"><button class="nb l" aria-label="Scroll left" onclick="this.nextElementSibling.scrollBy({left:-640})">‹</button><div class="carousel">${items.map(card).join('')}</div><button class="nb r" aria-label="Scroll right" onclick="this.previousElementSibling.scrollBy({left:640})">›</button></div>`}
const pickRow=(arr,n=16)=>{const pr=arr.filter(hasPrice);return (pr.length>=6?pr:arr).slice(0,n)};
window.vHome=withVisible(function(){
  const spec=P.filter(specialP).sort((a,b)=>b.pop-a.pop),feat=P.filter(p=>p.featured).sort((a,b)=>(hasPrice(b)-hasPrice(a))||b.pop-a.pop);
  const row=(title,link,items)=>items.length?`<section class="blk"><div class="blk-h"><h2>${title}</h2><a href="${link}">View all →</a></div>${crow(items)}</section>`:'';
  const dep=d=>pickRow(P.filter(p=>p.dept===d&&isPic(p.img)).sort((a,b)=>(hasPrice(b)-hasPrice(a))||b.pop-a.pop));
  return `<section class="hero3"><div class="frame" id="banner"></div><div class="dots2" id="bdots"></div></section>
  <div class="wrap"><div class="promos">
   <a class="promo" href="#/specials"><span class="ic" style="background:var(--sale)">SALE</span><div><b>Weekly Specials</b><span>${spec.length?spec.length+' items on sale':'See this week’s deals'}</span></div></a>
   <a class="promo" href="#/ebt"><span class="ic" style="background:var(--ebt)">EBT</span><div><b>EBT / SNAP eligible</b><span>Pay with your EBT card</span></div></a>
   <a class="promo" href="#/gluten-free"><span class="ic" style="background:var(--gf)">GF</span><div><b>Gluten Free</b><span>${P.filter(gfP).length} products</span></div></a>
   <a class="promo" href="#/delivery"><span class="ic" style="background:var(--nav)">🚚</span><div><b>Same-day delivery</b><span>Order by ${h12(S.cutoffs[new Date().getDay()]??16)}</span></div></a></div>
  <section class="blk"><div class="blk-h"><h2>Shop by department</h2></div><div class="circles">${DEPT_NAMES.map(d=>`<a href="#/dept/${encodeURIComponent(d)}"><img src="${esc(DEPTS[d][2])}" alt="" loading="lazy">${esc(d)}</a>`).join('')}</div></section>
  ${row('Weekly Specials','#/specials',spec.slice(0,16))}
  ${row('Store favorites','#/search?q=nutmeg',pickRow(feat))}
  ${row('Fresh Bakery','#/dept/Fresh%20Bakery',dep('Fresh Bakery'))}
  ${row('Fresh Produce','#/dept/Produce',dep('Produce'))}
  ${row('Dairy & Eggs','#/dept/Dairy%20%26%20Eggs',dep('Dairy & Eggs'))}
  <section class="blk"><div class="blk-h"><h2>Cook it tonight</h2><a href="#/recipes">All recipes →</a></div><div class="rgrid">${RECIPES.slice().sort((a,b)=>(RECIPE_PHOTOS[b.id]?1:0)-(RECIPE_PHOTOS[a.id]?1:0)||b.pop-a.pop).slice(0,4).map(rcard).join('')}</div></section></div>`;
});
window.startHome=function(){
  clearInterval(bTimer);const el=$('banner');if(!el)return;
  el.innerHTML=BANNERS.map((b,i)=>`<img src="${esc(b.img)}" alt="${esc(b.h||'')}" ${i?'loading="lazy"':''}>`).join('')+`<div class="cap" id="bcap"></div><button class="arw l" aria-label="Previous banner" onclick="bannerGo((bIdx-1+BANNERS.length)%BANNERS.length)">‹</button><button class="arw r" aria-label="Next banner" onclick="bannerGo((bIdx+1)%BANNERS.length)">›</button>`;
  $('bdots').innerHTML=BANNERS.map((_,j)=>`<button aria-label="Banner ${j+1}" onclick="bannerGo(${j})"></button>`).join('');
  const show=i=>{if(!document.body.contains(el)){clearInterval(bTimer);return}bIdx=i;const b=BANNERS[i];el.querySelectorAll('img').forEach((im,j)=>im.classList.toggle('on',j===i));
    const cap=$('bcap');if(S.brand.showCaption&&(b.h||b.c)){cap.style.display='';cap.innerHTML=`${b.h?`<h2>${esc(b.h)}</h2>`:''}${b.p?`<p>${esc(b.p)}</p>`:''}${b.c?`<a class="btn sm lime" href="${esc(b.l||'#/')}">${esc(b.c)}</a>`:''}`}else cap.style.display='none';
    $('bdots').querySelectorAll('button').forEach((d,j)=>d.classList.toggle('on',j===i))};
  window.bannerGo=i=>{show(i);clearInterval(bTimer);bTimer=setInterval(()=>show((bIdx+1)%BANNERS.length),6500)};
  bannerGo(0);
};

/* ---------- EBT / gluten free / specials pages ---------- */
function vTag(kind,q){
  const K={ebt:['EBT / SNAP eligible','EBT','var(--ebt)',ebtP,'Items you can pay for with an EBT card. Final eligibility is confirmed at checkout.'],'gluten-free':['Gluten Free','GF','var(--gf)',gfP,'Products labeled gluten free. Always check the package if you have a medical need.']}[kind];
  const d=q.get('dept')||'',sort=q.get('sort')||'popular',pg=+q.get('page')||1,N=24;
  let list=P.filter(p=>vis(p)||isStaffU()).filter(K[3]);const depts=[...new Set(list.map(p=>p.dept))];if(d)list=list.filter(p=>p.dept===d);
  const s={popular:(a,b)=>(hasPrice(b)-hasPrice(a))||b.pop-a.pop,name:(a,b)=>a.name.localeCompare(b.name),low:(a,b)=>(hasPrice(b)-hasPrice(a))||unitPrice(a)-unitPrice(b),high:(a,b)=>(hasPrice(b)-hasPrice(a))||unitPrice(b)-unitPrice(a)};list.sort(s[sort]||s.popular);
  const pages=Math.max(1,Math.ceil(list.length/N));
  return `<div class="wrap"><div class="taghead"><span class="ic" style="background:${K[2]}">${K[1]}</span><div><h1 style="margin:0">${K[0]}</h1><p class="muted" style="margin:.2em 0 0">${K[4]}</p></div></div>
   <div class="chips"><a class="${!d?'on':''}" href="javascript:hashSet('dept','')">All <b>${P.filter(K[3]).length}</b></a>${depts.map(x=>`<a class="${x===d?'on':''}" href="javascript:hashSet('dept',${qa(x)})">${esc(x)}</a>`).join('')}</div>
   <div class="toolbar"><span class="muted">${list.length} products</span><select style="width:auto" onchange="hashSet('sort',this.value)" aria-label="Sort">${[['popular','Popular'],['name','Name A–Z'],['low','Lowest price'],['high','Highest price']].map(([v,l])=>`<option value="${v}" ${v===sort?'selected':''}>${l}</option>`).join('')}</select></div>
   <div class="pgrid">${list.slice((pg-1)*N,pg*N).map(card).join('')}</div>
   ${pages>1?`<nav class="pager">${pg>1?`<a href="javascript:hashSet('page',${pg-1})">‹</a>`:''}${pageNums(pg,pages).map(n=>n==='…'?'<b class="muted">…</b>':n===pg?`<span>${n}</span>`:`<a href="javascript:hashSet('page',${n})">${n}</a>`).join('')}${pg<pages?`<a href="javascript:hashSet('page',${pg+1})">›</a>`:''}</nav>`:''}</div>`;
}
const _route5=window.route;
window.route=function(){const h=location.hash.slice(1)||'/';const [path,qs]=h.split('?');const parts=path.split('/').filter(Boolean);const r=parts[0]||'';
  if(r==='ebt'||r==='gluten-free'){closeSugg();document.body.classList.remove('bo-mode','standalone');$('app').innerHTML=vTag(r,new URLSearchParams(qs||''));renderNav(parts);window.scrollTo(0,0);return}
  _route5();applyBrand();};

/* ---------- checkout: EBT summary + payment option ---------- */
const _vCheckout5=window.vCheckout;
window.vCheckout=function(){let h=_vCheckout5();if(!S.ebt.on||!me)return h;const c=getCart(),ebtAmt=c.reduce((a,it)=>a+(ebtP(prod(it.pid))?lineTotal(it):0),0);
  if(!c.length)return h;
  h=h.replace('<option>Pay at pickup / delivery</option>','<option>EBT / SNAP card for eligible items + card for the rest</option><option>Pay at pickup / delivery</option>');
  return h.replace('<div id="cosum"',`<div class="small" style="margin-top:8px"><span class="tagx blue">EBT</span> Eligible items: <b>${money(ebtAmt)}</b></div><div id="cosum"`)};
const _placeOrder5=window.placeOrder;
window.placeOrder=function(e){const r=_placeOrder5(e);const o=ORDERS.at(-1);if(o&&o.email===me&&o.ebtAmt==null){o.ebtAmt=+o.items.reduce((a,it)=>a+(ebtP(prod(it.pid))?lineTotal(it):0),0).toFixed(2);saveAll()}return r};

/* ---------- product editor: EBT + description ---------- */
const _editP5=window.editP;
window.editP=function(id){_editP5(id);const p=id?prod(id):{};
  const tax=$('e_tax');if(!tax)return;
  tax.closest('.row').insertAdjacentHTML('beforeend',`<label class="check" style="margin:0"><select id="e_ebt" style="width:auto"><option value="" ${p.ebt==null?'selected':''}>EBT: department default (${ebtP({...p,ebt:null})?'eligible':'not eligible'})</option><option value="1" ${p.ebt===true?'selected':''}>EBT eligible</option><option value="0" ${p.ebt===false?'selected':''}>Not EBT eligible</option></select></label>`);
  $('e_name').insertAdjacentHTML('afterend',`<label for="e_desc">Description <span class="muted small">(optional)</span></label><textarea id="e_desc" rows="2">${esc(p.desc||'')}</textarea>`)};
const _saveP5=window.saveP;
window.saveP=async function(id){const ev=$('e_ebt')?.value,desc=$('e_desc')?.value.trim();const before=new Set(P.map(p=>p.id));await _saveP5(id);
  const p=id?prod(id):P.find(x=>!before.has(x.id));if(!p)return;p.ebt=ev===''||ev==null?null:ev==='1';p.desc=desc||null;saveAll();route()};

/* bulk edit + price sheet: EBT */
const _bkForm5=window.bkForm;window.bkForm=function(){if($('bk').value==='ebt'){$('bkf').innerHTML='<label for="bv">EBT</label><select id="bv"><option value="">Department default</option><option value="1">EBT eligible</option><option value="0">Not EBT eligible</option></select>';return}_bkForm5()};
const _bkApply5=window.bkApply;window.bkApply=function(){if($('bk').value!=='ebt')return _bkApply5();const v=$('bv').value,ids=window._bulk||[];if(!ids.length||!confirm(`Set EBT on ${ids.length} products?`))return;ids.forEach(id=>{const p=prod(id);if(p)p.ebt=v===''?null:v==='1'});act(`Bulk EBT on ${ids.length} products`);saveAll();route();toast('Updated')};
BO_VIEWS.bulk=(f=>q=>f(q).replace('<option value="review">Mark ready for review</option>','<option value="ebt">EBT eligibility</option><option value="review">Mark ready for review</option>'))(BO_VIEWS.bulk);
window.priceSheet=function(){if(!window.XLSX){toast('Excel tools are still loading — try again');return}
  const rows=P.slice().sort((a,b)=>a.dept.localeCompare(b.dept)||a.name.localeCompare(b.name)).map(p=>({ID:p.id,Name:p.name,Brand:brandOf(p),Size:p.size,Department:p.dept,Subcategory:p.sub,Price:p.price??'',Unit:p.unit,SalePrice:p.sale||'',CaseQty:p.caseQty||'',CasePrice:p.caseP||'',DealQty:p.dealN||'',DealTotal:p.dealT||'',EBT:p.ebt==null?'':p.ebt?'yes':'no',GlutenFree:gfP(p)?'yes':'',UPC:p.upc||'',Featured:p.featured?'yes':'no'}));
  xlsx(rows,'Prices','CenterFresh_Price_Sheet.xlsx')};
const _importX5=window.importX;
window.importX=function(file){if(!file)return;if(!window.XLSX){toast('Excel tools are still loading — try again');return}
  const fr=new FileReader();fr.onload=e=>{try{const wb=XLSX.read(e.target.result,{type:'array'}),rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    rows.forEach(r=>{const p=r.ID&&prod(String(r.ID).trim());if(!p)return;if(r.EBT!=null&&r.EBT!=='')p.ebt=/^y/i.test(r.EBT);else if('EBT' in r)p.ebt=null;if(r.UPC)p.upc=String(r.UPC).trim();if(r.Brand&&r.Brand!==brandOf(p))p.brand=String(r.Brand).trim();if(/^y/i.test(String(r.GlutenFree||''))&&!gfP(p))p.attrs=[...(p.attrs||[]),'Gluten Free']})}catch(err){}_importX5(file)};fr.readAsArrayBuffer(file)};

/* ---------- auto-categorize (same rules used to sort the catalog) ---------- */
const RULES=(()=>{const R=window.CATALOG_RULES||{kw:[],pre:[]};return {kw:R.kw.map(([p,d,s,w])=>[new RegExp('\\b(?:'+p+')\\b','gi'),d,s,p.length,!!w]),pre:R.pre.map(([p,d,s])=>[new RegExp(p,'i'),d,s])}})();
function autoCat(name){
  let low=String(name||'').split(',')[0].replace(/\s+\d+(\.\d+)?\s*(oz|lb|ct|pk|gr|grm|g|ml|lt|fl oz)\b.*$/i,'').toLowerCase();
  low=low.replace(/\b[\w'&-]+ flavou?r(?:ed|s)?\b/g,' ').replace(/\b(?:sugar free|sugarless|s\/f|gluten free|nut free|low fat|fat free|reduced fat|no sugar added|organic|natural|all natural|original|classic|premium|family pack|value pack|mini|large|small|medium|jumbo|extra|lite|light|diet|zero|kosher)\b/g,' ').replace(/\s+/g,' ').trim();
  for(const [re,d,s] of RULES.pre)if(re.test(low))return [d,s];
  const parts=low.split(/\s(?:with|in|for|w\/|filled with|topped with|made with)\s/);
  for(const txt of (parts.length>1?[parts[0],low]:[low])){let best=null;
    for(const [re,d,s,L,weak] of RULES.kw){re.lastIndex=0;let m;while((m=re.exec(txt))){const key=[weak?0:1,m.index+m[0].length,m[0].length,L];if(!best||cmpKey(key,best[0])>0)best=[key,d,s];if(!m[0].length)re.lastIndex++}}
    if(best&&DEPTS[best[1]])return [best[1],best[2]]}
  return null}
function cmpKey(a,b){for(let i=0;i<a.length;i++){if(a[i]!==b[i])return a[i]-b[i]}return 0}
BO_VIEWS.categories=(f=>q=>f(q).replace('<div class="setnav">',`<div class="panel" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><b>Auto-sort products</b><div class="mini muted">Re-checks every product name and moves it to the right department and category. Products you moved yourself are left alone unless you choose otherwise.</div></div><div class="row"><button class="btn sm ghost" onclick="autoSortRun(false)">Preview</button></div></div><div class="setnav">`))(BO_VIEWS.categories);
function autoSortRun(apply,all){const ch=[];P.forEach(p=>{if(!all&&OVR[p.id]&&('dept' in OVR[p.id]||'sub' in OVR[p.id]))return;const r=autoCat(p.name);if(r&&(r[0]!==p.dept||r[1]!==p.sub)&&DEPTS[r[0]][1].includes(r[1]))ch.push([p,r])});
  if(apply){ch.forEach(([p,r])=>{p.dept=r[0];p.sub=r[1]});act(`Auto-sorted ${ch.length} products`);syslog(`Auto-sort moved ${ch.length} products`);saveAll();closeModal();route();toast(`${ch.length} products moved`);return}
  modal(`<h2>Auto-sort preview</h2><p>${ch.length?`${ch.length} products would move:`:'Everything is already where the rules would put it.'}</p><div style="max-height:50vh;overflow:auto"><table><tbody>${ch.slice(0,300).map(([p,r])=>`<tr><td class="mini"><b>${esc(p.name)}</b></td><td class="mini muted">${esc(p.dept)} › ${esc(p.sub)}</td><td class="mini">→ ${esc(r[0])} › ${esc(r[1])}</td></tr>`).join('')}</tbody></table></div>${ch.length?`<div class="row" style="margin-top:12px"><button class="btn lime" onclick="autoSortRun(true,${!!all})">Move ${ch.length} products</button>${all?'':`<button class="btn ghost" onclick="autoSortRun(false,true)">Include products I moved myself</button>`}</div>`:''}`)}

/* quick category fix in Check Products */
const _prodTable5=window.prodTable;
window.prodTable=function(list,cols,opts){if(cols.some(c=>c[0]==='Flags')&&!cols.some(c=>c[0]==='Department › Category'))cols=[cols[0],cols[1],['Department › Category',p=>`<select style="width:auto;max-width:240px;font-size:.82rem" onchange="qcat('${p.id}',this.value)" aria-label="Category">${DEPT_NAMES.map(d=>`<optgroup label="${esc(d)}">${DEPTS[d][1].map(s=>`<option value="${esc(d+'|'+s)}" ${p.dept===d&&p.sub===s?'selected':''}>${esc(d)} › ${esc(s)}</option>`).join('')}</optgroup>`).join('')}</select>`],...cols.slice(2)];return _prodTable5(list,cols,opts)};
function qcat(id,v){const p=prod(id),[d,s]=v.split('|');p.dept=d;p.sub=s;act(`Moved ${p.name} to ${d} › ${s}`,id);saveAll();toast('Moved to '+s)}
CHECKS.ebt=['EBT eligible',p=>ebtP(p)];CHECKS.noebt=['Not EBT',p=>!ebtP(p)];

/* ---------- settings: EBT section ---------- */
SET_SECTIONS.push(['ebt','EBT / SNAP']);
BO_VIEWS.settings=(f=>q=>{if((q.get('s')||'')!=='ebt')return f(q);const out=f(new URLSearchParams('s=general'));
  const body=`<div class="panel">${chk('eb1',S.ebt.on,'Accept EBT / SNAP and show EBT stickers')}<label>Departments that are EBT eligible by default</label><div class="row" style="gap:6px 16px">${DEPT_NAMES.map(d=>`<label class="check" style="margin:0"><input type="checkbox" class="ebd" value="${esc(d)}" ${S.ebt.depts.includes(d)?'checked':''}> ${esc(d)}</label>`).join('')}</div>
   <p class="mini muted">Alcohol is never eligible, and in Baby Care only Baby Food counts. Set any single product to eligible or not in its product editor, Bulk Edit or the price sheet (EBT column). Hot prepared food, vitamins and non-food items are generally not SNAP eligible — confirm with your EBT processor.</p>
   <p><b>${P.filter(ebtP).length.toLocaleString()}</b> products are currently EBT eligible.</p><button class="btn" onclick="S.ebt={on:eb1.checked,depts:[...document.querySelectorAll('.ebd:checked')].map(x=>x.value)};saveSet('EBT');route()">Save</button></div>`;
  return out.replace(/<h2>Store General<\/h2>[\s\S]*$/,'<h2>EBT / SNAP</h2>'+body).replace(/(<a class=")on(" href="#\/admin\/settings\?s=general">)/,'$1$2').replace('class="" href="#/admin/settings?s=ebt"','class="on" href="#/admin/settings?s=ebt"')})(BO_VIEWS.settings);

/* ---------- store branding ---------- */
BO_MENU[3][1].unshift(['branding','Store Branding']);BO_MENU[3][1].push(['api','API Import']);
BO_VIEWS.branding=()=>{if(roleOf()!=='admin')return head('Store Branding')+'<p class="muted">Only admins can change branding.</p>';const b=S.brand,c=b.colors;
  const col=(k,l)=>`<div><label for="bc_${k}">${l}</label><div class="row" style="flex-wrap:nowrap;gap:6px"><input type="color" id="bc_${k}" value="${c[k]}" style="width:52px;height:40px;padding:2px" oninput="brPreview()"><input value="${c[k]}" style="width:110px" oninput="if(/^#[0-9a-f]{6}$/i.test(this.value)){bc_${k}.value=this.value;brPreview()}" aria-label="${l} hex"></div></div>`;
  return head('Store Branding','Store name, logo and colors used on the website, receipts and back office.')+
  `<div class="two" style="margin-top:0"><div><div class="panel"><h3>Name &amp; logo</h3><label for="br1">Store name</label><input id="br1" value="${esc(b.name)}"><label for="br2">Tagline</label><input id="br2" value="${esc(b.tagline)}">
   <label>Logo</label><div class="row"><img src="${esc(brandLogo())}" alt="" style="height:64px;background:#fff;border:1px solid var(--line);border-radius:8px;padding:6px"><input type="file" id="br3" accept="image/*" style="max-width:260px">${b.logo?'<button class="btn sm ghost" onclick="S.brand.logo=\'\';saveSet(\'Logo reset\');applyBrand();route()">Use original logo</button>':''}</div><p class="mini muted">PNG or JPG, wide logos work best (about 600 × 300).</p></div>
   <div class="panel"><h3>Colors</h3><div class="grid2">${col('accent','Buttons & highlights')}${col('nav','Menu bar & footer')}${col('annc','Top announcement bar')}${col('header','Header background')}${col('page','Page background')}${col('caption','Banner caption box')}${col('sale','Sale sticker')}${col('ebt','EBT sticker')}${col('gf','Gluten free sticker')}</div>
    ${chk('br4',b.showCaption,'Show the headline box on homepage banners')}
    <div class="row" style="margin-top:14px"><button class="btn lime" onclick="brSave()">Save branding</button><button class="btn ghost" onclick="if(confirm('Reset all colors to the original Center Fresh colors?')){S.brand.colors={...BRAND_DEFAULT.colors};saveSet('Colors reset');applyBrand();route()}">Reset colors</button></div></div></div>
   <div class="panel"><h3>Preview</h3><div id="brpv"></div>${setTimeout(brPreview,0)&&''}<p class="mini muted">Banner pictures and text are under <a href="#/admin/banners">Banners</a>.</p></div></div>`};
function brVals(){const c={};Object.keys(BRAND_DEFAULT.colors).forEach(k=>c[k]=$('bc_'+k).value);return c}
function brPreview(){const c=brVals(),el=$('brpv');if(!el)return;el.innerHTML=`<div style="border:1px solid var(--line);border-radius:10px;overflow:hidden;font-size:.8rem;background:${c.page}"><div style="background:${c.annc};color:${onColor(c.annc)};padding:5px 10px">🚚 Same-day delivery…</div><div style="background:${c.header};color:${onColor(c.header)};padding:10px;display:flex;gap:10px;align-items:center"><img src="${esc(brandLogo())}" style="height:30px" alt=""><span style="flex:1;border:2px solid #ddd;border-radius:6px;padding:4px 8px;color:#999;background:#fff">Search</span><span style="background:${c.accent};color:${onColor(c.accent)};padding:4px 10px;border-radius:6px;font-weight:700">Cart</span></div><div style="background:${c.nav};color:${onColor(c.nav)};padding:7px 10px;font-weight:700">Specials · Produce · Bakery</div><div style="padding:12px;display:flex;gap:10px"><div style="background:#fff;border:1px solid #e7e4dd;border-radius:8px;padding:8px;width:130px;position:relative"><div style="display:flex;flex-direction:column;gap:3px;position:absolute;top:6px;left:6px"><span style="background:${c.sale};color:#fff;font-size:.6rem;font-weight:900;padding:2px 5px;border-radius:3px">SALE</span><span style="background:${c.ebt};color:#fff;font-size:.6rem;font-weight:900;padding:2px 5px;border-radius:3px">EBT</span><span style="background:${c.gf};color:#fff;font-size:.6rem;font-weight:900;padding:2px 5px;border-radius:3px">GLUTEN FREE</span></div><div style="height:70px"></div><b>Product</b><div style="color:${c.sale};font-weight:800">$3.99</div><div style="background:${c.accent};color:${onColor(c.accent)};text-align:center;border-radius:6px;padding:4px;margin-top:6px;font-weight:700">Add to cart</div></div><div style="background:${c.caption};color:${onColor(c.caption)};border-radius:8px;padding:10px;align-self:flex-end;box-shadow:0 2px 10px rgba(0,0,0,.15)"><b>Banner headline</b></div></div></div>`}
async function brSave(){const f=$('br3').files[0];if(f){S.brand.logo=await new Promise(res=>{const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,600/im.width),cv=document.createElement('canvas');cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);res(cv.toDataURL('image/png'))};im.src=fr.result};fr.readAsDataURL(f)})}
  Object.assign(S.brand,{name:$('br1').value.trim()||'Center Fresh Supermarket',tagline:$('br2').value.trim(),colors:brVals(),showCaption:$('br4').checked});saveSet('Branding');applyBrand();route()}

/* ---------- API IMPORT ---------- */
const API_FIELDS=[['id','Item ID'],['upc','UPC / barcode'],['name','Product name *'],['brand','Brand'],['size','Size'],['desc','Description'],['price','Price'],['sale','Sale price'],['dept','Department'],['sub','Category'],['img','Image URL'],['ebt','EBT eligible (true/false)'],['gf','Gluten free (true/false)'],['stock','Stock on hand'],['published','Published / active'],['caseQty','Units per case'],['caseP','Case price'],['weighted','Sold by weight (true/false)']];
if(!S.api)S.api={url:'',method:'GET',headers:'',body:'',itemsPath:'',page:{type:'none',param:'page',sizeParam:'limit',size:100,start:1,max:50},map:{},matchBy:'upc',createNew:true,autoCat:true,deptMap:{},update:{price:true,sale:true,name:false,img:true,dept:false,ebt:true,stock:true,desc:true,brand:true,size:true,published:true}};
let APIRUN={sample:null,keys:[],status:''};
const getPath=(o,p)=>!p?o:p.split('.').reduce((a,k)=>a==null?a:a[k],o);
function flatKeys(o,pre='',out=[]){if(o&&typeof o==='object'&&!Array.isArray(o))for(const k in o){const v=o[k],kk=pre?pre+'.'+k:k;if(v&&typeof v==='object'&&!Array.isArray(v))flatKeys(v,kk,out);else out.push(kk)}return out}
const truthy=v=>v===true||/^(true|yes|y|1|active|on)$/i.test(String(v??'').trim());
BO_VIEWS.api=()=>{if(roleOf()!=='admin')return head('API Import')+'<p class="muted">Only admins can set up API imports.</p>';const a=S.api;
  const sel=k=>`<select id="am_${k}" style="width:100%"><option value="">— not used —</option>${APIRUN.keys.concat(a.map[k]&&!APIRUN.keys.includes(a.map[k])?[a.map[k]]:[]).map(x=>`<option ${a.map[k]===x?'selected':''}>${esc(x)}</option>`).join('')}</select>`;
  return head('API Import','Pull item information (names, prices, pictures, departments, EBT, stock) from your POS or supplier API.')+
  `<div class="panel"><h3>1 · Connection</h3><div class="grid2"><div style="grid-column:1/-1"><label for="ap1">API address (URL)</label><input id="ap1" value="${esc(a.url)}" placeholder="https://api.example.com/v1/items"></div>
   <div><label for="ap2">Method</label><select id="ap2"><option ${a.method==='GET'?'selected':''}>GET</option><option ${a.method==='POST'?'selected':''}>POST</option></select></div><div><label for="ap5">Where the item list is in the response</label><input id="ap5" value="${esc(a.itemsPath)}" placeholder="e.g. data.items (blank if the response is the list)"></div>
   <div style="grid-column:1/-1"><label for="ap3">Headers — one per line, like <code>Authorization: Bearer YOUR_KEY</code></label><textarea id="ap3" rows="3" placeholder="Authorization: Bearer …&#10;x-api-key: …">${esc(a.headers)}</textarea></div>
   <div style="grid-column:1/-1"><label for="ap4">Request body (POST only, JSON)</label><textarea id="ap4" rows="2">${esc(a.body)}</textarea></div>
   <div><label for="ap6">Paging</label><select id="ap6"><option value="none" ${a.page.type==='none'?'selected':''}>One request returns everything</option><option value="page" ${a.page.type==='page'?'selected':''}>Page number</option><option value="offset" ${a.page.type==='offset'?'selected':''}>Offset / skip</option></select></div>
   <div class="grid2" style="gap:0 8px"><div><label for="ap7">Page parameter</label><input id="ap7" value="${esc(a.page.param)}"></div><div><label for="ap8">Size parameter</label><input id="ap8" value="${esc(a.page.sizeParam)}"></div><div><label for="ap9">Page size</label><input id="ap9" type="number" value="${a.page.size}"></div><div><label for="ap10">Max pages</label><input id="ap10" type="number" value="${a.page.max}"></div></div></div>
   <div class="row" style="margin-top:14px"><button class="btn" onclick="apiTest()">Test connection</button><label class="btn ghost" style="margin:0">Or load a JSON file<input type="file" accept=".json,application/json" hidden onchange="apiFile(this.files[0])"></label><span class="mini" id="apst">${esc(APIRUN.status)}</span></div>
   <p class="mini muted">The request goes straight from your browser to the API, so your key stays on this computer. If the API blocks browser requests (a “CORS” error), export the items as a JSON file and load it here instead, or connect the API through the Google Sheets backend.</p></div>
  ${APIRUN.sample?`<div class="panel"><h3>Sample item</h3><pre style="max-height:220px;overflow:auto;background:#f8f9fa;padding:10px;border-radius:8px;font-size:.78rem">${esc(JSON.stringify(APIRUN.sample,null,2))}</pre></div>`:''}
  <div class="panel"><h3>2 · Match the fields</h3>${APIRUN.keys.length?'':'<p class="mini muted">Test the connection or load a file first to see the API’s field names.</p>'}
   <div class="grid2">${API_FIELDS.map(([k,l])=>`<div><label for="am_${k}">${l}</label>${sel(k)}</div>`).join('')}</div></div>
  <div class="panel"><h3>3 · How to import</h3><div class="grid2"><div><label for="ap11">Match existing products by</label><select id="ap11">${[['upc','UPC / barcode, then name'],['id','Item ID'],['name','Name and size']].map(([v,l])=>`<option value="${v}" ${a.matchBy===v?'selected':''}>${l}</option>`).join('')}</select></div><div><label>&nbsp;</label>${chk('ap12',a.createNew,'Add items that aren’t on the website yet')}</div></div>
   ${chk('ap13',a.autoCat,'Sort new items into categories automatically when the API department doesn’t match')}
   <label>Update these fields on existing products</label><div class="row" style="gap:6px 16px">${Object.entries(a.update).map(([k,v])=>`<label class="check" style="margin:0"><input type="checkbox" class="apu" value="${k}" ${v?'checked':''}> ${({price:'Price',sale:'Sale price',name:'Name',img:'Picture',dept:'Department',ebt:'EBT',stock:'Stock',desc:'Description',brand:'Brand',size:'Size',published:'Published'})[k]}</label>`).join('')}</div>
   <div class="row" style="margin-top:14px"><button class="btn ghost" onclick="apiSave()">Save settings</button><button class="btn lime" onclick="apiImport()">Import now</button></div><div id="apres"></div></div>`};
function apiCollect(){const a=S.api;Object.assign(a,{url:$('ap1').value.trim(),method:$('ap2').value,headers:$('ap3').value,body:$('ap4').value,itemsPath:$('ap5').value.trim(),matchBy:$('ap11').value,createNew:$('ap12').checked,autoCat:$('ap13').checked});
  a.page={type:$('ap6').value,param:$('ap7').value.trim()||'page',sizeParam:$('ap8').value.trim(),size:+$('ap9').value||100,start:a.page.start??1,max:+$('ap10').value||50};
  API_FIELDS.forEach(([k])=>{const v=$('am_'+k)?.value;if(v!==undefined)a.map[k]=v});document.querySelectorAll('.apu').forEach(c=>a.update[c.value]=c.checked)}
function apiSave(){apiCollect();saveSet('API import');}
function apiHeaders(){const h={'Accept':'application/json'};S.api.headers.split('\n').forEach(l=>{const i=l.indexOf(':');if(i>0)h[l.slice(0,i).trim()]=l.slice(i+1).trim()});if(S.api.method==='POST')h['Content-Type']='application/json';return h}
async function apiFetchPage(n){const a=S.api;let url=a.url;if(a.page.type!=='none'){const u=new URL(url);u.searchParams.set(a.page.param,a.page.type==='page'?a.page.start+n:n*a.page.size);if(a.page.sizeParam)u.searchParams.set(a.page.sizeParam,a.page.size);url=u.toString()}
  const r=await fetch(url,{method:a.method,headers:apiHeaders(),body:a.method==='POST'&&a.body?a.body:undefined});if(!r.ok)throw new Error('The API answered '+r.status+' '+r.statusText);const j=await r.json();const items=getPath(j,a.itemsPath);if(!Array.isArray(items))throw new Error('No item list found'+(a.itemsPath?' at “'+a.itemsPath+'”':' — fill in where the item list is'));return items}
function apiLearn(items){APIRUN.sample=items[0];APIRUN.keys=[...new Set(items.slice(0,20).flatMap(i=>flatKeys(i)))];
  const guess={id:/^(id|item_?id|sku|itemnumber|item_?no)$/i,upc:/upc|barcode|gtin|ean|plu/i,name:/^(name|title|description|item_?name|product_?name)$/i,brand:/brand|manufacturer/i,size:/size|uom|pack/i,desc:/desc|details|long/i,price:/^(price|retail|reg(ular)?_?price|unit_?price)$/i,sale:/sale|promo/i,dept:/dep(ar)?t/i,sub:/categ|class|subdep/i,img:/image|img|photo|picture/i,ebt:/ebt|snap|food_?stamp/i,gf:/gluten/i,stock:/stock|qty|quantity|on_?hand|inventory/i,published:/active|published|enabled|visible/i,caseQty:/case_?(qty|size|pack)|pack_?qty/i,caseP:/case_?price/i,weighted:/weigh|by_?weight|scale/i};
  API_FIELDS.forEach(([k])=>{if(!S.api.map[k]){const hit=APIRUN.keys.find(x=>guess[k].test(x.split('.').pop()));if(hit)S.api.map[k]=hit}})}
async function apiTest(){apiCollect();APIRUN.status='Connecting…';$('apst').textContent=APIRUN.status;
  try{const items=await apiFetchPage(0);apiLearn(items);APIRUN.status=`✓ Connected — ${items.length} items on the first page`;syslog('API test OK: '+items.length+' items')}catch(e){APIRUN.status='✗ '+(e.message==='Failed to fetch'?'The browser couldn’t reach the API (often a CORS block or a wrong address). Try loading a JSON file instead.':e.message);syslog('API test failed: '+e.message,'error')}route()}
let APIFILE=null;
function apiFile(f){if(!f)return;apiCollect();const fr=new FileReader();fr.onload=()=>{try{const j=JSON.parse(fr.result),items=getPath(j,S.api.itemsPath)||(Array.isArray(j)?j:null);if(!Array.isArray(items))throw new Error('No item list found — fill in where the item list is');APIFILE=items;apiLearn(items);APIRUN.status=`✓ File loaded — ${items.length} items`;route()}catch(e){toast(e.message)}};fr.readAsText(f)}
function mapDept(extD,extS,name){const norm=s=>String(s||'').toLowerCase().replace(/[^a-z]/g,'');
  for(const d of DEPT_NAMES){for(const s of DEPTS[d][1]){if(extS&&norm(s)===norm(extS))return [d,s]}}
  const d=DEPT_NAMES.find(x=>norm(x)===norm(extD)||norm(extD).includes(norm(x))||norm(x).includes(norm(extD)||'#'));
  const a=autoCat(name);if(d&&a&&a[0]===d)return a;if(d)return [d,a&&a[0]===d?a[1]:DEPTS[d][1][0]];return a}
async function apiImport(){apiCollect();saveAll();const a=S.api,m=a.map;if(!m.name){toast('Choose which field is the product name');return}
  const res=$('apres');res.innerHTML='<p class="mini">Importing…</p>';let items=[];
  try{if(APIFILE&&!a.url)items=APIFILE;else{for(let n=0;n<(a.page.type==='none'?1:a.page.max);n++){const pg=await apiFetchPage(n);items=items.concat(pg);res.innerHTML=`<p class="mini">Fetched ${items.length} items…</p>`;if(a.page.type==='none'||pg.length<a.page.size)break}}}
  catch(e){if(APIFILE){items=APIFILE}else{res.innerHTML=`<p class="err">${esc(e.message)}</p>`;syslog('API import failed: '+e.message,'error');return}}
  const byUpc={},byId={},byName={};P.forEach(p=>{if(p.upc)byUpc[String(p.upc)]=p;byId[p.id]=p;byName[(p.name+'|'+p.size).toLowerCase()]=p});
  let upd=0,add=0,skip=0,uncat=0;const U=a.update,num=v=>{const x=parseFloat(String(v??'').replace(/[$,]/g,''));return isNaN(x)?null:x};
  items.forEach(it=>{const g=k=>m[k]?getPath(it,m[k]):undefined,name=String(g('name')??'').trim();if(!name){skip++;return}
    const upc=g('upc')!=null?String(g('upc')).trim():'',xid=g('id')!=null?String(g('id')).trim():'',size=String(g('size')??'').trim();
    let p=(a.matchBy!=='name'&&upc&&byUpc[upc])||(a.matchBy==='id'&&xid&&(byId['api_'+xid]||P.find(x=>x.extId===xid)))||byName[(name+'|'+size).toLowerCase()];
    const vals={price:num(g('price')),sale:num(g('sale')),img:g('img')?String(g('img')):null,desc:g('desc')?String(g('desc')):null,brand:g('brand')?String(g('brand')):null,size:size||null,stock:num(g('stock')),ebt:m.ebt?truthy(g('ebt')):undefined,published:m.published?truthy(g('published')):undefined,caseQty:num(g('caseQty')),caseP:num(g('caseP'))};
    if(p){if(U.price&&vals.price>0)p.price=vals.price;if(U.sale&&m.sale)p.sale=vals.sale>0&&vals.sale<(p.price||1e9)?vals.sale:null;if(U.name)p.name=name;if(U.img&&vals.img)p.img=vals.img;if(U.desc&&vals.desc)p.desc=vals.desc;if(U.brand&&vals.brand)p.brand=vals.brand;if(U.size&&vals.size)p.size=vals.size;
      if(U.stock&&vals.stock!=null)p.stock=vals.stock;if(U.ebt&&vals.ebt!==undefined)p.ebt=vals.ebt;if(U.published&&vals.published!==undefined)p.published=vals.published?undefined:false;
      if(U.dept&&(g('dept')||g('sub'))){const r=mapDept(g('dept'),g('sub'),name);if(r){p.dept=r[0];p.sub=r[1]}}
      if(upc&&!p.upc)p.upc=upc;if(m.gf&&truthy(g('gf'))&&!gfP(p))p.attrs=[...(p.attrs||[]),'Gluten Free'];if(vals.caseQty)p.caseQty=vals.caseQty;if(vals.caseP)p.caseP=vals.caseP;upd++}
    else if(a.createNew){let r=(g('dept')||g('sub'))?mapDept(g('dept'),g('sub'),name):null;if(!r&&a.autoCat)r=autoCat(name);if(!r){r=['Groceries',DEPTS.Groceries[1].includes('Other')?'Other':DEPTS.Groceries[1][0]];uncat++}
      const np={id:xid?'api_'+xid:'p'+Date.now()+add,extId:xid||null,name,size:vals.size||'',dept:r[0],sub:r[1],price:vals.price,sale:vals.sale,img:vals.img||DEPTS[r[0]][0],emoji:DEPTS[r[0]][0],unit:truthy(g('weighted'))?'lb':'ea',pop:50,featured:false,upc:upc||null,brand:vals.brand,desc:vals.desc,stock:vals.stock,ebt:vals.ebt,caseQty:vals.caseQty,caseP:vals.caseP};
      if(m.gf&&truthy(g('gf')))np.attrs=['Gluten Free'];if(vals.published===false)np.published=false;P.push(np);if(upc)byUpc[upc]=np;add++}
    else skip++});
  const msg=`API import: ${items.length} items — ${upd} updated, ${add} added${uncat?` (${uncat} need a category)`:''}, ${skip} skipped`;syslog(msg);act(msg);saveAll();
  res.innerHTML=`<p style="color:var(--lime-deep);font-weight:700">${esc(msg)}</p>`;toast(`${upd} updated, ${add} added`)}

/* boot */
applyBrand();
/* =====================================================================
   POLISH: full-width storefront, side cart panel, typography,
   back office dashboard, icons, clearer filters and tables
   ===================================================================== */
document.head.insertAdjacentHTML('beforeend',`<style>
html{font-size:16.5px}
body{font-family:var(--body);-webkit-font-smoothing:antialiased;letter-spacing:-.003em}
h1,h2,h3,.btn,.price,.logo b{font-family:var(--display)}
h1{font-weight:800;letter-spacing:-.025em}h2{font-weight:800;letter-spacing:-.02em}h3{font-weight:700}
/* full width */
.wrap,.annc .in,.bar,nav.depts .in,.hero3,.mega .mi2{max-width:none!important}
.wrap{padding:0 clamp(16px,2.4vw,36px)}
.annc .in,.bar,nav.depts .in{padding-left:clamp(16px,2.4vw,36px);padding-right:clamp(16px,2.4vw,36px)}
.hero3{padding:0 clamp(16px,2.4vw,36px)}
.bar{padding-top:16px;padding-bottom:16px}
.logo img{height:64px}
.search input{font-size:1.02rem;padding:.85em 1.1em!important}
.sbtn{width:60px}
.acts a,.acts button{font-size:.98rem;padding:.6em .85em}
.cartbtn{font-size:1rem!important;padding:.7em 1.1em!important}
nav.depts a{font-size:.93rem;padding:.85em .9em;font-weight:700}
.hero3 .frame{border-radius:14px}
.promo b{font-size:1.04rem}.promo{padding:16px 18px}
.circles{grid-auto-columns:128px}.circles img{width:116px;height:116px}.circles a{font-size:.9rem}
.blk-h h2{font-size:1.55rem}
.pgrid{grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:18px}
.crow .carousel{grid-auto-columns:minmax(210px,226px);gap:18px}
.pc{padding:14px}.pc .nm{font-size:.98rem;font-weight:600}.pc .price{font-size:1.2rem;font-weight:800}
.pc .foot .add-btn{padding:.65em;font-size:.97rem;font-weight:700}
.shop{grid-template-columns:250px 1fr;gap:32px}
.side a{font-size:.97rem;padding:.45em .7em}
footer.site{font-size:.97rem}
/* shell with side cart */
.shell{display:flex;align-items:flex-start}
.shell>#app{flex:1;min-width:0}
#sidecart{display:none;width:370px;flex-shrink:0;position:sticky;top:var(--hdrH,130px);height:calc(100vh - var(--hdrH,130px));background:#fff;border-left:1px solid #e7e4dd;flex-direction:column}
body.sc-on #sidecart{display:flex}
#sidecart .sc-h{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid #eee}
#sidecart .sc-h h2{font-size:1.2rem;margin:0}
#sidecart .sc-b{flex:1;overflow-y:auto;padding:4px 18px;position:relative}
#sidecart .sc-f{border-top:1px solid #eee;padding:14px 18px;background:#fbfaf7}
#sidecart .ln{display:grid;grid-template-columns:52px 1fr auto;gap:10px;padding:12px 0;border-bottom:1px solid #f0eee9;align-items:start}
#sidecart .ln .thumb{width:52px;height:52px;font-size:1.5rem;background:#fff!important;border:1px solid #f0eee9}
#sidecart .ln .thumb img{object-fit:contain}
#sidecart .ln .n{font-weight:600;font-size:.88rem;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#sidecart .ln .step{margin-top:6px}#sidecart .ln .step button{width:28px;height:28px}
#sidecart .ln b{font-size:.92rem;white-space:nowrap}
#sidecart .x2{border:0;background:none;color:var(--muted);cursor:pointer;font-size:.8rem;font-weight:700;padding:2px 0 0 8px}
#sidecart.pulse{animation:scpulse .9s ease}
@keyframes scpulse{0%{box-shadow:inset 4px 0 0 var(--accent)}100%{box-shadow:inset 0 0 0 transparent}}
#sidecart .ln.new{animation:scnew 1.2s ease}
@keyframes scnew{0%{background:#fffbe0}100%{background:transparent}}
#sidecart .empty2{text-align:center;padding:40px 10px;color:var(--muted)}
#sidecart .empty2 .e{font-size:2.6rem}
.toast.act{cursor:pointer}
.toast .ta{margin-left:10px;text-decoration:underline;font-weight:800}
@media (max-width:1499px){body.sc-on .shop{grid-template-columns:1fr}body.sc-on .side{display:none}}
@media (max-width:1199px){body.sc-on #sidecart{display:none}}

/* ===== back office shape-up ===== */
body.bo-mode{font-size:15.5px}
body.bo-mode .bo{grid-template-columns:256px 1fr}
body.bo-mode .bo-side a{display:flex!important;align-items:center;gap:11px;padding:.58em 18px;font-size:.92rem}
body.bo-mode .bo-side a svg{width:18px;height:18px;flex-shrink:0;opacity:.85}
body.bo-mode .bo-side a.on svg{opacity:1;color:var(--accent)}
body.bo-mode .bo-side h4{cursor:pointer;display:flex;justify-content:space-between;align-items:center;user-select:none}
body.bo-mode .bo-side h4::after{content:"▾";font-size:.8rem}
body.bo-mode .bo-side .grp.closed a{display:none!important}
body.bo-mode .bo-side .grp.closed h4::after{content:"▸"}
body.bo-mode .bo-top{padding:12px 26px}
body.bo-mode .bo-find{width:340px;padding:.55em .8em;font-size:.95rem}
body.bo-mode .bo-body{padding:26px 30px 48px;max-width:1600px}
body.bo-mode .bo-head{align-items:center;padding-bottom:14px;border-bottom:1px solid #e3e5e8;margin-bottom:18px}
body.bo-mode .bo-head h1{font-size:1.65rem}
body.bo-mode .bo-head p{font-size:.95rem}
body.bo-mode .panel{padding:20px 22px}
body.bo-mode table{font-size:.9rem}
body.bo-mode td{padding:11px 12px}
body.bo-mode th{padding:10px 12px}
body.bo-mode tr.rowlink{cursor:pointer}
body.bo-mode tr.rowlink:hover{background:#f5f7ff}
body.bo-mode .fbar{gap:12px;padding:14px 16px}
body.bo-mode .fbar label{font-size:.72rem;text-transform:uppercase;letter-spacing:.05em}
body.bo-mode .status{font-size:.78rem;padding:.25em .75em}
body.bo-mode .toast{top:calc(18px + env(safe-area-inset-top,0px));bottom:auto;transform:translateX(-50%) translateY(-120px)}
body.bo-mode .toast.on{transform:translateX(-50%)}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-bottom:20px}
.kpi{background:#fff;border:1px solid #e3e5e8;border-radius:12px;padding:16px 18px;text-decoration:none;color:var(--ink);display:block;transition:border-color .15s,box-shadow .15s}
.kpi:hover{border-color:#b8bec6;box-shadow:0 4px 14px rgba(16,24,40,.07)}
.kpi small{display:block;color:#5f6670;font-weight:700;font-size:.78rem;text-transform:uppercase;letter-spacing:.05em}
.kpi b{display:block;font-size:2rem;font-weight:800;margin:4px 0 2px;letter-spacing:-.02em}
.kpi span{font-size:.84rem;color:#5f6670}
.kpi.warn b{color:#b45309}.kpi.good b{color:#15803d}
.dgrid{display:grid;grid-template-columns:1.6fr 1fr;gap:18px;align-items:start}
.slotbar{display:grid;grid-template-columns:140px 1fr 60px;gap:10px;align-items:center;margin:8px 0;font-size:.88rem}
.slotbar .meter{margin:0;height:10px}
.attn a{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid #f0f1f3;text-decoration:none;color:var(--ink);font-weight:600}
.attn a:last-child{border-bottom:0}
.attn a b{background:#fff2cc;color:#8a6200;border-radius:999px;padding:.1em .7em;font-size:.85rem}
.attn a b.ok{background:#e7f6ec;color:#15803d}
.qa{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.qa a,.qa button{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid #e3e5e8;border-radius:10px;background:#fff;text-decoration:none;color:var(--ink);font-weight:700;font-size:.9rem;cursor:pointer;font-family:inherit;text-align:left}
.qa a:hover,.qa button:hover{border-color:#1f2328}
.qa svg{width:20px;height:20px}
.bo-burger{display:none;border:0;background:none;font-size:1.5rem;cursor:pointer}
@media (max-width:1100px){.dgrid{grid-template-columns:1fr}}
@media (max-width:900px){body.bo-mode .bo-side{display:none}body.bo-mode.bo-nav .bo-side{display:block;position:fixed;inset:0 30% 0 0;z-index:80;overflow-y:auto}.bo-burger{display:block}body.bo-mode .bo-find{width:100%;max-width:none}}
</style>`);

/* ---------- side cart ---------- */
const SC_ROUTES=['','dept','search','specials','p','ebt','gluten-free','circular','recipes','recipe','my-items','deli','wrench'];
var scWanted=()=>{const r=(location.hash.slice(1)||'/').split('?')[0].split('/').filter(Boolean)[0]||'';return SC_ROUTES.includes(r)&&!document.body.classList.contains('bo-mode')&&(()=>{try{return localStorage.getItem('nutmeg_scHide')!=='1'}catch(e){return true}})()};
function shellSetup(){if($('sidecart'))return;const app=$('app'),sh=document.createElement('div');sh.className='shell';app.parentNode.insertBefore(sh,app);sh.appendChild(app);sh.insertAdjacentHTML('beforeend','<aside id="sidecart" aria-label="Your cart"></aside>');
  const setH=()=>document.documentElement.style.setProperty('--hdrH',document.querySelector('header.top').offsetHeight+'px');setH();window.addEventListener('resize',setH)}
let scNew=null;
function renderSideCart(){
  const el=$('sidecart');if(!el)return;document.body.classList.toggle('sc-on',scWanted());if(!scWanted())return;
  if(!me){el.innerHTML=`<div class="sc-h"><h2>Your cart</h2></div><div class="sc-b"><div class="empty2"><div class="e">🧺</div><p>Sign in to start your cart. Your items are saved for next time.</p><button class="btn lime" onclick="openLogin()">Sign in</button><p class="small"><a href="javascript:openLogin('','up')">Create an account</a></p></div></div>`;return}
  const c=getCart(),st=subtotal(c),pct=Math.min(100,st/S.minOrder*100),open=lastOpenOrder(),n=c.reduce((a,i)=>a+(i.mode==='case'?1:Math.ceil(i.qty)),0);
  el.innerHTML=`<div class="sc-h"><h2>Your cart <span class="muted" style="font-weight:600;font-size:.9rem">(${n} item${n===1?'':'s'})</span></h2>${c.length?`<button class="x2" onclick="if(confirm('Empty your cart?'))setCart([])">Empty</button>`:''}</div>
  <div class="sc-b">${c.length?c.map((it,i)=>{const p=prod(it.pid);return `<div class="ln ${scNew===it.pid?'new':''}"><a href="#/p/${it.pid}" class="${tcls(p)}" style="--h:${hue(p?.dept)}">${p?pimg(p):'🛒'}</a><div><a href="#/p/${it.pid}" class="n" style="text-decoration:none;color:inherit">${esc(p?.name||'Item')}</a><div class="mini muted">${esc(p?.size||'')}${it.mode==='case'?' · case':''}</div>${it.note?`<div class="mini" style="color:var(--brown-2)">“${esc(it.note)}”</div>`:''}
    <div class="row" style="gap:6px"><span class="step"><button onclick="cartBump(${i},-1)" aria-label="Less">−</button><span>${qtyLabel(it,p)}</span><button onclick="cartBump(${i},1)" aria-label="More">+</button></span><button class="x2" onclick="cartNote(${i})">Note</button><button class="x2" onclick="cartRemove(${i})">Remove</button></div></div><b>${money(lineTotal(it))}</b></div>`}).join('')
    :`<div class="empty2"><div class="e">🧺</div><p>Your cart is empty.<br>Add items and they’ll show up here.</p></div>`}</div>
  ${c.length?`<div class="sc-f"><div class="sum t" style="margin-top:0"><span>Subtotal</span><span>${money(st)}</span></div>
    ${st<S.minOrder?`<div class="meter"><i style="width:${pct}%"></i></div><div class="mini muted">Add <b>${money(S.minOrder-st)}</b> more to reach the ${money(S.minOrder)} minimum.</div>`:`<div class="mini muted">Weighed items are estimated; the final charge uses actual weights.</div>`}
    <button class="btn lime" style="width:100%;margin-top:10px;padding:.8em" ${st<S.minOrder?'disabled':''} onclick="go('/checkout')">Check out · ${money(st)}</button>
    ${open?`<button class="btn ghost" style="width:100%;margin-top:8px" onclick="addToLast()">Add to order #${open.id}</button>`:''}</div>`:''}`;
  if(scNew){const ln=el.querySelector('.ln.new'),sb=el.querySelector('.sc-b');if(ln&&sb)sb.scrollTop=Math.max(0,ln.offsetTop-40);el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse');scNew=null}
}
const _renderActs6=window.renderActs;
window.renderActs=function(){_renderActs6();renderSideCart()};
const _addToCart6=window.addToCart;
window.addToCart=function(pid,...a){const before=getCart().length;_addToCart6(pid,...a);if(!me||oosP(prod(pid))||!hasPrice(prod(pid)))return;scNew=pid;renderSideCart();
  if(!document.body.classList.contains('sc-on')||window.innerWidth<1200){const t=$('toast');t.innerHTML=`✓ Added ${esc(prod(pid).name)} <span class="ta">View cart</span>`;t.classList.add('act');t.onclick=()=>{t.classList.remove('on');openDrawer()}}};
window.openDrawer=(f=>function(){if(document.body.classList.contains('sc-on')&&window.innerWidth>=1200){const el=$('sidecart');el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse');return}f()})(window.openDrawer);
const _route6=window.route;
window.route=function(){_route6();renderSideCart();if(document.body.classList.contains('bo-mode'))boEnhance()};
document.addEventListener('DOMContentLoaded',()=>{shellSetup();renderSideCart()});

/* ---------- back office: icons, collapsible groups, dashboard ---------- */
const I=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICONS={dashboard:I('<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>'),orders:I('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>'),shopper:I('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>'),cashier:I('<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>'),delivery:I('<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),pickup:I('<path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),production:I('<path d="M6 13.9V20h12v-6.1"/><path d="M18 13.9a4 4 0 1 0-2.6-7.4 4 4 0 0 0-6.8 0A4 4 0 1 0 6 13.9"/>'),standalone:I('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/>'),'order-items':I('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),'cashier-items':I('<path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2z"/><path d="M8 9h8M8 13h6"/>'),stock:I('<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/>'),check:I('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),issues:I('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'),reports:I('<path d="M18 20V10M12 20V4M6 20v-6"/>'),bulk:I('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),settings:I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),customers:I('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),accounts:I('<path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/>'),branding:I('<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.5-.8 1.5-1.6 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16a6 6 0 0 0 6-6c0-4.9-4.5-8.6-10-8.6z"/>'),banners:I('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'),categories:I('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),menus:I('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/>'),discounts:I('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><path d="M7 7h.01"/>'),circular:I('<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>'),featured:I('<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z"/>'),sync:I('<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/>'),import:I('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'),api:I('<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'),roles:I('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),activity:I('<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'),log:I('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>')};
BO_MENU.unshift(['Home',[['dashboard','Dashboard']]]);
ACCESS.manager.push('dashboard');
const BO_HINT={dashboard:'Today at a glance',orders:'Every order, all days',shopper:'Pick orders',cashier:'Charge finished orders',delivery:'Drivers and routes',pickup:'Customer pickups',production:'Deli & catering prep',standalone:'Full-screen picking for tablets','order-items':'What to pull for open orders','cashier-items':'What was sold',stock:'In stock / out of stock',check:'Browse and fix products',issues:'Problems in the data',reports:'Sales, brands, shoppers, tips',bulk:'Change many products at once',settings:'Delivery, tax, slots, printers…',customers:'Customer accounts',accounts:'House charge accounts',branding:'Name, logo and colors',banners:'Homepage pictures',categories:'Departments and categories',menus:'Deli menu pictures',discounts:'Checkout codes',circular:'Weekly deals',featured:'Homepage products',sync:'Prices from your POS',import:'Excel price sheet & photos',api:'Pull items from an API',roles:'Staff and permissions',activity:'What staff did',log:'System events'};
const BO_CLOSED=new Set((()=>{try{return JSON.parse(localStorage.getItem('nutmeg_boClosed')||'[]')}catch(e){return []}})());
function boEnhance(){const side=document.querySelector('.bo-side');if(!side||side.dataset.ok)return;side.dataset.ok=1;
  side.querySelectorAll('a[href^="#/admin/"]').forEach(a=>{const k=a.getAttribute('href').split('/')[2];if(ICONS[k])a.insertAdjacentHTML('afterbegin',ICONS[k]);if(BO_HINT[k])a.title=BO_HINT[k]});
  // wrap each heading + its links in a collapsible group
  [...side.querySelectorAll('h4')].forEach(h=>{const g=document.createElement('div');g.className='grp'+(BO_CLOSED.has(h.textContent)?' closed':'');h.before(g);let n=h.nextElementSibling;g.appendChild(h);while(n&&n.tagName==='A'&&!n.classList.contains('bo-brand')){const nx=n.nextElementSibling;g.appendChild(n);n=nx}
    if(g.querySelector('a.on'))g.classList.remove('closed');h.onclick=()=>{g.classList.toggle('closed');g.classList.contains('closed')?BO_CLOSED.add(h.textContent):BO_CLOSED.delete(h.textContent);try{localStorage.setItem('nutmeg_boClosed',JSON.stringify([...BO_CLOSED]))}catch(e){}}});
  const top=document.querySelector('.bo-top .row');if(top&&!top.querySelector('.bo-burger'))top.insertAdjacentHTML('afterbegin','<button class="bo-burger" aria-label="Menu" onclick="document.body.classList.toggle(\'bo-nav\')">☰</button>');
  side.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('bo-nav')));
}
BO_VIEWS.dashboard=()=>{
  const t=todayStr(),os=ORDERS.filter(o=>o.date===t&&o.status!=='Canceled'),cnt=f=>os.filter(f).length;
  const toPick=cnt(o=>['Received','Processing','On Hold'].includes(o.status)),toCharge=ORDERS.filter(o=>o.status==='Processed').length,out=cnt(o=>o.stage==='Out for delivery'),pickups=cnt(o=>o.method==='Pickup'&&['Processed','Charged'].includes(o.status)&&o.stage!=='Picked up');
  const sales=ORDERS.filter(o=>o.status==='Charged'&&o.charge&&ymd(new Date(o.charge.t))===t).reduce((a,o)=>a+(o.final||0),0);
  const slots=allWindows(t),noPrice=P.filter(p=>!hasPrice(p)).length,issues=dataIssues().length,oos=P.filter(oosP).length,unread=MSGS.filter(m=>!m.read).length,hold=ORDERS.filter(o=>o.status==='On Hold').length,uncat=P.filter(p=>p.sub==='Other').length;
  const recent=ORDERS.slice().sort((a,b)=>b.created-a.created).slice(0,8);
  const kpi=(l,v,sub,href,cls='')=>`<a class="kpi ${cls}" href="${href}"><small>${l}</small><b>${v}</b><span>${sub}</span></a>`;
  const hr=new Date().getHours(),hi=hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
  return head(`${hi}, ${esc((user()?.first||'').trim()||'there')}`,new Date().toLocaleDateString([], {weekday:'long',month:'long',day:'numeric'}))+
  `<div class="kpis">${kpi('Orders today',os.length,`${cnt(o=>o.method==='Delivery')} delivery · ${cnt(o=>o.method==='Pickup')} pickup`,'#/admin/orders')}${kpi('To pick',toPick,toPick?'Open Personal Shopper':'All picked','#/admin/shopper',toPick?'warn':'good')}${kpi('Ready to charge',toCharge,toCharge?'Open Cashier':'Nothing waiting','#/admin/cashier',toCharge?'warn':'good')}${kpi('Out for delivery',out,'Delivery Manager','#/admin/delivery')}${kpi('Pickups waiting',pickups,'Pickup Manager','#/admin/pickup')}${kpi('Charged today',money(sales),'Reports','#/admin/reports?t=sales')}</div>
  <div class="dgrid"><div>
   <div class="panel"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Today’s time slots</h3><a class="small" href="#/admin/settings?s=slots">Capacity</a></div>${slots.length?slots.map(s=>{const n=os.filter(o=>o.slot===s).length,cap=slotCap(t,s);return `<div class="slotbar"><span>${s}</span><div class="meter"><i style="width:${Math.min(100,n/cap*100)}%;${n>=cap?'background:var(--tomato)':''}"></i></div><b style="text-align:right">${n}/${cap}</b></div>`}).join(''):'<p class="muted">No delivery windows today.</p>'}</div>
   <div class="panel tbl-wrap"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Latest orders</h3><a class="small" href="#/admin/orders?date=">All orders</a></div>${recent.length?`<table style="margin-top:8px"><tbody>${recent.map(o=>`<tr class="rowlink" onclick="go('/admin/order/${o.id}')"><td><b>#${o.id}</b></td><td>${esc(o.name)}</td><td class="mini">${prettyDate(o.date)} · ${o.slot}</td><td>${o.method}</td><td>${stBadge(o.status)}</td><td style="text-align:right">${money(o.final||o.total)}</td></tr>`).join('')}</tbody></table>`:'<p class="muted">No orders yet. They’ll appear here as soon as customers check out.</p>'}</div></div>
  <div><div class="panel"><h3>Needs attention</h3><div class="attn">
    <a href="#/admin/shopper?date=&status=On%20Hold">Orders on hold <b class="${hold?'':'ok'}">${hold}</b></a>
    <a href="#/admin/check?c=noprice">Products without a price <b class="${noPrice?'':'ok'}">${noPrice.toLocaleString()}</b></a>
    <a href="#/admin/check?c=nocat">Products in “Other” <b class="${uncat?'':'ok'}">${uncat}</b></a>
    <a href="#/admin/stock?show=oos">Out of stock <b class="${oos?'':'ok'}">${oos}</b></a>
    <a href="#/admin/issues">Data issues <b class="${issues?'':'ok'}">${issues}</b></a>
    ${can('settings')?`<a href="#/admin/messages">Unread messages <b class="${unread?'':'ok'}">${unread}</b></a>`:''}</div></div>
   <div class="panel"><h3>Quick actions</h3><div class="qa">
    <button onclick="editP()">${ICONS.check}Add a product</button><a href="#/admin/order-items">${ICONS['order-items']}Today’s pick list</a>
    <button onclick="priceSheet()">${ICONS.import}Price sheet</button><a href="#/admin/banners">${ICONS.banners}Banners</a>
    <a href="#/admin/discounts">${ICONS.discounts}Discount code</a><a href="#/" >${ICONS.shopper}View store</a></div></div></div></div>`;
};
BO_VIEWS.messages=()=>head('Messages','Contact form messages and password reset requests.')+aMessages();
ACCESS.manager.push('messages');

/* clear filters + clickable rows */
const _fbar6=window.fbar;
window.fbar=(f,keys)=>_fbar6(f,keys).replace(/<\/div>$/,`<div style="margin-left:auto"><label>&nbsp;</label><button class="btn sm ghost" onclick="clearFilters()">Clear filters</button></div></div>`);
function clearFilters(){const p=location.hash.slice(1).split('?')[0];location.hash=p+'?date='+todayStr()}
BO_VIEWS.orders=(f=>q=>f(q).replace(/<tr><td><input type="checkbox" class="omc" value="([^"]+)"/g,`<tr class="rowlink" data-id="$1" onclick="if(!event.target.closest('a,button,input,select,label'))go('/admin/order/'+this.dataset.id)"><td><input type="checkbox" class="omc" value="$1"`))(BO_VIEWS.orders);
BO_VIEWS.customers=(f=>q=>f(q).replace(/<tr><td><b>([^<]*)<\/b>(.*?)<a class="btn sm ghost" href="#\/admin\/customer\/([^"]+)">Open<\/a><\/td><\/tr>/g,`<tr class="rowlink" onclick="if(!event.target.closest('a,button'))go('/admin/customer/$3')"><td><b>$1</b>$2<a class="btn sm ghost" href="#/admin/customer/$3">Open</a></td></tr>`))(BO_VIEWS.customers);
window.toast=(f=>m=>{const t=$('toast');t.classList.remove('act');t.onclick=null;f(m)})(window.toast);
