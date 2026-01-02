# Comment lancer le serveur

## Le problème "Safari ne parvient pas à se connecter"

Cela signifie que **le serveur de développement n'est pas lancé**.

## Solution : Lancer le serveur

**Dans votre terminal**, exécutez :

```bash
cd /Users/vascopreun/Perma-coach
npm run dev
```

Vous devriez voir quelque chose comme :

```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

**Une fois ce message affiché**, le serveur est prêt et vous pouvez ouvrir Safari sur :
- http://localhost:3000

## ⚠️ Important

**Le terminal doit rester ouvert** pendant que vous utilisez le site. Si vous fermez le terminal, le serveur s'arrête.

Pour arrêter le serveur : appuyez sur `Ctrl + C` dans le terminal.

## 🔍 Vérifications

Si ça ne marche toujours pas :

1. **Vérifier que les dépendances sont installées** :
   ```bash
   ls node_modules
   ```
   Si le dossier n'existe pas, exécutez `npm install`

2. **Vérifier qu'aucun autre processus n'utilise le port 3000** :
   ```bash
   lsof -ti:3000
   ```
   Si un processus est listé, tuez-le ou utilisez un autre port :
   ```bash
   npm run dev -- -p 3001
   ```

3. **Vérifier les erreurs dans le terminal** :
   Regardez les messages d'erreur qui s'affichent quand vous lancez `npm run dev`

## 📝 Résumé

1. Ouvrir un terminal
2. Aller dans le dossier : `cd /Users/vascopreun/Perma-coach`
3. Lancer : `npm run dev`
4. Attendre le message "ready started server"
5. Ouvrir Safari sur http://localhost:3000


