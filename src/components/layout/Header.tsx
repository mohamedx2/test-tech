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

  // Hide header when scrolling down (after 100px)
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
              {/* Racing icon style */}
              <span className="text-game-red font-bold text-2xl animate-bounce">🏎️</span>
              <span className="font-black text-xl md:text-2xl tracking-tighter uppercase italic group-hover:text-game-yellow transition-colors">
                {siteConfig.name.split(" ")[0]}
                <span className="text-game-red"> GP</span>
              </span>
            </Link>

            {/* Navigation Desktop */}
            <ul className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-xs font-black uppercase italic tracking-tighter rounded-lg",
                      "text-muted-foreground hover:text-foreground",
                      "hover:bg-game-blue/10 transition-all duration-200",
                      "relative group"
                    )}
                  >
                    {item.label}
                    {/* Racing line underline */}
                    <span
                      className="absolute bottom-1 left-1/2 w-0 h-1 bg-game-red 
                                 group-hover:w-[80%] group-hover:left-[10%] 
                                 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Desktop */}
            <div className="hidden md:block">
              <Button asChild variant="default" className="bg-game-red hover:bg-red-600 text-white font-black italic uppercase tracking-tighter rounded-xl btn-accelerate">
                <Link href="#contact">
                  START RACE
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
              <ul className="flex flex-col gap-3">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 px-6 py-4 text-xl font-black italic uppercase tracking-tighter
                                 rounded-2xl border-2 border-transparent hover:border-game-blue hover:bg-game-blue/10 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-game-red">🏁</span>
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
                  className="w-full bg-game-red text-white font-black italic uppercase tracking-tighter h-14 rounded-2xl text-xl btn-accelerate"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="#contact">
                    START RACE
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
