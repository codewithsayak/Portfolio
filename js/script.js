/**
 * ============================================================================
 * CODE WITH SAYAK — PORTFOLIO
 * ----------------------------------------------------------------------------
 * 1. CONFIG  → every piece of content on the page lives here.
 * 2. LOGIC   → rendering, filtering, theme, navigation and interactions.
 *
 * You only need to edit CONFIG to make this portfolio yours.
 * ============================================================================
 */

const CONFIG = {
    profile: {
        name: "Sayak Karmakar",
        availabilityText: "Available for junior roles & freelance work",
        // Rotating lines under the name. Keep them short.
        typewriterTexts: [
            "Frontend Developer",
            "Building responsive interfaces",
            "Turning ideas into shipped code"
        ],
        description: "I build responsive websites, interactive web applications, and thoughtful digital experiences using HTML, CSS, and JavaScript.",
        aboutText: "I'm Sayak, a student and aspiring web developer who enjoys turning creative ideas into useful digital experiences. I explore frontend development by building practical projects, experimenting with interactive interfaces, and sharing my source code with the developer community.",
        resumeUrl: "assets/resume.pdf",
        profileImage: "assets/images/profile.webp",
        // Quick facts shown under the hero buttons.
        facts: [
            { label: "Based in", value: "Durgapur, India" },
            { label: "Working", value: "Remote friendly" },
            { label: "Replies in", value: "Under 24 hours" }
        ],
        // Small info cards in the About section.
        factsCards: [
            { label: "Focus", value: "Frontend architecture" },
            { label: "Location", value: "India · Remote" },
            { label: "Status", value: "Open to work" },
            { label: "Interests", value: "Open source, UI/UX" }
        ]
    },

    social: {
        github: "https://github.com/codewithsayak",
        instagram: "https://www.instagram.com/code_with_sayak",
        telegram: "https://t.me/codewithsayak",
        email: "codewithsayak@gmail.com"
    },

    skills: [
        {
            category: "Frontend",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`,
            items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive design", "CSS animations", "DOM manipulation", "Local storage"]
        },
        {
            category: "Tools & workflow",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
            items: ["Git", "GitHub", "Browser DevTools", "VS Code", "Vercel", "Figma (basics)"]
        },
        {
            category: "Currently learning",
            icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
            items: ["API integration", "Accessibility (WCAG)", "Performance budgets", "Progressive web apps"]
        }
    ],

    /**
     * Projects: set `demoUrl` / `repoUrl` to a real URL, or `null` to hide
     * that button. Replace `image` with a 1200×675 screenshot of your project.
     */
    projects: [
        {
            id: 1,
            title: "Developer Portfolio",
            description: "A fast, themeable personal site driven by a single configuration object — filtering, search, dialogs and animation, all in vanilla JavaScript.",
            image: "assets/images/portfolio.webp",
            tags: ["HTML5", "CSS3", "JavaScript"],
            category: "Websites",
            year: "2026",
            demoUrl: null,
            repoUrl: "https://github.com/codewithsayak",
            featured: true,
            features: [
                "Light and dark themes synced to localStorage and system preference",
                "Config-driven content: edit one object, the whole site updates",
                "Custom project filtering and instant search without a library",
                "Responsive layouts built with CSS grid and fluid type"
            ]
        },
        {
            id: 2,
            title: "Gradient Lab",
            description: "An interactive CSS gradient studio. Mix colour stops, tune the angle and copy production-ready CSS in one click.",
            image: "assets/images/gradient.webp",
            tags: ["JavaScript", "CSS variables", "DOM"],
            category: "Dev Tools",
            year: "2026",
            demoUrl: null,
            repoUrl: "https://github.com/codewithsayak",
            featured: true,
            features: [
                "Linear, radial and conic gradient modes",
                "Add, drag and remove colour stops with live preview",
                "One-click CSS copy with keyboard-friendly controls",
                "Remembers your last gradient between visits"
            ]
        },
        {
            id: 3,
            title: "QR Code Generator",
            description: "A zero-dependency utility that turns any URL or text into a crisp, downloadable QR code entirely in the browser.",
            image: "assets/images/project-qr.svg",
            tags: ["JavaScript", "Canvas", "Responsive"],
            category: "Web Apps",
            year: "2025",
            demoUrl: null,
            repoUrl: "https://github.com/codewithsayak",
            featured: false,
            features: [
                "Instant generation with no network requests",
                "Adjustable size, colour and error-correction level",
                "Download as PNG or SVG"
            ]
        },
        {
            id: 4,
            title: "Mini Code Playground",
            description: "A browser-based editor for HTML, CSS and JavaScript with a sandboxed live preview and auto-run.",
            image: "assets/images/project-playground.svg",
            tags: ["JavaScript", "iframe API", "ES6+"],
            category: "Dev Tools",
            year: "2025",
            demoUrl: null,
            repoUrl: null,
            featured: false,
            features: [
                "Sandboxed iframe preview keeps user code isolated",
                "Auto-run toggle with debounced updates",
                "Panels persist to localStorage between sessions"
            ]
        },
        {
            id: 5,
            title: "JavaScript Arcade",
            description: "A retro brick-breaker built from scratch with HTML5 Canvas, requestAnimationFrame and hand-written collision detection.",
            image: "assets/images/project-arcade.svg",
            tags: ["Canvas", "Game logic", "JavaScript"],
            category: "Games",
            year: "2025",
            demoUrl: null,
            repoUrl: null,
            featured: false,
            features: [
                "Delta-time game loop at a steady 60fps",
                "Axis-aligned collision detection and scoring",
                "Keyboard and touch controls"
            ]
        },
        {
            id: 6,
            title: "SaaS Landing Page",
            description: "A conversion-focused marketing page built to practise layout systems, responsive type and accessible components.",
            image: "assets/images/project-landing.svg",
            tags: ["CSS Grid", "Flexbox", "Responsive"],
            category: "Websites",
            year: "2025",
            demoUrl: null,
            repoUrl: null,
            featured: false,
            features: [
                "Mobile-first layout from 320px upward",
                "Fluid typography with clamp()",
                "Accessible navigation, focus states and contrast"
            ]
        }
    ],

    services: [
        {
            title: "Portfolio & personal sites",
            description: "A considered, fast-loading site that makes your work easy to read — designed around your story, not a template.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>`
        },
        {
            title: "Landing pages that convert",
            description: "Focused, responsive pages for launches and campaigns — clear hierarchy, real content structure and quick load times.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`
        },
        {
            title: "Redesigns & frontend fixes",
            description: "Modernising an ageing interface: tighter layout, better mobile behaviour, cleaner CSS and accessibility fixes.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
        }
    ],

    journey: [
        {
            date: "2026",
            title: "Building advanced web apps",
            description: "Working on complex frontend applications with a focus on state management, API integration and performance."
        },
        {
            date: "Mid 2025",
            title: "Published open-source projects",
            description: "Started sharing functional UI components and JavaScript utilities with the developer community on GitHub."
        },
        {
            date: "Early 2025",
            title: "Mastered vanilla JavaScript",
            description: "Went deep on DOM manipulation, ES6+ features and interactive projects without relying on frameworks."
        },
        {
            date: "2024",
            title: "Explored frontend development",
            description: "Learned the fundamentals of HTML, CSS and responsive design, and started turning ideas into real pages."
        }
    ]
};

