/**
 * ============================================
 * 💼 DONNÉES DES EXPÉRIENCES
 * ============================================
 * 
 * FORMAT CHRONOLOGIQUE INVERSÉ :
 * Les expériences les plus récentes en premier.
 * 
 * STORYTELLING :
 * Chaque expérience doit raconter une histoire :
 * - Contexte : Où ? Quand ?
 * - Défi : Quel problème résoudre ?
 * - Action : Qu'as-tu fait concrètement ?
 * - Résultat : Quel impact mesurable ?
 */

import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Développeur Full-Stack",
    company: "TechStartup Inc.",
    companyUrl: "https://techstartup.example.com",
    location: "Paris, France",
    type: "CDI",
    startDate: "2023-09",
    endDate: null, // null = poste actuel
    description: `
      Lead technique sur le produit principal de la startup.
      Refonte complète de l'architecture frontend.
    `,
    achievements: [
      "Migration de Create React App vers Next.js 14 : -40% temps de chargement",
      "Mise en place CI/CD avec GitHub Actions : déploiements automatisés",
      "Mentorat de 2 développeurs juniors",
      "Implémentation du design system avec shadcn/ui",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],
  },
  {
    id: "exp-2",
    role: "Développeur Frontend",
    company: "AgenceWeb Studio",
    companyUrl: "https://agenceweb.example.com",
    location: "Lyon, France",
    type: "CDI",
    startDate: "2021-06",
    endDate: "2023-08",
    description: `
      Développement d'applications web pour clients variés (e-commerce, SaaS, corporate).
      Collaboration étroite avec designers et chefs de projet.
    `,
    achievements: [
      "Livraison de 15+ projets clients dans les délais",
      "Création de composants réutilisables : -30% temps de développement",
      "Formation équipe sur React et TypeScript",
      "Optimisation performances : Core Web Vitals au vert",
    ],
    technologies: ["React", "Vue.js", "SCSS", "WordPress", "Shopify"],
  },
  {
    id: "exp-3",
    role: "Développeur Web Junior",
    company: "Freelance",
    companyUrl: null,
    location: "Remote",
    type: "Freelance",
    startDate: "2020-01",
    endDate: "2021-05",
    description: `
      Premiers pas en tant que développeur indépendant.
      Sites vitrines, landing pages, intégrations.
    `,
    achievements: [
      "Constitution d'un portfolio de 10+ clients satisfaits",
      "Auto-formation intensive (React, Node.js, bases de données)",
      "Gestion complète des projets : devis, développement, livraison",
    ],
    technologies: ["HTML/CSS", "JavaScript", "PHP", "WordPress"],
  },
];

// Helper pour formater les dates
export const formatExperiencePeriod = (exp: Experience): string => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
  };
  
  const start = formatDate(exp.startDate);
  const end = exp.endDate ? formatDate(exp.endDate) : "Présent";
  
  return `${start} — ${end}`;
};

// Calcul de la durée totale d'expérience
export const getTotalExperienceYears = (): number => {
  const firstExp = experiences[experiences.length - 1];
  const startDate = new Date(firstExp.startDate);
  const now = new Date();
  
  return Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
};
