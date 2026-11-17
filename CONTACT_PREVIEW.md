# Prévisualisation du formulaire FormSubmit

Branche : fix/contact-email. Ne pas fusionner dans main ni promouvoir en production sans accord explicite.

## Fonctionnement
Les contacts et inscriptions chantier utilisent /api/contact, qui transmet des champs explicitement sélectionnés à https://formsubmit.co/ajax/permacoach51@gmail.com.
Aucune configuration DNS OVH, clé Resend ou CONTACT_FROM_EMAIL n’est nécessaire pour ces deux formulaires.
Les autres emails du site ne sont pas concernés.

Le propriétaire doit activer le formulaire depuis l’email FormSubmit reçu dans permacoach51@gmail.com. Tant que le service demande une activation, l’interface affiche un avertissement.
Le formulaire utilise une URL canonique stable : https://www.lesjardinsduclos.com/contact.
Une réponse HTTP 200 ne suffit pas : le serveur exige success égal à true ou "true", et traite séparément les demandes d’activation.
Un succès indique l’acceptation par FormSubmit ; la réception en boîte mail doit être vérifiée par le propriétaire.

## Protection des contacts existants
En environnement Vercel Preview (VERCEL_ENV=preview), /api/contact ne lit et n’écrit jamais la collection contacts. Les tests sur cette branche ne sont donc pas enregistrés dans l’administration.
En production, le mécanisme de sauvegarde existant est conservé avant la transmission. Aucun contact existant n’a été consulté ou modifié pendant le travail.
Les paiements restent hors périmètre.

## Validation
`node contact-route.test.cjs` couvre 14 scénarios avec réseau et stockage simulés : succès booléen et chaîne, refus chaîne "false", erreur HTTP, panne réseau, JSON de réponse invalide, réponse ambiguë, activation avec deux valeurs de succès, saisie invalide, JSON de requête invalide, sauvegarde impossible, chantier et absence totale d’accès au stockage en Preview.
Aucun email réel n’est envoyé par ces tests.

## Prochaine étape
1. Attendre le statut Ready du nouveau commit sur Vercel Preview.
2. Vérifier le rendu de /contact, puis convenir avec le propriétaire d’un unique message fictif de test.
3. Le propriétaire clique sur le lien d’activation FormSubmit s’il le reçoit ; ne pas soumettre plusieurs fois en attendant cette activation.
4. Effectuer ensuite un nouveau test fictif et confirmer la réception ainsi que la réponse à l’adresse du testeur.
5. Demander l’accord explicite avant toute fusion ou promotion en production.

Documentation officielle :
- https://formsubmit.co/ajax-documentation
- https://formsubmit.co/help

## Limites
L’envoi réel, l’activation et la réception ne sont pas encore validés. FormSubmit reçoit les données des futures demandes pour les transmettre au propriétaire. Sa FAQ indique une conservation des soumissions pendant 30 jours.
Un échec email après sauvegarde en production peut entraîner un doublon si le visiteur soumet à nouveau ; l’interface explique que la demande est déjà enregistrée.
