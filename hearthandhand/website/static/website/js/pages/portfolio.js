document.addEventListener('DOMContentLoaded', function() {
  // ===========================
  // Portfolio Filtering System
  // ===========================
  
  const filterButtons = document.querySelectorAll('.filter-tag');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  let activeFilter = 'all';

  /**
   * Apply filter to all cards with smooth fade and layout shift
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

    // Apply filter to cards
    portfolioCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags').split(' ');
      const shouldShow = selectedFilter === 'all' || cardTags.includes(selectedFilter);
      
      if (shouldShow) {
        // Show card: remove display: none, allow opacity transition
        card.classList.remove('is-hidden');
      } else {
        // Hide card: fade out first, then hide from layout
        card.classList.add('is-hidden');
      }
    });
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

