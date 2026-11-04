// On phones the scent row scrolls sideways; open it on the middle card.
(function () {
  var row = document.querySelector('#voide-products .prod__row');
  var main = row && row.children[1];
  if (main && row.scrollWidth > row.clientWidth) row.scrollLeft = main.offsetLeft - (row.clientWidth - main.offsetWidth) / 2;
})();
