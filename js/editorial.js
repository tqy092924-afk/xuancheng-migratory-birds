/* Detail-dialog dismissal. The observation map is part of the page. */
(() => {
  const dialog = document.querySelector('#bird-dialog');
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
})();
