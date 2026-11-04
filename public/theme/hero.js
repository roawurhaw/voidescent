(function () {
    // Seven soft red blobs drifting slowly. The browser animates them (no per-frame script), which keeps the page light.
    var field = document.getElementById('vs-fluid');
    if (field && field.animate) {
      for (var i = 0; i < 7; i++) {
        var r = 120 + Math.random() * 180;
        var t = 30 + Math.random() * 30; // seconds per sweep, at up to 9 px/s
        var dx = (Math.random() - 0.5) * 18 * t;
        var dy = (Math.random() - 0.5) * 18 * t;
        var b = document.createElement('span');
        b.className = 'vs-blob';
        b.style.width = b.style.height = 2 * r + 'px';
        b.style.left = Math.random() * 100 + '%';
        b.style.top = Math.random() * 100 + '%';
        b.style.margin = -r + 'px';
        field.appendChild(b);
        b.animate([{ transform: 'translate(0, 0)' }, { transform: 'translate(' + dx + 'px, ' + dy + 'px)' }],
          { duration: t * 1000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
      }
    }
    // Smooth Scroll logic for target links starting with '#'
    const scrollLinks = document.querySelectorAll('#voide-hero a[href^="#"]');
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  })();
