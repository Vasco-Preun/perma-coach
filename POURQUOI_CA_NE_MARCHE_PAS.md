# Pourquoi le localhost ne fonctionne pas ?

## 🔍 Le problème

**Les dépendances ne sont pas installées.**

Le dossier `node_modules` n'existe pas dans votre projet. C'est ce dossier qui contient toutes les bibliothèques nécessaires (Next.js, React, etc.) pour faire fonctionner le site.

## 🤔 Pourquoi normalement ça marche ?

Quand vous travaillez sur un projet existant :
- Les dépendances sont déjà installées
- Le dossier `node_modules` existe déjà
- Vous pouvez lancer `npm run dev` directement

**Mais ici**, c'est un **nouveau projet** que je viens de créer :
- Les fichiers de code sont là ✅
- Mais les dépendances ne sont **pas encore installées** ❌
- Il faut les installer une première fois

## ✅ La solution

**Installer les dépendances une seule fois :**

```bash
cd /Users/vascopreun/Perma-coach
npm install
```

Cette commande va :
1. Lire le fichier `package.json` (qui liste toutes les dépendances)
2. Télécharger et installer toutes les bibliothèques nécessaires
3. Créer le dossier `node_modules` avec tout ce qu'il faut

**Ensuite**, vous pourrez lancer le serveur normalement :

```bash
npm run dev
```

## 📝 Note importante

Le dossier `node_modules` est généralement dans `.gitignore` (il n'est pas versionné). C'est normal :
- Chaque développeur doit installer les dépendances sur sa machine
- C'est rapide (quelques minutes)
- Ça se fait une seule fois par projet (ou quand on ajoute de nouvelles dépendances)

## 🔄 Après l'installation

Une fois `npm install` terminé :
- Le dossier `node_modules` existera
- Vous pourrez lancer `npm run dev` comme d'habitude
- Le site fonctionnera sur http://localhost:3000

## ⚠️ Si npm install ne fonctionne pas

Si vous avez des erreurs de permissions (comme vu précédemment), utilisez :

```bash
# Option 1 : Corriger les permissions
sudo chown -R 501:20 "/Users/vascopreun/.npm"
npm install

# Option 2 : Utiliser yarn
yarn install
yarn dev

# Option 3 : Utiliser pnpm
pnpm install
pnpm dev
```

