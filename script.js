document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  function openMenu() {
    hamburger.classList.add('active');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Rotación dinámica del título de la pestaña
  (function titleScroller(text) {
    document.title = text;
    setTimeout(() => {
      titleScroller(text.substring(1) + text.charAt(0));
    }, 500);
  })("KLUB DEL LIBRE — Web en constante evolución — ");
});
