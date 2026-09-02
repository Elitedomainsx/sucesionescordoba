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

  const toc = document.querySelector('[data-generated-toc]');
  const tocList = toc?.querySelector('[data-toc-list]');
  const articleHeadings = document.querySelectorAll('.article-body h2');
  if (toc && tocList && articleHeadings.length >= 2) {
    const usedIds = new Set();
    articleHeadings.forEach((heading, index) => {
      const baseId = heading.id || heading.textContent
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || `seccion-${index + 1}`;
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id) || (document.getElementById(id) && document.getElementById(id) !== heading)) {
        id = `${baseId}-${suffix++}`;
      }
      usedIds.add(id);
      heading.id = id;

      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading.textContent.trim();
      item.appendChild(link);
      tocList.appendChild(item);
    });
    toc.hidden = false;
  }

  const floatingWhatsApp = document.querySelector('[data-floating-whatsapp]');
  if (floatingWhatsApp && 'IntersectionObserver' in window) {
    const visibleWhatsAppCtas = new Set();
    const competingWhatsAppCtas = document.querySelectorAll(
      '[data-cta-channel="whatsapp"]:not([data-cta-location="floating"])'
    );
    const floatingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleWhatsAppCtas.add(entry.target);
        else visibleWhatsAppCtas.delete(entry.target);
      });
      floatingWhatsApp.classList.toggle('is-suppressed', visibleWhatsAppCtas.size > 0);
    }, { threshold: 0.55 });

    competingWhatsAppCtas.forEach((cta) => floatingObserver.observe(cta));
  }

  const getTrafficSource = () => {
    const campaignSource = new URLSearchParams(window.location.search).get('utm_source');
    if (campaignSource) return campaignSource;
    if (!document.referrer) return 'direct';
    try {
      return new URL(document.referrer).hostname || 'referral';
    } catch (_error) {
      return 'referral';
    }
  };

  document.querySelectorAll('[data-cta-channel="whatsapp"]').forEach((cta) => {
    cta.addEventListener('click', () => {
      const eventParameters = {
        page_topic: document.body.dataset.pageTopic || 'general',
        cta_position: cta.dataset.ctaLocation || 'unknown',
        cta_text: cta.textContent.trim(),
        page_path: window.location.pathname,
        traffic_source: getTrafficSource()
      };

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', eventParameters);
      } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'whatsapp_click', ...eventParameters });
      }

      window.dispatchEvent(new CustomEvent('whatsapp_click', { detail: eventParameters }));
    });
  });

  navbarShrink();
  document.addEventListener('scroll', navbarShrink, { passive: true });
})();
