// Module entry — imports organize code into components/pages
import { initMobileMenu } from './components/menu.js';
import { initHome } from './pages/home.js';

// Initialize immediately — modules internally guard element existence
try {
  initMobileMenu();
} catch (err) {
  console.error('initMobileMenu error', err);
}

try {
  initHome();
} catch (err) {
  console.error('initHome error', err);
}

// Reusable smooth scroll animation (used by all hero CTAs)
// Easing and duration match portfolio.js original implementation
window.smoothScrollToSection = function(targetElement) {
  if (!targetElement) return;
  const header = document.querySelector('.site-header');
  const headerOffset = header ? header.getBoundingClientRect().height : 0;
  const target = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

  const start = window.pageYOffset;
  const distance = target - start;
  const duration = 700;
  const startTime = performance.now();

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animateScroll(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuad(progress);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) requestAnimationFrame(animateScroll);
  }

  requestAnimationFrame(animateScroll);
};

// Apply scroll animations to hero CTA buttons
document.addEventListener('DOMContentLoaded', function() {
  // Portfolio hero: "View our work" button
  const portfolioLinks = document.querySelectorAll('a[href="#portfolio"]');
  portfolioLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        window.smoothScrollToSection(portfolioSection);
      }
    });
  });

  // About hero: "Learn our story" button
  const aboutStoryBtn = document.querySelector('.about-cta-button[href="#about-story"]');
  if (aboutStoryBtn) {
    aboutStoryBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.getElementById('about-story');
      if (targetSection) {
        window.smoothScrollToSection(targetSection);
      }
    });
  }

  // Contact hero: "Start the conversation" button
  const contactFormBtn = document.querySelector('.contact-hero-button[href="#contact-form"]');
  if (contactFormBtn) {
    contactFormBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.getElementById('contact-form');
      if (targetSection) {
        window.smoothScrollToSection(targetSection);
      }
    });
  }
});

