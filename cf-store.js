/* =====================================================================
   CENTER FRESH — STOREFRONT
   Header with delivery/pickup selector, mega menu, home page, listing
   filters, product page, cart with substitutions & save-for-later,
   checkout, account, flyer, buy again, shopping-list search, info pages,
   and sign-in through Supabase.
   ===================================================================== */
document.head.appendChild(document.querySelector('link[href^="cf.css"]'));   // our styles win over older injected ones
const sbc=CF.sb;

/* ---------- first-run store defaults ---------- */
if(!S.cfInit){
  Object.assign(S,{cfInit:1,
    siteMsg:'Fresh groceries, same-day delivery & pickup',
    oosOptions:[['Call me; if no answer, substitute','We call or text first. If we can’t reach you, we pick the closest match'],['Substitute with similar','Our shopper picks the closest match'],['Call or text me to review','We hold the item until you answer'],['Don’t substitute — refund','Leave it out of the order']],
    checkoutChecks:[{text:'I understand prices for items sold by weight are estimates and my card will be charged the final amount.',req:true},{text:'I accept the service fee for this order.',req:true}],
    tipOptions:[0,5,10,15],noAlcohol:true,doorPolicy:'If no one is home, we leave the order at your door at your own risk. Perishables are packed cold.',
    toggles:{faq:true,candles:false,lockLocation:false}});
  if(Array.isArray(S.areas))S.areas.forEach(a=>{if(a.discOver==null){a.discOver=0;a.discFee=null;a.noDays=''}});
}
S.recipes=S.recipes||null;
RECIPE_CATS.splice(0,RECIPE_CATS.length,'Breads & Breakfast','Chicken & Meat','Cold Soups','Condiments','Dairy Recipes','Desserts','Drinks','Fish','Hot Soups','Pasta & Grains','Salads','Side Dishes','Vegetable Dishes');
const RMAP={Soups:'Hot Soups',Kugels:'Side Dishes',Meat:'Chicken & Meat',Chicken:'Chicken & Meat',Fish:'Fish',Salads:'Salads',Breakfast:'Breads & Breakfast',Kids:'Pasta & Grains',Desserts:'Desserts'};
RECIPES.forEach(r=>{if(RMAP[r.cat])r.cat=RMAP[r.cat]});
const EXTRA_RECIPES=CF.cache.recipes||[];EXTRA_RECIPES.forEach(r=>{if(!RECIPES.some(x=>x.id===r.id))RECIPES.push(r)});

/* ---------- delivery fee with discounted-fee threshold ---------- */
window.feeFor=(o,sub)=>{if(o.method!=='Delivery')return S.pickupFee??S.fee;const a=areaOf(o.town);if(!a)return S.fee;if(a.discOver>0&&sub>=a.discOver&&a.discFee!=null)return +a.discFee;return a.fee??S.fee};
/* no-service days per area */
const _slotsForCF=window.slotsFor;
window.slotsFor=d=>{const nd=String(S.noServiceDays||'').split(/[\s,]+/).filter(Boolean);if(nd.includes(d))return [];return _slotsForCF(d)};

/* ---------- icons ---------- */
const IC=d=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICN={truck:IC('<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),bag:IC('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>'),cart:IC('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>'),user:IC('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),grid:IC('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'),plus:IC('<path d="M12 5v14M5 12h14"/>'),clock:IC('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),pin:IC('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),repeat:IC('<path d="m17 1 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'),heart:IC('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.5z"/>')};

/* ===================================================================
   FULFILLMENT — chosen up front, shown in header and cart
   =================================================================== */
function getFul(){const u=user();return (u&&u.ful)||DB.get('ful',null)||{method:'Delivery'}}
function setFul(f){const u=user();if(u){u.ful=f;saveAll()}else DB.set('ful',f);renderFul()}
function fulOK(f=getFul()){return !!(f.date&&f.slot&&slotsFor(f.date).includes(f.slot))}
function fulText(f=getFul()){if(!fulOK(f))return {t:f.method==='Pickup'?'Pickup':'Delivery',b:'Choose a time'};
  return {t:f.method==='Pickup'?'Pickup at the store':'Delivery'+(f.town?' to '+f.town:''),b:prettyDate(f.date)+', '+f.slot}}
function renderFul(){const el=$('cfful');if(!el)return;const f=getFul(),x=fulText(f);el.classList.toggle('warn',!!f.date&&!fulOK(f));
  el.innerHTML=`<span class="ic">${f.method==='Pickup'?ICN.bag:ICN.truck}</span><span><small>${esc(x.t)}</small><b>${esc(x.b)}</b></span>`;el.setAttribute('aria-label','Delivery or pickup time: '+x.t+', '+x.b);
  if(document.body.classList.contains('sc-on'))renderSideCart()}
let SP={};
function openSlot(){const f=getFul(),u=user();SP={method:f.method||'Delivery',town:f.town||(u?.addresses?.find(a=>a.def)||u?.addresses?.[0])?.town||S.areas.find(a=>a.active)?.name,addr:f.addr??0,date:f.date&&allWindows(f.date).length?f.date:null,slot:f.slot};slotModal()}
function slotModal(){const u=user(),areas=S.areas.filter(a=>a.active),days=[];for(let i=0;i<10;i++){const d=ymd(new Date(Date.now()+i*864e5));if(allWindows(d).length)days.push(d)}
  if(!SP.date||!days.includes(SP.date))SP.date=days.find(d=>slotsFor(d).length)||days[0];
  const open=slotsFor(SP.date||''),all=allWindows(SP.date||'');
  modal(`<div class="slotpick"><h2 style="margin:0">Choose your ${SP.method==='Pickup'?'pickup':'delivery'} time</h2><p class="muted small" style="margin:.3em 0 0">We hold your choice while you shop. Same-day orders close at ${h12(S.cutoffs[new Date().getDay()]??16)}.</p>
   <div class="tabs2"><button class="${SP.method==='Delivery'?'on':''}" onclick="SP.method='Delivery';slotModal()">${ICN.truck} Delivery</button><button class="${SP.method==='Pickup'?'on':''}" onclick="SP.method='Pickup';slotModal()">${ICN.bag} Pickup</button></div>
   ${SP.method==='Delivery'?(u&&u.addresses?.length?`<label for="spa">Deliver to</label><select id="spa" onchange="const a=user().addresses[this.value];if(a){SP.addr=+this.value;SP.town=a.town}">${u.addresses.map((a,i)=>`<option value="${i}" ${i===SP.addr?'selected':''}>${esc((a.label?a.label+' — ':'')+a.street+', '+a.town)}</option>`).join('')}</select>`:`<label for="spt">Your town</label><select id="spt" onchange="SP.town=this.value">${areas.map(a=>`<option ${a.name===SP.town?'selected':''}>${esc(a.name)}</option>`).join('')}</select>`):`<p class="small" style="margin:0 0 6px">${ICN.pin} ${esc(S.address||'Pick up at the store')}</p>`}
   <label style="margin-top:14px">Day</label><div class="daystrip">${days.map(d=>{const n=slotsFor(d).length,dt=new Date(d+'T00:00');return `<button ${n?'':'disabled'} class="${d===SP.date?'on':''}" onclick="SP.date='${d}';SP.slot=null;slotModal()"><small>${d===ymd(new Date())?'Today':dt.toLocaleDateString([], {weekday:'short'})}</small><b>${dt.toLocaleDateString([], {month:'numeric',day:'numeric'})}</b><small>${n?n+' open':'Full'}</small></button>`}).join('')||'<p class="muted">No time windows this week. Please call the store.</p>'}</div>
   <label>Time</label><div class="slotgrid">${all.map(s=>{const ok=open.includes(s),left=slotCap(SP.date,s)-slotLoad(SP.date,s);return `<button ${ok?'':'disabled'} class="${s===SP.slot?'on':''}" onclick="SP.slot=${qa(s)};slotModal()">${esc(s)}<small>${ok?(left<=3?left+' left':'Available'):'Unavailable'}</small></button>`}).join('')}</div>
   <div class="row" style="margin-top:18px;justify-content:flex-end"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn lime" ${SP.slot&&open.includes(SP.slot)?'':'disabled'} onclick="saveSlot()">Reserve this time</button></div></div>`);
  $('mbox').classList.add('wide');}
function saveSlot(){setFul({method:SP.method,town:SP.method==='Delivery'?SP.town:'',addr:SP.addr,date:SP.date,slot:SP.slot});closeModal();toast(`${SP.method} time saved: ${prettyDate(SP.date)}, ${SP.slot}`)}
const _closeModalCF=window.closeModal;window.closeModal=function(){$('mbox')?.classList.remove('wide');_closeModalCF()};

/* ===================================================================
   HEADER — account menu, cart button, nav, message bar
   =================================================================== */
window.renderActs=function(){
  const u=user(),c=getCart(),n=c.reduce((a,i)=>a+(i.mode==='case'||(prod(i.pid)?.unit==='lb')?1:i.qty),0);
  $('acts').innerHTML=(u?`<button class="acct" onclick="toggleAcct(event)" aria-haspopup="true"><span class="av">${esc((u.first||u.email)[0].toUpperCase())}</span><span><small>Hello, ${esc(u.first||'there')}</small><b>My Account</b></span></button>`
     :`<button class="acct" onclick="openLogin()"><span class="av">${ICN.user}</span><span><small>Hello, sign in</small><b>Account</b></span></button>`)+
    `<button class="cartbtn2" onclick="openDrawer()" aria-label="Cart, ${n} items">${ICN.cart}<span class="n">${n}</span><span class="t">${money(subtotal(c))}</span></button>`;
  let m=$('acctmenu');if(!m){document.querySelector('header.top').insertAdjacentHTML('beforeend','<div class="acctmenu" id="acctmenu"></div>');m=$('acctmenu')}
  m.innerHTML=u?`<div class="hd">${esc(((u.first||'')+' '+(u.last||'')).trim()||u.email)}<div class="mini muted">${esc(u.email)}</div></div><hr>
   <a href="#/orders">My Orders</a><a href="#/buy-again">Buy Again</a><a href="#/my-items">My Items</a><a href="#/account/info">Personal Info</a><a href="#/account/addresses">Addresses</a><a href="#/account/cards">Cards</a><a href="#/account/defaults">Quick Checkout Defaults</a><a href="#/account/password">Change Password</a><a href="#/account/pin">Change PIN</a>
   ${isStaffU()?'<hr><a href="#/admin">🧰 Back office</a>':''}<hr><button onclick="logout()">Sign out</button>`:'';
  renderWrench&&renderWrench();renderFul();if(typeof renderSideCart==='function')renderSideCart();
};
function toggleAcct(e){e.stopPropagation();$('acctmenu').classList.toggle('on')}
document.addEventListener('click',e=>{if(!e.target.closest('#acctmenu,.acct'))$('acctmenu')?.classList.remove('on')});
window.renderNav=function(parts){
  const nav=$('deptnav'),r=parts[0]||'';
  nav.innerHTML=`<button class="alldepts" id="alldepts" aria-expanded="false" onclick="toggleMega()">${ICN.grid} Departments</button>
   <a class="hot ${r==='specials'?'on':''}" href="#/specials">Specials</a><a class="${r==='flyer'?'on':''}" href="#/flyer">Our Flyer</a><a class="${r==='recipes'?'on':''}" href="#/recipes">Recipes</a><a class="${r==='my-items'?'on':''}" href="#/my-items">My Items</a><a class="${r==='buy-again'?'on':''}" href="#/buy-again">Buy Again</a>
   <a class="${r==='deli'?'on':''}" href="#/deli">Deli Menu</a><a class="${r==='collection'?'on':''}" href="#/collection/shabbos">Shabbos Essentials</a><a class="${r==='ebt'?'on':''}" href="#/ebt">EBT</a><a class="${r==='location'?'on':''}" href="#/location">Store Location</a><a class="${r==='subscribe'?'on':''}" href="#/subscribe">Subscribe</a>`;
  let mg=$('mega2');if(!mg){nav.parentElement.insertAdjacentHTML('beforeend','<div class="mega2" id="mega2"></div>');mg=$('mega2')}
  mg.classList.remove('on');renderAnnc();
};
let megaDept=null;
function toggleMega(force){const mg=$('mega2'),on=force??!mg.classList.contains('on');if(!on){mg.classList.remove('on');$('alldepts')?.setAttribute('aria-expanded','false');return}
  megaDept=megaDept||DEPT_NAMES[0];megaDraw();mg.classList.add('on');$('alldepts')?.setAttribute('aria-expanded','true')}
