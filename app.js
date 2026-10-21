
/* Storage lives in Supabase — see cf-data.js */
const DB=window.CFDB;

/* ============ CATALOG ============
   The product list comes from catalog.js (generated from the store's website pictures).
   Prices, sale prices, cases, edits and new products are stored as changes on top of it. */
const DEPTS=window.CATALOG_DEPTS;            // name -> [emoji, [subcategories], department picture]
const DEPT_NAMES=Object.keys(DEPTS);
const hue=d=>(DEPT_NAMES.indexOf(d)*37+70)%360;
const EDIT_KEYS=['name','size','dept','sub','price','unit','img','emoji','sale','caseQty','caseP','dealN','dealT','pop','featured'];
const BASE={};
(window.CATALOG||[]).forEach(r=>{const dept=DEPT_NAMES[r[3]];BASE[r[0]]={id:r[0],name:r[1],size:r[2],dept,sub:r[4],img:'img/p/'+r[5]+'.webp',emoji:DEPTS[dept][0],unit:r[6]?'lb':'ea',
  price:null,sale:null,caseQty:null,caseP:null,dealN:null,dealT:null,pop:50,featured:/^nutmeg/i.test(r[1])}});
const RECIPE_CATS=['Shabbos','Yom Tov','Breakfast','Soups','Salads','Meat','Chicken','Fish','Sides','Kugels','Desserts','Quick & Easy','Kids'];
const RECIPE_PHOTOS={r1:'img/r/Vegetable-Chicken-Soup-ff57ce54c62e.webp',r3:'img/r/Beef-Brisket-in-Sweet-and-Sour-Sauce-e324751e749b.webp',r6:'img/r/Shakshuka-Recipe.-All-Variations.-Gluten-Free-520ccd88765c.webp',r7:'img/r/Speedy-Baked-Ziti-c4438ee06275.webp'};
const RECIPES=[
 {id:'r1',title:'Classic Chicken Soup',cat:'Soups',chef:'Center Fresh Kitchen',diet:'Meat',holiday:'Shabbos',time:150,serves:10,emoji:'🍲',pop:98,
  ing:[['1 whole chicken, cut in eighths','Whole Chicken'],['4 carrots, peeled','Carrots'],['2 onions, halved','Yellow Onions'],['1 bunch fresh dill','Fresh Dill'],['1 tbsp kosher salt','Kosher Salt']],
  steps:['Place chicken in a large pot and cover with 4 quarts cold water. Bring to a boil and skim the foam.','Add carrots, onions and salt. Lower heat and simmer, partly covered, for 2 hours.','Add dill for the last 15 minutes. Strain, return carrots and chicken, and season to taste.']},
 {id:'r2',title:'Potato Kugel',cat:'Kugels',chef:'Center Fresh Kitchen',diet:'Parve',holiday:'Shabbos',time:90,serves:12,emoji:'🥔',pop:94,
  ing:[['5 lb russet potatoes','Russet Potatoes'],['2 onions','Yellow Onions'],['6 large eggs','Large Eggs'],['½ cup olive oil','Extra Virgin Olive Oil'],['1 tbsp kosher salt','Kosher Salt']],
  steps:['Heat oven to 425°F and heat the oil in a 9x13 pan.','Grate potatoes and onions, drain well, then mix in eggs and salt.','Pour into the hot pan and bake 75 minutes until deep golden and crisp.']},
 {id:'r3',title:'Honey Garlic Brisket',cat:'Meat',chef:'Chef Yossi',diet:'Meat',holiday:'Rosh Hashanah',time:240,serves:8,emoji:'🥩',pop:90,
  ing:[['3 lb first cut brisket','First Cut Brisket'],['3 onions, sliced','Yellow Onions'],['1 head garlic','Garlic'],['2 tsp sweet paprika','Sweet Paprika'],['1 cup tomato sauce','Tomato Sauce']],
  steps:['Heat oven to 325°F. Spread onions in a roasting pan.','Rub brisket with paprika and crushed garlic, set on onions, and pour sauce over.','Cover tightly and roast 3½ hours. Cool, slice against the grain, and rewarm in its juices.']},
 {id:'r4',title:'Lemon Dill Salmon',cat:'Fish',chef:'Chef Rivky',diet:'Parve',holiday:'',time:25,serves:4,emoji:'🐟',pop:86,
  ing:[['1½ lb salmon fillet','Atlantic Salmon Fillet'],['2 lemons','Lemons'],['Handful fresh dill','Fresh Dill'],['2 tbsp olive oil','Extra Virgin Olive Oil'],['2 cloves garlic','Garlic']],
  steps:['Heat oven to 400°F and line a sheet pan.','Brush salmon with oil, garlic and lemon juice. Top with lemon slices and dill.','Bake 15–18 minutes until it flakes easily.']},
 {id:'r5',title:'Israeli Salad',cat:'Salads',chef:'Center Fresh Kitchen',diet:'Parve',holiday:'',time:15,serves:6,emoji:'🥗',pop:80,
  ing:[['4 cucumbers','Cucumbers'],['1 lb plum tomatoes','Plum Tomatoes'],['½ red onion','Yellow Onions'],['Juice of 1 lemon','Lemons'],['3 tbsp olive oil','Extra Virgin Olive Oil']],
  steps:['Dice cucumbers, tomatoes and onion small and evenly.','Toss with lemon juice, oil and salt just before serving.']},
 {id:'r6',title:'Shakshuka',cat:'Breakfast',chef:'Chef Rivky',diet:'Parve',holiday:'',time:30,serves:4,emoji:'🍳',pop:77,
  ing:[['6 large eggs','Large Eggs'],['2 cans tomato sauce','Tomato Sauce'],['1 onion','Yellow Onions'],['3 cloves garlic','Garlic'],['1 tsp sweet paprika','Sweet Paprika']],
  steps:['Soften onion and garlic in a wide pan, then stir in paprika and sauce. Simmer 10 minutes.','Make wells, crack in the eggs, cover and cook until whites set.']},
 {id:'r7',title:'Baked Ziti',cat:'Kids',chef:'Center Fresh Kitchen',diet:'Dairy',holiday:'Shavuos',time:45,serves:8,emoji:'🍝',pop:83,
  ing:[['1 lb pasta','Spaghetti'],['2 cans tomato sauce','Tomato Sauce'],['16 oz shredded mozzarella','Shredded Mozzarella']],
  steps:['Cook pasta until just shy of tender and drain.','Mix with sauce and half the cheese, top with the rest, and bake at 375°F for 25 minutes.']},
 {id:'r8',title:'Babka French Toast',cat:'Desserts',chef:'Chef Yossi',diet:'Dairy',holiday:'',time:20,serves:4,emoji:'🍫',pop:75,
  ing:[['1 chocolate babka','Chocolate Babka'],['3 large eggs','Large Eggs'],['½ cup milk','Whole Milk'],['2 tbsp butter','Butter']],
  steps:['Slice babka thickly. Whisk eggs with milk.','Dip slices and fry in butter until golden on both sides.']},
 {id:'r9',title:'Crispy Chicken Cutlets',cat:'Chicken',chef:'Chef Rivky',diet:'Meat',holiday:'',time:30,serves:6,emoji:'🍗',pop:92,
  ing:[['2 lb chicken cutlets','Chicken Cutlets'],['2 large eggs','Large Eggs'],['1 cup flour','All-Purpose Flour'],['1 tsp sweet paprika','Sweet Paprika'],['Oil for frying','Extra Virgin Olive Oil']],
  steps:['Season flour with paprika and salt. Beat the eggs.','Dredge cutlets in flour, then egg, then flour again.','Fry in hot oil 3 minutes a side and drain on paper towels.']}
];

const DELI_MENU={'Shulem Zucher':[],'Vachnacht':[],'Bris Seudah':[],'Kiddush':[],'Platters':[],'Packages':[],'BBQ Menu':[],'Gift':[]};

const DEFAULT_SETTINGS={
 minOrder:100, fee:4.95, noteMax:120,
 towns:['Borough Park','Midwood','Flatbush','Kensington','Bensonhurst','Williamsburg'],
 cutoffs:{0:16,1:16,2:16,3:16,4:16,5:12},          // hour of day (24h); Friday 12 PM
 windows:{0:[9,16],1:[9,18],2:[9,18],3:[9,18],4:[9,18],5:[9,13]}, // Friday window is a placeholder — set your own
 address:'4517 13th Ave, Brooklyn, NY 11219', phone:'718-633-8099', email:'office@centerfreshsupermarket.com', hours:'Sun–Thu 7am–11pm · Fri 7am–2 hrs before Shabbos', instagram:'', ios:'', android:''
};

/* ============ STATE ============ */
let S=Object.assign({},DEFAULT_SETTINGS,DB.get('settings',{}));
let OVR=DB.get('productChanges',{}),DELETED=new Set(DB.get('productDeleted',[]));
let P=Object.values(BASE).filter(b=>!DELETED.has(b.id)).map(b=>Object.assign({},b,OVR[b.id]||{}));
Object.values(OVR).forEach(o=>{if(o._new&&!DELETED.has(o.id))P.push(Object.assign({},o))});
function saveProducts(){
  const o={},ids=new Set(P.map(p=>p.id));
  P.forEach(p=>{const b=BASE[p.id];if(!b){o[p.id]={...p,_new:1};return}const d={};EDIT_KEYS.forEach(k=>{if((p[k]??null)!==(b[k]??null))d[k]=p[k]});if(Object.keys(d).length)o[p.id]=d});
  Object.keys(BASE).forEach(id=>{if(!ids.has(id))DELETED.add(id)});
  OVR=o;DB.set('productChanges',o);DB.set('productDeleted',[...DELETED]);
}
let USERS=DB.get('users',null);
if(!USERS)USERS=[];
let ORDERS=DB.get('orders',[]);
let MSGS=DB.get('messages',[]);
let SUBS=DB.get('subscribers',[]);
let me=DB.get('session',null);

function hash(s){let h=5381;for(const c of s)h=((h<<5)+h+c.charCodeAt(0))|0;return 'h'+(h>>>0).toString(36)}
const user=()=>USERS.find(u=>u.email===me);
const isAdmin=()=>user()?.role==='admin';
const prodById={};const prod=id=>{let p=prodById[id];if(p&&P.includes(p))return p;p=P.find(x=>x.id===id);if(p)prodById[id]=p;return p};
const hasPrice=p=>p&&p.price!=null&&p.price>0;
const money=n=>'$'+(Math.round(n*100)/100).toFixed(2);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const saveAll=()=>{saveProducts();DB.set('users',USERS);DB.set('orders',ORDERS);DB.set('messages',MSGS);DB.set('subscribers',SUBS);DB.set('settings',S)};
const cartKey=()=>'cart_'+me;
const getCart=()=>me?DB.get(cartKey(),[]):[];
const setCart=c=>{DB.set(cartKey(),c);renderActs();if(drawerOpen)renderDrawer()};

/* ============ PRICING ============ */
const unitPrice=p=>(p?.sale||p?.price||0);
function lineTotal(it){
  const p=prod(it.pid); if(!p) return it.qty*(it.price||0);
  if(it.mode==='case') return it.qty*p.caseP;
  const u=unitPrice(p);
  if(p.dealN&&p.unit==='ea'&&it.qty>=p.dealN) return Math.floor(it.qty/p.dealN)*p.dealT+(it.qty%p.dealN)*u;
  return it.qty*u;
}
const subtotal=items=>items.reduce((a,i)=>a+lineTotal(i),0);
const stepOf=(p,mode)=>mode!=='case'&&p.unit==='lb'?0.5:1;
const qtyLabel=(it,p)=>it.mode==='case'?`${it.qty} case${it.qty>1?'s':''} of ${p?.caseQty||''}`:(p?.unit==='lb'?`${it.qty} lb`:`${it.qty}`);

/* ============ DELIVERY TIME LOGIC ============ */
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const h12=h=>{const hh=Math.floor(h),m=Math.round((h-hh)*60);const s=hh>=12?'PM':'AM';return ((hh+11)%12+1)+(m?':'+String(m).padStart(2,'0'):'')+' '+s};
function slotsFor(dateStr){
  const d=new Date(dateStr+'T00:00'),w=S.windows[d.getDay()]; if(!w) return [];
  const now=new Date(),today=ymd(now)===dateStr;
  if(today){const c=S.cutoffs[d.getDay()]; if(c==null||now.getHours()+now.getMinutes()/60>=c) return []}
  const out=[]; for(let h=w[0];h+2<=w[1];h++){ if(today&&h<now.getHours()+2) continue; out.push(`${h12(h)} – ${h12(h+2)}`) }
  return out;
}
function nextDates(n=8){const out=[];const d=new Date();for(let i=0;i<14&&out.length<n;i++){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+i);const s=ymd(x);if(slotsFor(s).length)out.push(s)}return out}
const prettyDate=s=>{const d=new Date(s+'T00:00'),t=ymd(new Date()),tm=ymd(new Date(Date.now()+864e5));return s===t?'Today':s===tm?'Tomorrow':d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})};

