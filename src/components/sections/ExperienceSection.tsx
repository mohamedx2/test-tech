/**
 * ============================================
 * 💼 SECTION: Experience
 * ============================================
 * 
 * Timeline of professional experiences with:
 * - Reverse chronological format
 * - Scroll animations
 * - Expandable details
 * - Terminal style for achievements
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
          <Badge className="mb-4 bg-game-red text-white font-bold px-4 py-1 rounded-lg shadow-[0_0_10px_rgba(230,57,70,0.3)]">
            SEASON HIGHLIGHTS
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 racing-glow italic">
            CAREER TRACK
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Navigating through complex circuits and winning technical championships.
          </p>
        </motion.div>

        {/* Timeline as Racing Track */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Track strip */}
          <div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-8 md:w-12 bg-neutral-900 border-x-2 border-neutral-700"
            style={{ transform: "translateX(-50%)" }}
          >
            {/* Center dashed line */}
            <div className="absolute inset-y-0 left-1/2 w-0.5 border-l-2 border-dashed border-white/30 h-full" />
          </div>

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isCurrentJob = !exp.endDate;

            return (
              <motion.div
                key={exp.id}
                className={cn(
                  "relative mb-16 md:mb-24",
                  "md:w-1/2",
                  isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"
                )}
                variants={isLeft ? slideInLeft : fadeInUp}
              >
                {/* Timeline checkpoint / Trophy */}
                <div
                  className={cn(
                    "absolute top-0 w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 shadow-xl",
                    "left-0 md:left-auto",
                    isLeft ? "md:-right-5" : "md:-left-5",
                    isCurrentJob
                      ? "bg-game-yellow border-background text-background animate-bounce"
                      : "bg-card border-game-red text-game-red"
                  )}
                  style={{ transform: "translateX(-50%)" }}
                >
                  {isCurrentJob ? "🏆" : "🏁"}
                </div>

                {/* Card as Race Result */}
                <div
                  className={cn(
                    "ml-10 md:ml-0 p-8 rounded-2xl track-card border-l-4",
                    isCurrentJob ? "border-l-game-yellow bg-game-yellow/5" : "border-l-game-red"
                  )}
                >
                  {/* Header */}
                  <div className={cn("mb-6", isLeft ? "md:text-right" : "")}>
                    {/* Badge type */}
                    <Badge
                      className={cn(
                        "mb-3 px-3 py-1 font-black uppercase tracking-tighter italic",
                        isCurrentJob ? "bg-game-yellow text-background" : "bg-game-red text-white"
                      )}
                    >
                      {exp.type} {isCurrentJob && "• LIVE RACE"}
                    </Badge>

                    {/* Role */}
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-1 leading-tight">
                      {exp.role}
                    </h3>

                    {/* Company with Icon */}
                    <div className={cn("flex items-center gap-2 mb-3", isLeft ? "md:justify-end" : "justify-start")}>
                      <span className="text-game-blue font-black tracking-widest uppercase text-sm">
                        {exp.company}
                      </span>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-game-yellow transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className={cn(
                      "flex gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground",
                      isLeft ? "md:justify-end" : "justify-start"
                    )}>
                      <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                        <Calendar className="h-3 w-3" />
                        {formatExperiencePeriod(exp)}
                      </span>
                      <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Performance stats / Description */}
                  <p className={cn(
                    "text-sm font-medium text-foreground/80 mb-6 leading-relaxed",
                    isLeft ? "md:text-right" : ""
                  )}>
                    {exp.description}
                  </p>

                  {/* Achievements as "Win Conditions" */}
                  <div className="bg-background/80 rounded-xl p-5 border-2 border-border/50 shadow-inner">
                    <p className="text-[10px] font-black text-game-yellow mb-3 uppercase tracking-widest flex items-center gap-2">
                      <span className="animate-coin">🪙</span>
                      CHALLENGES COMPLETED
                    </p>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-xs font-bold flex items-start gap-3">
                          <span className="text-game-green text-lg leading-none mt-0.5">★</span>
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools as Mods */}
                  <div className={cn(
                    "flex flex-wrap gap-2 mt-6",
                    isLeft ? "md:justify-end" : "justify-start"
                  )}>
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="text-[9px] font-black uppercase tracking-tighter bg-game-blue/10 text-game-blue border border-game-blue/20 px-2 py-1 rounded-md">
                        {tech}
                      </span>
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
