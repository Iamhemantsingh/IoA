// Accessibility Font Size Adjuster (A- A A+)
(function() {
  const STORAGE_KEY = 'ioa_font_scale';
  const scales = {
    'decrease': 'font-size-decrease',
    'reset': '',
    'increase': 'font-size-increase'
  };

  function applyScale(scaleKey) {
    const root = document.documentElement;
    root.classList.remove('font-size-decrease', 'font-size-increase');
    if (scaleKey === 'decrease') {
      root.classList.add('font-size-decrease');
    } else if (scaleKey === 'increase') {
      root.classList.add('font-size-increase');
    }
    
    // Update active visual state on buttons
    document.querySelectorAll('[data-font-size]').forEach(btn => {
      const action = btn.getAttribute('data-font-size');
      if (action === scaleKey) {
        btn.classList.add('bg-white/30', 'font-bold');
      } else {
        btn.classList.remove('bg-white/30');
        if (action !== 'reset') btn.classList.remove('font-bold');
      }
    });

    try {
      localStorage.setItem(STORAGE_KEY, scaleKey);
    } catch(e) {}
  }

  // Restore saved preference on load
  const saved = (function() {
    try { return localStorage.getItem(STORAGE_KEY); } catch(e) { return null; }
  })() || 'reset';

  // Attach click events
  function init() {
    applyScale(saved);
    document.querySelectorAll('[data-font-size]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const action = this.getAttribute('data-font-size');
        applyScale(action);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