/* ============ ROUTER ============ */
let drawerOpen=false;
function route(){
  const h=location.hash.slice(1)||'/'; const [path,qs]=h.split('?'); const q=new URLSearchParams(qs||''); const parts=path.split('/').filter(Boolean).map(decodeURIComponent);
  closeSugg(); const app=document.getElementById('app'); let html='';
  const r=parts[0]||'';
  if(r==='')html=vHome();
  else if(r==='dept')html=vList({dept:parts[1],sub:q.get('sub'),sort:q.get('sort')||'popular',page:+q.get('page')||1});
  else if(r==='specials')html=vList({specials:true,sort:q.get('sort')||'popular',page:+q.get('page')||1});
  else if(r==='search')html=vList({q:q.get('q')||'',sort:q.get('sort')||'popular',page:+q.get('page')||1});
  else if(r==='p')html=vProduct(parts[1]);
  else if(r==='my-items')html=vMyItems();
  else if(r==='checkout')html=vCheckout();
  else if(r==='orders')html=vOrders();
  else if(r==='order')html=vOrder(parts[1]);
  else if(r==='account')html=vAccount();
  else if(r==='recipes')html=vRecipes(q);
  else if(r==='recipe')html=vRecipe(parts[1]);
  else if(r==='deli')html=vDeli();
  else if(r==='admin')html=vAdmin(parts[1]||'orders',q);
  else html=vPage(r);
  app.innerHTML=html; renderNav(parts); window.scrollTo(0,0);
  if(r==='')startHome();
  if(r==='checkout'){const f=document.querySelector('#dates a');if(f)f.click()}
}
window.addEventListener('hashchange',route);
const go=h=>{location.hash=h};

/* ============ HEADER ============ */
function renderActs(){
  const u=user(),n=getCart().length;
  document.getElementById('acts').innerHTML=
   (u?`<a href="#/account">👤 <span class="lbl">${esc(u.first)}</span></a><a href="#/my-items">♡ <span class="lbl">My Items</span></a><a href="#/orders">🧾 <span class="lbl">Orders</span></a>${u.role==='admin'?'<a href="#/admin">⚙ <span class="lbl">Admin</span></a>':''}`
     :`<button onclick="openLogin()">👤 <span class="lbl">Sign in</span></button>`)+
   `<button class="cartbtn" onclick="openDrawer()" aria-label="Cart, ${n} items">🛒 <span class="lbl">Cart</span> <span class="n">${n}</span></button>`;
}
function renderNav(parts){
  document.getElementById('deptnav').innerHTML=`<a class="sp ${parts[0]==='specials'?'on':''}" href="#/specials">Specials</a>`+
   DEPT_NAMES.map(d=>`<a class="${parts[0]==='dept'&&parts[1]===d?'on':''}" href="#/dept/${encodeURIComponent(d)}">${esc(d)}</a>`).join('')+
   `<a href="#/recipes" class="${parts[0]==='recipes'?'on':''}">Recipes</a><a href="#/deli" class="${parts[0]==='deli'?'on':''}">Deli Menu</a>`;
}

/* Search suggestions */
const qEl=document.getElementById('q'),sg=document.getElementById('sugg');
function matches(t){t=t.trim().toLowerCase(); if(!t) return []; return P.filter(p=>(p.name+' '+p.dept+' '+p.sub).toLowerCase().includes(t)).sort((a,b)=>b.pop-a.pop)}
qEl.addEventListener('input',()=>{
  const m=matches(qEl.value); if(!qEl.value.trim()){closeSugg();return}
  sg.innerHTML=(m.length?m.slice(0,6).map(p=>`<div class="sg"><a href="#/p/${p.id}" class="${tcls(p)}" style="--h:${hue(p.dept)}">${pimg(p)}</a><a href="#/p/${p.id}">${esc(p.name)}<div class="small muted">${esc(p.size)}</div></a><span class="p">${priceHTML(p)}</span><button class="add-btn" onclick="quickAdd('${p.id}')">Add</button></div>`).join(''):'<div class="sg-all muted">No products match. Try a shorter word.</div>')+
   (m.length>6?`<a class="sg-all" href="#/search?q=${encodeURIComponent(qEl.value)}">See all ${m.length} results</a>`:'');
  sg.classList.add('on');
});
qEl.addEventListener('keydown',e=>{if(e.key==='Enter'&&qEl.value.trim())go('/search?q='+encodeURIComponent(qEl.value.trim()));if(e.key==='Escape')closeSugg()});
document.addEventListener('click',e=>{if(!e.target.closest('.search'))closeSugg()});
function closeSugg(){sg.classList.remove('on')}

/* ============ PRODUCT BITS ============ */
const isPic=v=>/^(data:|https?:|img\/)/.test(String(v||''));
const fallbackEmoji=p=>p.emoji||(isPic(p.img)?(DEPTS[p.dept]?.[0]||'🛒'):p.img)||'🛒';
function picFail(img,e){const t=img.parentElement;t.classList.remove('photo');t.textContent=e}
const pimg=p=>isPic(p.img)?`<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy" onerror="picFail(this,'${fallbackEmoji(p)}')">`:esc(p.img||'🛒');
const tcls=p=>isPic(p?.img)?'thumb photo':'thumb';
function priceHTML(p){
  if(!hasPrice(p)) return '<span class="nop">Price coming soon</span>';
  const u=p.unit==='lb'?'/lb':'';
  return p.sale?`<span class="price sale">${money(p.sale)}${u}<s>${money(p.price)}</s></span>`:`<span class="price">${money(p.price)}${u}</span>`;
}
const dealText=p=>p.dealN?`${p.dealN} for ${money(p.dealT).replace('.00','')}`:'';
function card(p){
  const u=user(),fav=u?.fav?.includes(p.id);
  return `<article class="pc">
   ${p.sale?'<span class="tag">Sale</span>':''}${p.dealN?`<span class="tag deal">${dealText(p)}</span>`:''}
   <button class="fav" onclick="toggleFav('${p.id}')" aria-label="${fav?'Remove from':'Add to'} My Items">${fav?'♥':'♡'}</button>
   <a href="#/p/${p.id}" class="${tcls(p)}" style="--h:${hue(p.dept)}">${pimg(p)}</a>
   <a href="#/p/${p.id}" class="nm">${esc(p.name)}</a><span class="sz">${esc(p.size)}${p.caseQty?' · case available':''}</span>
   <div class="foot">${priceHTML(p)}<span id="ctl-${p.id}">${ctl(p)}</span></div></article>`;
}
function ctl(p){
  if(!hasPrice(p)) return '';
  const it=getCart().find(i=>i.pid===p.id&&i.mode==='unit');
  if(!it) return `<button class="add-btn" onclick="quickAdd('${p.id}')">Add</button>`;
  return `<span class="step"><button onclick="bump('${p.id}',-1)" aria-label="Less">−</button><span>${qtyLabel(it,p)}</span><button onclick="bump('${p.id}',1)" aria-label="More">+</button></span>`;
}
function refreshCtl(id){const el=document.getElementById('ctl-'+id); if(el) el.innerHTML=ctl(prod(id))}

/* ============ CART ACTIONS ============ */
function needLogin(msg){ if(me) return false; openLogin(msg||'Sign in to add items to your cart.'); return true }
function addToCart(pid,qty,mode='unit',note=''){
  if(!hasPrice(prod(pid))){toast('This item isn’t priced yet.');return}
  if(needLogin()) return;
  const c=getCart(); const ex=c.find(i=>i.pid===pid&&i.mode===mode&&(i.note||'')===(note||''));
  if(ex) ex.qty=+(ex.qty+qty).toFixed(2); else c.push({pid,qty,mode,note});
  setCart(c); refreshCtl(pid); toast(`Added ${prod(pid).name}`);
}
function quickAdd(pid){const p=prod(pid);addToCart(pid,p.unit==='lb'?1:1)}
function bump(pid,dir){
  const c=getCart(),it=c.find(i=>i.pid===pid&&i.mode==='unit'),p=prod(pid); if(!it) return;
  it.qty=+(it.qty+dir*stepOf(p,'unit')).toFixed(2); if(it.qty<=0) c.splice(c.indexOf(it),1);
  setCart(c); refreshCtl(pid);
}
function cartBump(idx,dir){const c=getCart(),it=c[idx],p=prod(it.pid);it.qty=+(it.qty+dir*stepOf(p,it.mode)).toFixed(2);if(it.qty<=0)c.splice(idx,1);setCart(c);refreshCtl(it.pid)}
function cartRemove(idx){const c=getCart(),pid=c[idx].pid;c.splice(idx,1);setCart(c);refreshCtl(pid)}
function cartNote(idx){
  const c=getCart(),it=c[idx];
  modal(`<h2>Add a note</h2><p class="muted small">Tell the shopper how you'd like ${esc(prod(it.pid)?.name)} — ripeness, thickness, trimming.</p>
   <textarea id="nt" maxlength="${S.noteMax}" rows="3">${esc(it.note||'')}</textarea><div class="small muted" id="ntc"></div>
   <div class="row" style="margin-top:12px"><button class="btn" onclick="saveNote(${idx})">Save note</button></div>`);
  const nt=document.getElementById('nt'),cc=document.getElementById('ntc');const upd=()=>cc.textContent=`${nt.value.length} of ${S.noteMax} characters`;nt.oninput=upd;upd();nt.focus();
}
function saveNote(idx){const c=getCart();c[idx].note=document.getElementById('nt').value.trim();setCart(c);closeModal();toast('Note saved')}
function toggleFav(pid){
  if(needLogin('Sign in to save items to My Items.')) return;
  const u=user(); u.fav=u.fav||[]; const i=u.fav.indexOf(pid); i>=0?u.fav.splice(i,1):u.fav.push(pid); saveAll();
  document.querySelectorAll(`.fav[onclick="toggleFav('${pid}')"]`).forEach(b=>{b.textContent=i>=0?'♡':'♥'});
  toast(i>=0?'Removed from My Items':'Saved to My Items');
}

/* ============ DRAWER ============ */
function openDrawer(){ if(needLogin('Sign in to see your cart.')) return; drawerOpen=true; renderDrawer(); document.getElementById('drawer').classList.add('on'); document.getElementById('scrim').classList.add('on') }
function closeAll(){drawerOpen=false;document.getElementById('drawer').classList.remove('on');document.getElementById('scrim').classList.remove('on');closeModal()}
function lastOpenOrder(){return ORDERS.filter(o=>o.email===me&&o.status==='Received').sort((a,b)=>b.created-a.created)[0]}
function renderDrawer(){
  const c=getCart(),st=subtotal(c),pct=Math.min(100,st/S.minOrder*100),open=lastOpenOrder();
  document.getElementById('drawer').innerHTML=`<header><h2 style="margin:0">Your cart</h2><button class="x" onclick="closeAll()" aria-label="Close cart">×</button></header>
  <div class="body">${c.length?c.map((it,i)=>{const p=prod(it.pid);return `<div class="line"><span class="${tcls(p)}" style="--h:${hue(p?.dept)}">${p?pimg(p):'🛒'}</span>
    <div><div class="nm">${esc(p?.name||'Item no longer available')}</div><div class="small muted">${esc(p?.size||'')}${it.mode==='case'?' · by the case':''}</div>
    ${it.note?`<span class="note">“${esc(it.note)}”</span>`:''}
    <div class="row" style="margin-top:6px;gap:10px"><span class="step"><button onclick="cartBump(${i},-1)" aria-label="Less">−</button><span>${qtyLabel(it,p)}</span><button onclick="cartBump(${i},1)" aria-label="More">+</button></span>
    <button class="linkbtn" onclick="cartNote(${i})">${it.note?'Edit note':'Add note'}</button><button class="linkbtn red" onclick="cartRemove(${i})">Remove</button></div></div>
    <b class="price" style="font-size:.95rem">${money(lineTotal(it))}</b></div>`}).join('')
   :`<div class="empty"><div class="e">🧺</div><h3>Your cart is empty</h3><p class="muted">Start with this week's specials.</p><a class="btn lime" href="#/specials" onclick="closeAll()">Shop specials</a></div>`}</div>
  ${c.length?`<footer>
    <div class="sum t"><span>Subtotal</span><span>${money(st)}</span></div>
    ${st<S.minOrder?`<div class="meter"><i style="width:${pct}%"></i></div><div class="small muted">Add ${money(S.minOrder-st)} more to reach the ${money(S.minOrder)} minimum for delivery and pickup.</div>`:`<div class="small muted">Weighed items are estimated. Your final charge reflects actual weights and substitutions.</div>`}
    <button class="btn lime" style="width:100%;margin-top:12px" ${st<S.minOrder?'disabled':''} onclick="closeAll();go('/checkout')">Check out</button>
    ${open?`<button class="btn ghost" style="width:100%;margin-top:8px" onclick="addToLast()">Add to last order #${open.id}</button><div class="small muted" style="margin-top:4px">Allowed until the store starts preparing it.</div>`:''}
  </footer>`:''}`;
}
function addToLast(){
  const o=lastOpenOrder(); if(!o) return;
  getCart().forEach(it=>{const ex=o.items.find(i=>i.pid===it.pid&&i.mode===it.mode&&(i.note||'')===(it.note||''));ex?ex.qty=+(ex.qty+it.qty).toFixed(2):o.items.push({...it,name:prod(it.pid)?.name,price:unitPrice(prod(it.pid))})});
  recalc(o); o.log.push({t:Date.now(),m:'Customer added items'}); saveAll(); setCart([]); closeAll(); P.forEach(p=>refreshCtl(p.id)); toast(`Added to order #${o.id}`); go('/order/'+o.id);
}

/* ============ MODAL / TOAST ============ */
function modal(html){document.getElementById('mbox').innerHTML=`<button class="x" onclick="closeModal()" aria-label="Close">×</button>`+html;document.getElementById('modal').classList.add('on');document.getElementById('scrim').classList.add('on')}
function closeModal(){document.getElementById('modal').classList.remove('on');if(!drawerOpen)document.getElementById('scrim').classList.remove('on')}
let tt;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});

