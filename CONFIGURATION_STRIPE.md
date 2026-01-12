# Configuration Stripe - Deux comptes distincts

Ce projet utilise deux comptes Stripe distincts :
1. **Compte Boutique** : pour les produits (plans, graines, légumes)
2. **Compte Formations** : pour les inscriptions aux formations

## Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` (développement) ou dans les variables d'environnement de Vercel (production) :

```env
# Stripe - Compte Boutique (pour les produits : plans, graines, légumes)
STRIPE_SECRET_KEY_BOUTIQUE=sk_test_VOTRE_CLE_ICI
STRIPE_WEBHOOK_SECRET_BOUTIQUE=whsec_VOTRE_WEBHOOK_SECRET_ICI

# Stripe - Compte Formations (pour les inscriptions aux formations)
STRIPE_SECRET_KEY_FORMATIONS=sk_test_VOTRE_CLE_ICI
STRIPE_WEBHOOK_SECRET_FORMATIONS=whsec_VOTRE_WEBHOOK_SECRET_ICI

# URL de base de l'application (pour les URLs de redirection Stripe)
NEXT_PUBLIC_BASE_URL=https://votre-domaine.com
```

## Comment obtenir les clés Stripe

### 1. Compte Boutique

1. Connectez-vous à votre [tableau de bord Stripe Boutique](https://dashboard.stripe.com)
2. Allez dans **Developers** → **API keys**
3. Copiez la **Secret key** (commence par `sk_test_` pour le mode test ou `sk_live_` pour la production)
4. Collez-la dans `STRIPE_SECRET_KEY_BOUTIQUE`

### 2. Compte Formations

1. Connectez-vous à votre [tableau de bord Stripe Formations](https://dashboard.stripe.com) (compte différent)
2. Allez dans **Developers** → **API keys**
3. Copiez la **Secret key** (commence par `sk_test_` pour le mode test ou `sk_live_` pour la production)
4. Collez-la dans `STRIPE_SECRET_KEY_FORMATIONS`

## Configuration des webhooks Stripe

Les webhooks permettent de recevoir les notifications de paiement depuis Stripe.

### Pour le compte Boutique :

1. Dans le tableau de bord Stripe Boutique, allez dans **Developers** → **Webhooks**
2. Cliquez sur **Add endpoint**
3. Entrez l'URL : `https://votre-domaine.com/api/webhooks/stripe`
4. Sélectionnez les événements à écouter :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Copiez le **Signing secret** (commence par `whsec_`)
6. Collez-le dans `STRIPE_WEBHOOK_SECRET_BOUTIQUE`

### Pour le compte Formations :

1. Répétez les mêmes étapes dans le tableau de bord Stripe Formations
2. Utilisez la même URL webhook : `https://votre-domaine.com/api/webhooks/stripe`
3. Copiez le **Signing secret** du compte Formations
4. Collez-le dans `STRIPE_WEBHOOK_SECRET_FORMATIONS`

**Note importante** : Les webhooks des deux comptes peuvent utiliser la même URL. Le système détecte automatiquement quel compte a envoyé le webhook en essayant de vérifier la signature avec chaque secret.

## Installation du package Stripe

Si vous n'avez pas encore installé le package Stripe, exécutez :

```bash
npm install stripe
```

## Test en mode développement

Pour tester en local, vous pouvez utiliser le mode test de Stripe :

1. Utilisez les clés de test (commence par `sk_test_`)
2. Configurez `NEXT_PUBLIC_BASE_URL=http://localhost:3001`
3. Utilisez [Stripe CLI](https://stripe.com/docs/stripe-cli) pour forwarder les webhooks :
   ```bash
   # Pour le compte Boutique
   stripe listen --forward-to localhost:3001/api/webhooks/stripe --api-key sk_test_...
   
   # Pour le compte Formations (dans un autre terminal)
   stripe listen --forward-to localhost:3001/api/webhooks/stripe --api-key sk_test_...
   ```

## Passage en production

Lorsque vous êtes prêt pour la production :

1. Utilisez les clés de production (commence par `sk_live_`) au lieu des clés de test
2. Configurez `NEXT_PUBLIC_BASE_URL` avec votre domaine de production
3. Configurez les webhooks dans les deux tableaux de bord Stripe avec l'URL de production
4. Mettez à jour les variables d'environnement dans Vercel

## Comment ça fonctionne

Le système détecte automatiquement le type de paiement :

- **Boutique** : quand `type: 'boutique'` est envoyé (depuis `/checkout`)
- **Formation** : quand `type: 'formation'` est envoyé (depuis `/inscription-formation/[id]`)

Le système utilise alors la clé Stripe appropriée pour créer la session de paiement.

## Routes créées

- `/api/payment/create` : Crée une session Stripe Checkout (utilise la bonne clé selon le type)
- `/api/webhooks/stripe` : Reçoit les notifications Stripe (détecte automatiquement le compte)
- `/paiement/succes` : Page de confirmation après paiement réussi
- `/paiement/annule` : Page affichée si le paiement est annulé
