// Home page module: carousel and service modal
export function initHome() {
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

  if (!carousel || !modal) return;

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

  function openServiceModal(serviceKey) {
    const service = serviceData[serviceKey];
    if (!service) return;

    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;

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

    modal.showModal();
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    modalCloseBtn.focus();
  }

  function closeServiceModal() {
    modal.close();
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeServiceModal);
  modalBackdrop.addEventListener('click', closeServiceModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.open) {
      closeServiceModal();
    }
  });

  // Carousel behavior
  carousel.addEventListener('wheel', function(e) {
    e.preventDefault();
    carousel.scrollLeft += e.deltaY;
  }, { passive: false });

  // Drag to scroll
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
      if (scrollHint) {
        scrollHint.style.opacity = '0';
        setTimeout(() => { scrollHint.style.display = 'none'; }, 300);
      }
    }
  }, { once: false });

  // update services offset for page-level gradient
  function updateServicesOffset() {
    const content = document.querySelector('.content');
    const services = document.querySelector('.featured-services');
    if (!content || !services) return;
    const offset = services.offsetTop;
    content.style.setProperty('--services-offset', offset + 'px');
  }

  updateServicesOffset();
  window.addEventListener('resize', updateServicesOffset);
  setTimeout(updateServicesOffset, 250);

  // Scrollbar indicator (if present)
  const carouselIndicator = document.querySelector('.services-carousel');
  const scrollbarThumb = document.querySelector('.carousel-scrollbar-thumb');

  if (carouselIndicator && scrollbarThumb) {
    function updateScrollbar() {
      const scrollLeft = carouselIndicator.scrollLeft;
      const scrollWidth = carouselIndicator.scrollWidth - carouselIndicator.clientWidth;
      const percentage = (scrollLeft / scrollWidth) * 100;
      const thumbWidth = (carouselIndicator.clientWidth / carouselIndicator.scrollWidth) * 100;
      scrollbarThumb.style.left = percentage + '%';
      scrollbarThumb.style.width = Math.max(thumbWidth, 20) + '%';
    }

    carouselIndicator.addEventListener('scroll', updateScrollbar);
    updateScrollbar();
    window.addEventListener('resize', updateScrollbar);
  }
}