/* ============ AUTH ============ */
function openLogin(msg,tab='in'){
  modal(`<h2>${tab==='up'?'Create your account':tab==='forgot'?'Reset your password':'Sign in'}</h2>${msg?`<p class="muted">${esc(msg)}</p>`:''}
  <div class="tabs"><button class="${tab==='in'?'on':''}" onclick="openLogin('',  'in')">Sign in</button><button class="${tab==='up'?'on':''}" onclick="openLogin('','up')">Create account</button></div>
  ${tab==='in'?`<form onsubmit="return doLogin(event)"><label for="le">Email</label><input id="le" type="email" required autocomplete="email"><label for="lp">Password</label><input id="lp" type="password" required autocomplete="current-password"><div class="err" id="lerr"></div>
   <div class="row" style="justify-content:space-between;margin-top:14px"><button class="btn" type="submit">Sign in</button><button type="button" class="linkbtn" onclick="openLogin('','forgot')">Forgot password?</button></div></form>`
  :tab==='up'?`<form onsubmit="return doRegister(event)"><div class="grid2"><div><label for="rf">First name</label><input id="rf" required autocomplete="given-name"></div><div><label for="rl">Last name</label><input id="rl" required autocomplete="family-name"></div></div>
   <label for="re">Email</label><input id="re" type="email" required autocomplete="email"><label for="rph">Cell phone</label><input id="rph" type="tel" required autocomplete="tel"><label for="rp">Password</label><input id="rp" type="password" minlength="6" required autocomplete="new-password"><div class="err" id="rerr"></div>
   <button class="btn" type="submit" style="margin-top:14px">Create account</button></form>`
  :`<form onsubmit="return doForgot(event)"><p class="muted small">Enter your account email. The store will contact you to reset your password.</p><label for="fe">Email</label><input id="fe" type="email" required><button class="btn" type="submit" style="margin-top:14px">Send reset request</button></form>`}`);
}
function doLogin(e){e.preventDefault();const em=document.getElementById('le').value.trim().toLowerCase(),pw=document.getElementById('lp').value;const u=USERS.find(x=>x.email===em);
  if(!u||u.pass!==hash(pw)){document.getElementById('lerr').textContent='That email and password don’t match an account.';return false}
  me=em;DB.set('session',me);closeModal();renderActs();route();toast('Welcome back, '+u.first);return false}
function doRegister(e){e.preventDefault();const em=document.getElementById('re').value.trim().toLowerCase();
  if(USERS.some(u=>u.email===em)){document.getElementById('rerr').textContent='An account with this email already exists. Sign in instead.';return false}
  USERS.push({email:em,pass:hash(document.getElementById('rp').value),first:document.getElementById('rf').value.trim(),last:document.getElementById('rl').value.trim(),phone:document.getElementById('rph').value.trim(),role:'customer',fav:[],address:'',town:'',created:Date.now()});
  saveAll();me=em;DB.set('session',me);closeModal();renderActs();route();toast('Account created');return false}
function doForgot(e){e.preventDefault();MSGS.unshift({id:Date.now(),name:'Password reset',email:document.getElementById('fe').value,phone:'',order:'',msg:'Customer requested a password reset.',t:Date.now(),read:false});saveAll();modal('<h2>Request sent</h2><p>The store will contact you shortly to reset your password.</p>');return false}
function logout(){me=null;DB.set('session',null);renderActs();go('/');toast('Signed out')}

/* ============ VIEWS ============ */
const BANNERS=[
 {img:'img/b/Fresh-Produce-b41528f66349.webp',h:'Fresh produce, picked for you',p:'Leave a note on any item and our shoppers will choose to your taste.',l:'#/dept/Produce',c:'Shop produce'},
 {img:'img/b/Fresh-Meat-9e87972c312d.webp',h:'Cut to order at our butcher counter',p:'Priced by the pound and weighed when packed.',l:'#/dept/Fresh%20Meat',c:'Shop meat'},
 {img:'img/b/Fish-b29089d7301b.webp',h:'Fresh fish every day',p:'Salmon, tilapia, flounder and more — filleted and ready to cook.',l:'#/dept/Fish',c:'Shop fish'},
 {img:'img/b/Steak-3f2dd8276cfd.webp',h:'Steaks for the grill',p:'Rib eye, London broil and minute steak from our butchers.',l:'#/dept/Fresh%20Meat?sub=Beef',c:'Shop beef'},
 {img:'img/b/Meat-0439f0908690.webp',h:'Shabbos and Yom Tov, covered',p:'Order meat, deli and bakery together for one delivery.',l:'#/dept/Deli',c:'Shop deli'}
];
let bTimer,cTimer,bIdx=0;
function cutoffInfo(){
  const now=new Date(),dow=now.getDay(),c=S.cutoffs[dow],h=now.getHours()+now.getMinutes()/60;
  if(c!=null&&h<c&&slotsFor(ymd(now)).length){const mins=Math.max(0,Math.floor((c-h)*60));return {live:true,h:Math.floor(mins/60),m:mins%60,cut:h12(c),day:DAYS[dow]}}
  const nd=nextDates(1)[0];return {live:false,next:nd?prettyDate(nd):'',first:nd?slotsFor(nd)[0]:'',sat:dow===6}
}
function clockHTML(){
  const ci=cutoffInfo();
  return ci.live?`<div class="t">${ci.h}<span>hr</span>${String(ci.m).padStart(2,'0')}<span>min</span></div><div class="l">left to order for same-day delivery. Today's cutoff is ${ci.cut}.</div>`
   :`<div class="t">${esc(ci.next)}</div><div class="l">${ci.sat?'Closed for Shabbos.':'Today’s same-day cutoff has passed.'} First delivery window: ${esc(ci.first)}</div>`;
}
function vHome(){
  const pick=a=>a.filter(hasPrice).length?a.filter(hasPrice):a;
  const feat=pick(P.filter(p=>p.featured)).sort((a,b)=>b.pop-a.pop).slice(0,16);
  const spec=P.filter(p=>hasPrice(p)&&(p.sale||p.dealN)).sort((a,b)=>b.pop-a.pop).slice(0,12);
  return `<div class="wrap"><section class="hero2" id="banner" aria-roledescription="carousel"></section>
   <div class="strip" id="clock"><div style="display:contents">${clockHTML()}</div><div class="towns">${S.towns.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>
  ${spec.length?`<section class="blk"><div class="blk-h"><h2>On sale now</h2><a href="#/specials">See all</a></div><div class="carousel">${spec.map(card).join('')}</div></section>`:''}
  <section class="blk"><div class="blk-h"><h2>Shop by department</h2></div><div class="dept-tiles pics">${DEPT_NAMES.map(d=>`<a href="#/dept/${encodeURIComponent(d)}"><img src="${DEPTS[d][2]}" alt="" loading="lazy"><span class="n">${esc(d)}</span></a>`).join('')}</div></section>
  ${feat.length?`<section class="blk"><div class="blk-h"><h2>Store favorites</h2><a href="#/search?q=nutmeg">See all</a></div><div class="carousel">${feat.map(card).join('')}</div></section>`:''}
  <section class="blk"><div class="blk-h"><h2>Cook it tonight</h2><a href="#/recipes">All recipes</a></div><div class="rgrid">${RECIPES.slice().sort((a,b)=>(RECIPE_PHOTOS[b.id]?1:0)-(RECIPE_PHOTOS[a.id]?1:0)||b.pop-a.pop).slice(0,4).map(rcard).join('')}</div></section></div>`;
}
function startHome(){
  clearInterval(bTimer);clearInterval(cTimer);
  const el=document.getElementById('banner');if(!el)return;
  el.innerHTML=BANNERS.map((b,i)=>`<img src="${b.img}" alt="" style="opacity:${i?0:1}" ${i?'loading="lazy"':''}>`).join('')+`<div class="shade"></div><div class="cap"></div><div class="dots">${BANNERS.map((_,j)=>`<button aria-label="Show banner ${j+1}" onclick="bannerGo(${j})"></button>`).join('')}</div>`;
  const show=i=>{bIdx=i;const b=BANNERS[i];[...el.querySelectorAll('img')].forEach((im,j)=>im.style.opacity=j===i?1:0);
    el.querySelector('.cap').innerHTML=`<h2>${esc(b.h)}</h2><p>${esc(b.p)}</p><a class="btn lime" href="${b.l}">${b.c}</a>`;
    [...el.querySelectorAll('.dots button')].forEach((d,j)=>d.classList.toggle('on',j===i))};
  window.bannerGo=i=>{show(i);clearInterval(bTimer);bTimer=setInterval(()=>show((bIdx+1)%BANNERS.length),7000)};
  bannerGo(0);
  cTimer=setInterval(()=>{const c=document.getElementById('clock');if(!c){clearInterval(cTimer);return}c.firstElementChild.innerHTML=clockHTML()},30000);
}

const PER=24;
function pageNums(pg,n){const s=new Set([1,n,pg-1,pg,pg+1,pg-2,pg+2].filter(x=>x>=1&&x<=n));const a=[...s].sort((x,y)=>x-y),o=[];a.forEach((x,i)=>{if(i&&x-a[i-1]>1)o.push('…');o.push(x)});return o}
function vList({dept,sub,specials,q,sort,page}){
  let list=P.slice(),title,base;
  if(dept){list=list.filter(p=>p.dept===dept);if(sub)list=list.filter(p=>p.sub===sub);title=sub||dept;base='/dept/'+encodeURIComponent(dept)}
  else if(specials){list=list.filter(p=>hasPrice(p)&&(p.sale||p.dealN));title='Specials';base='/specials'}
  else{list=matches(q);title=`Results for “${q}”`;base='/search'}
  const np=(a,b)=>(hasPrice(b)?1:0)-(hasPrice(a)?1:0);
  const sorters={popular:(a,b)=>np(a,b)||b.pop-a.pop||a.name.localeCompare(b.name),name:(a,b)=>a.name.localeCompare(b.name),low:(a,b)=>np(a,b)||unitPrice(a)-unitPrice(b),high:(a,b)=>np(a,b)||unitPrice(b)-unitPrice(a),special:(a,b)=>((b.sale||b.dealN)?1:0)-((a.sale||a.dealN)?1:0)||b.pop-a.pop};
  list.sort(sorters[sort]||sorters.popular);
  const pages=Math.max(1,Math.ceil(list.length/PER)),pg=Math.min(page,pages),items=list.slice((pg-1)*PER,pg*PER);
  const qp=o=>{const u=new URLSearchParams();if(sub)u.set('sub',sub);if(q)u.set('q',q);u.set('sort',o.sort??sort);if((o.page??1)>1)u.set('page',o.page);return '#'+base+'?'+u};
  const side=`<aside class="side"><h3>Departments</h3>${DEPT_NAMES.map(d=>`<a class="${d===dept?'on':''}" href="#/dept/${encodeURIComponent(d)}">${esc(d)}</a>`).join('')}</aside>`;
  return `<div class="wrap"><div class="crumbs"><a href="#/">Home</a>${dept?` / <a href="#/dept/${encodeURIComponent(dept)}">${esc(dept)}</a>${sub?' / '+esc(sub):''}`:''}</div>
  <div class="shop">${side}<div>
   <h1>${esc(title)}</h1>
   ${dept?`<div class="chips"><a class="${!sub?'on':''}" href="#/dept/${encodeURIComponent(dept)}">All ${esc(dept)}</a>${DEPTS[dept][1].map(s=>`<a class="${s===sub?'on':''}" href="#/dept/${encodeURIComponent(dept)}?sub=${encodeURIComponent(s)}">${esc(s)}</a>`).join('')}</div>`:''}
   <div class="toolbar"><span class="muted">${list.length} product${list.length===1?'':'s'}</span>
    <label class="row" style="margin:0;gap:8px">Sort by <select onchange="location.hash=this.value.slice(1)">${[['popular','Popular'],['name','Name A–Z'],['low','Lowest price'],['high','Highest price'],...(specials?[]:[['special','Specials first']])].map(([v,l])=>`<option value="${qp({sort:v,page:1})}" ${v===sort?'selected':''}>${l}</option>`).join('')}</select></label></div>
   ${items.length?`<div class="pgrid">${items.map(card).join('')}</div>`:`<div class="empty"><div class="e">🔍</div><h3>Nothing here yet</h3><p class="muted">Try another department or a shorter search word.</p></div>`}
   ${pages>1?`<nav class="pager" aria-label="Pages">${pg>1?`<a href="${qp({page:pg-1})}" aria-label="Previous page">‹</a>`:''}${pageNums(pg,pages).map(n=>n==='…'?'<b class="muted" style="align-self:center">…</b>':n===pg?`<span>${n}</span>`:`<a href="${qp({page:n})}">${n}</a>`).join('')}${pg<pages?`<a href="${qp({page:pg+1})}" aria-label="Next page">›</a>`:''}</nav>`:''}
  </div></div></div>`;
}

