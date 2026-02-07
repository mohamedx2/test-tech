/**
 * ============================================
 * 📬 SECTION : Contact
 * ============================================
 * 
 * Formulaire de contact avec :
 * - Validation Zod côté client
 * - Soumission vers API Next.js
 * - Feedback visuel (loading, success, error)
 * - Animations Framer Motion
 * - Honeypot anti-spam
 * 
 * L'API route transmet les données à n8n via webhook.
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations";
import { contactConfig, siteConfig } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string | null;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: null,
  });
  
  // Honeypot field (invisible aux humains)
  const [honeypot, setHoneypot] = useState("");
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error on change
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - si rempli = bot
    if (honeypot) {
      console.log("Bot detected");
      return;
    }
    
    // Validation côté client
    const validation = contactFormSchema.safeParse(formData);
    
    if (!validation.success) {
      const errors: FieldErrors = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        errors[field] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }
    
    // Submit
    setFormState({ status: "loading", message: null });
    setFieldErrors({});
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.data,
          timestamp: Date.now(),
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setFormState({
          status: "success",
          message: contactConfig.messages.success,
        });
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormState({
          status: "error",
          message: result.error || contactConfig.messages.error,
        });
      }
    } catch {
      setFormState({
        status: "error",
        message: contactConfig.messages.error,
      });
    }
  };
  
  const isLoading = formState.status === "loading";
  
  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-background" />
      
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
          <Badge variant="outline" className="mb-4 border-neon-green/50">
            <MessageSquare className="h-3 w-3 mr-1 text-neon-green" />
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Contact
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un projet en tête ? Une question ? N&apos;hésitez pas à me contacter.
            <br />
            <span className="text-neon-cyan">Je réponds généralement sous 24h.</span>
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <motion.div
            className="space-y-8"
            variants={slideInLeft}
          >
            {/* Terminal window */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 text-xs text-background font-medium">
                  contact.sh
                </span>
              </div>
              <div className="terminal-body space-y-3">
                <p>
                  <span className="text-neon-cyan">$</span>{" "}
                  <span className="text-muted-foreground">echo $EMAIL</span>
                </p>
                <p className="text-neon-green pl-4">{siteConfig.links.email}</p>
                
                <p>
                  <span className="text-neon-cyan">$</span>{" "}
                  <span className="text-muted-foreground">echo $LOCATION</span>
                </p>
                <p className="text-neon-green pl-4">Paris, France 🇫🇷</p>
                
                <p>
                  <span className="text-neon-cyan">$</span>{" "}
                  <span className="text-muted-foreground">echo $AVAILABILITY</span>
                </p>
                <p className="text-neon-green pl-4">Open to opportunities ✨</p>
                
                <p className="text-muted-foreground mt-4">
                  <span className="text-neon-magenta">---</span>
                  <br />
                  Préférence: <span className="text-neon-cyan">Full-time</span> |{" "}
                  <span className="text-neon-cyan">Remote-friendly</span>
                </p>
              </div>
            </div>
            
            {/* Direct email link */}
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border
                         bg-card/50 hover:border-neon-cyan/50 hover:bg-neon-cyan/5
                         transition-all duration-300 group"
            >
              <div className="p-3 rounded-lg bg-neon-cyan/10 text-neon-cyan">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium group-hover:text-neon-cyan transition-colors">
                  Email direct
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.links.email}
                </p>
              </div>
            </a>
          </motion.div>
          
          {/* Right: Contact form */}
          <motion.div variants={slideInRight}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot - hidden from humans */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px] opacity-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              
              {/* Name */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2"
                >
                  Nom <span className="text-neon-magenta">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={isLoading}
                  className={cn(
                    "bg-card/50 border-border",
                    "focus:border-neon-cyan focus:ring-neon-cyan/20",
                    fieldErrors.name && "border-destructive"
                  )}
                />
                {fieldErrors.name && (
                  <p className="text-sm text-destructive mt-1">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                >
                  Email <span className="text-neon-magenta">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  disabled={isLoading}
                  className={cn(
                    "bg-card/50 border-border",
                    "focus:border-neon-cyan focus:ring-neon-cyan/20",
                    fieldErrors.email && "border-destructive"
                  )}
                />
                {fieldErrors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              
              {/* Subject */}
              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium mb-2"
                >
                  Sujet
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Proposition de projet..."
                  disabled={isLoading}
                  className="bg-card/50 border-border focus:border-neon-cyan focus:ring-neon-cyan/20"
                />
              </div>
              
              {/* Message */}
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-2"
                >
                  Message <span className="text-neon-magenta">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Bonjour, je souhaiterais discuter de..."
                  rows={5}
                  disabled={isLoading}
                  className={cn(
                    "bg-card/50 border-border resize-none",
                    "focus:border-neon-cyan focus:ring-neon-cyan/20",
                    fieldErrors.message && "border-destructive"
                  )}
                />
                <div className="flex justify-between mt-1">
                  {fieldErrors.message && (
                    <p className="text-sm text-destructive">
                      {fieldErrors.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground ml-auto">
                    {formData.message.length}/{contactConfig.maxMessageLength}
                  </p>
                </div>
              </div>
              
              {/* Submit button */}
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              
              {/* Status messages */}
              {formState.status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-lg 
                             bg-neon-green/10 border border-neon-green/30 text-neon-green"
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{formState.message}</p>
                </motion.div>
              )}
              
              {formState.status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-lg 
                             bg-destructive/10 border border-destructive/30 text-destructive"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{formState.message}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;
