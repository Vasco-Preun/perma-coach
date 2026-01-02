# Résolution des problèmes

## Problème : Le localhost ne fonctionne pas

### Solution 1 : Nettoyer le cache npm

```bash
# Nettoyer le cache npm
npm cache clean --force

# Puis réessayer l'installation
npm install
```

### Solution 2 : Utiliser yarn à la place de npm

```bash
# Installer yarn si pas déjà installé
npm install -g yarn

# Installer les dépendances avec yarn
yarn install

# Lancer le serveur
yarn dev
```

### Solution 3 : Utiliser pnpm

```bash
# Installer pnpm
npm install -g pnpm

# Installer les dépendances
pnpm install

# Lancer le serveur
pnpm dev
```

### Solution 4 : Vérifier les permissions

Si vous avez des problèmes de permissions :

```bash
# Sur Mac/Linux, vérifier les permissions du dossier npm
sudo chown -R $(whoami) ~/.npm

# Puis réessayer
npm install
```

### Solution 5 : Installation manuelle des dépendances critiques

Si rien ne fonctionne, vous pouvez essayer d'installer les dépendances une par une :

```bash
npm install next@14.2.0 react@18.3.0 react-dom@18.3.0
npm install typescript @types/node @types/react @types/react-dom
npm install tailwindcss postcss autoprefixer
npm install eslint eslint-config-next
```

## Vérifier que le serveur démarre

Une fois les dépendances installées :

```bash
npm run dev
```

Vous devriez voir :
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Erreurs courantes

### "Cannot find module 'next'"
→ Les dépendances ne sont pas installées. Exécutez `npm install`.

### "Port 3000 is already in use"
→ Un autre processus utilise le port 3000. Changez le port :
```bash
npm run dev -- -p 3001
```

### "Error: EACCES: permission denied"
→ Problème de permissions. Voir Solution 4 ci-dessus.

### Erreurs de compilation TypeScript
→ Vérifiez que tous les fichiers sont correctement sauvegardés et qu'il n'y a pas d'erreurs de syntaxe.

## Vérifier l'installation

```bash
# Vérifier que node_modules existe
ls -la node_modules

# Vérifier que Next.js est installé
ls node_modules/next

# Vérifier la version de Node
node --version  # Doit être >= 18.0.0
```