function megaDraw(){const d=megaDept,mg=$('mega2');
  mg.innerHTML=`<div class="ml">${DEPT_NAMES.map(x=>`<a class="${x===d?'on':''}" href="#/dept/${encodeURIComponent(x)}" onmouseenter="megaDept=${qa(x)};megaDraw()" onclick="toggleMega(false)"><img src="${esc(DEPTS[x][2])}" alt="" loading="lazy">${esc(x)}</a>`).join('')}</div>
   <div class="mr"><div><h3>${esc(d)}</h3><ul>${DEPTS[d][1].map(s=>`<li><a href="#/dept/${encodeURIComponent(d)}?sub=${encodeURIComponent(s)}" onclick="toggleMega(false)">${esc(s)}</a></li>`).join('')}</ul><p style="margin-top:14px"><a class="btn sm lime" href="#/dept/${encodeURIComponent(d)}" onclick="toggleMega(false)">Shop all ${esc(d)}</a></p></div><img class="pic" src="${esc(DEPTS[d][2])}" alt=""></div>`}
document.addEventListener('click',e=>{if(!e.target.closest('#mega2,#alldepts'))toggleMega(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){toggleMega(false);document.body.classList.remove('navopen','filtopen')}});
function cfMenu(){document.body.classList.toggle('navopen');if(document.body.classList.contains('navopen')){const n=$('deptnav');n.insertAdjacentHTML('afterbegin',`<a href="javascript:cfMenu()">✕ Close</a>`);n.insertAdjacentHTML('beforeend',DEPT_NAMES.map(d=>`<a href="#/dept/${encodeURIComponent(d)}" onclick="cfMenu()">${esc(d)}</a>`).join(''))}else renderNav((location.hash.slice(2)||'').split('?')[0].split('/'))}
window.addEventListener('hashchange',()=>document.body.classList.remove('navopen','filtopen'));
window.renderAnnc=function(){const el=$('annc');if(!el)return;const ci=cutoffInfo();
  const cut=ci.live?`<span class="pill">Order in ${ci.h}h ${String(ci.m).padStart(2,'0')}m for same-day delivery</span>`:`<span class="pill">Next delivery: ${esc(ci.next)}</span>`;
  el.innerHTML=`<div class="in"><div class="msg">${S.siteMsg?esc(S.siteMsg)+' · ':''}${cut}</div><div class="links"><a href="#/delivery">Delivery Info</a><a href="#/hours">Store Hours</a><a href="#/customer-service">Contact Us</a>${S.phone?`<a href="tel:${esc(S.phone)}">${esc(S.phone)}</a>`:''}</div></div>`};

/* ===================================================================
   PRODUCT CARD
   =================================================================== */
const estTxt=p=>p.unit==='lb'?`Est. 1 lb / ${money(unitPrice(p))}`:'';
window.priceHTML=function(p){if(!hasPrice(p))return '<span class="nop">Price coming soon</span>';const u=p.unit==='lb'?'/lb':'';
  return p.sale?`<span class="price sale">${money(p.sale)}${u}<s>${money(p.price)}</s></span>`:`<span class="price">${money(p.price)}${u}</span>`};
window.card=function(p){const fav=user()?.fav?.includes(p.id),b=brandOf(p);
  return `<article class="pc"><div class="stk">${specialP(p)?'<span class="s-sale">Special</span>':''}${p.dealN&&hasPrice(p)?`<span class="s-deal">${dealText(p)}</span>`:''}${ebtP(p)?'<span class="s-ebt">EBT</span>':''}${gfP(p)?'<span class="s-gf">Gluten free</span>':''}${p.caseQty&&p.caseP?'<span class="s-case">Case option</span>':''}${oosP(p)?'<span class="s-oos">Out of stock</span>':''}${p.published===false?'<span class="s-hid">Hidden</span>':''}</div>
   <button class="fav" onclick="toggleFav('${p.id}')" aria-label="${fav?'Remove from':'Save to'} My Items">${fav?'♥':'♡'}</button>${isStaffU()&&editMode&&can('check')?`<button class="edit-pen" onclick="editP('${p.id}')">✎ Edit</button>`:''}
   <a href="#/p/${p.id}" class="${tcls(p)}" style="--h:${hue(p.dept)}">${pimg(p)}</a>
   <div class="brandl">${esc(b)}</div><a href="#/p/${p.id}" class="nm">${esc(p.name)}</a><span class="sz">${esc(p.size)||'&nbsp;'}</span>
   <div class="pr">${priceHTML(p)}${estTxt(p)&&hasPrice(p)?`<span class="est">${estTxt(p)}</span>`:''}</div><div class="foot"><span id="ctl-${p.id}">${ctl(p)}</span></div></article>`};
const _ctlCF=window.ctl;window.ctl=p=>{const h=_ctlCF(p);return h.replace('>Add to cart<',`>${ICN.plus} Add<`)};
function cfRow(items,id){return items.length?`<div class="crow"><button class="nb l" aria-label="Scroll left" onclick="this.nextElementSibling.scrollBy({left:-700})">‹</button><div class="carousel">${items.map(card).join('')}</div><button class="nb r" aria-label="Scroll right" onclick="this.previousElementSibling.scrollBy({left:700})">›</button></div>`:''}
const block=(title,link,items,sub='')=>items.length?`<section class="blk"><div class="blk-h"><div><h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</div>${link?`<a href="${link}">View all →</a>`:''}</div>${cfRow(items)}</section>`:'';

/* ===================================================================
   SEARCH — typo / plural tolerant, multi-word
   =================================================================== */
const _matchCF=window.matches;
window.matches=function(t){let r=_matchCF(t);if(r.length||!t||!t.trim())return r;
  const words=t.toLowerCase().split(/\s+/).filter(w=>w.length>1).map(w=>w.replace(/(ies)$/,'y').replace(/(es|s)$/,''));
  const pool=isStaffU()?P:P.filter(vis);
  r=pool.filter(p=>{const h=(p.name+' '+p.dept+' '+p.sub+' '+brandOf(p)).toLowerCase();return words.every(w=>h.includes(w))});
  if(!r.length)r=pool.filter(p=>{const h=(p.name+' '+p.sub).toLowerCase();return words.some(w=>w.length>3&&h.includes(w.slice(0,-1)))});
  return r.sort((a,b)=>(hasPrice(b)-hasPrice(a))||b.pop-a.pop)};

/* ===================================================================
   HOME
   =================================================================== */
const activeBanners=()=>{const t=todayStr();const a=BANNERS.filter(b=>(!b.from||b.from<=t)&&(!b.to||b.to>=t));return a.length?a:BANNERS};
function buyAgainItems(n=40){const cnt={};ORDERS.filter(o=>o.email===me&&o.status!=='Canceled').forEach(o=>o.items.forEach(it=>{cnt[it.pid]=(cnt[it.pid]||0)+1}));
  return Object.entries(cnt).sort((a,b)=>b[1]-a[1]).map(([id])=>prod(id)).filter(p=>p&&vis(p)).slice(0,n)}
const COLL={
  shabbos:{t:'Shabbos Essentials',s:'Challah, wine, candles, fish and everything for the table',img:'img/d/Fresh-Bakery-9df22c370a1b.webp',kw:['challah','grape juice','wine','candles','gefilte','kugel','chicken soup','horseradish','herring','cholent','kishke','tea lights','napkins','foil pan','matbucha','hummus','babka','rugelach']},
  basics:{t:'Weekly Basics',s:'Milk, eggs, bread, fruit and the things you buy every week',img:'img/d/Dairy-Eggs-52a805d3195b.webp',kw:['milk','eggs','bread','butter','bananas','apples','tomatoes','cucumbers','onions','potatoes','cheese','yogurt','orange juice','paper towels','toilet paper','cereal']},
  bulk:{t:'Bulk Buy',s:'Stock up by the case and save',img:'img/d/Groceries-f1ae7e58d1de.webp',kw:null},
  party:{t:'Party & Simcha',s:'Platters, disposables, drinks and sweets',img:'img/d/Catering-7bc24ee05639.webp',kw:['platter','plates','cups','cutlery','tablecover','soda','seltzer','candy','chocolate','chips','napkins']}
};
function collItems(k){const c=COLL[k];if(!c)return [];const pool=P.filter(p=>vis(p));
  if(!c.kw)return pool.filter(p=>p.caseQty&&p.caseP).sort((a,b)=>b.pop-a.pop);
  const out=[],seen=new Set();c.kw.forEach(w=>{const re=new RegExp('\\b'+w,'i');pool.filter(p=>re.test(p.name)).sort((a,b)=>(hasPrice(b)-hasPrice(a))||(isPic(b.img)-isPic(a.img))||b.pop-a.pop).slice(0,8).forEach(p=>{if(!seen.has(p.id)){seen.add(p.id);out.push(p)}})});return out}
