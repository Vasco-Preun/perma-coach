# Intégration des photos du WeTransfer

## Étape 1 : Télécharger les photos

1. Accédez au lien WeTransfer : https://we.tl/t-PTh62DQdtn
2. Téléchargez toutes les photos
3. Extrayez l'archive si nécessaire

## Étape 2 : Optimiser les images (recommandé)

Pour de meilleures performances, optimisez les images avant de les ajouter :

### Option A : Utiliser Squoosh (en ligne)
1. Allez sur https://squoosh.app/
2. Glissez-déposez chaque image
3. Choisissez le format WebP
4. Ajustez la qualité (80-85% pour les photos)
5. Téléchargez l'image optimisée

### Option B : Utiliser ImageMagick (ligne de commande)
```bash
# Installer ImageMagick (si pas déjà installé)
# Sur Mac : brew install imagemagick
# Sur Linux : sudo apt-get install imagemagick

# Convertir en WebP
for file in *.jpg *.png; do
  convert "$file" -quality 85 -resize 1920x "optimized_${file%.*}.webp"
done
```

## Étape 3 : Placer les images

1. Créez le dossier s'il n'existe pas : `public/images/gallery/`
2. Copiez toutes les images optimisées dans ce dossier
3. Nommez-les de manière claire (ex: `jardin-1.webp`, `chantier-2.webp`)

## Étape 4 : Ajouter les images au JSON

Ouvrez `data/gallery.json` et ajoutez chaque image :

```json
[
  {
    "id": "1",
    "src": "/images/gallery/jardin-1.webp",
    "alt": "Notre jardin en permaculture avec buttes et légumes",
    "width": 1920,
    "height": 1080
  },
  {
    "id": "2",
    "src": "/images/gallery/chantier-1.webp",
    "alt": "Chantier participatif de plantation de haie",
    "width": 1920,
    "height": 1080
  }
]
```

### Obtenir les dimensions des images

**Sur Mac :**
- Clic droit sur l'image > Lire les informations
- Notez la largeur (width) et la hauteur (height)

**Sur Windows :**
- Clic droit > Propriétés > Détails
- Notez les dimensions

**En ligne de commande :**
```bash
# Avec ImageMagick
identify image.webp

# Avec sips (Mac)
sips -g pixelWidth -g pixelHeight image.webp
```

## Étape 5 : Vérifier

1. Démarrez le serveur de développement : `npm run dev`
2. Allez sur http://localhost:3000/notre-histoire
3. Vérifiez que la galerie s'affiche correctement
4. Testez le lightbox en cliquant sur une image

## Note sur le document pebi.docx

Le document `pebi.docx` du WeTransfer peut être utilisé comme référence pour compléter le contenu de la page PEBI si nécessaire. Pour l'instant, le contenu de base est déjà intégré, mais vous pouvez l'enrichir avec des informations supplémentaires du document.

## Astuce : Script d'aide (optionnel)

Vous pouvez créer un script pour faciliter l'ajout des images. Créez `scripts/add-gallery-image.js` :

```javascript
const fs = require('fs');
const path = require('path');

// Usage: node scripts/add-gallery-image.js nom-image.webp "Description"
const [,, imageName, alt] = process.argv;

if (!imageName || !alt) {
  console.error('Usage: node scripts/add-gallery-image.js image.webp "Description"');
  process.exit(1);
}

const galleryPath = path.join(__dirname, '../data/gallery.json');
const gallery = fs.existsSync(galleryPath) 
  ? JSON.parse(fs.readFileSync(galleryPath, 'utf-8'))
  : [];

const newImage = {
  id: (gallery.length + 1).toString(),
  src: `/images/gallery/${imageName}`,
  alt: alt,
  width: 1920, // À ajuster manuellement
  height: 1080 // À ajuster manuellement
};

gallery.push(newImage);
fs.writeFileSync(galleryPath, JSON.stringify(gallery, null, 2));

console.log(`Image ajoutée : ${imageName}`);
```


