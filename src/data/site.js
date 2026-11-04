/**
 * Every piece of content on the site lives here.
 * Edit this file to make the portfolio yours — the UI adapts automatically.
 */

export const profile = {
  name: 'Sayak Karmakar',
  firstName: 'Sayak',
  lastName: 'Karmakar',
  role: 'Frontend Developer',
  // Hero rotating lines
  rotating: ['Frontend Developer', 'Interface Engineer', 'React Builder'],
  availability: 'Available for junior roles & freelance work',
  tagline: 'I build fast, accessible interfaces — and make them move.',
  lede: 'A frontend developer from Durgapur, India, crafting responsive websites and interactive web applications with React, modern JavaScript and careful CSS.',
  about:
    "I'm Sayak — a student and developer who enjoys turning rough ideas into interfaces people actually enjoy using. I build in public, ship small things often, and treat accessibility and performance as part of the design, not an afterthought.",
  resumeUrl: '/assets/resume.pdf',
  portrait: '/assets/images/profile.webp',
  location: 'Durgapur, India',
  timezone: 'IST · UTC+5:30',
  email: 'codewithsayak@gmail.com',
  facts: [
    { label: 'Based in', value: 'Durgapur, India' },
    { label: 'Working', value: 'Remote friendly' },
    { label: 'Replies in', value: 'Under 24 hours' },
  ],
  cards: [
    { label: 'Focus', value: 'Frontend architecture' },
    { label: 'Location', value: 'India · Remote' },
    { label: 'Status', value: 'Open to work' },
    { label: 'Interests', value: 'Open source, UI/UX' },
  ],
};

export const social = {
  github: 'https://github.com/codewithsayak',
  instagram: 'https://www.instagram.com/code_with_sayak',
  telegram: 'https://t.me/codewithsayak',
  email: 'codewithsayak@gmail.com',
};

export const stats = [
  { value: 6, suffix: '+', label: 'Projects shipped' },
  { value: 3, suffix: '', label: 'Years learning in public' },
  { value: 100, suffix: '%', label: 'Hand-written code' },
  { value: 24, suffix: 'h', label: 'Average reply time' },
];

export const projects = [
  {
    id: 1,
    index: '01',
    title: 'Developer Portfolio',
    short: 'A config-driven personal site with filtering, search and motion.',
    description:
      'A fast, themeable personal site driven by a single configuration object — filtering, search, dialogs and animation, all in vanilla JavaScript.',
    image: '/assets/images/portfolio.webp',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    category: 'Websites',
    year: '2026',
    role: 'Design & build',
    demoUrl: null,
    repoUrl: 'https://github.com/codewithsayak',
    featured: true,
    features: [
      'Light and dark themes synced to localStorage and system preference',
      'Config-driven content: edit one object, the whole site updates',
      'Custom project filtering and instant search without a library',
      'Responsive layouts built with CSS grid and fluid type',
    ],
  },
  {
    id: 2,
    index: '02',
    title: 'Gradient Lab',
    short: 'An interactive CSS gradient studio with live CSS output.',
    description:
      'An interactive CSS gradient studio. Mix colour stops, tune the angle and copy production-ready CSS in one click.',
    image: '/assets/images/gradient.webp',
    tags: ['JavaScript', 'CSS variables', 'DOM'],
    category: 'Dev Tools',
    year: '2026',
    role: 'Concept & build',
    demoUrl: null,
    repoUrl: 'https://github.com/codewithsayak',
    featured: true,
    features: [
      'Linear, radial and conic gradient modes',
      'Add, drag and remove colour stops with live preview',
      'One-click CSS copy with keyboard-friendly controls',
      'Remembers your last gradient between visits',
    ],
  },
  {
    id: 3,
    index: '03',
    title: 'QR Code Generator',
    short: 'Zero-dependency QR codes, generated entirely in the browser.',
    description:
      'A zero-dependency utility that turns any URL or text into a crisp, downloadable QR code entirely in the browser.',
    image: '/assets/images/project-qr.svg',
    tags: ['JavaScript', 'Canvas', 'Responsive'],
    category: 'Web Apps',
    year: '2025',
    role: 'Build',
    demoUrl: null,
    repoUrl: 'https://github.com/codewithsayak',
    featured: false,
    features: [
      'Instant generation with no network requests',
      'Adjustable size, colour and error-correction level',
      'Download as PNG or SVG',
    ],
  },
  {
    id: 4,
    index: '04',
    title: 'Mini Code Playground',
    short: 'A browser editor for HTML, CSS and JS with sandboxed preview.',
    description:
      'A browser-based editor for HTML, CSS and JavaScript with a sandboxed live preview and auto-run.',
    image: '/assets/images/project-playground.svg',
    tags: ['JavaScript', 'iframe API', 'ES6+'],
    category: 'Dev Tools',
    year: '2025',
    role: 'Build',
    demoUrl: null,
    repoUrl: null,
    featured: false,
    features: [
      'Sandboxed iframe preview keeps user code isolated',
      'Auto-run toggle with debounced updates',
      'Panels persist to localStorage between sessions',
    ],
  },
  {
    id: 5,
    index: '05',
    title: 'JavaScript Arcade',
    short: 'A retro brick-breaker with a hand-rolled game loop.',
    description:
      'A retro brick-breaker built from scratch with HTML5 Canvas, requestAnimationFrame and hand-written collision detection.',
    image: '/assets/images/project-arcade.svg',
    tags: ['Canvas', 'Game logic', 'JavaScript'],
    category: 'Games',
    year: '2025',
    role: 'Build',
    demoUrl: null,
    repoUrl: null,
    featured: false,
    features: [
      'Delta-time game loop at a steady 60fps',
      'Axis-aligned collision detection and scoring',
      'Keyboard and touch controls',
    ],
  },
  {
    id: 6,
    index: '06',
    title: 'Orbit Analytics',
    short: 'A metrics dashboard with gradient charts and a calm dark UI.',
    description:
      'A dark-mode analytics dashboard: KPI cards, a scrubbed gradient area chart and a filterable activity table — built to practise information density without visual noise.',
    image: '/assets/images/project-orbit.webp',
    tags: ['React', 'CSS Grid', 'Data viz'],
    category: 'Web Apps',
    year: '2026',
    role: 'Design & build',
    demoUrl: null,
    repoUrl: 'https://github.com/codewithsayak',
    featured: true,
    features: [
      'Dense data presented in a calm, low-contrast visual system',
      'Gradient area chart drawn with SVG paths and CSS variables',
      'Responsive table that collapses into stacked cards on mobile',
      'Keyboard-navigable filters with a visible focus path',
    ],
  },
  {
    id: 7,
    index: '07',
    title: 'Atlas Travel Explorer',
    short: 'A map-first travel planner with layered glass panels.',
    description:
      'A map-first exploration UI: searchable destination list, animated route paths across a stylised map, and glassmorphic detail cards that keep context without hiding the map.',
    image: '/assets/images/project-atlas.webp',
    tags: ['Maps', 'CSS Grid', 'Interaction'],
    category: 'Web Apps',
    year: '2026',
    role: 'Design & build',
    demoUrl: null,
    repoUrl: 'https://github.com/codewithsayak',
    featured: true,
    features: [
      'Two-pane layout that collapses to a list-first flow on mobile',
      'Animated SVG route paths with staggered stroke reveals',
      'Glass panels tuned for legibility over busy map imagery',
      'Filter chips with roving tabindex keyboard support',
    ],
  },
  {
    id: 8,
    index: '08',
    title: 'SaaS Landing Page',
    short: 'A conversion-focused marketing page built on a layout system.',
    description:
      'A conversion-focused marketing page built to practise layout systems, responsive type and accessible components.',
    image: '/assets/images/project-landing.svg',
    tags: ['CSS Grid', 'Flexbox', 'Responsive'],
    category: 'Websites',
    year: '2025',
    role: 'Design & build',
    demoUrl: null,
    repoUrl: null,
    featured: false,
    features: [
      'Mobile-first layout from 320px upward',
      'Fluid typography with clamp()',
      'Accessible navigation, focus states and contrast',
    ],
  },
];

