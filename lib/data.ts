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

// Fonctions pour lire/écrire les données JSON (local) ou Vercel KV (production)
import fs from 'fs'
import path from 'path'
import { getKV, setKV, isUsingKV } from './kv'

const dataDir = path.join(process.cwd(), 'data')

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Fonction helper pour lire : KV en production, fichiers en local
async function readData(key: string, defaultValue: any): Promise<any> {
  const usingKV = await isUsingKV()
  if (usingKV) {
    const data = await getKV(key)
    return data !== null ? data : defaultValue
  }
  
  // Fallback sur fichiers JSON
  ensureDataDir()
  const filePath = path.join(dataDir, `${key}.json`)
  if (!fs.existsSync(filePath)) {
    return defaultValue
  }
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

// Fonction helper pour écrire : KV en production, fichiers en local
async function writeData(key: string, value: any): Promise<void> {
  const usingKV = await isUsingKV()
  if (usingKV) {
    await setKV(key, value)
    return
  }
  
  // Fallback sur fichiers JSON
  ensureDataDir()
  const filePath = path.join(dataDir, `${key}.json`)
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2))
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
    // Si aucune donnée, initialiser avec les valeurs par défaut
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
  // Charger depuis data/legumes.json si disponible (pour migration)
  ensureDataDir()
  const filePath = path.join(dataDir, 'legumes.json')
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8')
    const legumes = JSON.parse(data)
    // Migrer vers KV si nécessaire
    const usingKV = await isUsingKV()
    if (usingKV) {
      await writeData('legumes', legumes)
    }
    return legumes
  }
  
  // Sinon, lire depuis KV ou retourner les valeurs par défaut
  const defaultLegumes: Legume[] = [
    { id: 'carottes', name: 'Carottes', enabled: true, category: 'Racines', price: 3.5, unit: 'kg' },
    { id: 'poireaux', name: 'Poireaux', enabled: true, category: 'Bulbes', price: 3.5, unit: 'kg' },
    { id: 'celeri-gros', name: 'Céleri (gros)', enabled: true, category: 'Tiges', price: 4.0, unit: 'pièce' },
    { id: 'celeri-petit', name: 'Céleri (petit)', enabled: true, category: 'Tiges', price: 3.0, unit: 'pièce' },
    { id: 'pommes-terre-tendre', name: 'Pommes de terre chair tendre', enabled: true, category: 'Racines', price: 2.5, unit: 'kg' },
    { id: 'pommes-terre-ferme', name: 'Pommes de terre chair ferme', enabled: true, category: 'Racines', price: 2.5, unit: 'kg' },
    { id: 'betterave-crue', name: 'Betterave crue', enabled: true, category: 'Racines', price: 5.0, unit: 'lot (2 pour 500g)', description: 'Lot de 2 betteraves crues (environ 500g)' },
    { id: 'betterave-cuite', name: 'Betterave cuite', enabled: true, category: 'Racines', price: 5.0, unit: 'lot (3 pour 500g)', description: 'Lot de 3 betteraves cuites (environ 500g)' },
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

