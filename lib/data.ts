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
  isLot?: boolean
  lotDescription?: string
}

// Fonctions pour lire/écrire les données via KV (production) ou JSON (local)
import { getKV, setKV } from './kv'

// Fonction helper pour lire les données
async function readData(key: string, defaultValue: any): Promise<any> {
  const data = await getKV(key)
  return data !== null && data !== undefined ? data : defaultValue
}

// Fonction helper pour écrire les données
async function writeData(key: string, value: any): Promise<void> {
  await setKV(key, value)
}

export async function getSettings(): Promise<SiteSettings> {
  const defaultSettings: SiteSettings = {
    chantiersLink: 'https://framaforms.org/chantiers-participatifs-de-plantation-de-haie-1740317429',
    chantiersText: 'S\'inscrire aux chantiers participatifs',
    chantiersEnabled: true,
    coachingsComplete: true,
    coachingsText: 'Les coachings sont complets (pas de réservation pour le moment).',
    thematiques: ['Arbres fruitiers', 'Permaculture', 'Autonomie alimentaire', 'Écosystèmes']
  }
  
  const data = await readData('settings', defaultSettings)
  if (!data) {
    await writeData('settings', defaultSettings)
    return defaultSettings
  }
  return data
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await writeData('settings', settings)
}

export async function getEvents(): Promise<Event[]> {
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
  
  const data = await readData('events', defaultEvents)
  if (!data || data.length === 0) {
    await writeData('events', defaultEvents)
    return defaultEvents
  }
  return data
}

export async function saveEvents(events: Event[]): Promise<void> {
  await writeData('events', events)
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const data = await readData('gallery', [])
  return data || []
}

export async function saveGalleryImages(images: GalleryImage[]): Promise<void> {
  await writeData('gallery', images)
}

export async function getLegumes(): Promise<Legume[]> {
  const defaultLegumes: Legume[] = [
    { id: 'carottes', name: 'Carottes', enabled: true, category: 'Racines', price: 3.5, unit: 'kg' },
    { id: 'poireaux', name: 'Poireaux', enabled: true, category: 'Bulbes', price: 3.5, unit: 'kg' },
    { id: 'celeri-gros', name: 'Céleri (gros)', enabled: true, category: 'Tiges', price: 4.0, unit: 'pièce' },
    { id: 'celeri-petit', name: 'Céleri (petit)', enabled: true, category: 'Tiges', price: 3.0, unit: 'pièce' },
    { id: 'pommes-terre-tendre', name: 'Pommes de terre chair tendre', enabled: true, category: 'Racines', price: 2.5, unit: 'kg' },
    { id: 'pommes-terre-ferme', name: 'Pommes de terre chair ferme', enabled: true, category: 'Racines', price: 2.5, unit: 'kg' },
    { id: 'betterave-crue', name: 'Betterave crue', enabled: true, category: 'Racines', price: 5.0, unit: 'lot (2 pour 500g)', lotDescription: 'Lot de 2 betteraves crues (environ 500g)' },
    { id: 'betterave-cuite', name: 'Betterave cuite', enabled: true, category: 'Racines', price: 5.0, unit: 'lot (3 pour 500g)', lotDescription: 'Lot de 3 betteraves cuites (environ 500g)' },
    { id: 'butternut', name: 'Butternut', enabled: true, category: 'Cucurbitacées', price: 3.9, unit: 'pièce' },
    { id: 'potimarron', name: 'Potimarron', enabled: true, category: 'Cucurbitacées', price: 3.9, unit: 'pièce' },
  ]
  
  const data = await readData('legumes', defaultLegumes)
  if (!data || data.length === 0) {
    await writeData('legumes', defaultLegumes)
    return defaultLegumes
  }
  return data
}

export async function saveLegumes(legumes: Legume[]): Promise<void> {
  await writeData('legumes', legumes)
}

export async function getEnabledLegumes(): Promise<Legume[]> {
  const legumes = await getLegumes()
  return legumes.filter(legume => legume.enabled)
}
