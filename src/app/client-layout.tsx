/**
 * ============================================
 * 🎨 CLIENT LAYOUT
 * ============================================
 * 
 * Composant client pour les effets interactifs.
 * Séparé du layout serveur pour optimiser le bundle.
 */

"use client";

import { Header, Footer } from "@/components/layout";
import { CustomCursor, ParticlesBackground, ScrollProgress } from "@/components/effects";
import { useSmoothScroll } from "@/hooks";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  // Initialiser le smooth scroll
  useSmoothScroll({
    duration: 1.2,
    disableOnMobile: true,
  });
  
  return (
    <>
      {/* Effets globaux */}
      <CustomCursor />
      <ParticlesBackground count={40} speed={0.3} />
      <ScrollProgress />
      
      {/* Layout structure */}
      <Header />
      
      <main className="relative min-h-screen">
        {children}
      </main>
      
      <Footer />
    </>
  );
}
