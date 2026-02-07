/**
 * ============================================
 * 👤 SECTION : About
 * ============================================
 * 
 * Section "À propos" avec :
 * - Photo/Avatar (optionnel)
 * - Texte de présentation
 * - Stats clés animées
 * - Style terminal/code
 */

"use client";

import { motion } from "framer-motion";
import { User, Calendar, Coffee, Rocket } from "lucide-react";

import { aboutContent } from "@/lib/constants";
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";

// Icônes pour les stats
const statIcons = [Calendar, Rocket, User, Coffee];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <motion.div
        className="container-cyber relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <Badge variant="outline" className="mb-4 border-neon-cyan/50">
            <span className="text-neon-cyan mr-1">{">"}</span>
            whoami
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {aboutContent.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {aboutContent.subtitle}
          </p>
        </motion.div>
        
        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Terminal style text */}
          <motion.div
            className="space-y-6"
            variants={slideInLeft}
          >
            {/* Terminal window */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 text-xs text-background font-medium">
                  about.md
                </span>
              </div>
              <div className="terminal-body space-y-4">
                {aboutContent.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-muted-foreground leading-relaxed"
                    variants={fadeInUp}
                  >
                    <span className="text-neon-cyan mr-2">
                      {index + 1}.
                    </span>
                    {paragraph}
                  </motion.p>
                ))}
                
                {/* Cursor effect */}
                <p className="text-neon-cyan">
                  <span className="text-neon-magenta">const</span>{" "}
                  <span className="text-foreground">passion</span>{" "}
                  <span className="text-neon-magenta">=</span>{" "}
                  <span className="text-neon-green">&quot;Infinite&quot;</span>;
                  <span className="ml-1 inline-block w-2 h-4 bg-neon-cyan animate-pulse" />
                </p>
              </div>
            </div>
            
            {/* Tags / Keywords */}
            <motion.div 
              className="flex flex-wrap gap-2"
              variants={fadeInUp}
            >
              {["Curieux", "Rigoureux", "Créatif", "Team Player", "Fast Learner"].map(
                (tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="hover:bg-neon-cyan/20 hover:border-neon-cyan transition-colors cursor-default"
                  >
                    {tag}
                  </Badge>
                )
              )}
            </motion.div>
          </motion.div>
          
          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={slideInRight}
          >
            {aboutContent.stats.map((stat, index) => {
              const IconComponent = statIcons[index % statIcons.length];
              
              return (
                <motion.div
                  key={stat.label}
                  className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm
                             hover:border-neon-cyan/50 hover:bg-neon-cyan/5 
                             transition-all duration-300 group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <IconComponent 
                    className="h-8 w-8 mb-3 text-neon-cyan 
                               group-hover:text-neon-magenta transition-colors" 
                  />
                  <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
