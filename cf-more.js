/* =====================================================================
   CENTER FRESH — v2.1
   1) "Goes well with" / "Frequently bought together" suggestions
      (product page + right after adding to cart, Amazon style)
   2) Time Slots editor in Back Office → Settings
   ===================================================================== */

/* ---------------------------------------------------------------
   TIME SLOTS
   S.slotDefs  = {0:[{s:9,e:11,t:'both'|'delivery'|'pickup',cap:null}], ...}  (weekday 0=Sunday)
   S.slotDates = {'2026-10-20':{closed:true,note:'Holiday'} | {slots:[...],note:''}}
   S.leadHours = hours a same-day slot must be ahead of now
   --------------------------------------------------------------- */
const slotLab=x=>`${h12(x.s)} – ${h12(x.e)}`;
const tToH=v=>{if(!v)return null;const [h,m]=String(v).split(':').map(Number);return h+(m||0)/60};
const hToT=h=>h==null?'':String(Math.floor(h)).padStart(2,'0')+':'+String(Math.round((h-Math.floor(h))*60)).padStart(2,'0');
function legacyDefs(dow){const w=S.windows?.[dow];if(!w)return[];const o=[];for(let h=w[0];h+2<=w[1];h++)o.push({s:h,e:h+2,t:'both',cap:null});return o}
function defsFor(d){
  const sd=S.slotDates?.[d];if(sd)return sd.closed?[]:(sd.slots||[]);
  const dow=new Date(d+'T00:00').getDay();
  return S.slotDefs?(S.slotDefs[dow]||[]):legacyDefs(dow);
}
function curMethod(){try{if(document.querySelector('#mbox .slotpick')&&typeof SP!=='undefined'&&SP.method)return SP.method}catch(e){}return (getFul()||{}).method||'Delivery'}
const typeOK=(x,m)=>!m||!x.t||x.t==='both'||(x.t==='delivery'&&m==='Delivery')||(x.t==='pickup'&&m==='Pickup');
let SLOTN={};   // booked orders per date|slot for everyone (server count, no personal data)
async function refreshSlotCounts(){try{const d1=ymd(new Date()),d2=ymd(new Date(Date.now()+16*864e5));const {data,error}=await CF.sb.rpc('slot_counts',{d1,d2});if(!error&&Array.isArray(data)){SLOTN={};data.forEach(r=>SLOTN[r.d+'|'+r.slot]=r.n)}}catch(e){}}
const loadOf=(d,l)=>Math.max(slotLoad(d,l),SLOTN[d+'|'+l]||0);
const capOf=(d,x)=>{const k=new Date(d+'T00:00').getDay()+'|'+slotLab(x);return x.cap??S.capacityBySlot?.[k]??S.capacity};
window.allWindows=function(d,m){if(!d)return[];const ms=m||(location.hash.startsWith('#/admin')?null:curMethod());return defsFor(d).filter(x=>typeOK(x,ms)).map(slotLab)};
window.slotsFor=function(d,m){
  if(!d)return[];const nd=String(S.noServiceDays||'').split(/[\s,]+/).filter(Boolean);if(nd.includes(d))return[];
  const now=new Date(),t=ymd(now);if(d<t)return[];
  const dow=new Date(d+'T00:00').getDay(),ms=m||curMethod();let defs=defsFor(d).filter(x=>typeOK(x,ms));
  if(d===t){const c=S.cutoffs?.[dow],h=now.getHours()+now.getMinutes()/60;if(c==null||h>=c)return[];defs=defs.filter(x=>x.s>=h+(S.leadHours??2))}
  return defs.filter(x=>loadOf(d,slotLab(x))<capOf(d,x)).map(slotLab);
};
const _openSlotM=window.openSlot;
window.openSlot=function(){_openSlotM();refreshSlotCounts().then(()=>{if(document.querySelector('#mbox .slotpick'))slotModal()})};
refreshSlotCounts().then(()=>{try{renderFul()}catch(e){}});setInterval(refreshSlotCounts,180000);

/* ---------- editor ---------- */
SET_SECTIONS.find(x=>x[0]==='slots')[1]='Time Slots';
let SE=null;
const TYPES=[['both','Delivery & pickup'],['delivery','Delivery only'],['pickup','Pickup only']];
function seStart(){
  const defs={};for(let d=0;d<7;d++)defs[d]=(S.slotDefs?(S.slotDefs[d]||[]):legacyDefs(d)).map(x=>({s:x.s,e:x.e,t:x.t||'both',cap:x.cap??S.capacityBySlot?.[d+'|'+slotLab(x)]??null}));
  const dates=JSON.parse(JSON.stringify(S.slotDates||{}));
  SE={defs,dates,cap:S.capacity,lead:S.leadHours??2,cutoffs:{...S.cutoffs},dirty:false};
}
const seList=k=>String(k).length>2?(SE.dates[k].slots=SE.dates[k].slots||[]):SE.defs[k];
function seRow(k,x,i,nextDate){
  const l=slotLab(x),bk=nextDate?loadOf(nextDate,l):null;
  return `<div class="ser"><input type="time" value="${hToT(x.s)}" aria-label="Starts" onchange="seSet('${k}',${i},'s',tToH(this.value))"><span>to</span><input type="time" value="${hToT(x.e)}" aria-label="Ends" onchange="seSet('${k}',${i},'e',tToH(this.value))">
   <select aria-label="Type" onchange="seSet('${k}',${i},'t',this.value)">${TYPES.map(([v,t])=>`<option value="${v}" ${(x.t||'both')===v?'selected':''}>${t}</option>`).join('')}</select>
   <input type="number" min="0" value="${x.cap??''}" placeholder="${SE.cap}" aria-label="Order limit" title="Order limit (blank = default)" onchange="seSet('${k}',${i},'cap',this.value===''?null:Math.max(0,+this.value))" class="sercap">
   ${bk!=null?`<span class="mini muted serbk">${bk} booked ${prettyDate(nextDate)}</span>`:'<span></span>'}
   <button class="linkbtn red" onclick="seDel('${k}',${i})" aria-label="Remove slot">✕</button></div>`}
function seDay(d){
  const list=SE.defs[d],next=[...Array(7)].map((_,i)=>ymd(new Date(Date.now()+i*864e5))).find(x=>new Date(x+'T00:00').getDay()===d);
  return `<div class="sed ${list.length?'':'closed'}"><div class="sedh"><b>${DAYS[d]}</b>
   <label class="check" style="margin:0"><input type="checkbox" ${list.length?'checked':''} onchange="seOpenDay(${d},this.checked)"> Open</label>
   ${list.length?`<label class="mini" style="margin:0;display:flex;align-items:center;gap:6px">Same-day orders close at <input type="time" value="${hToT(SE.cutoffs[d])}" onchange="SE.cutoffs[${d}]=tToH(this.value);SE.dirty=true;seDraw()" style="width:auto"></label>`:''}
   <span style="flex:1"></span>${list.length?`<button class="btn sm ghost" onclick="seCopy(${d})">Copy to…</button>`:''}</div>
   ${list.length?list.map((x,i)=>seRow(d,x,i,next)).join('')+`<div class="row" style="gap:8px;margin-top:6px"><button class="btn sm ghost" onclick="seAdd(${d})">+ Add a slot</button><button class="btn sm ghost" onclick="seGen(${d})">Fill the day…</button></div>`:'<p class="mini muted" style="margin:6px 0 0">Closed — no deliveries or pickups.</p>'}</div>`}
