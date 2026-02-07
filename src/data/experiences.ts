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
    role: "Computer Science Student",
    company: "University",
    companyUrl: null,
    location: "Mahdia, Tunisia",
    type: "Student",
    startDate: "2023-09",
    endDate: null,
    description: `
      Continuing academic studies while working on advanced personal projects.
      Focusing on systems programming, compilers, and database architecture.
    `,
    achievements: [
      "Built a custom JavaScript framework from scratch",
      "Developed a disk-based storage engine in Go",
      "Implementing sandboxed code execution environments",
      "Exploring LSM Tree indexing and query optimization",
    ],
    technologies: ["Go", "Nim", "TypeScript", "Node.js", "Docker"],
  },
  {
    id: "exp-2",
    role: "Computer Science Graduate",
    company: "High School of Computer Science",
    companyUrl: null,
    location: "Mahdia, Tunisia",
    type: "Graduate",
    startDate: "2020-09",
    endDate: "2023-06",
    description: `
      Completed fundamental studies in Computer Science.
      Participated in various programming competitions and local hackathons.
    `,
    achievements: [
      "Graduated with honors in Computer Science",
      "Developed several full-stack MERN applications",
      "Mastered core concepts of algorithms and data structures",
      "Contributed to local student tech communities",
    ],
    technologies: ["JavaScript", "SQL", "MERN Stack", "C", "Algorithms"],
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
