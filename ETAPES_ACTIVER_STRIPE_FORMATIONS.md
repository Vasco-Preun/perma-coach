# Étapes pour activer Stripe sur les formations

## ✅ État actuel
- ✅ Code prêt (détecte automatiquement `type: 'formation'`)
- ⏳ Variables d'environnement à compléter dans `.env.local`
- ⏳ Webhooks à configurer

---

## 📋 Étapes à suivre

### Étape 1 : Obtenir la clé secrète Stripe Formations

1. **Connectez-vous au dashboard Stripe du compte Formations**
   - Allez sur https://dashboard.stripe.com
   - ⚠️ Assurez-vous d'être sur le **bon compte** (celui pour les formations)

2. **Récupérez la Secret Key**
   - Allez dans **Developers** → **API keys**
   - Copiez la **Secret key** (commence par `sk_test_...` pour le test)

3. **Remplacez dans `.env.local`** :
   ```env
   STRIPE_SECRET_KEY_FORMATIONS=sk_test_VOTRE_VRAIE_CLE_ICI
   ```

---

### Étape 2 : Configurer les webhooks (en local)

#### Option A : Utiliser Stripe CLI (recommandé pour le test local)

1. **Installez Stripe CLI** (si pas déjà fait) :
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Connectez-vous** :
   ```bash
   stripe login
   ```

3. **Dans un nouveau terminal**, forwardez les webhooks :
   ```bash
   stripe listen --forward-to localhost:3001/api/webhooks/stripe --api-key sk_test_VOTRE_CLE_FORMATIONS
   ```
   
   Remplacez `sk_test_VOTRE_CLE_FORMATIONS` par votre vraie clé.

4. **Copiez le "webhook signing secret"** affiché (commence par `whsec_...`)

5. **Ajoutez-le dans `.env.local`** :
   ```env
   STRIPE_WEBHOOK_SECRET_FORMATIONS=whsec_VOTRE_WEBHOOK_SECRET_ICI
   ```

#### Option B : Configurer directement dans le dashboard Stripe (pour la production)

1. Dans le dashboard Stripe Formations, allez dans **Developers** → **Webhooks**
2. Cliquez sur **Add endpoint**
3. URL : `https://votre-domaine.vercel.app/api/webhooks/stripe`
4. Sélectionnez les événements :
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
5. Copiez le **Signing secret** et ajoutez-le dans `.env.local`

---

### Étape 3 : Redémarrer le serveur local

Après avoir modifié `.env.local`, redémarrez le serveur :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez :
npm run dev
```

---

### Étape 4 : Tester en local

1. **Allez sur une page de formation** :
   - Par exemple : `http://localhost:3001/inscription-formation/1`
   - Ou depuis `/pebi-formations`

2. **Remplissez le formulaire** et cliquez sur "Payer et s'inscrire"

3. **Vérifiez** :
   - ✅ Redirection vers Stripe Checkout
   - ✅ Le paiement utilise le compte Formations (vérifiez dans le dashboard Stripe)
   - ✅ Après paiement, retour sur `/paiement/succes`
   - ✅ Email envoyé à `permacoach51@gmail.com`

---

### Étape 5 : Configurer pour la production (Vercel)

1. **Allez sur https://vercel.com** → Votre projet → **Settings** → **Environment Variables**

2. **Ajoutez ces variables** (utilisez les clés de **production** `sk_live_...`) :

   | Name | Value | Environment |
   |------|-------|-------------|
   | `STRIPE_SECRET_KEY_FORMATIONS` | `sk_live_VOTRE_CLE_FORMATIONS` | Production |
   | `STRIPE_WEBHOOK_SECRET_FORMATIONS` | `whsec_VOTRE_WEBHOOK_SECRET` | Production |

3. **Configurez le webhook dans Stripe** (si pas déjà fait) :
   - URL : `https://votre-domaine.vercel.app/api/webhooks/stripe`
   - Événements : `checkout.session.completed`, `payment_intent.succeeded`

4. **Redeployez** votre application sur Vercel

---

## 🔍 Vérification rapide

Pour vérifier que tout est configuré :

```bash
# Vérifiez que les variables sont bien définies
grep "STRIPE_SECRET_KEY_FORMATIONS\|STRIPE_WEBHOOK_SECRET_FORMATIONS" .env.local
```

Vous devriez voir :
- `STRIPE_SECRET_KEY_FORMATIONS=sk_test_...` (pas de placeholder)
- `STRIPE_WEBHOOK_SECRET_FORMATIONS=whsec_...` (pas de placeholder)

---

## ❓ Dépannage

### Erreur : "Configuration Stripe manquante pour les formations"

**Solution** : Vérifiez que `STRIPE_SECRET_KEY_FORMATIONS` est bien défini dans `.env.local` et que le serveur a été redémarré.

### Les webhooks ne fonctionnent pas en local

**Solution** : Utilisez Stripe CLI pour forwarder les webhooks (voir Étape 2, Option A).

### Le paiement utilise le mauvais compte Stripe

**Solution** : Vérifiez que vous avez bien la clé du compte Formations (pas celle de la boutique).

---

## ✅ Checklist finale

- [ ] `STRIPE_SECRET_KEY_FORMATIONS` rempli dans `.env.local` (pas de placeholder)
- [ ] `STRIPE_WEBHOOK_SECRET_FORMATIONS` rempli dans `.env.local` (pas de placeholder)
- [ ] Serveur redémarré après modification de `.env.local`
- [ ] Test de paiement formation réussi en local
- [ ] Variables ajoutées dans Vercel (production)
- [ ] Webhook configuré dans Stripe pour la production
- [ ] Test de paiement formation réussi en production

Une fois ces étapes terminées, Stripe sera **actif** sur les formations ! 🎉