function vProduct(id){
  const p=prod(id); if(!p) return vPage('404');
  const sib=P.filter(x=>x.dept===p.dept&&x.sub===p.sub),i=sib.indexOf(p),prev=sib[(i-1+sib.length)%sib.length],next=sib[(i+1)%sib.length];
  const fav=user()?.fav?.includes(p.id);
  return `<div class="wrap"><div class="crumbs"><a href="#/">Home</a> / <a href="#/dept/${encodeURIComponent(p.dept)}">${esc(p.dept)}</a> / <a href="#/dept/${encodeURIComponent(p.dept)}?sub=${encodeURIComponent(p.sub)}">${esc(p.sub)}</a></div>
  <div class="pd"><div class="${tcls(p)}" style="--h:${hue(p.dept)};position:relative">${pimg(p)}</div>
   <div><h1>${esc(p.name)}</h1><div class="muted">${esc(p.size)}${p.unit==='lb'?' · priced per pound, weighed when packed':''}</div>
    <div style="margin:14px 0">${priceHTML(p)} ${p.dealN?`<span class="status" style="background:var(--sun);color:var(--brown)">${dealText(p)}</span>`:''}</div>
    ${p.caseQty&&hasPrice(p)?`<div class="modes" role="radiogroup" aria-label="Buy as">
      <label><input type="radio" name="mode" value="unit" checked onchange="pdMode()"><b>${p.unit==='lb'?'By the pound':'Single'}</b>${money(unitPrice(p))}${p.unit==='lb'?'/lb':' each'}</label>
      <label><input type="radio" name="mode" value="case" onchange="pdMode()"><b>Full case</b>${p.caseQty} for ${money(p.caseP)} <span class="small muted">(${money(p.caseP/p.caseQty)} each)</span></label></div>`:''}
    <div class="row" style="margin:16px 0"><span class="step"><button onclick="pdQty(-1)" aria-label="Less">−</button><span id="pdq" data-q="1" data-step="${stepOf(p,'unit')}">${p.unit==='lb'?'1 lb':'1'}</span><button onclick="pdQty(1)" aria-label="More">+</button></span>
     ${hasPrice(p)?`<button class="btn lime" onclick="pdAdd('${p.id}')">Add to cart</button>`:'<span class="nop">This item isn’t priced online yet. Call the store to order it.</span>'}<button class="btn ghost" onclick="toggleFav('${p.id}');route()">${fav?'♥ Saved':'♡ Save to My Items'}</button></div>
    <label for="pdn">Note for the shopper <span class="muted small">(optional)</span></label><input id="pdn" maxlength="${S.noteMax}" placeholder="${p.dept==='Produce'?'e.g. not too ripe':p.dept==='Fresh Meat'?'e.g. trim the fat, cut in half':'e.g. any special instructions'}">
    <div class="prevnext"><a href="#/p/${prev.id}">‹ ${esc(prev.name)}</a><a href="#/p/${next.id}">${esc(next.name)} ›</a></div>
   </div></div>
  <section class="blk"><div class="blk-h"><h2>More in ${esc(p.sub)}</h2></div><div class="carousel">${sib.filter(x=>x!==p).sort((a,b)=>(hasPrice(b)?1:0)-(hasPrice(a)?1:0)).slice(0,12).map(card).join('')}</div></section></div>`;
}
function pdMode(){const p=prod(location.hash.split('/')[2]),m=document.querySelector('input[name=mode]:checked').value,q=document.getElementById('pdq');q.dataset.step=stepOf(p,m);q.dataset.q=1;q.dataset.mode=m;q.textContent=m==='case'?'1 case':p.unit==='lb'?'1 lb':'1'}
function pdQty(d){const q=document.getElementById('pdq'),p=prod(location.hash.split('/')[2]),m=q.dataset.mode||'unit';let v=+(+q.dataset.q+d*+q.dataset.step).toFixed(2);if(v<+q.dataset.step)v=+q.dataset.step;q.dataset.q=v;q.textContent=m==='case'?`${v} case${v>1?'s':''}`:p.unit==='lb'?v+' lb':v}
function pdAdd(id){const q=document.getElementById('pdq');addToCart(id,+q.dataset.q,q.dataset.mode||'unit',document.getElementById('pdn').value.trim());}

function vMyItems(){
  if(!me) return gate('Sign in to see the items you’ve saved.');
  const f=(user().fav||[]).map(prod).filter(Boolean);
  const past=[...new Set(ORDERS.filter(o=>o.email===me).flatMap(o=>o.items.map(i=>i.pid)))].map(prod).filter(p=>p&&!f.includes(p));
  return `<div class="wrap"><h1 style="margin-top:28px">My Items</h1>
   <section class="blk"><h2>Saved</h2>${f.length?`<div class="pgrid">${f.map(card).join('')}</div>`:'<p class="muted">Tap ♡ on any product to save it here for quick reordering.</p>'}</section>
   ${past.length?`<section class="blk"><h2>Bought before</h2><div class="pgrid">${past.map(card).join('')}</div></section>`:''}</div>`;
}
const gate=m=>`<div class="wrap"><div class="empty"><div class="e">🔒</div><h2>Please sign in</h2><p class="muted">${esc(m)}</p><button class="btn" onclick="openLogin()">Sign in</button></div></div>`;

/* Checkout */
function vCheckout(){
  if(!me) return gate('Sign in to check out.');
  const c=getCart(),u=user(),st=subtotal(c);
  if(!c.length) return `<div class="wrap"><div class="empty"><div class="e">🧺</div><h2>Your cart is empty</h2><a class="btn lime" href="#/">Start shopping</a></div></div>`;
  const dates=nextDates();
  return `<div class="wrap"><h1 style="margin-top:28px">Check out</h1><form class="two" onsubmit="return placeOrder(event)">
  <div>
   <div class="panel"><h3>How would you like to get it?</h3><div class="opt">
    <label><input type="radio" name="method" value="Delivery" checked onchange="coMethod()"><b>Delivery</b><small>${S.towns.join(', ')}</small></label>
    <label><input type="radio" name="method" value="Pickup" onchange="coMethod()"><b>Pickup</b><small>At the store</small></label></div>
    <div id="addr"><div class="grid2"><div><label for="ca">Street address</label><input id="ca" value="${esc(u.address||'')}" autocomplete="street-address"></div>
     <div><label for="ct">Town</label><select id="ct">${S.towns.map(t=>`<option ${t===u.town?'selected':''}>${esc(t)}</option>`).join('')}</select></div></div>
     <label for="cd">Delivery instructions <span class="muted small">(optional)</span></label><input id="cd" placeholder="Gate code, leave at side door…"></div>
   </div>
   <div class="panel"><h3>Choose a day and time</h3>
    ${dates.length?`<div class="chips" id="dates">${dates.map((d,i)=>`<a href="javascript:void 0" class="${i?'':'on'}" onclick="coDate('${d}',this)">${prettyDate(d)}</a>`).join('')}</div><div class="slots" id="slots"></div>`:'<p class="err">No delivery windows are open this week. Please call the store.</p>'}
    <p class="small muted" style="margin-bottom:0">Same-day orders close at ${h12(S.cutoffs[0])} Sunday–Thursday and ${h12(S.cutoffs[5])} Friday.</p></div>
   <div class="panel"><h3>If an item is out of stock</h3><div class="opt">
    <label><input type="radio" name="subs" value="Substitute with similar" checked><b>Substitute</b><small>Our shopper picks the closest match</small></label>
    <label><input type="radio" name="subs" value="Call or text me to review"><b>Contact me</b><small>We call or text before replacing</small></label>
    <label><input type="radio" name="subs" value="No substitutions — refund"><b>Don't replace</b><small>Leave it out of the order</small></label></div></div>
   <div class="panel"><h3>Contact &amp; payment</h3><div class="grid2"><div><label for="cp">Cell phone</label><input id="cp" type="tel" required value="${esc(u.phone||'')}"></div>
    <div><label for="crc">Receipt</label><select id="crc"><option>Email receipt</option><option>Paper receipt with order</option></select></div></div>
    <label for="cpay">Payment</label><select id="cpay"><option>Card — the store will call to authorize</option><option>Pay at ${'pickup / delivery'}</option></select>
    <p class="small muted">Your card is authorized for the estimated total. The final charge is adjusted for actual weights, availability and substitutions.</p>
    <label for="cn">Order notes <span class="muted small">(optional)</span></label><textarea id="cn" rows="2"></textarea></div>
  </div>
  <div class="panel" style="position:sticky;top:150px"><h3>Order summary</h3>
   ${c.map(it=>{const p=prod(it.pid);return `<div class="sum small"><span>${esc(p?.name)} × ${qtyLabel(it,p)}</span><span>${money(lineTotal(it))}</span></div>`}).join('')}
   <hr style="border:0;border-top:1px solid var(--line);margin:12px 0">
   <div class="sum"><span>Subtotal</span><span>${money(st)}</span></div><div class="sum"><span>Service fee</span><span>${money(S.fee)}</span></div>
   <div class="sum t"><span>Estimated total</span><span>${money(st+S.fee)}</span></div>
   <div class="err" id="coerr"></div>
   <button class="btn lime" type="submit" style="width:100%;margin-top:14px" ${st<S.minOrder?'disabled':''}>Place order</button>
   ${st<S.minOrder?`<p class="small err">Minimum order is ${money(S.minOrder)}.</p>`:''}</div>
  </form></div>`;
}
let coSel={date:null,slot:null};
function coDate(d,el){coSel={date:d,slot:null};document.querySelectorAll('#dates a').forEach(a=>a.classList.remove('on'));el?.classList.add('on');
  document.getElementById('slots').innerHTML=slotsFor(d).map(s=>`<label><input type="radio" name="slot" value="${s}" onchange="coSel.slot=this.value">${s}</label>`).join('')}
function coMethod(){document.getElementById('addr').style.display=document.querySelector('input[name=method]:checked').value==='Delivery'?'':'none'}
function placeOrder(e){
  e.preventDefault(); const err=document.getElementById('coerr'),c=getCart(),u=user();
  const method=document.querySelector('input[name=method]:checked').value,addr=document.getElementById('ca').value.trim(),town=document.getElementById('ct').value;
  if(method==='Delivery'&&!addr){err.textContent='Enter a street address for delivery.';return false}
  if(!coSel.date||!coSel.slot){err.textContent='Choose a day and a time window.';return false}
  if(!slotsFor(coSel.date).includes(coSel.slot)){err.textContent='That window just closed. Please choose another.';return false}
  const id=String(1000+ORDERS.length+1);
  const o={id,email:me,name:u.first+' '+u.last,phone:document.getElementById('cp').value.trim(),method,address:method==='Delivery'?addr:'',town:method==='Delivery'?town:'',instructions:document.getElementById('cd').value.trim(),
    date:coSel.date,slot:coSel.slot,subs:document.querySelector('input[name=subs]:checked').value,receipt:document.getElementById('crc').value,pay:document.getElementById('cpay').value,notes:document.getElementById('cn').value.trim(),
    items:c.map(it=>({...it,name:prod(it.pid)?.name,price:unitPrice(prod(it.pid))})),status:'Received',created:Date.now(),log:[{t:Date.now(),m:'Order placed'}]};
  recalc(o); ORDERS.push(o); if(method==='Delivery'){u.address=addr;u.town=town} u.phone=o.phone; saveAll(); setCart([]); go('/order/'+id); toast('Order placed — thank you!'); return false;
}
function recalc(o){o.subtotal=subtotal(o.items);o.fee=S.fee;o.total=o.subtotal+o.fee}