window.vHome=withVisible(function(){
  const spec=P.filter(specialP).sort((a,b)=>b.pop-a.pop),feat=P.filter(p=>p.featured&&p.published!==false).sort((a,b)=>(hasPrice(b)-hasPrice(a))||b.pop-a.pop);
  const pick=d=>P.filter(p=>p.dept===d&&isPic(p.img)).sort((a,b)=>(hasPrice(b)-hasPrice(a))||b.pop-a.pop).slice(0,18);
  const ba=me?buyAgainItems(18):[],ci=cutoffInfo(),recipes=RECIPES.slice().sort((a,b)=>(RECIPE_PHOTOS[b.id]||b.img?1:0)-(RECIPE_PHOTOS[a.id]||a.img?1:0)||b.pop-a.pop).slice(0,8);
  const q=(href,bg,ic,t,s)=>`<a href="${href}"><span class="q" style="background:${bg}">${ic}</span><span>${t}<small>${s}</small></span></a>`;
  return `<div class="wrap">
  <section class="cf-hero"><div class="frame" id="banner" aria-roledescription="carousel"></div>
   <div class="hside"><a class="cf-tile t1" href="#/specials"><div><h3>This week’s specials</h3><p>${spec.length?spec.length+' items on sale now':'Fresh deals every week'}</p></div><span class="go">Shop specials →</span><span class="big">%</span></a>
    <a class="cf-tile clock" href="javascript:openSlot()"><div><p class="muted" style="font-weight:700">${ci.live?'Order in the next':'Next delivery'}</p><div class="t">${ci.live?`${ci.h}h ${String(ci.m).padStart(2,'0')}m`:esc(ci.next)}</div><p class="muted">${ci.live?`for same-day delivery · cutoff ${ci.cut}`:esc(ci.first||'')}</p></div><span class="go">${fulOK()?'Change my time':'Choose a time'}</span></a></div></section>
  <div class="quick">${q('#/flyer','#fff3dd','🗞️','Our Flyer','This week’s deals')}${q('#/buy-again','#e8f1ff','🔁','Buy Again','Your usual items')}${q('#/collection/shabbos','#f3ecff','🕯️','Shabbos','Essentials')}${q('#/deli','#ffe9ea','🥪','Deli Menu','Catering & platters')}${q('#/ebt','#e6f0ff','💳','EBT / SNAP','Eligible items')}${q('javascript:openList()','#eaf5ec','📝','Shopping List','Search it all at once')}</div>
  ${ba.length?block('Buy it again','#/buy-again',ba,'Quickly add the items you order most'):''}
  <section class="blk"><div class="blk-h"><h2>Shop by Department</h2></div><div class="dgrid2">${DEPT_NAMES.map(d=>`<a href="#/dept/${encodeURIComponent(d)}"><img src="${esc(DEPTS[d][2])}" alt="" loading="lazy"><span>${esc(d)}</span></a>`).join('')}</div></section>
  ${block('Weekly Specials','#/specials',spec.slice(0,18))}
  ${block('Featured Products','#/search?q=',feat.slice(0,18))}
  <section class="blk"><div class="blk-h"><h2>Shop by occasion</h2></div><div class="collections">${['shabbos','basics','bulk'].map(k=>`<a class="coll" href="#/collection/${k}" style="background-image:url('${COLL[k].img}')"><h3>${COLL[k].t}</h3><p>${COLL[k].s}</p></a>`).join('')}</div></section>
  ${block('Fresh Produce','#/dept/Produce',pick('Produce'))}
  ${block('Fresh Bakery','#/dept/Fresh%20Bakery',pick('Fresh Bakery'))}
  <section class="blk"><div class="blk-h"><div><h2>Shoppable Recipes</h2><p>Add every ingredient to your cart in one tap</p></div><a href="#/recipes">All recipes →</a></div><div class="crow"><div class="carousel" style="grid-auto-columns:minmax(250px,280px)">${recipes.map(rcard).join('')}</div></div></section>
  ${block('Dairy & Eggs','#/dept/Dairy%20%26%20Eggs',pick('Dairy & Eggs'))}
  <div class="trust"><div><span class="ic">🚚</span><span><b>Same-day delivery</b><span>${esc(S.towns.slice(0,4).join(', '))}${S.towns.length>4?' and more':''}</span></span></div><div><span class="ic">🛍️</span><span><b>Free in-store pickup</b><span>Ready when you are</span></span></div><div><span class="ic">🥬</span><span><b>Hand-picked fresh</b><span>Leave a note on any item</span></span></div><div><span class="ic">💳</span><span><b>Pay after we shop</b><span>Final charge uses real weights</span></span></div></div>
  <div class="band"><div><h2>Get our weekly specials</h2><p>The flyer and new deals in your inbox every week.</p></div><form onsubmit="return subscribe(event)"><input name="email" type="email" required placeholder="Email address" aria-label="Email address" autocomplete="email"><input type="hidden" name="first" value=""><input type="hidden" name="cell" value=""><input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn" type="submit">Subscribe</button></form></div></div>`;
});
window.startHome=function(){clearInterval(bTimer);const el=$('banner');if(!el)return;const B=activeBanners(),mob=innerWidth<620;
  el.innerHTML=B.map((b,i)=>`<img src="${esc(mob&&b.mimg?b.mimg:b.img)}" alt="${esc(b.h||'')}" ${i?'loading="lazy"':'fetchpriority="high"'}>`).join('')+`<div class="cap" id="bcap"></div>${B.length>1?`<button class="arw l" aria-label="Previous" onclick="bannerGo((bIdx-1+${B.length})%${B.length})">‹</button><button class="arw r" aria-label="Next" onclick="bannerGo((bIdx+1)%${B.length})">›</button><div class="dots">${B.map((_,j)=>`<button aria-label="Banner ${j+1}" onclick="bannerGo(${j})"></button>`).join('')}</div>`:''}`;
  const show=i=>{if(!document.body.contains(el)){clearInterval(bTimer);return}bIdx=i;const b=B[i];el.querySelectorAll('img').forEach((im,j)=>im.classList.toggle('on',j===i));el.querySelectorAll('.dots button').forEach((d,j)=>d.classList.toggle('on',j===i));
    const cap=$('bcap');if(S.brand.showCaption!==false&&(b.h||b.c)){cap.style.display='';cap.innerHTML=`${b.h?`<h2>${esc(b.h)}</h2>`:''}${b.p?`<p>${esc(b.p)}</p>`:''}${b.c?`<a class="btn sm lime" href="${esc(b.l||'#/')}">${esc(b.c)}</a>`:''}`}else cap.style.display='none'};
  window.bannerGo=i=>{show(i);clearInterval(bTimer);if(B.length>1)bTimer=setInterval(()=>show((bIdx+1)%B.length),6500)};bannerGo(0)};

/* ===================================================================
   LISTING with Brand / Price / Feature filters
   =================================================================== */
const PRICE_B=[['0-2','Under $2'],['2-5','$2 – $5'],['5-10','$5 – $10'],['10-20','$10 – $20'],['20-9999','$20 & up']];
window.vList=function({dept,sub,specials,q,sort,page}){
  const H=new URLSearchParams(location.hash.split('?')[1]||''),brands=(H.get('brand')||'').split('|').filter(Boolean),pr=H.get('price')||'',fl=(H.get('f')||'').split(',').filter(Boolean);
  let base=isStaffU()?P.slice():P.filter(vis),title,crumb='';
  if(dept){base=base.filter(p=>p.dept===dept);title=sub||dept;crumb=`<a href="#/">Home</a> / <a href="#/dept/${encodeURIComponent(dept)}">${esc(dept)}</a>${sub?' / '+esc(sub):''}`}
  else if(specials){base=base.filter(specialP);title='Weekly Specials';crumb='<a href="#/">Home</a> / Specials'}
  else{base=matches(q||'');title=q?`Results for “${q}”`:'All products';crumb='<a href="#/">Home</a> / Search'}
  const subCounts={};if(dept)base.forEach(p=>subCounts[p.sub]=(subCounts[p.sub]||0)+1);
  let list=sub?base.filter(p=>p.sub===sub):base;
  const bc={};list.forEach(p=>{const b=brandOf(p);if(b)bc[b]=(bc[b]||0)+1});
  if(brands.length)list=list.filter(p=>brands.includes(brandOf(p)));
  if(pr){const [lo,hi]=pr.split('-').map(Number);list=list.filter(p=>hasPrice(p)&&unitPrice(p)>=lo&&unitPrice(p)<hi)}
  const FL={sale:['On special',specialP],ebt:['EBT eligible',ebtP],gf:['Gluten free',gfP],stock:['In stock',p=>!oosP(p)],priced:['Priced online',hasPrice],case:['Case option',p=>p.caseQty&&p.caseP]};
  fl.forEach(k=>{if(FL[k])list=list.filter(FL[k][1])});
  const np=(a,b)=>(hasPrice(b)?1:0)-(hasPrice(a)?1:0);
  const S2={popular:(a,b)=>np(a,b)||(isPic(b.img)-isPic(a.img))||b.pop-a.pop||a.name.localeCompare(b.name),name:(a,b)=>a.name.localeCompare(b.name),low:(a,b)=>np(a,b)||unitPrice(a)-unitPrice(b),high:(a,b)=>np(a,b)||unitPrice(b)-unitPrice(a),special:(a,b)=>(specialP(b)-specialP(a))||np(a,b)||b.pop-a.pop};
  list.sort(S2[sort]||S2.popular);
  const N=36,pages=Math.max(1,Math.ceil(list.length/N)),pg=Math.min(page||1,pages),items=list.slice((pg-1)*N,pg*N);
  const set=(k,v)=>{const u=new URLSearchParams(H);v?u.set(k,v):u.delete(k);u.delete('page');return '#'+location.hash.slice(1).split('?')[0]+'?'+u};
  const togB=b=>{const s=new Set(brands);s.has(b)?s.delete(b):s.add(b);return set('brand',[...s].join('|'))};
  const togF=k=>{const s=new Set(fl);s.has(k)?s.delete(k):s.add(k);return set('f',[...s].join(','))};
  const topB=Object.entries(bc).sort((a,b)=>b[1]-a[1]),showB=H.get('allb')?topB:topB.slice(0,12);
  const active=[...brands.map(b=>[b,togB(b)]),...(pr?[[PRICE_B.find(x=>x[0]===pr)?.[1]||pr,set('price','')]]:[]),...fl.map(k=>[FL[k]?.[0]||k,togF(k)])];
  const filt=`<aside class="filt" aria-label="Filters"><div class="row filtclose" style="justify-content:space-between"><h3 style="margin:0">Filters</h3><button class="btn sm ghost filtbtn" onclick="document.body.classList.remove('filtopen')">Done</button></div>
   ${dept?`<h4>${esc(dept)}</h4><a class="sub ${!sub?'on':''}" href="#/dept/${encodeURIComponent(dept)}">All ${esc(dept)} <small>${base.length}</small></a>${DEPTS[dept][1].filter(s=>subCounts[s]).map(s=>`<a class="sub ${s===sub?'on':''}" href="#/dept/${encodeURIComponent(dept)}?sub=${encodeURIComponent(s)}">${esc(s)} <small>${subCounts[s]}</small></a>`).join('')}`
     :`<h4>Departments</h4>${DEPT_NAMES.map(d=>`<a class="sub" href="#/dept/${encodeURIComponent(d)}">${esc(d)}</a>`).join('')}`}
   <h4>Show only</h4>${Object.entries(FL).map(([k,[l]])=>`<label class="ck"><input type="checkbox" ${fl.includes(k)?'checked':''} onchange="location.hash=${qa(togF(k).slice(1))}"> ${l}</label>`).join('')}
   <h4>Price</h4>${PRICE_B.map(([v,l])=>`<label class="ck"><input type="radio" name="prb" ${pr===v?'checked':''} onchange="location.hash=${qa(set('price',v).slice(1))}"> ${l}</label>`).join('')}${pr?`<button class="more" onclick="location.hash=${qa(set('price','').slice(1))}">Any price</button>`:''}
   ${topB.length?`<h4>Brand</h4><input class="bsearch" type="search" placeholder="Find a brand" oninput="document.querySelectorAll('.bk').forEach(l=>l.style.display=l.dataset.b.includes(this.value.toLowerCase())?'':'none')" aria-label="Find a brand">${showB.map(([b,n])=>`<label class="ck bk" data-b="${esc(b.toLowerCase())}"><input type="checkbox" ${brands.includes(b)?'checked':''} onchange="location.hash=${qa(togB(b).slice(1))}"> ${esc(b)} <small>${n}</small></label>`).join('')}${topB.length>12&&!H.get('allb')?`<button class="more" onclick="location.hash=${qa(set('allb','1').slice(1))}">Show all ${topB.length} brands</button>`:''}`:''}</aside>`;
  return `<div class="wrap"><div class="crumbs">${crumb}</div><div class="shop2">${filt}<div>
   <div class="listhead"><div><h1>${esc(title)}</h1><span class="cnt">${list.length.toLocaleString()} product${list.length===1?'':'s'}</span></div>
    <div class="row"><button class="btn sm ghost filtbtn" onclick="document.body.classList.add('filtopen')">Filters${active.length?' ('+active.length+')':''}</button><label class="sr" for="srt">Sort by</label><select id="srt" class="sortsel" onchange="location.hash=this.value.slice(1)">${[['popular','Most popular'],['special','Specials first'],['low','Price: low to high'],['high','Price: high to low'],['name','Name A–Z']].map(([v,l])=>`<option value="${set('sort',v)}" ${v===(sort||'popular')?'selected':''}>${l}</option>`).join('')}</select></div></div>
   ${active.length?`<div class="chipsrow">${active.map(([l,h])=>`<a class="xchip" href="${h}">${esc(l)} ✕</a>`).join('')}<a href="${'#'+location.hash.slice(1).split('?')[0]+(sub?'?sub='+encodeURIComponent(sub):'')+(q?'?q='+encodeURIComponent(q):'')}">Clear all</a></div>`:''}
   ${specials&&circActive()?`<p><a class="btn sm ghost" href="#/flyer">🗞️ View this week’s flyer</a></p>`:''}
   ${items.length?`<div class="pgrid">${items.map(card).join('')}</div>`:`<div class="empty"><div class="e">🔍</div><h3>No products match</h3><p class="muted">Try removing a filter${q?' or searching for a shorter word':''}.</p>${active.length?`<a class="btn lime" href="${'#'+location.hash.slice(1).split('?')[0]}">Clear filters</a>`:'<a class="btn lime" href="#/specials">See this week’s specials</a>'}</div>`}
   ${pages>1?`<nav class="pager" aria-label="Pages">${pg>1?`<a href="${set('page',pg-1)}" aria-label="Previous page">‹</a>`:''}${pageNums(pg,pages).map(n=>n==='…'?'<b class="muted" style="align-self:center">…</b>':n===pg?`<span aria-current="page">${n}</span>`:`<a href="${set('page',n)}">${n}</a>`).join('')}${pg<pages?`<a href="${set('page',pg+1)}" aria-label="Next page">›</a>`:''}</nav>`:''}
  </div></div></div>`};

/* ===================================================================
   PRODUCT PAGE
   =================================================================== */
