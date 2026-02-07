/**
 * ============================================
 * 📊 COMPOSANT : ScrollProgress
 * ============================================
 * 
 * Barre de progression du scroll en haut de page.
 * Effet néon cyberpunk.
 */

"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Spring pour animation fluide
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))",
        boxShadow: "0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)",
      }}
    />
  );
}

export default ScrollProgress;
