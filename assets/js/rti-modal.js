/**
 * RTI Officers Modal Popup (Institute of Archaeology, ASI)
 * Officers:
 * 1. Sh. A. Anil Kumar - Superintending Archaeologist - First Appellate Authority (FAA)
 * 2. Dr. Ashish Ranjan Sahoo - Assistant Superintending Archaeologist - Central Public Information Officer (CPIO)
 */
(function() {
  function createRtiModal() {
    if (document.getElementById('rti-modal')) return;

    const modalHtml = `
      <div id="rti-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300" role="dialog" aria-modal="true" aria-labelledby="rti-modal-title">
        <div id="rti-modal-card" class="bg-surface text-on-surface w-full max-w-2xl rounded-2xl shadow-2xl border border-white/60 overflow-hidden transform scale-95 transition-transform duration-300">
          
          <!-- Modal Header -->
          <div class="bg-primary text-on-primary px-6 py-5 flex items-center justify-between border-b border-primary-container">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div>
                <span class="text-xs uppercase tracking-widest font-bold opacity-80 block">Right to Information Act, 2005</span>
                <h3 id="rti-modal-title" class="font-headline-sm text-lg sm:text-xl font-bold leading-tight">RTI Cell Designated Officers</h3>
              </div>
            </div>
            <button id="rti-modal-close" type="button" aria-label="Close RTI Officers Dialog" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-on-primary flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-5 bg-surface max-h-[75vh] overflow-y-auto">
            <p class="text-xs sm:text-sm text-secondary leading-relaxed bg-surface-container-low p-3.5 rounded-lg border border-[#dbc1ba]/40">
              In accordance with Sections 4(1)(b) &amp; 5(1) of the Right to Information Act 2005, the following officers of the <strong>Institute of Archaeology, Pt. Deendayal Upadhyaya Campus, ASI</strong> are designated to handle RTI requests and appeals.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Officer 1: First Appellate Authority -->
              <div class="bg-white/90 backdrop-blur-sm border border-[#dbc1ba]/60 border-t-4 border-t-[#8c3b24] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div class="flex items-center justify-between gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
                    First Appellate Authority
                  </span>
                  <span class="text-xs font-mono font-bold text-tertiary">FAA</span>
                </div>
                <div>
                  <h4 class="font-title-lg text-base font-bold text-on-surface">Sh. A. Anil Kumar</h4>
                  <p class="text-xs font-semibold text-primary mt-0.5">Superintending Archaeologist</p>
                  <p class="text-xs text-secondary mt-0.5">First Appellate Authority (FAA)</p>
                </div>
                <div class="pt-2 border-t border-surface-container space-y-1.5 text-xs text-secondary">
                  <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[15px] text-primary shrink-0 mt-0.5">location_on</span>
                    <span>Institute of Archaeology, Pt. Deendayal Upadhyaya Campus, Greater Noida</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[15px] text-primary shrink-0">mail</span>
                    <a href="mailto:a.anilkumar.asi@gov.in" class="text-primary hover:underline font-mono">a.anilkumar.asi@gov.in</a>
                  </div>
                </div>
              </div>

              <!-- Officer 2: Central Public Information Officer -->
              <div class="bg-white/90 backdrop-blur-sm border border-[#dbc1ba]/60 border-t-4 border-t-[#8c3b24] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div class="flex items-center justify-between gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-[#593400]/10 text-tertiary text-[11px] font-bold uppercase tracking-wider">
                    Central Public Info Officer
                  </span>
                  <span class="text-xs font-mono font-bold text-tertiary">CPIO</span>
                </div>
                <div>
                  <h4 class="font-title-lg text-base font-bold text-on-surface">Dr. Ashis Ranjan Sahoo</h4>
                  <p class="text-xs font-semibold text-primary mt-0.5">Assistant Superintending Archaeologist</p>
                  <p class="text-xs text-secondary mt-0.5">Central Public Information Officer (CPIO)</p>
                </div>
                <div class="pt-2 border-t border-surface-container space-y-1.5 text-xs text-secondary">
                  <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[15px] text-primary shrink-0 mt-0.5">location_on</span>
                    <span>Institute of Archaeology, Pt. Deendayal Upadhyaya Campus, Greater Noida</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[15px] text-primary shrink-0">mail</span>
                    <a href="mailto:ashis.asi@gov.in" class="text-primary hover:underline font-mono">ashis.asi@gov.in</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Online RTI Portal Link -->
            <div class="bg-surface-container-high/60 p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2 text-secondary">
                <span class="material-symbols-outlined text-[18px] text-primary">public</span>
                <span>File an Online RTI Application via the official Government of India portal:</span>
              </div>
              <a href="https://rtionline.gov.in" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-bold text-xs inline-flex items-center gap-1 shrink-0 transition-colors shadow-xs">
                rtionline.gov.in ↗
              </a>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-surface-container-low px-6 py-3 border-t border-[#dbc1ba]/30 flex justify-end">
            <button id="rti-modal-close-btn" type="button" class="px-4 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs rounded-lg transition-colors">
              Close
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('rti-modal');
    const card = document.getElementById('rti-modal-card');
    const closeBtn = document.getElementById('rti-modal-close');
    const closeBtnBottom = document.getElementById('rti-modal-close-btn');

    function closeModal() {
      modal.classList.add('opacity-0', 'pointer-events-none');
      card.classList.add('scale-95');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    closeBtnBottom.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
        closeModal();
      }
    });
  }

  window.openRtiModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    createRtiModal();
    const modal = document.getElementById('rti-modal');
    const card = document.getElementById('rti-modal-card');
    if (modal) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      card.classList.remove('scale-95');
      document.body.style.overflow = 'hidden';
    }
  };

  function bindRtiTriggers() {
    createRtiModal();

    // Match all triggers: RTI buttons, footer links containing RTI or Right to Information
    document.querySelectorAll('a, button').forEach(el => {
      const text = (el.textContent || '').trim();
      const href = el.getAttribute('href') || '';
      
      const isRtiTrigger = 
        text.includes('RTI Cell Nodal Officer') ||
        text.includes('RTI Nodal Officer') ||
        text.includes('Right to Information (RTI Cell)') ||
        text.includes('RTI Cell') ||
        el.getAttribute('data-action') === 'rti-modal' ||
        href === '#rti-modal';

      if (isRtiTrigger) {
        el.setAttribute('role', 'button');
        el.setAttribute('aria-haspopup', 'dialog');
        el.style.cursor = 'pointer';
        el.addEventListener('click', window.openRtiModal);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindRtiTriggers);
  } else {
    bindRtiTriggers();
  }
})();