/* Orders */
const statusCls=s=>s.split(' ')[0];
function vOrders(){
  if(!me) return gate('Sign in to see your orders.');
  const mine=ORDERS.filter(o=>o.email===me).sort((a,b)=>b.created-a.created);
  return `<div class="wrap"><h1 style="margin-top:28px">My orders</h1>${mine.length?`<div class="panel tbl-wrap"><table><thead><tr><th>Order</th><th>Placed</th><th>${'Delivery / pickup'}</th><th>Status</th><th>Total</th><th></th></tr></thead><tbody>
   ${mine.map(o=>`<tr><td><b>#${o.id}</b></td><td>${new Date(o.created).toLocaleDateString()}</td><td>${o.method} · ${prettyDate(o.date)}, ${o.slot}</td><td><span class="status ${statusCls(o.status)}">${o.status}</span></td><td>${money(o.total)}</td><td><a class="btn sm ghost" href="#/order/${o.id}">${o.status==='Received'?'View or edit':'View'}</a></td></tr>`).join('')}</tbody></table></div>`
   :`<div class="empty"><div class="e">🧾</div><h3>No orders yet</h3><p class="muted">Your past orders and their status will show here.</p><a class="btn lime" href="#/">Start shopping</a></div>`}</div>`;
}
function vOrder(id){
  const o=ORDERS.find(x=>x.id===id); if(!o||(o.email!==me&&!isAdmin())) return gate('Sign in with the account that placed this order.');
  const edit=o.status==='Received'&&o.email===me;
  return `<div class="wrap"><div class="crumbs"><a href="#/orders">My orders</a> / #${o.id}</div>
  <div class="row" style="justify-content:space-between"><h1>Order #${o.id}</h1><span class="status ${statusCls(o.status)}" style="font-size:1rem">${o.status}</span></div>
  ${edit?`<p class="panel" style="background:var(--leaf);border-color:transparent">You can change quantities, remove items, change the time, or add items until we start preparing your order.</p>`:''}
  <div class="two"><div class="panel"><h3>Items</h3>
   ${o.items.map((it,i)=>{const p=prod(it.pid);return `<div class="line"><span class="${tcls(p)}" style="--h:${hue(p?.dept)}">${p?pimg(p):'🛒'}</span><div><div class="nm">${esc(it.name)}</div>
    ${it.note?`<span class="note">“${esc(it.note)}”</span>`:''}
    <div class="row" style="margin-top:6px;gap:10px">${edit?`<span class="step"><button onclick="oBump('${o.id}',${i},-1)" aria-label="Less">−</button><span>${qtyLabel(it,p)}</span><button onclick="oBump('${o.id}',${i},1)" aria-label="More">+</button></span><button class="linkbtn red" onclick="oRemove('${o.id}',${i})">Remove</button>`:`<span class="muted small">Qty ${qtyLabel(it,p)}</span>`}</div></div><b>${money(lineTotal(it))}</b></div>`}).join('')}
   ${edit?`<p style="margin-top:14px"><a href="#/" class="linkbtn">+ Shop and use “Add to last order” in your cart</a></p>`:''}
  </div>
  <div><div class="panel"><h3>${o.method}</h3><p style="margin:0">${prettyDate(o.date)}, ${o.slot}</p>${o.address?`<p class="muted" style="margin:4px 0 0">${esc(o.address)}, ${esc(o.town)}</p>`:''}
    ${edit?`<button class="linkbtn" style="margin-top:8px" onclick="oTime('${o.id}')">Change day or time</button>`:''}
    <p class="small muted">Substitutions: ${esc(o.subs)}<br>Payment: ${esc(o.pay)}<br>Receipt: ${esc(o.receipt)}</p></div>
   <div class="panel"><div class="sum"><span>Subtotal</span><span>${money(o.subtotal)}</span></div><div class="sum"><span>Service fee</span><span>${money(o.fee)}</span></div><div class="sum t"><span>${o.final?'Final total':'Estimated total'}</span><span>${money(o.final||o.total)}</span></div>
    <div class="row" style="margin-top:12px"><button class="btn sm ghost" onclick="printReceipt('${o.id}')">Print receipt</button>${edit?`<button class="btn sm danger" onclick="oCancel('${o.id}')">Cancel order</button>`:''}</div></div></div></div></div>`;
}
const findO=id=>ORDERS.find(x=>x.id===id);
function oBump(id,i,d){const o=findO(id),it=o.items[i],p=prod(it.pid);it.qty=+(it.qty+d*(p?stepOf(p,it.mode):1)).toFixed(2);if(it.qty<=0)o.items.splice(i,1);recalc(o);o.log.push({t:Date.now(),m:'Customer changed quantities'});saveAll();route()}
function oRemove(id,i){const o=findO(id);o.items.splice(i,1);recalc(o);o.log.push({t:Date.now(),m:'Customer removed an item'});saveAll();route()}
function oCancel(id){if(!confirm('Cancel this order?'))return;const o=findO(id);o.status='Cancelled';o.log.push({t:Date.now(),m:'Cancelled by customer'});saveAll();route();toast('Order cancelled')}
function oTime(id){
  const ds=nextDates();coSel={date:ds[0],slot:null};
  modal(`<h2>Change day or time</h2><div class="chips" id="dates">${ds.map((d,i)=>`<a href="javascript:void 0" class="${i?'':'on'}" onclick="coDate('${d}',this)">${prettyDate(d)}</a>`).join('')}</div><div class="slots" id="slots"></div><div class="err" id="terr"></div><button class="btn" style="margin-top:14px" onclick="oTimeSave('${id}')">Save new time</button>`);
  coDate(ds[0],null);
}
function oTimeSave(id){if(!coSel.slot){document.getElementById('terr').textContent='Choose a time window.';return}const o=findO(id);o.date=coSel.date;o.slot=coSel.slot;o.log.push({t:Date.now(),m:'Customer changed time'});saveAll();closeModal();route();toast('Time updated')}
function printReceipt(id){
  const o=findO(id);
  document.getElementById('print').innerHTML=`<div style="font-family:var(--body);max-width:640px;margin:0 auto"><h2>Center Fresh Supermarket</h2><p>${esc(S.address)} ${esc(S.phone)}</p><h3>Order #${o.id} — ${o.status}</h3>
   <p>${esc(o.name)} · ${esc(o.phone)}<br>${o.method}: ${prettyDate(o.date)}, ${o.slot}${o.address?'<br>'+esc(o.address)+', '+esc(o.town):''}<br>Substitutions: ${esc(o.subs)}</p>
   <table><thead><tr><th>Item</th><th>Qty</th><th>Note</th><th>Price</th></tr></thead><tbody>${o.items.map(it=>`<tr><td>${esc(it.name)}</td><td>${qtyLabel(it,prod(it.pid))}</td><td>${esc(it.note||'')}</td><td>${money(lineTotal(it))}</td></tr>`).join('')}</tbody></table>
   <p>Subtotal ${money(o.subtotal)} · Service fee ${money(o.fee)} · <b>Total ${money(o.final||o.total)}</b></p>${o.notes?`<p>Notes: ${esc(o.notes)}</p>`:''}</div>`;
  document.body.classList.add('printing');window.print();document.body.classList.remove('printing');
}

function vAccount(){
  if(!me) return gate('Sign in to manage your account.');
  const u=user();
  return `<div class="wrap" style="max-width:640px"><h1 style="margin-top:28px">My account</h1><form class="panel" onsubmit="return saveAcct(event)">
   <div class="grid2"><div><label for="af">First name</label><input id="af" value="${esc(u.first)}"></div><div><label for="al">Last name</label><input id="al" value="${esc(u.last)}"></div></div>
   <label>Email</label><input value="${esc(u.email)}" disabled><label for="aph">Cell phone</label><input id="aph" value="${esc(u.phone||'')}">
   <div class="grid2"><div><label for="aa">Delivery address</label><input id="aa" value="${esc(u.address||'')}"></div><div><label for="at">Town</label><select id="at"><option value="">—</option>${S.towns.map(t=>`<option ${t===u.town?'selected':''}>${t}</option>`).join('')}</select></div></div>
   <label for="anp">New password <span class="muted small">(leave blank to keep)</span></label><input id="anp" type="password" minlength="6" autocomplete="new-password">
   <div class="row" style="margin-top:16px"><button class="btn" type="submit">Save changes</button><button type="button" class="btn ghost" onclick="logout()">Sign out</button></div></form></div>`;
}
function saveAcct(e){e.preventDefault();const u=user();u.first=af.value.trim();u.last=al.value.trim();u.phone=aph.value.trim();u.address=aa.value.trim();u.town=at.value;if(anp.value)u.pass=hash(anp.value);saveAll();renderActs();toast('Changes saved');return false}

