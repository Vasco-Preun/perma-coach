# Guide de débogage Vercel KV

## Vérifications à faire

### 1. Vérifier que la base KV est créée

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Onglet **Storage**
4. Vous devriez voir une base de données **KV** listée

### 2. Vérifier les variables d'environnement

1. Dans Vercel Dashboard → **Settings** → **Environment Variables**
2. Vous devez avoir :
   - `KV_REST_API_URL` (commence par `https://`)
   - `KV_REST_API_TOKEN` (longue chaîne de caractères)

**Important** : Ces variables doivent être présentes pour **Production**, **Preview** et **Development**.

### 3. Vérifier que le package est installé

Dans votre projet, vérifiez que `@vercel/kv` est dans `package.json` :

```bash
grep "@vercel/kv" package.json
```

Si ce n'est pas le cas, ajoutez-le et redéployez.

### 4. Vérifier les logs Vercel

1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Regardez les **Function Logs** ou **Build Logs**
4. Cherchez des messages comme :
   - "Vercel KV initialisé avec succès"
   - "Vercel KV non configuré"
   - "Erreur écriture KV"

### 5. Tester l'API directement

Vous pouvez tester si KV fonctionne en appelant directement l'API :

```bash
# Remplacer VOTRE_DOMAINE par votre domaine Vercel
curl https://VOTRE_DOMAINE.vercel.app/api/admin/events
```

### 6. Vérifier la console du navigateur

1. Ouvrez `/admin` sur votre site
2. Ouvrez la console du navigateur (F12)
3. Essayez de modifier quelque chose
4. Regardez les erreurs dans la console

## Messages d'erreur courants

### "Vercel KV non configuré"
- Les variables d'environnement ne sont pas présentes
- Solution : Vérifiez les variables dans Vercel Dashboard

### "Erreur import @vercel/kv"
- Le package n'est pas installé
- Solution : `npm install @vercel/kv` et redéployez

### "Impossible d'écrire dans KV"
- La connexion à KV échoue
- Solution : Vérifiez que la base KV est active et que les credentials sont corrects

### "Impossible d'écrire dans les fichiers sur Vercel"
- Le code essaie d'écrire dans les fichiers en production
- Solution : Vérifiez que KV est bien configuré

## Solution rapide

Si rien ne fonctionne, voici les étapes à suivre dans l'ordre :

1. **Créer la base KV** (si pas déjà fait)
   - Vercel Dashboard → Storage → Create Database → KV

2. **Vérifier les variables d'environnement**
   - Settings → Environment Variables
   - Doivent être présentes pour Production, Preview, Development

3. **Redéployer**
   - Deployments → Redeploy

4. **Vérifier les logs**
   - Regardez les Function Logs pour voir les erreurs

5. **Tester**
   - Allez sur `/admin` et essayez de modifier quelque chose

## Contact

Si le problème persiste après ces vérifications, partagez :
- Les logs Vercel (Function Logs)
- Les erreurs de la console du navigateur
- Une capture d'écran de la page Storage dans Vercel

