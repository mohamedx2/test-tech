/**
 * ============================================
 * 💪 SECTION: Skills
 * ============================================
 * 
 * Presentation of skills with:
 * - Organized categories
 * - Animated progress bars
 * - Detailed hover effects
 * - Gaming style (XP bars)
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
      <div className="absolute inset-0 racing-track-bg opacity-10" />

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
          <Badge className="mb-4 bg-game-blue text-white font-bold px-4 py-1 rounded-lg shadow-[0_0_10px_rgba(69,123,157,0.3)]">
            POWER-UP INVENTORY
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 racing-glow-yellow italic">
            SKILLS
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Turbocharging projects with the most efficient technologic stack.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {skills.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon] || Zap;
            const isAlternate = categoryIndex % 2 !== 0;

            return (
              <motion.div
                key={category.id}
                className={cn(
                  "p-8 rounded-2xl border-2 track-card relative overflow-hidden",
                  isAlternate ? "border-game-blue/30" : "border-game-red/30"
                )}
                variants={fadeInUp}
              >
                {/* Decorative background element */}
                <div className={cn(
                  "absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10",
                  isAlternate ? "bg-game-blue" : "bg-game-red"
                )} />

                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={cn(
                      "p-4 rounded-2xl shadow-lg",
                      isAlternate
                        ? "bg-game-blue text-white shadow-[0_0_15px_rgba(69,123,157,0.3)]"
                        : "bg-game-red text-white shadow-[0_0_15px_rgba(230,57,70,0.3)]"
                    )}
                  >
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills list */}
                <motion.div
                  className="space-y-6"
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
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-sm group-hover:text-game-yellow transition-colors uppercase tracking-tight">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase text-game-yellow bg-game-yellow/10 px-2 py-0.5 rounded border border-game-yellow/20">
                            XP: {skill.years}Y
                          </span>
                          <span className="bg-foreground text-background font-black text-[10px] px-2 py-0.5 rounded italic">
                            LVL {Math.floor(skill.level / 10)}
                          </span>
                        </div>
                      </div>

                      {/* Progress bar as Acceleration Gauge */}
                      <div className="h-3 bg-muted rounded-full overflow-hidden border border-border/50 relative">
                        <motion.div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            isAlternate
                              ? "bg-gradient-to-r from-game-blue to-cyan-400"
                              : "bg-gradient-to-r from-game-red to-orange-400"
                          )}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.5,
                            delay: 0.2,
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                        />
                        {/* Gauge indicators */}
                        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-30">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-full w-[1px] bg-background" />
                          ))}
                        </div>
                      </div>
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
