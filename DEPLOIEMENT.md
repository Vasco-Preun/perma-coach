# Guide de déploiement - Perma-coach

## Déploiement sur Vercel (recommandé)

### 1. Préparation

1. **Créer un compte Vercel** : https://vercel.com
2. **Installer Vercel CLI** (optionnel) :
   ```bash
   npm i -g vercel
   ```

### 2. Déploiement via GitHub (recommandé)

1. **Pousser votre code sur GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/votre-username/perma-coach.git
   git push -u origin main
   ```

2. **Connecter à Vercel** :
   - Allez sur https://vercel.com/new
   - Importez votre repository GitHub
   - Vercel détectera automatiquement Next.js

### 3. Configuration des variables d'environnement

**⚠️ IMPORTANT** : Configurez ces variables dans les paramètres du projet Vercel :

1. Allez dans votre projet Vercel → **Settings** → **Environment Variables**
2. Ajoutez les variables suivantes :

```
ADMIN_PASSWORD=votre_mot_de_passe_securise_ici
```

**Recommandations pour le mot de passe** :
- Minimum 12 caractères
- Mélange de lettres, chiffres et caractères spéciaux
- Exemple : `P3rm@-C0@ch-2024!`

### 4. Redéploiement

Après avoir ajouté les variables d'environnement :
- Vercel redéploiera automatiquement
- Ou cliquez sur **Redeploy** dans le dashboard

### 5. Vérification

1. Testez l'accès admin : `https://votre-domaine.vercel.app/admin`
2. Connectez-vous avec le mot de passe configuré
3. Testez la modification des formations et légumes

## Déploiement sur autre plateforme

### Variables d'environnement à configurer

Sur n'importe quelle plateforme (Netlify, Railway, etc.), configurez :

```
ADMIN_PASSWORD=votre_mot_de_passe_securise
```

### Build et démarrage

```bash
npm run build
npm start
```

## Sécurité en production

✅ **À faire** :
- Utiliser un mot de passe fort et unique
- Ne jamais commiter `.env.local` dans Git
- Utiliser `ADMIN_PASSWORD` (côté serveur) plutôt que `NEXT_PUBLIC_ADMIN_PASSWORD`
- Activer HTTPS (automatique sur Vercel)

❌ **À éviter** :
- Utiliser "admin123" en production
- Partager le mot de passe admin
- Exposer les variables d'environnement dans le code client

## Support

En cas de problème :
1. Vérifiez les logs dans le dashboard Vercel
2. Vérifiez que les variables d'environnement sont bien configurées
3. Testez en local avec `.env.local`


