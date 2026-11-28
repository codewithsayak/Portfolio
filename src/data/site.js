/**
 * Single content source for the portfolio.
 * All copy belongs to Sayak Karmakar, rebuilt for the v2 dark-motion design.
 */

export const profile = {
  name: "Sayak Karmakar",
  firstName: "Sayak",
  role: "Frontend Developer",
  roles: ["Frontend Developer", "React Developer", "UI Engineer"],
  availability: "Available for junior roles & freelance work",
  tagline: "I build fast, accessible interfaces — and make them move.",
  lede: "A frontend developer from Basirhat, West Bengal, crafting responsive websites and interactive web applications with React, modern JavaScript and careful CSS.",
  about:
    "I'm Sayak — a student and developer who enjoys turning rough ideas into interfaces people actually enjoy using. I build in public, ship small things often, and treat accessibility and performance as part of the design, not an afterthought.",
  location: "Basirhat, West Bengal",
  timezone: "IST · UTC+5:30",
  email: "codewithsayak@gmail.com",
  portrait: "/assets/images/portrait/portrait-720.webp",
  badge: "/assets/images/hero/badge-112.webp",
  badgeSrcSet:
    "/assets/images/hero/badge-112.webp 112w, /assets/images/hero/badge-224.webp 224w",
  facts: [
    { label: "Based in", value: "Basirhat, West Bengal" },
    { label: "Working", value: "Remote friendly" },
    { label: "Replies in", value: "Under 24 hours" },
  ],
};

export const social = {
  github: "https://github.com/codewithsayak",
  instagram: "https://www.instagram.com/code_with_sayak",
  telegram: "https://t.me/codewithsayak",
  email: "mailto:codewithsayak@gmail.com",
};

export const stats = [
  { value: 6, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "", label: "Years learning in public" },
  { value: 100, suffix: "%", label: "Hand-written code" },
  { value: 24, suffix: "h", label: "Average reply time" },
];

export const projects = [
  {
    id: 1,
    index: "01",
    title: "Developer Portfolio",
    short: "A scroll-driven personal site built with React and GSAP.",
    description:
      "A fast, editorial personal site powered by React, Vite and GSAP — scroll-linked motion, a config-driven project index and a fully responsive layout.",
    image: "/assets/images/project-portfolio.svg",
    tags: ["React", "Vite", "GSAP", "Motion"],
    year: "2026",
    demoUrl: "https://codewithsayak.vercel.app/",
    repoUrl: "https://github.com/codewithsayak/Portfolio",
    featured: true,
  },
  {
    id: 2,
    index: "02",
    title: "Gradient Lab",
    short: "An interactive CSS gradient studio with live CSS output.",
    description:
      "Mix colour stops, tune the angle and copy production-ready CSS in one click.",
    image: "/assets/images/projects/gradient-640.webp",
    tags: ["JavaScript", "CSS variables", "DOM"],
    year: "2026",
    repoUrl: "https://github.com/codewithsayak/GRADIENT-LAB",
    featured: true,
  },
  {
    id: 3,
    index: "03",
    title: "Orbit Analytics",
    short: "A metrics dashboard with gradient charts and a calm dark UI.",
    description:
      "KPI cards, a scrubbed gradient area chart and a filterable activity table — built to practise information density without visual noise.",
    image: "/assets/images/projects/orbit-640.webp",
    tags: ["React", "CSS Grid", "Data viz"],
    year: "2026",
    featured: true,
  },
  {
    id: 4,
    index: "04",
    title: "Atlas Travel Explorer",
    short: "A map-first travel planner with layered glass panels.",
    description:
      "Searchable destinations, animated SVG route paths and glass detail cards that keep context without hiding the map.",
    image: "/assets/images/projects/atlas-640.webp",
    tags: ["Maps", "CSS Grid", "Interaction"],
    year: "2026",
    featured: true,
  },
  {
    id: 5,
    index: "05",
    title: "QR Code Generator",
    short: "Zero-dependency QR codes, generated entirely in the browser.",
    description:
      "Turn any URL or text into a crisp, downloadable QR code with no network requests.",
    image: "/assets/images/project-qr.svg",
    tags: ["JavaScript", "Canvas", "Responsive"],
    year: "2025",
    repoUrl: "https://github.com/codewithsayak/QR-Generator",
    featured: false,
  },
  {
    id: 6,
    index: "06",
    title: "Mini Code Playground",
    short: "A browser editor for HTML, CSS and JS with sandboxed preview.",
    description:
      "Auto-run updates in an isolated iframe, with panels that persist between sessions.",
    image: "/assets/images/project-playground.svg",
    tags: ["JavaScript", "iframe API", "ES6+"],
    year: "2025",
    featured: false,
  },
  {
    id: 7,
    index: "07",
    title: "JavaScript Arcade",
    short: "A retro brick-breaker with a hand-rolled game loop.",
    description:
      "Delta-time game loop at 60fps, hand-written collision detection and touch controls.",
    image: "/assets/images/project-arcade.svg",
    tags: ["Canvas", "Game logic", "JavaScript"],
    year: "2025",
    featured: false,
  },
  {
    id: 8,
    index: "08",
    title: "SaaS Landing Page",
    short: "A conversion-focused marketing page built on a layout system.",
    description:
      "Mobile-first from 320px, fluid type, accessible navigation and real focus states.",
    image: "/assets/images/project-landing.svg",
    tags: ["CSS Grid", "Flexbox", "Responsive"],
    year: "2025",
    featured: false,
  },
];

