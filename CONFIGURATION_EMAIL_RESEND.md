# Configuration Email avec Resend (Solution Simple)

## ✅ Pourquoi Resend ?

Resend est **beaucoup plus simple** que Gmail :
- ✅ Pas besoin de mot de passe d'application
- ✅ Juste une clé API à copier-coller
- ✅ Gratuit jusqu'à 3000 emails/mois
- ✅ Parfaitement intégré avec Vercel
- ✅ Configuration en 2 minutes

## 🚀 Configuration en 3 étapes

### 1. Créer un compte Resend (gratuit)

1. Allez sur https://resend.com
2. Créez un compte (gratuit)
3. Allez dans **API Keys**
4. Cliquez sur **Create API Key**
5. Donnez un nom (ex: "Perma-coach")
6. **Copiez la clé API** (commence par `re_...`)

### 2. Ajouter la variable d'environnement

**En local (.env.local) :**
```env
RESEND_API_KEY=re_votre_cle_api_ici
```

**En production (Vercel) :**
1. Allez dans Vercel → Settings → Environment Variables
2. Ajoutez :
   - Key: `RESEND_API_KEY`
   - Value: `re_votre_cle_api_ici`
3. Cliquez sur **Save**

### 3. C'est tout ! 🎉

L'email sera automatiquement envoyé à `permacoach51@gmail.com` à chaque commande.

## 📧 Personnaliser l'email expéditeur (optionnel)

Par défaut, les emails sont envoyés depuis `onboarding@resend.dev`.

Pour utiliser votre propre domaine (ex: `noreply@perma-coach.fr`) :

1. Dans Resend, allez dans **Domains**
2. Ajoutez votre domaine
3. Suivez les instructions DNS
4. Une fois vérifié, changez dans `lib/email.ts` :
   ```typescript
   from: 'Perma-coach <noreply@perma-coach.fr>',
   ```

**Note :** Pour commencer, `onboarding@resend.dev` fonctionne parfaitement !

## ✅ Vérification

Après avoir configuré `RESEND_API_KEY`, testez une commande et vérifiez que l'email arrive bien à `permacoach51@gmail.com`.

## 🆘 Dépannage

**L'email n'est pas envoyé :**
- Vérifiez que `RESEND_API_KEY` est bien configuré dans Vercel
- Vérifiez les logs Vercel pour voir les erreurs
- Vérifiez que la clé API commence bien par `re_`

**Erreur "Invalid API key" :**
- Vérifiez que vous avez copié la clé complète
- Vérifiez qu'il n'y a pas d'espaces avant/après la clé

## 💰 Tarifs

- **Gratuit** : 3000 emails/mois
- **Payant** : À partir de 20$/mois pour plus d'emails

Pour un site avec quelques commandes par jour, le plan gratuit est largement suffisant !
