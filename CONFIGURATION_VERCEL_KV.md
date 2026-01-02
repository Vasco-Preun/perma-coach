# Configuration Vercel KV pour le stockage des données

## Problème résolu

Sur Vercel, le système de fichiers est en **lecture seule**. Les fichiers JSON dans le dossier `data/` ne peuvent pas être modifiés en production, ce qui empêchait les modifications depuis l'interface admin.

## Solution : Vercel KV

Le code a été modifié pour utiliser **Vercel KV** (base de données Redis) en production, tout en conservant les fichiers JSON pour le développement local.

## Étapes de configuration

### 1. Installer le package (déjà fait dans package.json)

Le package `@vercel/kv` est déjà ajouté dans `package.json`. Si vous devez l'installer manuellement :

```bash
npm install @vercel/kv
```

### 2. Créer une base de données KV sur Vercel

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans l'onglet **Storage**
4. Cliquez sur **Create Database**
5. Sélectionnez **KV** (Key-Value)
6. Choisissez un nom (ex: `perma-coach-kv`)
7. Sélectionnez la région la plus proche (ex: `fra1` pour la France)
8. Cliquez sur **Create**

### 3. Configurer les variables d'environnement

Une fois la base KV créée, Vercel génère automatiquement les variables d'environnement. Vous devez les ajouter à votre projet :

1. Dans le dashboard Vercel, allez dans **Settings** > **Environment Variables**
2. Vercel devrait avoir automatiquement ajouté :
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
3. Si elles ne sont pas présentes, vous pouvez les trouver dans l'onglet **Storage** > votre base KV > **.env.local**

### 4. Redéployer le site

Après avoir configuré les variables d'environnement :

1. Allez dans **Deployments**
2. Cliquez sur **Redeploy** sur le dernier déploiement
3. Ou poussez un nouveau commit sur GitHub pour déclencher un nouveau déploiement

## Comment ça fonctionne

Le code détecte automatiquement l'environnement :

- **En production (Vercel)** : Si `KV_REST_API_URL` et `KV_REST_API_TOKEN` sont présents, utilise Vercel KV
- **En local** : Utilise les fichiers JSON dans `data/`

### Fichiers modifiés

- `lib/kv.ts` : Gestion hybride KV/JSON
- `lib/data.ts` : Fonctions async pour lire/écrire (KV ou JSON)
- `app/api/admin/events/route.ts` : Utilise `await` pour les fonctions async
- `app/api/legumes/route.ts` : Utilise `await` pour les fonctions async
- `app/api/admin/settings/route.ts` : Utilise `await` pour les fonctions async
- `app/page.tsx` : Fonction async pour charger les données
- `app/pebi-formations/page.tsx` : Fonction async pour charger les données
- `app/chantiers-participatifs/page.tsx` : Fonction async pour charger les données

## Migration des données existantes

Si vous avez déjà des données dans `data/*.json`, elles seront automatiquement migrées vers KV lors de la première lecture en production.

## Vérification

Une fois configuré, vous pouvez tester :

1. Connectez-vous à `/admin` sur votre site en production
2. Modifiez une formation ou activez/désactivez un légume
3. Les modifications doivent être sauvegardées et visibles immédiatement

## Support

Si vous rencontrez des problèmes :

1. Vérifiez que les variables d'environnement sont bien configurées dans Vercel
2. Vérifiez les logs de déploiement pour d'éventuelles erreurs
3. Assurez-vous que `@vercel/kv` est bien installé (`npm install`)

