/**
 * Site-wide Predictive Search & Auto-complete Dropdown
 * Institute of Archaeology, Pt. Deendayal Upadhyaya Campus, ASI
 */
(function() {
  // Determine site root relative path (e.g. '' or '../' for hi/)
  const isHindi = window.location.pathname.includes('/hi/');
  const prefix = isHindi ? '../' : '';

  // Comprehensive index of pages, sections, documents, directories, and gallery
  const SITE_INDEX = [
    // Core Navigation & Pages
    {
      title: "Home",
      desc: "Institute of Archaeology official portal homepage",
      category: "Main Page",
      icon: "home",
      url: prefix + "index.html",
      keywords: ["home", "main", "portal", "homepage", "index", "pt deendayal upadhyaya", "asi", "archaeology"]
    },
    {
      title: "About the Institute",
      desc: "History, mandate, founding under ASI & Pt. Deendayal Upadhyaya Campus",
      category: "About Us",
      icon: "account_balance",
      url: prefix + "index.html#about-institute",
      keywords: ["about", "institute", "history", "mandate", "objective", "inauguration", "campus", "pddu"]
    },
    {
      title: "Academic Programmes",
      desc: "Curriculum, PGDA Diploma, induction courses and training",
      category: "Academics",
      icon: "school",
      url: prefix + "index.html#courses-offered",
      keywords: ["academic", "programmes", "courses", "pgda", "curriculum", "syllabus", "post graduate diploma", "prehistory", "principles", "methods"]
    },
    {
      title: "Post Graduate Diploma in Archaeology (PGDA)",
      desc: "Full-time premier 1-year postgraduate professional archaeology diploma",
      category: "Academics",
      icon: "workspace_premium",
      url: prefix + "index.html#courses-offered",
      keywords: ["pgda", "diploma", "post graduate", "archaeology", "stratigraphy", "excavation", "gis", "survey"]
    },
    {
      title: "Induction Training Course (Sr. CA & CA)",
      desc: "Professional training for Senior Conservation Assistants and Conservation Assistants",
      category: "Academics",
      icon: "engineering",
      url: prefix + "index.html#courses-offered",
      keywords: ["induction", "training", "conservation", "assistant", "sr ca", "ca", "preservation", "batch"]
    },
    {
      title: "Research & Excavations",
      desc: "Official excavation reports, field findings, interim publications",
      category: "Research",
      icon: "science",
      url: prefix + "docs.html?category=research-excavation",
      keywords: ["research", "excavation", "field", "sinauli", "stratigraphy", "archaeological survey", "report", "trenching"]
    },
    {
      title: "Sinauli Excavation Interim Report (PDF)",
      desc: "Official excavation and survey interim research report",
      category: "Research Document",
      icon: "picture_as_pdf",
      url: prefix + "assets/docs/research-excavation/Sinauli_Excavation_Interim_Report_2026.pdf",
      keywords: ["sinauli", "excavation", "report", "interim", "chariot", "copper hoard", "pdf", "research"]
    },
    {
      title: "Photo Gallery & Visual Archives",
      desc: "Field excavations, seminars, convocation, and monumental campus photos",
      category: "Gallery",
      icon: "photo_library",
      url: prefix + "gallery.html",
      keywords: ["gallery", "photos", "images", "visual", "pictures", "convocation", "excavations", "seminars", "archives"]
    },
    {
      title: "Campus Infrastructure & Galleries",
      desc: "Pt. Deendayal Gallery, labs, 900+ auditorium, central library",
      category: "Campus",
      icon: "museum",
      url: prefix + "index.html#about-institute",
      keywords: ["museum", "infrastructure", "auditorium", "library", "labs", "laboratories", "convention", "cafeteria"]
    },
    {
      title: "Admissions 2027 & Selection Process",
      desc: "Intake protocol, registration, written exam, and orientation schedule",
      category: "Admissions",
      icon: "how_to_reg",
      url: prefix + "index.html#selection-process",
      keywords: ["admissions", "selection", "intake", "registration", "exam", "dates", "eligibility", "process", "apply"]
    },
    {
      title: "Official Prospectus 2027 (Download PDF)",
      desc: "Download complete PGDA information prospectus & syllabus PDF",
      category: "Admissions Document",
      icon: "download",
      url: prefix + "assets/docs/admissions/IoA_Prospectus_2027.pdf",
      keywords: ["prospectus", "download", "brochure", "syllabus", "admissions pdf", "pgda prospectus", "handbook"]
    },
    {
      title: "Admissions Document Archive",
      desc: "Repository of admission notifications, prospectuses and forms",
      category: "Admissions",
      icon: "folder_shared",
      url: prefix + "docs.html?category=admissions",
      keywords: ["admissions", "docs", "archive", "forms", "notification", "prospectus"]
    },
    {
      title: "Notifications & Tenders",
      desc: "Public notices, procurement RFPs, e-tenders, auction notices",
      category: "Tenders",
      icon: "campaign",
      url: prefix + "docs.html?category=notifications-tenders",
      keywords: ["notifications", "tenders", "rfp", "procurement", "auction", "bids", "e-tender", "gazetted", "notices"]
    },
    {
      title: "E-Tender Notice: Campus Equipment (PDF)",
      desc: "Procurement and supply tender document for campus laboratory equipment",
      category: "Tenders Document",
      icon: "picture_as_pdf",
      url: prefix + "assets/docs/notifications-tenders/E-Tender_Notice_Campus_Equipment_2026.pdf",
      keywords: ["tender notice", "equipment", "procurement", "pdf", "campus equipment"]
    },
    {
      title: "Who's Who - Directory of Officers",
      desc: "Directory of Administrator, Academic, Administration, Library & Conservation officers",
      category: "Directory",
      icon: "badge",
      url: prefix + "whos-who.html",
      keywords: ["who's who", "whos who", "directory", "staff", "officers", "administration", "academic", "library", "conservation"]
    },
    {
      title: "Sh. Arun Singhal",
      desc: "Administrator, Institute of Archaeology & Pt. Deendayal Upadhyaya Campus",
      category: "Administration",
      icon: "person",
      url: prefix + "whos-who.html",
      keywords: ["arun singhal", "administrator", "head", "administration", "dg.pduia@gov.in"]
    },
    {
      title: "Sh. A. Anil Kumar",
      desc: "Superintending Archaeologist (Academic) & FAA",
      category: "Academic",
      icon: "person",
      url: prefix + "whos-who.html",
      keywords: ["anil kumar", "superintending archaeologist", "academic", "faa", "a.anilkumar.asi@gov.in"]
    },
    {
      title: "Dr. Ashis Ranjan Sahoo",
      desc: "Assistant Superintending Archaeologist (Academic) & CPIO",
      category: "Academic",
      icon: "person",
      url: prefix + "whos-who.html",
      keywords: ["ashis ranjan sahoo", "ashish", "assistant superintending archaeologist", "academic", "cpio", "ashis.asi@gov.in"]
    },
    {
      title: "Right to Information (RTI Cell)",
      desc: "FAA: Sh. A. Anil Kumar & CPIO: Dr. Ashis Ranjan Sahoo",
      category: "Governance",
      icon: "verified_user",
      url: "#rti-modal",
      action: "rti-modal",
      keywords: ["rti", "right to information", "faa", "cpio", "anil kumar", "ashis ranjan sahoo", "ashish", "nodal officer", "appeal"]
    },
    {
      title: "Citizens' Charter & Redressal",
      desc: "Citizen charter, service standards & grievance redressal portal",
      category: "Governance",
      icon: "schedule",
      url: prefix + "coming-soon.html?page=Citizens%27+Charter+%26+Redressal",
      keywords: ["citizens charter", "charter", "redressal", "grievance", "public service"]
    },
    {
      title: "Central Archaeological Library Access",
      desc: "Rare reports, monographs, ASI archives, manuscript access",
      category: "Library",
      icon: "local_library",
      url: prefix + "coming-soon.html?page=Central+Archaeological+Library+Access",
      keywords: ["central archaeological library", "library", "books", "journals", "manuscripts", "reading", "archives"]
    },
    {
      title: "Annual Archaeological Reviews (IAR)",
      desc: "Official Indian Archaeology - A Review (IAR) annual publications",
      category: "Publications",
      icon: "menu_book",
      url: prefix + "coming-soon.html?page=Annual+Archaeological+Reviews+%28IAR%29",
      keywords: ["annual archaeological reviews", "iar", "indian archaeology a review", "journal", "annual report"]
    },
    {
      title: "Student Portal",
      desc: "Online portal for student registration, grades and syllabi",
      category: "Student Services",
      icon: "co_present",
      url: prefix + "coming-soon.html?page=Student+Portal",
      keywords: ["student portal", "students", "login", "portal", "grades", "admit card"]
    },
    {
      title: "हिन्दी संस्करण (Hindi Version)",
      desc: "भारतीय पुरातत्व सर्वेक्षण • पुरातत्व संस्थान मुख्य पृष्ठ (हिन्दी)",
      category: "Language",
      icon: "translate",
      url: prefix + "hi/index.html",
      keywords: ["hindi", "हिन्दी", "devanagari", "bhasha", "language"]
    },
    {
      title: "Contact Us & Campus Location",
      desc: "Greater Noida campus coordinates, telephone, and administrative email",
      category: "Contact",
      icon: "contact_mail",
      url: prefix + "index.html#contact-section",
      keywords: ["contact", "address", "phone", "email", "location", "greater noida", "knowledge park", "telephone"]
    }
  ];

  // Levenshtein distance for fuzzy keyword similarity
  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  // Calculate search relevance score (higher is better)
  function scoreItem(item, query) {
    const q = query.trim().toLowerCase();
    if (!q) return 0;

    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = item.desc.toLowerCase();
    const catLower = item.category.toLowerCase();

    // Exact or prefix matches
    if (titleLower === q) score += 100;
    else if (titleLower.startsWith(q)) score += 60;
    else if (titleLower.includes(q)) score += 40;

    if (catLower.includes(q)) score += 25;
    if (descLower.includes(q)) score += 20;

    // Keyword matching
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower === q) score += 50;
      else if (kwLower.startsWith(q)) score += 30;
      else if (kwLower.includes(q)) score += 20;
      else if (q.includes(kwLower)) score += 25;
      else {
        // Fuzzy distance matching for typos
        if (q.length >= 3 && Math.abs(q.length - kwLower.length) <= 2) {
          const dist = editDistance(q, kwLower);
          if (dist === 1) score += 18;
          else if (dist === 2 && q.length >= 5) score += 12;
        }
      }
    }

    // Split words in multi-term queries
    const qWords = q.split(/\s+/).filter(w => w.length > 1);
    if (qWords.length > 1) {
      let matchesAll = true;
      for (const w of qWords) {
        const has = titleLower.includes(w) || descLower.includes(w) || item.keywords.some(k => k.includes(w));
        if (!has) matchesAll = false;
        else score += 10;
      }
      if (matchesAll) score += 30;
    }

    return score;
  }

  function initSearch() {
    const input = document.querySelector('header input[type="search"]');
    if (!input) return;

    const parent = input.closest('.relative') || input.parentElement;
    if (!parent) return;

    // Prevent duplicate dropdowns
    let dropdown = parent.querySelector('.search-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown hidden absolute top-full right-0 mt-2 w-80 sm:w-96 max-w-[92vw] bg-[#ffffff] text-[#1c1c19] border border-[#dbc1ba] rounded-xl shadow-2xl overflow-hidden z-[999] transition-all duration-200';
      dropdown.innerHTML = `
        <div class="search-results-list max-h-96 overflow-y-auto divide-y divide-[#dbc1ba]/30"></div>
        <div class="search-dropdown-footer px-3 py-2 bg-[#f1ede8] text-[11px] text-[#655d59] flex items-center justify-between border-t border-[#dbc1ba]/40">
          <span class="flex items-center gap-1 font-medium">
            <span class="material-symbols-outlined text-[13px] text-[#8c3b24]">saved_search</span> 
            <span class="search-count-label">0 results</span>
          </span>
          <span class="text-[10px] opacity-75">Click or press Esc to close</span>
        </div>
      `;
      parent.appendChild(dropdown);
    }

    const list = dropdown.querySelector('.search-results-list');
    const countLabel = dropdown.querySelector('.search-count-label');

    function renderResults(q) {
      if (!q || q.length < 1) {
        dropdown.classList.add('hidden');
        return;
      }

      const scored = SITE_INDEX.map(item => ({
        item,
        score: scoreItem(item, q)
      }))
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);

      if (scored.length === 0) {
        list.innerHTML = `
          <div class="p-4 text-center text-xs text-[#655d59] space-y-1">
            <span class="material-symbols-outlined text-[28px] text-[#8c3b24]/50 block mx-auto">search_off</span>
            <p class="font-bold text-[#1c1c19]">No matches for "${q}"</p>
            <p class="text-[11px]">Try searching for <span class="text-[#8c3b24] font-semibold">PGDA</span>, <span class="text-[#8c3b24] font-semibold">Admissions</span>, <span class="text-[#8c3b24] font-semibold">Tenders</span>, <span class="text-[#8c3b24] font-semibold">Gallery</span>, or <span class="text-[#8c3b24] font-semibold">RTI</span>.</p>
          </div>
        `;
        countLabel.textContent = '0 results';
        dropdown.classList.remove('hidden');
        return;
      }

      countLabel.textContent = `${scored.length} match${scored.length > 1 ? 'es' : ''} found`;

      list.innerHTML = scored.map(({ item }) => {
        const isRti = item.action === 'rti-modal';
        return `
          <a href="${item.url}" ${isRti ? 'data-action="rti-modal"' : ''} class="search-item group block px-3.5 py-2.5 hover:bg-[#f7f3ee] transition-colors cursor-pointer">
            <div class="flex items-start gap-2.5">
              <div class="w-7 h-7 rounded-lg bg-[#ffdbd1] text-[#6e2510] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#8c3b24] group-hover:text-white transition-colors">
                <span class="material-symbols-outlined text-[16px]">${item.icon}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-bold text-[#1c1c19] group-hover:text-[#8c3b24] transition-colors truncate">
                    ${highlightMatch(item.title, q)}
                  </span>
                  <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#ece0db] text-[#593400] shrink-0">
                    ${item.category}
                  </span>
                </div>
                <p class="text-[11px] text-[#655d59] truncate mt-0.5 leading-snug">
                  ${item.desc}
                </p>
              </div>
            </div>
          </a>
        `;
      }).join('');

      // Wire up clicks on search results (including RTI modal triggers)
      list.querySelectorAll('.search-item').forEach(link => {
        link.addEventListener('click', function(e) {
          if (this.getAttribute('data-action') === 'rti-modal') {
            e.preventDefault();
            dropdown.classList.add('hidden');
            if (window.openRtiModal) window.openRtiModal();
          } else {
            dropdown.classList.add('hidden');
          }
        });
      });

      dropdown.classList.remove('hidden');
    }

    function highlightMatch(text, query) {
      if (!query) return text;
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark class="bg-[#ffddba] text-[#593400] px-0.5 rounded">$1</mark>');
    }

    // Input event with light debounce
    let timeoutId;
    input.addEventListener('input', function() {
      clearTimeout(timeoutId);
      const val = this.value.trim();
      timeoutId = setTimeout(() => {
        renderResults(val);
      }, 150);
    });

    input.addEventListener('focus', function() {
      if (this.value.trim()) {
        renderResults(this.value.trim());
      }
    });

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (!parent.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        dropdown.classList.add('hidden');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
