/**
 * ============================================
 * 👤 SECTION: About
 * ============================================
 * 
 * "About Me" section with:
 * - Presentation text
 * - Animated key stats
 * - Terminal/Code card style
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
      <div className="absolute inset-0 racing-track-bg opacity-5" />

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
          <Badge className="mb-4 bg-game-yellow text-background font-black px-4 py-1 rounded-lg">
            {">"} DRIVER PROFILE
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 racing-glow italic">
            {aboutContent.title}
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            {aboutContent.subtitle}
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Gaming style text */}
          <motion.div
            className="space-y-6"
            variants={slideInLeft}
          >
            {/* Driver Manual window */}
            <div className="rounded-2xl border-4 border-game-yellow bg-card shadow-2xl overflow-hidden">
              <div className="bg-game-yellow p-3 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-background" />
                <span className="font-black italic text-background tracking-widest uppercase text-xs">Driver Manual</span>
              </div>
              <div className="p-8 space-y-6">
                {aboutContent.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-foreground leading-relaxed font-medium"
                    variants={fadeInUp}
                  >
                    <span className="text-game-red font-black mr-3">
                      L{index + 1}
                    </span>
                    {paragraph}
                  </motion.p>
                ))}

                {/* Gaming passion indicator */}
                <div className="p-4 rounded-xl bg-muted/50 border-2 border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-game-yellow font-black">PASSION:</span>
                    <span className="text-xs font-black uppercase tracking-widest text-game-green">Infinite Turbo</span>
                  </div>
                  <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-game-green animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tags / Keywords as Power-ups */}
            <motion.div
              className="flex flex-wrap gap-3"
              variants={fadeInUp}
            >
              {["Curious", "Precise", "Creative", "Team Player", "Fast Learner"].map(
                (tag) => (
                  <Badge
                    key={tag}
                    className="bg-game-blue/10 text-game-blue border-2 border-game-blue/20 hover:bg-game-blue hover:text-white transition-all cursor-default font-black uppercase px-4 py-1 rounded-lg italic"
                  >
                    {tag}
                  </Badge>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={slideInRight}
          >
            {aboutContent.stats.map((stat, index) => {
              const IconComponent = statIcons[index % statIcons.length];
              const colors = ["--game-red", "--game-blue", "--game-yellow", "--game-green"];
              const color = colors[index % colors.length];

              return (
                <motion.div
                  key={stat.label}
                  className="p-8 rounded-2xl track-card border-b-4 relative overflow-hidden group"
                  style={{ borderBottomColor: `var(${color})` }}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div
                    className="absolute -top-4 -right-4 w-16 h-16 opacity-5 rotate-12 transition-transform group-hover:rotate-45"
                    style={{ color: `var(${color})` }}
                  >
                    <IconComponent className="w-full h-full" />
                  </div>

                  <IconComponent
                    className="h-10 w-10 mb-4 transition-colors"
                    style={{ color: `var(${color})` }}
                  />
                  <p className="text-4xl md:text-5xl font-black text-foreground mb-1 italic tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
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