function seDateCard(k){const o=SE.dates[k];
  return `<div class="sed ${o.closed?'closed':''}"><div class="sedh"><b>${new Date(k+'T00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'})}</b>
   <input value="${esc(o.note||'')}" placeholder="Note (e.g. Erev Yom Tov)" style="max-width:220px" onchange="SE.dates['${k}'].note=this.value;SE.dirty=true">
   <label class="check" style="margin:0"><input type="checkbox" ${o.closed?'checked':''} onchange="SE.dates['${k}'].closed=this.checked;if(!this.checked&&!(SE.dates['${k}'].slots||[]).length)SE.dates['${k}'].slots=SE.defs[new Date('${k}T00:00').getDay()].map(x=>({...x}));SE.dirty=true;seDraw()"> Closed this day</label>
   <span style="flex:1"></span><button class="linkbtn red" onclick="delete SE.dates['${k}'];SE.dirty=true;seDraw()">Remove date</button></div>
   ${o.closed?'':(o.slots||[]).map((x,i)=>seRow(k,x,i,k)).join('')+`<div class="row" style="gap:8px;margin-top:6px"><button class="btn sm ghost" onclick="seAdd('${k}')">+ Add a slot</button><button class="btn sm ghost" onclick="seGen('${k}')">Fill the day…</button></div>`}</div>`}
function seHTML(){
  if(!SE)seStart();
  const days=[...Array(14)].map((_,i)=>ymd(new Date(Date.now()+i*864e5)));
  const dk=Object.keys(SE.dates).filter(k=>k>=ymd(new Date())).sort();
  return `${SE.dirty?`<div class="sewarn"><b>You have unsaved changes.</b><span style="flex:1"></span><button class="btn sm ghost" onclick="SE=null;seDraw()">Discard</button><button class="btn sm" onclick="seSave()">Save time slots</button></div>`:''}
  <div class="panel"><div class="grid2" style="max-width:640px"><div><label for="secap">Default order limit per slot</label><input id="secap" type="number" min="1" value="${SE.cap}" onchange="SE.cap=Math.max(1,+this.value||20);SE.dirty=true;seDraw()"></div>
   <div><label for="selead">Same-day: slot must start at least</label><div class="row" style="flex-wrap:nowrap;gap:8px"><input id="selead" type="number" min="0" step="0.5" value="${SE.lead}" onchange="SE.lead=Math.max(0,+this.value||0);SE.dirty=true" style="max-width:100px"><span class="muted small">hours from now</span></div></div></div>
   <p class="mini muted" style="margin-bottom:0">Each slot can be delivery & pickup, delivery only, or pickup only, with its own order limit (blank uses the default). Full slots disappear from the site. Changing a slot doesn’t move orders already placed.</p></div>
  <h3>Weekly schedule</h3>${[0,1,2,3,4,5,6].map(seDay).join('')}
  <h3 style="margin-top:22px">Special dates <span class="mini muted" style="font-weight:600">holidays, early closings, extra hours — these replace the weekly schedule for that date</span></h3>
  ${dk.map(seDateCard).join('')||'<p class="muted small">No special dates.</p>'}
  <div class="row" style="gap:8px;margin:8px 0 18px"><input type="date" id="sedate" min="${ymd(new Date())}" style="max-width:190px"><button class="btn sm ghost" onclick="seAddDate(true)">Close this date</button><button class="btn sm ghost" onclick="seAddDate(false)">Set special hours</button></div>
  <button class="btn" onclick="seSave()">Save time slots</button>
  <div class="panel tbl-wrap" style="margin-top:22px"><h3>Booked — next two weeks</h3><table><thead><tr><th>Day</th><th>Slots (booked / limit)</th></tr></thead><tbody>${days.map(d=>{const L=defsFor(d);return `<tr><td style="white-space:nowrap">${prettyDate(d)}</td><td>${L.length?L.map(x=>{const n=loadOf(d,slotLab(x)),c=capOf(d,x);return `<span class="slchip ${n>=c?'full':''}">${slotLab(x)}${x.t&&x.t!=='both'?` · ${x.t==='pickup'?'pickup':'delivery'}`:''} <b>${n}/${c}</b></span>`}).join(''):`<span class="muted">${S.slotDates?.[d]?.note?esc(S.slotDates[d].note)+' — ':''}Closed</span>`}</td></tr>`}).join('')}</tbody></table></div>`}
function seDraw(){const b=$('seBox');if(b)b.innerHTML=seHTML()}
function seSet(k,i,f,v){const l=seList(k);if(!l[i])return;if((f==='s'||f==='e')&&v==null)return seDraw();l[i][f]=v;SE.dirty=true;seDraw()}
function seDel(k,i){seList(k).splice(i,1);SE.dirty=true;seDraw()}
function seAdd(k){const l=seList(k),last=l[l.length-1],s=last?last.e:9;l.push({s,e:Math.min(24,s+2),t:'both',cap:null});SE.dirty=true;seDraw()}
function seOpenDay(d,on){SE.defs[d]=on?[{s:9,e:11,t:'both',cap:null},{s:11,e:13,t:'both',cap:null},{s:13,e:15,t:'both',cap:null},{s:15,e:17,t:'both',cap:null}]:[];if(on&&SE.cutoffs[d]==null)SE.cutoffs[d]=12;SE.dirty=true;seDraw()}
function seAddDate(closed){const v=$('sedate').value;if(!v){toast('Pick a date first');return}if(SE.dates[v]){toast('That date is already listed');return}
  SE.dates[v]=closed?{closed:true,note:''}:{closed:false,note:'',slots:defsFor(v).map(x=>({...x}))};SE.dirty=true;seDraw()}
function seCopy(d){modal(`<h2>Copy ${DAYS[d]}’s slots</h2><p class="muted small">This replaces the slots on the days you pick.</p>${[0,1,2,3,4,5,6].filter(x=>x!==d).map(x=>`<label class="check"><input type="checkbox" class="secp" value="${x}"> ${DAYS[x]}</label>`).join('')}
  <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn" onclick="document.querySelectorAll('.secp:checked').forEach(c=>{SE.defs[+c.value]=SE.defs[${d}].map(x=>({...x}));if(SE.cutoffs[+c.value]==null)SE.cutoffs[+c.value]=SE.cutoffs[${d}]});SE.dirty=true;closeModal();seDraw()">Copy</button></div>`)}
function seGen(k){modal(`<h2>Fill the day with slots</h2><p class="muted small">Replaces this day’s slots with evenly spaced ones.</p>
  <div class="grid2"><div><label for="sg1">First slot starts</label><input id="sg1" type="time" value="09:00"></div><div><label for="sg2">Last slot ends</label><input id="sg2" type="time" value="21:00"></div>
  <div><label for="sg3">Each slot lasts (hours)</label><input id="sg3" type="number" min="0.5" step="0.5" value="2"></div><div><label for="sg4">New slot every (hours)</label><input id="sg4" type="number" min="0.5" step="0.5" value="2"></div>
  <div><label for="sg5">Type</label><select id="sg5">${TYPES.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select></div></div>
  <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn" onclick="seGenDo('${k}')">Create slots</button></div>`)}
function seGenDo(k){const a=tToH($('sg1').value),b=tToH($('sg2').value),len=+$('sg3').value,step=+$('sg4').value,t=$('sg5').value;
  if(a==null||b==null||!(len>0)||!(step>0)||b-a<len){toast('Check the times');return}
  const out=[];for(let h=a;h+len<=b+1e-9&&out.length<48;h+=step)out.push({s:+h.toFixed(2),e:+(h+len).toFixed(2),t,cap:null});
  const l=seList(k);l.splice(0,l.length,...out);SE.dirty=true;closeModal();seDraw()}
