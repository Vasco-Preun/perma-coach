import { NextRequest, NextResponse } from 'next/server'
import { getPlants, savePlants } from '@/lib/data'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET() {
  try {
    const plants = await getPlants()
    return NextResponse.json(plants)
  } catch (error) {
    console.error('Error getting plants:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des plants' },
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
    const plants = await request.json()
    await savePlants(plants)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving plants:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la sauvegarde des plants'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

