import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/data'

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des événements' },
      { status: 500 }
    )
  }
}

