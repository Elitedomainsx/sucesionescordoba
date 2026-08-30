/*! 
* Creative-based scripts (inspired by Start Bootstrap - Creative v7.0.7)
* Licensed under MIT (see StartBootstrap/startbootstrap-creative LICENSE)
*/

(() => {
  const mainNav = document.querySelector('#mainNav');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('#navbarResponsive');

  const navbarShrink = () => {
    if (!mainNav) return;
    const forceShrink = document.body.classList.contains('page-internal');
    mainNav.classList.toggle('navbar-shrink', forceShrink || window.scrollY > 0);
  };

  const closeMenu = () => {
    if (!navbarMenu || !navbarToggler) return;
    navbarMenu.classList.remove('show');
    navbarToggler.setAttribute('aria-expanded', 'false');
    navbarToggler.setAttribute('aria-label', 'Abrir menú de navegación');
  };

  navbarToggler?.addEventListener('click', () => {
    if (!navbarMenu) return;
    const isOpen = navbarMenu.classList.toggle('show');
    navbarToggler.setAttribute('aria-expanded', String(isOpen));
    navbarToggler.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });

  document.querySelectorAll('#navbarResponsive .nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  navbarShrink();
  document.addEventListener('scroll', navbarShrink, { passive: true });
})();
