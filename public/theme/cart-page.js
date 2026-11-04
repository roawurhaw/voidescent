(function () {
    const cartForm = document.getElementById('cart-form');
    if (!cartForm) return;
    cartForm.querySelectorAll('.qty__box').forEach(box => {
      const input = box.querySelector('.qty__input');
      const btnMinus = box.querySelector('.qty__minus');
      const btnPlus = box.querySelector('.qty__plus');
      btnMinus.addEventListener('click', () => {
        let val = parseInt(input.value);
        if (val > 0) {
          input.value = val - 1;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      btnPlus.addEventListener('click', () => {
        let val = parseInt(input.value);
        input.value = val + 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      input.addEventListener('change', () => {
        cartForm.submit();
      });
    });
  })();
