/*! 
* Creative-based scripts (inspired by Start Bootstrap - Creative v7.0.7)
* Licensed under MIT (see StartBootstrap/startbootstrap-creative LICENSE)
*/

window.addEventListener('DOMContentLoaded', () => {
  // Navbar shrink function (adds .navbar-shrink when scrolling)
  const navbarShrink = () => {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) return;
    const forceShrink = document.body.classList.contains('page-internal');
    if (forceShrink) {
      navbarCollapsible.classList.add('navbar-shrink');
      return;
    }
    if (window.scrollY === 0) navbarCollapsible.classList.remove('navbar-shrink');
    else navbarCollapsible.classList.add('navbar-shrink');
  };

  navbarShrink();
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy (only useful for one-page sections)
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav && document.body.querySelector('[data-bs-spy="scroll"]')) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  }

  // Collapse responsive navbar when a nav-link is clicked
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
  responsiveNavItems.forEach((responsiveNavItem) => {
    responsiveNavItem.addEventListener('click', () => {
      if (!navbarToggler) return;
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
});
