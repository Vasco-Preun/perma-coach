// Types pour les données du site
export interface SiteSettings {
  chantiersLink: string
  chantiersText: string
  chantiersEnabled: boolean
  coachingsComplete: boolean
  coachingsText: string
  thematiques: string[]
}

export interface Event {
  id: string
  type: 'formation' | 'chantier'
  title: string
  startDate: string
  endDate?: string
  description?: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
}

export interface Legume {
  id: string
  name: string
  enabled: boolean
  category?: string
  price?: number
  unit?: string
}

// Fonctions pour lire/écrire les données JSON
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

export function getSettings(): SiteSettings {
  ensureDataDir()
  const filePath = path.join(dataDir, 'settings.json')
  
  if (!fs.existsSync(filePath)) {
    const defaultSettings: SiteSettings = {
      chantiersLink: 'https://framaforms.org/chantiers-participatifs-de-plantation-de-haie-1740317429',
      chantiersText: 'S\'inscrire aux chantiers participatifs',
      chantiersEnabled: true,
      coachingsComplete: true,
      coachingsText: 'Les coachings sont complets (pas de réservation pour le moment).',
      thematiques: ['Arbres fruitiers', 'Permaculture', 'Autonomie alimentaire', 'Écosystèmes']
    }
    fs.writeFileSync(filePath, JSON.stringify(defaultSettings, null, 2))
    return defaultSettings
  }
  
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export function saveSettings(settings: SiteSettings): void {
  ensureDataDir()
  const filePath = path.join(dataDir, 'settings.json')
  fs.writeFileSync(filePath, JSON.stringify(settings, null, 2))
}

export function getEvents(): Event[] {
  ensureDataDir()
  const filePath = path.join(dataDir, 'events.json')
  
  if (!fs.existsSync(filePath)) {
    const defaultEvents: Event[] = [
      { id: '1', type: 'formation', title: 'Formation plantation arbre fruitier', startDate: '2026-02-13', endDate: '2026-02-14' },
      { id: '2', type: 'chantier', title: 'Chantier plantation arbre fruitier', startDate: '2026-02-21', endDate: '2026-02-22' },
      { id: '3', type: 'chantier', title: 'Chantier plantation arbre fruitier', startDate: '2026-03-08' },
      { id: '4', type: 'formation', title: 'Formation initiation permaculture – créer son potager', startDate: '2026-03-18', endDate: '2026-03-22' },
      { id: '5', type: 'formation', title: 'Formation initiation permaculture – approfondie', startDate: '2026-04-16', endDate: '2026-04-19' },
      { id: '6', type: 'formation', title: 'Formation initiation permaculture', startDate: '2026-05-01', endDate: '2026-05-02' },
      { id: '7', type: 'formation', title: 'Formation initiation permaculture – approfondie', startDate: '2026-05-12', endDate: '2026-05-15' },
      { id: '8', type: 'formation', title: 'Formation initiation permaculture', startDate: '2026-06-06', endDate: '2026-06-07' },
    ]
    fs.writeFileSync(filePath, JSON.stringify(defaultEvents, null, 2))
    return defaultEvents
  }
  
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export function saveEvents(events: Event[]): void {
  ensureDataDir()
  const filePath = path.join(dataDir, 'events.json')
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2))
}

export function getGalleryImages(): GalleryImage[] {
  ensureDataDir()
  const filePath = path.join(dataDir, 'gallery.json')
  
  if (!fs.existsSync(filePath)) {
    // Retourner un tableau vide, les images seront ajoutées via l'admin
    return []
  }
  
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export function saveGalleryImages(images: GalleryImage[]): void {
  ensureDataDir()
  const filePath = path.join(dataDir, 'gallery.json')
  fs.writeFileSync(filePath, JSON.stringify(images, null, 2))
}

export function getLegumes(): Legume[] {
  ensureDataDir()
  const filePath = path.join(dataDir, 'legumes.json')
  
  if (!fs.existsSync(filePath)) {
    const defaultLegumes: Legume[] = [
      { id: '1', name: 'Tomates', enabled: false, category: 'Fruits' },
      { id: '2', name: 'Courgettes', enabled: false, category: 'Fruits' },
      { id: '3', name: 'Aubergines', enabled: false, category: 'Fruits' },
      { id: '4', name: 'Poivrons', enabled: false, category: 'Fruits' },
      { id: '5', name: 'Concombres', enabled: false, category: 'Fruits' },
      { id: '6', name: 'Salades', enabled: false, category: 'Feuilles' },
      { id: '7', name: 'Épinards', enabled: false, category: 'Feuilles' },
      { id: '8', name: 'Bettes', enabled: false, category: 'Feuilles' },
      { id: '9', name: 'Carottes', enabled: false, category: 'Racines' },
      { id: '10', name: 'Betteraves', enabled: false, category: 'Racines' },
      { id: '11', name: 'Radis', enabled: false, category: 'Racines' },
      { id: '12', name: 'Navets', enabled: false, category: 'Racines' },
      { id: '13', name: 'Pommes de terre', enabled: false, category: 'Racines' },
      { id: '14', name: 'Oignons', enabled: false, category: 'Bulbes' },
      { id: '15', name: 'Ail', enabled: false, category: 'Bulbes' },
      { id: '16', name: 'Échalotes', enabled: false, category: 'Bulbes' },
      { id: '17', name: 'Poireaux', enabled: false, category: 'Bulbes' },
      { id: '18', name: 'Haricots verts', enabled: false, category: 'Légumineuses' },
      { id: '19', name: 'Pois', enabled: false, category: 'Légumineuses' },
      { id: '20', name: 'Fèves', enabled: false, category: 'Légumineuses' },
      { id: '21', name: 'Choux', enabled: false, category: 'Brassicas' },
      { id: '22', name: 'Brocolis', enabled: false, category: 'Brassicas' },
      { id: '23', name: 'Choux-fleurs', enabled: false, category: 'Brassicas' },
      { id: '24', name: 'Choux de Bruxelles', enabled: false, category: 'Brassicas' },
      { id: '25', name: 'Courges', enabled: false, category: 'Cucurbitacées' },
      { id: '26', name: 'Potirons', enabled: false, category: 'Cucurbitacées' },
      { id: '27', name: 'Butternut', enabled: false, category: 'Cucurbitacées' },
      { id: '28', name: 'Patates douces', enabled: false, category: 'Racines' },
      { id: '29', name: 'Céleri', enabled: false, category: 'Tiges' },
      { id: '30', name: 'Fenouil', enabled: false, category: 'Tiges' },
    ]
    fs.writeFileSync(filePath, JSON.stringify(defaultLegumes, null, 2))
    return defaultLegumes
  }
  
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export function saveLegumes(legumes: Legume[]): void {
  ensureDataDir()
  const filePath = path.join(dataDir, 'legumes.json')
  fs.writeFileSync(filePath, JSON.stringify(legumes, null, 2))
}

export function getEnabledLegumes(): Legume[] {
  return getLegumes().filter(legume => legume.enabled)
}