export const skillRows = [
  ["HTML5", "CSS3", "JavaScript", "React", "TypeScript"],
  ["Responsive", "CSS animations", "DOM APIs", "Local storage", "Git"],
  ["Vite", "Figma", "Vercel", "Accessibility", "Performance"],
];

export const skillGroups = [
  { category: "Frontend", caption: "The daily toolkit", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Responsive design"] },
  { category: "Tools & workflow", caption: "How I ship", items: ["Git", "GitHub", "Browser DevTools", "VS Code", "Vercel"] },
  { category: "Currently learning", caption: "Next on the bench", items: ["API integration", "Accessibility (WCAG)", "Performance budgets", "PWAs"] },
];

export const services = [
  {
    id: "01",
    title: "Portfolio & personal sites",
    description:
      "A considered, fast-loading site that makes your work easy to read — designed around your story, not a template.",
    deliverables: ["Custom design direction", "Responsive build", "Content structure"],
  },
  {
    id: "02",
    title: "Landing pages that convert",
    description:
      "Focused, responsive pages for launches and campaigns — clear hierarchy, real content structure and quick load times.",
    deliverables: ["Hero-to-CTA flow", "Section library", "Deploy & handoff"],
  },
  {
    id: "03",
    title: "Redesigns & frontend fixes",
    description:
      "Modernising an ageing interface: tighter layout, better mobile behaviour, cleaner CSS and accessibility fixes.",
    deliverables: ["Visual audit", "Refactor", "Performance pass"],
  },
];

export const journey = [
  { year: "2026", title: "Building advanced web apps", description: "Complex frontend applications with a focus on state, APIs and performance.", tag: "React · Architecture" },
  { year: "Mid 2025", title: "Published open-source projects", description: "Sharing functional UI components and JavaScript utilities on GitHub.", tag: "Open source" },
  { year: "Early 2025", title: "Mastered vanilla JavaScript", description: "DOM manipulation, ES6+ features and interactive projects without frameworks.", tag: "JavaScript" },
  { year: "2024", title: "Explored frontend development", description: "Learned HTML, CSS and responsive design — and started turning ideas into pages.", tag: "Foundations" },
];

export const principles = [
  { title: "Accessible by default", body: "Semantic markup, keyboard paths and real focus states are part of the build, not a cleanup task." },
  { title: "Motion with a reason", body: "Animation should explain hierarchy and direction. If it does not help, it does not ship." },
  { title: "Fast is a feature", body: "Lean bundles, lazy media and no unnecessary requests — the site should feel instant on a phone." },
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];
