# Guide : Configuration du compte Stripe Formations

Ce guide vous explique comment ajouter le deuxième compte Stripe pour les formations.

## ✅ État actuel

Le code est **déjà prêt** pour gérer deux comptes Stripe :
- ✅ Compte Boutique : déjà configuré
- ⏳ Compte Formations : à configurer

## 📋 Étapes à suivre

### Étape 1 : Obtenir les clés Stripe du compte Formations

1. **Connectez-vous au tableau de bord Stripe du compte Formations**
   - Allez sur https://dashboard.stripe.com
   - Assurez-vous d'être connecté au **bon compte** (celui pour les formations)

2. **Récupérer la Secret Key**
   - Allez dans **Developers** → **API keys**
   - Copiez la **Secret key** (commence par `sk_test_` pour le test ou `sk_live_` pour la production)
   - ⚠️ **Important** : Utilisez le mode **test** (`sk_test_...`) pour commencer

3. **Récupérer le Webhook Secret** (à faire après l'étape 3)

---

### Étape 2 : Ajouter les variables dans `.env.local`

Ouvrez votre fichier `.env.local` et ajoutez ces lignes :

```env
# Stripe - Compte Formations (pour les inscriptions aux formations)
STRIPE_SECRET_KEY_FORMATIONS=sk_test_VOTRE_CLE_FORMATIONS_ICI
STRIPE_WEBHOOK_SECRET_FORMATIONS=whsec_VOTRE_WEBHOOK_SECRET_FORMATIONS_ICI
```

**Remplacez** :
- `sk_test_VOTRE_CLE_FORMATIONS_ICI` par votre vraie clé secrète Stripe Formations
- `whsec_VOTRE_WEBHOOK_SECRET_FORMATIONS_ICI` par le webhook secret (à obtenir à l'étape 3)

---

### Étape 3 : Configurer les webhooks Stripe Formations

#### En développement local (test) :

1. **Installez Stripe CLI** (si pas déjà fait) :
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Connectez-vous à Stripe CLI** :
   ```bash
   stripe login
   ```

3. **Forwardez les webhooks vers votre serveur local** :
   ```bash
   stripe listen --forward-to localhost:3001/api/webhooks/stripe --api-key sk_test_VOTRE_CLE_FORMATIONS
   ```
   
   Remplacez `sk_test_VOTRE_CLE_FORMATIONS` par votre clé secrète Formations.

4. **Copiez le webhook signing secret** affiché (commence par `whsec_`)
5. **Ajoutez-le dans `.env.local`** comme `STRIPE_WEBHOOK_SECRET_FORMATIONS`

#### En production (Vercel) :

1. **Dans le tableau de bord Stripe Formations**, allez dans **Developers** → **Webhooks**
2. **Cliquez sur "Add endpoint"**
3. **Entrez l'URL** : `https://votre-domaine.vercel.app/api/webhooks/stripe`
   - Remplacez `votre-domaine.vercel.app` par votre vrai domaine Vercel
4. **Sélectionnez les événements** :
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
5. **Cliquez sur "Add endpoint"**
6. **Copiez le "Signing secret"** (commence par `whsec_`)
7. **Ajoutez-le dans Vercel** comme variable d'environnement `STRIPE_WEBHOOK_SECRET_FORMATIONS`

---

### Étape 4 : Ajouter les variables dans Vercel (production)

1. **Allez sur https://vercel.com** et connectez-vous
2. **Sélectionnez votre projet** "perma-coach"
3. **Allez dans Settings** → **Environment Variables**
4. **Ajoutez ces deux variables** :

   | Name | Value | Environment |
   |------|-------|-------------|
   | `STRIPE_SECRET_KEY_FORMATIONS` | `sk_live_VOTRE_CLE_FORMATIONS` | Production |
   | `STRIPE_WEBHOOK_SECRET_FORMATIONS` | `whsec_VOTRE_WEBHOOK_SECRET` | Production |

   ⚠️ **Important** : Utilisez les clés de **production** (`sk_live_...`) dans Vercel, pas les clés de test.

5. **Redeployez** votre application pour que les nouvelles variables soient prises en compte

---

### Étape 5 : Tester

#### Test en local :

1. **Démarrez le serveur** :
   ```bash
   npm run dev
   ```

2. **Allez sur une page de formation** :
   - Par exemple : `http://localhost:3001/inscription-formation/1`
   - Ou depuis la page `/pebi-formations`

3. **Remplissez le formulaire** et cliquez sur "Payer et s'inscrire"

4. **Vérifiez** :
   - ✅ Vous êtes redirigé vers Stripe Checkout
   - ✅ Le paiement utilise le compte Formations (vérifiez dans le dashboard Stripe)
   - ✅ Après paiement, vous revenez sur `/paiement/succes`
   - ✅ Un email est envoyé à `permacoach51@gmail.com`

#### Test en production :

1. **Poussez vos modifications** :
   ```bash
   git add .env.local
   git commit -m "Ajout configuration Stripe Formations"
   git push
   ```

2. **Attendez le déploiement Vercel** (quelques minutes)

3. **Testez sur votre site en ligne** :
   - Allez sur une page de formation
   - Faites un test de paiement
   - Vérifiez que tout fonctionne

---

## 🔍 Vérification

Pour vérifier que tout est bien configuré :

1. **Vérifiez les variables d'environnement** :
   ```bash
   # En local, vérifiez que .env.local contient bien les deux clés
   cat .env.local | grep STRIPE
   ```

2. **Vérifiez les logs** :
   - En local : regardez la console du serveur
   - En production : regardez les logs Vercel

3. **Testez un paiement** :
   - Boutique : doit utiliser `STRIPE_SECRET_KEY_BOUTIQUE`
   - Formation : doit utiliser `STRIPE_SECRET_KEY_FORMATIONS`

---

## ❓ Dépannage

### Erreur : "Configuration Stripe manquante pour les formations"

**Solution** : Vérifiez que `STRIPE_SECRET_KEY_FORMATIONS` est bien défini dans :
- `.env.local` (pour le local)
- Vercel Environment Variables (pour la production)

### Les webhooks ne fonctionnent pas

**Solution** :
1. Vérifiez que `STRIPE_WEBHOOK_SECRET_FORMATIONS` est bien configuré
2. Vérifiez que l'URL du webhook dans Stripe correspond à votre domaine
3. En local, utilisez Stripe CLI pour forwarder les webhooks

### Le paiement utilise le mauvais compte Stripe

**Solution** : Vérifiez que :
- La page `/inscription-formation/[id]` envoie bien `type: 'formation'`
- La variable `STRIPE_SECRET_KEY_FORMATIONS` contient bien la clé du compte Formations

---

## 📝 Résumé des fichiers modifiés

Aucun fichier de code n'a besoin d'être modifié ! Le code est déjà prêt. Il suffit d'ajouter les variables d'environnement :

- ✅ `.env.local` (développement)
- ✅ Vercel Environment Variables (production)

---

## 🎯 Prochaines étapes

Une fois la configuration terminée :

1. ✅ Testez un paiement de formation en local
2. ✅ Testez un paiement de formation en production
3. ✅ Vérifiez que les emails sont bien envoyés après paiement
4. ✅ Vérifiez que les commandes sont bien enregistrées dans Vercel KV

---

**Besoin d'aide ?** Consultez `CONFIGURATION_STRIPE.md` pour plus de détails.
