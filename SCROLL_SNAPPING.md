# Scroll Snapping - Documentation

## Implémentation

Le scroll snapping a été implémenté avec une approche **pure CSS**, légère et performante.

## Comportement

- **Actif uniquement sur desktop** (≥ 1024px)
- **Désactivé sur mobile/tablette** pour préserver le scroll naturel
- **Respecte `prefers-reduced-motion`** : désactivé si l'utilisateur préfère réduire les animations
- **Snap doux** : utilise `scroll-snap-type: y proximity` pour un accrochage subtil, jamais brutal

## Configuration

### CSS (globals.css)

```css
@media (min-width: 1024px) {
  @media (prefers-reduced-motion: no-preference) {
    main {
      scroll-snap-type: y proximity;
      scroll-padding-top: 5rem; /* Compensation header sticky */
    }
    
    .snap-section {
      scroll-snap-align: start;
      scroll-margin-top: 5rem; /* Compensation header sticky */
    }
  }
}
```

### Utilisation dans les composants

Pour activer le scroll snapping sur une section :

```tsx
<Section padding="xl" background="white" snap>
  {/* Contenu */}
</Section>
```

Le prop `snap={true}` ajoute automatiquement la classe `.snap-section`.

## Sections avec scroll snapping

### Page d'accueil
- Hero section
- Méthode PEBI
- Formations & Chantiers
- CTA Final

### Notre histoire
- Hero section
- Galerie

### Chantiers participatifs
- Hero section
- Explication
- CTA Inscription

### PEBI / Formations
- Hero section
- Présentation PEBI
- Planning

## Performance

- **0 JavaScript** : solution pure CSS
- **Pas d'impact sur les performances** : le navigateur gère nativement
- **Fluide sur trackpad** (Mac) et souris
- **Aucun blocage** : le scroll reste naturel, le snap est subtil

## Test

Pour tester le scroll snapping :
1. Ouvrir le site sur desktop (≥ 1024px)
2. Scroller avec la molette ou le trackpad
3. Observer l'accrochage doux aux sections marquées

Pour désactiver temporairement :
- Réduire la fenêtre en dessous de 1024px
- Ou activer "Réduire les animations" dans les préférences système

