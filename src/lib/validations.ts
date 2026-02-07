/**
 * ============================================
 * ✅ SCHÉMAS DE VALIDATION ZOD
 * ============================================
 * 
 * POURQUOI ZOD ?
 * - Validation côté client ET serveur avec le même schéma
 * - Inférence de types TypeScript automatique
 * - Messages d'erreur personnalisables
 * - Composition et réutilisabilité
 * 
 * PRINCIPE :
 * Définir une fois, utiliser partout.
 */

import { z } from "zod";
import { contactConfig } from "./constants";

// ============================================
// 📬 FORMULAIRE DE CONTACT
// ============================================

const { messages } = contactConfig;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, messages.validation.nameRequired)
    .max(contactConfig.maxNameLength, `Max ${contactConfig.maxNameLength} caractères`)
    .trim(),
  
  email: z
    .string()
    .min(1, messages.validation.emailRequired)
    .email(messages.validation.emailInvalid)
    .toLowerCase()
    .trim(),
  
  subject: z
    .string()
    .max(contactConfig.maxSubjectLength, `Max ${contactConfig.maxSubjectLength} caractères`)
    .optional()
    .default(""),
  
  message: z
    .string()
    .min(1, messages.validation.messageRequired)
    .max(contactConfig.maxMessageLength, messages.validation.messageTooLong)
    .trim(),
});

// Inférer le type TypeScript depuis le schéma
export type ContactFormInput = z.infer<typeof contactFormSchema>;

// ============================================
// 🔐 VALIDATION API (serveur)
// ============================================

/**
 * Schéma pour valider les données entrantes dans l'API
 * Inclut des validations supplémentaires de sécurité
 */
export const apiContactSchema = contactFormSchema.extend({
  // Honeypot field - doit être vide (anti-spam)
  honeypot: z.string().max(0, "Nice try, bot").optional(),
  
  // Timestamp pour rate limiting basique
  timestamp: z.number().optional(),
});

export type ApiContactInput = z.infer<typeof apiContactSchema>;

// ============================================
// 🛡️ HELPERS DE VALIDATION
// ============================================

/**
 * Valide les données et retourne un résultat typé
 * Utile pour les formulaires côté client
 */
export function validateContactForm(data: unknown) {
  const result = contactFormSchema.safeParse(data);
  
  if (!result.success) {
    // Formater les erreurs pour affichage
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    return { success: false, errors, data: null };
  }
  
  return { success: true, errors: null, data: result.data };
}

/**
 * Valide côté API avec vérifications supplémentaires
 */
export function validateApiContact(data: unknown) {
  const result = apiContactSchema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Validation failed",
      data: null,
    };
  }
  
  return { success: true, error: null, data: result.data };
}

// ============================================
// 🔧 SCHÉMAS RÉUTILISABLES
// ============================================

// Email seul (pour newsletter, etc.)
export const emailSchema = z
  .string()
  .email("Format d'email invalide")
  .toLowerCase()
  .trim();

// URL (pour liens de projets)
export const urlSchema = z
  .string()
  .url("URL invalide")
  .or(z.literal("")); // Permet les champs vides

// Slug (pour URLs propres)
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Format de slug invalide");
