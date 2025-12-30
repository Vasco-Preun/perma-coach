# Guide de déploiement sur Vercel

## Prérequis

1. Un compte GitHub (gratuit)
2. Un compte Vercel (gratuit, connexion avec GitHub)

## Étapes de déploiement

### 1. Préparer le projet Git

Si le projet n'est pas encore sur GitHub :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Initial commit"

# Créer un repository sur GitHub (via github.com)
# Puis connecter :
git remote add origin https://github.com/VOTRE_USERNAME/perma-coach.git
git branch -M main
git push -u origin main
```

### 2. Déployer sur Vercel

#### Option A : Via l'interface Vercel (recommandé)

1. **Aller sur [vercel.com](https://vercel.com)**
   - Se connecter avec votre compte GitHub

2. **Cliquer sur "Add New Project"**

3. **Importer le repository GitHub**
   - Sélectionner le repository `perma-coach`
   - Vercel détecte automatiquement Next.js

4. **Configuration du projet**
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (laisser par défaut)
   - **Build Command** : `npm run build` (détecté automatiquement)
   - **Output Directory** : `.next` (détecté automatiquement)
   - **Install Command** : `npm install` (détecté automatiquement)

5. **Variables d'environnement** (optionnel)
   - Si vous avez des variables d'environnement, les ajouter ici :
     - `NEXT_PUBLIC_ADMIN_PASSWORD` : mot de passe admin
     - `NEXT_PUBLIC_PANIER_ADMIN_PASSWORD` : mot de passe panier admin

6. **Cliquer sur "Deploy"**
   - Le déploiement prend 2-3 minutes
   - Vercel vous donne une URL (ex: `perma-coach.vercel.app`)

#### Option B : Via la CLI Vercel

```bash
# Installer Vercel CLI globalement
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer (depuis le dossier du projet)
vercel

# Suivre les instructions :
# - Link to existing project? No
# - Project name? perma-coach
# - Directory? ./
# - Override settings? No
```

### 3. Configuration post-déploiement

#### Variables d'environnement

Dans le dashboard Vercel :
1. Aller dans **Settings** → **Environment Variables**
2. Ajouter les variables nécessaires :
   - `NEXT_PUBLIC_ADMIN_PASSWORD` = votre mot de passe admin
   - `NEXT_PUBLIC_PANIER_ADMIN_PASSWORD` = votre mot de passe panier admin

#### Domaine personnalisé (optionnel)

1. Dans **Settings** → **Domains**
2. Ajouter votre domaine (ex: `perma-coach.fr`)
3. Suivre les instructions DNS

### 4. Gestion des fichiers de données

⚠️ **Important** : Les fichiers dans `data/` ne sont pas persistés sur Vercel par défaut.

**Solutions :**

#### Option 1 : Utiliser Vercel KV (recommandé pour production)
- Base de données clé-valeur intégrée à Vercel
- Gratuit jusqu'à 256 MB

#### Option 2 : Utiliser un service externe
- MongoDB Atlas (gratuit)
- Supabase (gratuit)
- PlanetScale (gratuit)

#### Option 3 : Utiliser Vercel Blob Storage
- Pour stocker les fichiers JSON

### 5. Déploiements automatiques

Par défaut, Vercel :
- ✅ Déploie automatiquement à chaque push sur `main`
- ✅ Crée des previews pour chaque pull request
- ✅ Rebuild automatique en cas de changement

### 6. Commandes utiles

```bash
# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Voir les déploiements
vercel list
```

## Checklist avant déploiement

- [ ] Tester le build localement : `npm run build`
- [ ] Vérifier que toutes les images sont dans `public/`
- [ ] Vérifier les variables d'environnement
- [ ] Tester toutes les pages importantes
- [ ] Vérifier que les API routes fonctionnent

## Problèmes courants

### Erreur de build
- Vérifier les logs dans Vercel Dashboard
- Tester le build localement : `npm run build`

### Images ne s'affichent pas
- Vérifier que les images sont dans `public/`
- Vérifier les chemins (commencer par `/`)

### API routes ne fonctionnent pas
- Vérifier que les routes sont dans `app/api/`
- Vérifier les logs dans Vercel Dashboard

## Support

- Documentation Vercel : https://vercel.com/docs
- Support : https://vercel.com/support

