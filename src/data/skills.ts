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
    id: "frontend",
    title: "Frontend",
    icon: "Monitor", // Lucide icon name
    description: "Interfaces modernes et performantes",
    skills: [
      {
        name: "React / Next.js",
        level: 95,
        years: 4,
        description: "SSR, App Router, Server Components",
      },
      {
        name: "TypeScript",
        level: 90,
        years: 3,
        description: "Types avancés, génériques, utility types",
      },
      {
        name: "Tailwind CSS",
        level: 95,
        years: 3,
        description: "Design systems, animations custom",
      },
      {
        name: "Framer Motion",
        level: 85,
        years: 2,
        description: "Animations complexes, gestures, layout animations",
      },
      {
        name: "Three.js / WebGL",
        level: 70,
        years: 1,
        description: "Scènes 3D, shaders basiques",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    description: "APIs robustes et scalables",
    skills: [
      {
        name: "Node.js",
        level: 90,
        years: 4,
        description: "Express, Fastify, Hono",
      },
      {
        name: "Python",
        level: 75,
        years: 2,
        description: "FastAPI, scripts d'automatisation",
      },
      {
        name: "PostgreSQL",
        level: 85,
        years: 3,
        description: "Optimisation requêtes, indexes, migrations",
      },
      {
        name: "Prisma ORM",
        level: 90,
        years: 2,
        description: "Schémas, relations, migrations",
      },
      {
        name: "GraphQL",
        level: 80,
        years: 2,
        description: "Apollo, schema-first design",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: "Settings",
    description: "Déploiement et automatisation",
    skills: [
      {
        name: "Docker",
        level: 80,
        years: 2,
        description: "Containerisation, docker-compose",
      },
      {
        name: "Git / GitHub",
        level: 95,
        years: 5,
        description: "Branching strategies, CI/CD, Actions",
      },
      {
        name: "Vercel / Railway",
        level: 90,
        years: 3,
        description: "Déploiement, preview deployments",
      },
      {
        name: "n8n / Automatisation",
        level: 75,
        years: 1,
        description: "Workflows, intégrations API",
      },
    ],
  },
  {
    id: "soft",
    title: "Soft Skills",
    icon: "Users",
    description: "Au-delà du code",
    skills: [
      {
        name: "Communication",
        level: 90,
        years: 5,
        description: "Vulgarisation technique, documentation",
      },
      {
        name: "Travail d'équipe",
        level: 95,
        years: 5,
        description: "Code reviews, pair programming, mentorat",
      },
      {
        name: "Résolution de problèmes",
        level: 90,
        years: 5,
        description: "Debugging, architecture, trade-offs",
      },
      {
        name: "Veille technologique",
        level: 85,
        years: 5,
        description: "Curiosité, adaptabilité, apprentissage continu",
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
