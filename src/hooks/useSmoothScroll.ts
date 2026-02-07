/**
 * ============================================
 * 🪝 HOOK : useSmoothScroll
 * ============================================
 * 
 * POURQUOI LENIS ?
 * - Smooth scroll natif CSS ne fonctionne pas partout
 * - Lenis offre un contrôle fin sur l'inertie
 * - Meilleure intégration avec Framer Motion
 * - Possibilité de pauser/reprendre le scroll
 * 
 * USAGE :
 * Appeler une seule fois dans le layout racine.
 * Le hook s'occupe de l'initialisation et du cleanup.
 */

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface UseSmoothScrollOptions {
  /** Durée du scroll (plus = plus lent) */
  duration?: number;
  /** Type d'easing */
  easing?: (t: number) => number;
  /** Désactiver sur mobile */
  disableOnMobile?: boolean;
  /** Direction du scroll */
  orientation?: "vertical" | "horizontal";
}

// Easing par défaut - très smooth, naturel
const defaultEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const {
    duration = 1.2,
    easing = defaultEasing,
    disableOnMobile = true,
    orientation = "vertical",
  } = options;
  
  const lenisRef = useRef<Lenis | null>(null);
  
  useEffect(() => {
    // Désactiver sur mobile si demandé (pour performance)
    if (disableOnMobile && window.innerWidth < 768) {
      return;
    }
    
    // Initialiser Lenis
    const lenis = new Lenis({
      duration,
      easing,
      orientation,
      gestureOrientation: orientation,
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;
    
    // Boucle d'animation
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    const rafId = requestAnimationFrame(raf);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [duration, easing, disableOnMobile, orientation]);
  
  // Retourner des méthodes utiles
  return {
    /** Scroll vers un élément ou position */
    scrollTo: (target: string | number | HTMLElement, options?: object) => {
      lenisRef.current?.scrollTo(target, options);
    },
    /** Stopper le scroll temporairement */
    stop: () => lenisRef.current?.stop(),
    /** Reprendre le scroll */
    start: () => lenisRef.current?.start(),
    /** Instance Lenis pour usage avancé */
    lenis: lenisRef,
  };
}

export default useSmoothScroll;
