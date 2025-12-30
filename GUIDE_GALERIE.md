# Guide d'ajout de photos à la galerie

## Méthode 1 : Ajout manuel (recommandé pour commencer)

1. **Préparer les images**
   - Optimisez vos images (format WebP ou AVIF recommandé)
   - Redimensionnez-les si nécessaire (max 1920px de largeur recommandé)
   - Placez-les dans le dossier `public/images/gallery/`

2. **Ajouter les images au fichier JSON**
   - Ouvrez le fichier `data/gallery.json`
   - Ajoutez une entrée pour chaque image :

```json
[
  {
    "id": "1",
    "src": "/images/gallery/photo1.webp",
    "alt": "Description de la photo pour l'accessibilité",
    "width": 1920,
    "height": 1080
  },
  {
    "id": "2",
    "src": "/images/gallery/photo2.webp",
    "alt": "Autre description",
    "width": 1920,
    "height": 1080
  }
]
```

3. **Obtenir les dimensions**
   - Sur Mac : Clic droit > Lire les informations
   - Sur Windows : Clic droit > Propriétés > Détails
   - Ou utilisez un outil en ligne

## Méthode 2 : Via l'interface admin (à venir)

Une interface d'administration pour la galerie sera ajoutée dans une prochaine version.

## Optimisation des images

Pour optimiser vos images avant de les ajouter :

1. **Utiliser un outil en ligne** :
   - [Squoosh](https://squoosh.app/) - Conversion et compression
   - [TinyPNG](https://tinypng.com/) - Compression

2. **Format recommandé** :
   - WebP pour une meilleure compression
   - AVIF pour une compression encore meilleure (support moderne)
   - JPG/PNG en fallback si nécessaire

3. **Taille recommandée** :
   - Largeur max : 1920px
   - Qualité : 80-85% pour les photos
   - Qualité : 90-95% pour les images avec texte

## Notes importantes

- Les images sont chargées en lazy-loading automatiquement
- Le lightbox s'ouvre au clic sur une image
- Assurez-vous d'inclure des descriptions alt pertinentes pour l'accessibilité

