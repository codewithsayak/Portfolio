/**
 * ============================================================================
 * CODE WITH SAYAK - PORTFOLIO CONFIGURATION
 * ============================================================================
 * Edit the values below to customize your portfolio.
 * You do not need to edit the complex logic below this configuration section.
 */
const CONFIG = {
    // Basic Information
    profile: {
        name: "Sayak Karmakar",
        headlinePrefix: "I am ",
        typewriterTexts: [
            "Building for the web",
            "Creative UI experiences",
            "Interactive JavaScript projects",
            "Turning ideas into reality"
        ],
        description: "I build responsive websites, interactive web applications, and beautiful digital experiences using HTML, CSS, and JavaScript.",
        availability: true, // Show the 'Available for collaboration' badge
        resumeUrl: "assets/resume.pdf", // Ensure this file exists or update path
        profileImage: "assets/images/code_with_sayak_400x500.png", // Fallback generated placeholder
    },

    // Social Links
    social: {
        github: "https://github.com/codewithsayak", 
        instagram: "https://www.instagram.com/code_with_sayak?mdxt=OTFuNzJrdWMxMW1h",
        telegram: "https://t.me/codewithsayak",
        email: "codewithsayak@gmail.com" // Update with real email
    },

    // Skills Configuration
    skills: [
        {
            category: "Frontend Development",
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`,
            items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Web Design", "CSS Animations", "DOM Manipulation", "Local Storage"]
        },
        {
            category: "Tools & Workflow",
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
            items: ["Git", "GitHub", "Browser DevTools", "VS Code", "Vercel Deployment", "Figma (Basic)"]
        },
        {
            category: "Currently Learning",
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
            items: ["API Integration", "Web Accessibility", "Performance Optimization", "Progressive Web Apps"]
        }
    ],

    // Featured Projects
    projects: [
        {
            id: 1,
            title: "Developer Portfolio Website",
            description: "A premium, fully responsive personal portfolio built entirely with HTML, CSS, and Vanilla JavaScript. Features dynamic themes and filtering.",
            image: "https://placehold.co/600x400/171717/00f0ff?text=Portfolio+Website",
            tags: ["HTML5", "CSS3", "JavaScript", "Custom Design"],
            category: "Websites",
            demoUrl: "#",
            repoUrl: "https://github.com/codewithsayak",
            featured: true,
            features: [
                "Dark and Light theme toggle with LocalStorage sync",
                "Dynamic configuration system driving the UI",
                "Custom built project filtering and search system",
                "Fully responsive layout without CSS frameworks"
            ]
        },
        {
            id: 2,
            title: "Gradient Lab",
            description: "An interactive CSS Gradient Generator that allows developers to visually mix colors, adjust angles, and copy production-ready CSS code.",
            image: "https://placehold.co/600x400/171717/00f0ff?text=Gradient+Lab",
            tags: ["JavaScript", "CSS Custom Properties", "DOM"],
            category: "Dev Tools",
            demoUrl: "#",
            repoUrl: "https://github.com/codewithsayak",
            featured: false,
            features: ["Linear and Radial gradients", "Color stops adjustment", "Instant CSS copy feature"]
        },
        {
            id: 3,
            title: "QR Code Generator",
            description: "A fast client-side web application that generates downloadable QR codes for URLs, text, or contact information instantly.",
            image: "https://placehold.co/600x400/171717/00f0ff?text=QR+Generator",
            tags: ["JavaScript", "Web API", "Responsive"],
            category: "Web Apps",
            demoUrl: "#",
            repoUrl: "https://github.com/codewithsayak",
            featured: false,
            features: ["Instant generation", "Customizable colors", "Download as PNG/SVG"]
        },
        {
            id: 4,
            title: "Mini Code Playground",
            description: "A browser-based editor that lets users write HTML, CSS, and JS and instantly preview the output in a safe iframe.",
            image: "https://placehold.co/600x400/171717/00f0ff?text=Code+Playground",
            tags: ["JavaScript", "ES6+", "iframe API"],
            category: "Dev Tools",
            demoUrl: "#",
            repoUrl: "#",
            featured: false,
            features: ["Live preview execution", "Syntax highlighting basic setup", "Auto-run toggle"]
        },
        {
            id: 5,
            title: "JavaScript Arcade Game",
            description: "A nostalgic retro-style arcade game built from scratch using HTML5 Canvas and RequestAnimationFrame.",
            image: "https://placehold.co/600x400/171717/00f0ff?text=Arcade+Game",
            tags: ["HTML5 Canvas", "Game Logic", "JS"],
            category: "Games",
            demoUrl: "#",
            repoUrl: "#",
            featured: true,
            features: ["Collision detection algorithm", "Score tracking", "Keyboard controls"]
        },
        {
            id: 6,
            title: "Landing Page Clone",
            description: "A pixel-perfect clone of a popular SaaS landing page demonstrating advanced CSS layout skills, flexbox, and grid.",
            image: "https://placehold.co/600x400/171717/00f0ff?text=Landing+Page",
            tags: ["CSS Grid", "Flexbox", "Responsive Design"],
            category: "Websites",
            demoUrl: "#",
            repoUrl: "#",
            featured: false,
            features: ["Mobile-first approach", "High performance score", "Accessible markup"]
        }
    ],

    // Services
    services: [
        {
            title: "Portfolio Website Development",
            description: "Custom-designed, responsive portfolios tailored to showcase your personal brand and professional achievements.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>`
        },
        {
            title: "Landing Page Development",
            description: "High-converting, visually stunning landing pages designed specifically for marketing campaigns and product launches.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`
        },
        {
            title: "Responsive Website Redesign",
            description: "Modernizing older websites with fresh UI/UX designs, ensuring they look perfect on mobile, tablet, and desktop.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
        }
    ],

    // Journey Timeline
    journey: [
        {
            date: "Recent",
            title: "Building Advanced Web Apps",
            description: "Working toward complex frontend applications, focusing on state management, APIs, and performance optimization."
        },
        {
            date: "Mid 2025",
            title: "Published Open-Source Projects",
            description: "Started contributing to the developer community by sharing functional UI components and JavaScript utilities on GitHub."
        },
        {
            date: "Early 2025",
            title: "Mastered Vanilla JavaScript",
            description: "Focused heavily on DOM manipulation, ES6+ features, and building interactive projects without relying on frameworks."
        },
        {
            date: "2024",
            title: "Explored Frontend Development",
            description: "Learned the fundamentals of HTML, CSS, and responsive design. Started turning creative ideas into static web pages."
        }
    ]
};

