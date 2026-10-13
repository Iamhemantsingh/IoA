/**
 * Mobile Navigation Drawer & Hamburger Toggle
 * Institute of Archaeology, Pt. Deendayal Upadhyaya Campus, ASI
 */
(function() {
  function initMobileNav() {
    // Locate the hamburger button
    const btn = document.querySelector('button[aria-label*="navigation menu" i], button[aria-label*="नेविगेशन मेनू" i]');
    if (!btn) return;

    // Determine Hindi vs English page
    const isHindi = window.location.pathname.includes('/hi/');
    const prefix = isHindi ? '../' : '';

    // Navigation links data according to language
    const navItems = isHindi ? [
      { label: "हमारे बारे में", href: "#about-institute", icon: "account_balance" },
      { label: "शैक्षणिक कार्यक्रम", href: "#courses-offered", icon: "school" },
      { label: "शोध एवं उत्खनन", href: prefix + "docs.html?category=research-excavation", icon: "science" },
      { label: "संग्रहालय एवं दीर्घाएँ", href: prefix + "gallery.html", icon: "photo_library" },
      { label: "छात्र पोर्टल", href: prefix + "coming-soon.html?page=छात्र+पोर्टल", icon: "co_present" },
      { label: "प्रवेश", href: "#selection-process", icon: "how_to_reg" },
      { label: "अधिसूचनाएँ एवं निविदाएँ", href: prefix + "docs.html?category=notifications-tenders", icon: "campaign" },
      { label: "परिचय पुस्तिका (Who's Who)", href: prefix + "whos-who.html", icon: "badge" },
      { label: "संपर्क करें", href: prefix + "index.html#contact-section", icon: "contact_mail" }
    ] : [
      { label: "About Us", href: prefix + "index.html#about-institute", icon: "account_balance" },
      { label: "Academic Programmes", href: prefix + "index.html#courses-offered", icon: "school" },
      { label: "Research & Excavations", href: prefix + "docs.html?category=research-excavation", icon: "science" },
      { label: "Gallery", href: prefix + "gallery.html", icon: "photo_library" },
      { label: "Student Portal", href: prefix + "coming-soon.html?page=Student+Portal", icon: "co_present" },
      { label: "Admissions", href: prefix + "docs.html?category=admissions", icon: "how_to_reg" },
      { label: "Notifications & Tenders", href: prefix + "docs.html?category=notifications-tenders", icon: "campaign" },
      { label: "Who's Who", href: prefix + "whos-who.html", icon: "badge" },
      { label: "Contact", href: prefix + "index.html#contact-section", icon: "contact_mail" }
    ];

    // Build Drawer DOM if not already present
    let overlay = document.getElementById('mobile-nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'mobile-nav-overlay';
      overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] opacity-0 pointer-events-none transition-opacity duration-300 ease-out';
      
      const drawer = document.createElement('div');
      drawer.id = 'mobile-nav-drawer';
      drawer.className = 'fixed top-0 right-0 w-[85%] max-w-sm h-full bg-[#fdf9f4] shadow-2xl z-[201] transform translate-x-full transition-transform duration-300 ease-out flex flex-col border-l border-[#dbc1ba]/40';

      const drawerHeader = `
        <div class="p-4 bg-[#6e2510] text-white flex items-center justify-between border-b border-[#8c3b24]/40 shadow-sm">
          <div class="flex items-center gap-3">
            <img src="/assets/images/ioa-logo.svg" alt="IoA Logo" class="h-10 w-auto bg-white/10 rounded p-1" />
            <div>
              <div class="text-xs uppercase tracking-wider font-bold opacity-80">${isHindi ? 'पुरातत्व संस्थान' : 'Institute of Archaeology'}</div>
              <div class="text-sm font-semibold">${isHindi ? 'पं. दीनदयाल परिसर' : 'Pt. Deendayal Upadhyaya Campus'}</div>
            </div>
          </div>
          <button id="mobile-nav-close" aria-label="${isHindi ? 'मेनू बंद करें' : 'Close menu'}" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>
      `;

      const currentPath = window.location.pathname;
      const navLinksHtml = navItems.map(item => {
        const isActive = currentPath.endsWith(item.href) || (item.href === prefix + 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')));
        return `
          <a href="${item.href}" class="mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
            isActive 
              ? 'bg-[#8c3b24] text-white shadow-sm' 
              : 'text-[#1c1c19] hover:bg-[#f1ede8] hover:text-[#6e2510]'
          }">
            <span class="material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-[#8c3b24]'}">${item.icon}</span>
            <span>${item.label}</span>
          </a>
        `;
      }).join('');

      const drawerBody = `
        <div class="flex-1 overflow-y-auto p-4 space-y-1">
          ${navLinksHtml}
        </div>
      `;

      const drawerFooter = `
        <div class="p-4 bg-[#f1ede8] border-t border-[#dbc1ba]/40 text-xs text-[#655d59] space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-[#1c1c19]">${isHindi ? 'भाषा / Language' : 'Language'}</span>
            ${isHindi 
              ? '<a href="../index.html" class="px-2 py-1 rounded bg-white border border-[#dbc1ba] font-semibold text-[#6e2510]">English</a>' 
              : '<a href="hi/index.html" class="px-2 py-1 rounded bg-white border border-[#dbc1ba] font-semibold text-[#6e2510]">हिन्दी</a>'}
          </div>
          <div class="pt-2 border-t border-[#dbc1ba]/30 flex items-center gap-2 text-[11px]">
            <span class="material-symbols-outlined text-[15px] text-[#8c3b24]">call</span>
            <span>+91-120-2333100</span>
          </div>
        </div>
      `;

      drawer.innerHTML = drawerHeader + drawerBody + drawerFooter;
      document.body.appendChild(overlay);
      document.body.appendChild(drawer);

      // Open drawer function
      function openMenu() {
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100', 'pointer-events-auto');
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
        document.body.classList.add('overflow-hidden');
      }

      // Close drawer function
      function closeMenu() {
        overlay.classList.remove('opacity-100', 'pointer-events-auto');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
      }

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openMenu();
      });

      const closeBtn = drawer.querySelector('#mobile-nav-close');
      if (closeBtn) closeBtn.addEventListener('click', closeMenu);
      overlay.addEventListener('click', closeMenu);

      // Close when clicking any nav item (especially for anchors on same page)
      drawer.querySelectorAll('.mobile-nav-item').forEach(link => {
        link.addEventListener('click', function() {
          closeMenu();
        });
      });

      // Escape key to close
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer.classList.contains('translate-x-0')) {
          closeMenu();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
