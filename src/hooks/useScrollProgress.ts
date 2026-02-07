/**
 * ============================================
 * 🪝 HOOK : useScrollProgress
 * ============================================
 * 
 * Retourne la progression du scroll (0-1) et la direction.
 * Utile pour :
 * - Barre de progression
 * - Animations basées sur le scroll
 * - Afficher/cacher le header
 * 
 * OPTIMISATION :
 * - Utilise requestAnimationFrame pour throttling naturel
 * - Évite les re-renders inutiles avec useRef pour le RAF
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollProgress {
  /** Progression du scroll (0 = top, 1 = bottom) */
  progress: number;
  /** Position absolue en pixels */
  scrollY: number;
  /** Direction du scroll */
  direction: "up" | "down" | null;
  /** Est-ce qu'on a scrollé plus de X pixels */
  isScrolled: boolean;
}

interface UseScrollProgressOptions {
  /** Seuil en pixels pour isScrolled */
  threshold?: number;
  /** Désactiver le tracking */
  disabled?: boolean;
}

export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): ScrollProgress {
  const { threshold = 50, disabled = false } = options;
  
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    direction: null,
    isScrolled: false,
  });
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  const updateScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
    
    const direction = scrollY > lastScrollY.current ? "down" : "up";
    const isScrolled = scrollY > threshold;
    
    setScrollData({
      progress,
      scrollY,
      direction: scrollY === lastScrollY.current ? null : direction,
      isScrolled,
    });
    
    lastScrollY.current = scrollY;
    ticking.current = false;
  }, [threshold]);
  
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScroll);
      ticking.current = true;
    }
  }, [updateScroll]);
  
  useEffect(() => {
    if (disabled || typeof window === "undefined") return;
    
    // Initial call
    updateScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [disabled, handleScroll, updateScroll]);
  
  return scrollData;
}

export default useScrollProgress;
