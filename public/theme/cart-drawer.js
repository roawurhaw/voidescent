(() => {
    const drawer = document.getElementById('VoideCartDrawer');
    if (!drawer || drawer.dataset.mounted === '1') return;
    drawer.dataset.mounted = '1';
    const I18N = {
      unlocked: "You've unlocked \u003cstrong\u003eFree Shipping!\u003c\/strong\u003e",
      spend: "Spend \u003cstrong\u003e%AMOUNT%\u003c\/strong\u003e more for Free Shipping",
      emptyTitle: "Your cart is empty",
      emptyText: "Add your favourite Voidescent scent and let the atmosphere begin.",
      shopNow: "Shop now",
      shopUrl: "\/collections\/scents",
      remove: "Remove",
      quantity: "Quantity",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      unavailable: "Cart unavailable",
      refresh: "Please refresh the page and try again.",
      add: "Add",
      bundleMore: ["Add 1 more scent and pay \u003cstrong\u003e%PRICE%\u003c\/strong\u003e per bottle","Add 2 more scents and pay \u003cstrong\u003e%PRICE%\u003c\/strong\u003e per bottle","Add 3 more scents and pay \u003cstrong\u003e%PRICE%\u003c\/strong\u003e per bottle"],
      bundleOn: "Bundle price unlocked: \u003cstrong\u003e%PRICE%\u003c\/strong\u003e per bottle",
      addScent: "Add %TITLE%"
    };
    const body        = drawer.querySelector('[data-cart-body]');
    const footer      = drawer.querySelector('[data-cart-footer]');
    const subtotalEl  = drawer.querySelector('[data-cart-subtotal]');
    const closeEls    = drawer.querySelectorAll('[data-cart-close]');
    const shippingContainer = drawer.querySelector('[data-shipping-container]');
    const shippingMessage   = drawer.querySelector('[data-shipping-message]');
    const shippingFill      = drawer.querySelector('[data-shipping-fill]');
    const bundleNudge       = drawer.querySelector('[data-bundle-nudge]');
    const bundleText        = drawer.querySelector('[data-bundle-text]');
    const bundleChips       = drawer.querySelector('[data-bundle-chips]');
    let BUNDLE = null;
    try { BUNDLE = JSON.parse(drawer.querySelector('[data-bundle-data]').textContent); } catch (e) { BUNDLE = null; }
    let moneyFormat = "€{{amount_with_comma_separator}}";
    if (!moneyFormat) moneyFormat = '€';
    /* ── Money formatter ──────────────────────────────────────────────────── */
    function formatMoney(cents) {
      if (typeof cents === 'string') cents = cents.replace('.', '');
      const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      const formatString = moneyFormat;
      function delimited(number, precision, thousands, decimal) {
        precision = precision !== undefined ? precision : 2;
        thousands = thousands || ',';
        decimal   = decimal   || '.';
        if (isNaN(number) || number == null) return 0;
        number = (number / 100.0).toFixed(precision);
        const parts   = number.split('.');
        const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        const centsStr = parts[1] ? (decimal + parts[1]) : '';
        return dollars + centsStr;
      }
      let value = '';
      switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':                            value = delimited(cents, 2);        break;
        case 'amount_no_decimals':                value = delimited(cents, 0);        break;
        case 'amount_with_comma_separator':       value = delimited(cents, 2, '.', ','); break;
        case 'amount_no_decimals_with_comma_separator': value = delimited(cents, 0, '.', ','); break;
        default:                                  value = delimited(cents, 2);
      }
      return formatString.replace(placeholderRegex, value);
    }
    /* ── Shipping bar ─────────────────────────────────────────────────────── */
    function updateShippingBar(totalPrice) {
    if (!shippingContainer) return;
    if (totalPrice === 0) { shippingContainer.hidden = true; return; }
    const currentCountry = shippingContainer.getAttribute('data-country') || 'NL';
    const thresholdMap = {
      'NL': 25,
      'BE': 40,
      'DE': 35,
      'FR': 40,
    };
    const thresholdVal = thresholdMap[currentCountry]; 
    if (!thresholdVal) {
      shippingContainer.hidden = true;
      return;
    }
    const thresholdCents = thresholdVal * 100;
    shippingContainer.hidden = false;
    if (totalPrice >= thresholdCents) {
      shippingMessage.innerHTML = I18N.unlocked;
      shippingFill.style.width = '100%';
    } else {
      const remaining = thresholdCents - totalPrice;
      shippingMessage.innerHTML = I18N.spend.replace('%AMOUNT%', formatMoney(remaining));
      shippingFill.style.width = `${Math.min((totalPrice / thresholdCents) * 100, 100)}%`;
    }
  }
    /* ── Open / close ─────────────────────────────────────────────────────── */
    function openCart() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('voide-cart-open');
      refreshCart();
    }
    function closeCart() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('voide-cart-open');
    }
    /* ── API helpers ──────────────────────────────────────────────────────── */
    async function getCart() {
      const res = await fetch('/cart.js', { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error('Could not load cart');
      return res.json();
    }
    async function changeItem(key, quantity) {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });
      if (!res.ok) throw new Error('Could not update cart');
      return res.json();
    }
    /* ── XSS helper ───────────────────────────────────────────────────────── */
    function esc(value) {
      return String(value || '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }
    /* ── Render helpers ───────────────────────────────────────────────────── */
    function renderEmpty() {
      body.innerHTML = `
        <div class="voide-cart__empty">
          <div>
            <h3>${esc(I18N.emptyTitle)}</h3>
            <p>${esc(I18N.emptyText)}</p>
            <a href="${esc(I18N.shopUrl)}">${esc(I18N.shopNow)}</a>
          </div>
        </div>
      `;
      footer.hidden = true;
      if (shippingContainer) shippingContainer.hidden = true;
      if (bundleNudge) bundleNudge.hidden = true;
    }
    /* ── Bundle tip: any 3 scents get the bundle price via the automatic discount ── */
    function updateBundleNudge(cart) {
      if (!bundleNudge || !BUNDLE || !BUNDLE.scents || !BUNDLE.scents.length) return;
      const ids = new Set(BUNDLE.scents.map(s => s.id));
      const n = (cart && cart.items ? cart.items : []).reduce((a, i) => a + (ids.has(i.variant_id) ? i.quantity : 0), 0);
      if (!n) { bundleNudge.hidden = true; return; }
      const unit = formatMoney(Math.max(0, BUNDLE.scents[0].price - BUNDLE.off));
      if (n >= BUNDLE.size) {
        bundleText.innerHTML = I18N.bundleOn.replace('%PRICE%', esc(unit));
        bundleChips.innerHTML = '';
        bundleNudge.classList.add('is-on');
      } else {
        const left = BUNDLE.size - n;
        bundleText.innerHTML = (I18N.bundleMore[left - 1] || '').replace('%PRICE%', esc(unit));
        bundleChips.innerHTML = BUNDLE.scents.filter(s => s.available).map(s => {
          const img = s.img ? `<img src="${esc(s.img)}" alt="" loading="lazy">` : '';
          return `<button type="button" class="voide-cart__chip" data-add-scent="${esc(s.id)}" aria-label="${esc(I18N.addScent.replace('%TITLE%', s.title))}">${img}<span>+ ${esc(s.title)}</span></button>`;
        }).join('');
        bundleNudge.classList.remove('is-on');
      }
      bundleNudge.hidden = false;
    }
    /*
     * buildItemPriceHtml — renders per-line pricing with discount awareness.
     *
     * When a line item has a discount applied:
     *   - original_line_price  = full price before discounts
     *   - final_line_price     = price after discounts
     * We show the original struck-through and the final in accent colour,
     * plus a badge for each discount applied.
     */
    function buildItemPriceHtml(item) {
      const isDiscounted = item.original_line_price !== item.final_line_price;
      let html = '<div class="voide-cart__price">';
      if (isDiscounted) {
        html += `<span class="voide-cart__price-original">${formatMoney(item.original_line_price)}</span>`;
        html += `<span class="voide-cart__price-final">${formatMoney(item.final_line_price)}</span>`;
      } else {
        html += `<span class="voide-cart__price-regular">${formatMoney(item.original_line_price)}</span>`;
      }
      html += '</div>';
      // Discount badges
      if (isDiscounted && item.line_level_discount_allocations && item.line_level_discount_allocations.length) {
        html += '<div class="voide-cart__discount-tags">';
        item.line_level_discount_allocations.forEach(d => {
          html += `<span class="voide-cart__discount-tag">✓ ${esc(d.discount_application.title)} −${formatMoney(d.amount)}</span>`;
        });
        html += '</div>';
      }
      return html;
    }
    function renderCart(cart) {
      if (!cart || !cart.items || cart.items.length === 0) {
        renderEmpty();
        return;
      }
      footer.hidden = false;
      updateShippingBar(cart.total_price);
      updateBundleNudge(cart);
      // Cart subtotal — with optional overall order discount strikethrough
      if (cart.total_discount > 0) {
        subtotalEl.innerHTML = `
          <s style="color:var(--vc-muted);font-size:13px;margin-right:6px;font-weight:600;">${formatMoney(cart.original_total_price)}</s>
          <span style="color:var(--vc-accent)">${formatMoney(cart.total_price)}</span>
        `;
      } else {
        subtotalEl.textContent = formatMoney(cart.total_price);
      }
      // Item list
      body.innerHTML = cart.items.map(item => {
        const image = item.image
          ? `<img src="${esc(item.image)}" alt="${esc(item.product_title)}" loading="lazy">`
          : `<div class="voide-cart__image-placeholder"></div>`;
        const variantHtml = (item.variant_title && item.variant_title !== 'Default Title')
          ? `<p class="voide-cart__variant">${esc(item.variant_title)}</p>`
          : '';
        return `
          <article class="voide-cart__item" data-cart-item="${esc(item.key)}">
            <a class="voide-cart__image" href="${esc(item.url)}" tabindex="-1" aria-hidden="true">
              ${image}
            </a>
            <div class="voide-cart__info">
              <h3 class="voide-cart__product-title">
                <a href="${esc(item.url)}" style="color:inherit;text-decoration:none;">${esc(item.product_title)}</a>
              </h3>
              ${variantHtml}
              ${buildItemPriceHtml(item)}
              <div class="voide-cart__controls">
                <div class="voide-cart__qty" aria-label="${esc(I18N.quantity)}">
                  <button type="button" data-cart-qty-minus aria-label="${esc(I18N.decrease)}">−</button>
                  <span>${item.quantity}</span>
                  <button type="button" data-cart-qty-plus aria-label="${esc(I18N.increase)}">+</button>
                </div>
                <button type="button" class="voide-cart__remove" data-cart-remove>${esc(I18N.remove)}</button>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }
    /* ── Cart refresh ─────────────────────────────────────────────────────── */
    async function refreshCart() {
      try {
        const cart = await getCart();
        renderCart(cart);
        updateCartBubbles(cart.item_count);
      } catch {
        body.innerHTML = `
          <div class="voide-cart__empty">
            <div>
              <h3>${esc(I18N.unavailable)}</h3>
              <p>${esc(I18N.refresh)}</p>
            </div>
          </div>
        `;
      }
    }
    function updateCartBubbles(count) {
      ['[data-cart-count]', '.cart-count-bubble span:first-child', '.cart-count', '#CartCount']
        .forEach(sel => document.querySelectorAll(sel).forEach(el => { el.textContent = count; }));
    }
    /* ── Event wiring ─────────────────────────────────────────────────────── */
    // Close buttons & overlay
    closeEls.forEach(el => el.addEventListener('click', closeCart));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
    });
    // Qty / remove delegation
    drawer.addEventListener('click', async e => {
      const itemEl = e.target.closest('[data-cart-item]');
      if (!itemEl) return;
      const key        = itemEl.getAttribute('data-cart-item');
      const qtySpan    = itemEl.querySelector('.voide-cart__qty span');
      const currentQty = Number(qtySpan ? qtySpan.textContent : 1);
      try {
        if (e.target.closest('[data-cart-qty-minus]')) {
          await changeItem(key, Math.max(0, currentQty - 1));
          await refreshCart();
        } else if (e.target.closest('[data-cart-qty-plus]')) {
          await changeItem(key, currentQty + 1);
          await refreshCart();
        } else if (e.target.closest('[data-cart-remove]')) {
          await changeItem(key, 0);
          await refreshCart();
        }
      } catch {
        await refreshCart();
      }
    });
    // Buying is switched off on this copy: the bundle-tip and checkout buttons do nothing.
    // Custom events
    document.addEventListener('cart:open',    openCart);
    document.addEventListener('cart:refresh', refreshCart);
    // Intercept any cart link / [data-cart-open] click
    document.addEventListener('click', e => {
      const trigger = e.target.closest(
        'a[href="/cart"], a[href="/cart/"], a[href="/cart"], [data-cart-open], .js-cart-drawer-open'
      );
      if (!trigger) return;
      if (trigger.closest('#VoideCartDrawer')) return; // ignore "View cart" link inside the drawer
      e.preventDefault();
      openCart();
    });
  })();
