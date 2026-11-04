(function () {
  var field = document.getElementById('voide-redstars');
  var bh = document.getElementById('voide-blackhole');
  if (!field || !bh) return;
  var code = bh.querySelector('.bh__code');
  var HIT = 18; // px around a star that counts as on it
  function rand(a, b) { return Math.random() * (b - a) + a; }
  var stars = [];
  var total = Math.max(20, Math.round((innerWidth * innerHeight) / 60000));
  // About 3% of the stars are red, but always at least one to find; the white ones are scenery and can't be clicked.
  var reds = Math.max(1, Math.round(total * 0.03));
  for (var i = 0; i < total; i++) {
    var red = i < reds;
    var s = document.createElement('span');
    var dot = document.createElement('i');
    var rise = (innerHeight + 20) / rand(8, 21); // seconds to cross the screen at 8–21 px/s
    var twinkle = rand(2, 5);
    var size = red ? rand(2.4, 4.4) : rand(1.2, 2.6);
    s.className = red ? 'rstar' : 'rstar is-white';
    s.style.left = rand(0, 100) + '%';
    s.style.animationDuration = rise + 's';
    s.style.animationDelay = -rand(0, rise) + 's';
    dot.style.width = dot.style.height = size + 'px';
    dot.style.animationDuration = twinkle + 's';
    dot.style.animationDelay = -rand(0, twinkle) + 's';
    s.appendChild(dot);
    field.appendChild(s);
    if (red) stars.push(s);
  }
  // The stars sit behind the page content, so hover and click are worked out from the pointer position.
  function centre(el) { var r = el.getBoundingClientRect(); return { x: r.left, y: r.top }; }
  function starAt(x, y) {
    for (var i = 0; i < stars.length; i++) {
      var c = centre(stars[i]);
      if (Math.abs(c.x - x) < HIT && Math.abs(c.y - y) < HIT) return stars[i];
    }
    return null;
  }
  var hovered = null, active = null;
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      var s = starAt(e.clientX, e.clientY);
      if (s === hovered) return;
      if (hovered) hovered.classList.remove('is-hover');
      hovered = s;
      if (s) s.classList.add('is-hover');
      document.documentElement.classList.toggle('on-red-star', !!s);
    }, { passive: true });
  }
  function open(s) {
    close();
    active = s;
    s.classList.add('is-active');
    var c = centre(s);
    bh.style.left = c.x + 'px';
    bh.style.top = c.y + 'px';
    bh.classList.toggle('is-up', c.y > innerHeight - 190);
    bh.classList.add('is-open');
    bh.removeAttribute('aria-hidden');
    // Keep the text on screen when the star is near the left or right edge.
    code.style.translate = '';
    var r = code.getBoundingClientRect();
    code.style.translate = Math.max(8 - r.left, Math.min(0, innerWidth - 8 - r.right)) + 'px 0';
  }
  function close() {
    if (!active) return;
    active.classList.remove('is-active');
    active = null;
    bh.classList.remove('is-open');
    bh.setAttribute('aria-hidden', 'true');
  }
  // Capture phase, so a click on a star doesn't also follow a link underneath it.
  document.addEventListener('click', function (e) {
    if (!e.detail || bh.contains(e.target)) return; // keyboard clicks, or a click on the star's text
    var s = starAt(e.clientX, e.clientY);
    if (s) {
      e.preventDefault();
      e.stopPropagation();
      open(s);
    } else {
      close();
    }
  }, true);
})();