/* Recipes */
const rimg=r=>{const u=r.img||RECIPE_PHOTOS[r.id];return u?`<img src="${u}" alt="${esc(r.title)}" loading="lazy" onerror="picFail(this,'${r.emoji}')">`:r.emoji};
function rcard(r){return `<a class="rc" href="#/recipe/${r.id}"><span class="thumb" style="--h:${(RECIPE_CATS.indexOf(r.cat)*29+30)%360}">${rimg(r)}</span><div class="b"><h3 style="margin:0 0 4px">${esc(r.title)}</h3><div class="meta">${r.time} min · serves ${r.serves} · ${r.diet}</div></div></a>`}
function vRecipes(q){
  const f={q:(q.get('q')||'').toLowerCase(),cat:q.get('cat')||'',diet:q.get('diet')||'',chef:q.get('chef')||'',hol:q.get('hol')||'',sort:q.get('sort')||'pop'};
  let list=RECIPES.filter(r=>(!f.q||(r.title+' '+r.ing.map(i=>i[0]).join(' ')).toLowerCase().includes(f.q))&&(!f.cat||r.cat===f.cat)&&(!f.diet||r.diet===f.diet)&&(!f.chef||r.chef===f.chef)&&(!f.hol||r.holiday===f.hol));
  list.sort({pop:(a,b)=>b.pop-a.pop,time:(a,b)=>a.time-b.time,serves:(a,b)=>b.serves-a.serves}[f.sort]);
  const chefs=[...new Set(RECIPES.map(r=>r.chef))],hols=[...new Set(RECIPES.map(r=>r.holiday).filter(Boolean))];
  const sel=(k,label,opts)=>`<select aria-label="${label}" onchange="recFilter('${k}',this.value)"><option value="">${label}</option>${opts.map(o=>`<option ${f[k]===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`;
  return `<div class="wrap"><h1 style="margin-top:28px">Recipes</h1><p class="muted">Every ingredient links to our shelves — add the whole list to your cart in one tap.</p>
  <div class="chips"><a class="${!f.cat?'on':''}" href="javascript:void 0" onclick="recFilter('cat','')">All</a>${RECIPE_CATS.map(c=>`<a class="${f.cat===c?'on':''}" href="javascript:void 0" onclick="recFilter('cat','${c}')">${c}</a>`).join('')}</div>
  <div class="filters"><input type="search" placeholder="Search recipes or ingredients" value="${esc(q.get('q')||'')}" onkeydown="if(event.key==='Enter')recFilter('q',this.value)" aria-label="Search recipes">
   ${sel('chef','Any chef',chefs)}${sel('diet','Meat, dairy or parve',['Meat','Dairy','Parve'])}${sel('hol','Any holiday',hols)}
   <select aria-label="Sort recipes" onchange="recFilter('sort',this.value)"><option value="pop" ${f.sort==='pop'?'selected':''}>Most popular</option><option value="time" ${f.sort==='time'?'selected':''}>Quickest</option><option value="serves" ${f.sort==='serves'?'selected':''}>Most servings</option></select></div>
  ${list.length?`<div class="rgrid">${list.map(rcard).join('')}</div>`:'<div class="empty"><div class="e">🍽️</div><h3>No recipes match</h3><p class="muted">Clear a filter to see more.</p></div>'}</div>`;
}
function recFilter(k,v){const [,qs]=location.hash.split('?');const u=new URLSearchParams(qs||'');v?u.set(k,v):u.delete(k);go('/recipes?'+u)}
function vRecipe(id){
  const r=RECIPES.find(x=>x.id===id); if(!r) return vPage('404');
  return `<div class="wrap"><div class="crumbs"><a href="#/recipes">Recipes</a> / ${esc(r.cat)}</div>
  <div class="pd"><div class="thumb" style="--h:${(RECIPE_CATS.indexOf(r.cat)*29+30)%360}">${rimg(r)}</div>
   <div><h1>${esc(r.title)}</h1><p class="muted">By ${esc(r.chef)} · ${r.time} minutes · serves ${r.serves} · ${r.diet}${r.holiday?' · '+esc(r.holiday):''}</p>
    <div class="row"><button class="btn lime" onclick="shopIng('${r.id}')">Shop ingredients</button><button class="btn ghost" onclick="window.print()">Print recipe</button></div>
    <h3 style="margin-top:22px">Ingredients</h3><ul class="ing" style="padding-left:18px">${r.ing.map(([t,n])=>{const p=ingProd(n);return `<li>${esc(t)} ${p?`<a href="#/p/${p.id}" class="small" style="color:var(--lime-deep);font-weight:700">${hasPrice(p)?money(unitPrice(p))+(p.unit==='lb'?'/lb':''):'See product'}</a>`:`<a href="#/search?q=${encodeURIComponent(ingKey(n))}" class="small" style="color:var(--lime-deep);font-weight:700">Find it</a>`}</li>`}).join('')}</ul></div></div>
  <div class="panel prose"><h3>Instructions</h3><ol class="steps">${r.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div></div>`;
}
const ingKey=n=>n.replace(/^(Fresh|Large|Yellow|Russet|Hass|Gala|Plum|Atlantic|First Cut|Extra Virgin|Sweet|Shredded|All-Purpose|Granulated|Whole|Round|Braided)\s+/i,'').replace(/ Fillet$/,'');
function ingProd(n){const m=matches(ingKey(n));return m.find(hasPrice)||m[0]}
function shopIng(id){if(needLogin('Sign in to add ingredients to your cart.'))return;const r=RECIPES.find(x=>x.id===id);const c=getCart();let n=0;
  r.ing.forEach(([,nm])=>{const p=ingProd(nm);if(!hasPrice(p))return;n++;const ex=c.find(i=>i.pid===p.id&&i.mode==='unit');if(!ex)c.push({pid:p.id,qty:1,mode:'unit',note:''})});setCart(c);if(!n){toast('These ingredients aren’t priced online yet.');return}toast(`Added ${n} ingredients`);openDrawer()}

const DELI_IMG={
 'Shulem Zucher':['Shulem-Zucher-d886a5d02a4d','Shulem-Zucher-b9d00731834b'],'Vachnacht':['Vachnacht-fd2d32f86252','Vachnacht-35a2750cba8d'],
 'Bris Seudah':['Bris-Seudah-f29d14a7e859','Bris-Seudah-da0db910830a'],'Kiddush':['Kiddush-0dada4890d26','Kiddush-a0334051c3a0'],
 'Platters':['Platters-55c794ef8f70','Platters-5c53fd300bf2'],'Packages':['Packages-42b454b8147c','Packages-8bf74623314e'],
 'BBQ Menu':['BBQ-Menu-ca2a8074a9aa','BBQ-Menu-fd32ab5a81c9'],'Gift':['Gift-31270af75f26','Gift-31270af75f26']};
const mimg=f=>'img/m/'+f+'.webp';
function vDeli(){
  const imgs=DB.get('menuImages',{}),sid=s=>'m-'+s.replace(/\W/g,'');
  return `<div class="wrap"><h1 style="margin-top:28px">Deli &amp; catering menu</h1><p class="muted">For simchas and Shabbos. Call the store to order catering or to customize a package${S.phone?' — <a href="tel:'+esc(S.phone)+'">'+esc(S.phone)+'</a>':''}.</p>
   <div class="deli-cards">${Object.keys(DELI_MENU).map(s=>`<a href="#/deli" onclick="event.preventDefault();document.getElementById('${sid(s)}').scrollIntoView({behavior:'smooth'})"><img src="${mimg(DELI_IMG[s][1])}" alt="" loading="lazy"><b>${esc(s)}</b></a>`).join('')}</div>
   ${Object.entries(DELI_MENU).map(([s,items])=>`<section class="blk" id="${sid(s)}"><img class="deli-hdr" src="${mimg(DELI_IMG[s][0])}" alt="${esc(s)}" loading="lazy">
     ${imgs[s]?`<div class="menu-card"><img src="${imgs[s]}" alt="${esc(s)} menu"></div>`:`<p class="muted">Call the store for the ${esc(s)} menu and prices${S.phone?' — <a href="tel:'+esc(S.phone)+'">'+esc(S.phone)+'</a>':''}.</p>`}</section>`).join('')}</div>`;
}

/* Static pages */
function vPage(r){
  const P_={
   delivery:['Delivery & pickup',`<div class="panel tbl-wrap"><table><tbody>
     <tr><th>Minimum order</th><td>${money(S.minOrder)} for delivery and pickup</td></tr><tr><th>Service fee</th><td>${money(S.fee)}</td></tr>
     <tr><th>Same-day delivery areas</th><td>${S.towns.join(', ')}</td></tr>
     <tr><th>Same-day cutoff</th><td>Sunday–Thursday ${h12(S.cutoffs[0])}; Friday ${h12(S.cutoffs[5])}, subject to seasonal changes</td></tr>
     <tr><th>Delivery windows</th><td>Two-hour windows. Sunday ${h12(S.windows[0][0])}–${h12(S.windows[0][1])}; Monday–Thursday ${h12(S.windows[1][0])}–${h12(S.windows[1][1])}</td></tr>
     <tr><th>Final charge</th><td>Adjusted for availability, substitutions and actual product weights</td></tr></tbody></table></div>`],
   faq:['Frequently asked questions',[
     ['How do I place an order?','Create an account, add items to your cart, and check out once you reach the '+money(S.minOrder)+' minimum. Choose delivery or pickup and a two-hour window.'],
     ['When is my card charged?','Your card is authorized for the estimated total. The final charge is adjusted for actual weights, availability and substitutions.'],
     ['Can I change my order after placing it?','Yes. While your order shows “Received” you can change quantities, remove items, and change the day or time from My orders.'],
     ['I forgot something. Can I add it?','While your order is still “Received”, add items to your cart and tap “Add to last order”.'],
     ['What happens if an item is out of stock?','At checkout you choose: let us substitute, have us call or text you to review, or leave it out.'],
     ['Can I buy by the case?','Many products offer a full-case option on the product page, priced separately from single units.'],
     ['Can I give special instructions?','Use “Add note” on any item — for example ripeness, thickness, or trimming.'],
     ['Where do you deliver?','Same-day delivery to '+S.towns.join(', ')+'.'],
     ['Will I get a receipt?','Choose an email receipt or a paper receipt with your order at checkout.']
    ].map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')],
   about:['About us','<div class="prose"><p>Center Fresh Supermarket is a full-service supermarket with a butcher counter, fish department, fresh bakery, sushi, and a deli that caters simchas large and small.</p><p>Shop online for delivery or pickup, or visit us in store.</p></div>'],
   store:['Store info',`<div class="two" style="margin-top:0"><div class="panel">${S.address?`<p><b>${esc(S.address)}</b></p>`:'<p class="muted">Store address will appear here.</p>'}
     ${S.phone?`<p><a href="tel:${esc(S.phone)}">${esc(S.phone)}</a></p>`:''}${S.email?`<p><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>`:''}
     ${S.hours?`<h3>Hours</h3><p style="white-space:pre-line">${esc(S.hours)}</p>`:''}</div>
     ${S.address?`<div class="panel" style="padding:0;overflow:hidden"><iframe title="Map to the store" src="https://maps.google.com/maps?q=${encodeURIComponent(S.address)}&output=embed" style="border:0;width:100%;height:340px" loading="lazy"></iframe></div>`:''}</div>`],
   contact:['Contact us',`<form class="panel" style="max-width:640px" onsubmit="return sendMsg(event)"><div class="grid2"><div><label for="mn">Name</label><input id="mn" required></div><div><label for="me_">Email</label><input id="me_" type="email" required></div></div>
     <div class="grid2"><div><label for="mp">Phone</label><input id="mp" type="tel"></div><div><label for="mo">Order number <span class="muted small">(optional)</span></label><input id="mo"></div></div>
     <label for="mm">Message</label><textarea id="mm" rows="4" required></textarea><label class="check"><input type="checkbox" id="mc" required> I agree to be contacted by email, phone or text about my message.</label>
     <button class="btn" style="margin-top:14px" type="submit">Send message</button></form>`],
   accessibility:['Accessibility','<div class="prose"><p>We want everyone to be able to shop with us. If any part of this site is hard to use, call the store or use the contact form and we will help you place your order.</p></div>'],
   privacy:['Privacy policy','<div class="prose"><p>We use your name, contact details and address only to fulfill your orders and, if you subscribe, to send you our specials. We do not sell your information.</p><p class="muted small">Replace this summary with your full privacy policy.</p></div>'],
   terms:['Terms of use','<div class="prose"><p>Prices and availability may change. Weighed items are charged by actual weight. Orders are subject to the store’s substitution and delivery policies.</p><p class="muted small">Replace this summary with your full terms of use.</p></div>'],
   '404':['Page not found','<p>That page doesn’t exist. <a href="#/">Go to the homepage</a>.</p>']
  }[r]||['Page not found','<p><a href="#/">Go to the homepage</a></p>'];
  return `<div class="wrap"><h1 style="margin-top:28px">${P_[0]}</h1>${P_[1]}</div>`;
}
function sendMsg(e){e.preventDefault();MSGS.unshift({id:Date.now(),name:mn.value,email:me_.value,phone:mp.value,order:mo.value,msg:mm.value,t:Date.now(),read:false});saveAll();e.target.outerHTML='<div class="panel"><h3>Message sent</h3><p>Thanks — the store will get back to you soon.</p></div>';return false}
function subscribe(e){e.preventDefault();const f=e.target;SUBS.push({email:f.email.value,first:f.first.value,cell:f.cell.value,t:Date.now()});saveAll();f.reset();toast('Subscribed to weekly specials');return false}

/* ============ ADMIN ============ */
const STATUSES=['Received','Processing','Out for delivery','Ready for pickup','Completed','Cancelled'];
function vAdmin(tab,q){
  if(!isAdmin()) return gate('Sign in with a store admin account.');
  const nav=[['orders','Orders'],['products','Products'],['customers','Customers'],['messages',`Messages${MSGS.filter(m=>!m.read).length?' ('+MSGS.filter(m=>!m.read).length+')':''}`],['menus','Deli menus'],['settings','Settings']]
    .map(([k,l])=>`<a class="${tab===k?'on':''}" href="#/admin/${k}">${l}</a>`).join('');
  return `<div class="wrap"><h1 style="margin-top:28px">Store admin</h1><nav class="admin-nav">${nav}</nav>${({orders:aOrders,products:aProducts,customers:aCustomers,messages:aMessages,menus:aMenus,settings:aSettings}[tab]||aOrders)(q)}</div>`;
}
function aOrders(q){
  const f=q.get('s')||'open',d=q.get('d')||'';
  let list=ORDERS.slice().sort((a,b)=>a.date.localeCompare(b.date)||a.slot.localeCompare(b.slot));
  if(f==='open')list=list.filter(o=>!['Completed','Cancelled'].includes(o.status));else if(f!=='all')list=list.filter(o=>o.status===f);
  if(d)list=list.filter(o=>o.date===d);
  const cnt=s=>ORDERS.filter(o=>o.status===s).length;
  return `<div class="stats">${STATUSES.slice(0,4).map(s=>`<div><b>${cnt(s)}</b>${s}</div>`).join('')}<div><b>${money(ORDERS.filter(o=>o.status!=='Cancelled').reduce((a,o)=>a+(o.final||o.total),0))}</b>All-time sales</div></div>
   <div class="toolbar"><div class="chips" style="margin:0">${[['open','Open'],...STATUSES.map(s=>[s,s]),['all','All']].map(([v,l])=>`<a class="${f===v?'on':''}" href="#/admin/orders?s=${encodeURIComponent(v)}${d?'&d='+d:''}">${l}</a>`).join('')}</div>
    <div class="row"><input type="date" value="${d}" onchange="go('/admin/orders?s=${encodeURIComponent(f)}'+(this.value?'&d='+this.value:''))" style="width:auto" aria-label="Filter by day"><button class="btn sm ghost" onclick="exportOrders()">Export to Excel</button></div></div>
   ${list.length?`<div class="panel tbl-wrap"><table><thead><tr><th>#</th><th>Customer</th><th>When</th><th>Where</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead><tbody>
    ${list.map(o=>`<tr><td><b>${o.id}</b></td><td>${esc(o.name)}<div class="small"><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a></div></td><td>${prettyDate(o.date)}<div class="small muted">${o.slot}</div></td>
     <td>${o.method==='Delivery'?esc(o.address)+'<div class="small muted">'+esc(o.town)+'</div>':'Pickup'}</td><td>${o.items.length}</td><td>${money(o.final||o.total)}</td>
     <td><select onchange="setStatus('${o.id}',this.value)" style="width:auto">${STATUSES.map(s=>`<option ${s===o.status?'selected':''}>${s}</option>`).join('')}</select></td>
     <td><button class="btn sm ghost" onclick="aOrderView('${o.id}')">Open</button></td></tr>`).join('')}</tbody></table></div>`
   :'<div class="empty"><div class="e">📦</div><h3>No orders in this view</h3><p class="muted">New online orders appear here as soon as they’re placed.</p></div>'}`;
}
function setStatus(id,s){const o=findO(id);o.status=s;o.log.push({t:Date.now(),m:'Status: '+s});saveAll();toast(`Order #${id}: ${s}`)}
function aOrderView(id){
  const o=findO(id);
  modal(`<h2>Order #${o.id}</h2><p><b>${esc(o.name)}</b> · <a href="tel:${esc(o.phone)}">${esc(o.phone)}</a> · ${esc(o.email)}<br>${o.method}: ${prettyDate(o.date)}, ${o.slot}${o.address?'<br>'+esc(o.address)+', '+esc(o.town):''}${o.instructions?'<br><i>'+esc(o.instructions)+'</i>':''}</p>
   <p class="small"><b>Substitutions:</b> ${esc(o.subs)}<br><b>Payment:</b> ${esc(o.pay)}<br><b>Receipt:</b> ${esc(o.receipt)}${o.notes?'<br><b>Notes:</b> '+esc(o.notes):''}</p>
   <div class="tbl-wrap"><table><thead><tr><th>Item</th><th>Qty</th><th>Est.</th></tr></thead><tbody>${o.items.map(it=>`<tr><td>${esc(it.name)}${it.note?`<div class="note">“${esc(it.note)}”</div>`:''}</td><td>${qtyLabel(it,prod(it.pid))}</td><td>${money(lineTotal(it))}</td></tr>`).join('')}</tbody></table></div>
   <label for="fin">Final charge after weighing <span class="muted small">(estimated ${money(o.total)})</span></label><input id="fin" type="number" step="0.01" value="${o.final||''}">
   <div class="row" style="margin-top:12px"><button class="btn" onclick="setFinal('${o.id}')">Save final charge</button><button class="btn ghost" onclick="printReceipt('${o.id}')">Print pick list</button></div>
   <p class="small muted" style="margin-top:14px">${o.log.map(l=>new Date(l.t).toLocaleString()+' — '+esc(l.m)).join('<br>')}</p>`);
}
function setFinal(id){const o=findO(id),v=parseFloat(document.getElementById('fin').value);o.final=isNaN(v)?null:v;o.log.push({t:Date.now(),m:'Final charge '+(o.final?money(o.final):'cleared')});saveAll();closeModal();route();toast('Final charge saved')}
function exportOrders(){if(!window.XLSX){toast('Excel tools are still loading — try again');return}
  const rows=ORDERS.flatMap(o=>o.items.map(it=>({Order:o.id,Placed:new Date(o.created).toLocaleString(),Customer:o.name,Phone:o.phone,Method:o.method,Address:o.address,Town:o.town,Date:o.date,Window:o.slot,Status:o.status,Item:it.name,Qty:qtyLabel(it,prod(it.pid)),Note:it.note||'',Line:+lineTotal(it).toFixed(2),Substitutions:o.subs,OrderTotal:+(o.final||o.total).toFixed(2)})));
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows),'Orders');XLSX.writeFile(wb,`CenterFresh_Orders_${ymd(new Date())}.xlsx`)}

function aProducts(q){
  const t=(q.get('q')||'').toLowerCase(),dep=q.get('dept')||'',f=q.get('f')||'',pg=+q.get('page')||1,N=50;
  let list=P.filter(p=>(!t||(p.name+' '+p.size+' '+p.sub).toLowerCase().includes(t))&&(!dep||p.dept===dep)&&(!f||(f==='noprice'?!hasPrice(p):f==='priced'?hasPrice(p):f==='sale'?(p.sale||p.dealN):true)));
  list.sort((a,b)=>a.dept.localeCompare(b.dept)||a.name.localeCompare(b.name));
  const pages=Math.max(1,Math.ceil(list.length/N)),items=list.slice((pg-1)*N,pg*N),priced=P.filter(hasPrice).length;
  const link=o=>{const u=new URLSearchParams({q:q.get('q')||'',dept:dep,f,...o});[...u.keys()].forEach(k=>!u.get(k)&&u.delete(k));return '#/admin/products?'+u};
  return `<div class="stats"><div><b>${P.length.toLocaleString()}</b>Products</div><div><b>${priced.toLocaleString()}</b>Priced</div><div><b>${(P.length-priced).toLocaleString()}</b>Need a price</div><div><b>${P.filter(p=>isPic(p.img)).length.toLocaleString()}</b>With a photo</div></div>
   <div class="panel"><h3>Prices from Excel</h3>
    <p class="small muted">Download the price sheet — it lists every product with its ID, name, size and department. Fill in the Price column (and any sale, case or multi-buy prices), then upload it. Rows are matched by ID, so you can also fix departments and names. New rows without an ID are added as new products.</p>
    <div class="row"><button class="btn" onclick="priceSheet()">Download price sheet</button><label class="btn ghost" style="margin:0">Upload price sheet<input type="file" accept=".xlsx,.xls,.csv" onchange="importX(this.files[0])" hidden></label></div></div>
   <div class="panel"><h3>Add photos</h3><p class="small muted">Select many photos at once. Each file is matched to the product with the same name. Photos are resized automatically.</p>
    <div class="photo-drop"><input type="file" accept="image/*" multiple onchange="bulkPhotos(this.files)" aria-label="Choose product photos"></div></div>
   <div class="toolbar"><div class="row"><input type="search" placeholder="Search products" value="${esc(q.get('q')||'')}" onkeydown="if(event.key==='Enter')location.hash='/admin/products?q='+encodeURIComponent(this.value)+'&dept=${encodeURIComponent(dep)}&f=${f}'" style="max-width:260px" aria-label="Search products">
     <select style="width:auto" onchange="location.hash=this.value.slice(1)" aria-label="Department"><option value="${link({dept:'',page:''})}">All departments</option>${DEPT_NAMES.map(d=>`<option value="${link({dept:d,page:''})}" ${d===dep?'selected':''}>${esc(d)}</option>`).join('')}</select>
     <select style="width:auto" onchange="location.hash=this.value.slice(1)" aria-label="Show">${[['','All products'],['noprice','Needs a price'],['priced','Priced'],['sale','On sale']].map(([v,l])=>`<option value="${link({f:v,page:''})}" ${v===f?'selected':''}>${l}</option>`).join('')}</select></div>
    <button class="btn lime" onclick="editP()">Add product</button></div>
   <p class="small muted">${list.length.toLocaleString()} shown</p>
   <div class="panel tbl-wrap"><table><thead><tr><th></th><th>Name</th><th>Department</th><th>Price</th><th>Sale</th><th>Case</th><th></th></tr></thead><tbody>
   ${items.map(p=>`<tr><td><span class="${tcls(p)}" style="--h:${hue(p.dept)};width:44px;height:44px;font-size:1.3rem">${pimg(p)}</span></td><td><b>${esc(p.name)}</b><div class="small muted">${esc(p.size)}${p.featured?' · featured':''}</div></td><td>${esc(p.dept)}<div class="small muted">${esc(p.sub)}</div></td>
    <td><input type="number" step="0.01" min="0" value="${p.price??''}" placeholder="—" style="width:90px" aria-label="Price for ${esc(p.name)}" onchange="quickPrice('${p.id}',this.value)">${p.unit==='lb'?' /lb':''}</td><td>${p.sale?money(p.sale):'—'}</td><td>${p.caseQty&&p.caseP?p.caseQty+' / '+money(p.caseP):'—'}</td>
    <td><button class="btn sm ghost" onclick="editP('${p.id}')">Edit</button></td></tr>`).join('')}</tbody></table></div>
   ${pages>1?`<nav class="pager" aria-label="Pages">${pg>1?`<a href="${link({page:pg-1})}">‹</a>`:''}${pageNums(pg,pages).map(n=>n==='…'?'<b class="muted" style="align-self:center">…</b>':n===pg?`<span>${n}</span>`:`<a href="${link({page:n})}">${n}</a>`).join('')}${pg<pages?`<a href="${link({page:pg+1})}">›</a>`:''}</nav>`:''}`;
}
function quickPrice(id,v){const p=prod(id),x=parseFloat(v);p.price=isNaN(x)||x<=0?null:x;saveAll();toast(p.price?`${p.name}: ${money(p.price)}`:'Price removed')}
function priceSheet(){if(!window.XLSX){toast('Excel tools are still loading — try again');return}
  const rows=P.slice().sort((a,b)=>a.dept.localeCompare(b.dept)||a.name.localeCompare(b.name)).map(p=>({ID:p.id,Name:p.name,Size:p.size,Department:p.dept,Subcategory:p.sub,Price:p.price??'',Unit:p.unit,SalePrice:p.sale||'',CaseQty:p.caseQty||'',CasePrice:p.caseP||'',DealQty:p.dealN||'',DealTotal:p.dealT||'',Featured:p.featured?'yes':'no'}));
  const ws=XLSX.utils.json_to_sheet(rows);ws['!cols']=[{wch:10},{wch:48},{wch:14},{wch:18},{wch:22},{wch:8},{wch:6},{wch:9},{wch:8},{wch:9},{wch:8},{wch:9},{wch:8}];
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Prices');XLSX.writeFile(wb,'CenterFresh_Price_Sheet.xlsx')}
function editP(id){
  const p=id?prod(id):{name:'',dept:DEPT_NAMES[0],sub:DEPTS[DEPT_NAMES[0]][1][0],price:'',unit:'ea',size:'',img:'🛒',pop:50};
  const num=(k,l)=>`<div><label for="e_${k}">${l}</label><input id="e_${k}" type="number" step="0.01" value="${p[k]??''}"></div>`;
  modal(`<h2>${id?'Edit product':'Add product'}</h2>
   <label for="e_name">Name</label><input id="e_name" value="${esc(p.name)}">
   <div class="grid2"><div><label for="e_dept">Department</label><select id="e_dept" onchange="e_sub.innerHTML=DEPTS[this.value][1].map(s=>'<option>'+s+'</option>').join('')">${DEPT_NAMES.map(d=>`<option ${d===p.dept?'selected':''}>${d}</option>`).join('')}</select></div>
    <div><label for="e_sub">Subcategory</label><select id="e_sub">${DEPTS[p.dept][1].map(s=>`<option ${s===p.sub?'selected':''}>${s}</option>`).join('')}</select></div></div>
   <div class="grid2">${num('price','Price')}<div><label for="e_unit">Sold</label><select id="e_unit"><option value="ea" ${p.unit==='ea'?'selected':''}>Each</option><option value="lb" ${p.unit==='lb'?'selected':''}>Per pound</option></select></div></div>
   <label for="e_size">Package size</label><input id="e_size" value="${esc(p.size)}">
   <div class="grid2">${num('sale','Sale price')}${num('pop','Popularity (0–100)')}${num('caseQty','Units per case')}${num('caseP','Case price')}${num('dealN','Multi-buy: quantity')}${num('dealT','Multi-buy: total price')}</div>
   <div class="row" style="margin-top:12px;align-items:flex-start"><span class="${tcls(p)}" style="--h:${hue(p.dept)};width:84px;height:84px;font-size:2.4rem;flex-shrink:0">${pimg(p)}</span><div style="flex:1">
    <label for="e_file" style="margin-top:0">Upload photo</label><input id="e_file" type="file" accept="image/*">
    <label for="e_url">Or photo link (URL)</label><input id="e_url" placeholder="https://…" value="${/^https?:/.test(p.img||'')?esc(p.img):''}"></div></div>
   <div class="grid2"><div><label for="e_img">Emoji if no photo</label><input id="e_img" value="${esc(p.emoji||(isPic(p.img)?'':p.img)||'')}"></div><div>${isPic(p.img)?'<label>&nbsp;</label><label class="check" style="margin:0"><input type="checkbox" id="e_rm"> Remove photo</label>':''}</div></div>
   <label class="check"><input type="checkbox" id="e_feat" ${p.featured?'checked':''}> Show in “Featured this week”</label>
   <div class="row" style="margin-top:16px"><button class="btn" onclick="saveP('${id||''}')">${id?'Save changes':'Add product'}</button>${id?`<button class="btn danger" onclick="delP('${id}')">Delete</button>`:''}</div>`);
}
async function saveP(id){
  const g=k=>document.getElementById('e_'+k).value,n=k=>{const v=parseFloat(g(k));return isNaN(v)||v===0?null:v};
  if(!g('name').trim()||!n('price')){toast('Name and price are required');return}
  const emoji=g('img').trim()||'🛒',f=document.getElementById('e_file').files[0],url=g('url').trim(),rm=document.getElementById('e_rm')?.checked;
  let img=id&&isPic(prod(id).img)?prod(id).img:emoji;
  if(f)img=await shrink(f);else if(url)img=url;
  if(rm&&!f&&!url)img=emoji;
  const d={name:g('name').trim(),dept:g('dept'),sub:g('sub'),price:n('price'),unit:g('unit'),size:g('size'),img,emoji,sale:n('sale'),caseQty:n('caseQty'),caseP:n('caseP'),dealN:n('dealN'),dealT:n('dealT'),pop:n('pop')||0,featured:document.getElementById('e_feat').checked};
  if(id)Object.assign(prod(id),d);else P.push({id:'p'+Date.now(),...d});
  saveAll();closeModal();route();toast(id?'Product saved':'Product added');
}
function shrink(file,max=500){return new Promise((res,rej)=>{const fr=new FileReader();fr.onerror=rej;fr.onload=()=>{const im=new Image();im.onerror=rej;im.onload=()=>{
  const k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
  const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.8))};im.src=fr.result};fr.readAsDataURL(file)})}
