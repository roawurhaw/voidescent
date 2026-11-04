(function () {
    const toggleBtn = document.querySelector('.h__dropdown-toggle');
    const dropdownMenu = document.querySelector('.h__dropdown-menu');
    if (toggleBtn && dropdownMenu) {
      // Toggle dropdown on click
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing immediately
        dropdownMenu.classList.toggle('is-active');
        const isActive = dropdownMenu.classList.contains('is-active');
        toggleBtn.setAttribute('aria-expanded', isActive);
      });
      // Close dropdown if user clicks anywhere else on the screen
      document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
          dropdownMenu.classList.remove('is-active');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  })();
