/**
 * ============================================
 * 📝 TYPES TYPESCRIPT DU PROJET
 * ============================================
 * 
 * POURQUOI UN FICHIER CENTRALISÉ ?
 * - Single source of truth pour les types
 * - Évite la duplication
 * - Facilite les refactors
 * - Auto-complétion dans tout le projet
 * 
 * CONVENTIONS :
 * - PascalCase pour les types/interfaces
 * - Préfixer les props avec le nom du composant
 * - Exporter tout depuis index.ts
 */

// ============================================
// 🎨 PROJETS
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
    npm?: string;
    demo?: string;
  };
  featured: boolean;
  category: "fullstack" | "frontend" | "backend" | "mobile" | "other";
}

// ============================================
// 💪 COMPÉTENCES
// ============================================

export interface Skill {
  name: string;
  level: number; // 0-100
  years: number;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // Nom de l'icône Lucide
  description: string;
  skills: Skill[];
}

// ============================================
// 💼 EXPÉRIENCES
// ============================================

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl: string | null;
  location: string;
  type: "CDI" | "CDD" | "Alternance" | "Stage" | "Freelance" | "Student" | "Graduate";
  startDate: string; // Format: YYYY-MM
  endDate: string | null; // null = poste actuel
  description: string;
  achievements: string[];
  technologies: string[];
}

// ============================================
// 📬 CONTACT
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  message: string | null;
}

// ============================================
// 🎮 NAVIGATION
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// ============================================
// 🌐 METADATA / SEO
// ============================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
  };
}

// ============================================
// 🎭 ANIMATIONS
// ============================================

export interface AnimationVariant {
  hidden: object;
  visible: object;
  exit?: object;
}

// ============================================
// 📱 RESPONSIVE
// ============================================

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

// ============================================
// 🔧 UTILITAIRES
// ============================================

// Pour les composants qui acceptent className
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Pour les composants avec ref forwarding
export type PropsWithRef<T, P = object> = P & {
  ref?: React.Ref<T>;
};
