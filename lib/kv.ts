// Utilitaire pour Vercel KV (production) ou fichiers JSON (local)
// Cette fonction détecte automatiquement l'environnement

let kv: any = null
let kvInitialized = false

// Initialiser Vercel KV uniquement si les variables d'environnement sont présentes
async function initKV() {
  if (kvInitialized) return kv
  
  kvInitialized = true
  
  // En production sur Vercel, utiliser KV si configuré
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      // Import dynamique pour éviter les erreurs si @vercel/kv n'est pas installé
      const kvModule = await import('@vercel/kv').catch(() => null)
      if (kvModule && kvModule.kv) {
        kv = kvModule.kv
        return kv
      }
    } catch (error) {
      console.warn('Vercel KV non disponible, utilisation des fichiers JSON:', error)
    }
  }
  
  kv = false
  return null
}

// Fonction générique pour lire depuis KV ou fichiers
export async function getKV(key: string): Promise<any> {
  const kvInstance = await initKV()
  if (kvInstance) {
    try {
      const data = await kvInstance.get(key)
      return data || null
    } catch (error) {
      console.error(`Erreur lecture KV pour ${key}:`, error)
      return null
    }
  }
  return null
}

// Fonction générique pour écrire dans KV
export async function setKV(key: string, value: any): Promise<boolean> {
  const kvInstance = await initKV()
  if (kvInstance) {
    try {
      await kvInstance.set(key, value)
      return true
    } catch (error) {
      console.error(`Erreur écriture KV pour ${key}:`, error)
      return false
    }
  }
  return false
}

// Vérifier si on utilise KV ou fichiers
export async function isUsingKV(): Promise<boolean> {
  const kvInstance = await initKV()
  return kvInstance !== null && kvInstance !== false
}

