# 🚀 Guide de déploiement sur Vercel - Étape par étape

## 📋 Prérequis

- Un compte GitHub (gratuit) : https://github.com
- Un compte Vercel (gratuit) : https://vercel.com
- Votre projet Perma-coach prêt

---

## ÉTAPE 1 : Préparer votre code

### 1.1 Vérifier que tout fonctionne en local

```bash
# Dans le terminal, à la racine du projet
npm run build
```

Si la commande réussit sans erreur, vous êtes prêt ! ✅

### 1.2 Vérifier les fichiers de données

Les fichiers JSON dans `/data/` seront commités sur GitHub pour avoir les données initiales (légumes, formations, etc.) sur Vercel. C'est normal et nécessaire.

---

## ÉTAPE 2 : Créer un repository GitHub

### 2.1 Initialiser Git (si pas déjà fait)

```bash
# Dans le terminal, à la racine du projet
git init
```

### 2.2 Créer un repository sur GitHub

1. Allez sur https://github.com/new
2. **Repository name** : `perma-coach` (ou autre nom)
3. **Description** : "Site Perma-coach - Transmission et permaculture"
4. Choisissez **Public** ou **Private** (selon vos préférences)
5. **NE COCHEZ PAS** "Add a README file" (vous avez déjà des fichiers)
6. Cliquez sur **Create repository**

### 2.3 Connecter votre projet local à GitHub

GitHub vous donnera des commandes. Utilisez celles-ci :

```bash
# Ajouter tous les fichiers
git add .

# Faire un premier commit
git commit -m "Initial commit - Site Perma-coach"

# Renommer la branche en main (si nécessaire)
git branch -M main

# Ajouter le remote GitHub (remplacez VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/perma-coach.git

# Pousser le code sur GitHub
git push -u origin main
```

**Note** : Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

---

## ÉTAPE 3 : Créer un compte Vercel

### 3.1 S'inscrire sur Vercel

1. Allez sur https://vercel.com/signup
2. Cliquez sur **Continue with GitHub**
3. Autorisez Vercel à accéder à votre compte GitHub

---

## ÉTAPE 4 : Déployer le projet sur Vercel

### 4.1 Importer le projet

1. Une fois connecté à Vercel, cliquez sur **Add New...** → **Project**
2. Vous verrez la liste de vos repositories GitHub
3. Trouvez **perma-coach** et cliquez sur **Import**

### 4.2 Configuration du projet

Vercel détecte automatiquement Next.js, donc :

1. **Framework Preset** : Next.js (détecté automatiquement) ✅
2. **Root Directory** : `./` (laisser par défaut)
3. **Build Command** : `npm run build` (détecté automatiquement) ✅
4. **Output Directory** : `.next` (détecté automatiquement) ✅
5. **Install Command** : `npm install` (détecté automatiquement) ✅

**Ne changez rien**, Vercel a tout détecté correctement ! ✅

### 4.3 Configurer les variables d'environnement

**⚠️ IMPORTANT** : Avant de déployer, configurez le mot de passe admin !

1. Dans la section **Environment Variables**, cliquez sur **Add**
2. Ajoutez :
   - **Name** : `ADMIN_PASSWORD`
   - **Value** : `votre_mot_de_passe_securise_ici`
   - **Environments** : Cochez toutes les cases (Production, Preview, Development)

**Recommandation pour le mot de passe** :
- Minimum 12 caractères
- Mélange de lettres majuscules, minuscules, chiffres et caractères spéciaux
- Exemple : `P3rm@-C0@ch-2024!`

### 4.4 Lancer le déploiement

1. Cliquez sur **Deploy**
2. Vercel va :
   - Installer les dépendances (`npm install`)
   - Builder le projet (`npm run build`)
   - Déployer le site

**⏱️ Temps estimé** : 2-5 minutes

---

## ÉTAPE 5 : Vérifier le déploiement

### 5.1 Attendre la fin du build

Vous verrez un écran avec les logs de build. Attendez que ça affiche :
```
✓ Build Completed
```

### 5.2 Accéder à votre site