function seSave(){
  const bad=[];const clean=(l,where)=>{const seen=new Set();return l.filter(x=>{if(x.s==null||x.e==null||x.e<=x.s){bad.push(where+': a slot ends before it starts');return false}const L=slotLab(x);if(seen.has(L)){bad.push(where+': '+L+' is listed twice');return false}seen.add(L);return true}).sort((a,b)=>a.s-b.s||a.e-b.e).map(x=>({s:x.s,e:x.e,t:x.t||'both',cap:x.cap??null}))};
  const defs={};for(let d=0;d<7;d++)defs[d]=clean(SE.defs[d],DAYS[d]);
  const dates={};Object.entries(SE.dates).forEach(([k,o])=>{if(k<ymd(new Date()))return;dates[k]=o.closed?{closed:true,note:o.note||''}:{closed:false,note:o.note||'',slots:clean(o.slots||[],k)}});
  if(bad.length){modal(`<h2>Please fix these first</h2><ul>${bad.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><button class="btn" onclick="closeModal()">OK</button>`);return}
  S.slotDefs=defs;S.slotDates=dates;S.capacity=SE.cap;S.leadHours=SE.lead;
  const cut={};for(let d=0;d<7;d++)cut[d]=defs[d].length?(SE.cutoffs[d]??null):null;S.cutoffs=cut;
  for(let d=0;d<7;d++)S.windows[d]=defs[d].length?[Math.min(...defs[d].map(x=>x.s)),Math.max(...defs[d].map(x=>x.e))]:null;
  S.capacityBySlot={};for(let d=0;d<7;d++)defs[d].forEach(x=>{if(x.cap!=null)S.capacityBySlot[d+'|'+slotLab(x)]=x.cap});
  SE=null;saveSet('Time slots');seDraw();try{renderAnnc();renderFul()}catch(e){}
}
BO_VIEWS.settings=(f=>q=>{const s=q.get('s')||'general';let h=f(q);
  if(s==='slots'&&roleOf()==='admin')return h.replace(/<h2>Time Slots<\/h2>[\s\S]*$/,'<h2>Time Slots</h2><div id="seBox">'+seHTML()+'</div>');
  if(s==='general'&&S.slotDefs)h=h.replace(/(<h3 style="margin-top:18px">Delivery windows &amp; same-day cutoff<\/h3>)/,'$1<p class="sewarn" style="margin:6px 0">Delivery and pickup times are now set slot by slot under <a href="#/admin/settings?s=slots">&nbsp;Settings → Time Slots</a>. The hours below are no longer used.</p>');
  return h})(BO_VIEWS.settings);

/* ---------------------------------------------------------------
   GOES WELL WITH / FREQUENTLY BOUGHT TOGETHER
   related = {manual:{pid:[pid…]}, auto:{pid:[pid…]}, at:time}
   manual = picked by staff · auto = bought together in 2+ orders
   then smart pairings by category fill the rest
   --------------------------------------------------------------- */
let REL=CF.cache.related&&typeof CF.cache.related==='object'?CF.cache.related:{manual:{},auto:{},at:0};REL.manual=REL.manual||{};REL.auto=REL.auto||{};
const GOES={
 'Pasta & Noodles':['Sauces & Condiments|marinara|pasta sauce|tomato sauce|pesto','Cheese|parmesan|mozzarella|shredded','Spices|garlic|oregano|basil'],
 'Bread':['Butter & Margarine','Cream Cheese & Sour Cream','Spreads & Jam','Dips & Spreads'],
 'Challah':['Dips & Spreads','Hummus & Tehina','Wine & Grape Juice','Pickles, Olives & Kraut'],
 'Bagels & Rolls':['Cream Cheese & Sour Cream|cream cheese','Smoked Fish|lox|salmon','Fish Spreads & Salads','Butter & Margarine'],
 'Pita & Wraps':['Hummus & Tehina','Dips & Spreads','Salad Bags','Vegetables|cucumber|tomato'],
 'Cereal & Breakfast':['Milk','Milk Alternatives','Fruits|banana|berr|strawberr','Yogurt'],
 'Coffee & Tea':['Creamers','Milk','Cookies','Kichels','Rugelach'],
 'Chips':['Dips & Spreads|salsa|dip','Soda','Hummus & Tehina','Seltzer'],
 'Snacks':['Soda','Juices','Seltzer'],
 'Crackers':['Cheese','Dips & Spreads','Fish Spreads & Salads','Hummus & Tehina'],
 'Cookies':['Milk','Coffee & Tea','Ice Cream'],
 'Spreads & Jam':['Bread','Butter & Margarine','Crackers'],
 'Beef':['Spices|steak|grill|garlic|onion','Sauces & Condiments|bbq|barbecue|marinade|steak','Vegetables|onion|potato|mushroom','Oil & Vinegar'],
 'Chicken':['Spices|chicken|paprika|garlic|onion','Sauces & Condiments|bbq|duck|teriyaki|honey|apricot','Vegetables|onion|potato|carrot','Bags & Wraps|oven|roast'],
 'Turkey':['Spices','Sauces & Condiments|cranberr|gravy','Vegetables|onion|potato|celery'],
 'Lamb':['Spices|rosemary|garlic','Herbs|rosemary|mint','Vegetables|potato|onion'],
 'Veal':['Spices','Vegetables|onion|mushroom','Oil & Vinegar'],
 'Oven Ready':['Side Dishes','Kugels','Vegetables|potato|onion'],
 'Fresh Fish':['Fruits|lemon','Herbs|dill|parsley','Spices|fish|garlic|lemon','Oil & Vinegar'],
 'Frozen Fish':['Fruits|lemon','Spices|fish|lemon','Sauces & Condiments|tartar|mayo'],
 'Ready To Bake':['Fruits|lemon','Herbs|dill|parsley','Foil Pans'],
 'Herring':['Crackers','Challah','Pickles, Olives & Kraut','Wine & Grape Juice'],
 'Smoked Fish':['Bagels & Rolls','Cream Cheese & Sour Cream|cream cheese','Crackers','Vegetables|onion|tomato'],
 'Fish Spreads & Salads':['Crackers','Bagels & Rolls','Challah'],
 'Hummus & Tehina':['Pita & Wraps','Vegetables|cucumber|carrot|pepper','Crackers','Chips'],
 'Dips & Spreads':['Challah','Crackers','Chips','Pita & Wraps'],
 'Sliced Deli Meats':['Bread','Sauces & Condiments|mustard|mayo','Pickles, Olives & Kraut|pickle','Vegetables|lettuce|tomato'],
 'Hot Dogs & Sausage':['Bagels & Rolls|bun|roll','Sauces & Condiments|ketchup|mustard','Pickles, Olives & Kraut|kraut|relish|pickle','Soda'],
 'Pickles, Olives & Kraut':['Sliced Deli Meats','Hot Dogs & Sausage','Challah'],
 'Vegetables':['Oil & Vinegar','Spices','Salad Bags','Sauces & Condiments|dressing'],
 'Salad Bags':['Sauces & Condiments|dressing|vinaigrette','Vegetables|tomato|cucumber|pepper|onion','Nuts & Seeds|crouton|almond|walnut|sunflower','Cheese|feta|parmesan'],
 'Fruits':['Yogurt','Cut Fruits & Vegetables','Dried Fruit','Cereal & Breakfast|granola'],
 'Cut Fruits & Vegetables':['Hummus & Tehina','Dips & Spreads','Yogurt'],
 'Herbs':['Oil & Vinegar','Fresh Fish','Spices'],
 'Cheese':['Crackers','Wine & Grape Juice','Bread','Fruits|grape|apple|pear'],
 'Yogurt':['Cereal & Breakfast|granola','Fruits|berr|banana','Nuts & Seeds','Spreads & Jam|honey'],
 'Milk':['Cereal & Breakfast','Cookies','Coffee & Tea','Eggs'],
 'Eggs':['Bread','Butter & Margarine','Cheese','Milk'],
 'Butter & Margarine':['Bread','Baking Essentials','Eggs'],
 'Cream Cheese & Sour Cream':['Bagels & Rolls','Smoked Fish','Blintzes'],
 'Creamers':['Coffee & Tea'],
 'Baking Essentials':['Eggs','Butter & Margarine','Oil & Vinegar','Foil Pans'],
 'Rice':['Sauces & Condiments|soy|teriyaki','Beans & Grains','Spices','Soup Mix & Broth'],
 'Beans & Grains':['Rice','Spices','Soup Mix & Broth','Vegetables|onion|carrot'],
 'Soup Mix & Broth':['Vegetables|carrot|celery|onion|parsnip','Herbs|dill|parsley','Pasta & Noodles|noodle|soup'],
 'Soups':['Bread','Crackers','Challah'],
 'Kugels':['Shabbos Food','Side Dishes','Main Dishes','Challah'],
 'Shabbos Food':['Challah','Kugels','Wine & Grape Juice','Candles'],
 'Main Dishes':['Side Dishes','Kugels','Salads'],
 'Side Dishes':['Main Dishes','Kugels'],
 'Appetizers':['Main Dishes','Challah','Dips & Spreads'],
 'Wine & Grape Juice':['Challah','Cheese','Candles','Dips & Spreads'],
 'Ice Cream':['Dairy Desserts','Cookies','Chocolate','Disposables|cone|cup|spoon'],
 'Cakes':['Coffee & Tea','Ice Cream','Disposables|plate|fork'],
 'Danishes & Pastries':['Coffee & Tea','Milk'],'Donuts':['Coffee & Tea','Milk'],'Muffins & Cupcakes':['Coffee & Tea','Milk'],'Rugelach':['Coffee & Tea'],'Kichels':['Herring','Coffee & Tea','Wine & Grape Juice'],
 'Pizza':['Soda','French Fries','Salad Bags'],
 'French Fries':['Sauces & Condiments|ketchup','Pizza','Soda'],
 'Pancakes & Waffles':['Spreads & Jam|syrup|maple','Butter & Margarine','Frozen Fruit','Milk'],
 'Blintzes':['Cream Cheese & Sour Cream|sour','Spreads & Jam','Frozen Fruit'],
 'Frozen Dough':['Baking Essentials','Eggs','Foil Pans'],
 'Frozen Vegetables':['Spices','Oil & Vinegar','Rice'],
 'Rolls':['Salads & Poke','Sauces & Condiments|soy|ginger|wasabi','Soda'],'Specialty Rolls':['Salads & Poke','Sauces & Condiments|soy|ginger|wasabi'],'Tempura Rolls':['Salads & Poke','Sauces & Condiments|soy|ginger'],
 'Sushi Platters':['Salads & Poke','Soda','Disposables'],'Salads & Poke':['Rolls','Specialty Rolls'],
 'Diapers':['Wipes','Bath & Skin'],'Wipes':['Diapers','Bath & Skin'],'Baby Food':['Feeding','Wipes'],'Feeding':['Baby Food'],
 'Paper Goods':['Disposables','Cleaning','Bags & Wraps'],'Disposables':['Paper Goods','Foil Pans','Bags & Wraps'],
 'Foil Pans':['Bags & Wraps','Disposables','Baking Essentials'],'Bags & Wraps':['Foil Pans','Disposables'],
 'Cleaning':['Paper Goods','Laundry'],'Laundry':['Cleaning'],'Candles':['Wine & Grape Juice','Challah','Batteries & Electrical|match|lighter'],
 'Soda':['Chips','Snacks','Disposables|cup'],'Seltzer':['Chips','Snacks'],'Juices':['Snacks','Cereal & Breakfast'],'Water':['Snacks','Sports & Energy Drinks'],
 'Hair Care':['Bath & Body'],'Dental':['Bath & Body'],'Bath & Body':['Hair Care','Skin & Facial Care'],
 'Cold & Allergy':['Pain Relief','Juices','Soup Mix & Broth'],'Pain Relief':['Cold & Allergy'],
 'Chocolate':['Candy Packs','Snacks'],'Candy Packs':['Chocolate','Lollipops']
};
const okRel=p=>!!p&&vis(p)&&hasPrice(p)&&!oosP(p);
let SUBIX=null,SUBIXN=0;
function subIx(){if(SUBIX&&SUBIXN===P.length)return SUBIX;SUBIX={};P.forEach(p=>(SUBIX[p.sub]=SUBIX[p.sub]||[]).push(p));SUBIXN=P.length;return SUBIX}
function pickFrom(rule,seen,n){const k=rule.indexOf('|'),sub=k<0?rule:rule.slice(0,k),rx=k<0?'':rule.slice(k+1);
  let c=(subIx()[sub]||[]).filter(p=>okRel(p)&&!seen.has(p.id));if(rx){try{const r=new RegExp(rx,'i'),m=c.filter(p=>r.test(p.name));if(m.length)c=m}catch(e){}}
  return c.sort((a,b)=>(isPic(b.img)-isPic(a.img))||((b.pop||0)-(a.pop||0))||a.name.localeCompare(b.name)).slice(0,n)}
