import { NextRequest, NextResponse } from 'next/server'
import { getPlans, savePlans } from '@/lib/data'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET() {
  try {
    const plans = await getPlans()
    return NextResponse.json(plans)
  } catch (error) {
    console.error('Error getting plans:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des plans' },
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
    const plans = await request.json()
    await savePlans(plans)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving plans:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la sauvegarde des plans'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

