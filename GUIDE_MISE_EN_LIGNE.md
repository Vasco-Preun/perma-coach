# 🚀 Guide de mise en ligne - Perma-coach

## 📋 Checklist avant de commencer

- [ ] Code prêt et testé localement
- [ ] Compte Vercel créé
- [ ] Compte Stripe (mode Live) configuré
- [ ] Compte Resend créé avec clé API
- [ ] Toutes les variables d'environnement listées

---

## Étape 1 : Préparer le code

### 1.1 Vérifier que tout est commité

```bash
# Vérifier l'état
git status

# Si des fichiers sont modifiés, les ajouter
git add .

# Créer un commit
git commit -m "Préparation mise en ligne avec Stripe et Resend"
```

### 1.2 Pousser vers GitHub

```bash
# Si vous n'avez pas encore de remote
git remote add origin https://github.com/votre-username/perma-coach.git

# Pousser le code
git push -u origin main
```

**Note :** Si vous avez déjà un dépôt GitHub connecté à Vercel, le push déclenchera automatiquement un déploiement.

---

## Étape 2 : Configurer Vercel

### 2.1 Connecter le projet (si pas déjà fait)

1. Allez sur https://vercel.com
2. Cliquez sur **Add New Project**
3. Importez votre repository GitHub
4. Vercel détectera automatiquement Next.js

### 2.2 Configurer les variables d'environnement

Allez dans **Settings** → **Environment Variables** et ajoutez :

#### 🔐 Stripe - Boutique (OBLIGATOIRE)

```
STRIPE_SECRET_KEY_BOUTIQUE=sk_live_VOTRE_CLE_ICI
STRIPE_WEBHOOK_SECRET_BOUTIQUE=whsec_VOTRE_WEBHOOK_SECRET_ICI
```

**⚠️ Important :** Utilisez les clés **LIVE** (pas `sk_test_`) pour la production !

#### 🔐 Stripe - Formations (si vous utilisez les formations)

```
STRIPE_SECRET_KEY_FORMATIONS=sk_live_VOTRE_CLE_ICI
STRIPE_WEBHOOK_SECRET_FORMATIONS=whsec_VOTRE_WEBHOOK_SECRET_ICI
```

#### 📧 Resend (OBLIGATOIRE pour les emails)

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 🌐 URL de base (OBLIGATOIRE)

```
NEXT_PUBLIC_BASE_URL=https://votre-domaine.vercel.app
```

**Ou si vous avez un domaine personnalisé :**
```
NEXT_PUBLIC_BASE_URL=https://perma-coach.fr
```

#### 💾 Vercel KV (si vous utilisez KV pour les données)

```
KV_REST_API_URL=https://xxxxx.upstash.io
KV_REST_API_TOKEN=xxxxx
```

#### 🔑 Admin (si nécessaire)

```
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe
```

### 2.3 Sélectionner les environnements

Pour chaque variable, cochez :
- ✅ **Production**
- ✅ **Preview** (optionnel mais recommandé)
- ✅ **Development** (optionnel)

---

## Étape 3 : Configurer Stripe (Mode Live)

### 3.1 Passer en mode Live

1. Allez sur https://dashboard.stripe.com
2. **Basculez en mode Live** (en haut à droite)
3. Allez dans **Developers** → **API keys**
4. Copiez la **Secret key** (commence par `sk_live_`)
5. Ajoutez-la dans Vercel comme `STRIPE_SECRET_KEY_BOUTIQUE`

### 3.2 Configurer les webhooks

1. Dans Stripe, allez dans **Developers** → **Webhooks**
2. Cliquez sur **Add endpoint**
3. URL : `https://votre-domaine.vercel.app/api/webhooks/stripe`
4. Sélectionnez les événements :
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
5. Cliquez sur **Add endpoint**
6. Copiez le **Signing secret** (commence par `whsec_`)
7. Ajoutez-le dans Vercel comme `STRIPE_WEBHOOK_SECRET_BOUTIQUE`

**Répétez pour le compte Formations si vous l'utilisez.**

---

## Étape 4 : Configurer Resend

### 4.1 Créer un compte et obtenir la clé API

1. Allez sur https://resend.com
2. Créez un compte (gratuit)
3. Allez dans **API Keys**
4. Cliquez sur **Create API Key**
5. Nom : "Perma-coach"
6. Copiez la clé API (commence par `re_`)
7. Ajoutez-la dans Vercel comme `RESEND_API_KEY`

### 4.2 Vérifier le domaine (optionnel)

Par défaut, les emails sont envoyés depuis `onboarding@resend.dev`.

Pour utiliser votre propre domaine :
1. Dans Resend, allez dans **Domains**
2. Ajoutez votre domaine
3. Suivez les instructions DNS
4. Une fois vérifié, modifiez `lib/email.ts` :
   ```typescript
   from: 'Perma-coach <noreply@votre-domaine.com>',
   ```

