/**
 * ============================================
 * 💼 SECTION : Experience
 * ============================================
 * 
 * Timeline d'expériences professionnelles avec :
 * - Format chronologique inversé
 * - Animations au scroll
 * - Details expandables
 * - Style terminal pour les achievements
 */

"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, MapPin, Calendar } from "lucide-react";

import { experiences, formatExperiencePeriod } from "@/data/experiences";
import { staggerContainer, fadeInUp, slideInLeft } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
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
          <Badge variant="outline" className="mb-4 border-neon-violet/50">
            <Briefcase className="h-3 w-3 mr-1 text-neon-violet" />
            Experience Points
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Expérience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mon parcours professionnel et les défis relevés.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px 
                       bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-magenta"
            style={{ transform: "translateX(-50%)" }}
          />
          
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isCurrentJob = !exp.endDate;
            
            return (
              <motion.div
                key={exp.id}
                className={cn(
                  "relative mb-12 md:mb-16",
                  "md:w-1/2",
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
                )}
                variants={isLeft ? slideInLeft : fadeInUp}
              >
                {/* Timeline dot */}
                <div 
                  className={cn(
                    "absolute top-0 w-4 h-4 rounded-full border-2",
                    "left-0 md:left-auto",
                    isLeft ? "md:-right-2" : "md:-left-2",
                    isCurrentJob 
                      ? "bg-neon-cyan border-neon-cyan animate-pulse-glow" 
                      : "bg-background border-neon-violet"
                  )}
                  style={{ transform: "translateX(-50%)" }}
                />
                
                {/* Card */}
                <div 
                  className={cn(
                    "ml-8 md:ml-0 p-6 rounded-xl border border-border",
                    "bg-card/50 backdrop-blur-sm",
                    "hover:border-neon-cyan/30 transition-all duration-300"
                  )}
                >
                  {/* Header */}
                  <div className={cn("mb-4", isLeft ? "md:text-right" : "")}>
                    {/* Badge type */}
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "mb-2",
                        isCurrentJob && "border-neon-cyan text-neon-cyan"
                      )}
                    >
                      {exp.type}
                      {isCurrentJob && " • Actuel"}
                    </Badge>
                    
                    {/* Role */}
                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    
                    {/* Company */}
                    <p className="text-neon-cyan font-medium flex items-center gap-1 flex-wrap justify-start md:justify-end">
                      {exp.companyUrl ? (
                        <a 
                          href={exp.companyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-neon-magenta transition-colors inline-flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        exp.company
                      )}
                    </p>
                    
                    {/* Meta */}
                    <div className={cn(
                      "flex gap-4 mt-2 text-sm text-muted-foreground flex-wrap",
                      isLeft ? "md:justify-end" : "justify-start"
                    )}>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatExperiencePeriod(exp)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className={cn(
                    "text-sm text-muted-foreground mb-4",
                    isLeft ? "md:text-right" : ""
                  )}>
                    {exp.description}
                  </p>
                  
                  {/* Achievements - Terminal style */}
                  <div className="bg-background/50 rounded-lg p-4 font-mono text-sm">
                    <p className="text-neon-cyan mb-2">$ achievements --list</p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-muted-foreground">
                          <span className="text-neon-green mr-2">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div className={cn(
                    "flex flex-wrap gap-1 mt-4",
                    isLeft ? "md:justify-end" : "justify-start"
                  )}>
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default ExperienceSection;
