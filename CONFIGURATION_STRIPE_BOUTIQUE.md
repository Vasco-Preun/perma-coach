# Configuration Stripe Boutique - Instructions rapides

## ✅ Clé secrète déjà configurée

Votre clé secrète Stripe Boutique a été enregistrée. Pour l'activer :

### Option 1 : Utiliser le script automatique

Exécutez simplement :
```bash
bash setup-stripe-boutique.sh
```

Ce script créera/ajoutera les variables dans votre fichier `.env.local`.

### Option 2 : Configuration manuelle

Créez ou modifiez le fichier `.env.local` à la racine du projet et ajoutez :

```env
# Stripe - Compte Boutique
STRIPE_SECRET_KEY_BOUTIQUE=sk_test_VOTRE_CLE_SECRETE_ICI

# À compléter : Webhook Secret (voir ci-dessous)
STRIPE_WEBHOOK_SECRET_BOUTIQUE=whsec_...

# URL de base
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

## 🔑 Obtenir le Webhook Secret

1. Connectez-vous à votre [tableau de bord Stripe Boutique](https://dashboard.stripe.com)
2. Allez dans **Developers** → **Webhooks**
3. Si vous n'avez pas encore de webhook :
   - Cliquez sur **Add endpoint**
   - URL : `http://localhost:3001/api/webhooks/stripe` (pour le développement)
   - Sélectionnez les événements :
     - `checkout.session.completed`
     - `payment_intent.succeeded`
   - Cliquez sur **Add endpoint**
4. Copiez le **Signing secret** (commence par `whsec_`)
5. Ajoutez-le dans `.env.local` comme `STRIPE_WEBHOOK_SECRET_BOUTIQUE`

## 🚀 Installation et test

1. Installez le package Stripe :
   ```bash
   npm install
   ```

2. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

3. Testez un paiement depuis la boutique

## 📝 Note importante

- Le fichier `.env.local` est dans `.gitignore` et ne sera pas versionné (c'est sécurisé)
- Pour la production (Vercel), ajoutez ces variables dans **Settings** → **Environment Variables**
- Le compte Formations sera configuré plus tard quand vous y aurez accès
