/**
 * ============================================
 * 🦸 SECTION : Hero
 * ============================================
 * 
 * Section d'accueil avec :
 * - Effet de typing pour le tagline
 * - Animations d'entrée séquentielles
 * - CTAs primaire et secondaire
 * - Background avec particules (via ParticlesBackground)
 * 
 * STORYTELLING :
 * Premier contact visuel = première impression.
 * On veut impressionner, montrer la maîtrise technique,
 * mais rester lisible et accessible.
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Terminal } from "lucide-react";

import { useTypingEffect } from "@/hooks";
import { heroContent, siteConfig } from "@/lib/constants";
import { staggerContainer, fadeInUp, fadeIn, scaleOnHover } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  // Effet de typing pour les rôles/taglines
  const { displayText } = useTypingEffect({
    texts: [
      "Full-Stack Developer",
      "UI/UX Enthusiast",
      "Problem Solver",
      "Code Craftsman",
    ],
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseAfterTyping: 2500,
    loop: true,
  });
  
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid" />
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"
        style={{ opacity: 0.8 }}
      />
      
      {/* Content */}
      <motion.div
        className="container-cyber relative z-10 text-center py-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Terminal greeting */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 
                     border border-border rounded-full bg-card/50 backdrop-blur-sm"
          variants={fadeInUp}
        >
          <Terminal className="h-4 w-4 text-neon-cyan" />
          <span className="text-sm font-mono text-muted-foreground">
            {heroContent.greeting}
          </span>
          <span className="w-2 h-4 bg-neon-cyan animate-pulse" />
        </motion.div>
        
        {/* Nom principal */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          variants={fadeInUp}
        >
          <span className="text-foreground">Hello, I&apos;m </span>
          <span 
            className="text-neon-cyan neon-glow"
            style={{ 
              textShadow: "0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)" 
            }}
          >
            {siteConfig.name}
          </span>
        </motion.h1>
        
        {/* Tagline avec effet typing */}
        <motion.div
          className="h-12 md:h-14 flex items-center justify-center mb-8"
          variants={fadeInUp}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-mono text-muted-foreground">
            <span className="text-neon-magenta mr-2">{">"}</span>
            <span>{displayText}</span>
            <span className="ml-1 inline-block w-3 h-6 bg-neon-cyan animate-pulse" />
          </p>
        </motion.div>
        
        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed"
          variants={fadeInUp}
        >
          Je construis des applications web <span className="text-foreground">modernes</span>,{" "}
          <span className="text-foreground">performantes</span> et{" "}
          <span className="text-neon-cyan">mémorables</span>.
          <br />
          Du concept au déploiement, je transforme vos idées en réalité.
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
        >
          {/* CTA Primaire */}
          <motion.div
            variants={scaleOnHover}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link href="#projects">
                <span className="relative z-10 flex items-center gap-2">
                  Voir mes projets
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                {/* Hover effect */}
                <span 
                  className="absolute inset-0 bg-neon-magenta opacity-0 
                             group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
            </Button>
          </motion.div>
          
          {/* CTA Secondaire */}
          <motion.div
            variants={scaleOnHover}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button asChild size="lg" variant="outline" className="border-neon-cyan/50">
              <Link href="#contact">
                Me contacter
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          variants={fadeIn}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Link
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground 
                       hover:text-neon-cyan transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
