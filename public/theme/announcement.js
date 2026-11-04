(()=>{
    const bar = document.getElementById('announce');
    if(!bar) return;
    const key = bar.dataset.key;
    const closeBtn = bar.querySelector('.v-ann__close');
    const textEl = bar.querySelector('.v-ann__text');
    const shipEl = bar.querySelector('[data-ship]');
    const threshold = 25;
    const currency = "€";
    // Restore dismissed state
    const dismissed = localStorage.getItem(key)==='1';
    if(!dismissed) bar.hidden = false;
    // Marquee duplicate text trick
    if (textEl?.dataset.marquee === 'true'){
      textEl.setAttribute('data-full', textEl.textContent.trim());
    }
    // Close
    closeBtn?.addEventListener('click', ()=>{
      bar.hidden = true;
      try{ localStorage.setItem(key,'1'); }catch{}
    });
    // Free-shipping progress message
    async function refreshShip(){
      if(!shipEl || !threshold) return;
      try{
        const r = await fetch('/cart.js', {headers:{'Accept':'application/json'}});
        const cart = await r.json();
        const total = (cart.total_price || 0) / 100;
        if (total >= threshold){
          shipEl.textContent = "You unlocked free shipping!";
          shipEl.style.color = '#9BEF9B';
        } else {
          const left = Math.max(0, threshold - total).toFixed(2);
          shipEl.textContent = "Spend %AMOUNT% more for free shipping".replace('%AMOUNT%', currency + left);
        }
      }catch{
        shipEl.textContent = "Free shipping threshold available";
      }
    }
    refreshShip();
    // Listen for your cart drawer refresh events if you dispatch them elsewhere
    document.addEventListener('cart:updated', refreshShip);
    document.addEventListener('cart:added', refreshShip);
  })();