function goesWith(p,n=12,withSrc){if(!p)return[];const out=[],seen=new Set([p.id]);
  const push=(x,src)=>{if(okRel(x)&&!seen.has(x.id)){seen.add(x.id);out.push(withSrc?{p:x,src}:x)}};
  (REL.manual[p.id]||[]).forEach(id=>push(prod(id),'Picked by the store'));
  (REL.auto[p.id]||[]).forEach(id=>push(prod(id),'Bought together'));
  const lists=(GOES[p.sub]||[]).map(r=>pickFrom(r,seen,6));
  for(let i=0;i<6&&out.length<n;i++)lists.forEach(l=>{if(l[i]&&out.length<n)push(l[i],'Suggested pairing')});
  return out.slice(0,n)}
const STOPW=new Set(['the','and','with','for','oz','lb','pack','pk','ct','fl','of','in','fresh','kosher','size','large','small','family']);
const words=s=>new Set(String(s).toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>2&&!STOPW.has(w)&&!/^\d+$/.test(w)));
function similarTo(p,n=16){if(!p)return[];const b=brandOf(p),w=words(p.name),pr=unitPrice(p)||0;
  return (subIx()[p.sub]||[]).filter(x=>x!==p&&okRel(x)).map(x=>{const xw=words(x.name);let o=0;w.forEach(t=>{if(xw.has(t))o++});const xp=unitPrice(x)||0;
    return [x,o*2+(b&&brandOf(x)===b?1.5:0)-(pr&&xp?Math.min(2,Math.abs(xp-pr)/Math.max(pr,xp)*2):0)+(isPic(x.img)?.3:0)]}).sort((a,b)=>b[1]-a[1]||(b[0].pop||0)-(a[0].pop||0)).slice(0,n).map(a=>a[0])}

/* staff browsers rebuild "bought together" from real orders (a few times a day) */
function relCompute(force){if(typeof isStaffU!=='function'||!isStaffU())return 0;if(!force&&Date.now()-(REL.at||0)<6*36e5)return 0;
  const co={};ORDERS.filter(o=>o.status!=='Canceled').forEach(o=>{const ids=[...new Set((o.items||[]).map(i=>i.pid).filter(Boolean))].slice(0,80);
    ids.forEach(a=>{const m=co[a]||(co[a]={});ids.forEach(b=>{if(a!==b)m[b]=(m[b]||0)+1})})});
  const auto={};for(const a in co){const top=Object.entries(co[a]).filter(([,n])=>n>=2).sort((x,y)=>y[1]-x[1]).slice(0,12).map(([b])=>b);if(top.length)auto[a]=top}
  REL.auto=auto;REL.at=Date.now();DB.set('related',REL);return Object.keys(auto).length}
setTimeout(()=>{try{relCompute()}catch(e){console.warn(e)}},4000);

