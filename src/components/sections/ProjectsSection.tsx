/**
 * ============================================
 * 📁 SECTION : Projects
 * ============================================
 * 
 * Galerie de projets avec :
 * - Filtrage par catégorie
 * - Cards animées
 * - Hover effects élaborés
 * - Links vers GitHub/Live
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, Folder } from "lucide-react";

import { projects, projectCategories } from "@/data/projects";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <motion.div
        className="container-cyber relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <Badge className="mb-4 bg-game-yellow text-background font-bold px-4 py-1 rounded-lg">
            RANK #1 - SELECT YOUR TRACK
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 racing-glow italic">
            GRAND PRIX
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Browse through my latest missions and successful races.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={fadeInUp}
        >
          {projectCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                "transition-all duration-300 rounded-xl font-bold uppercase tracking-wider h-12 px-6",
                activeFilter === category.id
                  ? "bg-game-red text-white shadow-[0_0_15px_rgba(230,57,70,0.4)] border-b-4 border-red-800"
                  : "border-2 border-border hover:border-game-red hover:text-game-red"
              )}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="group relative rounded-2xl track-card overflow-hidden"
              >
                {/* Item Box Image Container */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  {/* Item Box Question Mark Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-game-yellow/20 to-game-red/20 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <span className="text-6xl font-black text-game-yellow/20 select-none">?</span>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl bg-game-red text-white hover:shadow-[0_0_15px_rgba(230,57,70,0.5)] transition-all"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="GitHub"
                      >
                        <Github className="h-6 w-6" />
                      </motion.a>
                    )}
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl bg-game-blue text-white hover:shadow-[0_0_15px_rgba(69,123,157,0.5)] transition-all"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Live demo"
                      >
                        <ExternalLink className="h-6 w-6" />
                      </motion.a>
                    )}
                  </div>

                  {/* Item Box Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-game-yellow text-background font-black px-3 py-1 rounded-lg text-xs shadow-lg flex items-center gap-1">
                      <span className="animate-coin">🪙</span>
                      ITEM #{project.id.toString().padStart(2, '0')}
                    </div>
                  </div>

                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-game-red text-white border-none font-black shadow-lg">
                        STAR ★
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black mb-2 group-hover:text-game-yellow transition-colors italic">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2 font-medium">
                    {project.description}
                  </p>

                  {/* Tags as Power-ups */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] font-bold uppercase bg-game-blue/10 text-game-blue border-game-blue/20 rounded-md"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-[10px] font-bold bg-muted text-muted-foreground rounded-md">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.p
            className="text-center text-muted-foreground py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Aucun projet dans cette catégorie pour le moment.
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}

export default ProjectsSection;