---

## Étape 5 : Déployer

### 5.1 Déploiement automatique

Si votre repo GitHub est connecté à Vercel :
- Chaque `git push` déclenche automatiquement un déploiement
- Vercel déploiera avec les nouvelles variables d'environnement

### 5.2 Déploiement manuel

1. Allez dans Vercel → **Deployments**
2. Cliquez sur les **3 points** du dernier déploiement
3. Cliquez sur **Redeploy**
4. Sélectionnez **Use existing Build Cache** (optionnel)
5. Cliquez sur **Redeploy**

---

## Étape 6 : Vérifier le déploiement

### 6.1 Vérifier que le site fonctionne

1. Ouvrez l'URL de votre site (ex: `https://votre-projet.vercel.app`)
2. Vérifiez que la page d'accueil s'affiche
3. Testez la navigation

### 6.2 Vérifier les logs

1. Dans Vercel, allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Allez dans l'onglet **Logs**
4. Vérifiez qu'il n'y a pas d'erreurs

---

## Étape 7 : Tests de paiement

### 7.1 Test complet

1. **Ajouter des produits au panier**
2. **Aller au checkout**
3. **Remplir le formulaire**
4. **Valider la commande**
5. **Vérifier la redirection vers Stripe**
6. **Effectuer un paiement test** :
   - Carte : `4242 4242 4242 4242`
   - Date : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres
7. **Vérifier la redirection vers `/paiement/succes`**
8. **Vérifier la réception de l'email** à `permacoach51@gmail.com`

### 7.2 Vérifier les webhooks

1. Dans Stripe, allez dans **Developers** → **Webhooks**
2. Cliquez sur votre endpoint
3. Allez dans l'onglet **Events**
4. Vérifiez que les événements sont reçus (statut 200)

---

## Étape 8 : Configuration du domaine personnalisé (optionnel)

### 8.1 Ajouter un domaine

1. Dans Vercel, allez dans **Settings** → **Domains**
2. Cliquez sur **Add Domain**
3. Entrez votre domaine (ex: `perma-coach.fr`)
4. Suivez les instructions DNS

### 8.2 Mettre à jour NEXT_PUBLIC_BASE_URL

Une fois le domaine configuré :
1. Mettez à jour `NEXT_PUBLIC_BASE_URL` dans Vercel
2. Redéployez

---

## ✅ Checklist finale

Avant de considérer le site comme prêt :

- [ ] Site accessible sur l'URL Vercel
- [ ] Toutes les pages fonctionnent
- [ ] Les paiements Stripe redirigent correctement
- [ ] La page `/paiement/succes` s'affiche après paiement
- [ ] Les emails sont reçus à `permacoach51@gmail.com`
- [ ] Les webhooks Stripe fonctionnent (vérifier dans Stripe Dashboard)
- [ ] Les commandes sont sauvegardées
- [ ] Le statut des commandes passe à "paid" après paiement

---

## 🆘 Dépannage

### Le site ne se déploie pas

- Vérifiez les logs dans Vercel
- Vérifiez que `npm run build` fonctionne en local
- Vérifiez qu'il n'y a pas d'erreurs TypeScript

### Les paiements ne fonctionnent pas

- Vérifiez que `STRIPE_SECRET_KEY_BOUTIQUE` est bien configuré
- Vérifiez que vous utilisez les clés **LIVE** (pas test)
- Vérifiez que `NEXT_PUBLIC_BASE_URL` est correct
- Vérifiez les logs de `/api/payment/create`

### Les emails ne sont pas envoyés

- Vérifiez que `RESEND_API_KEY` est bien configuré
- Vérifiez les logs Vercel pour les erreurs
- Vérifiez que la clé API commence par `re_`

### Les webhooks ne fonctionnent pas

- Vérifiez l'URL du webhook dans Stripe
- Vérifiez que `STRIPE_WEBHOOK_SECRET_BOUTIQUE` est correct
- Vérifiez les logs de `/api/webhooks/stripe`

---

## 📝 Commandes utiles

```bash
# Vérifier l'état Git
git status

# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Description des changements"

# Pousser vers GitHub
git push

# Tester le build localement
npm run build

# Vérifier les variables d'environnement locales
cat .env.local
```

---

## 🎉 Félicitations !

Une fois toutes ces étapes terminées, votre site est en ligne et les paiements fonctionnent !

**URL de votre site :** `https://votre-projet.vercel.app`

**URL de l'admin :** `https://votre-projet.vercel.app/admin`

---

## 📞 Besoin d'aide ?

Si vous rencontrez un problème :
1. Vérifiez les logs dans Vercel
2. Vérifiez les logs dans Stripe Dashboard
3. Vérifiez que toutes les variables d'environnement sont configurées
4. Consultez la documentation Vercel : https://vercel.com/docs
