/**
 * ============================================
 * 💪 SECTION : Skills
 * ============================================
 * 
 * Présentation des compétences avec :
 * - Catégories organisées
 * - Barres de progression animées
 * - Hover effects détaillés
 * - Style gaming (XP bars)
 */

"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Settings, Users, Zap } from "lucide-react";

import { skills } from "@/data/skills";
import { staggerContainer, fadeInUp, staggerContainerFast } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Map des icônes
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Server,
  Settings,
  Users,
  Zap,
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
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
          <Badge variant="outline" className="mb-4 border-neon-magenta/50">
            <Zap className="h-3 w-3 mr-1 text-neon-magenta" />
            Skills & Powers
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Compétences
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mon arsenal technologique, affiné par des années de pratique et de projets concrets.
          </p>
        </motion.div>
        
        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon] || Zap;
            
            return (
              <motion.div
                key={category.id}
                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm
                           hover:border-neon-cyan/30 transition-all duration-300"
                variants={fadeInUp}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className={cn(
                      "p-3 rounded-lg",
                      categoryIndex % 2 === 0 
                        ? "bg-neon-cyan/10 text-neon-cyan" 
                        : "bg-neon-magenta/10 text-neon-magenta"
                    )}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                {/* Skills list */}
                <motion.div
                  className="space-y-4"
                  variants={staggerContainerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="group"
                      variants={fadeInUp}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm group-hover:text-neon-cyan transition-colors">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {skill.years}y exp
                          </span>
                          <span className="xp-badge">
                            LVL {Math.floor(skill.level / 10)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="skill-bar">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1, 
                            delay: 0.2,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                        />
                      </div>
                      
                      {/* Description on hover */}
                      {skill.description && (
                        <p className="text-xs text-muted-foreground mt-1 
                                      opacity-0 group-hover:opacity-100 transition-opacity">
                          {skill.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default SkillsSection;
