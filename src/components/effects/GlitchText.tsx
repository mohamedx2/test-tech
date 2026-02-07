"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[var(--neon-magenta)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[2px] group-hover:block transition-none duration-100 animate-pulse">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[var(--neon-cyan)] opacity-0 group-hover:opacity-100 group-hover:-translate-x-[2px] group-hover:block transition-none duration-100 animate-pulse delay-75">
                {text}
            </span>
        </div>
    );
};