export const skills = [
  {
    category: 'Frontend',
    caption: 'The daily toolkit',
    items: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 92 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'React', level: 80 },
      { name: 'Responsive design', level: 93 },
      { name: 'CSS animations', level: 90 },
      { name: 'DOM manipulation', level: 92 },
      { name: 'Local storage', level: 85 },
    ],
  },
  {
    category: 'Tools & workflow',
    caption: 'How I ship',
    items: [
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 90 },
      { name: 'Browser DevTools', level: 91 },
      { name: 'VS Code', level: 94 },
      { name: 'Vercel', level: 84 },
      { name: 'Figma (basics)', level: 72 },
    ],
  },
  {
    category: 'Currently learning',
    caption: 'Next on the bench',
    items: [
      { name: 'API integration', level: 74 },
      { name: 'Accessibility (WCAG)', level: 78 },
      { name: 'Performance budgets', level: 70 },
      { name: 'Progressive web apps', level: 66 },
    ],
  },
];

export const services = [
  {
    id: '01',
    title: 'Portfolio & personal sites',
    description:
      'A considered, fast-loading site that makes your work easy to read — designed around your story, not a template.',
    deliverables: ['Custom design direction', 'Responsive build', 'Content structure'],
    image: '/assets/images/portfolio.webp',
  },
  {
    id: '02',
    title: 'Landing pages that convert',
    description:
      'Focused, responsive pages for launches and campaigns — clear hierarchy, real content structure and quick load times.',
    deliverables: ['Hero-to-CTA flow', 'Section library', 'Deploy & handoff'],
    image: '/assets/images/project-landing.svg',
  },
  {
    id: '03',
    title: 'Redesigns & frontend fixes',
    description:
      'Modernising an ageing interface: tighter layout, better mobile behaviour, cleaner CSS and accessibility fixes.',
    deliverables: ['Visual audit', 'Refactor', 'Performance pass'],
    image: '/assets/images/gradient.webp',
  },
];

export const journey = [
  {
    year: '2026',
    title: 'Building advanced web apps',
    description:
      'Working on complex frontend applications with a focus on state management, API integration and performance.',
    tag: 'React · Architecture',
  },
  {
    year: 'Mid 2025',
    title: 'Published open-source projects',
    description:
      'Started sharing functional UI components and JavaScript utilities with the developer community on GitHub.',
    tag: 'Open source',
  },
  {
    year: 'Early 2025',
    title: 'Mastered vanilla JavaScript',
    description:
      'Went deep on DOM manipulation, ES6+ features and interactive projects without relying on frameworks.',
    tag: 'JavaScript',
  },
  {
    year: '2024',
    title: 'Explored frontend development',
    description:
      'Learned the fundamentals of HTML, CSS and responsive design, and started turning ideas into real pages.',
    tag: 'Foundations',
  },
];

export const principles = [
  {
    title: 'Accessible by default',
    body: 'Semantic markup, keyboard paths and real focus states are part of the build, not a cleanup task.',
  },
  {
    title: 'Motion with a reason',
    body: 'Animation should explain hierarchy and direction. If it does not help, it does not ship.',
  },
  {
    title: 'Fast is a feature',
    body: 'Lean bundles, lazy media and no unnecessary requests — the site should feel instant on a phone.',
  },
];

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];
