import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { put } from '@vercel/blob'
import { verifyAdminAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    if (!verifyAdminAuth(request)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('image') as File
    const folder = (formData.get('folder') as string) || 'boutique'
    const allowedFolders = ['boutique', 'formations']
    const uploadFolder = allowedFolders.includes(folder) ? folder : 'boutique'

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Le fichier doit être une image' }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Le fichier est trop volumineux (max 5MB)' }, { status: 400 })
    }

    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${originalName}`
    const pathname = `${uploadFolder}/${filename}`

    // En production (Vercel) sans Blob configuré : indiquer qu'il faut configurer le store
    if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          error: 'Stockage Blob non configuré. Dans le projet Vercel : Storage → Create Blob store (Public), puis redéployez.',
          code: 'UPLOAD_NOT_AVAILABLE_PRODUCTION',
        },
        { status: 503 }
      )
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN
    if (blobToken) {
      const arrayBuffer = await file.arrayBuffer()
      const blob = await put(pathname, arrayBuffer, {
        access: 'public',
        addRandomSuffix: true,
        contentType: file.type || 'image/jpeg',
        token: blobToken,
      })
      return NextResponse.json({
        success: true,
        imagePath: blob.url,
        message: 'Image uploadée avec succès',
      })
    }

    // En local : enregistrer dans public/images/...
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadDir = join(process.cwd(), 'public', 'images', uploadFolder)
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch {
      // dossier déjà existant
    }
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)
    const imagePath = `/images/${uploadFolder}/${filename}`

    return NextResponse.json({
      success: true,
      imagePath,
      message: 'Image uploadée avec succès',
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    const message = error instanceof Error ? error.message : 'Erreur inconnue'
    return NextResponse.json(
      { error: `Erreur lors de l'upload : ${message}` },
      { status: 500 }
    )
  }
}
