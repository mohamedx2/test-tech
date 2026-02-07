/* ============================================
   📁 STRUCTURE DU PROJET PORTFOLIO
   ============================================
   
   src/
   ├── app/                      # Next.js App Router
   │   ├── globals.css           # Styles globaux + thème Cyberpunk
   │   ├── layout.tsx            # Layout racine
   │   ├── page.tsx              # Page d'accueil (landing)
   │   ├── api/
   │   │   └── contact/
   │   │       └── route.ts      # API endpoint pour formulaire
   │   └── (sections)/           # Route groups pour sections
   │
   ├── components/
   │   ├── ui/                   # Composants shadcn/ui
   │   ├── layout/               # Header, Footer, Navigation
   │   ├── sections/             # Hero, About, Skills, Projects, Contact
   │   ├── shared/               # Composants réutilisables
   │   └── effects/              # Effets visuels (cursor, particles)
   │
   ├── lib/
   │   ├── utils.ts              # Utilitaires (cn, etc.)
   │   ├── constants.ts          # Constantes du site
   │   ├── animations.ts         # Variants Framer Motion
   │   └── validations.ts        # Schémas Zod
   │
   ├── hooks/                    # Custom hooks
   │   ├── useScrollProgress.ts
   │   ├── useSmoothScroll.ts
   │   └── useTypingEffect.ts
   │
   ├── data/                     # Données statiques
   │   ├── projects.ts
   │   ├── skills.ts
   │   └── experiences.ts
   │
   └── types/                    # Types TypeScript
       └── index.ts

   ============================================ */
