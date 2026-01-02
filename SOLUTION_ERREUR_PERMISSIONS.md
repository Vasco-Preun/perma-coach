# Solution : Erreur "Operation not permitted"

## Le problème

Next.js ne peut pas lire les fichiers dans `node_modules` à cause d'un problème de permissions ou d'attributs étendus macOS.

## Solutions à essayer (dans l'ordre)

### Solution 1 : Nettoyer le cache Next.js

```bash
cd /Users/vascopreun/Perma-coach
rm -rf .next
npm run dev
```

### Solution 2 : Nettoyer les attributs étendus macOS

```bash
cd /Users/vascopreun/Perma-coach
xattr -rc node_modules
npm run dev
```

### Solution 3 : Réinstaller les dépendances

```bash
cd /Users/vascopreun/Perma-coach
rm -rf node_modules package-lock.json
npm install --cache /tmp/npm-cache
npm run dev
```

### Solution 4 : Corriger les permissions (si nécessaire)

```bash
cd /Users/vascopreun/Perma-coach
chmod -R u+r node_modules
npm run dev
```

### Solution 5 : Réinstaller complètement

Si rien ne fonctionne :

```bash
cd /Users/vascopreun/Perma-coach
rm -rf node_modules .next package-lock.json
npm install --cache /tmp/npm-cache
npm run dev
```

## Note sur la version Next.js

L'avertissement "Next.js (14.2.35) is outdated" n'est pas critique, mais vous pouvez mettre à jour :

```bash
npm install next@latest
```

## Après avoir appliqué une solution

1. Relancez `npm run dev`
2. Rafraîchissez la page dans Safari (Cmd + R)
3. Le site devrait fonctionner


