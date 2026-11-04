(function () {
    // Find any buttons in this section that have a link starting with '#'
    const scrollLinks = document.querySelectorAll('#voide-cta a[href^="#"]');
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        // Ignore if it's just an empty hashtag
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        // If the target element exists on the page, scroll to it smoothly
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
