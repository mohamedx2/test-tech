/**
 * ============================================
 * ✨ COMPOSANT : ParticlesBackground
 * ============================================
 * 
 * Background animé avec particules flottantes.
 * Effet cyberpunk subtil qui ajoute de la profondeur.
 * 
 * PERFORMANCE :
 * - Canvas 2D (plus léger que WebGL pour ce use case)
 * - Limité à 50 particules
 * - requestAnimationFrame avec cleanup
 * - Pause quand l'onglet n'est pas visible
 */

"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ParticlesBackgroundProps {
  /** Nombre de particules */
  count?: number;
  /** Couleurs des particules */
  colors?: string[];
  /** Vitesse globale */
  speed?: number;
  /** Activer/désactiver */
  enabled?: boolean;
}

export function ParticlesBackground({
  count = 50,
  colors = ["#00fff7", "#ff00ff", "#8b5cf6"],
  speed = 0.5,
  enabled = true,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (!enabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Visibility handler (pause quand onglet caché)
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    
    // Initialiser les particules
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    // Animation loop
    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Optional: draw glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color + "40");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.opacity * 0.5;
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, count, colors, speed, isVisible]);
  
  if (!enabled) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}

export default ParticlesBackground;
