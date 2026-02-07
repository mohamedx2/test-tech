# ============================================
# 🔄 WORKFLOW N8N - Guide de Configuration
# ============================================

## 📋 Vue d'ensemble

Ce document explique comment configurer n8n pour automatiser le traitement
des messages du formulaire de contact.

## 🎯 Objectifs du workflow

1. **Recevoir** les données du formulaire via webhook
2. **Envoyer** un email d'alerte au propriétaire
3. **Notifier** via Slack/WhatsApp
4. **BONUS** : Générer une réponse IA et la stocker

---

## 📊 Schéma du Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────────────────────┐  │
│  │ Webhook  │───▶│ Function │───▶│           Split in Batches           │  │
│  │ Trigger  │    │ (Format) │    │                                      │  │
│  └──────────┘    └──────────┘    └──────────────────────────────────────┘  │
│                                               │                             │
│                   ┌───────────────────────────┼───────────────────────────┐ │
│                   │                           │                           │ │
│                   ▼                           ▼                           ▼ │
│           ┌──────────────┐            ┌──────────────┐            ┌───────┐ │
│           │    Email     │            │    Slack     │            │  AI   │ │
│           │   (Resend)   │            │   Webhook    │            │ Groq  │ │
│           └──────────────┘            └──────────────┘            └───────┘ │
│                                                                       │     │
│                                                                       ▼     │
│                                                              ┌────────────┐ │
│                                                              │ Save Draft │ │
│                                                              │   Email    │ │
│                                                              └────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Configuration Étape par Étape

### 1. Créer le Webhook Trigger

**Node**: `Webhook`

```json
{
  "httpMethod": "POST",
  "path": "portfolio-contact",
  "responseMode": "onReceived",
  "responseData": "allEntries"
}
```

**Important**: Copier l'URL du webhook et la mettre dans `.env.local`:
```
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/portfolio-contact
```

---

### 2. Formater les données

**Node**: `Function`

```javascript
// Extraire et formater les données du formulaire
const data = items[0].json;

const formattedData = {
  name: data.name || 'Non spécifié',
  email: data.email || 'Non spécifié',
  subject: data.subject || 'Contact depuis le portfolio',
  message: data.message || '',
  timestamp: data.timestamp || new Date().toISOString(),
  source: data.source || 'portfolio',
  
  // Formatage pour l'email
  emailSubject: `[Portfolio] Nouveau message de ${data.name}`,
  
  // Formatage pour Slack
  slackText: `🚀 *Nouveau contact portfolio*\n\n` +
             `👤 *De:* ${data.name}\n` +
             `📧 *Email:* ${data.email}\n` +
             `📋 *Sujet:* ${data.subject || 'Non spécifié'}\n\n` +
             `💬 *Message:*\n${data.message}`,
};

return [{ json: formattedData }];
```

---

### 3. Configurer l'envoi d'Email (Resend)

**Node**: `HTTP Request` (ou `Resend` si disponible)

**Méthode**: POST  
**URL**: `https://api.resend.com/emails`

**Headers**:
```
Authorization: Bearer {{$env.RESEND_API_KEY}}
Content-Type: application/json
```

**Body**:
```json
{
  "from": "Portfolio <contact@votredomaine.com>",
  "to": ["votre-email@example.com"],
  "subject": "{{$json.emailSubject}}",
  "html": "<h2>Nouveau message de contact</h2><p><strong>De:</strong> {{$json.name}} ({{$json.email}})</p><p><strong>Sujet:</strong> {{$json.subject}}</p><hr><p>{{$json.message}}</p><hr><p><small>Reçu le {{$json.timestamp}}</small></p>"
}
```

**Alternative SMTP** (Gmail, etc.):
- Utiliser le node `Email Send (IMAP)`
- Configurer les credentials SMTP

---

### 4. Configurer Slack Webhook

**Node**: `HTTP Request`

**Méthode**: POST  
**URL**: `https://hooks.slack.com/services/XXX/YYY/ZZZ`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "text": "{{$json.slackText}}",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "{{$json.slackText}}"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "📧 Répondre"
          },
          "url": "mailto:{{$json.email}}"
        }
      ]
    }
  ]
}
```

**Comment obtenir l'URL Slack**:
1. Aller sur https://api.slack.com/apps
2. Créer une app ou en sélectionner une
3. Activer "Incoming Webhooks"
4. Créer un webhook pour le channel souhaité

---

### 5. (BONUS) Intégration IA avec Groq

**Pourquoi Groq?**
- API gratuite (avec limites généreuses)
- Très rapide (LPU inference)
- Compatible OpenAI API format

**Node**: `HTTP Request`

**Méthode**: POST  
**URL**: `https://api.groq.com/openai/v1/chat/completions`

**Headers**:
```
Authorization: Bearer {{$env.GROQ_API_KEY}}
Content-Type: application/json
```

**Body**:
```json
{
  "model": "llama3-8b-8192",
  "messages": [
    {
      "role": "system",
      "content": "Tu es un assistant qui aide à rédiger des réponses professionnelles et amicales aux messages reçus sur un portfolio de développeur. Génère une réponse en français, courte (3-5 phrases), personnalisée basée sur le message reçu. Commence par remercier, montre de l'intérêt, et propose une prochaine étape (call, échange email, etc.)."
    },
    {
      "role": "user",
      "content": "Voici un message reçu:\n\nDe: {{$json.name}}\nSujet: {{$json.subject}}\nMessage: {{$json.message}}\n\nGénère une réponse appropriée."
    }
  ],
  "max_tokens": 300,
  "temperature": 0.7
}
```

**Obtenir une clé Groq (gratuite)**:
1. Aller sur https://console.groq.com
2. Créer un compte
3. Générer une API key

---

### 6. Stocker le brouillon (Google Drafts)

**Node**: `Google Gmail` (Draft Create)

Configurer les credentials OAuth2 Google, puis:

```
To: {{$json.email}}
Subject: Re: {{$json.subject}}
Body: {{$node["HTTP Request (Groq)"].json.choices[0].message.content}}
```

---

## 🔒 Bonnes Pratiques

### Sécurité
- Ne JAMAIS commiter les clés API
- Utiliser les variables d'environnement n8n
- Activer l'authentification webhook en production

### Performance
- Activer le retry sur erreur
- Logger les erreurs vers un channel dédié
- Limiter le rate des appels AI

### Monitoring
- Ajouter un node de log en fin de workflow
- Configurer des alertes sur échec

---

## 📹 Script Démo Vidéo (2-3 min)

### Introduction (20s)
"Bonjour, je vais vous montrer comment j'ai automatisé le traitement des 
messages de contact de mon portfolio avec n8n."

### Workflow Overview (30s)
"Quand quelqu'un remplit le formulaire, voici ce qui se passe automatiquement..."
*Montrer le schéma du workflow*

### Démonstration Live (90s)
1. Remplir le formulaire sur le portfolio
2. Montrer le webhook reçu dans n8n
3. Montrer l'email reçu
4. Montrer la notification Slack
5. Montrer la réponse générée par l'IA

### Conclusion (20s)
"Cette automatisation me fait gagner du temps tout en assurant une réponse 
rapide aux visiteurs. Le code est open source, lien en description."

---

## 🔗 Ressources

- [Documentation n8n](https://docs.n8n.io/)
- [API Resend](https://resend.com/docs)
- [Slack Webhooks](https://api.slack.com/messaging/webhooks)
- [Groq API](https://console.groq.com/docs)
- [n8n Self-Host Docker](https://docs.n8n.io/hosting/installation/docker/)
