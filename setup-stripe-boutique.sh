#!/bin/bash

# Script pour configurer Stripe Boutique
# Exécutez ce script : bash setup-stripe-boutique.sh

ENV_FILE=".env.local"

# Créer le fichier .env.local s'il n'existe pas
if [ ! -f "$ENV_FILE" ]; then
    touch "$ENV_FILE"
    echo "# Variables d'environnement locales" >> "$ENV_FILE"
    echo "" >> "$ENV_FILE"
fi

# Ajouter la clé Stripe Boutique
echo "" >> "$ENV_FILE"
echo "# Stripe - Compte Boutique" >> "$ENV_FILE"
echo "STRIPE_SECRET_KEY_BOUTIQUE=sk_test_VOTRE_CLE_SECRETE_ICI" >> "$ENV_FILE"
echo "" >> "$ENV_FILE"
echo "# À compléter avec le Webhook Secret (whsec_...)" >> "$ENV_FILE"
echo "# STRIPE_WEBHOOK_SECRET_BOUTIQUE=whsec_..." >> "$ENV_FILE"
echo "" >> "$ENV_FILE"
echo "# URL de base (modifiez selon votre environnement)" >> "$ENV_FILE"
echo "NEXT_PUBLIC_BASE_URL=http://localhost:3001" >> "$ENV_FILE"

echo "✅ Configuration Stripe Boutique ajoutée dans .env.local"
echo ""
echo "⚠️  N'oubliez pas de :"
echo "   1. Ajouter STRIPE_WEBHOOK_SECRET_BOUTIQUE (depuis le dashboard Stripe)"
echo "   2. Modifier NEXT_PUBLIC_BASE_URL si nécessaire"
echo "   3. Installer le package Stripe : npm install"
