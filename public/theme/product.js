(function () {
  var root = document.getElementById('voide-pdp');
  if (!root || root.dataset.ready === '1') return;
  root.dataset.ready = '1';
  var CFG = {
    size: 3,
    sizes: { bundle: 3, six: 6 },
    free: 3,
    off: 566,
    pack: root.dataset.defaultPack || 'single',
    single: { id: Number(root.dataset.variantId), price: Number(root.dataset.price), available: true },
    moneyFormat: "€{{amount_with_comma_separator}}",
    locale: "en",
    country: "NL",
    deliveryDays: "NL:2-3,BE:2-4,DE:3-5,FR:3-6,*:4-8"
  };
  var T = {
    addToCart: "Add to Cart",
    addBundle: "Add bundle to cart",
    soldOut: "Sold Out",
    complete: "Box complete ✓",
    pickMore: ["Pick 1 more scent","Pick 2 more scents","Pick 3 more scents","Pick 4 more scents","Pick 5 more scents","Pick 6 more scents"],
    eta: "Estimated delivery: %DATES%",
    singleTitle: "1 bottle",
    bundleTitle: "3 bottles · pick your scents",
    sixTitle: "6 bottles · pick your scents"
  };
  function formatMoney(cents) {
    var fmt = CFG.moneyFormat || '';
    var m = fmt ? fmt.match(/\{\{\s*(\w+)\s*\}\}/) : null;
    function d(n, p, t, s) {
      n = (n / 100).toFixed(p);
      var parts = n.split('.');
      return parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + t) + (parts[1] ? s + parts[1] : '');
    }
    var v;
    switch (m ? m[1] : 'amount') {
      case 'amount_no_decimals': v = d(cents, 0, ',', '.'); break;
      case 'amount_with_comma_separator': v = d(cents, 2, '.', ','); break;
      case 'amount_no_decimals_with_comma_separator': v = d(cents, 0, '.', ','); break;
      default: v = d(cents, 2, ',', '.');
    }
    return m ? fmt.replace(m[0], v) : '€' + v;
  }
  /* ── Gallery ── */
  var track = document.getElementById('voide-track');
  var dots = root.querySelectorAll('.gallery__dot');
  var thumbs = root.querySelectorAll('.gallery__thumb');
  function setActive(i) {
    dots.forEach(function (el, k) { el.classList.toggle('is-active', k === i); });
    thumbs.forEach(function (el, k) { el.classList.toggle('active', k === i); });
  }
  if (track) {
    var raf = null;
    track.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var w = track.clientWidth || 1;
        setActive(Math.round(track.scrollLeft / w));
      });
    }, { passive: true });
    thumbs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.dataset.index, 10) || 0;
        track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
        setActive(i);
      });
    });
  }
  /* ── Packs + picker ── */
  var picker = document.getElementById('voide-picker');
  var rows = picker ? Array.prototype.slice.call(picker.querySelectorAll('.pk')) : [];
  var slots = picker ? picker.querySelectorAll('.slot') : [];
  var statusEl = picker ? picker.querySelector('[data-status]') : null;
  var bundleTotalEl = root.querySelector('[data-bundle-total]');
  var bundleCompareEl = root.querySelector('[data-bundle-compare]');
  var sixTotalEl = root.querySelector('[data-six-total]');
  var sixCompareEl = root.querySelector('[data-six-compare]');
  var packEls = root.querySelectorAll('.pack');
  var atc = document.getElementById('voide-atc');
  var atcLabel = atc ? atc.querySelector('[data-atc-label]') : null;
  var sticky = document.getElementById('voide-sticky-atc');
  var satcBtn = document.getElementById('voide-satc-btn');
  var satcLabel = satcBtn ? satcBtn.querySelector('[data-satc-label]') : null;
  var satcSub = sticky ? sticky.querySelector('[data-satc-sub]') : null;
  var qty = rows.map(function () { return 0; });
  function count() { return qty.reduce(function (a, b) { return a + b; }, 0); }
  function sumPrice() { return rows.reduce(function (a, r, i) { return a + qty[i] * (parseInt(r.dataset.price, 10) || 0); }, 0); }
  function bundlePrice() {
    if (CFG.pack === 'six') {
      var prices = [];
      rows.forEach(function (r, i) { for (var k = 0; k < qty[i]; k++) prices.push(parseInt(r.dataset.price, 10) || 0); });
      prices.sort(function (a, b) { return a - b; });
      var free = 0;
      for (var f = 0; f < CFG.free && f < prices.length; f++) free += prices[f];
      return Math.max(0, sumPrice() - free);
    }
    return Math.max(0, sumPrice() - CFG.off * count());
  }
  function render() {
    var n = count();
    var full = n >= CFG.size;
    rows.forEach(function (r, i) {
      var q = r.querySelector('[data-qty]');
      if (q) q.textContent = qty[i];
      var minus = r.querySelector('[data-minus]');
      var plus = r.querySelector('[data-plus]');
      if (minus) minus.disabled = qty[i] === 0;
      if (plus) plus.disabled = full;
      r.classList.toggle('is-picked', qty[i] > 0);
    });
    var imgs = [];
    rows.forEach(function (r, i) { for (var k = 0; k < qty[i]; k++) imgs.push(r.dataset.img); });
    for (var s = 0; s < slots.length; s++) {
      slots[s].hidden = s >= CFG.size;
      var filled = s < imgs.length;
      slots[s].classList.toggle('is-filled', filled);
      slots[s].style.backgroundImage = filled && imgs[s] ? 'url("' + imgs[s] + '")' : '';
    }
    if (statusEl) {
      statusEl.textContent = full ? T.complete : (T.pickMore[CFG.size - n - 1] || '');
      statusEl.classList.toggle('is-complete', full);
    }
    if (full && CFG.pack === 'bundle' && bundleTotalEl) {
      bundleTotalEl.textContent = formatMoney(bundlePrice());
      if (bundleCompareEl) bundleCompareEl.textContent = formatMoney(sumPrice());
    }
    if (full && CFG.pack === 'six' && sixTotalEl) {
      sixTotalEl.textContent = formatMoney(bundlePrice());
      if (sixCompareEl) sixCompareEl.textContent = formatMoney(sumPrice());
    }
    var label, enabled, sub;
    if (CFG.pack !== 'single') {
      enabled = full;
      label = full ? T.addBundle + ' · ' + formatMoney(bundlePrice()) : (T.pickMore[CFG.size - n - 1] || T.addBundle);
      sub = CFG.pack === 'six' ? T.sixTitle : T.bundleTitle;
    } else {
      enabled = !!CFG.single.available;
      label = enabled ? T.addToCart + ' · ' + formatMoney(CFG.single.price) : T.soldOut;
      sub = T.singleTitle;
    }
    if (atc) {
      atc.disabled = !enabled;
      atcLabel.textContent = label;
    }
    if (satcLabel) {
      satcLabel.textContent = label;
      satcBtn.classList.toggle('is-muted', !enabled);
    }
    if (satcSub) satcSub.textContent = sub;
  }
  function setPack(p) {
    CFG.pack = p;
    if (p !== 'single') {
      CFG.size = CFG.sizes[p] || CFG.sizes.bundle;
      if (count() > CFG.size) qty = rows.map(function () { return 0; });
    }
    packEls.forEach(function (el) { el.classList.toggle('is-selected', el.dataset.pack === p); });
    if (picker) picker.hidden = p === 'single';
    render();
  }
  root.querySelectorAll('.pack input').forEach(function (inp) {
    inp.addEventListener('change', function () { if (inp.checked) setPack(inp.value); });
  });
  rows.forEach(function (r, i) {
    var plus = r.querySelector('[data-plus]');
    var minus = r.querySelector('[data-minus]');
    if (plus) plus.addEventListener('click', function () { if (count() < CFG.size) { qty[i]++; render(); } });
    if (minus) minus.addEventListener('click', function () { if (qty[i] > 0) { qty[i]--; render(); } });
  });
  /* Buying is switched off on this copy: the add-to-cart buttons have no click handler. */
  /* ── Sticky bar: show once the main button has scrolled away ── */
  if (sticky && atc && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      var show = !e.isIntersecting && e.boundingClientRect.top < 0;
      sticky.classList.toggle('show', show);
      sticky.setAttribute('aria-hidden', String(!show));
      if (satcBtn) satcBtn.tabIndex = show ? 0 : -1;
    }).observe(atc);
  }
  /* ── Delivery estimate ── */
  (function () {
    var el = root.querySelector('[data-eta]');
    if (!el || !CFG.deliveryDays) return;
    var map = {};
    String(CFG.deliveryDays).split(',').forEach(function (part) {
      var m = part.trim().match(/^([A-Za-z]{2}|\*)\s*:\s*(\d+)\s*-\s*(\d+)$/);
      if (m) map[m[1].toUpperCase()] = [parseInt(m[2], 10), parseInt(m[3], 10)];
    });
    var range = map[String(CFG.country || '').toUpperCase()] || map['*'];
    if (!range) return;
    function addBusinessDays(n) {
      var d = new Date();
      var k = 0;
      while (k < n) { d.setDate(d.getDate() + 1); var w = d.getDay(); if (w !== 0 && w !== 6) k++; }
      return d;
    }
    var loc = { en: 'en-GB', nl: 'nl-NL', fr: 'fr-FR', de: 'de-DE' }[CFG.locale] || CFG.locale || 'en-GB';
    var fmt;
    try { fmt = new Intl.DateTimeFormat(loc, { weekday: 'short', day: 'numeric', month: 'short' }); }
    catch (e) { fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }); }
    var a = fmt.format(addBusinessDays(range[0]));
    var b = fmt.format(addBusinessDays(range[1]));
    el.querySelector('[data-eta-text]').textContent = T.eta.replace('%DATES%', a === b ? a : a + ' – ' + b);
    el.hidden = false;
  })();
  setPack(CFG.pack);
})();
