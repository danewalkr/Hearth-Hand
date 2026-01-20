// Home page module: carousel and service modal
export function initHome() {
  const serviceData = {
    'catering-events': {
      title: 'Catering & Events',
      description: 'Full-service planning and staffing for seamless gatherings.',
      details: [
        'Menu planning and vendor coordination',
        'On-site setup and attentive service',
        'Cleanup and next-day reset'
      ]
    },
    'banner': {
      title: 'Custom Banners',
      description: 'Custom painted banners to your liking.',
      details: [
        'Custom painted',
        'Hand drawn',
        'Delivery or pickup'
      ]
    },
    'baking': {
      title: 'Baking',
      description: 'Custom cakes, pastries, and seasonal treats.',
      details: [
        'Custom cakes, pastries, and desserts',
        'Gluten-free and vegan options',
        'Delivery and display styling'
      ]
    },
    'dog-kid-sitting': {
      title: 'Dog & Kid Sitting',
      description: 'Trusted care at home with routines maintained.',
      details: [
        'Background-checked, caring sitters',
        'Activity plans and flexible scheduling',
        'Home routines maintained'
      ]
    },
    'bartending': {
      title: 'Bartending',
      description: 'Signature cocktails, professional service, complete bar setup.',
      details: [
        'Signature cocktail and bar menu design',
        'Professional setup and service',
        'Responsible serving and cleanup'
      ]
    },
    'holiday-services': {
      title: 'Holiday Services',
      description: 'Decor, gifting, and hosting support for the season.',
      details: [
        'Decor setup and takedown',
        'Seasonal shopping and gift prep',
        'Hosting support and staffing'
      ]
    },
    'small-moving': {
      title: 'Small Moving',
      description: 'Packing, local moves, and home setup made simple.',
      details: [
        'Packing, labeling, and protection',
        'Local and apartment moves',
        'Unpacking and home setup'
      ]
    },
    'home-support': {
      title: 'Home Support',
      description: 'Weekly management, organization, and vendor coordination.',
      details: [
        'Weekly household management',
        'Home organization and decluttering',
        'Vendor scheduling and supervision'
      ]
    },
    'present-wrapping': {
      title: 'Present Wrapping',
      description: 'Premium wrapping, custom tags, and delivery options.',
      details: [
        'Premium wrapping and ribbons',
        'Custom tags and cards',
        'Pickup and drop-off available'
      ]
    },
    'custom-services': {
      title: 'Custom Services',
      description: 'Tailored solutions for unique needs and schedules.',
      details: [
        'Tailored solutions for unique needs',
        'One-time or ongoing support',
        'Discreet, professional service'
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
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceImages = document.querySelectorAll('.service-card-image img');

  if (!carousel || !modal) return;

  // Lazy load card images only when near viewport (except first)
  lazyLoadServiceImages(serviceImages, carousel);

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

    // Prevent "Learn More" buttons from navigating
    const learnMoreBtn = card.querySelector('.service-card-link');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
      });
    }
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

  // Defer carousel wiring until it is close to view
  let carouselInitialized = false;

  function initCarousel() {
    if (carouselInitialized) return;
    carouselInitialized = true;

    // Progress indicator for carousel
    const progressBar = document.getElementById('carouselProgressBar');
    if (progressBar) {
      function updateProgressBar() {
        const scrollLeft = carousel.scrollLeft;
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
        progressBar.style.width = progress + '%';
      }

      carousel.addEventListener('scroll', updateProgressBar);
      updateProgressBar();
      window.addEventListener('resize', updateProgressBar);
    }

    // Carousel behavior
    function canScrollHorizontally() {
      return carousel.scrollWidth > carousel.clientWidth + 1;
    }

    carousel.addEventListener('wheel', function(e) {
      const delta = e.deltaX || e.deltaY || 0;
      if (!canScrollHorizontally()) return;

      const atStart = carousel.scrollLeft <= 0;
      const atEnd = Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth - 1;
      const scrollingRight = delta > 0;
      const scrollingLeft = delta < 0;

      if ((scrollingRight && !atEnd) || (scrollingLeft && !atStart)) {
        e.preventDefault();
        const target = Math.max(0, Math.min(carousel.scrollWidth - carousel.clientWidth, carousel.scrollLeft + delta * 2));
        if ('scrollBehavior' in document.documentElement.style) {
          carousel.scrollTo({ left: target, behavior: 'smooth' });
        } else {
          carousel.scrollLeft = target;
        }
      }
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
      const walk = (x - startX) * 0.9; // gentle
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Update services offset for page-level gradient
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
  }

  if ('IntersectionObserver' in window) {
    const carouselObserver = new IntersectionObserver((entries, obs) => {
      if (entries.some(entry => entry.isIntersecting)) {
        initCarousel();
        obs.disconnect();
      }
    }, { root: null, rootMargin: '200px 0px' });

    carouselObserver.observe(carousel);
  } else {
    // Fallback: init soon after load
    setTimeout(initCarousel, 0);
  }

  // Testimonials (single-card, SaaS style)
(function () {
  const testimonials = [
    {
      name: 'Alex Morgan',
      role: 'Charleston, Homeowner',
      quote:
        "Hearth & Hand took the weight off our shoulders — thoughtful, reliable, and discreet service."
    },
    {
      name: 'Jordan Lee',
      role: 'Small Business Owner',
      quote:
        "Their planning and attention to detail made our event effortless. Highly recommended."
    },
    {
      name: 'Casey Nguyen',
      role: 'Working Parent',
      quote:
        "Consistently professional and calm — they helped restore order and time to our household."
    }
  ];

  // Elements
  const card = document.querySelector('.testimonial-card');
  if (!card) return;

  const quoteEl = card.querySelector('.testimonial-quote');
  const nameEl = card.querySelector('.testimonial-name');
  const roleEl = card.querySelector('.testimonial-role');

  const prevBtn = card.querySelector('.test-arrow.prev');
  const nextBtn = card.querySelector('.test-arrow.next');
  const dotsWrap = card.querySelector('.test-dots');

  let idx = 0;
  let isAnimating = false;

  /* ---------------------------
     Helpers
  ---------------------------- */

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';

    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      if (i === idx) dot.classList.add('active');

      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsWrap) return;
    [...dotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  function updateContent(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const t = testimonials[newIndex];

    card.classList.add('is-fading');

    setTimeout(() => {
      quoteEl.textContent = `“${t.quote}”`;
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;

      card.classList.remove('is-fading');
      updateDots();
      isAnimating = false;
    }, 250);
  }

  function goTo(i) {
    idx = (i + testimonials.length) % testimonials.length;
    updateContent(idx);
  }

  function next() {
    goTo(idx + 1);
  }

  function prev() {
    goTo(idx - 1);
  }

  /* ---------------------------
     Events
  ---------------------------- */

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  /* ---------------------------
     Init
  ---------------------------- */

  renderDots();
  updateContent(0);
})();

  function lazyLoadServiceImages(images, rootEl) {
    if (!images.length) return;

    const loadImage = (img) => {
      if (!img || img.dataset.loaded === 'true') return;
      const dataSrc = img.getAttribute('data-src');
      const pic = img.closest('picture');
      // Hydrate <source> elements only when needed to avoid early 404s
      if (pic) {
        const sources = pic.querySelectorAll('source');
        sources.forEach((source) => {
          const ds = source.getAttribute('data-srcset');
          if (ds) {
            source.srcset = ds;
            source.removeAttribute('data-srcset');
          }
          const sizes = source.getAttribute('data-sizes');
          if (sizes) {
            source.sizes = sizes;
            source.removeAttribute('data-sizes');
          }
        });
      }
      if (!dataSrc) return;
      img.src = dataSrc;
      img.dataset.loaded = 'true';
      img.removeAttribute('data-src');
    };

    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { root: rootEl || null, rootMargin: '200px 0px', threshold: 0.01 });

      images.forEach((img, index) => {
        if (index === 0 || img.dataset.loaded === 'true' || !img.getAttribute('data-src')) return;
        imgObserver.observe(img);
      });
    } else {
      images.forEach((img, index) => {
        if (index === 0) return;
        loadImage(img);
      });
    }
  }

}
