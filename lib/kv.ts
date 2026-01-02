// Utilitaire pour Vercel KV (production) ou fichiers JSON (local)
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Fonction pour lire depuis KV (production) ou fichiers JSON (local)
export async function getKV(key: string): Promise<any> {
  // Sur Vercel, utiliser KV
  if (process.env.VERCEL) {
    try {
      const { kv } = await import('@vercel/kv')
      const data = await kv.get(key)
      return data
    } catch (error) {
      console.error(`Erreur lecture KV pour ${key}:`, error)
      throw error
    }
  }
  
  // En local, utiliser les fichiers JSON
  ensureDataDir()
  const filePath = path.join(dataDir, `${key}.json`)
  if (!fs.existsSync(filePath)) {
    return null
  }
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

// Fonction pour écrire dans KV (production) ou fichiers JSON (local)
export async function setKV(key: string, value: any): Promise<void> {
  // Sur Vercel, utiliser KV
  if (process.env.VERCEL) {
    try {
      const { kv } = await import('@vercel/kv')
      await kv.set(key, value)
    } catch (error) {
      console.error(`Erreur écriture KV pour ${key}:`, error)
      throw error
    }
    return
  }
  
  // En local, utiliser les fichiers JSON
  ensureDataDir()
  const filePath = path.join(dataDir, `${key}.json`)
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2))
}
