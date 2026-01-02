import { NextRequest, NextResponse } from 'next/server'
import { getLegumes, saveLegumes } from '@/lib/data'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET() {
  try {
    const legumes = await getLegumes()
    return NextResponse.json(legumes)
  } catch (error) {
    console.error('Error getting legumes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des légumes' },
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
    const legumes = await request.json()
    await saveLegumes(legumes)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving legumes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde des légumes' },
      { status: 500 }
    )
  }
}

