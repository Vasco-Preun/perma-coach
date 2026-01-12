# ✅ Checklist de mise en ligne - Paiements Stripe

## 🔐 Variables d'environnement (Vercel)

### Obligatoires pour les paiements :

- [ ] `STRIPE_SECRET_KEY_BOUTIQUE` (clé de production : `sk_live_...`)
- [ ] `STRIPE_WEBHOOK_SECRET_BOUTIQUE` (secret webhook : `whsec_...`)
- [ ] `STRIPE_SECRET_KEY_FORMATIONS` (si vous utilisez les formations)
- [ ] `STRIPE_WEBHOOK_SECRET_FORMATIONS` (si vous utilisez les formations)
- [ ] `NEXT_PUBLIC_BASE_URL` (URL de production : `https://votre-domaine.com`)

### Pour l'envoi d'emails :

- [ ] `EMAIL_USER` (`permacoach51@gmail.com`)
- [ ] `EMAIL_PASSWORD` (mot de passe d'application Gmail)

### Autres variables :

- [ ] `KV_REST_API_URL` (si vous utilisez Vercel KV)
- [ ] `KV_REST_API_TOKEN` (si vous utilisez Vercel KV)

## 🔗 Configuration Stripe

### Compte Boutique :

1. [ ] Passer en mode **Live** dans le dashboard Stripe
2. [ ] Copier la **Secret key** (commence par `sk_live_`)
3. [ ] Configurer le webhook :
   - URL : `https://votre-domaine.com/api/webhooks/stripe`
   - Événements : `checkout.session.completed`, `payment_intent.succeeded`
   - Copier le **Signing secret** (commence par `whsec_`)

### Compte Formations (si utilisé) :

1. [ ] Passer en mode **Live** dans le dashboard Stripe
2. [ ] Copier la **Secret key** (commence par `sk_live_`)
3. [ ] Configurer le webhook avec la même URL

## 🌐 URLs de redirection

Vérifiez que les URLs suivantes fonctionnent :

- [ ] `https://votre-domaine.com/paiement/succes` (page de succès)
- [ ] `https://votre-domaine.com/paiement/annule` (page d'annulation)
- [ ] `https://votre-domaine.com/api/webhooks/stripe` (webhook Stripe)

## 📧 Configuration Email

1. [ ] Créer un mot de passe d'application Gmail :
   - Aller sur https://myaccount.google.com
   - Sécurité → Validation en deux étapes (activer si nécessaire)
   - Mots de passe des applications → Créer "Perma-coach"
   - Copier le mot de passe (16 caractères)

2. [ ] Ajouter dans Vercel :
   - `EMAIL_USER=permacoach51@gmail.com`
   - `EMAIL_PASSWORD=le_mot_de_passe_d_application`

## 🧪 Tests à effectuer

### Test 1 : Commande boutique

1. [ ] Ajouter des produits au panier
2. [ ] Aller au checkout
3. [ ] Remplir le formulaire
4. [ ] Choisir "Récupération à la ferme"
5. [ ] Valider la commande
6. [ ] Vérifier la redirection vers Stripe
7. [ ] Effectuer un paiement test (carte : 4242 4242 4242 4242)
8. [ ] Vérifier la redirection vers `/paiement/succes`
9. [ ] Vérifier la réception de l'email à `permacoach51@gmail.com`
10. [ ] Vérifier que la commande est marquée "paid" dans les logs

### Test 2 : Commande avec livraison Reims

1. [ ] Ajouter des produits pour >= 15€
2. [ ] Choisir "Livraison à Reims"
3. [ ] Vérifier que le paiement en ligne est disponible
4. [ ] Effectuer le paiement
5. [ ] Vérifier la réception de l'email avec l'adresse de livraison

### Test 3 : Commande < 15€ avec livraison Reims

1. [ ] Ajouter des produits pour < 15€
2. [ ] Vérifier que "Livraison à Reims" est désactivée
3. [ ] Vérifier que "Récupération à la ferme" fonctionne

### Test 4 : Formation (si utilisé)

1. [ ] S'inscrire à une formation
2. [ ] Effectuer le paiement
3. [ ] Vérifier la redirection et l'email

## 🔍 Vérifications techniques

### Logs Vercel :

- [ ] Vérifier qu'il n'y a pas d'erreurs dans les logs
- [ ] Vérifier que les webhooks Stripe sont reçus
- [ ] Vérifier que les emails sont envoyés

### Base de données :

- [ ] Vérifier que les commandes sont sauvegardées
- [ ] Vérifier que le statut passe à "paid" après paiement

## ⚠️ Points d'attention

1. **Mode Test vs Production** :
   - En production, utilisez les clés `sk_live_` (pas `sk_test_`)
   - Les webhooks doivent pointer vers l'URL de production

2. **Sécurité** :
   - Ne jamais commiter les clés Stripe dans Git
   - Utiliser uniquement les variables d'environnement Vercel
   - Vérifier que `.env.local` est dans `.gitignore`

3. **Emails** :
   - Le mot de passe d'application Gmail est différent du mot de passe normal
   - La validation en deux étapes doit être activée

4. **Webhooks** :
   - Les webhooks peuvent prendre quelques minutes à se propager
   - Testez avec Stripe CLI en local avant la mise en production

## 📝 Commandes utiles

```bash
# Vérifier les variables d'environnement (local)
cat .env.local

# Tester le build
npm run build

# Vérifier les logs Vercel
vercel logs
```

## 🆘 En cas de problème

1. **Paiement ne redirige pas** :
   - Vérifier `NEXT_PUBLIC_BASE_URL` dans Vercel
   - Vérifier les logs de `/api/payment/create`

2. **Webhook ne fonctionne pas** :
   - Vérifier l'URL du webhook dans Stripe
   - Vérifier `STRIPE_WEBHOOK_SECRET_*` dans Vercel
   - Vérifier les logs de `/api/webhooks/stripe`

3. **Email non envoyé** :
   - Vérifier `EMAIL_USER` et `EMAIL_PASSWORD` dans Vercel
   - Vérifier que le mot de passe d'application est correct
   - Vérifier les logs pour les erreurs d'envoi

## ✅ Validation finale

Une fois tous les tests passés :

- [ ] Tous les paiements redirigent correctement
- [ ] Tous les emails sont reçus
- [ ] Toutes les commandes sont sauvegardées
- [ ] Les webhooks fonctionnent
- [ ] Aucune erreur dans les logs

**Le site est prêt pour la mise en ligne ! 🚀**
