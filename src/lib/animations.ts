/**
 * ============================================
 * 🎬 VARIANTS D'ANIMATION FRAMER MOTION
 * ============================================
 * 
 * PHILOSOPHIE :
 * Centraliser les animations pour :
 * - Cohérence visuelle
 * - Réutilisabilité
 * - Facilité de modification
 * 
 * TYPES D'ANIMATIONS :
 * 1. Fade : Apparitions subtiles
 * 2. Slide : Mouvements directionnels
 * 3. Scale : Zooms/dézoom
 * 4. Stagger : Animations séquentielles
 * 
 * PERFORMANCE :
 * - Utiliser transform et opacity (GPU accelerated)
 * - Éviter les propriétés qui triggent le layout
 */

import { Variants } from "framer-motion";

// ============================================
// 🌫️ FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

// ============================================
// ➡️ SLIDE ANIMATIONS
// ============================================

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// ============================================
// 🔍 SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { scale: 0.98 },
};

// ============================================
// 📋 STAGGER / CONTAINER ANIMATIONS
// ============================================

/**
 * Container pour animations staggered
 * Usage : Wrapper les éléments enfants qui ont fadeInUp/etc
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// 🎮 ANIMATIONS CYBERPUNK SPÉCIFIQUES
// ============================================

/**
 * Glitch effect pour textes importants
 * Utiliser avec whileHover
 */
export const glitchHover: Variants = {
  initial: { 
    x: 0,
    textShadow: "none"
  },
  hover: {
    x: [0, -2, 2, -1, 1, 0],
    textShadow: [
      "none",
      "-2px 0 #ff00ff, 2px 0 #00fff7",
      "2px 0 #ff00ff, -2px 0 #00fff7",
      "-1px 0 #ff00ff, 1px 0 #00fff7",
      "none"
    ],
    transition: {
      duration: 0.3,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

/**
 * Neon pulse pour boutons/éléments interactifs
 */
export const neonPulse: Variants = {
  initial: {
    boxShadow: "0 0 5px var(--neon-cyan)",
  },
  animate: {
    boxShadow: [
      "0 0 5px var(--neon-cyan)",
      "0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan)",
      "0 0 5px var(--neon-cyan)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Terminal typing effect simulation
 */
export const terminalReveal: Variants = {
  hidden: { 
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    width: "100%",
    transition: {
      duration: 1,
      ease: "linear",
    },
  },
};

// ============================================
// 📱 PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
  },
  animate: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  },
};

// ============================================
// 🎯 SCROLL-TRIGGERED ANIMATIONS
// ============================================

/**
 * Pour les sections qui apparaissent au scroll
 * Utiliser avec whileInView
 */
export const scrollReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
};

// ============================================
// 🔧 HELPER : Créer des variants custom
// ============================================

interface CustomFadeOptions {
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
}

export const createFadeVariant = (options: CustomFadeOptions = {}): Variants => {
  const { 
    direction = "up", 
    distance = 30, 
    duration = 0.6, 
    delay = 0 
  } = options;
  
  const isVertical = direction === "up" || direction === "down";
  const value = direction === "up" || direction === "left" ? distance : -distance;
  
  const hiddenPosition = isVertical ? { y: value } : { x: value };
  const visiblePosition = isVertical ? { y: 0 } : { x: 0 };
  
  return {
    hidden: { 
      opacity: 0, 
      ...hiddenPosition,
    },
    visible: { 
      opacity: 1, 
      ...visiblePosition,
      transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  };
};
