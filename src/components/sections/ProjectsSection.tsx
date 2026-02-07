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
          <Badge variant="outline" className="mb-4 border-neon-cyan/50">
            <Folder className="h-3 w-3 mr-1 text-neon-cyan" />
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Projets
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une sélection de projets qui illustrent mon approche et mes compétences.
          </p>
        </motion.div>
        
        {/* Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          variants={fadeInUp}
        >
          {projectCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                "transition-all duration-300",
                activeFilter === category.id 
                  ? "bg-neon-cyan text-background hover:bg-neon-cyan/90" 
                  : "border-border hover:border-neon-cyan/50"
              )}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>
        
        {/* Projects grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="group relative rounded-xl border border-border bg-card/50 
                           backdrop-blur-sm overflow-hidden
                           hover:border-neon-cyan/50 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  {/* Placeholder gradient - replace with actual image */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20
                               group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300
                                  flex items-center justify-center gap-4">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-card border border-border
                                   hover:border-neon-cyan hover:text-neon-cyan transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </motion.a>
                    )}
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-card border border-border
                                   hover:border-neon-magenta hover:text-neon-magenta transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Live demo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>
                    )}
                  </div>
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-neon-magenta text-white border-none">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-neon-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 4}
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
