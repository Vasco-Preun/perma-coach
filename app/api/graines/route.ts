import { NextRequest, NextResponse } from 'next/server'
import { getGraines, saveGraines } from '@/lib/data'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET() {
  try {
    const graines = await getGraines()
    return NextResponse.json(graines)
  } catch (error) {
    console.error('Error getting graines:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des graines' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Vérification de l'authentification
  if (!verifyAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    )
  }

  try {
    const graines = await request.json()
    await saveGraines(graines)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving graines:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la sauvegarde des graines'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

