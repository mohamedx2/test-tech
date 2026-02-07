/**
 * ============================================
 * 🦶 COMPOSANT : Footer
 * ============================================
 * 
 * Footer minimaliste avec :
 * - Liens sociaux
 * - Copyright
 * - Easter egg au hover
 */

"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";

import { siteConfig, socialLinks } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";

// Map des icônes Lucide
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-border py-12 md:py-16">
      {/* Grid background subtil */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <motion.div
        className="container-cyber relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Liens sociaux */}
        <motion.div 
          className="flex justify-center gap-4 mb-8"
          variants={fadeInUp}
        >
          {socialLinks.map((link) => {
            const IconComponent = iconMap[link.icon];
            return (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border bg-card/50
                           hover:border-neon-cyan hover:bg-neon-cyan/10
                           transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.platform}
              >
                {IconComponent && (
                  <IconComponent className="h-5 w-5 text-muted-foreground 
                                            group-hover:text-neon-cyan transition-colors" />
                )}
              </motion.a>
            );
          })}
          
          {/* Email direct */}
          <motion.a
            href={`mailto:${siteConfig.links.email}`}
            className="p-3 rounded-lg border border-border bg-card/50
                       hover:border-neon-magenta hover:bg-neon-magenta/10
                       transition-all duration-300 group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Email"
          >
            <Mail className="h-5 w-5 text-muted-foreground 
                            group-hover:text-neon-magenta transition-colors" />
          </motion.a>
        </motion.div>
        
        {/* Ligne de séparation stylisée */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          variants={fadeInUp}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-neon-cyan" />
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-neon-cyan" />
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="text-center text-sm text-muted-foreground"
          variants={fadeInUp}
        >
          <p className="flex items-center justify-center gap-1 flex-wrap">
            <span>© {currentYear}</span>
            <span className="text-neon-cyan">{siteConfig.name}</span>
            <span>—</span>
            <span>Crafted with</span>
            <motion.span
              whileHover={{ scale: 1.3, rotate: 10 }}
              className="inline-block"
            >
              <Heart className="h-4 w-4 text-neon-magenta fill-neon-magenta" />
            </motion.span>
            <span>& lots of</span>
            <span className="text-neon-cyan">{"<code />"}</span>
          </p>
          
          {/* Easter egg */}
          <motion.p
            className="mt-2 text-xs opacity-50 hover:opacity-100 transition-opacity cursor-default"
            whileHover={{ color: "var(--neon-cyan)" }}
          >
            {"// TODO: Sleep more, code less... Nah."}
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
