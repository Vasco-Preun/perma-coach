# Prévisualisation : contact avec Resend

Branche fix/contact-email. Production inchangée, publication soumise à accord explicite.

## État
FormSubmit n’est plus utilisé par les formulaires. Les tests réels ont rencontré un refus HTTP 403 côté serveur et un timeout HTTP 522 côté navigateur ; aucune réception n’a été confirmée par le propriétaire.
Le code revient à Resend avec expéditeur configurable et vérifié. Les formulaires restent sur le site et affichent une erreur en cas d’échec. Le nom, email, téléphone, sujet, message et consentement sont validés côté serveur.

## Configuration restante
1. Dans Resend, ajouter notifications.lesjardinsduclos.com pour l’envoi uniquement.
2. Copier les enregistrements EXACTS proposés par Resend (sur la capture actuelle : un TXT DKIM et deux CNAME). Ne pas reconstituer les valeurs tronquées.
3. Le propriétaire ajoute ces enregistrements dans la zone DNS OVH lesjardinsduclos.com. Ne pas modifier les enregistrements du site, les serveurs DNS ou les MX existants de messagerie. Vérifier les noms déjà présents avant ajout. Pas de partage de mot de passe nécessaire.
4. Attendre Verified dans Resend.
5. Dans Vercel, configurer CONTACT_FROM_EMAIL = Perma-coach <contact@notifications.lesjardinsduclos.com> et confirmer que la clé RESEND_API_KEY existante appartient au bon compte et peut envoyer depuis ce sous-domaine. Ne jamais partager la clé dans le chat.
6. Déployer en Preview, tester un seul message fictif, confirmer la réception avec le propriétaire et vérifier qu’il peut répondre au testeur.
7. Demander accord explicite avant fusion ou promotion en production. Vérifier ensuite le domaine public.

## Données
En Vercel Preview, /api/contact ne lit et n’écrit aucun contact enregistré. Après publication autorisée, la sauvegarde de nouvelles demandes utilise le mécanisme de production existant avant l’envoi.
Aucune donnée client existante n’a été consultée ou modifiée. Les paiements et les emails liés aux commandes ne sont pas modifiés.
Un succès signifie que Resend a retourné un identifiant de message ; il faut toujours confirmer la réception réelle.

## Validation locale
12 tests simulés couvrent : succès, refus, panne réseau, identifiant absent, saisie invalide, JSON invalide, clé absente, expéditeur absent, expéditeur resend.dev refusé, sauvegarde impossible, isolation Preview et chantier.
TypeScript et build Next.js réussis. Aucun email réel envoyé pendant ces vérifications.

Documentation : https://resend.com/docs/dashboard/domains/introduction
