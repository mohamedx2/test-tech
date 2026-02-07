/**
 * ============================================
 * 🎢 HOOK : useParallax
 * ============================================
 * 
 * Hook custom pour créer des effets parallaxe au scroll.
 * 
 * USAGE :
 * ```tsx
 * const y = useParallax(0, -100); // Bouge de 0 à -100px au scroll
 * 
 * <motion.div style={{ y }}>
 *   Contenu avec parallaxe
 * </motion.div>
 * ```
 * 
 * PARAMÈTRES :
 * - start: Position de départ
 * - end: Position finale
 * - offset: Décalage du viewport pour déclencher l'animation
 * 
 * POURQUOI CE HOOK ?
 * Réutilisable sur plusieurs composants pour créer de la profondeur.
 * Abstrait la logique de scroll tracking.
 */

"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface UseParallaxOptions {
    start?: number;
    end?: number;
    offset?: [string, string];
}

/**
 * Hook pour créer un effet parallaxe sur un élément
 * 
 * @param start - Valeur de départ (défaut: 0)
 * @param end - Valeur finale (défaut: -100)
 * @param offset - Offset du viewport (défaut: ["start end", "end start"])
 * @returns MotionValue pour animer la position Y
 */
export function useParallax(
    start: number = 0,
    end: number = -100,
    offset: ["start end" | "end start", "start end" | "end start"] = ["start end", "end start"]
): MotionValue<number> {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset,
    });

    const y = useTransform(scrollYProgress, [0, 1], [start, end]);

    return y;
}

/**
 * Hook pour créer un effet parallaxe horizontal
 */
export function useParallaxX(
    start: number = 0,
    end: number = -100,
    offset: ["start end" | "end start", "start end" | "end start"] = ["start end", "end start"]
): MotionValue<number> {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset,
    });

    const x = useTransform(scrollYProgress, [0, 1], [start, end]);

    return x;
}

/**
 * Hook pour créer un effet de scale au scroll
 */
export function useParallaxScale(
    start: number = 0.8,
    end: number = 1,
    offset: ["start end" | "end start", "start end" | "end start"] = ["start end", "end start"]
): MotionValue<number> {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset,
    });

    const scale = useTransform(scrollYProgress, [0, 1], [start, end]);

    return scale;
}

/**
 * Hook pour créer un effet d'opacité au scroll
 */
export function useParallaxOpacity(
    start: number = 0,
    end: number = 1,
    offset: ["start end" | "end start", "start end" | "end start"] = ["start end", "end start"]
): MotionValue<number> {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset,
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [start, end]);

    return opacity;
}

export default useParallax;
