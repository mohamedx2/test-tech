/**
 * ============================================
 * 🎯 COMPOSANT : CustomCursor
 * ============================================
 * 
 * Curseur personnalisé cyberpunk avec :
 * - Point central néon
 * - Cercle follower avec delay
 * - Effet de scale au hover sur éléments cliquables
 * - Changement de couleur contextuel
 * 
 * PERFORMANCE :
 * - Utilise transform (GPU accelerated)
 * - requestAnimationFrame pour le follower
 * - Se cache sur mobile (touch devices)
 */

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  cursorType: "default" | "pointer" | "text" | "link";
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    cursorType: "default",
  });

  // Position du curseur principal (immédiate)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Position du follower (avec spring pour le delay)
  const followerX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const followerY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  // Ref pour détecter touch devices
  const isTouchDevice = useRef(false);

  // Mouvement du curseur
  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  // Détection des éléments interactifs
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Vérifie si l'élément est cliquable
    const isClickable = Boolean(
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.getAttribute("role") === "button" ||
      window.getComputedStyle(target).cursor === "pointer"
    );

    const isText = Boolean(
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    );

    setCursorState(prev => ({
      ...prev,
      isHovering: isClickable || isText,
      cursorType: isText ? "text" : isClickable ? "link" : "default",
    }));
  }, []);

  // Mouse down/up pour effet de clic
  const handleMouseDown = useCallback(() => {
    setCursorState(prev => ({ ...prev, isClicking: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursorState(prev => ({ ...prev, isClicking: false }));
  }, []);

  // Cacher quand sort de la fenêtre
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Détecter touch devices
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice.current) return;

    // Cacher le curseur par défaut
    document.body.style.cursor = "none";

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Ne pas render sur touch devices
  if (typeof window !== "undefined" && isTouchDevice.current) {
    return null;
  }

  const { isHovering, isClicking, cursorType } = cursorState;

  return (
    <>
      {/* Kart Cursor - suit immédiatement */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          rotate: isClicking ? -5 : 0, // Tilt on click
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
          {/* Kart SVG */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 0 8px ${cursorType === "link" ? "var(--game-yellow)" : "var(--game-red)"})`
            }}
          >
            <path d="M4 14C4 14 5 11 12 11C19 11 20 14 20 14L21 17H3L4 14Z" fill={cursorType === "link" ? "var(--game-yellow)" : "var(--game-red)"} />
            <rect x="6" y="17" width="3" height="4" rx="1" fill="#333" />
            <rect x="15" y="17" width="3" height="4" rx="1" fill="#333" />
            <circle cx="12" cy="8" r="3" fill="#FFE0B2" stroke="#333" strokeWidth="1" /> {/* Driver head */}
            <path d="M10 8H14" stroke="#333" strokeWidth="1" strokeLinecap="round" /> {/* Steering wheel */}
          </svg>

          {/* Exhaust particles on click */}
          {isClicking && (
            <motion.div
              className="absolute -bottom-2 w-2 h-2 bg-gray-400 rounded-full blur-[1px]"
              initial={{ scale: 0, opacity: 1, x: 0 }}
              animate={{ scale: 3, opacity: 0, x: -20 }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>

      {/* Track Target / Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: followerX,
          y: followerY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
          style={{
            borderColor: cursorType === "link" ? "var(--game-yellow)" : "var(--game-blue)",
          }}
        />
      </motion.div>
    </>
  );
}

export default CustomCursor;