Une fois le déploiement terminé :
1. Vercel vous donnera une URL : `https://perma-coach-xxxxx.vercel.app`
2. Cliquez sur **Visit** ou ouvrez cette URL dans votre navigateur
3. Votre site est en ligne ! 🎉

### 5.3 Tester l'admin

1. Allez sur `https://votre-url.vercel.app/admin`
2. Connectez-vous avec le mot de passe que vous avez configuré dans les variables d'environnement
3. Testez une modification (par exemple, activer/désactiver un légume)
4. Vérifiez que la modification apparaît bien sur le site public

---

## ÉTAPE 6 : Configurer un nom de domaine personnalisé (optionnel)

### 6.1 Ajouter un domaine

1. Dans votre projet Vercel, allez dans **Settings** → **Domains**
2. Entrez votre domaine (ex: `perma-coach.fr`)
3. Suivez les instructions pour configurer les DNS

### 6.2 Configuration DNS

Vous devrez ajouter un enregistrement CNAME dans votre registrar :
- **Type** : CNAME
- **Name** : `@` ou `www`
- **Value** : `cname.vercel-dns.com`

Vercel vous donnera les instructions exactes selon votre registrar.

---

## 🔄 Mises à jour futures

### Comment mettre à jour le site après des modifications

1. **Modifier votre code localement**
2. **Tester en local** : `npm run dev`
3. **Commit et push sur GitHub** :
   ```bash
   git add .
   git commit -m "Description des modifications"
   git push
   ```
4. **Vercel déploie automatiquement** ! 🚀
   - Vercel détecte automatiquement les nouveaux commits
   - Il redéploie le site automatiquement
   - Vous recevrez un email de confirmation

---

## ⚙️ Configuration avancée (optionnel)

### Modifier les variables d'environnement

1. Allez dans votre projet Vercel
2. **Settings** → **Environment Variables**
3. Modifiez ou ajoutez des variables
4. Cliquez sur **Redeploy** pour appliquer les changements

### Voir les logs

1. Dans votre projet Vercel, cliquez sur **Deployments**
2. Cliquez sur un déploiement
3. Onglet **Logs** pour voir les erreurs éventuelles

---

## ❓ Problèmes courants et solutions

### Erreur de build

**Symptôme** : Le build échoue sur Vercel

**Solutions** :
1. Vérifiez les logs dans Vercel pour voir l'erreur exacte
2. Testez `npm run build` en local pour reproduire l'erreur
3. Vérifiez que toutes les dépendances sont dans `package.json`

### Les modifications admin ne s'affichent pas

**Symptôme** : Vous modifiez dans l'admin mais ça n'apparaît pas sur le site

**Solutions** :
1. Vérifiez que les variables d'environnement sont bien configurées
2. Rechargez la page (Ctrl+F5 ou Cmd+Shift+R)
3. Vérifiez que vous êtes bien connecté en admin

### Erreur 404 sur certaines pages

**Symptôme** : Certaines pages renvoient une erreur 404

**Solutions** :
1. Vérifiez que tous les fichiers sont bien commités sur GitHub
2. Vérifiez que les routes sont correctes dans `app/`
3. Redéployez le projet

---

## ✅ Checklist finale

Avant de considérer le déploiement comme terminé :

- [ ] Le site est accessible sur l'URL Vercel
- [ ] La page d'accueil s'affiche correctement
- [ ] Toutes les pages sont accessibles (Notre histoire, Chantiers, PEBI, Panier légumes, Contact)
- [ ] L'admin fonctionne avec le mot de passe configuré
- [ ] Les modifications admin apparaissent sur le site public
- [ ] Les images s'affichent correctement
- [ ] Le formulaire de contact fonctionne
- [ ] Le panier légumes fonctionne

---

## 🎉 Félicitations !

Votre site Perma-coach est maintenant en ligne ! 

**URL de votre site** : `https://votre-projet.vercel.app`

**URL de l'admin** : `https://votre-projet.vercel.app/admin`

---

## 📞 Besoin d'aide ?

Si vous rencontrez un problème :
1. Consultez les logs dans Vercel (Deployments → Logs)
2. Vérifiez la documentation Vercel : https://vercel.com/docs
3. Vérifiez que toutes les étapes ci-dessus ont été suivies

