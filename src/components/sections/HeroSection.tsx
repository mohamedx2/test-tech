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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Racing Track Pattern */}
      <div className="absolute inset-0 racing-track-bg opacity-30" />

      {/* Animated Clouds / Parallax feel (CSS only) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-32 h-16 bg-white rounded-full blur-2xl animate-float" />
        <div className="absolute top-[20%] right-[10%] w-48 h-24 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"
      />

      {/* Content */}
      <motion.div
        className="container-cyber relative z-10 text-center py-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Gaming greeting */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 
                     border-2 border-game-yellow rounded-xl bg-card/80 backdrop-blur-md shadow-[0_0_15px_rgba(244,162,97,0.3)]"
          variants={fadeInUp}
        >
          <span className="animate-coin">🪙</span>
          <span className="text-sm font-bold uppercase tracking-wider text-game-yellow">
            {heroContent.greeting || "Ready to Race?"}
          </span>
        </motion.div>

        {/* Nom principal */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter"
          variants={fadeInUp}
        >
          <span className="text-foreground">I&apos;m </span>
          <span
            className="text-game-red racing-glow"
          >
            {siteConfig.name}
          </span>
        </motion.h1>

        {/* Tagline avec effet typing */}
        <motion.div
          className="h-12 md:h-14 flex items-center justify-center mb-8"
          variants={fadeInUp}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-muted-foreground uppercase">
            <span className="text-game-yellow mr-2">{"RANK #1"}</span>
            <span className="text-foreground">{displayText}</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed font-medium"
          variants={fadeInUp}
        >
          Expert en développement <span className="text-game-red">Haute Performance</span>.{" "}
          Je conçois des expériences web <span className="text-game-yellow">légendaires</span> et{" "}
          <span className="text-game-blue">immersives</span>.
          <br />
          Prêt à passer à la vitesse supérieure ?
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
        >
          {/* CTA Primaire - Red Racing */}
          <motion.div
            variants={scaleOnHover}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button asChild size="lg" className="group relative overflow-hidden bg-game-red border-b-4 border-red-800 hover:bg-red-600 btn-accelerate rounded-xl h-14 px-8 text-lg font-bold">
              <Link href="#projects">
                <span className="relative z-10 flex items-center gap-2">
                  START RACE
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    🚩
                  </motion.span>
                </span>
              </Link>
            </Button>
          </motion.div>

          {/* CTA Secondaire - Blue Track */}
          <motion.div
            variants={scaleOnHover}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button asChild size="lg" variant="outline" className="border-2 border-game-blue text-game-blue hover:bg-game-blue hover:text-white rounded-xl h-14 px-8 text-lg font-bold">
              <Link href="#contact">
                PIT STOP
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Finish Line Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-4 finish-line-pattern opacity-50" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
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
                       hover:text-game-yellow transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Accelerate</span>
            <ArrowDown className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
