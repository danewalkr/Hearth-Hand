/**
 * Mobile Hamburger Menu Handler
 * Toggles navigation menu on mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navBar = document.querySelector('.nav-bar');
  
  // Create backdrop element if it doesn't exist
  let backdrop = document.querySelector('.mobile-menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
  }

  // Toggle menu visibility
  hamburgerBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log('Hamburger clicked');
    navBar.classList.toggle('mobile-menu-open');
    backdrop.classList.toggle('active');
    console.log('mobile-menu-open class:', navBar.classList.contains('mobile-menu-open'));
  });

  // Close menu when a link is clicked
  const navItems = navLinks.querySelectorAll('a');
  navItems.forEach(link => {
    link.addEventListener('click', function() {
      navBar.classList.remove('mobile-menu-open');
      backdrop.classList.remove('active');
    });
  });

  // Close menu when clicking backdrop
  backdrop.addEventListener('click', function() {
    navBar.classList.remove('mobile-menu-open');
    backdrop.classList.remove('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navBar.contains(event.target);
    const isMenuOpen = navBar.classList.contains('mobile-menu-open');
    
    if (!isClickInsideNav && isMenuOpen) {
      navBar.classList.remove('mobile-menu-open');
      backdrop.classList.remove('active');
    }
  });

  // Close menu on window resize if screen becomes large enough
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navBar.classList.remove('mobile-menu-open');
      backdrop.classList.remove('active');
    }
  });
});
