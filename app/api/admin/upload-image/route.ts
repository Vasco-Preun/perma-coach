import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { verifyAdminAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!verifyAdminAuth(request)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('image') as File
    const productType = formData.get('productType') as string || 'legumes'

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Le fichier doit être une image' }, { status: 400 })
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Le fichier est trop volumineux (max 5MB)' }, { status: 400 })
    }

    // Lire le fichier
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const extension = originalName.split('.').pop() || 'jpg'
    const filename = `${timestamp}-${originalName}`

    // Créer le dossier s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'images', 'boutique')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Le dossier existe peut-être déjà
    }

    // Sauvegarder le fichier
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // Retourner le chemin public
    const imagePath = `/images/boutique/${filename}`

    return NextResponse.json({ 
      success: true, 
      imagePath,
      message: 'Image uploadée avec succès'
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload de l\'image' },
      { status: 500 }
    )
  }
}