/* ---------- product page ---------- */
let FBT=[];
const _vProductM=window.vProduct;
window.vProduct=function(id){let h=_vProductM(id);const p=prod(id);if(!p||!h.includes('class="pd2"'))return h;
  const g=goesWith(p,14),sim=similarTo(p,16),bundle=okRel(p)?g.slice(0,2):[];FBT=[p.id,...bundle.map(x=>x.id)];
  const pr=x=>money(unitPrice(x))+(x.unit==='lb'?'/lb':'');
  const fbt=bundle.length?`<section class="fbt" aria-label="Frequently bought together"><h2>Frequently bought together</h2><div class="fbt-in">
    <div class="fbt-pics">${[p,...bundle].map((x,i)=>`${i?'<span class="fbt-plus" aria-hidden="true">+</span>':''}<a href="#/p/${x.id}" class="${tcls(x)} fbt-th" style="--h:${hue(x.dept)}" title="${esc(x.name)}">${pimg(x)}</a>`).join('')}</div>
    <div class="fbt-buy"><div class="fbt-tot">Total: <b id="fbtT"></b></div><button class="btn lime" id="fbtB" onclick="fbtAdd()">Add all to cart</button></div></div>
    <ul class="fbt-list">${[p,...bundle].map((x,i)=>`<li><label><input type="checkbox" class="fbtc" value="${x.id}" checked onchange="fbtCalc()"> ${i?'':'<b>This item:</b> '}<a href="#/p/${x.id}">${esc(x.name)}</a>${x.size?` <span class="muted">${esc(x.size)}</span>`:''} <b class="fbt-p">${pr(x)}</b></label></li>`).join('')}</ul></section>`:'';
  const rest=bundle.length&&g.length-bundle.length>=4?g.slice(bundle.length):g;
  const more=fbt+block('Goes well with','',rest,'Customers often add these with '+esc(p.name))+block('Similar items','#/dept/'+encodeURIComponent(p.dept)+'?sub='+encodeURIComponent(p.sub),sim);
  const re=/<section class="blk"><div class="blk-h"><div><h2>More in [\s\S]*?<\/section>/;
  h=re.test(h)?h.replace(re,more):h.replace(/<\/div>\s*$/,more+'</div>');
  setTimeout(fbtCalc,0);return h};
function fbtCalc(){const t=$('fbtT'),b=$('fbtB');if(!t)return;const ids=[...document.querySelectorAll('.fbtc:checked')].map(c=>c.value),sum=ids.reduce((a,id)=>a+(unitPrice(prod(id))||0),0);
  t.textContent=money(sum);b.disabled=!ids.length;b.textContent=ids.length===FBT.length?(ids.length===2?'Add both to cart':`Add all ${ids.length} to cart`):ids.length?`Add ${ids.length} to cart`:'Choose items'}
let RELQUIET=false;
function fbtAdd(){const ids=[...document.querySelectorAll('.fbtc:checked')].map(c=>c.value);if(!ids.length)return;if(!user()){addToCart(ids[0],1);return}
  RELQUIET=true;try{ids.forEach(id=>addToCart(id,1,'unit'))}finally{RELQUIET=false}toast(`Added ${ids.length} item${ids.length>1?'s':''} to your cart`)}

/* ---------- "Added to cart — goes well with this" ---------- */
const cartQ=pid=>{try{return getCart().filter(i=>i.pid===pid).reduce((a,i)=>a+(+i.qty||0),0)}catch(e){return 0}};
const _addToCartM=window.addToCart;
window.addToCart=function(pid,...a){const before=cartQ(pid),r=_addToCartM(pid,...a);
  try{if(!RELQUIET&&S.toggles?.addSuggest!==false&&!location.hash.startsWith('#/admin')&&before===0&&cartQ(pid)>0)showAdded(pid)}catch(e){console.warn(e)}return r};
let ASTIMER=null;
function showAdded(pid){const p=prod(pid);const inC=new Set(getCart().map(i=>i.pid));const g=goesWith(p,10).filter(x=>!inC.has(x.id)).slice(0,4);if(!g.length)return;
  let el=$('addsug');if(!el){el=document.createElement('div');el.id='addsug';el.setAttribute('role','dialog');el.setAttribute('aria-label','Added to cart');document.body.appendChild(el);
    el.addEventListener('mouseenter',()=>clearTimeout(ASTIMER));el.addEventListener('mouseleave',()=>{ASTIMER=setTimeout(hideAdded,6000)});el.addEventListener('focusin',()=>clearTimeout(ASTIMER))}
  el.innerHTML=`<div class="as-h"><span class="as-ok" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>Added to cart</b><span>${esc(p.name)}</span></div><button class="as-x" aria-label="Close" onclick="hideAdded()">×</button></div>
   <p class="as-t">Goes well with this</p><div class="as-g">${g.map(x=>`<div class="as-i"><a href="#/p/${x.id}" onclick="hideAdded()" class="${tcls(x)}" style="--h:${hue(x.dept)}">${pimg(x)}</a><a class="n" href="#/p/${x.id}" onclick="hideAdded()">${esc(x.name)}</a><span class="pr">${money(unitPrice(x))}${x.unit==='lb'?'/lb':''}</span><button class="btn sm lime" onclick="relAdd('${x.id}',this)">+ Add</button></div>`).join('')}</div>
   <div class="as-f"><button class="btn sm ghost" onclick="hideAdded()">Keep shopping</button><button class="btn sm" onclick="hideAdded();openDrawer()">View cart</button></div>`;
  el.classList.add('on');clearTimeout(ASTIMER);ASTIMER=setTimeout(hideAdded,12000)}
function hideAdded(){clearTimeout(ASTIMER);$('addsug')?.classList.remove('on')}
function relAdd(id,btn){RELQUIET=true;try{addToCart(id,1,'unit')}finally{RELQUIET=false}if(cartQ(id)>0){btn.textContent='✓ Added';btn.disabled=true;btn.classList.remove('lime')}clearTimeout(ASTIMER)}
const _modalM=window.modal;window.modal=function(...a){hideAdded();return _modalM(...a)};
window.addEventListener('hashchange',()=>{if(!location.hash.startsWith('#/p/'))hideAdded()});

/* ---------- Back office: Goes Well With ---------- */
(function(){const g=BO_MENU.find(x=>x[1].some(y=>y[0]==='featured'));if(g&&!g[1].some(y=>y[0]==='related')){const i=g[1].findIndex(y=>y[0]==='featured');g[1].splice(i+1,0,['related','Goes Well With'])}
  Object.values(ACCESS).forEach(a=>{if(Array.isArray(a)&&a.includes('featured')&&!a.includes('related'))a.push('related')});
  if(typeof BO_HINT==='object')BO_HINT.related='Items suggested together';})();
function relSearch(v,box,onPick){const t=v.trim().toLowerCase(),el=$(box);if(!el)return;if(t.length<2){el.innerHTML='';return}
  const hits=P.filter(p=>p.name.toLowerCase().includes(t)||p.id===t||(p.upc&&String(p.upc)===t)).sort((a,b)=>(hasPrice(b)-hasPrice(a))||(b.pop||0)-(a.pop||0)).slice(0,12);
  el.innerHTML=hits.map(p=>`<button type="button" class="relhit" onclick="${onPick}('${p.id}')"><span class="${tcls(p)}" style="--h:${hue(p.dept)}">${pimg(p)}</span><span><b>${esc(p.name)}</b><small>${esc(p.size||'')} · ${esc(p.sub)} · ${hasPrice(p)?money(unitPrice(p)):'not priced'}</small></span></button>`).join('')||'<p class="muted small">No matches.</p>'}
