import React from 'react';
import { 
  Code2, 
  Palette, 
  ShoppingCart, 
  Zap, 
  Search, 
  ShieldCheck, 
  Server, 
  RefreshCcw 
} from 'lucide-react';
import { Service, NavLink, ProcessStep, TeamMember } from './types';

export const COLORS = {
  primary: '#09090b', // zinc-950
  accent: '#22d3ee', // cyan-400
  silver: '#a1a1aa', // zinc-400
  white: '#fafafa', // zinc-50
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', path: '/#services' },
  { label: 'Team', path: '/#team' },
  { label: 'About', path: '/about' },
  { label: 'Process', path: '/#process' },
  { label: 'Contact', path: '/contact' },
];

export const TEAM: TeamMember[] = [
  {
    id: 'saad-ali',
    name: 'Saad Ali',
    role: 'Founder & Creative Lead',
    specialization: 'Fullstack Developer / UI/UX Designer / Motion Graphics / 3D Designer',
    bio: 'The visionary architect behind White Wolf. Saad blends technical engineering with high-fidelity artistic expression to build digital worlds.',
    skills: ['Fullstack Engineering', 'Advanced UI/UX Architecture', 'Motion Design Systems', '3D Modeling & Rendering', 'Brand Strategy'],
    contact: '+923182618064',
    image: 'https://cdn1.naekranie.pl/media/cache/amp/2025/03/sololeveling_67e132251bea4.webp'
  },
  {
    id: 'nizam-aslam',
    name: 'Nizam Aslam',
    role: 'CO-founder & Technical Executive',
    specialization: 'Backend Developer & Support / Maintenance Executive',
    bio: 'The bedrock of our technical operations. Nizam ensures the stability and scalability of every infrastructure we deploy.',
    skills: ['Backend Systems Design', 'Infrastructure Management', 'Database Optimization', 'Server Maintenance', 'System Security'],
    contact: '+923192631718',
    image: 'https://i.pinimg.com/736x/d4/69/49/d469498d11bed69e289d8dacc8b7eae9.jpg'
  },
  {
    id: 'areeb-ahmed',
    name: 'Areeb Ahmed',
    role: 'Visual Engineer',
    specialization: 'Motion Graphics / 3D Designer & Frontend Developer',
    bio: 'Bridging the gap between static code and dynamic motion. Areeb creates the fluid interactions that define our premium feel.',
    skills: ['3D Visuals', 'Motion Graphics', 'Frontend Development', 'GSAP Animations', 'Visual Storytelling'],
    contact: '+923122963474',
    image: 'https://i.pinimg.com/736x/2d/f4/0a/2df40a6aac44a771fca5602db3bc22b5.jpg'
  },
  {
    id: 'sameer-ali',
    name: 'Sameer Ali',
    role: 'Quality & Design Strategist',
    specialization: 'UI/UX Designer & QA / Tester',
    bio: 'Uncompromising when it comes to quality. Sameer ensures every pixel is perfect and every interaction is flawless before launch.',
    skills: ['UI/UX Design', 'Quality Assurance', 'End-to-End Testing', 'User Research', 'Performance Auditing'],
    contact: '+923119581678',
    image: 'https://i1.sndcdn.com/avatars-Nitl4kYXYRb4Pc7y-apgxOA-t1080x1080.jpg'
  },
  {
    id: 'sayed-hasban',
    name: 'Sayed Hasban',
    role: 'Communications Director',
    specialization: 'Content / Copywriter & Sales Executive',
    bio: 'The voice of the wolf. Sayed crafts the narratives that convert visitors into partners and drives the agency\'s growth.',
    skills: ['Strategic Copywriting', 'Sales Operations', 'Content Strategy', 'Client Relations', 'Narrative Engineering'],
    contact: '+923408685988',
    image: 'https://static.wikitide.net/deathbattlewiki/7/7f/Portrait.yujiitadori.png'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'web-design-dev',
    title: 'Web Design & Development',
    shortDescription: 'High-performance, bespoke web experiences engineered for scale.',
    fullDescription: 'We build digital flagship stores. Our approach combines rigorous engineering with cutting-edge design to create websites that aren\'t just beautiful—they\'re powerful business engines.',
    benefits: [
      'Custom React-based architecture',
      'Lightning-fast load times',
      'Scalable cloud infrastructure',
      'Mobile-first responsive design'
    ],
    process: [
      { step: 'Discovery', description: 'Deep dive into business goals and technical requirements.' },
      { step: 'Architecture', description: 'Designing the structural backbone and data flow.' },
      { step: 'Development', description: 'Agile coding with continuous integration.' },
      { step: 'Launch', description: 'Rigorous testing and orchestrated deployment.' }
    ],
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    icon: 'Code2',
    path: '/services/web-design-dev',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDescription: 'Intuitive user journeys defined by clarity and strategic elegance.',
    fullDescription: 'User experience is the bridge between technology and loyalty. We design interfaces that anticipate user needs and deliver effortless interaction.',
    benefits: [
      'Human-centric design patterns',
      'High-fidelity prototyping',
      'Accessibility compliance (WCAG)',
      'Conversion rate optimization'
    ],
    process: [
      { step: 'Research', description: 'User persona development and empathy mapping.' },
      { step: 'Wireframing', description: 'Low-fidelity skeletal frameworks.' },
      { step: 'Design', description: 'High-fidelity visual systems and components.' },
      { step: 'Prototyping', description: 'Interactive testing of the final flow.' }
    ],
    tools: ['Figma', 'Adobe Creative Cloud', 'Protopie', 'Webflow'],
    icon: 'Palette',
    path: '/services/ui-ux-design',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Development',
    shortDescription: 'Robust online storefronts built to drive revenue and customer loyalty.',
    fullDescription: 'We architect e-commerce platforms that handle high volume with grace. From complex product variants to secure payment integrations, we cover it all.',
    benefits: [
      'Seamless payment gateways',
      'Advanced inventory management',
      'Custom checkout experiences',
      'Secure customer accounts'
    ],
    process: [
      { step: 'Inventory Audit', description: 'Mapping out product architecture.' },
      { step: 'Platform Choice', description: 'Selecting Shopify, headless CMS, or custom.' },
      { step: 'Integration', description: 'Connecting ERPs and payment processors.' },
      { step: 'QA', description: 'End-to-end transaction testing.' }
    ],
    tools: ['Shopify', 'Stripe', 'Sanity.io', 'Node.js'],
    icon: 'ShoppingCart',
    path: '/services/ecommerce',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'optimization',
    title: 'Performance Optimization',
    shortDescription: 'Eliminating latency to provide a seamless, high-speed user experience.',
    fullDescription: 'Speed is a feature. We audit your existing stack and apply advanced optimization techniques to reach the legendary 100/100 Lighthouse score.',
    benefits: [
      'Sub-second initial load',
      'Optimized Core Web Vitals',
      'Better Search Rankings',
      'Reduced bounce rates'
    ],
    process: [
      { step: 'Audit', description: 'Deep analysis of current performance bottlenecks.' },
      { step: 'Compression', description: 'Asset and code-level minification.' },
      { step: 'Caching', description: 'Implementing edge caching strategies.' },
      { step: 'Monitor', description: 'Real-time performance tracking.' }
    ],
    tools: ['Google Lighthouse', 'Vercel Analytics', 'Cloudflare', 'Sharp'],
    icon: 'Zap',
    path: '/services/performance-optimization',
    image: 'https://www.advancedtech.com/wp-content/uploads/2023/11/What-is-Asset-Performance-Optimization_Image-1_1200x628.jpg'
  },
  {
    id: 'seo-technical',
    title: 'SEO & Technical Optimization',
    shortDescription: 'Ensuring your brand is discovered by the right audience at the right time.',
    fullDescription: 'SEO isn\'t just keywords. It\'s technical excellence. We optimize your metadata, site structure, and semantic HTML for maximum visibility.',
    benefits: [
      'Semantic HTML structure',
      'Schema markup implementation',
      'Dynamic XML sitemaps',
      'Keyword authority strategy'
    ],
    process: [
      { step: 'Audit', description: 'Crawling site for indexing issues.' },
      { step: 'On-Page', description: 'Optimizing tags, titles, and alt text.' },
      { step: 'Technical', description: 'Fixing canonicals and redirects.' },
      { step: 'Content', description: 'Building a strategic internal linking map.' }
    ],
    tools: ['Ahrefs', 'Semrush', 'Search Console', 'Schema.org'],
    icon: 'Search',
    path: '/services/seo-technical',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    shortDescription: 'Long-term reliability and security for your digital assets.',
    fullDescription: 'The launch is just the beginning. Our maintenance programs ensure your site stays secure, updated, and bug-free 24/7.',
    benefits: [
      '24/7 Uptime monitoring',
      'Security patch updates',
      'Monthly performance reports',
      'Priority bug fixes'
    ],
    process: [
      { step: 'Setup', description: 'Installing proactive monitoring tools.' },
      { step: 'Updates', description: 'Scheduled weekly security audits.' },
      { step: 'Backups', description: 'Daily automated cloud backups.' },
      { step: 'Support', description: 'Direct slack channel for rapid response.' }
    ],
    tools: ['Sentry', 'New Relic', 'Datadog', 'Slack'],
    icon: 'ShieldCheck',
    path: '/services/maintenance',
    image: 'https://bairesdev.mo.cloudinary.net/blog/2023/10/IT-Maintenance-Support.jpg'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { title: 'Discovery', description: 'We analyze your market position, challenges, and objectives to form a strategic roadmap.' },
  { title: 'Strategy', description: 'A tailored plan focusing on technical architecture and user-centric design principles.' },
  { title: 'Execution', description: 'Our engineers and designers work in tight feedback loops to build your vision.' },
  { title: 'Deployment', description: 'A seamless transition to a live environment with global CDN distribution.' },
  { title: 'Evolution', description: 'Continuous monitoring and optimization to ensure long-term market leadership.' },
];

export const ICON_MAP: Record<string, any> = {
  Code2,
  Palette,
  ShoppingCart,
  Zap,
  Search,
  ShieldCheck,
  Server,
  RefreshCcw,
};