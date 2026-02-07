/**
 * ============================================
 * 💪 DONNÉES DES COMPÉTENCES
 * ============================================
 * 
 * ORGANISATION PAR CATÉGORIES :
 * Plutôt qu'une liste plate, on groupe par domaine.
 * Cela facilite l'affichage et montre la polyvalence.
 * 
 * SYSTÈME DE NIVEAU :
 * - level: 0-100 (représenté en barre de progression)
 * - years: Années d'expérience (crédibilité)
 * 
 * POURQUOI PAS JUSTE DES ICÔNES ?
 * Les recruteurs veulent du contexte, pas juste des logos.
 */

import { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    id: "languages",
    title: "Core Engines",
    icon: "Code",
    description: "Languages & System Design",
    skills: [
      {
        name: "JavaScript / TypeScript",
        level: 95,
        years: 4,
        description: "Advanced patterns, framework internals",
      },
      {
        name: "Go",
        level: 85,
        years: 2,
        description: "Backend systems, custom storage engines",
      },
      {
        name: "Nim",
        level: 75,
        years: 1,
        description: "Systems programming, performance tuning",
      },
      {
        name: "SQL",
        level: 90,
        years: 3,
        description: "Relational DB design & optimization",
      },
      {
        name: "R",
        level: 70,
        years: 1,
        description: "Data analysis & visualization",
      },
    ],
  },
  {
    id: "frontend",
    title: "Aerodynamics",
    icon: "Monitor",
    description: "Frontend & UI/UX",
    skills: [
      {
        name: "React / Next.js",
        level: 95,
        years: 4,
        description: "Full-stack apps, SSR, App Router",
      },
      {
        name: "SolidJS",
        level: 85,
        years: 2,
        description: "Fine-grained reactivity, framework design",
      },
      {
        name: "Tailwind CSS",
        level: 95,
        years: 3,
        description: "Modern design systems, NextUI",
      },
      {
        name: "Framer Motion",
        level: 90,
        years: 2,
        description: "Complex interactions & animations",
      },
    ],
  },
  {
    id: "backend",
    title: "Under the Hood",
    icon: "Server",
    description: "Backend & Systems Architecture",
    skills: [
      {
        name: "Node.js / Bun",
        level: 95,
        years: 4,
        description: "Express.js, custom HTTP servers",
      },
      {
        name: "Database Systems",
        level: 90,
        years: 3,
        description: "LSM Trees, Custom storage engines",
      },
      {
        name: "NextAuth.js / Supabase",
        level: 90,
        years: 2,
        description: "Auth systems & cloud infra",
      },
      {
        name: "MongoDB / MySQL",
        level: 85,
        years: 3,
        description: "Non-relational & relational systems",
      },
    ],
  },
  {
    id: "devops",
    title: "Pit Crew Tools",
    icon: "Settings",
    description: "Infrastructure & Tools",
    skills: [
      {
        name: "Docker",
        level: 90,
        years: 2,
        description: "Containerization & scalability",
      },
      {
        name: "Git & GitHub",
        level: 95,
        years: 5,
        description: "CI/CD, GitHub Actions",
      },
      {
        name: "Linux / VS Code",
        level: 90,
        years: 4,
        description: "Development environment & servers",
      },
    ],
  },
];

// Calcul du niveau global d'une catégorie
export const getCategoryAverageLevel = (categoryId: string): number => {
  const category = skills.find(c => c.id === categoryId);
  if (!category) return 0;

  const total = category.skills.reduce((acc, skill) => acc + skill.level, 0);
  return Math.round(total / category.skills.length);
};

// Toutes les skills en flat pour recherche
export const getAllSkills = () =>
  skills.flatMap(category =>
    category.skills.map(skill => ({
      ...skill,
      category: category.id,
      categoryTitle: category.title,
    }))
  );
