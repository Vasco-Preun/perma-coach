# Prévisualisation : envoi direct FormSubmit

Branche fix/contact-email. Aucune fusion ni promotion en production sans accord explicite.

## Motif et comportement
Le test réel du relais serveur Vercel a obtenu HTTP 403 avec une réponse non JSON de FormSubmit. La cause précise de ce refus n’est pas connue.
Les formulaires de contact (également présent sur la page chantiers-participatifs) et d’inscription chantier utilisent désormais un formulaire HTML POST envoyé directement par le navigateur à https://formsubmit.co/permacoach51@gmail.com, conformément au mode standard documenté par FormSubmit.
Ils comportent les attributs name indispensables à la transmission des champs, ainsi qu’un sujet, le consentement et une URL canonique. Les inscriptions transmettent aussi leur identifiant de chantier.
La page FormSubmit prend le relais pour les vérifications antispam, l’activation éventuelle et la confirmation. Le site n’affiche plus de succès local supposé. La réception réelle reste à vérifier avec le propriétaire.
La protection reCAPTCHA FormSubmit n’est pas désactivée.

## Conséquence pour l’administration
Les nouvelles demandes passent directement par FormSubmit : elles ne sont plus ajoutées à la collection contacts de l’administration, en prévisualisation comme après une éventuelle mise en production.
L’ancien endpoint /api/contact renvoie 410 pour inviter les pages anciennes à être rechargées ; il ne transmet rien et n’accède à aucun stockage.
Les contacts déjà enregistrés ne sont ni lus ni modifiés. Les paiements et les autres emails du site restent hors périmètre.

## Validation
Le test contact-route.test.cjs utilise Playwright contre un serveur local sur le port 3100 et intercepte TOUS les envois vers FormSubmit. Il vérifie la sérialisation réelle des deux formulaires, le blocage sans consentement, le destinataire, le sujet, l’identifiant chantier, l’absence d’appel au relais serveur et la navigation vers la réponse simulée du fournisseur. Aucun email n’est envoyé par ce test.
Playwright doit être disponible dans l’environnement de test.

## Validation réelle restante
1. Attendre Ready pour le nouveau commit dans Vercel Preview, puis ouvrir Visit.
2. Envoyer un seul message fictif et suivre les instructions affichées par FormSubmit.
3. Le propriétaire active le formulaire depuis sa boîte permacoach51@gmail.com si demandé.
4. Après activation, vérifier la réception complète d’un second test et la possibilité de répondre au testeur.
5. La production et la prévisualisation ont des adresses différentes : ne pas garantir que l’activation se transfère entre elles. Vérifier également le fonctionnement sur le domaine public après toute publication autorisée.
6. Présenter ces résultats et la conséquence pour l’administration avant de demander l’accord explicite de mise en production.

Sources : https://formsubmit.co/documentation et https://formsubmit.co/help
