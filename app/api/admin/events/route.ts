import { NextRequest, NextResponse } from 'next/server'
import { getEvents, saveEvents } from '@/lib/data'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET() {
  try {
    const events = getEvents()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des événements' },
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
    const events = await request.json()
    saveEvents(events)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    )
  }
}

