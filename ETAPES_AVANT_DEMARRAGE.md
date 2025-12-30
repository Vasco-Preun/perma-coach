# Étapes à suivre AVANT de lancer le localhost

## ✅ Checklist avant le démarrage

### 1. Installer les dépendances (OBLIGATOIRE)

C'est la première chose à faire. Sans cela, le serveur ne pourra pas démarrer.

```bash
cd /Users/vascopreun/Perma-coach
npm install
```

**Si vous avez des erreurs de permissions**, utilisez une de ces solutions :

**Option A : Corriger les permissions npm**
```bash
sudo chown -R 501:20 "/Users/vascopreun/.npm"
npm install
```

**Option B : Utiliser yarn**
```bash
npm install -g yarn
yarn install
```

**Option C : Utiliser pnpm**
```bash
npm install -g pnpm
pnpm install
```

### 2. Vérifier que les dossiers existent

Les dossiers suivants doivent exister (ils sont créés automatiquement au premier démarrage si nécessaire) :
- ✅ `data/` - pour stocker les fichiers JSON (settings, events, gallery)
- ✅ `public/images/gallery/` - pour les photos de la galerie

### 3. (Optionnel) Créer le fichier .env.local

Pour changer le mot de passe admin (par défaut : `admin123`) :

```bash
echo "NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe" > .env.local
```

### 4. Lancer le serveur

Une fois les dépendances installées :

```bash
npm run dev
```

ou avec yarn :
```bash
yarn dev
```

ou avec pnpm :
```bash
pnpm dev
```

## 🎯 Résumé rapide

**Minimum requis pour démarrer :**
1. ✅ `npm install` (ou `yarn install` / `pnpm install`)
2. ✅ `npm run dev` (ou `yarn dev` / `pnpm dev`)

**C'est tout !** Le reste est optionnel ou créé automatiquement.

## 🔍 Vérification rapide

Pour vérifier que tout est prêt :

```bash
# Vérifier que node_modules existe
ls node_modules

# Si vous voyez des dossiers (next, react, etc.), c'est bon !
# Sinon, exécutez : npm install
```

## ⚠️ Erreurs courantes

**"Cannot find module 'next'"**
→ Les dépendances ne sont pas installées. Exécutez `npm install`.

**"Port 3000 is already in use"**
→ Un autre serveur tourne déjà. Changez le port :
```bash
npm run dev -- -p 3001
```

**Erreurs de permissions npm**
→ Voir les solutions dans l'étape 1 ci-dessus.