function relOpen(id){go('/admin/related?id='+encodeURIComponent(id))}
function relAddM(id){const cur=new URLSearchParams(location.hash.split('?')[1]||'').get('id');if(!cur||id===cur)return;const l=REL.manual[cur]=REL.manual[cur]||[];if(!l.includes(id))l.push(id);relSave(cur)}
function relDelM(cur,i){(REL.manual[cur]||[]).splice(i,1);if(!REL.manual[cur].length)delete REL.manual[cur];relSave(cur)}
function relMove(cur,i,d){const l=REL.manual[cur]||[],j=i+d;if(j<0||j>=l.length)return;[l[i],l[j]]=[l[j],l[i]];relSave(cur)}
function relSave(cur){DB.set('related',REL);try{act('Edited “goes well with” for '+(prod(cur)?.name||cur))}catch(e){}toast('Saved');route()}
BO_VIEWS.related=q=>{const id=q.get('id'),p=id&&prod(id);
  const nAuto=Object.keys(REL.auto).length,nMan=Object.keys(REL.manual).length;
  const top=`<div class="panel"><p class="muted small" style="margin-top:0">Customers see these on each product page (“Frequently bought together”, “Goes well with”, “Similar items”) and in a small window right after they add an item to the cart. Order is: items you pick here → items bought together in 2+ orders → smart pairings by category.</p>
   <div class="row" style="gap:10px"><span class="tagx">${nMan} product${nMan===1?'':'s'} with picks</span><span class="tagx">${nAuto} with bought-together data</span><span class="mini muted">Bought-together updated ${REL.at?new Date(REL.at).toLocaleString():'never'}</span><button class="btn sm ghost" onclick="const n=relCompute(true);toast('Rebuilt from '+ORDERS.length+' orders — '+n+' products');route()">Rebuild now</button>
   ${roleOf()==='admin'?`<label class="check" style="margin:0"><input type="checkbox" ${S.toggles?.addSuggest!==false?'checked':''} onchange="S.toggles={...(S.toggles||{}),addSuggest:this.checked};saveSet('Add-to-cart suggestions')"> Show after add to cart</label>`:''}</div></div>`;
  const find=`<div class="panel"><label for="relq">${p?'Switch to another product':'Find a product'}</label><input id="relq" type="search" placeholder="Type a product name, item # or UPC" oninput="relSearch(this.value,'relr','relOpen')" autocomplete="off"><div id="relr" class="relres"></div></div>`;
  if(!p){const picked=Object.keys(REL.manual).map(prod).filter(Boolean);
    return head('Goes Well With','Suggest items that go together')+top+find+(picked.length?`<div class="panel tbl-wrap"><h3>Products with picks</h3><table><tbody>${picked.map(x=>`<tr class="rowlink" onclick="relOpen('${x.id}')"><td><b>${esc(x.name)}</b><br><span class="mini muted">${esc(x.sub)}</span></td><td class="mini">${REL.manual[x.id].map(i=>esc(prod(i)?.name||i)).join(' · ')}</td></tr>`).join('')}</tbody></table></div>`:'')}
  const man=REL.manual[p.id]||[],prev=goesWith(p,12,true);
  return head('Goes Well With',esc(p.name),`<a class="btn sm ghost" href="#/p/${p.id}" target="_blank" rel="noopener">View on site</a>`)+top+`<div class="two" style="margin-top:0"><div>
   <div class="panel"><h3 style="margin-top:0">Your picks for ${esc(p.name)}</h3>${man.length?man.map((x,i)=>{const q2=prod(x);return `<div class="relrow"><span class="${tcls(q2)}" style="--h:${hue(q2?.dept)}">${q2?pimg(q2):'🛒'}</span><span style="flex:1"><b>${esc(q2?.name||x)}</b>${q2&&!okRel(q2)?' <span class="tagx red">not shown — hidden, unpriced or out of stock</span>':''}</span><button class="linkbtn" onclick="relMove('${p.id}',${i},-1)" aria-label="Move up">↑</button><button class="linkbtn" onclick="relMove('${p.id}',${i},1)" aria-label="Move down">↓</button><button class="linkbtn red" onclick="relDelM('${p.id}',${i})" aria-label="Remove">✕</button></div>`}).join(''):'<p class="muted small">No picks yet — suggestions come from purchase history and category pairings.</p>'}
   <label for="relq2" style="margin-top:12px">Add an item</label><input id="relq2" type="search" placeholder="Search products to add" oninput="relSearch(this.value,'relr2','relAddM')" autocomplete="off"><div id="relr2" class="relres"></div></div>${find}</div>
   <div class="panel"><h3 style="margin-top:0">What customers see now</h3>${prev.length?prev.map(({p:x,src})=>`<div class="relrow"><span class="${tcls(x)}" style="--h:${hue(x.dept)}">${pimg(x)}</span><span style="flex:1"><b>${esc(x.name)}</b><br><span class="mini muted">${money(unitPrice(x))} · ${src}</span></span>${src!=='Picked by the store'?`<button class="btn sm ghost" onclick="relAddM('${x.id}')">Pin</button>`:''}</div>`).join(''):'<p class="muted">Nothing to suggest yet.</p>'}</div></div>`};

/* =====================================================================
   v2.2
   ===================================================================== */

/* ---------- a "sale" that isn't lower than the regular price is not a sale ---------- */
function fixFakeSales(){P.forEach(p=>{if(p.sale!=null&&!(+p.sale>0&&+p.price>0&&+p.sale<+p.price))p.sale=null})}
fixFakeSales();

/* ---------- in stock / out of stock only — out-of-stock items leave the website ---------- */
S.stockCtl=Object.assign({},S.stockCtl,{track:false,hideOOS:true});
const _cardM=window.card;
window.card=function(p){if(p&&oosP(p)&&!isStaffU())return '';return _cardM(p)};
const _vProductOOS=window.vProduct;
window.vProduct=function(id){const p=prod(id);
  if(p&&oosP(p)&&!isStaffU()){const sim=similarTo(p,16);return `<div class="wrap"><div class="empty" style="padding:40px 0 10px"><div class="e">🛒</div><h2>${esc(p.name)} isn’t available right now</h2><p class="muted">We’ll bring it back as soon as it’s in stock.</p><a class="btn" href="#/dept/${encodeURIComponent(p.dept)}?sub=${encodeURIComponent(p.sub)}">Shop ${esc(p.sub)}</a></div>${block('Try these instead','',sim)}</div>`}
  return _vProductOOS(id)};
BO_VIEWS.stock=(f=>q=>{const show=q.get('show')||'';const nO=P.filter(oosP).length;
  const tabs=`<div class="schips">${[['','All items',P.length],['oos','Out of stock',nO],['in','In stock',P.length-nO]].map(([k,l,n])=>`<a class="${k===show?'on':''}" href="javascript:hashSet('show','${k}')">${l} <b>${n.toLocaleString()}</b></a>`).join('')}</div>`;
  if(show==='oos')return f(q).replace(/<div class="schips">[\s\S]*?<\/div>/,'')
    .replace('<div class="bo-head">',`<div class="sewarn" style="margin-bottom:12px">Out-of-stock items are hidden from the website. Check the box (or “Back in stock”) to put an item back on the site.</div><div class="bo-head">`).replace(/(<\/div><\/div>)/,'$1'+tabs);
  let list=pfilter(q);if(show==='in')list=list.filter(p=>!oosP(p));
  return head('Stock Control','Each item is either in stock or out of stock — no counts. Out-of-stock items disappear from the website until you put them back.',`<a class="btn sm" href="javascript:hashSet('show','oos')">See out-of-stock items (${nO})</a>`)+pbar(q)+tabs+
   prodTable(list,[['On the website',p=>`<label class="check" style="margin:0"><input type="checkbox" ${oosP(p)?'':'checked'} onchange="stOos2('${p.id}',!this.checked)"> ${oosP(p)?'<span class="tagx red">Out of stock — hidden</span>':'In stock'}</label>`]],{page:+q.get('page')||1})})(BO_VIEWS.stock);
function stOos2(id,out){const p=prod(id);p.oos=out||undefined;p.stock=null;if(out){p.oosBy=me;p.oosAt=Date.now()}else{delete p.oosBy;delete p.oosAt}
  act(`${p.name} ${out?'out of stock (hidden from site)':'back in stock'}`,id);saveAll();toast(out?'Out of stock — hidden from the website':'Back in stock — showing on the website');route()}

