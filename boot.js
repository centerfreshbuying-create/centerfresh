/* Loads the data first, then the app scripts in order. */
window.CF_CONFIG={
  url:'https://vqwhjyoosfiyfzcjzyxn.supabase.co',
  key:'sb_publishable_BrKIQH_gWzIlKPriXQD_zA_WpkJ63S9',   // public key — safe to ship; row security protects the data
  ownerEmail:'centerfreshbuying@gmail.com',
  version:'2.2.1'
};
(async function(){
  const v='?v='+window.CF_CONFIG.version;
  const load=src=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src+v;s.onload=res;s.onerror=()=>rej(new Error('Could not load '+src));document.body.appendChild(s)});
  const fail=msg=>{document.getElementById('cfboot').innerHTML=`<div class="cfb-card"><b>We couldn’t open the store right now.</b><p>${msg}</p><button onclick="location.reload()">Try again</button></div>`};
  try{
    await load('cf-data.js');
    await window.CF.load();
    // Center Fresh doesn't carry the other store's private-label line
    window.CATALOG=(window.CATALOG||[]).filter(r=>!/^nutmeg/i.test(r[1]));
    for(const f of ['app.js','backoffice.js','cf-store.js','cf-bo.js','cf-more.js'])await load(f);
    document.dispatchEvent(new Event('DOMContentLoaded'));
    document.getElementById('cfboot').classList.add('done');
    setTimeout(()=>document.getElementById('cfboot')?.remove(),400);
  }catch(e){console.error(e);fail(navigator.onLine?'Please check your connection and try again.':'You seem to be offline.')}
})();
