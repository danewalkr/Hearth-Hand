document.addEventListener('DOMContentLoaded', function() {
  // ===========================
  // Portfolio Carousel
  // ===========================

  const container = document.querySelector('.portfolio-carousel-container');
  const carousel = document.getElementById('portfolioCarousel');
  const filterButtons = document.querySelectorAll('.filter-tag');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const portfolioSection = document.getElementById('portfolio');
  const portfolioLinks = document.querySelectorAll('a[href="#portfolio"]');
  
  let activeFilter = 'all';

  function smoothScrollToPortfolio() {
    if (!portfolioSection) return;
    const header = document.querySelector('.site-header');
    const headerOffset = header ? header.getBoundingClientRect().height : 0;
    const target = portfolioSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

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
  }

  portfolioLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollToPortfolio();
    });
  });

  /**
   * Enable mouse wheel scrolling on carousel for desktop
   */
  function initPortfolioCarousel() {
    if (!carousel) return;

    function canScrollHorizontally() {
      return carousel.scrollWidth > carousel.clientWidth + 1;
    }

    function handleWheel(e) {
      const delta = e.deltaX || e.deltaY || 0;
      if (!canScrollHorizontally()) return;

      const atStart = carousel.scrollLeft <= 0;
      const atEnd = Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth - 1;
      const scrollingRight = delta > 0;
      const scrollingLeft = delta < 0;

      if ((scrollingRight && !atEnd) || (scrollingLeft && !atStart)) {
        e.preventDefault();
        const target = Math.max(0, Math.min(carousel.scrollWidth - carousel.clientWidth, carousel.scrollLeft + delta * 2));
        carousel.scrollTo({ left: target, behavior: 'smooth' });
      }
    }

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    container?.addEventListener('wheel', handleWheel, { passive: false });

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    carousel.addEventListener('mousedown', function(e) {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollStart = carousel.scrollLeft;
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
      const walk = (x - startX) * 0.9;
      carousel.scrollLeft = scrollStart - walk;
    });
  }

  initPortfolioCarousel();

  if (carousel) {
    let touchStartX = 0;
    let touchStartY = 0;

    carousel.addEventListener('touchstart', function(e) {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    carousel.addEventListener('touchmove', function(e) {
      const touch = e.touches[0];
      const deltaX = touchStartX - touch.clientX;
      const deltaY = touchStartY - touch.clientY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        carousel.scrollLeft += deltaX;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      } else {
        e.preventDefault();
      }
    }, { passive: false });
  }

  /**
   * Apply filter to all cards
   * Completely removes non-matching cards from layout using display: none
   * Resets carousel scroll position when filter changes
   * @param {string} selectedFilter - The filter value to apply
   */
  function applyFilter(selectedFilter) {
    // Skip if same filter already active
    if (selectedFilter === activeFilter) {
      return;
    }
    activeFilter = selectedFilter;

    // Update button states
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === selectedFilter);
    });

    // Filter cards: completely remove non-matching from layout
    portfolioCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags').split(' ');
      const shouldShow = selectedFilter === 'all' || cardTags.includes(selectedFilter);
      
      if (shouldShow) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });

    // CRITICAL: Reset carousel scroll to 0 when filter changes
    // This ensures the first matching card is at the far left with no gaps
    container.scrollLeft = 0;
  }

  // Attach filter listeners
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      applyFilter(this.getAttribute('data-filter'));
    });
  });

  // ===========================
  // Outcome Modal System
  // ===========================
  
  const outcomeModal = document.getElementById('outcomeModal');
  const modalTitle = document.getElementById('outcomeModalTitle');
  const modalText = document.getElementById('outcomeModalText');
  const modalCloseBtn = document.querySelector('.outcome-modal-close');
  const outcomeButtons = document.querySelectorAll('.portfolio-card__outcome-btn');

  /**
   * Open the outcome modal with title and text
   * @param {string} title - Modal title
   * @param {string} text - Modal description text
   */
  function openModal(title, text) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    outcomeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the outcome modal
   */
  function closeModal() {
    outcomeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Outcome button listeners
  outcomeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const title = this.getAttribute('data-outcome-title');
      const text = this.getAttribute('data-outcome-text');
      openModal(title, text);
    });
  });

  // Modal close listeners
  modalCloseBtn.addEventListener('click', closeModal);
  outcomeModal.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && outcomeModal.classList.contains('active')) {
      closeModal();
    }
  });
});