let PD={id:null,q:1,mode:'unit'};
window.vProduct=function(id){
  const p=prod(id);if(!p||(!isStaffU()&&p.published===false))return vPage('404');
  PD={id,mode:'unit',q:p.unit==='lb'?1:1};
  const sib=P.filter(x=>x.dept===p.dept&&x.sub===p.sub&&(isStaffU()||vis(x))).sort((a,b)=>a.name.localeCompare(b.name)),i=sib.indexOf(p),prev=sib[(i-1+sib.length)%sib.length],next=sib[(i+1)%sib.length];
  const fav=user()?.fav?.includes(p.id),save=p.sale&&p.price?p.price-p.sale:0,more=sib.filter(x=>x!==p).sort((a,b)=>(hasPrice(b)-hasPrice(a))||(isPic(b.img)-isPic(a.img))||b.pop-a.pop).slice(0,16);
  const feat=P.filter(x=>x.featured&&vis(x)&&x!==p).slice(0,16);
  return `<div class="wrap"><div class="row" style="justify-content:space-between"><div class="crumbs"><a href="#/">Home</a> / <a href="#/dept/${encodeURIComponent(p.dept)}">${esc(p.dept)}</a> / <a href="#/dept/${encodeURIComponent(p.dept)}?sub=${encodeURIComponent(p.sub)}">${esc(p.sub)}</a></div>
   ${sib.length>1?`<div class="prevnext2"><a href="#/p/${prev.id}" title="${esc(prev.name)}">‹ Prev</a><a href="#/p/${next.id}" title="${esc(next.name)}">Next ›</a></div>`:''}</div>
  <div class="pd2"><div class="gal ${tcls(p)}" style="--h:${hue(p.dept)}">${pimg(p)}<div class="stk">${specialP(p)?'<span class="s-sale">Special</span>':''}${ebtP(p)?'<span class="s-ebt">EBT</span>':''}${gfP(p)?'<span class="s-gf">Gluten free</span>':''}</div></div>
   <div><span class="loc">${esc(p.dept)}</span>${brandOf(p)?`<div class="meta" style="margin-top:10px;text-transform:uppercase;letter-spacing:.06em;font-size:.82rem">${esc(brandOf(p))}</div>`:''}<h1>${esc(p.name)}</h1>
    <div class="meta">${esc(p.size||'')}${p.upc?' · UPC '+esc(p.upc):''}</div>
    ${(p.attrs||[]).length?`<div class="badges">${p.attrs.map(a=>`<span style="background:#5d6b60">${esc(a)}</span>`).join('')}</div>`:''}
    <div class="pbox">${hasPrice(p)?`<div><span class="bigp ${p.sale?'sale':''}">${money(unitPrice(p))}${p.unit==='lb'?'<small style="font-size:.5em">/lb</small>':''}${p.sale?`<s>${money(p.price)}</s>`:''}</span>${save>0?`<span class="save">Save ${money(save)}</span>`:''}${p.dealN?`<span class="save" style="background:#fff3dd;color:#8a5a00">${dealText(p)}</span>`:''}</div>
      ${p.unit==='lb'?`<div class="est2" id="pdest">Est. 1 lb / ${money(unitPrice(p))} — weighed when packed; you pay the actual weight.</div>`:''}
      ${p.caseQty&&p.caseP?`<div class="modes2"><label><input type="radio" name="pdm" checked onchange="pdM('unit')"><b>${p.unit==='lb'?'By the pound':'Single'}</b><br>${money(unitPrice(p))}${p.unit==='lb'?'/lb':' each'}</label><label><input type="radio" name="pdm" onchange="pdM('case')"><b>Case of ${p.caseQty}</b><br>${money(p.caseP)} <span class="muted small">(${money(p.caseP/p.caseQty)} each)</span></label></div>`:''}
      ${oosP(p)?'<p class="err">Out of stock right now.</p>':`<div class="qtyrow"><span class="step"><button onclick="pdQ(-1)" aria-label="Less">−</button><span id="pdq">${p.unit==='lb'?'1 lb':'1'}</span><button onclick="pdQ(1)" aria-label="More">+</button></span><button class="btn lime" onclick="pdAdd2()">Add to cart</button><button class="btn ghost" onclick="pdNote()">${ICN.plus} Add note</button><button class="btn ghost" onclick="toggleFav('${p.id}');route()" aria-label="${fav?'Remove from':'Save to'} My Items">${fav?'♥ Saved':'♡ Save'}</button></div><div id="pdnote" class="small muted" style="margin-top:8px"></div>`}`
     :'<p class="nop" style="font-size:1rem">This item isn’t priced online yet. Call the store to order it.</p>'}</div>
    ${p.desc?`<h3 style="margin-top:22px">About this item</h3><p style="white-space:pre-line">${esc(p.desc)}</p>`:''}
    <p class="small muted" style="margin-top:16px">Leave a note for your shopper on any item — ripeness, thickness, trimming. Choose what happens if it’s out of stock in your cart.</p>
   </div></div>
  ${block('More in '+esc(p.sub),'#/dept/'+encodeURIComponent(p.dept)+'?sub='+encodeURIComponent(p.sub),more)}
  ${block('Featured Products','',feat)}</div>`};
let PDN='';
function pdM(m){PD.mode=m;PD.q=1;pdDraw()}
function pdQ(d){const p=prod(PD.id),st=PD.mode==='case'?1:stepOf(p,'unit');PD.q=Math.max(st,+(PD.q+d*st).toFixed(2));pdDraw()}
function pdDraw(){const p=prod(PD.id);$('pdq').textContent=PD.mode==='case'?`${PD.q} case${PD.q>1?'s':''}`:p.unit==='lb'?PD.q+' lb':PD.q;const e=$('pdest');if(e&&PD.mode!=='case')e.textContent=`Est. ${PD.q} lb / ${money(PD.q*unitPrice(p))} — weighed when packed; you pay the actual weight.`}
function pdNote(){const v=prompt('Note for your shopper (for example: not too ripe, thin slices)',PDN);if(v===null)return;PDN=v.slice(0,S.noteMax||120);$('pdnote').textContent=PDN?'Note: “'+PDN+'”':''}
function pdAdd2(){addToCart(PD.id,PD.q,PD.mode,PDN);PDN='';const n=$('pdnote');if(n)n.textContent=''}

/* ===================================================================
   CART — drawer and side panel share one design
   =================================================================== */
const SUBCH=[['ok','Substitutions OK'],['none','No substitute'],['choose','Choose a substitute…']];
function cartBody(){
  const u=user();if(!u)return `<div class="cart-empty"><div class="e">🧺</div><p>Sign in to start your cart.<br>Your items are saved for next time.</p><button class="btn lime" onclick="openLogin()">Sign in</button><p class="small"><a href="javascript:openLogin('','up')">Create an account</a></p></div>`;
  const c=getCart(),sv=u.saved||[],f=getFul(),x=fulText(f),ok=fulOK(f),st=subtotal(c),open=lastOpenOrder();
  const ln=(it,i,saved)=>{const p=prod(it.pid);return `<div class="cl ${scNew===it.pid&&!saved?'new':''}"><a href="#/p/${it.pid}" class="${tcls(p)} thumb" style="--h:${hue(p?.dept)}">${p?pimg(p):'🛒'}</a><div><a class="n" href="#/p/${it.pid}">${esc(p?.name||'Item no longer available')}</a><div class="m">${esc(p?.size||'')}${it.mode==='case'?' · case of '+(p?.caseQty||''):''}${p?.unit==='lb'&&it.mode!=='case'?' · est. weight':''}</div>
     ${it.note?`<div class="note2">“${esc(it.note)}”</div>`:''}
     ${saved?`<div class="r"><button class="lk" onclick="fromSaved(${i})">Move to cart</button><button class="lk red" onclick="delSaved(${i})">Remove</button></div>`
      :`<div class="r"><span class="step"><button onclick="cartBump(${i},-1)" aria-label="Less">−</button><span>${qtyLabel(it,p)}</span><button onclick="cartBump(${i},1)" aria-label="More">+</button></span>
       <select class="subsel" onchange="cartSub(${i},this.value)" aria-label="If out of stock">${SUBCH.map(([v,l])=>`<option value="${v}" ${(it.sub||'ok')===v?'selected':''}>${v==='choose'&&it.subName?'Sub: '+esc(it.subName.slice(0,22)):l}</option>`).join('')}</select></div>
       <div class="r"><button class="lk" onclick="cartNote(${i})">${it.note?'Edit note':'Add note'}</button><button class="lk" onclick="toSaved(${i})">Save for later</button><button class="lk red" onclick="cartRemove(${i})">Remove</button></div>`}</div>
     <div class="p">${saved?(hasPrice(p)?money(unitPrice(p)):''):money(lineTotal(it))}${!saved&&p?.sale&&it.mode!=='case'?`<s>${money(p.price*it.qty)}</s>`:''}</div></div>`};
  return `<div class="cart-ful ${f.date&&!ok?'warn':''}"><span>${f.method==='Pickup'?ICN.bag:ICN.truck}</span><span><b>${esc(x.t)}</b>${ok?esc(x.b):f.date?'Your time slot is no longer available':'No time chosen yet'}</span><button onclick="openSlot()">${ok?'Change':'Choose'}</button></div>
   <div class="cart-b">${c.length?c.map((it,i)=>ln(it,i,false)).join(''):`<div class="cart-empty"><div class="e">🧺</div><p>Your cart is empty.</p><a class="btn lime" href="#/specials" onclick="closeAll()">Start shopping</a></div>`}
    ${sv.length?`<p class="savedhd">Saved for later (${sv.length})</p>${sv.map((it,i)=>ln(it,i,true)).join('')}`:''}</div>
   ${c.length?`<div class="cart-f"><div class="sum t" style="margin:0"><span>Subtotal</span><span>${money(st)}</span></div>
    ${st<S.minOrder?`<div class="meter"><i style="width:${Math.min(100,st/S.minOrder*100)}%"></i></div><div class="mini muted">Add <b>${money(S.minOrder-st)}</b> to reach the ${money(S.minOrder)} minimum.</div>`:'<div class="mini muted">Weighed items are estimated. You’re charged the actual amount after we shop.</div>'}
    <button class="btn lime ckbtn" ${st<S.minOrder?'disabled':''} onclick="closeAll();go('/checkout')">Check out · ${money(st)}</button>
    ${open?`<button class="btn ghost" style="width:100%;margin-top:8px" onclick="addToLast()">Add to my order #${open.id}</button>`:''}</div>`:''}`}
