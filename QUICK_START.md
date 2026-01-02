# Démarrage rapide

## Installation

```bash
npm install
```

## Configuration

1. Créer `.env.local` (optionnel, pour changer le mot de passe admin) :
```
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe
```

2. Le mot de passe par défaut est `admin123`

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Accès à l'administration

1. Allez sur http://localhost:3000/admin
2. Connectez-vous avec le mot de passe (par défaut : `admin123`)
3. Vous pouvez maintenant modifier :
   - Le lien d'inscription aux chantiers
   - Les thématiques
   - Le planning des formations/chantiers
   - Le statut des coachings

## Ajout de photos

Voir `INTEGRATION_PHOTOS.md` pour les instructions détaillées.

En résumé :
1. Téléchargez les photos du WeTransfer
2. Optimisez-les (WebP recommandé)
3. Placez-les dans `public/images/gallery/`
4. Ajoutez-les dans `data/gallery.json`

## Production

```bash
npm run build
npm start
```

## Documentation complète

- `README.md` : Documentation générale
- `IMPLEMENTATION.md` : Détails de l'implémentation
- `GUIDE_GALERIE.md` : Guide pour la galerie
- `INTEGRATION_PHOTOS.md` : Intégration des photos du WeTransfer