const norm=t=>String(t).toLowerCase().replace(/\.[a-z0-9]+$/,'').replace(/[^a-z0-9]+/g,' ').trim();
async function bulkPhotos(files){
  let ok=0;const miss=[];
  for(const f of files){const key=norm(f.name),p=P.find(x=>norm(x.name)===key)||P.find(x=>norm(x.name).includes(key)||key.includes(norm(x.name)));
    if(!p){miss.push(f.name);continue}
    try{p.emoji=p.emoji||fallbackEmoji(p);p.img=await shrink(f);ok++}catch(e){miss.push(f.name)}}
  saveAll();route();
  toast(`${ok} photo${ok===1?'':'s'} added${miss.length?` — no product matched: ${miss.slice(0,3).join(', ')}${miss.length>3?'…':''}`:''}`);
}
function delP(id){if(!confirm('Delete this product?'))return;P=P.filter(p=>p.id!==id);saveAll();closeModal();route();toast('Product deleted')}
function tplDownload(){return priceSheet();if(!window.XLSX){toast('Excel tools are still loading — try again');return}
  const ws=XLSX.utils.json_to_sheet(P.slice(0,3).map(p=>({Name:p.name,Department:p.dept,Subcategory:p.sub,Price:p.price,Unit:p.unit,Size:p.size,SalePrice:p.sale||'',CaseQty:p.caseQty||'',CasePrice:p.caseP||'',DealQty:p.dealN||'',DealTotal:p.dealT||'',Featured:p.featured?'yes':'no',ImageURL:/^https?:/.test(p.img||'')?p.img:''})));
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Products');XLSX.writeFile(wb,'CenterFresh_Products_Template.xlsx')}
function importX(file){
  if(!file)return;if(!window.XLSX){toast('Excel tools are still loading — try again');return}
  const fr=new FileReader();fr.onload=e=>{try{
    const wb=XLSX.read(e.target.result,{type:'array'}),rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);let add=0,upd=0,skip=0;
    rows.forEach(r=>{const nm=String(r.Name||'').trim(),dept=DEPT_NAMES.find(d=>d.toLowerCase()===String(r.Department||'').trim().toLowerCase());
      if(!nm||!dept){skip++;return}
      const subs=DEPTS[dept][1],sub=subs.find(s=>s.toLowerCase()===String(r.Subcategory||'').trim().toLowerCase())||subs[0],num=v=>{const x=parseFloat(v);return isNaN(x)||!x?null:x};
      const d={name:nm,dept,sub,price:num(r.Price),unit:String(r.Unit||'ea').toLowerCase().startsWith('l')?'lb':'ea',size:String(r.Size||''),sale:num(r.SalePrice),caseQty:num(r.CaseQty),caseP:num(r.CasePrice),dealN:num(r.DealQty),dealT:num(r.DealTotal),featured:/^y/i.test(String(r.Featured||''))};if(/^https?:/.test(String(r.ImageURL||'').trim()))d.img=String(r.ImageURL).trim();
      const ex=(r.ID&&prod(String(r.ID).trim()))||(!r.ID&&P.find(p=>p.name.toLowerCase()===nm.toLowerCase()&&(!r.Size||p.size===String(r.Size))));if(ex){Object.assign(ex,d);upd++}else{P.push({id:'p'+Date.now()+add,img:DEPTS[dept][0],emoji:DEPTS[dept][0],pop:50,...d});add++}});
    saveAll();route();toast(`${add} added, ${upd} updated${skip?`, ${skip} skipped (missing name or department)`:''}`);
  }catch(err){toast('That file couldn’t be read. Use the template columns.')}};fr.readAsArrayBuffer(file);
}

