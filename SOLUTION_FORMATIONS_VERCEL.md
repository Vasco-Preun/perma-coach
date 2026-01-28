# Solution : Formations introuvables sur Vercel

## 🎯 Problème
Les formations s'affichent en local mais pas sur Vercel (message "Formation introuvable").

## ✅ Solution immédiate

### Option 1 : Initialiser les données via l'URL (RAPIDE)

**Ouvrez simplement cette URL dans votre navigateur** :

```
https://perma-coach.vercel.app/api/init/events
```

Cela va :
1. Initialiser les événements (formations) dans Vercel KV
2. Vous afficher un message de confirmation JSON

**Après avoir ouvert cette URL, testez à nouveau une formation sur votre site.**

---

### Option 2 : Via l'admin (si l'URL ne fonctionne pas)

1. Allez sur `https://perma-coach.vercel.app/admin`
2. Connectez-vous avec votre mot de passe admin
3. Allez dans l'onglet "Formations"
4. Cliquez sur "Sauvegarder" (même sans modifier)
5. Cela va forcer l'initialisation des données

---

## 🔍 Vérification

Après l'initialisation, vérifiez que :

1. ✅ Les formations s'affichent sur `/pebi-formations`
2. ✅ Vous pouvez cliquer sur une formation
3. ✅ La page d'inscription s'affiche correctement

---

## ❓ Si ça ne fonctionne toujours pas

### Vérifier Vercel KV

1. Allez sur **Vercel Dashboard** → votre projet → **Storage**
2. Vérifiez qu'une base **KV** existe
3. Si elle n'existe pas :
   - Cliquez sur **Create Database**
   - Sélectionnez **KV**
   - Choisissez un nom (ex: `perma-coach-kv`)
   - Cliquez sur **Create**

### Vérifier les variables d'environnement

1. Allez dans **Settings** → **Environment Variables**
2. Vérifiez que ces variables existent :
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
3. Si elles n'existent pas :
   - Vercel les ajoute automatiquement quand vous créez une base KV
   - Redéployez après avoir créé la base KV

---

## 📝 Note

Le code a été modifié pour initialiser automatiquement les événements lors du premier appel. Si les données ne sont pas initialisées, c'est probablement parce que :
- Vercel KV n'est pas configuré, OU
- Les variables d'environnement KV ne sont pas définies, OU
- C'est la première fois que l'API est appelée et l'initialisation a échoué silencieusement

L'URL `/api/init/events` permet de forcer l'initialisation manuellement.
