/**
 * ============================================
 * 📬 SECTION: Contact
 * ============================================
 * 
 * Contact form with:
 * - Client-side Zod validation
 * - Submission to Next.js API
 * - Visual feedback (loading, success, error)
 * - Framer Motion animations
 * - Anti-spam Honeypot
 * 
 * The API route forwards data to n8n via webhook.
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

  // Honeypot field (invisible to humans)
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

    // Honeypot check - if filled = bot
    if (honeypot) {
      console.log("Bot detected");
      return;
    }

    // Client-side validation
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
      <div className="absolute inset-0 racing-track-bg opacity-5" />

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
          <Badge className="mb-4 bg-game-green text-white font-bold px-4 py-1 rounded-lg shadow-[0_0_10px_rgba(42,157,143,0.3)]">
            PIT STOP - READY TO CONNECT
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 racing-glow italic">
            CONTACT
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Send a signal to the pit crew. I generally respond before the next lap starts.
            <br />
            <span className="text-game-yellow">Response time: &lt; 24h average.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <motion.div
            className="space-y-8"
            variants={slideInLeft}
          >
            {/* Driver Profile Card */}
            <div className="rounded-2xl border-4 border-game-blue bg-card shadow-2xl overflow-hidden">
              <div className="bg-game-blue p-4 flex items-center justify-between">
                <span className="font-black italic text-white tracking-widest uppercase">Driver ID Card</span>
                <span className="text-white/50 text-xs font-mono">ID: MAH-88</span>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-game-red flex items-center justify-center text-4xl shadow-inner border-4 border-background">
                    🏎️
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">{siteConfig.name}</h3>
                    <p className="text-game-blue font-bold text-sm">PRO DEVELOPER</p>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-game-green animate-pulse" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Available for work</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border w-full" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase">Location</p>
                    <p className="font-bold text-sm">MAHDIA, TN ��</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase">Specialty</p>
                    <p className="font-bold text-sm text-game-red">FULL-STACK</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase">Rank</p>
                    <p className="font-bold text-sm text-game-yellow">#1 TOP TIER</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase">Mood</p>
                    <p className="font-bold text-sm">HYPER-FOCUSED</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct communication */}
            <div className="grid grid-cols-1 gap-4">
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="flex items-center gap-4 p-5 rounded-2xl border-2 border-border bg-card hover:border-game-yellow hover:bg-game-yellow/5 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-game-yellow/10 text-game-yellow group-hover:bg-game-yellow group-hover:text-background transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Direct Channel
                  </p>
                  <p className="font-bold text-foreground">
                    {siteConfig.links.email}
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div variants={slideInRight}>
            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border-4 border-game-yellow bg-card/50 backdrop-blur-md shadow-2xl relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 finish-line-pattern opacity-10 rotate-45 translate-x-10 -translate-y-10" />

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
                  className="block text-xs font-black uppercase tracking-widest mb-2 text-muted-foreground"
                >
                  Player Name <span className="text-game-red">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name..."
                  disabled={isLoading}
                  className={cn(
                    "bg-background/80 border-2 border-border h-12 rounded-xl focus:border-game-yellow font-bold",
                    fieldErrors.name && "border-game-red"
                  )}
                />
                {fieldErrors.name && (
                  <p className="text-[10px] font-black text-game-red mt-1 uppercase tracking-tighter">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-black uppercase tracking-widest mb-2 text-muted-foreground"
                >
                  Return Channel <span className="text-game-red">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address..."
                  disabled={isLoading}
                  className={cn(
                    "bg-background/80 border-2 border-border h-12 rounded-xl focus:border-game-yellow font-bold",
                    fieldErrors.email && "border-game-red"
                  )}
                />
                {fieldErrors.email && (
                  <p className="text-[10px] font-black text-game-red mt-1 uppercase tracking-tighter">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-black uppercase tracking-widest mb-2 text-muted-foreground"
                >
                  Race Category
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, hello, etc."
                  disabled={isLoading}
                  className="bg-background/80 border-2 border-border h-12 rounded-xl focus:border-game-yellow font-bold"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-black uppercase tracking-widest mb-2 text-muted-foreground"
                >
                  Data Stream <span className="text-game-red">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?..."
                  rows={4}
                  disabled={isLoading}
                  className={cn(
                    "bg-background/80 border-2 border-border rounded-xl resize-none focus:border-game-yellow font-bold",
                    fieldErrors.message && "border-game-red"
                  )}
                />
                <div className="flex justify-between mt-2">
                  {fieldErrors.message && (
                    <p className="text-[10px] font-black text-game-red uppercase tracking-tighter">
                      {fieldErrors.message}
                    </p>
                  )}
                  <p className="text-[10px] font-black text-muted-foreground uppercase">
                    {formData.message.length}/{contactConfig.maxMessageLength} Bytes
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-game-red hover:bg-red-600 text-white font-black italic uppercase tracking-tighter h-14 rounded-2xl text-xl shadow-xl shadow-red-950/20 border-b-4 border-red-900 btn-accelerate"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    ACCELERATING...
                  </>
                ) : (
                  <>
                    ENGAGE TURBO
                    <Send className="h-5 w-5 ml-3" />
                  </>
                )}
              </Button>

              {/* Status messages */}
              {formState.status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-game-green/20 border-2 border-game-green text-game-green font-bold shadow-lg"
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0" />
                  <p className="text-sm">MISSION ACCOMPLISHED! MESSAGE SENT.</p>
                </motion.div>
              )}

              {formState.status === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-game-red/20 border-2 border-game-red text-game-red font-bold shadow-lg"
                >
                  <AlertCircle className="h-6 w-6 flex-shrink-0" />
                  <p className="text-sm">CONNECTION ERROR. TRY AGAIN!</p>
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