window.renderDrawer=function(){$('drawer').innerHTML=`<div class="cartwrap"><div class="cart-h"><h2>My Shopping Cart</h2><div class="row" style="gap:8px">${getCart().length?`<button class="lk red" onclick="if(confirm('Empty your cart?'))setCart([])">Empty cart</button>`:''}<button class="x" onclick="closeAll()" aria-label="Close cart">×</button></div></div>${cartBody()}</div>`};
window.renderSideCart=function(){const el=$('sidecart');if(!el)return;document.body.classList.toggle('sc-on',scWanted());if(!scWanted())return;
  const n=getCart().length;el.innerHTML=`<div class="cartwrap"><div class="cart-h"><h2>My Cart${n?` <span class="muted" style="font-size:.85rem;font-weight:600">(${n})</span>`:''}</h2>${n?`<button class="lk red" onclick="if(confirm('Empty your cart?'))setCart([])">Empty</button>`:''}</div>${cartBody()}</div>`;
  if(scNew){const l=el.querySelector('.cl.new'),b=el.querySelector('.cart-b');if(l&&b)b.scrollTop=Math.max(0,l.offsetTop-60);el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse');scNew=null}};
function cartSub(i,v){const c=getCart(),it=c[i];if(v==='choose'){pickSub(i);return}it.sub=v;delete it.subPid;delete it.subName;setCart(c)}
function pickSub(i){const it=getCart()[i],p=prod(it.pid);modal(`<h2>Choose a substitute</h2><p class="muted">If <b>${esc(p?.name)}</b> is out of stock, we’ll bring this instead.</p><input type="search" id="psq" placeholder="Search products" value="${esc((p?.sub||'').split(' ')[0])}" oninput="pickSubList(${i},this.value)"><div id="psr" style="margin-top:10px"></div>`);pickSubList(i,$('psq').value)}
function pickSubList(i,t){const own=getCart()[i].pid,res=(t.trim()?matches(t):P.filter(p=>p.sub===prod(own)?.sub)).filter(p=>p.id!==own&&!oosP(p)).slice(0,12);
  $('psr').innerHTML=res.map(p=>`<div class="sg" style="grid-template-columns:44px 1fr auto auto"><span class="${tcls(p)}" style="--h:${hue(p.dept)};width:44px;height:44px;font-size:1.2rem">${pimg(p)}</span><span>${esc(p.name)}<div class="mini muted">${esc(p.size)}</div></span>${priceHTML(p)}<button class="add-btn" style="border-radius:8px;padding:.4em .8em" onclick="setSub(${i},'${p.id}')">Choose</button></div>`).join('')||'<p class="muted">No matches.</p>'}
function setSub(i,pid){const c=getCart();c[i].sub='choose';c[i].subPid=pid;c[i].subName=prod(pid).name;setCart(c);closeModal();toast('Substitute saved')}
function toSaved(i){const c=getCart(),u=user();u.saved=u.saved||[];const [it]=c.splice(i,1);if(!u.saved.some(s=>s.pid===it.pid))u.saved.unshift({pid:it.pid,qty:it.qty,mode:it.mode,note:it.note});setCart(c);refreshCtl(it.pid);toast('Saved for later')}
function fromSaved(j){const u=user(),[it]=u.saved.splice(j,1);if(hasPrice(prod(it.pid))&&!oosP(prod(it.pid))){const c=getCart();c.push(it);setCart(c);refreshCtl(it.pid)}else{saveAll();renderActs();if(drawerOpen)renderDrawer();toast('That item isn’t available right now')}}
function delSaved(j){user().saved.splice(j,1);saveAll();renderActs();if(drawerOpen)renderDrawer()}
window.scWanted=()=>{const r=(location.hash.slice(1)||'/').split('?')[0].split('/').filter(Boolean)[0]||'';return ['','dept','search','specials','p','ebt','gluten-free','circular','recipes','recipe','my-items','deli','wrench','flyer','collection','buy-again','list'].includes(r)&&!document.body.classList.contains('bo-mode')&&innerWidth>=1200};

/* ===================================================================
   CHECKOUT — one page, fulfillment first, sticky summary
   =================================================================== */
let CO={tip:0,tipPct:null,disc:null};
window.vCheckout=function(){
  if(!me)return gate('Sign in to check out.');
  const c=getCart(),u=user(),st=subtotal(c);
  if(!c.length)return `<div class="wrap"><div class="empty"><div class="e">🧺</div><h2>Your cart is empty</h2><a class="btn lime" href="#/specials">Shop this week’s specials</a></div></div>`;
  if(u.blocked)return `<div class="wrap"><div class="empty"><h2>We can’t take this order online</h2><p class="muted">Please call the store${S.phone?' at '+esc(S.phone):''}.</p></div></div>`;
  CF.reserveId();
  const d=u.defaults||{},f=getFul(),areas=S.areas.filter(a=>a.active),addrs=u.addresses||[],ai=f.method==='Delivery'&&addrs[f.addr]?f.addr:addrs.findIndex(a=>a.def),def=addrs[ai>=0?ai:0]||{};
  CO={tip:0,tipPct:d.tipPct??null,disc:null};
  return `<div class="wrap"><h1 style="margin:26px 0 6px">Check out</h1><p class="muted" style="margin:0 0 18px">${c.length} item${c.length>1?'s':''} · ${money(st)} estimated</p><form class="two" onsubmit="return placeOrder2(event)" novalidate>
  <div>
   <div class="panel"><div class="row" style="justify-content:space-between"><h3 style="margin:0">1. Delivery or pickup time</h3><button type="button" class="btn sm ghost" onclick="openSlot()">${fulOK(f)?'Change':'Choose a time'}</button></div>
    <div id="cofull" style="margin-top:10px"></div></div>
   <div class="panel" id="coaddr"><h3>2. ${f.method==='Pickup'?'Pickup contact':'Delivery address'}</h3>
    ${f.method==='Delivery'?`${addrs.length?`<label for="cab">Saved address</label><select id="cab" onchange="coAddr2(this.value)">${addrs.map((a,i)=>`<option value="${i}" ${a===def?'selected':''}>${esc((a.label?a.label+' — ':'')+a.street+', '+a.town)}</option>`).join('')}<option value="new">+ New address</option></select>`:''}
     <div class="grid2"><div><label for="ca">Street address</label><input id="ca" required value="${esc(def.street||'')}" autocomplete="street-address"></div><div><label for="capt">Apt / floor</label><input id="capt" value="${esc(def.apt||'')}"></div></div>
     <div class="grid2"><div><label for="ct">Town</label><select id="ct" onchange="coSum()">${areas.map(a=>`<option ${a.name===(def.town||f.town)?'selected':''}>${esc(a.name)}</option>`).join('')}</select></div><div><label for="cd">Delivery instructions</label><input id="cd" value="${esc(def.notes||'')}" placeholder="Gate code, side door…"></div></div>`:`<p class="small" style="margin:0">${ICN.pin} ${esc(S.address||'At the store')}</p>`}
    <div class="grid2"><div><label for="cp">Cell phone</label><input id="cp" type="tel" required value="${esc(u.phone||'')}" autocomplete="tel"></div><div><label for="crc">Receipt</label><select id="crc"><option ${d.receipt!=='Paper receipt with order'?'selected':''}>Email receipt</option><option ${d.receipt==='Paper receipt with order'?'selected':''}>Paper receipt with order</option></select></div></div></div>
   <div class="panel"><h3>3. If an item is out of stock</h3><div class="opt">${S.oosOptions.map(([v,ds],i)=>`<label><input type="radio" name="subs" value="${esc(v)}" ${(d.subs?d.subs===v:!i)?'checked':''}><b>${esc(v)}</b><small>${esc(ds)}</small></label>`).join('')}</div>
    <p class="mini muted">You can also set a choice for each item in your cart.</p>
    <label for="cn">Special instructions <span class="muted small">(optional)</span></label><textarea id="cn" rows="2" placeholder="Anything our shoppers should know"></textarea></div>
   <div class="panel"><h3>4. Payment</h3><label for="cpay">Pay with</label><select id="cpay">${(u.cards||[]).map(cd=>{const v=`Card on file — ${cd.brand} ending ${cd.last4}`;return `<option ${d.pay===v?'selected':''}>${esc(v)}</option>`}).join('')}<option ${d.pay==='Card — the store will call to authorize'?'selected':''}>Card — the store will call to authorize</option>${S.ebt?.on?'<option>EBT / SNAP card for eligible items + card for the rest</option>':''}<option ${d.pay==='Pay at pickup / delivery'?'selected':''}>Pay at pickup / delivery</option>${ACCTS.some(a=>a.customers.includes(me))?'<option>Charge to house account</option>':''}</select>
    <p class="small muted">We pre-authorize your card for the estimated total. The final charge uses actual weights, what was available and substitutions.</p>
    <label>Tip for your shopper & driver</label><div class="chipsrow" id="tips">${(S.tipOptions||[0,5,10,15]).map(t=>`<button type="button" data-t="${t}" onclick="coTip(${t})">${t?t+'%':'No tip'}</button>`).join('')}<button type="button" data-t="c" onclick="coTip('c')">Other</button></div><div id="tipc"></div>
    ${(S.checkoutChecks||[]).map((k,i)=>`<label class="check"><input type="checkbox" class="cochk" data-req="${k.req?1:0}" id="cck${i}"> ${esc(k.text)}</label>`).join('')}
    <label class="check"><input type="checkbox" id="codef" ${u.defaults?'':'checked'}> Save these choices as my Quick Checkout Defaults</label></div>
  </div>
  <div class="panel" style="position:sticky;top:calc(var(--hdrH,140px) + 12px)"><h3>Order summary</h3>
   <div style="max-height:260px;overflow:auto;margin-bottom:8px">${c.map(it=>{const p=prod(it.pid);return `<div class="sum small"><span>${esc(p?.name)} × ${qtyLabel(it,p)}</span><span>${money(lineTotal(it))}</span></div>`}).join('')}</div>
   <label for="ccode" style="margin-top:0">Coupon code</label><div class="row" style="flex-wrap:nowrap"><input id="ccode" style="text-transform:uppercase" autocomplete="off"><button type="button" class="btn sm ghost" onclick="coApply2()">Apply</button></div><div class="small" id="cmsg"></div>
   <div id="cosum" style="margin-top:12px"></div><div class="err" id="coerr" role="alert"></div>
   <button class="btn lime" id="cobtn" type="submit" style="width:100%;margin-top:14px;padding:.9em;font-size:1.05rem">Place order</button>
   <p class="mini muted" style="text-align:center;margin-top:8px">You can change your order until we start shopping.</p></div>
  </form></div>`};
function coFul(){const f=getFul(),x=fulText(f),el=$('cofull');if(!el)return;el.innerHTML=fulOK(f)?`<div class="cart-ful" style="margin:0"><span>${f.method==='Pickup'?ICN.bag:ICN.truck}</span><span><b>${esc(x.t)}</b>${esc(x.b)}</span><button type="button" onclick="openSlot()">Change</button></div>`:`<p class="err" style="margin:0">Choose a ${f.method==='Pickup'?'pickup':'delivery'} time to continue.</p>`}
function coAddr2(v){const u=user();if(v==='new'){['ca','capt','cd'].forEach(k=>$(k).value='');$('ca').focus();return}const a=u.addresses[v];$('ca').value=a.street;$('capt').value=a.apt||'';$('cd').value=a.notes||'';$('ct').value=a.town;coSum()}
function coTip(t){document.querySelectorAll('#tips button').forEach(b=>b.classList.toggle('on',String(b.dataset.t)===String(t)));
  if(t==='c'){$('tipc').innerHTML='<label for="tipv">Tip amount ($)</label><input id="tipv" type="number" min="0" step="0.5" oninput="CO.tipPct=null;CO.tip=Math.max(0,+this.value||0);coSum()">';CO.tipPct=null}else{$('tipc').innerHTML='';CO.tipPct=t}coSum()}
function coPseudo2(){const f=getFul();return {items:getCart(),method:f.method,town:f.method==='Delivery'?($('ct')?.value||f.town):'',discRule:CO.disc,tip:0}}
function coSum(){const o=coPseudo2(),t0=totals(o,false);o.tip=CO.tipPct!=null?+(t0.sub*CO.tipPct/100).toFixed(2):CO.tip;const t=totals(o,false),el=$('cosum');if(!el)return;
  const min=o.method==='Delivery'?(areaOf(o.town)?.min??S.minOrder):S.minOrder,a=areaOf(o.town),saved=getCart().reduce((s,it)=>{const p=prod(it.pid);return s+(p?.sale&&it.mode!=='case'?(p.price-p.sale)*it.qty:0)},0);
  el.innerHTML=sumRows(t,'Estimated total')+(saved>0?`<div class="sum" style="color:var(--sale);font-weight:700"><span>You save</span><span>${money(saved)}</span></div>`:'')+(a&&a.discOver>0&&o.method==='Delivery'&&t.sub<a.discOver&&a.discFee!=null?`<p class="mini muted">Spend ${money(a.discOver-t.sub)} more for a ${money(a.discFee)} service fee.</p>`:'')+(t.sub<min?`<p class="small err">Minimum order${o.method==='Delivery'?' for '+esc(o.town):''} is ${money(min)}.</p>`:'');
  $('cobtn').disabled=t.sub<min;CO.last=t}
async function coApply2(){const code=$('ccode').value.trim().toUpperCase(),m=$('cmsg'),st=subtotal(getCart()),t=todayStr();CO.disc=null;
  const d=(S.discounts||[]).find(x=>x.code.toUpperCase()===code&&x.active);const bad=s=>{m.innerHTML=`<span class="err">${s}</span>`;coSum()};
  if(!d)return bad('That code isn’t valid.');if(d.starts&&d.starts>t)return bad('That code isn’t active yet.');if(d.expires&&d.expires<t)return bad('That code has expired.');
  if(d.min&&st<d.min)return bad(`This code needs an order of ${money(d.min)} or more.`);
  const mine=ORDERS.filter(o=>o.email===me&&o.status!=='Canceled');
  if(d.once&&mine.some(o=>o.code===d.code))return bad('You’ve already used this code.');
  if(d.nth&&mine.length+1!==+d.nth)return bad(d.nth==1?'This code is for your first order.':`This code is for your order number ${d.nth}.`);
  if(d.maxUses){const {data}=await sbc.rpc('code_uses',{c:d.code});if((data||0)>=d.maxUses)return bad('That code has been used up.')}
  CO.disc={code:d.code,type:d.type,amount:d.amount};m.innerHTML=`<span style="color:var(--accent);font-weight:800">✓ ${esc(d.code)}: ${d.type==='%'?d.amount+'% off':money(d.amount)+' off'}</span>`;coSum()}
window.placeOrder=window.placeOrder2=async function(e){
  e.preventDefault();const err=$('coerr'),c=getCart(),u=user(),f=getFul();err.textContent='';
  if(!fulOK(f)){err.textContent='Choose a delivery or pickup time.';openSlot();return false}
  const street=$('ca')?.value.trim()||'',town=f.method==='Delivery'?$('ct').value:'',apt=$('capt')?.value.trim()||'',phone=$('cp').value.trim();
  if(f.method==='Delivery'&&!street){err.textContent='Enter a street address for delivery.';$('ca').focus();return false}
  if(phone.replace(/\D/g,'').length<7){err.textContent='Enter a cell phone number so we can reach you.';$('cp').focus();return false}
  const miss=[...document.querySelectorAll('.cochk')].find(x=>x.dataset.req==='1'&&!x.checked);if(miss){err.textContent='Please check the boxes above to continue.';miss.focus();return false}
  const btn=$('cobtn');btn.disabled=true;btn.textContent='Placing your order…';
  try{if(!CF.ids.length)await CF.reserveId();}catch(x){}
  const id=CF.ids.shift();if(!id){err.textContent='We couldn’t reach the store. Check your connection and try again.';btn.disabled=false;btn.textContent='Place order';return false}
  const items=c.map(it=>{const p=prod(it.pid);let note=it.note||'';if(it.sub==='none')note=(note?note+' · ':'')+'NO SUBSTITUTE';if(it.sub==='choose'&&it.subName)note=(note?note+' · ':'')+'If out, use: '+it.subName;return {...it,note,name:p?.name,price:unitPrice(p)}});
  const o={id,email:me,name:((u.first||'')+' '+(u.last||'')).trim()||me,phone,method:f.method,address:f.method==='Delivery'?street+(apt?', '+apt:''):'',town,instructions:f.method==='Delivery'?($('cd')?.value.trim()||''):'',
    date:f.date,slot:f.slot,subs:document.querySelector('input[name=subs]:checked')?.value||S.oosOptions[0][0],receipt:$('crc').value,pay:$('cpay').value,notes:$('cn').value.trim(),
    code:CO.disc?.code||'',discRule:CO.disc,items,status:'Received',stage:'Waiting',boxes:{},created:Date.now(),platform:/Mobi|Android|iPhone/i.test(navigator.userAgent)?'Mobile Web':'Web',
    checks:[...document.querySelectorAll('.cochk')].filter(x=>x.checked).map(x=>x.parentElement.textContent.trim()),log:[{t:Date.now(),m:'Order placed online'}]};
  const t0=totals(o,false);o.tip=CO.tipPct!=null?+(t0.sub*CO.tipPct/100).toFixed(2):CO.tip;recalc(o);
  const min=o.method==='Delivery'?(areaOf(town)?.min??S.minOrder):S.minOrder;if(o.subtotal<min){err.textContent=`Minimum order is ${money(min)}.`;btn.disabled=false;btn.textContent='Place order';return false}
  o.ebtAmt=+items.reduce((a,it)=>a+(ebtP(prod(it.pid))?lineTotal(it):0),0).toFixed(2);
  ORDERS.push(o);
  if(o.method==='Delivery'){u.addresses=u.addresses||[];if(!u.addresses.some(a=>a.street===street&&a.town===town))u.addresses.push({label:'',street,apt,town,notes:o.instructions,def:!u.addresses.length})}
  u.phone=phone;if($('codef').checked)u.defaults={subs:o.subs,pay:o.pay,receipt:o.receipt,tipPct:CO.tipPct};
  u.cart=[];
  saveAll();
  try{await CF.flushNow()}catch(x){}
  if(CF.status==='error'){ORDERS.splice(ORDERS.indexOf(o),1);u.cart=c;err.textContent='Your order didn’t go through. Please try again, or call the store.';btn.disabled=false;btn.textContent='Place order';return false}
  renderActs();go('/order/'+o.id);toast('Order placed — thank you!');return false};
const _bindAfterCF=window.bindAfter;
window.bindAfter=function(r,parts){_bindAfterCF&&_bindAfterCF(r,parts);if(r==='checkout'&&$('cosum')){coFul();const d=user()?.defaults;coTip(d?.tipPct??(S.tipOptions||[0])[0]);coSum()}};
/* bindAfter in core calls coInit for checkout — make it a no-op for the new page */
window.coInit=function(){};
const _renderFulCF=renderFul;window.renderFul=renderFul;
const _saveSlotCF=saveSlot;window.saveSlot=function(){_saveSlotCF();if((location.hash||'').startsWith('#/checkout'))route()};

/* ===================================================================
   ACCOUNT — Quick Checkout Defaults, nicer layout, My Orders
   =================================================================== */
const _vAcctCF=window.vAcct;
window.vAcct=function(sub){
  if(!me)return gate('Sign in to manage your account.');
  const tabs=[['info','Personal Info'],['addresses','Addresses'],['cards','Cards'],['defaults','Quick Checkout Defaults'],['password','Change Password'],['pin','Change PIN']];
  let body;
  if(sub==='defaults'){const u=user(),d=u.defaults||{};
    body=`<form class="panel" onsubmit="return saveDefaults(event)"><p class="muted">These choices fill in automatically at checkout.</p>
     <label for="dfs">If an item is out of stock</label><select id="dfs">${S.oosOptions.map(([v])=>`<option ${d.subs===v?'selected':''}>${esc(v)}</option>`).join('')}</select>
     <label for="dfp">Payment</label><select id="dfp">${['Card — the store will call to authorize','Pay at pickup / delivery',...(u.cards||[]).map(c=>`Card on file — ${c.brand} ending ${c.last4}`)].map(v=>`<option ${d.pay===v?'selected':''}>${esc(v)}</option>`).join('')}</select>
     <label for="dfr">Receipt</label><select id="dfr">${['Email receipt','Paper receipt with order'].map(v=>`<option ${d.receipt===v?'selected':''}>${v}</option>`).join('')}</select>
     <label for="dft">Tip</label><select id="dft">${(S.tipOptions||[0,5,10,15]).map(t=>`<option value="${t}" ${+d.tipPct===t?'selected':''}>${t?t+'%':'No tip'}</option>`).join('')}</select>
     <button class="btn lime" style="margin-top:14px" type="submit">Save defaults</button></form>`}
  else body=_vAcctCF(sub).replace(/^<div class="wrap"[^>]*><h1[^>]*>My account<\/h1><nav class="acct-nav">[\s\S]*?<\/nav>/,'').replace(/<\/div>$/,'');
  return `<div class="wrap"><div class="acctgrid"><nav class="acctnav" aria-label="My account">${tabs.map(([k,l])=>`<a class="${k===sub?'on':''}" href="#/account/${k}">${l}</a>`).join('')}<a href="#/orders">My Orders</a><a href="#/my-items">My Items</a><a href="#/buy-again">Buy Again</a><a href="javascript:logout()">Sign out</a></nav><div><h1 style="margin-top:0">${tabs.find(t=>t[0]===sub)?.[1]||'My account'}</h1>${body}</div></div></div>`};
function saveDefaults(e){e.preventDefault();user().defaults={subs:$('dfs').value,pay:$('dfp').value,receipt:$('dfr').value,tipPct:+$('dft').value};saveAll();toast('Defaults saved');return false}
window.vAccount=()=>vAcct('info');
window.vOrders=function(){
  if(!me)return gate('Sign in to see your orders.');
  const H=new URLSearchParams(location.hash.split('?')[1]||''),q=(H.get('q')||'').toLowerCase(),st=H.get('st')||'';
  let mine=ORDERS.filter(o=>o.email===me).sort((a,b)=>b.created-a.created);const all=mine.length;
  if(st==='open')mine=mine.filter(o=>['Received','Processing','On Hold'].includes(o.status));if(st==='done')mine=mine.filter(o=>['Processed','Charged'].includes(o.status));if(st==='canceled')mine=mine.filter(o=>o.status==='Canceled');
  if(q)mine=mine.filter(o=>(o.id+' '+o.items.map(i=>i.name).join(' ')).toLowerCase().includes(q));
  const lbl=o=>o.status==='Charged'?'Completed':o.status==='Processed'?(o.method==='Pickup'?(o.stage==='Picked up'?'Picked up':'Ready for pickup'):(o.stage==='Delivered'?'Delivered':o.stage==='Out for delivery'?'Out for delivery':'Packed')):o.status==='Received'?'Received — you can still edit':o.status;
  return `<div class="wrap" style="max-width:1000px"><h1 style="margin-top:26px">My Orders</h1>
   ${all?`<div class="row" style="margin-bottom:14px"><input type="search" placeholder="Search by order # or item" value="${esc(H.get('q')||'')}" onkeydown="if(event.key==='Enter')location.hash='/orders?q='+encodeURIComponent(this.value)+'&st=${st}'" style="max-width:320px" aria-label="Search orders"><div class="chipsrow" style="margin:0">${[['','All'],['open','In progress'],['done','Completed'],['canceled','Canceled']].map(([v,l])=>`<a class="${st===v?'on':''}" href="#/orders?st=${v}&q=${encodeURIComponent(q)}">${l}</a>`).join('')}</div></div>`:''}
   ${mine.length?mine.map(o=>`<div class="ocard2"><div><div class="row" style="gap:10px"><b style="font-size:1.1rem">Order #${o.id}</b><span class="status ${scls(o.status)}">${esc(lbl(o))}</span></div><div class="small muted">${o.method} · ${prettyDate(o.date)}, ${esc(o.slot)} · ${o.items.length} items · ${money(o.final||o.total)}</div>
     <div class="thumbs">${o.items.slice(0,8).map(it=>{const p=prod(it.pid);return `<span>${p?pimg(p):'🛒'}</span>`}).join('')}${o.items.length>8?`<span class="mini">+${o.items.length-8}</span>`:''}</div></div>
     <div class="row" style="flex-direction:column;align-items:stretch;gap:6px"><a class="btn sm ${o.status==='Received'?'lime':'ghost'}" href="#/order/${o.id}">${o.status==='Received'?'View or edit':'View order'}</a><button class="btn sm ghost" onclick="reorder('${o.id}')">${ICN.repeat} Buy again</button></div></div>`).join('')
    :`<div class="empty"><div class="e">🧾</div><h3>${all?'No orders match':'No orders yet'}</h3><p class="muted">${all?'Try another search.':'Your orders and their status will show here.'}</p><a class="btn lime" href="#/specials">Start shopping</a></div>`}</div>`};
function reorder(id){if(needLogin())return;const o=findO(id),c=getCart();let n=0,skip=0;o.items.forEach(it=>{const p=prod(it.pid);if(!p||!hasPrice(p)||oosP(p)||p.published===false){skip++;return}const ex=c.find(x=>x.pid===it.pid&&x.mode===it.mode);if(ex)ex.qty=+(ex.qty+it.qty).toFixed(2);else c.push({pid:it.pid,qty:it.qty,mode:it.mode,note:''});n++});
  setCart(c);toast(`Added ${n} item${n===1?'':'s'} to your cart${skip?` · ${skip} not available`:''}`);openDrawer()}

/* ===================================================================
   NEW PAGES: flyer, buy again, collections, shopping list, location, subscribe
   =================================================================== */
let FLY={pg:0,grid:false};
function vFlyer(){const F=S.flyer||{},pages=(F.pages||[]).filter(Boolean),items=circActive()?S.circular.items.map(i=>prod(i.pid)).filter(p=>p&&vis(p)):[],spec=P.filter(p=>vis(p)&&specialP(p)).slice(0,60);
  const pg=Math.min(FLY.pg,Math.max(0,pages.length-1));
  return `<div class="wrap"><div class="listhead" style="margin-top:24px"><div><h1>${esc(F.title||'Our Flyer')}</h1><span class="cnt">${F.from?`Valid ${prettyDate(F.from)}${F.to?' – '+prettyDate(F.to):''}`:'This week’s deals'}</span></div>
   ${pages.length?`<div class="row"><button class="btn sm ghost" onclick="FLY.grid=!FLY.grid;route()">${FLY.grid?'Page view':'Grid view'}</button><button class="btn sm ghost" onclick="flyerPrint()">Print</button></div>`:''}</div>
  ${pages.length?`<div class="flyer"><div>${FLY.grid?`<div class="fgrid">${pages.map((u,i)=>`<button onclick="FLY.pg=${i};FLY.grid=false;route()" aria-label="Page ${i+1}"><img src="${esc(u)}" alt="Flyer page ${i+1}" loading="lazy"><b class="mini">Page ${i+1}</b></button>`).join('')}</div>`:`<div class="page"><img src="${esc(pages[pg])}" alt="Flyer page ${pg+1}"></div>
     <nav class="pager">${pg>0?`<a href="javascript:FLY.pg=${pg-1};route()">‹ Prev</a>`:''}${pages.map((_,i)=>i===pg?`<span>${i+1}</span>`:`<a href="javascript:FLY.pg=${i};route()">${i+1}</a>`).join('')}${pg<pages.length-1?`<a href="javascript:FLY.pg=${pg+1};route()">Next ›</a>`:''}</nav>`}</div>
   <aside><div class="panel"><h3>Shop the flyer</h3><p class="small muted">Every flyer deal is on the specials page with the sale price already applied.</p><a class="btn lime" href="#/specials">Shop specials</a></div></aside></div>`
   :`<div class="panel" style="text-align:center"><p class="muted">The printed flyer will appear here. In the meantime, here are this week’s specials.</p></div>`}
  ${block('Flyer items','',items)}${block('All specials','#/specials',spec)}</div>`}
function flyerPrint(){const pages=(S.flyer?.pages||[]);printHTML(pages.map(u=>`<img src="${esc(u)}" style="width:100%;page-break-after:always">`).join(''))}
function vBuyAgain(){if(!me)return gate('Sign in to see the items you’ve bought before.');const items=buyAgainItems(200),fav=(user().fav||[]).map(prod).filter(Boolean);
  return `<div class="wrap"><div class="listhead" style="margin-top:24px"><div><h1>Buy Again</h1><span class="cnt">Items from your past orders, most-bought first</span></div></div>
  ${items.length?`<div class="pgrid">${items.map(card).join('')}</div>`:`<div class="empty"><div class="e">🔁</div><h3>Nothing here yet</h3><p class="muted">After your first order, the items you buy will be here for one-tap reordering.</p><a class="btn lime" href="#/specials">Start shopping</a></div>`}
  ${block('My Items','#/my-items',fav)}</div>`}
function vCollection(k){const c=COLL[k];if(!c)return vPage('404');const items=collItems(k);
  return `<div class="wrap"><div class="coll" style="background-image:url('${c.img}');margin-top:22px;min-height:180px"><h3 style="font-size:2rem">${c.t}</h3><p>${c.s}</p></div>
   <div class="chipsrow" style="margin-top:16px">${Object.entries(COLL).map(([kk,x])=>`<a class="${kk===k?'on':''}" href="#/collection/${kk}">${x.t}</a>`).join('')}</div>
   <div class="pgrid">${items.slice(0,96).map(card).join('')}</div></div>`}
function openList(){const prev=DB.get('list','');modal(`<h2>Search your shopping list</h2><p class="muted">Type or paste your list — one item per line or separated by commas. We’ll find each one.</p><textarea id="lst" rows="8" placeholder="milk&#10;eggs&#10;challah&#10;bananas">${esc(prev)}</textarea><div class="row" style="margin-top:12px;justify-content:flex-end"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn lime" onclick="DB.set('list',lst.value);closeModal();go('/list?t='+Date.now())">Find my items</button></div>`);setTimeout(()=>$('lst')?.focus(),50)}
function vListSearch(){const lines=String(DB.get('list','')).split(/[\n,]+/).map(s=>s.trim()).filter(Boolean).slice(0,40);
  return `<div class="wrap listres"><div class="listhead" style="margin-top:24px"><div><h1>Your shopping list</h1><span class="cnt">${lines.length} item${lines.length===1?'':'s'}</span></div><button class="btn ghost" onclick="openList()">Edit list</button></div>
  ${lines.length?lines.map(l=>{const r=matches(l).slice(0,12);return `<h3>${esc(l)} <small>${r.length?'':'no matches — try another word'}</small></h3>${cfRow(r)}`}).join(''):'<div class="empty"><p>Your list is empty.</p><button class="btn lime" onclick="openList()">Add items</button></div>'}</div>`}
function vLocation(){const a=S.address||'';
  return `<div class="wrap"><h1 style="margin-top:26px">Store Location</h1><div class="two" style="margin-top:0"><div class="panel"><h3>${esc(S.brand?.name||'Center Fresh Supermarket')}</h3>
   ${a?`<p style="font-size:1.05rem"><b>${esc(a)}</b></p><p><a class="btn lime" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a)}">Get directions</a></p>`:'<p class="muted">The store address will appear here (Back office → Settings → Store General).</p>'}
   ${S.phone?`<p>📞 <a href="tel:${esc(S.phone)}">${esc(S.phone)}</a></p>`:''}${S.email?`<p>✉️ <a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>`:''}
   ${S.hours?`<h3>Store hours</h3><p style="white-space:pre-line">${esc(S.hours)}</p>`:''}<p><a href="#/hours">Delivery & pickup hours</a></p></div>
   ${a?`<div class="panel" style="padding:0;overflow:hidden"><iframe title="Map to the store" src="https://maps.google.com/maps?q=${encodeURIComponent(a)}&output=embed" style="border:0;width:100%;height:420px" loading="lazy"></iframe></div>`:''}</div></div>`}
function vSubscribe(){return `<div class="wrap" style="max-width:640px"><h1 style="margin-top:26px">Subscribe</h1><p class="muted">Get the weekly flyer and specials by email or text.</p>
  <form class="panel" onsubmit="return subscribe(event)"><label for="sbe">Email</label><input id="sbe" name="email" type="email" required autocomplete="email"><div class="grid2"><div><label for="sbf">First name</label><input id="sbf" name="first" autocomplete="given-name"></div><div><label for="sbc">Cell phone</label><input id="sbc" name="cell" type="tel" autocomplete="tel"></div></div>
  <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true"><label class="check"><input type="checkbox" required> I agree to receive emails and texts with specials. Reply STOP or unsubscribe any time.</label><button class="btn lime" style="margin-top:12px" type="submit">Subscribe</button></form></div>`}
window.subscribe=function(e){e.preventDefault();const f=e.target;if(f.website&&f.website.value)return false;SUBS.push({email:f.email.value.trim(),first:f.first?.value||'',cell:f.cell?.value||'',t:Date.now()});saveAll();f.reset();toast('Thanks! You’re subscribed to our weekly specials.');return false};

/* info pages */
const _vPageCF=window.vPage;
window.vPage=function(r){
  const name=esc(S.brand?.name||'Center Fresh Supermarket'),areas=S.areas.filter(a=>a.active);
  if(r==='faq'){const F=[['About '+name,[['Who are you?',`${name} is a full-service supermarket with a butcher, fish counter, bakery, deli and catering. Shop online for delivery or pickup, or visit the store.`]]],
    ['How ordering works',[['How do I place an order?',`Create an account, choose a delivery or pickup time, add items to your cart and check out once you reach the ${money(S.minOrder)} minimum.`],['Can I leave instructions?','Yes. Add a note to any item (ripeness, thickness, trimming) and special instructions for the whole order at checkout.'],['What if an item is out of stock?','Choose for each item in your cart, or for the whole order at checkout: substitute, call you first, or leave it out.']]],
    ['Where we deliver',[['Which towns?',areas.map(a=>`${a.name} (${money(a.fee)} fee, ${money(a.min)} minimum)`).join(', ')+'.']]],
    ['Schedule',[['When are deliveries?',`Two-hour windows. Same-day orders close at ${h12(S.cutoffs[0]??16)} Sunday–Thursday and ${h12(S.cutoffs[5]??12)} on Friday.`]]],
    ['Hours',[['When is the store open?',S.hours?esc(S.hours):'See the Store Hours page.']]],
    ['Inventory & prices',[['Are online prices the same as in store?','Online prices match the store. Items sold by weight show an estimated price; you pay the actual weight.'],['Do you sell alcohol online?',S.noAlcohol?'No. Alcohol isn’t sold online.':'Yes, where permitted.']]],
    ['About my order',[['When is my card charged?','We pre-authorize your card for the estimated total. The final charge reflects actual weights, availability and substitutions.'],['Can I change my order?','Yes — while it shows “Received”, change quantities, remove items, change the time, or use “Add to my order”.']]],
    ['Other',[['How do I reach you?','Use the Contact Us page or call the store.']]]];
    return `<div class="wrap" style="max-width:900px"><h1 style="margin-top:26px">Frequently Asked Questions</h1>${F.map(([h,qs])=>`<h2 style="margin-top:26px;font-size:1.25rem">${h}</h2>${qs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}`).join('')}</div>`}
  if(r==='delivery')return `<div class="wrap" style="max-width:1000px"><h1 style="margin-top:26px">Delivery Info</h1>
   <div class="trust" style="margin-top:0"><div><span class="ic">🛒</span><span><b>${money(S.minOrder)} minimum</b><span>Delivery and pickup</span></span></div><div><span class="ic">💲</span><span><b>${money(S.fee)} service fee</b><span>Varies by area</span></span></div><div><span class="ic">⏰</span><span><b>2-hour windows</b><span>Pick at checkout</span></span></div><div><span class="ic">🚚</span><span><b>Same-day</b><span>Order by the cutoff</span></span></div></div>
   <div class="panel tbl-wrap"><h3>Delivery areas</h3><table><thead><tr><th>Area</th><th>Service fee</th><th>Minimum</th><th>Lower fee</th></tr></thead><tbody>${areas.map(a=>`<tr><td>${esc(a.name)}</td><td>${money(a.fee)}</td><td>${money(a.min)}</td><td>${a.discOver>0&&a.discFee!=null?money(a.discFee)+' over '+money(a.discOver):'—'}</td></tr>`).join('')}</tbody></table></div>
   <div class="panel tbl-wrap"><h3>Same-day cutoff and windows</h3><table><tbody>${[0,1,2,3,4,5,6].map(i=>`<tr><td>${DAYS[i]}</td><td>${S.windows[i]?h12(S.windows[i][0])+' – '+h12(S.windows[i][1]):'No delivery'}</td><td>${S.cutoffs[i]!=null?'Order by '+h12(S.cutoffs[i]):''}</td></tr>`).join('')}</tbody></table></div>
   <div class="panel"><h3>Good to know</h3><ul><li>The final charge is adjusted for availability, substitutions and actual product weights.</li>${S.noAlcohol?'<li>We don’t sell alcohol online.</li>':''}<li>${esc(S.doorPolicy||'')}</li></ul><a class="btn lime" href="javascript:openSlot()">Choose a delivery time</a></div></div>`;
  if(r==='about')return `<div class="wrap" style="max-width:860px"><h1 style="margin-top:26px">About Us</h1><div class="panel prose"><p>${name} is a full-service neighborhood supermarket: fresh produce, a full butcher and fish counter, a bakery, deli and catering, and a full grocery aisle.</p><p>Shop online and we hand-pick your order, then deliver it or have it ready for pickup.</p></div></div>`;
  return _vPageCF(r)};

/* ===================================================================
   ROUTER — new pages
   =================================================================== */
const _routeCF=window.route;
window.route=function(){
  const h=location.hash.slice(1)||'/';const [path]=h.split('?');const parts=path.split('/').filter(Boolean).map(decodeURIComponent);const r=parts[0]||'';
  const NEW={flyer:vFlyer,'buy-again':vBuyAgain,list:vListSearch,location:vLocation,subscribe:vSubscribe,collection:()=>vCollection(parts[1])};
  if(r==='circular'){location.replace('#/flyer');return}
  if(NEW[r]){closeSugg();document.body.classList.remove('bo-mode','standalone');$('app').innerHTML=NEW[r]();renderNav(parts);window.scrollTo(0,0);renderSideCart();applyBrand();document.title=(r==='flyer'?'Our Flyer':r==='buy-again'?'Buy Again':r==='list'?'Shopping list':r==='location'?'Store Location':r==='subscribe'?'Subscribe':COLL[parts[1]]?.t||'')+' — '+(S.brand?.name||'Center Fresh');return}
  _routeCF();
  if(r==='')startHome();
  const T={'':'Groceries delivered',dept:parts[1]||'',search:'Search',specials:'Weekly Specials',p:prod(parts[1])?.name||'Product',recipes:'Recipes',deli:'Deli Menu',checkout:'Checkout',orders:'My Orders',account:'My Account',faq:'FAQ',delivery:'Delivery Info',admin:'Back office'};
  document.title=(T[r]??'')+(T[r]?' — ':'')+(S.brand?.name||'Center Fresh Supermarket');
  $('app').focus({preventScroll:true});
};

/* ===================================================================
   SIGN IN — Supabase accounts
   =================================================================== */
window.openLogin=function(msg,tab='in'){
  modal(`<h2 style="margin-top:0">${tab==='up'?'Create your account':tab==='forgot'?'Reset your password':'Sign in'}</h2>${msg?`<p class="muted">${esc(msg)}</p>`:''}
  ${tab!=='forgot'?`<div class="tabs"><button class="${tab==='in'?'on':''}" onclick="openLogin(${qa(msg||'')},'in')">Sign in</button><button class="${tab==='up'?'on':''}" onclick="openLogin(${qa(msg||'')},'up')">Create account</button></div>`:''}
  ${tab==='in'?`<form onsubmit="return doLogin(event)"><label for="le">Email</label><input id="le" type="email" required autocomplete="email"><label for="lp">Password</label><input id="lp" type="password" required autocomplete="current-password"><div class="err" id="lerr" role="alert"></div>
   <button class="btn lime" type="submit" style="width:100%;margin-top:14px">Sign in</button><p style="text-align:center"><button type="button" class="linkbtn" onclick="openLogin('','forgot')">Forgot password?</button></p></form>`
  :tab==='up'?`<form onsubmit="return doRegister(event)"><div class="grid2"><div><label for="rf">First name</label><input id="rf" required autocomplete="given-name"></div><div><label for="rl">Last name</label><input id="rl" required autocomplete="family-name"></div></div>
   <label for="re">Email</label><input id="re" type="email" required autocomplete="email"><label for="rph">Cell phone</label><input id="rph" type="tel" required autocomplete="tel"><label for="rp">Password <span class="muted small">(8+ characters)</span></label><input id="rp" type="password" minlength="8" required autocomplete="new-password">
   <label class="check"><input type="checkbox" id="rsub" checked> Send me weekly specials</label><div class="err" id="rerr" role="alert"></div><button class="btn lime" type="submit" style="width:100%;margin-top:14px">Create account</button></form>`
  :`<form onsubmit="return doForgot(event)"><p class="muted small">Enter your email and we’ll send you a link to choose a new password. Already have the email? <a href="javascript:pasteReset(false)">Paste the link here</a>.</p><label for="fe">Email</label><input id="fe" type="email" required autocomplete="email"><div class="err" id="ferr" role="alert"></div><button class="btn lime" type="submit" style="width:100%;margin-top:14px">Send reset link</button><p style="text-align:center"><button type="button" class="linkbtn" onclick="openLogin()">Back to sign in</button></p></form>`}
  ${tab!=='forgot'&&S.googleLogin?`<div style="text-align:center;margin-top:12px"><span class="muted small">or</span><button type="button" class="btn ghost" style="width:100%;margin-top:8px" onclick="googleIn()">Continue with Google</button></div>`:''}`);
  setTimeout(()=>$(tab==='up'?'rf':tab==='forgot'?'fe':'le')?.focus(),50)};
const busy=(f,on,txt)=>{const b=f.querySelector('button[type=submit]');if(!b)return;b.disabled=on;if(txt)b.textContent=txt};
window.doLogin=async function(e){e.preventDefault();const f=e.target,em=$('le').value.trim().toLowerCase();busy(f,true,'Signing in…');
  const {error}=await sbc.auth.signInWithPassword({email:em,password:$('lp').value});
  if(error){busy(f,false,'Sign in');$('lerr').textContent=/confirm/i.test(error.message)?'Please open the confirmation link we emailed you first.':'That email and password don’t match. Tap “Forgot password?” to set a new one.';return false}
  location.reload();return false};
window.doRegister=async function(e){e.preventDefault();const f=e.target,em=$('re').value.trim().toLowerCase(),pw=$('rp').value;
  if(pw.length<8){$('rerr').textContent='Use at least 8 characters for your password.';return false}busy(f,true,'Creating account…');
  const meta={first:$('rf').value.trim(),last:$('rl').value.trim(),phone:$('rph').value.trim()};
  const {data,error}=await sbc.auth.signUp({email:em,password:pw,options:{data:meta,emailRedirectTo:location.origin+location.pathname}});
  if(error){busy(f,false,'Create account');$('rerr').textContent=/registered|exists/i.test(error.message)?'An account with this email already exists. Sign in instead.':error.message;return false}
  if($('rsub')?.checked){SUBS.push({email:em,first:meta.first,cell:meta.phone,t:Date.now()});saveAll();try{await CF.flushNow()}catch(x){}}
  if(data.session){location.reload();return false}
  modal(`<h2>Check your email</h2><p>We sent a confirmation link to <b>${esc(em)}</b>. Open it to finish creating your account, then sign in.</p><button class="btn lime" onclick="openLogin()">Back to sign in</button>`);return false};
window.doForgot=async function(e){e.preventDefault();const f=e.target;busy(f,true,'Sending…');
  CF.lastResetEmail=$('fe').value.trim();const {error}=await sbc.auth.resetPasswordForEmail($('fe').value.trim(),{redirectTo:location.origin+location.pathname});
  if(error){busy(f,false,'Send reset link');$('ferr').textContent='We couldn’t send the email right now. Please try again in a minute.';return false}
  pasteReset(true);return false};
window.pasteReset=function(sent){modal(`<h2>${sent?'Check your email':'Use your reset email'}</h2>${sent?'<p>If an account exists for that email, a reset email is on its way.</p>':''}
   <p class="small"><b>Don’t click the link in the email.</b> Right-click the “Reset Password” link (on a phone: press and hold), choose <b>Copy link</b>, and paste it here:</p>
   <form onsubmit="return doPasteReset(event)"><input id="rlink" type="text" name="reset-link-paste" required placeholder="Paste the link from the email here" autocomplete="off" autocorrect="off" spellcheck="false" data-lpignore="true" data-1p-ignore data-form-type="other"><div class="err" id="rlerr" role="alert"></div><button class="btn lime" type="submit" style="width:100%;margin-top:12px">Continue</button><p class="small" style="margin:12px 0 0;text-align:center"><a href="javascript:resendReset()" id="rlnew">Send a new email</a></p></form>`);setTimeout(()=>{const i=$('rlink');if(i){i.value='';i.focus()}},120)};
window.doPasteReset=async function(e){e.preventDefault();const err=$('rlerr');let v=$('rlink').value.trim();
  // unwrap links that Gmail/Outlook rewrite (google.com/url?q=…, safelinks…) and decode
  for(let i=0;i<4;i++){try{const d=decodeURIComponent(v);if(d===v)break;v=d}catch(x){break}}
  const grab=k=>{const m=v.match(new RegExp('[?&#]'+k+'=([^&#\\s]+)'));return m?m[1]:''};
  const at=grab('access_token'),rt=grab('refresh_token'),tok=grab('token_hash')||grab('token'),typ=grab('type')||'recovery',ec=grab('error_code');
  if(!at&&!tok){err.textContent=ec?'That link was already used or has expired. Click “Send a new email” below, then copy the new link WITHOUT clicking it.':'Paste the link from the email here (it starts with https://vqwhjyoosfiyfzcjzyxn.supabase.co/auth/v1/verify…), not your email address.';$('rlnew')?.removeAttribute('hidden');return false}
  const btn=e.target.querySelector('button[type=submit]');if(btn){btn.disabled=true;btn.textContent='Checking…'}
  let r;
  if(at)r=await sbc.auth.setSession({access_token:at,refresh_token:rt||at});
  else r=await sbc.auth.verifyOtp({token_hash:tok,type:typ==='magiclink'?'magiclink':typ==='signup'?'signup':'recovery'});
  if(r.error){if(btn){btn.disabled=false;btn.textContent='Continue'}err.textContent=/expired|invalid|not found|jwt/i.test(r.error.message)?'That link was already used or has expired. Click “Send a new email” below, then copy the new link WITHOUT clicking it.':r.error.message;$('rlnew')?.removeAttribute('hidden');return false}
  closeModal();showRecovery();return false};
window.resendReset=async function(){const em=(CF.lastResetEmail||'').trim()||prompt('Your email');if(!em)return;CF.lastResetEmail=em;
  const {error}=await sbc.auth.resetPasswordForEmail(em,{redirectTo:location.origin+location.pathname});toast(error?'Couldn’t send — wait a minute and try again':'New email sent — copy the link from the NEWEST email');};
window.googleIn=async function(){const {error}=await sbc.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});if(error)toast('Google sign-in isn’t set up yet.')};
window.logout=async function(){await CF.flushNow().catch(()=>{});await sbc.auth.signOut();location.hash='#/';location.reload()};
window.accPw=async function(e){e.preventDefault();const p1=$('p1').value,p2=$('p2').value;if(p1!==p2){$('perr').textContent='New passwords don’t match.';return false}if(p1.length<8){$('perr').textContent='Use at least 8 characters.';return false}
  const chk=await sbc.auth.signInWithPassword({email:me,password:$('p0').value});if(chk.error){$('perr').textContent='Current password is wrong.';return false}
  const {error}=await sbc.auth.updateUser({password:p1});if(error){$('perr').textContent=error.message;return false}e.target.reset();toast('Password changed');return false};
