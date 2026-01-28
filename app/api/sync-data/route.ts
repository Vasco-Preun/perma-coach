import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { setKV } from '@/lib/kv'

// Route pour synchroniser les données des fichiers JSON (dans le repo) vers Vercel KV
// Cette route lit les fichiers JSON locaux et les copie dans KV
export async function POST() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const synced: string[] = []
    const errors: string[] = []

    // Liste des fichiers à synchroniser
    const filesToSync = ['events', 'legumes', 'graines', 'plants', 'settings', 'gallery']

    for (const key of filesToSync) {
      try {
        const filePath = path.join(dataDir, `${key}.json`)
        
        // Vérifier si le fichier existe
        if (!fs.existsSync(filePath)) {
          console.log(`Fichier ${key}.json n'existe pas, ignoré`)
          continue
        }

        // Lire le fichier JSON
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const data = JSON.parse(fileContent)

        // Copier vers Vercel KV (fonctionne aussi en local)
        await setKV(key, data)
        
        synced.push(key)
        console.log(`✅ ${key} synchronisé (${Array.isArray(data) ? data.length : 'object'} éléments)`)
      } catch (error: any) {
        const errorMsg = `Erreur pour ${key}: ${error.message}`
        console.error(errorMsg)
        errors.push(errorMsg)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synchronisation terminée`,
      synced,
      errors: errors.length > 0 ? errors : undefined,
      count: synced.length
    })
  } catch (error: any) {
    console.error('Erreur lors de la synchronisation:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la synchronisation',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// Permettre aussi en GET pour faciliter l'utilisation
export async function GET() {
  return await POST()
}
