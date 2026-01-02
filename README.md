# Perma-coach

Site web pour Perma-coach - Transmission et permaculture

## Stack technique

- **Next.js 14** (App Router) avec TypeScript
- **Tailwind CSS** pour le styling
- **Système de données JSON** pour la gestion des contenus administrables

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## Administration

L'interface d'administration est accessible sur `/admin`.

Par défaut, le mot de passe est `admin123`. Pour le changer, créez un fichier `.env.local` :

```
NEXT_PUBLIC_ADMIN_PASSWORD=votre_mot_de_passe_securise
```

### Fonctionnalités de l'admin

- **Paramètres généraux** : Modifier le lien d'inscription aux chantiers, le texte CTA, activer/désactiver l'affichage
- **Thématiques** : Gérer la liste des thématiques 2026
- **Planning** : Ajouter, modifier, supprimer des événements (formations et chantiers)
- **Statut coachings** : Activer/désactiver l'affichage "coachings complets"

## Structure des données

Les données sont stockées dans le dossier `data/` :

- `settings.json` : Paramètres du site (liens, textes, thématiques)
- `events.json` : Planning des formations et chantiers
- `gallery.json` : Images de la galerie (à remplir via l'admin ou manuellement)
- `contacts.json` : Messages du formulaire de contact

## Pages

- `/` : Page d'accueil
- `/notre-histoire` : Histoire du projet avec galerie photos
- `/chantiers-participatifs` : Présentation des chantiers et formulaire d'inscription
- `/pebi-formations` : Méthode PEBI, formations et planning
- `/admin` : Interface d'administration

## Ajout de photos dans la galerie

Pour ajouter des photos à la galerie "Notre histoire" :

1. Placez les images dans le dossier `public/images/gallery/`
2. Modifiez le fichier `data/gallery.json` ou utilisez l'interface admin (à implémenter) :

```json
[
  {
    "id": "1",
    "src": "/images/gallery/photo1.jpg",
    "alt": "Description de la photo",
    "width": 1920,
    "height": 1080
  }
]
```

## Production

```bash
npm run build
npm start
```

## Notes importantes

- Les images doivent être optimisées avant d'être ajoutées (formats WebP/AVIF recommandés)
- Le système utilise des fichiers JSON pour la simplicité. Pour une production à grande échelle, envisagez une base de données
- Le formulaire de contact enregistre les messages dans `data/contacts.json`. Configurez un service d'email pour les notifications


