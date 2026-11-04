(() => {
      const root = document.getElementById('emailpop');
      if (!root || root.dataset.mounted === '1') return;
      root.dataset.mounted = '1';
      // BULLETPROOF Z-INDEX FIX: Moves the popup outside the Shopify section wrapper
      document.body.appendChild(root);
      const modal = root.querySelector('.ep__modal');
      const closeBtn = root.querySelector('.ep__close');
      const backdrop = root.querySelector('.ep__backdrop');
      const form = root.querySelector('form');
      const reopenBtn = root.querySelector('.ep__reopen');
      const key = 'ep_seen';
      const closedKey = 'ep_closed';
      const coolDays = 7;
      const delayMs = (15) * 1000;
      const exitIntent = true;
      const reopenEnabled = true;
      function getNow() {
        return Date.now();
      }
      function seenRecently() {
        try {
          const ts = parseInt(localStorage.getItem(key) || '0', 10);
          return ts && (getNow() - ts) < coolDays * 24 * 60 * 60 * 1000;
        } catch (_) {
          return false;
        }
      }
      function markSeen() {
        try {
          localStorage.setItem(key, String(getNow()));
        } catch (_) {}
      }
      function markClosed() {
        try {
          localStorage.setItem(closedKey, '1');
        } catch (_) {}
      }
      function wasClosed() {
        try {
          return localStorage.getItem(closedKey) === '1';
        } catch (_) {
          return false;
        }
      }
      function showReopen() {
        if (!reopenEnabled || !reopenBtn) return;
        reopenBtn.removeAttribute('hidden');
      }
      function hideReopen() {
        if (!reopenBtn) return;
        reopenBtn.setAttribute('hidden', '');
      }
      function openModal(manual = false) {
        hideReopen();
        if (modal.hasAttribute('hidden')) {
          modal.removeAttribute('hidden');
        }
        requestAnimationFrame(() => {
          modal.classList.add('open');
        });
        modal.setAttribute('aria-hidden', 'false');
        const emailInput = modal.querySelector('input[type="email"]');
        if (manual && emailInput) {
          setTimeout(() => emailInput.focus(), 180);
        }
      }
      function closeModal(fromUser = true) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
          modal.setAttribute('hidden', '');
          if (fromUser) showReopen();
        }, 220);
        if (fromUser) {
          markSeen();
          markClosed();
        }
      }
      if (!seenRecently()) {
        setTimeout(() => {
          if (!seenRecently()) openModal(false);
        }, delayMs);
        if (exitIntent) {
          const onExit = (e) => {
            if (e.clientY <= 10 && !seenRecently()) {
              openModal(false);
              window.removeEventListener('mouseout', onExit);
            }
          };
          window.addEventListener('mouseout', onExit);
        }
      } else if (wasClosed()) {
        showReopen();
      }
      if (reopenBtn) {
        reopenBtn.addEventListener('click', () => {
          openModal(true);
        });
      }
      closeBtn.addEventListener('click', () => closeModal(true));
      backdrop.addEventListener('click', () => closeModal(true));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
          closeModal(true);
        }
      });
      if (form) {
        form.addEventListener('submit', (e) => {
          const trap = form.querySelector('input[name="website"]');
          if (trap && trap.value) {
            e.preventDefault();
            markSeen();
            markClosed();
            closeModal(true);
            return;
          }
          markSeen();
          markClosed();
          setTimeout(() => {
            closeModal(false);
          }, 260);
        });
      }
    })();