function aCustomers(){
  const cs=USERS.filter(u=>u.role!=='admin');
  return `<div class="panel tbl-wrap"><h3>Customers (${cs.length})</h3><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Town</th><th>Orders</th></tr></thead><tbody>${cs.map(u=>`<tr><td>${esc(u.first+' '+u.last)}</td><td>${esc(u.email)}</td><td>${esc(u.phone)}</td><td>${esc(u.town||'')}</td><td>${ORDERS.filter(o=>o.email===u.email).length}</td></tr>`).join('')||'<tr><td colspan="5" class="muted">No customers yet.</td></tr>'}</tbody></table></div>
   <div class="panel tbl-wrap"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Specials subscribers (${SUBS.length})</h3><button class="btn sm ghost" onclick="exportSubs()">Export to Excel</button></div><table><thead><tr><th>Email</th><th>First name</th><th>Cell</th><th>Joined</th></tr></thead><tbody>${SUBS.map(s=>`<tr><td>${esc(s.email)}</td><td>${esc(s.first)}</td><td>${esc(s.cell)}</td><td>${new Date(s.t).toLocaleDateString()}</td></tr>`).join('')||'<tr><td colspan="4" class="muted">No subscribers yet.</td></tr>'}</tbody></table></div>
   <div class="panel"><h3>Add a store admin</h3><div class="grid2"><div><label for="na_e">Email</label><input id="na_e" type="email"></div><div><label for="na_p">Password</label><input id="na_p" type="password" minlength="6"></div></div><button class="btn" style="margin-top:12px" onclick="addAdmin()">Add admin</button></div>`;
}
function exportSubs(){if(!window.XLSX)return;const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(SUBS.map(s=>({Email:s.email,First:s.first,Cell:s.cell,Joined:new Date(s.t).toLocaleDateString()}))),'Subscribers');XLSX.writeFile(wb,'CenterFresh_Subscribers.xlsx')}
function addAdmin(){const e=na_e.value.trim().toLowerCase(),p=na_p.value;if(!e||p.length<6){toast('Enter an email and a password of 6+ characters');return}
  const ex=USERS.find(u=>u.email===e);if(ex){ex.role='admin'}else USERS.push({email:e,pass:hash(p),first:'Admin',last:'',phone:'',role:'admin',fav:[]});saveAll();route();toast('Admin added')}
function aMessages(){
  MSGS.forEach(m=>m.read=true);saveAll();
  return MSGS.length?MSGS.map(m=>`<div class="panel"><div class="row" style="justify-content:space-between"><b>${esc(m.name)}</b><span class="small muted">${new Date(m.t).toLocaleString()}</span></div><div class="small"><a href="mailto:${esc(m.email)}">${esc(m.email)}</a> ${m.phone?'· <a href="tel:'+esc(m.phone)+'">'+esc(m.phone)+'</a>':''} ${m.order?'· Order #'+esc(m.order):''}</div><p style="margin-bottom:0">${esc(m.msg)}</p></div>`).join('')
   :'<div class="empty"><div class="e">✉️</div><h3>No messages</h3><p class="muted">Contact form messages and password reset requests appear here.</p></div>';
}
function aMenus(){
  const imgs=DB.get('menuImages',{});
  return `<p class="muted">Upload a picture of each printed menu (items and prices). It appears under that section's banner on the Deli Menu page.</p><div class="menu-sec">${Object.keys(DELI_MENU).map(s=>`<div class="menu-card"><h3>${s}</h3>${imgs[s]?`<img src="${imgs[s]}" alt="">`:'<p class="small muted">No image yet</p>'}
   <input type="file" accept="image/*" onchange="menuImg('${s}',this.files[0])" aria-label="Upload ${s} menu image">${imgs[s]?`<button class="linkbtn red" style="margin-top:8px" onclick="menuImg('${s}',null)">Remove image</button>`:''}</div>`).join('')}</div>`;
}
function menuImg(s,f){const imgs=DB.get('menuImages',{});if(!f){delete imgs[s];DB.set('menuImages',imgs);route();return}const fr=new FileReader();fr.onload=()=>{imgs[s]=fr.result;DB.set('menuImages',imgs);route();toast('Menu image saved')};fr.readAsDataURL(f)}
function aSettings(){
  const day=i=>`<tr><td>${DAYS[i]}</td><td><input type="number" min="0" max="24" step="0.5" id="w0_${i}" value="${S.windows[i]?.[0]??''}" style="width:80px"></td><td><input type="number" min="0" max="24" step="0.5" id="w1_${i}" value="${S.windows[i]?.[1]??''}" style="width:80px"></td><td><input type="number" min="0" max="24" step="0.5" id="c_${i}" value="${S.cutoffs[i]??''}" style="width:80px"></td></tr>`;
  return `<form onsubmit="return saveSettings(event)"><div class="two" style="margin-top:0"><div class="panel"><h3>Ordering</h3>
    <div class="grid2"><div><label for="s_min">Minimum order ($)</label><input id="s_min" type="number" step="0.01" value="${S.minOrder}"></div><div><label for="s_fee">Service fee ($)</label><input id="s_fee" type="number" step="0.01" value="${S.fee}"></div></div>
    <label for="s_note">Item note length (characters)</label><input id="s_note" type="number" value="${S.noteMax}">
    <label for="s_towns">Delivery towns (comma separated)</label><input id="s_towns" value="${esc(S.towns.join(', '))}">
    <h3 style="margin-top:18px">Delivery windows &amp; same-day cutoff</h3><p class="small muted">Hours in 24-hour time (e.g. 16 = 4 PM, 12.5 = 12:30 PM). Leave a day blank to close it.</p>
    <div class="tbl-wrap"><table><thead><tr><th>Day</th><th>First window starts</th><th>Last window ends</th><th>Same-day cutoff</th></tr></thead><tbody>${[0,1,2,3,4,5,6].map(day).join('')}</tbody></table></div></div>
   <div class="panel"><h3>Store info</h3><label for="s_addr">Address</label><input id="s_addr" value="${esc(S.address)}"><label for="s_ph">Phone</label><input id="s_ph" value="${esc(S.phone)}"><label for="s_em">Email</label><input id="s_em" value="${esc(S.email)}">
    <label for="s_hr">Store hours</label><textarea id="s_hr" rows="5" placeholder="Sunday 7 AM – 9 PM&#10;Monday–Thursday …">${esc(S.hours)}</textarea>
    <label for="s_ig">Instagram link</label><input id="s_ig" value="${esc(S.instagram)}"><label for="s_ios">iPhone app link</label><input id="s_ios" value="${esc(S.ios)}"><label for="s_and">Android app link</label><input id="s_and" value="${esc(S.android)}"></div></div>
   <button class="btn lime" type="submit">Save settings</button></form>`;
}
function saveSettings(e){e.preventDefault();const v=id=>document.getElementById(id).value,n=id=>{const x=parseFloat(v(id));return isNaN(x)?null:x};
  S.minOrder=n('s_min')||0;S.fee=n('s_fee')||0;S.noteMax=n('s_note')||48;S.towns=v('s_towns').split(',').map(t=>t.trim()).filter(Boolean);
  for(let i=0;i<7;i++){const a=n('w0_'+i),b=n('w1_'+i),c=n('c_'+i);S.windows[i]=a!=null&&b!=null&&b-a>=2?[a,b]:null;S.cutoffs[i]=c}
  Object.assign(S,{address:v('s_addr').trim(),phone:v('s_ph').trim(),email:v('s_em').trim(),hours:v('s_hr').trim(),instagram:v('s_ig').trim(),ios:v('s_ios').trim(),android:v('s_and').trim()});
  saveAll();footer();toast('Settings saved');return false}

/* ============ FOOTER & BOOT ============ */
function footer(){
  document.getElementById('f-store').innerHTML=[S.address&&esc(S.address),S.phone&&`<a href="tel:${esc(S.phone)}" style="display:inline">${esc(S.phone)}</a>`,S.email&&`<a href="mailto:${esc(S.email)}" style="display:inline">${esc(S.email)}</a>`].filter(Boolean).join('<br>')||'Full-service kosher supermarket. Delivery and pickup.';
  document.getElementById('f-apps').innerHTML=(S.ios||S.android?`<div class="apps">${S.ios?`<a href="${esc(S.ios)}" style="display:inline"><img src="img/w/appstore-apple-CW7X5oeX-c2a5c30f845d.webp" alt="Download on the App Store"></a>`:''}${S.android?`<a href="${esc(S.android)}" style="display:inline"><img src="img/w/appstore-google-DqxPOtld-94d5d5520aa6.webp" alt="Get it on Google Play"></a>`:''}</div>`:'')+[S.instagram&&`<a href="${esc(S.instagram)}">Follow us on Instagram</a>`].filter(Boolean).join('');
  document.getElementById('yr').textContent=new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded',()=>{footer();renderActs();route();});
