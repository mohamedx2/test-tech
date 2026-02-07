/**
 * ============================================
 * 📦 COMPOSANT : SectionWrapper
 * ============================================
 * 
 * Wrapper qui transforme chaque section en fenêtre terminal.
 * 
 * FEATURES :
 * - Header avec dots (close/minimize/maximize)
 * - Scanlines CRT subtiles
 * - Glassmorphism background
 * - Animations d'entrée au scroll
 * 
 * USAGE :
 * ```tsx
 * <SectionWrapper id="about" title="About Me">
 *   <p>Contenu de la section</p>
 * </SectionWrapper>
 * ```
 * 
 * POURQUOI CE WRAPPER ?
 * Cohérence visuelle forte : chaque section = terminal window.
 * Renforce le thème NEO-ARCADE TERMINAL.
 */

"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { scrollReveal } from "@/lib/animations";

interface SectionWrapperProps {
    id?: string;
    title?: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
    variant?: "default" | "glass" | "solid";
}

export function SectionWrapper({
    id,
    title,
    subtitle,
    children,
    className = "",
    variant = "default",
}: SectionWrapperProps) {

    const variantStyles = {
        default: "bg-card/50 backdrop-blur-sm border-border",
        glass: "bg-glass-bg backdrop-blur-md border-glass-border",
        solid: "bg-card border-border",
    };

    return (
        <section
            id={id}
            className={`relative py-20 md:py-32 overflow-hidden ${className}`}
        >
            <div className="container-cyber relative z-10">
                <motion.div
                    className={`terminal-window ${variantStyles[variant]}`}
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Terminal Header */}
                    {title && (
                        <div className="terminal-header">
                            {/* Dots */}
                            <div className="flex items-center gap-2">
                                <div className="terminal-dot bg-destructive" />
                                <div className="terminal-dot bg-neon-amber" />
                                <div className="terminal-dot bg-neon-green" />
                            </div>

                            {/* Title */}
                            <div className="flex-1 text-center">
                                <span className="text-sm font-mono text-background font-bold">
                                    {title}
                                </span>
                            </div>

                            {/* Spacer pour centrer le titre */}
                            <div className="w-16" />
                        </div>
                    )}

                    {/* Terminal Body */}
                    <div className="terminal-body relative">
                        {/* Scanlines overlay */}
                        <div className="scanlines" />

                        {/* Subtitle si présent */}
                        {subtitle && (
                            <motion.div
                                className="mb-8 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="text-muted-foreground text-lg">
                                    <span className="text-neon-cyan mr-2">{">"}</span>
                                    {subtitle}
                                </p>
                            </motion.div>
                        )}

                        {/* Content */}
                        {children}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default SectionWrapper;
