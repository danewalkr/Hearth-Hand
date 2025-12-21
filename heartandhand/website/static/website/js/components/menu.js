// Mobile menu module
// Exported initializer to attach menu handlers
export function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileNavMenu');
  if (!btn || !menu) return;

  const links = Array.from(menu.querySelectorAll('nav ul li'));
  const anchors = menu.querySelectorAll('a');

  let isOpen = false;

  function preventDefault(e) { e.preventDefault(); }

  function lockScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventDefault, { passive: false });
  }

  function unlockScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.removeEventListener('touchmove', preventDefault);
  }

  function openMenu() {
    isOpen = true;
    btn.classList.add('active');
    menu.classList.remove('closing');
    menu.classList.add('active');
    document.body.classList.add('menu-open');
    btn.setAttribute('aria-expanded', 'true');
    lockScroll();

    // stagger in the items
    links.forEach((li, i) => {
      li.style.setProperty('--menu-delay', (i * 50) + 'ms');
      li.classList.remove('animate-in');
      void li.offsetHeight;
      li.classList.add('animate-in');
    });

    // focus first link for accessibility
    setTimeout(() => {
      const first = menu.querySelector('a');
      if (first) first.focus();
    }, 220);
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    btn.classList.remove('active');
    menu.classList.add('closing');
    menu.classList.remove('active');
    menu.querySelectorAll('nav li').forEach(li => li.classList.remove('animate-in'));
    document.body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
    unlockScroll();

    // cleanup closing state after animation
    setTimeout(() => menu.classList.remove('closing'), 320);
  }

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (isOpen) closeMenu(); else openMenu();
  });

  // close on link click
  anchors.forEach(a => a.addEventListener('click', closeMenu));

  // close on resize (desktop)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && isOpen) closeMenu();
  });

  // close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  // close when clicking outside
  document.addEventListener('click', function(e) {
    if (!isOpen) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    closeMenu();
  });
}
