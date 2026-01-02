# 🚀 Démarrage du site - Version simplifiée

## ✅ Tout est configuré automatiquement !

J'ai mis en place des scripts qui corrigent automatiquement les problèmes de permissions.

## 🎯 Pour démarrer le site

**Une seule commande :**

```bash
npm run dev
```

C'est tout ! Le script va :
1. ✅ Vérifier automatiquement les permissions
2. ✅ Corriger les problèmes si nécessaire
3. ✅ Démarrer le serveur

## 📍 Accès au site

Une fois le serveur démarré, ouvrez votre navigateur sur :
- **http://localhost:3000** - Page d'accueil
- **http://localhost:3000/admin** - Administration (mot de passe : `admin123`)

## ⚠️ Si vous voyez encore une erreur

Si l'erreur "Operation not permitted" apparaît encore :

1. **Arrêtez le serveur** (Ctrl + C dans le terminal)
2. **Exécutez** :
   ```bash
   npm run fix
   npm run dev
   ```

## 🔄 Réinstallation complète (si nécessaire)

Si rien ne fonctionne :

```bash
rm -rf node_modules .next package-lock.json
npm install --cache /tmp/npm-cache
npm run dev
```

## ✨ C'est tout !

Plus besoin de commandes compliquées. Juste `npm run dev` et ça devrait fonctionner !


