# Prévisualisation du formulaire de contact

Branche : fix/contact-email. Ne pas fusionner dans main ni promouvoir en production sans accord explicite.

## Configuration requise
- RESEND_API_KEY : conserver la clé côté serveur, ne pas la partager dans le chat.
- CONTACT_FROM_EMAIL : adresse d’expédition appartenant à un domaine vérifié dans Resend (format Nom <adresse@domaine>). Ne pas inventer une adresse Gmail comme expéditeur.
- Le destinataire reste permacoach51@gmail.com.

Documentation : https://resend.com/docs/knowledge-base/403-error-resend-dev-domain

## Tests
Le test `node contact-route.test.cjs` utilise uniquement des services simulés : aucun email réel, aucune lecture ou écriture dans un stockage client. Il couvre succès, refus Resend, exception réseau, configuration absente, saisie invalide, JSON invalide, échec de sauvegarde et inscription chantier.

Avant tout test d’envoi sur Vercel Preview, vérifier que le stockage de prévisualisation est distinct du stockage de production. Ne pas soumettre de formulaire si cette isolation n’est pas confirmée. Un test réel enverra un message à permacoach51@gmail.com : coordonner ce test avec le propriétaire.

## Validation avant production
1. Vérifier que Vercel utilise main pour la production et fix/contact-email pour Preview.
2. Vérifier le domaine expéditeur dans Resend et configurer CONTACT_FROM_EMAIL dans les environnements appropriés.
3. Réussir le build Vercel et vérifier le rendu des deux formulaires.
4. Tester refus et succès dans un environnement isolé, puis vérifier la réception du message fictif.
5. Présenter le résultat et demander l’accord explicite avant fusion ou promotion en production.

## Limites
Le mécanisme de sauvegarde existant est conservé. Un échec email après sauvegarde peut entraîner un doublon si le visiteur soumet à nouveau ; l’interface explique donc que la demande est déjà enregistrée.
Aucun appel FormSubmit n’a été trouvé dans le code actuel. L’origine des activations FormSubmit reste à établir.
Les paiements et les données clients n’ont pas été consultés ou modifiés.
