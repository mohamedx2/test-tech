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
  name: "John Doe", // ← PERSONNALISER
  description: "Développeur Full-Stack passionné par les interfaces innovantes et les architectures robustes.",
  url: "https://johndoe.dev", // ← PERSONNALISER
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/johndoe", // ← PERSONNALISER
    linkedin: "https://linkedin.com/in/johndoe", // ← PERSONNALISER
    twitter: "https://twitter.com/johndoe", // ← OPTIONNEL
    email: "contact@johndoe.dev", // ← PERSONNALISER
  },
};

// ============================================
// 🧭 NAVIGATION
// ============================================

export const navItems: NavItem[] = [
  { label: "Accueil", href: "#hero", icon: "Home" },
  { label: "À propos", href: "#about", icon: "User" },
  { label: "Compétences", href: "#skills", icon: "Zap" },
  { label: "Projets", href: "#projects", icon: "Folder" },
  { label: "Expérience", href: "#experience", icon: "Briefcase" },
  { label: "Contact", href: "#contact", icon: "Mail" },
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
  greeting: "Bienvenue dans le terminal_",
  name: siteConfig.name,
  tagline: "Full-Stack Developer",
  description: `
    Je construis des applications web modernes, 
    performantes et mémorables.
  `,
  cta: {
    primary: { label: "Voir mes projets", href: "#projects" },
    secondary: { label: "Me contacter", href: "#contact" },
  },
};

export const aboutContent = {
  title: "About Me",
  subtitle: "Qui suis-je ?",
  paragraphs: [
    `Hi, I’m Mohamed Ali Hamroun, a Full-Stack Developer and Computer Science student with a strong passion for building modern web applications, backend frameworks, and developer tools.`,
    `I enjoy working close to the metal when needed (databases, servers, compilers), and high-level when it matters (DX, UI, scalability). I’m especially interested in framework design, database systems, and system-level programming.`,
    `I love learning by building — from full-stack apps to my own JavaScript framework and a custom database engine.`
  ],
  stats: [
    { label: "Programming Languages", value: "JavaScript/TypeScript, Go, Nim, SQL, R, C (basic), .NET (basic)" },
    { label: "Frontend", value: "React, Next.js, SolidJS, Tailwind CSS, Framer Motion, Custom State Libraries" },
    { label: "Backend", value: "Node.js, Express.js, Bun, NextAuth.js, Supabase, MongoDB, MySQL" },
    { label: "DevOps & Tools", value: "Docker, Git, GitHub Actions, Linux, VS Code" },
  ],
};
