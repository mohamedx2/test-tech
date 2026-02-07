# 🎮 Portfolio Full-Stack Gaming-Inspired

Un portfolio moderne avec direction artistique **Cyberpunk Terminal**, construit avec Next.js 14, TypeScript, et des animations avancées.

## ✨ Fonctionnalités

- 🎨 **Direction artistique Cyberpunk** : Thème néon, effets glitch, style terminal
- 🖱️ **Curseur custom** : Point néon avec follower et effets contextuels
- ✨ **Particules animées** : Background Canvas performant
- 📜 **Smooth scroll** : Navigation fluide avec Lenis
- 🎬 **Animations avancées** : Framer Motion pour toutes les transitions
- 📱 **Responsive** : Mobile-first, adapté à tous les écrans
- ♿ **Accessible** : Focus states, semantic HTML, ARIA
- 🔍 **SEO optimisé** : Metadata, Open Graph, structured data
- 📬 **Formulaire connecté** : Intégration n8n pour automatisation
- 🤖 **Réponses IA** : Génération de brouillons avec Groq (optionnel)

## 🛠️ Stack Technique

| Catégorie | Technologies |
|-----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Langage** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Composants** | shadcn/ui |
| **Animations** | Framer Motion |
| **Scroll** | Lenis |
| **Validation** | Zod |
| **Automatisation** | n8n |

## 📁 Structure du Projet

```
src/
├── app/                      # Next.js App Router
│   ├── api/contact/          # API endpoint formulaire
│   ├── globals.css           # Styles + thème Cyberpunk
│   ├── layout.tsx            # Layout racine
│   └── page.tsx              # Page d'accueil
│
├── components/
│   ├── ui/                   # Composants shadcn/ui
│   ├── layout/               # Header, Footer
│   ├── sections/             # Hero, About, Skills, Projects, Experience, Contact
│   └── effects/              # CustomCursor, Particles, ScrollProgress
│
├── lib/
│   ├── utils.ts              # Utilitaires (cn)
│   ├── constants.ts          # Configuration site
│   ├── animations.ts         # Variants Framer Motion
│   └── validations.ts        # Schémas Zod
│
├── hooks/                    # Custom hooks
│   ├── useSmoothScroll.ts
│   ├── useScrollProgress.ts
│   └── useTypingEffect.ts
│
├── data/                     # Données statiques
│   ├── projects.ts
│   ├── skills.ts
│   └── experiences.ts
│
└── types/                    # Types TypeScript
    └── index.ts
```

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou pnpm

### Installation

```bash
# Cloner le repo
git clone https://github.com/username/portfolio.git
cd portfolio

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Build Production

```bash
npm run build
npm run start
```

## ⚙️ Configuration

### 1. Personnaliser le contenu

Modifier les fichiers dans `src/lib/constants.ts` :

```typescript
export const siteConfig = {
  name: "Votre Nom",
  description: "Votre description",
  links: {
    github: "https://github.com/votre-username",
    linkedin: "https://linkedin.com/in/votre-profil",
    email: "votre@email.com",
  },
};
```

### 2. Ajouter vos projets

Éditer `src/data/projects.ts` :

```typescript
export const projects = [
  {
    id: "mon-projet",
    title: "Mon Super Projet",
    description: "Description courte",
    tags: ["React", "TypeScript"],
    // ...
  },
];
```

### 3. Configurer n8n

Voir [docs/N8N_WORKFLOW.md](./docs/N8N_WORKFLOW.md) pour le guide complet.

```env
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/portfolio-contact
```

## 🎨 Personnalisation du Thème

Le thème Cyberpunk est défini dans `src/app/globals.css` :

```css
:root {
  --neon-cyan: oklch(0.85 0.2 195);
  --neon-magenta: oklch(0.7 0.3 330);
  --neon-violet: oklch(0.65 0.25 290);
  --background: oklch(0.07 0.01 270);
}
```

### Alternatives de thème suggérées

- **Retro Arcade** : Jaune `#ffd93d`, Rouge `#ff6b6b`, Bleu `#4ecdc4`
- **RPG Fantasy** : Or `#d4af37`, Bordeaux `#722f37`, Vert `#2d5a27`

## 📹 Démo Vidéo

Pour créer votre démo (2-3 min) :

1. **Intro** (20s) : Présenter le projet
2. **Navigation** (30s) : Parcourir toutes les sections
3. **Interactions** (40s) : Montrer les animations, hover effects
4. **Formulaire** (30s) : Soumettre un message test
5. **n8n** (30s) : Montrer le workflow qui se déclenche
6. **Conclusion** (10s) : Récap stack et lien GitHub

## 🧪 Tests

```bash
# Linter
npm run lint

# Type checking
npm run type-check

# Build test
npm run build
```

## 📦 Déploiement

### Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/portfolio)

### Variables d'environnement à configurer

- `N8N_WEBHOOK_URL` : URL du webhook n8n

## 🔮 Améliorations Possibles

- [ ] Mode clair/sombre toggle
- [ ] Internationalisation (i18n)
- [ ] Blog intégré avec MDX
- [ ] Page projets détaillée
- [ ] Animations 3D avec Three.js
- [ ] Tests E2E avec Playwright
- [ ] Analytics (Plausible/Umami)

## 📝 Checklist Avant Rendu

- [ ] Personnaliser `siteConfig` avec vos informations
- [ ] Remplacer les données projets/expériences
- [ ] Ajouter vos images dans `/public`
- [ ] Configurer le webhook n8n
- [ ] Tester le formulaire de contact
- [ ] Vérifier le responsive sur mobile
- [ ] Valider l'accessibilité (Lighthouse)
- [ ] Déployer sur Vercel
- [ ] Enregistrer la vidéo démo

## 📄 Licence

MIT © [Votre Nom]

---

Construit avec 💜 et beaucoup de ☕