window.accInfo=function(e){e.preventDefault();const u=user();u.first=$('af').value.trim();u.last=$('al').value.trim();u.phone=$('aph').value.trim();saveAll();renderActs();toast('Saved');return false};
/* password recovery link */
window.showRecovery=()=>setTimeout(()=>modal(`<h2>Choose a new password</h2><form onsubmit="return setNewPw(event)"><label for="np1">New password</label><input id="np1" type="password" minlength="8" required autocomplete="new-password"><div class="err" id="nperr"></div><button class="btn lime" type="submit" style="width:100%;margin-top:12px">Save password</button></form>`),300);
if(CF.recovery){CF.recovery=false;showRecovery()}
sbc.auth.onAuthStateChange(ev=>{if(ev==='PASSWORD_RECOVERY')showRecovery()});
window.setNewPw=async function(e){e.preventDefault();const {error}=await sbc.auth.updateUser({password:$('np1').value});if(error){$('nperr').textContent=error.message;return false}closeModal();toast('Password saved — you’re signed in');setTimeout(()=>location.reload(),900);return false};
if(CF.blocked)setTimeout(()=>modal('<h2>Account turned off</h2><p>This account has been turned off. Please contact the store.</p>'),400);
/* guests can't add to cart — a clearer prompt */
window.needLogin=function(msg){if(me)return false;openLogin(msg||'Sign in or create a free account to start your cart.');return true};

/* footer */
const _footerCF=window.footer;window.footer=function(){_footerCF();$('f-social').innerHTML=S.instagram?`<a href="${esc(S.instagram)}" target="_blank" rel="noopener" style="display:inline-flex;gap:8px;align-items:center;margin-top:10px">📷 Instagram</a>`:'';
  const s=$('f-store');if(s&&!S.address&&!S.phone)s.textContent=S.brand?.tagline||''};
