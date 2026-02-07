/**
 * ============================================
 * 🧭 COMPOSANT : Header
 * ============================================
 * 
 * Navigation principale avec :
 * - Logo/Nom
 * - Navigation desktop (liens)
 * - Menu hamburger mobile
 * - Effet de fond blur au scroll
 * - Transition show/hide basée sur direction scroll
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { useScrollProgress } from "@/hooks";
import { navItems, siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled, direction } = useScrollProgress({ threshold: 100 });
  
  // Cacher le header quand on scroll vers le bas (après 100px)
  const isHidden = direction === "down" && isScrolled;
  
  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-b border-border" 
            : "bg-transparent"
        )}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-cyber">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Nom */}
            <Link 
              href="#hero" 
              className="group flex items-center gap-2"
            >
              {/* Terminal prompt style */}
              <span className="text-neon-cyan font-mono">{">"}</span>
              <span className="font-bold text-lg md:text-xl tracking-wider group-hover:text-neon-cyan transition-colors">
                {siteConfig.name.split(" ")[0]}
                <span className="text-neon-magenta">_</span>
              </span>
            </Link>
            
            {/* Navigation Desktop */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md",
                      "text-muted-foreground hover:text-foreground",
                      "hover:bg-secondary/50 transition-all duration-200",
                      "relative group"
                    )}
                  >
                    {item.label}
                    {/* Underline effect */}
                    <span 
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-neon-cyan 
                                 group-hover:w-full group-hover:left-0 
                                 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* CTA Desktop */}
            <div className="hidden md:block">
              <Button asChild variant="default" className="neon-button">
                <Link href="#contact">
                  Me contacter
                </Link>
              </Button>
            </div>
            
            {/* Hamburger Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </nav>
        </div>
      </motion.header>
      
      {/* Menu Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.nav
              className="absolute inset-x-0 top-16 p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              <ul className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-lg font-medium 
                                 rounded-lg hover:bg-secondary/50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-neon-cyan">{">"}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              {/* CTA Mobile */}
              <motion.div
                className="mt-6 pt-6 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  asChild 
                  variant="default" 
                  className="w-full neon-button"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="#contact">
                    Me contacter
                  </Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
