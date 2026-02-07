/**
 * ============================================
 * 🦶 COMPONENT: Footer
 * ============================================
 * 
 * Minimalist footer with:
 * - Social links
 * - Copyright
 * - Easter egg on hover
 */

"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";

import { siteConfig, socialLinks } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";

// Map of Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t-4 border-game-blue py-12 md:py-16 overflow-hidden">
      {/* Track background subtle */}
      <div className="absolute inset-0 racing-track-bg opacity-10" />

      <motion.div
        className="container-cyber relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Social Links */}
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
                className="p-3 rounded-xl border-2 border-border bg-card/50 hover:border-game-blue hover:bg-game-blue/10 transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.platform}
              >
                {IconComponent && (
                  <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-game-blue transition-colors" />
                )}
              </motion.a>
            );
          })}

          {/* Direct Email */}
          <motion.a
            href={`mailto:${siteConfig.links.email}`}
            className="p-3 rounded-xl border-2 border-border bg-card/50 hover:border-game-red hover:bg-game-red/10 transition-all duration-300 group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Email"
          >
            <Mail className="h-5 w-5 text-muted-foreground group-hover:text-game-red transition-colors" />
          </motion.a>
        </motion.div>

        {/* Styled separation line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          variants={fadeInUp}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-game-yellow" />
          <div className="w-2 h-2 rounded-full bg-game-yellow animate-pulse" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-game-yellow" />
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-sm text-muted-foreground"
          variants={fadeInUp}
        >
          <p className="flex items-center justify-center gap-1 flex-wrap font-bold uppercase tracking-tight">
            <span>© {currentYear}</span>
            <span className="text-game-red racing-glow">{siteConfig.name}</span>
            <span className="text-muted-foreground/30 mx-2">|</span>
            <span>RANK #1</span>
            <span className="text-muted-foreground/30 mx-2">|</span>
            <span>CRAFTED WITH</span>
            <motion.span
              whileHover={{ scale: 1.3, rotate: 10 }}
              className="inline-block"
            >
              <Heart className="h-4 w-4 text-game-red fill-game-red" />
            </motion.span>
            <span>& PURE TURBO</span>
          </p>

          {/* Easter egg */}
          <motion.p
            className="mt-4 text-[10px] font-black opacity-30 hover:opacity-100 transition-opacity cursor-default tracking-widest uppercase italic"
            whileHover={{ color: "var(--game-yellow)" }}
          >
            {"// Finish line reached. New lap loading..."}
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
