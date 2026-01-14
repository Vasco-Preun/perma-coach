import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/data'

export async function GET() {
  try {
    const events = await getEvents()
    
    // Vérifier que les événements ont bien été chargés
    if (!events || events.length === 0) {
      console.error('Aucun événement trouvé, cela ne devrait pas arriver car getEvents() initialise par défaut')
      return NextResponse.json(
        { error: 'Aucun événement disponible' },
        { status: 500 }
      )
    }
    
    console.log(`[API /events] Retourne ${events.length} événements`)
    const formations = events.filter((e: any) => e.type === 'formation')
    console.log(`[API /events] ${formations.length} formations trouvées:`, formations.map((e: any) => ({ id: e.id, title: e.title })))
    
    return NextResponse.json(events)
  } catch (error: any) {
    console.error('Erreur lors de la lecture des événements:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la lecture des événements',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

