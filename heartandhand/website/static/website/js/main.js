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

/**
 * Services Carousel & Modal Handler
 * Manages horizontal scrolling, keyboard navigation, and service detail modal
 */

document.addEventListener('DOMContentLoaded', function() {
  // Service data with full descriptions and details
  const serviceData = {
    'household-management': {
      title: 'Household Management',
      description: 'Comprehensive management of your home, from staff coordination to maintenance oversight and organization systems that work for you.',
      details: [
        'Staff coordination and scheduling',
        'Maintenance and vendor oversight',
        'Home organization and systems',
        'Household operations management'
      ]
    },
    'event-planning': {
      title: 'Event Planning',
      description: 'Full-service planning and coordination for gatherings of all sizes, from intimate dinners to formal celebrations.',
      details: [
        'Event design and conceptualization',
        'Vendor management and coordination',
        'Timeline and logistics planning',
        'Day-of event coordination'
      ]
    },
    'personal-chef': {
      title: 'Personal Chef Services',
      description: 'Custom meal planning and preparation tailored to your family\'s dietary preferences and entertaining needs.',
      details: [
        'Custom menu planning',
        'Dietary preference management',
        'Grocery shopping and sourcing',
        'Meal preparation and presentation'
      ]
    },
    'travel-coordination': {
      title: 'Travel Coordination',
      description: 'End-to-end travel planning and logistics management for seamless vacations and business trips.',
      details: [
        'Itinerary planning',
        'Accommodation and transportation booking',
        'Activity and restaurant reservations',
        'On-trip support and logistics'
      ]
    },
    'shopping-errands': {
      title: 'Shopping & Errands',
      description: 'Personal shopping and errand services handled with attention to detail and your preferences.',
      details: [
        'Personal shopping services',
        'Errand management',
        'Preference-based selections',
        'Delivery coordination'
      ]
    },
    'custom-solutions': {
      title: 'Custom Solutions',
      description: 'Specialized services tailored specifically to your unique needs and lifestyle requirements.',
      details: [
        'Personalized service design',
        'Unique problem-solving',
        'Lifestyle management',
        'Bespoke support services'
      ]
    }
  };

  // Modal elements
  const modal = document.getElementById('serviceModal');
  const modalBackdrop = document.getElementById('serviceModalBackdrop');
  const modalTitle = document.getElementById('serviceModalTitle');
  const modalDescription = document.getElementById('serviceModalDescription');
  const serviceDetails = document.getElementById('serviceDetails');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const carousel = document.getElementById('servicesCarousel');
  const scrollHint = document.getElementById('scrollHint');
  const serviceCards = document.querySelectorAll('.service-card');

  // Open modal when service card is clicked
  serviceCards.forEach(card => {
    card.addEventListener('click', function() {
      const serviceKey = this.getAttribute('data-service');
      openServiceModal(serviceKey);
    });

    // Keyboard: Enter/Space to open modal
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const serviceKey = this.getAttribute('data-service');
        openServiceModal(serviceKey);
      }
    });
  });

  // Open modal function
  function openServiceModal(serviceKey) {
    const service = serviceData[serviceKey];
    if (!service) return;

    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;

    // Populate service details
    if (service.details && service.details.length > 0) {
      const detailsList = document.createElement('ul');
      service.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
      });
      serviceDetails.innerHTML = '';
      serviceDetails.appendChild(detailsList);
    } else {
      serviceDetails.innerHTML = '';
    }

    // Show modal
    modal.showModal();
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    modalCloseBtn.focus();
  }

  // Close modal function
  function closeServiceModal() {
    modal.close();
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close button click
  modalCloseBtn.addEventListener('click', closeServiceModal);

  // Close on backdrop click
  modalBackdrop.addEventListener('click', closeServiceModal);

  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.open) {
      closeServiceModal();
    }
  });

  // Carousel: Mouse wheel scrolling
  // Convert vertical wheel input to horizontal scrolling
  // Works immediately and bidirectionally without snap interference
  carousel.addEventListener('wheel', function(e) {
    e.preventDefault();
    // Direct application of wheel delta to scrollLeft
    // No velocity adjustment, no snap delays
    carousel.scrollLeft += e.deltaY;
  }, { passive: false });

  // Carousel: Drag to scroll on desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', function(e) {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', function() {
    isDown = false;
  });

  carousel.addEventListener('mouseup', function() {
    isDown = false;
  });

  carousel.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Hide scroll hint after first scroll
  let hasScrolled = false;
  carousel.addEventListener('scroll', function() {
    if (!hasScrolled && carousel.scrollLeft > 0) {
      hasScrolled = true;
      scrollHint.style.opacity = '0';
      setTimeout(() => {
        scrollHint.style.display = 'none';
      }, 300);
    }
  }, { once: false });

  // --- PAGE-LEVEL GRADIENT SETUP ---
  // Compute the vertical offset of the featured services section
  // relative to the `.content` wrapper and expose it as a CSS variable
  // so `.content::before` can start the gradient exactly at that position.
  function updateServicesOffset() {
    const content = document.querySelector('.content');
    const services = document.querySelector('.featured-services');
    if (!content || !services) return;
    // offsetTop of services is relative to the content container
    const offset = services.offsetTop;
    content.style.setProperty('--services-offset', offset + 'px');
  }

  // Run on load and on resize (and a short timeout for late layout shifts)
  updateServicesOffset();
  window.addEventListener('resize', updateServicesOffset);
  setTimeout(updateServicesOffset, 250);
});