/**
 * ============================================================================
 * LOGIC IMPLEMENTATION (Do not edit unless familiar with JS)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Bootstrap UI with Config Data ---
    initPortfolioData();

    // --- 2. Theme Switching Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // Check saved theme or system preference
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }

    // --- 3. Mobile Navigation ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // --- 4. Active Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // Back to top button visibility
        const backToTopBtn = document.getElementById('back-to-top');
        if (scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 5. Hero Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentText = CONFIG.profile.typewriterTexts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % CONFIG.profile.typewriterTexts.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing
    setTimeout(typeEffect, 1000);

    // --- 6. Project Filtering & Search ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search-input');
    const emptyState = document.getElementById('empty-state');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            filterProjects();
        });
    });

    searchInput.addEventListener('input', filterProjects);

    function filterProjects() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const searchTerm = searchInput.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        let visibleCount = 0;

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.getAttribute('data-title').toLowerCase();
            const tags = card.getAttribute('data-tags').toLowerCase();
            
            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = title.includes(searchTerm) || tags.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (visibleCount === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    // --- 7. Project Modal Logic ---
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    // Setup modal closing
    closeModalBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });

    // Attach to injected buttons
    document.getElementById('projects-grid').addEventListener('click', (e) => {
        const btn = e.target.closest('.view-btn');
        if (btn) {
            const projectId = parseInt(btn.getAttribute('data-id'));
            openProjectModal(projectId);
        }
    });

    function openProjectModal(id) {
        const project = CONFIG.projects.find(p => p.id === id);
        if (!project) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="modal-img">
            <h2 class="modal-title">${project.title}</h2>
            <div class="project-tags" style="margin-bottom: 24px;">
                ${project.tags.map(tag => `<span>#${tag}</span>`).join('')}
            </div>
            <p class="modal-desc">${project.description}</p>
            
            <div class="modal-meta">
                <h4>Key Features</h4>
                <ul style="list-style-type: disc; padding-left: 20px; color: var(--text-muted);">
                    ${project.features.map(f => `<li style="margin-bottom: 8px;">${f}</li>`).join('')}
                </ul>
            </div>
            
            <div style="display: flex; gap: 16px;">
                <a href="${project.demoUrl}" target="_blank" class="btn btn-primary" rel="noopener noreferrer">Live Demo</a>
                <a href="${project.repoUrl}" target="_blank" class="btn btn-secondary" rel="noopener noreferrer">Source Code</a>
            </div>
        `;
        
        modal.showModal();
    }

    // --- 8. Contact Form Submit Override (Static behavior) ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const subject = document.getElementById('subject').value;
        const body = document.getElementById('message').value;
        
        // As a static site, construct a mailto link
        const mailtoLink = `mailto:${CONFIG.social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + "\n\n" + body)}`;
        
        // Show success UI feedback (though actual email client handles sending)
        const statusEl = document.getElementById('form-status');
        statusEl.innerHTML = `<span style="color: var(--success); font-weight: 500; display: block; margin-top: 16px;">Opening default email client...</span>`;
        
        window.location.href = mailtoLink;
        contactForm.reset();
        
        setTimeout(() => {
            statusEl.innerHTML = '';
        }, 5000);
    });

    // --- 9. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Run once
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Apply instantly if reduced motion is preferred
        revealElements.forEach(el => el.classList.add('active'));
    }
});

/**
 * Functions to inject HTML based on CONFIG object
 */
