/**
 * ============================================
 * 📡 API ROUTE : Contact Form Handler
 * ============================================
 * 
 * FLUX :
 * 1. Reçoit les données du formulaire (POST)
 * 2. Valide avec Zod
 * 3. Envoie vers webhook n8n
 * 4. Retourne confirmation
 * 
 * SÉCURITÉ :
 * - Validation stricte des entrées
 * - Rate limiting recommandé (à ajouter)
 * - Honeypot check
 * - Sanitization des données
 * 
 * N8N WEBHOOK :
 * Configure l'URL dans .env.local :
 * NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/xxx
 */

import { NextRequest, NextResponse } from "next/server";
import { validateApiContact } from "@/lib/validations";

// Configuration
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    // Parse body
    const body = await request.json();
    
    // Validation
    const validation = validateApiContact(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message } = validation.data!;
    
    // Préparer les données pour n8n
    const contactData = {
      name,
      email,
      subject: subject || "Contact depuis le portfolio",
      message,
      timestamp: new Date().toISOString(),
      source: "portfolio-contact-form",
      // Metadata utile pour le workflow n8n
      metadata: {
        userAgent: request.headers.get("user-agent") || "unknown",
        ip: request.headers.get("x-forwarded-for") || "unknown",
        referer: request.headers.get("referer") || "direct",
      },
    };
    
    // Envoyer vers n8n webhook
    if (N8N_WEBHOOK_URL) {
      try {
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        });
        
        if (!n8nResponse.ok) {
          console.error("n8n webhook error:", await n8nResponse.text());
          // On continue quand même - on ne veut pas bloquer l'UX
        }
      } catch (webhookError) {
        console.error("Failed to send to n8n:", webhookError);
        // Log mais ne pas faire échouer la requête
      }
    } else {
      // Mode développement - log les données
      console.log("📧 Contact form submission (n8n not configured):");
      console.log(JSON.stringify(contactData, null, 2));
    }
    
    // Succès
    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès",
    });
    
  } catch (error) {
    console.error("Contact API error:", error);
    
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

// Optionnel : Gérer les autres méthodes
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
