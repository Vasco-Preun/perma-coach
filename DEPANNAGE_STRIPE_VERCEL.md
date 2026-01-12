# 🔧 Dépannage : "Configuration Stripe manquante pour la boutique"

## 🔍 Diagnostic

Cette erreur signifie que la variable d'environnement `STRIPE_SECRET_KEY_BOUTIQUE` n'est pas accessible dans Vercel.

## ✅ Solutions

### Solution 1 : Vérifier que la variable est bien ajoutée

1. Allez sur https://vercel.com
2. Ouvrez votre projet
3. Allez dans **Settings** → **Environment Variables**
4. Cherchez `STRIPE_SECRET_KEY_BOUTIQUE`
5. Vérifiez qu'elle existe et que la valeur est correcte

### Solution 2 : Vérifier le nom exact de la variable

Le nom doit être **exactement** :
```
STRIPE_SECRET_KEY_BOUTIQUE
```

Vérifiez qu'il n'y a pas :
- D'espaces avant/après
- De fautes de frappe
- De majuscules/minuscules incorrectes

### Solution 3 : Vérifier les environnements

Assurez-vous que la variable est activée pour **Production** :

1. Cliquez sur la variable `STRIPE_SECRET_KEY_BOUTIQUE`
2. Vérifiez que **Production** est coché ✅
3. Si ce n'est pas le cas, modifiez la variable et cochez **Production**

### Solution 4 : Redéployer après avoir ajouté la variable

**Important :** Après avoir ajouté/modifié une variable d'environnement, vous devez redéployer :

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** du dernier déploiement
3. Cliquez sur **Redeploy**
4. Attendez la fin du déploiement

### Solution 5 : Vérifier la valeur de la clé

La clé doit :
- Commencer par `sk_live_...` (mode Live) ou `sk_test_...` (mode Test)
- Ne pas avoir d'espaces avant/après
- Être la clé complète (environ 100 caractères)

### Solution 6 : Vérifier les logs Vercel

1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Allez dans l'onglet **Logs**
4. Cherchez les erreurs liées à Stripe
5. Vérifiez les messages de console qui indiquent si la variable est présente

## 📝 Checklist de vérification

- [ ] La variable `STRIPE_SECRET_KEY_BOUTIQUE` existe dans Vercel
- [ ] Le nom est exactement `STRIPE_SECRET_KEY_BOUTIQUE` (pas de typo)
- [ ] La valeur commence par `sk_live_...` ou `sk_test_...`
- [ ] La variable est activée pour **Production**
- [ ] Un redéploiement a été fait après avoir ajouté/modifié la variable
- [ ] Le build Vercel a réussi (pas d'erreur de build)

## 🆘 Si ça ne fonctionne toujours pas

1. **Supprimez et recréez la variable** :
   - Supprimez `STRIPE_SECRET_KEY_BOUTIQUE` dans Vercel
   - Recréez-la avec le bon nom et la bonne valeur
   - Redéployez

2. **Vérifiez les logs en temps réel** :
   - Allez dans **Deployments** → **Logs**
   - Testez un paiement
   - Regardez les logs pour voir l'erreur exacte

3. **Testez avec une clé de test** :
   - Utilisez temporairement une clé de test (`sk_test_...`)
   - Si ça fonctionne, le problème vient de la clé Live
   - Vérifiez que vous avez bien copié la clé Live complète

## 💡 Astuce

Pour vérifier rapidement si la variable est accessible, vous pouvez temporairement ajouter un log dans le code (à supprimer après) :

```typescript
console.log('Stripe key present:', !!process.env.STRIPE_SECRET_KEY_BOUTIQUE)
```

Mais ne loggez JAMAIS la valeur de la clé elle-même !
