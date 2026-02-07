/**
 * ============================================
 * 🏠 PAGE D'ACCUEIL
 * ============================================
 * 
 * Page principale du portfolio.
 * Assemble toutes les sections dans l'ordre.
 */

import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