function initPortfolioData() {
    // Nav Links / General
    document.getElementById('nav-github-link').href = CONFIG.social.github;
    
    // Hero & Profile
    document.getElementById('hero-name').textContent = CONFIG.profile.name;
    document.getElementById('hero-desc').textContent = CONFIG.profile.description;
    document.getElementById('resume-btn').href = CONFIG.profile.resumeUrl;
    
    if (!CONFIG.profile.availability) {
        document.getElementById('availability-badge').style.display = 'none';
    }

    // About Section
    document.getElementById('profile-image').src = CONFIG.profile.profileImage;
    
    const aboutCardsHtml = `
        <div class="info-card">
            <h4>Focus</h4>
            <p>Frontend Architecture</p>
        </div>
        <div class="info-card">
            <h4>Location</h4>
            <p>India (Remote)</p>
        </div>
        <div class="info-card">
            <h4>Status</h4>
            <p>Available</p>
        </div>
        <div class="info-card">
            <h4>Interests</h4>
            <p>Open Source, UI/UX</p>
        </div>
    `;
    document.getElementById('about-cards-container').innerHTML = aboutCardsHtml;

    // Skills
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = CONFIG.skills.map(skillGroup => `
        <div class="skill-category">
            <h3>${skillGroup.icon} ${skillGroup.category}</h3>
            <div class="skill-list">
                ${skillGroup.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
            </div>
        </div>
    `).join('');

    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = CONFIG.projects.map(p => `
        <article class="project-card" data-category="${p.category}" data-title="${p.title}" data-tags="${p.tags.join(' ')}">
            <div class="project-img-wrapper">
                ${p.featured ? `<span class="project-featured-badge">Featured</span>` : ''}
                <img src="${p.image}" alt="${p.title}" loading="lazy">
                <div class="project-overlay">
                    <button class="view-btn" data-id="${p.id}">View Details</button>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.description}</p>
                <div class="project-tags">
                    ${p.tags.map(t => `<span>#${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${p.repoUrl}" target="_blank" class="project-link" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        Code
                    </a>
                    <a href="${p.demoUrl}" target="_blank" class="project-link" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        Demo
                    </a>
                </div>
            </div>
        </article>
    `).join('');

    // Services
    const servicesGrid = document.getElementById('services-grid');
    servicesGrid.innerHTML = CONFIG.services.map(s => `
        <div class="service-card">
            <div class="service-icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <a href="#contact">Let's Talk <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
        </div>
    `).join('');

    // Timeline
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = CONFIG.journey.map((j, index) => `
        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-content reveal">
                <span class="timeline-date">${j.date}</span>
                <h3>${j.title}</h3>
                <p>${j.description}</p>
            </div>
        </div>
    `).join('');

    // Contact & GitHub Section
    document.getElementById('github-cta-btn').href = CONFIG.social.github;
    
    document.getElementById('contact-methods').innerHTML = `
        <div class="contact-item">
            <div class="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div class="contact-details">
                <h4>Email</h4>
                <a href="mailto:${CONFIG.social.email}">${CONFIG.social.email}</a>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            <div class="contact-details">
                <h4>GitHub</h4>
                <a href="${CONFIG.social.github}" target="_blank" rel="noopener">@${CONFIG.social.github.split('/').pop()}</a>
            </div>
        </div>
    `;

    // Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    document.getElementById('footer-social').innerHTML = `
        <a href="${CONFIG.social.github}" target="_blank" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
        <a href="${CONFIG.social.instagram}" target="_blank" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
        <a href="${CONFIG.social.telegram}" target="_blank" aria-label="Telegram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a>
    `;
}
