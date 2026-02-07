/**
 * ============================================
 * 📊 DONNÉES DES PROJETS
 * ============================================
 * 
 * POURQUOI SÉPARER LES DONNÉES ?
 * - Facilite la maintenance (modifier sans toucher aux composants)
 * - Permet l'import dynamique si besoin
 * - Prépare une future migration vers CMS/API
 * - Rend le code plus testable
 * 
 * STRUCTURE D'UN PROJET :
 * - id: Identifiant unique pour les keys React
 * - title: Nom du projet
 * - description: Description courte (max 2 lignes)
 * - longDescription: Description détaillée pour modal/page
 * - image: Path vers l'image (dans /public)
 * - tags: Technologies utilisées
 * - links: URLs (github, live, etc.)
 * - featured: Mis en avant sur la homepage
 * - category: Pour le filtrage
 */

import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "CyberDash",
    description: "Dashboard analytics temps réel avec visualisations 3D et WebGL",
    longDescription: `
      Application de monitoring en temps réel développée pour une startup fintech.
      Gère plus de 10,000 requêtes/minute avec des visualisations interactives.
      
      Défis techniques relevés :
      - Optimisation des re-renders avec React.memo et useMemo
      - WebSocket pour les mises à jour en temps réel
      - Canvas 2D/WebGL pour les graphiques haute performance
    `,
    image: "/projects/cyberdash.png",
    tags: ["React", "TypeScript", "D3.js", "WebGL", "Node.js"],
    links: {
      github: "https://github.com/username/cyberdash",
      live: "https://cyberdash-demo.vercel.app",
    },
    featured: true,
    category: "fullstack",
  },
  {
    id: "project-2",
    title: "NeonChat",
    description: "Application de messagerie E2E encrypted avec interface gaming",
    longDescription: `
      Messagerie sécurisée inspirée de l'esthétique cyberpunk.
      Chiffrement de bout en bout avec libsodium.
      
      Points forts :
      - Architecture microservices
      - WebRTC pour les appels vidéo
      - PWA avec notifications push
    `,
    image: "/projects/neonchat.png",
    tags: ["Next.js", "Socket.io", "PostgreSQL", "Redis", "WebRTC"],
    links: {
      github: "https://github.com/username/neonchat",
      live: "https://neonchat.app",
    },
    featured: true,
    category: "fullstack",
  },
  {
    id: "project-3",
    title: "PixelForge",
    description: "Éditeur de sprites en ligne avec export multi-format",
    longDescription: `
      Outil de création de pixel art collaboratif en temps réel.
      Inspiré par Aseprite mais accessible depuis le navigateur.
      
      Fonctionnalités :
      - Canvas optimisé avec OffscreenCanvas
      - Calques et animations
      - Export PNG, GIF, spritesheet
    `,
    image: "/projects/pixelforge.png",
    tags: ["TypeScript", "Canvas API", "Zustand", "Vite"],
    links: {
      github: "https://github.com/username/pixelforge",
    },
    featured: false,
    category: "frontend",
  },
  {
    id: "project-4",
    title: "APIForge",
    description: "Générateur d'API REST/GraphQL à partir de schémas JSON",
    longDescription: `
      CLI et interface web pour scaffolder des APIs complètes.
      Génère routes, validations, documentation automatiquement.
      
      Stack générée :
      - Express/Fastify ou Hono
      - Prisma ORM
      - OpenAPI/Swagger docs
    `,
    image: "/projects/apiforge.png",
    tags: ["Node.js", "CLI", "Prisma", "OpenAPI"],
    links: {
      github: "https://github.com/username/apiforge",
      npm: "https://npmjs.com/package/apiforge",
    },
    featured: true,
    category: "backend",
  },
];

// Helper pour récupérer les projets featured
export const getFeaturedProjects = () => 
  projects.filter(p => p.featured);

// Helper pour filtrer par catégorie
export const getProjectsByCategory = (category: Project["category"]) =>
  projects.filter(p => p.category === category);

// Catégories disponibles
export const projectCategories = [
  { id: "all", label: "Tous" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
] as const;
