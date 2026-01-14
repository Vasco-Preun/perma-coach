import { NextResponse } from 'next/server'
import { getEvents, saveEvents } from '@/lib/data'

export async function GET() {
  return await initEvents()
}

export async function POST() {
  return await initEvents()
}

async function initEvents() {
  try {
    // Force l'initialisation des événements si nécessaire
    const events = await getEvents()
    
    // Si aucun événement, réinitialiser avec les valeurs par défaut
    if (!events || events.length === 0) {
      const defaultEvents = [
        { id: '1', type: 'formation' as const, title: 'Formation plantation arbre fruitier', startDate: '2026-02-13', endDate: '2026-02-14' },
        { id: '2', type: 'chantier' as const, title: 'Chantier plantation arbre fruitier', startDate: '2026-02-21', endDate: '2026-02-22' },
        { id: '3', type: 'chantier' as const, title: 'Chantier plantation arbre fruitier', startDate: '2026-03-08' },
        { id: '4', type: 'formation' as const, title: 'Formation initiation permaculture – créer son potager', startDate: '2026-03-18', endDate: '2026-03-22' },
        { id: '5', type: 'formation' as const, title: 'Formation initiation permaculture – approfondie', startDate: '2026-04-16', endDate: '2026-04-19' },
        { id: '6', type: 'formation' as const, title: 'Formation initiation permaculture', startDate: '2026-05-01', endDate: '2026-05-02' },
        { id: '7', type: 'formation' as const, title: 'Formation initiation permaculture – approfondie', startDate: '2026-05-12', endDate: '2026-05-15' },
        { id: '8', type: 'formation' as const, title: 'Formation initiation permaculture', startDate: '2026-06-06', endDate: '2026-06-07' },
      ]
      await saveEvents(defaultEvents)
      return NextResponse.json({ 
        success: true, 
        message: 'Événements initialisés avec succès',
        events: defaultEvents 
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Événements déjà initialisés',
      events 
    })
  } catch (error: any) {
    console.error('Erreur lors de l\'initialisation des événements:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'initialisation des événements', details: error.message },
      { status: 500 }
    )
  }
}