/* ============================================================================
   LOGIC
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => Array.from(document.querySelectorAll(selector));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ICONS = {
        sun: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"></line><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"></line><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"></line></svg>`,
        moon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
        github: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
        instagram: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
        telegram: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
        mail: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="22,6 12,13 2,6"></polyline></svg>`,
        external: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
        arrow: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`
    };

    initContent();
    initTheme();
    initNavigation();
    initTypewriter();
    initProjects();
    initContactForm();
    initReveal();

    /* ------------------------------------------------------------------
       Content rendering from CONFIG
       ------------------------------------------------------------------ */
    function initContent() {
        // Header / hero
        const githubLink = $('#nav-github-link');
        if (githubLink) githubLink.href = CONFIG.social.github;

        $('#hero-name').textContent = CONFIG.profile.name;
        $('#hero-desc').textContent = CONFIG.profile.description;
        $('#about-text').textContent = CONFIG.profile.aboutText;
        $('#profile-image').src = CONFIG.profile.profileImage;

        const resumeBtn = $('#resume-btn');
        if (resumeBtn) resumeBtn.href = CONFIG.profile.resumeUrl;

        const badge = $('#availability-badge');
        const badgeText = $('#badge-text');
        if (CONFIG.profile.availabilityText) {
            badgeText.textContent = CONFIG.profile.availabilityText;
        } else if (badge) {
            badge.hidden = true;
        }

        // Hero quick facts
        const facts = $('.hero-facts');
        if (facts) {
            facts.innerHTML = CONFIG.profile.facts.map(fact => `
                <div class="fact">
                    <dt>${fact.label}</dt>
                    <dd>${fact.value}</dd>
                </div>
            `).join('');
        }

        // About cards
        $('#about-cards-container').innerHTML = CONFIG.profile.factsCards.map(card => `
            <div class="mini-card">
                <span class="mini-card-label">${card.label}</span>
                <span class="mini-card-value">${card.value}</span>
            </div>
        `).join('');

        // Skills
        $('#skills-container').innerHTML = CONFIG.skills.map(group => `
            <section class="skill-card">
                <div class="skill-card-head">
                    <span class="skill-icon">${group.icon}</span>
                    <h3>${group.category}</h3>
                </div>
                <ul class="tag-list">
                    ${group.items.map(item => `<li class="tag">${item}</li>`).join('')}
                </ul>
            </section>
        `).join('');

        // Services
        $('#services-grid').innerHTML = CONFIG.services.map(service => `
            <article class="service-card">
                <span class="service-icon">${service.icon}</span>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a class="text-link" href="#contact">Discuss a project ${ICONS.arrow}</a>
            </article>
        `).join('');

        // Journey
        $('#timeline').innerHTML = CONFIG.journey.map((item, index) => `
            <li class="timeline-item reveal">
                <div class="timeline-marker" aria-hidden="true"></div>
                <div class="timeline-body">
                    <span class="timeline-date">${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </li>
        `).join('');

        // Build log CTA
        const cta = $('#github-cta-btn');
        if (cta) cta.href = CONFIG.social.github;

        // Contact methods
        $('#contact-methods').innerHTML = `
            <a class="method" href="mailto:${CONFIG.social.email}">
                <span class="method-icon">${ICONS.mail}</span>
                <span class="method-copy">
                    <span class="method-label">Email</span>
                    <span class="method-value">${CONFIG.social.email}</span>
                </span>
            </a>
            <a class="method" href="${CONFIG.social.github}" target="_blank" rel="noopener noreferrer">
                <span class="method-icon">${ICONS.github}</span>
                <span class="method-copy">
                    <span class="method-label">GitHub</span>
                    <span class="method-value">@${CONFIG.social.github.split('/').filter(Boolean).pop()}</span>
                </span>
            </a>
        `;

        // Footer
        $('#current-year').textContent = new Date().getFullYear();
        $('#footer-social').innerHTML = [
            { url: CONFIG.social.github, label: 'GitHub', icon: ICONS.github },
            { url: CONFIG.social.instagram, label: 'Instagram', icon: ICONS.instagram },
            { url: CONFIG.social.telegram, label: 'Telegram', icon: ICONS.telegram },
            { url: `mailto:${CONFIG.social.email}`, label: 'Email', icon: ICONS.mail }
        ].filter(link => link.url).map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}" title="${link.label}">${link.icon}</a>
        `).join('');
    }

    /* ------------------------------------------------------------------
       Theme
       ------------------------------------------------------------------ */
    function initTheme() {
        const toggle = $('#theme-toggle');
        const root = document.documentElement;

        const stored = localStorage.getItem('theme');
        const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        setTheme(stored || (systemLight ? 'light' : 'dark'));

        toggle.addEventListener('click', () => {
            setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        });

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
            if (!localStorage.getItem('theme')) setTheme(event.matches ? 'light' : 'dark');
        });

        function setTheme(theme) {
            root.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            toggle.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
            toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
            toggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', theme === 'dark' ? '#08090B' : '#FBFBFE');
        }
    }

    /* ------------------------------------------------------------------
       Navigation, scroll state, progress bar
       ------------------------------------------------------------------ */
    function initNavigation() {
        const header = $('#site-header');
        const menuToggle = $('#menu-toggle');
        const nav = $('#primary-nav');
        const navLinks = $$('.nav-link');
        const progressBar = $('#scroll-progress-bar');
        const backToTop = $('#back-to-top');

        // Mobile menu
        const closeMenu = () => {
            menuToggle.classList.remove('is-open');
            nav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('nav-open');
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.classList.toggle('is-open');
            nav.classList.toggle('is-open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            document.body.classList.toggle('nav-open', isOpen);
        });

        navLinks.forEach(link => link.addEventListener('click', closeMenu));

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
        });

        window.matchMedia('(min-width: 900px)').addEventListener('change', (event) => {
            if (event.matches) closeMenu();
        });

        // Scroll-driven UI
        let ticking = false;
        const onScroll = () => {
            const scrollY = window.scrollY;
            header.classList.toggle('is-scrolled', scrollY > 12);
            backToTop.classList.toggle('is-visible', scrollY > 700);

            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(onScroll);
                ticking = true;
            }
        }, { passive: true });
        onScroll();

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });

        // Active section highlighting
        const sections = $$('main section[id]');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        const isActive = link.getAttribute('href') === `#${id}`;
                        link.classList.toggle('is-active', isActive);
                        if (isActive) {
                            link.setAttribute('aria-current', 'true');
                        } else {
                            link.removeAttribute('aria-current');
                        }
                    });
                });
            }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

            sections.forEach(section => observer.observe(section));
        }
    }

    /* ------------------------------------------------------------------
       Typewriter
       ------------------------------------------------------------------ */
    function initTypewriter() {
        const target = $('#typewriter');
        const phrases = CONFIG.profile.typewriterTexts || [];
        if (!target || !phrases.length) return;

        target.textContent = phrases[0];
        if (prefersReducedMotion || phrases.length === 1) return;

        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let deleting = true;
        let timeout;

        const tick = () => {
            const phrase = phrases[phraseIndex];
            charIndex += deleting ? -1 : 1;
            target.textContent = phrase.slice(0, Math.max(charIndex, 0));

            let delay = deleting ? 38 : 65;

            if (!deleting && charIndex >= phrase.length) {
                deleting = true;
                delay = 2300;
            } else if (deleting && charIndex <= 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 320;
            }

            timeout = window.setTimeout(tick, delay);
        };

        timeout = window.setTimeout(() => { deleting = true; tick(); }, 2600);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) window.clearTimeout(timeout);
            else { window.clearTimeout(timeout); timeout = window.setTimeout(tick, 900); }
        });
    }

    /* ------------------------------------------------------------------
       Projects: render, filter, search, modal
       ------------------------------------------------------------------ */
    function initProjects() {
        const grid = $('#projects-grid');
        const filters = $('#project-filters');
        const searchInput = $('#project-search-input');
        const emptyState = $('#empty-state');
        const resetBtn = $('#reset-filters');
        const modal = $('#project-modal');
        const modalBody = $('#modal-body');

        grid.innerHTML = CONFIG.projects.map(project => `
            <article class="project-card" data-category="${project.category}" data-search="${[project.title, project.description, ...project.tags, project.category].join(' ').toLowerCase()}">
                <button class="project-media" type="button" data-id="${project.id}" aria-label="View details for ${project.title}">
                    <img src="${project.image}" alt="${project.title} preview" loading="lazy" decoding="async" width="1200" height="675">
                    ${project.featured ? '<span class="badge-featured">Featured</span>' : ''}
                    <span class="project-media-overlay"><span>View details ${ICONS.arrow}</span></span>
                </button>
                <div class="project-body">
                    <div class="project-meta">
                        <span class="project-category">${project.category}</span>
                        <span class="project-year">${project.year || ''}</span>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <ul class="tag-list tag-list-sm">
                        ${project.tags.map(tag => `<li class="tag">${tag}</li>`).join('')}
                    </ul>
                    <div class="project-actions">
                        ${project.demoUrl ? `<a class="text-link" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">Live demo ${ICONS.external}</a>` : ''}
                        ${project.repoUrl ? `<a class="text-link" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">Source ${ICONS.github}</a>` : ''}
                        <button class="text-link text-link-button" type="button" data-id="${project.id}">Details ${ICONS.arrow}</button>
                    </div>
                </div>
            </article>
        `).join('');

        const cards = $$('.project-card');

        const applyFilters = () => {
            const activeFilter = $('.chip.is-active').dataset.filter;
            const term = searchInput.value.trim().toLowerCase();
            let visible = 0;

            cards.forEach(card => {
                const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
                const matchesTerm = !term || card.dataset.search.includes(term);
                const show = matchesCategory && matchesTerm;
                card.classList.toggle('is-hidden', !show);
                if (show) visible += 1;
            });

            emptyState.classList.toggle('hidden', visible > 0);
            grid.classList.toggle('is-empty', visible === 0);
        };

        filters.addEventListener('click', (event) => {
            const chip = event.target.closest('.chip');
            if (!chip) return;
            $$('.chip').forEach(btn => {
                btn.classList.toggle('is-active', btn === chip);
                btn.setAttribute('aria-pressed', String(btn === chip));
            });
            applyFilters();
        });

        searchInput.addEventListener('input', applyFilters);

        resetBtn.addEventListener('click', () => {
            searchInput.value = '';
            $$('.chip').forEach((btn, index) => {
                btn.classList.toggle('is-active', index === 0);
                btn.setAttribute('aria-pressed', String(index === 0));
            });
            applyFilters();
            searchInput.focus();
        });

        // Modal
        const openModal = (id) => {
            const project = CONFIG.projects.find(item => item.id === Number(id));
            if (!project) return;

            modalBody.innerHTML = `
                <div class="modal-media">
                    <img src="${project.image}" alt="${project.title} preview" width="1200" height="675">
                </div>
                <div class="modal-content">
                    <p class="modal-eyebrow">${project.category}${project.year ? ` · ${project.year}` : ''}</p>
                    <h2 class="modal-title" id="modal-title">${project.title}</h2>
                    <p class="modal-desc">${project.description}</p>
                    <h3 class="modal-subtitle">What's inside</h3>
                    <ul class="modal-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <ul class="tag-list tag-list-sm modal-tags">
                        ${project.tags.map(tag => `<li class="tag">${tag}</li>`).join('')}
                    </ul>
                    <div class="modal-actions">
                        ${project.demoUrl ? `<a class="btn btn-primary btn-sm" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">Live demo ${ICONS.external}</a>` : ''}
                        ${project.repoUrl ? `<a class="btn btn-ghost btn-sm" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">View source ${ICONS.github}</a>` : ''}
                        <button class="btn btn-ghost btn-sm" type="button" data-close>Close</button>
                    </div>
                </div>
            `;

            if (typeof modal.showModal === 'function') {
                modal.showModal();
                document.body.classList.add('modal-open');
            } else {
                modal.setAttribute('open', '');
            }
        };

        const closeModal = () => {
            modal.close ? modal.close() : modal.removeAttribute('open');
            document.body.classList.remove('modal-open');
        };

        grid.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-id]');
            if (trigger) openModal(trigger.dataset.id);
        });

        modal.addEventListener('click', (event) => {
            if (event.target.closest('[data-close]')) closeModal();
            if (event.target === modal) closeModal();
        });

        $('#close-modal').addEventListener('click', closeModal);
        modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
    }

    /* ------------------------------------------------------------------
       Contact form (mailto fallback)
       ------------------------------------------------------------------ */
    function initContactForm() {
        const form = $('#contact-form');
        const status = $('#form-status');

        const fields = ['name', 'email', 'subject', 'message'].map(id => document.getElementById(id));

        const markValidity = (field) => {
            const valid = field.checkValidity() && field.value.trim() !== '';
            field.classList.toggle('is-invalid', !valid && field.dataset.touched === 'true');
            field.setAttribute('aria-invalid', String(!valid && field.dataset.touched === 'true'));
            return valid;
        };

        fields.forEach(field => {
            field.addEventListener('blur', () => { field.dataset.touched = 'true'; markValidity(field); });
            field.addEventListener('input', () => { if (field.dataset.touched === 'true') markValidity(field); });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            fields.forEach(field => { field.dataset.touched = 'true'; });

            const allValid = fields.map(markValidity).every(Boolean);
            if (!allValid) {
                status.textContent = 'Please check the highlighted fields and try again.';
                status.className = 'form-status is-error';
                const firstInvalid = fields.find(field => !field.checkValidity());
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            const name = $('#name').value.trim();
            const email = $('#email').value.trim();
            const subject = $('#subject').value.trim();
            const message = $('#message').value.trim();

            const body = `Hi Sayak,\n\n${message}\n\n—\n${name}\n${email}`;
            window.location.href = `mailto:${CONFIG.social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            status.textContent = 'Opening your email client with the message prefilled…';
            status.className = 'form-status is-success';
            form.reset();
            fields.forEach(field => { delete field.dataset.touched; field.classList.remove('is-invalid'); });

            window.setTimeout(() => {
                status.textContent = '';
                status.className = 'form-status';
            }, 8000);
        });
    }

    /* ------------------------------------------------------------------
       Scroll reveal
       ------------------------------------------------------------------ */
    function initReveal() {
        const elements = $$('.reveal');

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) return;
                entry.target.style.transitionDelay = `${Math.min(index * 70, 210)}ms`;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        elements.forEach(el => observer.observe(el));
    }
});
