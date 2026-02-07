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
    id: "baraqex",
    title: "Baraqex",
    description: "Modern JavaScript & TypeScript full-stack framework focused on performance (PFE).",
    longDescription: `
      Designed and built a custom framework from scratch to understand web internals.
      - JSX rendering, Server-Side Rendering (SSR), and hydration.
      - File-based routing system.
      - Integrated WebAssembly (Go) modules for performance-critical paths.
      - Custom compiler architecture and runtime.
      Live: baraqex.tech | NPM: baraqex
    `,
    image: "/projects/baraqex.png",
    tags: ["TypeScript", "WASM", "Go", "SSR", "Compiler"],
    links: {
      github: "https://github.com/mohamedx2",
      live: "https://baraqex.tech",
      npm: "https://www.npmjs.com/package/baraqex",
    },
    featured: true,
    category: "fullstack",
  },
  {
    id: "coffre-fort",
    title: "Coffre-Fort Documentaire",
    description: "Enterprise-grade document management system with local AI processing.",
    longDescription: `
      Secure AI platform for document handling.
      - PDF text extraction and document indexing.
      - AI-powered summarization using Ollama (Mistral 7B).
      - Role-based access control (RBAC) and audit logging.
      - Fully Dockerized architecture with optional GPU acceleration.
    `,
    image: "/projects/coffre-fort.png",
    tags: ["AI", "Ollama", "Docker", "Node.js", "Security"],
    links: {
      github: "https://github.com/mohamedx2",
    },
    featured: true,
    category: "fullstack",
  },
  {
    id: "whiteboard-saas",
    title: "Collaborative Whiteboard",
    description: "60 FPS real-time collaborative tool with undo/redo and Redis caching.",
    longDescription: `
      Real-time drawing platform inspired by Excalidraw.
      - WebSocket synchronization using Socket.io.
      - Event-sourcing architecture for full history (undo/redo).
      - PostgreSQL persistence and snapshots.
      - High-performance 60 FPS canvas engine.
    `,
    image: "/projects/whiteboard.png",
    tags: ["Socket.io", "Redis", "PostgreSQL", "Event Sourcing"],
    links: {
      github: "https://github.com/mohamedx2",
    },
    featured: true,
    category: "fullstack",
  },
  {
    id: "n8n-generator",
    title: "N8N Project Generator",
    description: "AI tool converting natural language into ready-to-run n8n workflows.",
    longDescription: `
      Developer productivity tool for automation.
      - Generates n8n workflow JSON from text.
      - Auto-creates Docker Compose and environment setups.
      - Power by local LLM inference via Ollama (LLaMA 3).
    `,
    image: "/projects/n8n-gen.png",
    tags: ["AI", "n8n", "Automation", "Ollama", "Docker"],
    links: {
      github: "https://github.com/mohamedx2",
    },
    featured: true,
    category: "backend",
  },
  {
    id: "ecommerce",
    title: "Modern E-Commerce",
    description: "Production-ready solution with inventory management and analytics.",
    longDescription: `
      Complete e-commerce platform with a focus on performance.
      - Advanced product & inventory management.
      - Stripe/Payment integration.
      - Admin panel with analytics dashboards.
      - Secure authentication and role management.
    `,
    image: "/projects/ecommerce.png",
    tags: ["Next.js", "Stripe", "Auth", "Dashboard"],
    links: {
      github: "https://github.com/mohamedx2",
      live: "https://ecommerce-ruddy-psi.vercel.app",
    },
    featured: true,
    category: "fullstack",
  },
  {
    id: "dbgo",
    title: "DBGO",
    description: "Lightweight database engine implemented in Go with ACID support.",
    longDescription: `
      Custom storage engine focusing on performance and core database concepts.
      - ACID transaction support.
      - REST API interface.
      - High-performance indexing.
      - Native Go implementation.
    `,
    image: "/projects/dbgo.png",
    tags: ["Go", "Database", "ACID", "Backend"],
    links: {
      github: "https://github.com/mohamedx2",
      live: "https://dbgo.vercel.app",
    },
    featured: true,
    category: "backend",
  },
  {
    id: "hamroun-express",
    title: "hamroun-express",
    description: "Minimal backend framework inspired by Express.js for learning internals.",
    longDescription: `
      Custom routing engine and middleware system.
      - Built to understand the internal architecture of Node.js servers.
      - Extensible plugin system.
      - Minimal footprint and zero dependencies.
    `,
    image: "/projects/express.png",
    tags: ["Node.js", "Framework", "HTTP", "Internals"],
    links: {
      github: "https://github.com/mohamedx2/hamroun-express",
    },
    featured: false,
    category: "backend",
  },
  {
    id: "online-compiler",
    title: "Online Compiler (French Syntax)",
    description: "Educational compiler translating French pseudocode into C.",
    longDescription: `
      Language processing tool for learning logic.
      - Custom compiler logic and tokenization.
      - Secure code execution via GCC in isolated environment.
      - Web-based interactive interface.
    `,
    image: "/projects/compiler-fr.png",
    tags: ["Compiler", "C", "Logic", "Flask"],
    links: {
      github: "https://github.com/mohamedx2",
      live: "https://online-compiler-flask.onrender.com",
    },
    featured: false,
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
