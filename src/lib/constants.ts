/**
 * ============================================
 * ⚙️ CONSTANTES DU SITE
 * ============================================
 * 
 * POURQUOI CENTRALISER ?
 * - Modification en un seul endroit
 * - Cohérence garantie
 * - Typage automatique
 */

import { NavItem, SiteConfig, SocialLink } from "@/types";

// ============================================
// 🌐 CONFIGURATION GÉNÉRALE
// ============================================

export const siteConfig: SiteConfig = {
  name: "Mohamed Ali Hamroun",
  description: "Computer Science student & Full-Stack Developer passionate about building frameworks, backend systems, and developer tools from scratch.",
  url: "https://mohamedalihamroun.me",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/mohamedx2",
    linkedin: "https://www.linkedin.com/in/mohamed-ali-hamroun-486573314/",
    email: "hamroun1969@gmail.com",
  },
};

// ============================================
// 🧭 NAVIGATION
// ============================================

export const navItems: NavItem[] = [
  { label: "Race Start", href: "#hero", icon: "Home" },
  { label: "Driver Info", href: "#about", icon: "User" },
  { label: "Power-ups", href: "#skills", icon: "Zap" },
  { label: "Grand Prix", href: "#projects", icon: "Folder" },
  { label: "Career Track", href: "#experience", icon: "Briefcase" },
  { label: "Pit Stop", href: "#contact", icon: "Mail" },
];

// ============================================
// 🔗 RÉSEAUX SOCIAUX
// ============================================

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: siteConfig.links.github, icon: "Github" },
  { platform: "LinkedIn", url: siteConfig.links.linkedin, icon: "Linkedin" },
  ...(siteConfig.links.twitter
    ? [{ platform: "Twitter", url: siteConfig.links.twitter, icon: "Twitter" }]
    : []),
];

// ============================================
// 🎨 THÈME
// ============================================

export const theme = {
  colors: {
    neonCyan: "#00fff7",
    neonMagenta: "#ff00ff",
    neonViolet: "#8b5cf6",
    neonGreen: "#00ff88",
    background: "#0a0a0f",
  },
  fonts: {
    heading: "'Orbitron', sans-serif",
    body: "'JetBrains Mono', monospace",
  },
  transitions: {
    fast: "150ms ease",
    normal: "300ms ease",
    slow: "500ms ease",
  },
} as const;

// ============================================
// 📧 CONTACT / N8N
// ============================================

export const contactConfig = {
  // URL du webhook n8n (à configurer après déploiement n8n)
  webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "",

  // Limites du formulaire
  maxMessageLength: 2000,
  maxNameLength: 100,
  maxSubjectLength: 200,

  // Messages de feedback
  messages: {
    success: "Message envoyé avec succès ! Je vous répondrai dans les 24h.",
    error: "Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.",
    validation: {
      nameRequired: "Le nom est requis",
      emailRequired: "L'email est requis",
      emailInvalid: "Format d'email invalide",
      messageRequired: "Le message est requis",
      messageTooLong: "Le message est trop long (max 2000 caractères)",
    },
  },
} as const;

// ============================================
// 🎮 TEXTES HERO / ABOUT
// ============================================

export const heroContent = {
  greeting: "Ready to Race?",
  name: siteConfig.name,
  tagline: "Full-Stack Developer & Framework Builder",
  description: `
    I build frameworks, backend systems, and developer tools from scratch. 
    Exploring the core of tech: databases, runtimes, and system design.
  `,
  cta: {
    primary: { label: "START RACE", href: "#projects" },
    secondary: { label: "PIT STOP", href: "#contact" },
  },
};

export const aboutContent = {
  title: "Driver Bio",
  subtitle: "Who is under the helmet?",
  paragraphs: [
    `Hi, I’m Mohamed Ali Hamroun, a Computer Science student and Full-Stack Developer with a strong passion for building frameworks, backend systems, and developer tools from scratch.`,
    `I enjoy working close to the core of technology: databases, runtimes, compilers, backend frameworks, and system design. I don’t just use tools—I like to understand how they work internally and sometimes rebuild them to learn deeply.`,
    `I love learning by building — from full-stack apps to my own JavaScript framework and a custom database engine.`
  ],
  stats: [
    { label: "Engine Specs", value: "Go, Nim, TypeScript, Node.js" },
    { label: "Championships", value: "Full-Stack, Frameworks, DBs" },
    { label: "Tuning", value: "Docker, Bun, Linux, CI/CD" },
    { label: "Nitro", value: "Passionate & Fast Learner" },
  ],
};
