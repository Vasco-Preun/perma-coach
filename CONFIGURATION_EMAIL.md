# Configuration de l'envoi d'email automatique

Le système envoie automatiquement un email à `permacoach51@gmail.com` à chaque nouvelle commande.

## Configuration requise

### 1. Créer un mot de passe d'application Gmail

Gmail nécessite un "App Password" (mot de passe d'application) au lieu du mot de passe normal pour des raisons de sécurité.

**Étapes :**

1. Allez sur votre compte Google : https://myaccount.google.com
2. Allez dans **Sécurité**
3. Activez la **Validation en deux étapes** si ce n'est pas déjà fait
4. Allez dans **Mots de passe des applications** (ou **App passwords**)
5. Sélectionnez **Autre (nom personnalisé)** et entrez "Perma-coach"
6. Cliquez sur **Générer**
7. **Copiez le mot de passe généré** (16 caractères, espaces séparés)

### 2. Configurer les variables d'environnement

Ajoutez ces variables dans votre fichier `.env.local` (développement) ou dans les variables d'environnement de Vercel (production) :

```env
# Configuration email
EMAIL_USER=permacoach51@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_d_application_ici
```

**⚠️ Important :**
- Utilisez le **mot de passe d'application** (pas votre mot de passe Gmail normal)
- Ne partagez jamais ce mot de passe
- Ne commitez jamais `.env.local` dans Git

### 3. Installation des dépendances

Les dépendances nécessaires sont déjà dans `package.json`. Si vous devez les installer :

```bash
npm install
```

## Fonctionnement

À chaque nouvelle commande :
1. La commande est sauvegardée dans la base de données
2. Un email est automatiquement envoyé à `permacoach51@gmail.com` avec :
   - Les informations du client (nom, email, téléphone)
   - Le mode de récupération (ferme ou livraison Reims)
   - La liste complète des produits commandés
   - Le récapitulatif (sous-total, remise, total)
   - Les notes du client (si présentes)
   - Le numéro de commande et la date

## Format de l'email

L'email contient :
- **Version texte** : pour les clients email simples
- **Version HTML** : pour une meilleure présentation visuelle

## Dépannage

### L'email n'est pas envoyé

1. **Vérifiez les variables d'environnement** :
   - `EMAIL_USER` doit être `permacoach51@gmail.com`
   - `EMAIL_PASSWORD` doit être le mot de passe d'application (16 caractères)

2. **Vérifiez les logs** :
   - En développement : regardez la console du serveur
   - En production : regardez les logs Vercel

3. **Vérifiez que la validation en deux étapes est activée** sur votre compte Google

4. **Vérifiez que le mot de passe d'application est correct** :
   - Il doit faire 16 caractères
   - Il ne doit pas contenir d'espaces (ou les espaces doivent être supprimés)

### Erreur "Invalid login"

- Vérifiez que vous utilisez bien un **mot de passe d'application** et non votre mot de passe Gmail normal
- Vérifiez que la validation en deux étapes est activée

### Erreur "Connection timeout"

- Vérifiez votre connexion internet
- Vérifiez que le port 587 (SMTP) n'est pas bloqué par votre firewall

## Alternative : Utiliser un service d'email tiers

Si vous préférez utiliser un service comme **Resend**, **SendGrid** ou **Mailgun**, vous pouvez modifier `lib/email.ts` pour utiliser leur API au lieu de Nodemailer.