/* ---------- barcodes: real UPC/EAN when we have it, otherwise a store barcode ---------- */
const EAN_L=['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
const EAN_G=['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
const EAN_R=EAN_L.map(s=>[...s].map(c=>c==='1'?'0':'1').join(''));
const EAN_P=['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];
const eanCheck=d=>{let s=0;[...d].forEach((c,i)=>s+=(+c)*((d.length-i)%2?3:1));return String((10-s%10)%10)};
function storeCode(id){id=String(id);let body;if(/^c\d+$/.test(id))body='2'+id.slice(1).padStart(11,'0').slice(-11);
  else{let h=2166136261;for(const c of id){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}body='29'+String(h%1e10).padStart(10,'0')}
  return body+eanCheck(body)}
function barcodeOf(p){if(!p)return '';const u=String(p.upc||'').replace(/\D/g,'');if(u.length>=6)return u;return storeCode(p.id)}
const isStoreCode=p=>!String(p?.upc||'').replace(/\D/g,'');
function barSVG(code,h=56){code=String(code||'').replace(/\D/g,'');let bits='',txt=code;
  if(code.length===12)code='0'+code;
  if(code.length===13&&eanCheck(code.slice(0,12))===code[12]){const par=EAN_P[+code[0]];bits='101';for(let i=1;i<=6;i++)bits+=(par[i-1]==='L'?EAN_L:EAN_G)[+code[i]];bits+='01010';for(let i=7;i<=12;i++)bits+=EAN_R[+code[i]];bits+='101'}
  else if(code.length===8&&eanCheck(code.slice(0,7))===code[7]){bits='101';for(let i=0;i<4;i++)bits+=EAN_L[+code[i]];bits+='01010';for(let i=4;i<8;i++)bits+=EAN_R[+code[i]];bits+='101'}
  else return `<span class="bc-txt">${esc(txt)}</span>`;
  const q=9,w=bits.length+q*2;let r='';for(let i=0;i<bits.length;i++)if(bits[i]==='1'){let j=i;while(bits[j+1]==='1')j++;r+=`<rect x="${q+i}" y="0" width="${j-i+1}" height="${h}"/>`;i=j}
  return `<svg class="bc" viewBox="0 0 ${w} ${h+12}" role="img" aria-label="Barcode ${esc(txt)}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h+12}" fill="#fff"/><g fill="#000">${r}</g><text x="${w/2}" y="${h+10}" font-size="10" text-anchor="middle" font-family="monospace" fill="#000">${esc(txt)}</text></svg>`}
function bcBlock(p){return `<div class="bcbox">${barSVG(barcodeOf(p))}<div class="mini muted">${isStoreCode(p)?'Store barcode (no UPC on file yet)':'UPC'} · <a href="javascript:printBarcodes(['${p.id}'])">Print label</a></div></div>`}
function printBarcodes(ids){const ps=ids.map(prod).filter(Boolean).slice(0,600);
  printHTML(`<style>.lblg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.lbl{border:1px dashed #bbb;padding:8px;break-inside:avoid;text-align:center;font-size:11px}.lbl b{display:block;font-size:12px;margin-bottom:4px}.lbl svg{width:100%;height:auto;max-height:80px}</style><div class="lblg">${ps.map(p=>`<div class="lbl"><b>${esc(p.name)}</b>${esc(p.size||'')}${hasPrice(p)?' · '+money(unitPrice(p))+(p.unit==='lb'?'/lb':''):''}${barSVG(barcodeOf(p))}</div>`).join('')}</div>`)}
window.barcodeOf=barcodeOf;
/* product editor */
const _editPM=window.editP;
window.editP=function(id){const r=_editPM.apply(this,arguments);try{const u=$('e_upc');if(u){const p=id?prod(id):null;const box=document.createElement('div');box.id='e_bc';u.parentElement.appendChild(box);
  const draw=()=>{const tmp={id:p?.id||'new',upc:u.value};box.innerHTML=barSVG(barcodeOf(tmp))+`<div class="mini muted">${u.value.replace(/\D/g,'')?'Barcode from the UPC above':(p?'No UPC — this store barcode is used':'A store barcode is made when you save')}</div>`};
  u.addEventListener('input',draw);draw()}}catch(e){console.warn(e)}return r};
/* staff see the barcode on the product page */
const _vProductBC=window.vProduct;
window.vProduct=function(id){let h=_vProductBC(id);const p=prod(id);if(p&&isStaffU()&&h.includes('<div class="meta">'))h=h.replace(/(<div class="meta">[\s\S]*?<\/div>)/,'$1'+bcBlock(p));return h};
/* Check Products: print barcodes for what's on screen */
if(BO_VIEWS.check)BO_VIEWS.check=(f=>q=>{const h=f(q);return h.replace('<div class="bo-head">',`<div class="row" style="justify-content:flex-end;margin-bottom:6px"><button class="btn sm ghost" onclick="printBarcodes(pfilter(new URLSearchParams(location.hash.split('?')[1]||'')).map(p=>p.id))">Print barcode labels (up to 600)</button></div><div class="bo-head">`)})(BO_VIEWS.check);

/* ---------- picking: scan a barcode to mark the item picked ---------- */
const _pickViewM=window.pickView;
window.pickView=function(id,standalone){let h=_pickViewM(id,standalone);const o=findO(id);if(!o)return h;
  const lock=['Processed','Charged','Canceled'].includes(o.status);
  const scan=lock?'':`<div class="panel scanbox"><label for="pkscan" style="margin:0">Scan an item</label><input id="pkscan" inputmode="numeric" autocomplete="off" placeholder="Scan or type a barcode, then Enter" onkeydown="if(event.key==='Enter'){event.preventDefault();pkScan('${o.id}',this.value);this.value=''}"><span id="pkscanmsg" class="mini muted"></span></div>`;
  h=h.replace(/(<div class="bo-head">[\s\S]*?<\/div><\/div>(?:<div class="row">[\s\S]*?<\/div>)?<\/div>)/,'$1'+scan);if(!h.includes('id="pkscan"'))h=scan+h;
  return h+(canDelOrder()?delPanel(o):'')};
function pkScan(id,code){code=String(code||'').replace(/\D/g,'');const o=findO(id),m=$('pkscanmsg');if(!o||!code)return;
  const norm=c=>c.replace(/^0+/,'');const i=o.items.findIndex(it=>{const p=prod(it.pid);return p&&norm(barcodeOf(p))===norm(code)&&(it.pick?.status!=='picked')});
  const j=i<0?o.items.findIndex(it=>{const p=prod(it.pid);return p&&norm(barcodeOf(p))===norm(code)}):i;
  if(j<0){toast('That barcode isn’t in this order');if(m)m.textContent='Not in this order: '+code;return}
  if(i<0){toast('Already picked: '+o.items[j].name);return}
  pkMark(id,i,'picked');toast('✓ Picked: '+o.items[i].name)}

/* ---------- delete an order (password protected) ---------- */
const DEL_ROLES=['admin','store_manager','chain_manager','manager','personal_shopper','personal_shopper_manager'];
const canDelOrder=()=>{try{return isStaffU()&&DEL_ROLES.includes(realRole())}catch(e){return false}};
let DELO=[];
function purgeDeleted(){const L=ORDERS;for(let i=L.length-1;i>=0;i--){const o=L[i];if(o&&o.deleted&&CF.canon(o)===CF.snap.orders[o.id]){if(!DELO.some(x=>x.id===o.id))DELO.unshift(o);L.splice(i,1)}}}
purgeDeleted();
async function pbkdf(pw,salt,iter){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']);
  const b=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:iter,hash:'SHA-256'},k,256);return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const delPwSet=()=>!!CF.cache.secrets?.orderDelete?.hash;
function delPanel(o){return `<div class="panel dangerz"><h3 style="margin-top:0">Delete this order</h3><p class="muted small">Removes order #${o.id} from every list. Needs the delete password. An admin can bring it back from Deleted Orders.</p><button class="btn sm red" onclick="orderDel('${o.id}')">Delete order #${o.id}</button></div>`}
function orderDel(id){const o=findO(id);if(!o)return;
  if(!delPwSet()){modal(`<h2>No delete password yet</h2><p class="muted">An admin needs to set it first in Back Office → Settings → Delete Password.</p><button class="btn" onclick="closeModal()">OK</button>`);return}
  modal(`<h2>Delete order #${esc(o.id)}?</h2><p class="muted">${esc(o.name||'')} · ${money(o.final||o.total||0)} · ${esc(o.status)}</p>
   <label for="odr">Reason (optional)</label><input id="odr" placeholder="e.g. Duplicate order, test order">
   <label for="odp">Delete password</label><input id="odp" type="password" autocomplete="off" onkeydown="if(event.key==='Enter')orderDelGo('${o.id}')"><p class="err" id="oderr"></p>
   <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn red" id="odgo" onclick="orderDelGo('${o.id}')">Delete order</button></div>`);setTimeout(()=>$('odp')?.focus(),50)}
async function orderDelGo(id){const err=$('oderr'),btn=$('odgo');const lockUntil=+(sessionStorage.getItem('cf_dellock')||0);
  if(Date.now()<lockUntil){err.textContent='Too many wrong tries. Wait a few minutes.';return}
  const sec=CF.cache.secrets?.orderDelete;btn.disabled=true;
  try{const h=await pbkdf($('odp').value,sec.salt,sec.iter||150000);
    if(h!==sec.hash){const n=+(sessionStorage.getItem('cf_delfail')||0)+1;sessionStorage.setItem('cf_delfail',n);if(n>=5){sessionStorage.setItem('cf_dellock',Date.now()+5*60e3);sessionStorage.setItem('cf_delfail',0)}err.textContent='Wrong password';btn.disabled=false;return}
    sessionStorage.setItem('cf_delfail',0);
    const o=findO(id);o.prevStatus=o.status;o.status='Canceled';o.deleted=true;o.deletedBy=me;o.deletedAt=Date.now();o.deleteReason=$('odr').value.trim();
    (o.log=o.log||[]).push({t:Date.now(),m:'Order deleted'+(o.deleteReason?': '+o.deleteReason:''),by:me});act(`Deleted order #${id}`+(o.deleteReason?' — '+o.deleteReason:''),id);
    saveAll();await CF.flushNow();closeModal();toast(`Order #${id} deleted`);purgeDeleted();
    go(can('orders')?'/admin/orders':'/admin/shopper')}catch(e){console.error(e);err.textContent='Couldn’t delete — check your connection and try again.';btn.disabled=false}}
BO_VIEWS.order=(f=>(q,rest)=>{const h=f(q,rest),o=findO(rest[0]);return o&&canDelOrder()?h+delPanel(o):h})(BO_VIEWS.order);
BO_VIEWS.orders=(f=>q=>{const h=f(q);return roleOf()==='admin'&&DELO.length?h.replace('<div class="bo-head">',`<div class="row" style="justify-content:flex-end;margin-bottom:6px"><a class="btn sm ghost" href="#/admin/deleted">Deleted orders (${DELO.length})</a></div><div class="bo-head">`):h})(BO_VIEWS.orders);
BO_VIEWS.deleted=q=>roleOf()!=='admin'?head('Deleted orders')+'<p class="muted">Only admins can see deleted orders.</p>':head('Deleted orders','Orders removed with the delete password. Restore puts an order back where it was.')+
  `<div class="panel tbl-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Deleted</th><th>Reason</th><th></th></tr></thead><tbody>${DELO.map(o=>`<tr><td><b>#${esc(o.id)}</b><br><span class="mini muted">${prettyDate(o.date||'')} ${esc(o.slot||'')}</span></td><td>${esc(o.name||'')}<br><span class="mini muted">${esc(o.email||'')}</span></td><td>${money(o.final||o.total||0)}</td><td class="mini">${fmtT(o.deletedAt)}<br>${esc(uname(o.deletedBy))}</td><td class="mini">${esc(o.deleteReason||'—')}</td><td><button class="btn sm ghost" onclick="orderRestore('${o.id}')">Restore</button></td></tr>`).join('')||'<tr><td colspan="6" class="muted">No deleted orders.</td></tr>'}</tbody></table></div>`;
function orderRestore(id){const i=DELO.findIndex(x=>x.id===id);if(i<0)return;const o=DELO[i];o.deleted=false;o.status=o.prevStatus||'Received';(o.log=o.log||[]).push({t:Date.now(),m:'Order restored',by:me});act(`Restored order #${id}`,id);
  DELO.splice(i,1);ORDERS.push(o);saveAll();toast(`Order #${id} restored`);route()}
/* settings: delete password */
SET_SECTIONS.push(['security','Delete Password']);
BO_VIEWS.settings=(f=>q=>{let h=f(q);if((q.get('s')||'')!=='security'||roleOf()!=='admin')return h;
  return h.replace(/<h2>Delete Password<\/h2>[\s\S]*$/,`<h2>Delete Password</h2><div class="panel" style="max-width:560px"><p class="muted small" style="margin-top:0">Admins, store managers, personal shoppers and personal shopper managers can delete an order after typing this password. Deleted orders can be restored by an admin.</p>
   <p><b>Status:</b> ${delPwSet()?'A password is set'+(CF.cache.secrets.orderDelete.at?' (changed '+fmtT(CF.cache.secrets.orderDelete.at)+')':''):'<span class="err">Not set — nobody can delete orders yet</span>'}</p>
   <label for="dp1">New password</label><input id="dp1" type="password" autocomplete="new-password"><label for="dp2">Type it again</label><input id="dp2" type="password" autocomplete="new-password"><p class="err" id="dperr"></p>
   <button class="btn" onclick="setDelPw()">${delPwSet()?'Change password':'Set password'}</button></div>`)})(BO_VIEWS.settings);
async function setDelPw(){const a=$('dp1').value,b=$('dp2').value,e=$('dperr');if(a.length<6){e.textContent='Use at least 6 characters';return}if(a!==b){e.textContent='The two passwords don’t match';return}
  const salt=[...crypto.getRandomValues(new Uint8Array(16))].map(x=>x.toString(16).padStart(2,'0')).join(''),iter=150000,hash=await pbkdf(a,salt,iter);
  const s=Object.assign({},CF.cache.secrets||{});s.orderDelete={salt,iter,hash,at:Date.now(),by:me};DB.set('secrets',s);act('Changed the order delete password');toast('Delete password saved');route()}

/* ---------- keep your place: no jump to the top on re-render, Back returns to where you were ---------- */
let LASTH=location.hash,NAVCLICK=false;const SCR={};
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('a[href^="#"]'))NAVCLICK=true},true);
let scT=0;window.addEventListener('scroll',()=>{clearTimeout(scT);const h=location.hash;scT=setTimeout(()=>{if(location.hash===h)SCR[h]=window.scrollY},80)},{passive:true});
const _routeKeep=window.route;
window.route=function(){purgeDeleted();const h=location.hash,same=h===LASTH,y=window.scrollY,sel='.bo-body,.tbl-wrap,.cart-b,.sc-b,.carousel',inner=[...document.querySelectorAll(sel)].map(e=>e.scrollTop),innerX=[...document.querySelectorAll('.carousel')].map(e=>e.scrollLeft);
  const r=_routeKeep.apply(this,arguments);
  if(same){window.scrollTo({top:y,behavior:'instant'});const now=[...document.querySelectorAll(sel)];if(now.length===inner.length)now.forEach((e,i)=>{if(inner[i])e.scrollTop=inner[i]});const cx=[...document.querySelectorAll('.carousel')];if(cx.length===innerX.length)cx.forEach((e,i)=>{if(innerX[i])e.scrollLeft=innerX[i]})}
  else if(!NAVCLICK&&SCR[h]){const t=SCR[h];requestAnimationFrame(()=>{window.scrollTo({top:t,behavior:'instant'});setTimeout(()=>window.scrollTo({top:t,behavior:'instant'}),120)})}
  LASTH=h;NAVCLICK=false;
  const sc=$('pkscan');if(sc&&!(document.activeElement&&/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))&&!document.querySelector('#mbox.on, .modal.on'))sc.focus({preventScroll:true});
  return r};

