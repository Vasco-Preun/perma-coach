import { NextResponse } from 'next/server'
import { getKV } from '@/lib/kv'
import { getEvents } from '@/lib/data'

const DEFAULT_MAX_PLACES = 20

function normalizeEventId(eventId: unknown): string {
  return String(eventId).trim()
}

function isTestOrder(order: any): boolean {
  const name = String(order?.name || order?.stripeMetadata?.customer_name || '').toLowerCase()
  const email = String(order?.email || order?.stripeMetadata?.customer_email || '').toLowerCase()
  return email.includes('v.preun@gmail.com') || name.includes('preun')
}

function isReservedFormationOrder(order: any): boolean {
  return (
    order?.type === 'formation' &&
    order?.eventId &&
    order?.status === 'paid' &&
    !isTestOrder(order)
  )
}

async function getOrders(): Promise<any[]> {
  const orders = await getKV('orders')
  return orders || []
}

export async function GET() {
  try {
    const [orders, events] = await Promise.all([
      getOrders(),
      getEvents()
    ])
    
    // Créer un map des maxPlaces par formation
    const maxPlacesByFormation: Record<string, number> = {}
    events.forEach((event) => {
      if (event.type === 'formation') {
        maxPlacesByFormation[normalizeEventId(event.id)] = event.maxPlaces || DEFAULT_MAX_PLACES
      }
    })
    
    // Compter uniquement les inscriptions payées (confirmées) par formation
    const placesByFormation: Record<string, number> = {}
    
    orders.forEach((order: any) => {
      if (isReservedFormationOrder(order)) {
        const eventId = normalizeEventId(order.eventId)
        placesByFormation[eventId] = (placesByFormation[eventId] || 0) + 1
      }
    })
    
    // Calculer les places disponibles en utilisant le maxPlaces de chaque formation
    const availability: Record<string, { reserved: number; available: number; isFull: boolean; maxPlaces: number }> = {}
    
    Object.keys(placesByFormation).forEach(eventId => {
      const reserved = placesByFormation[eventId]
      const maxPlaces = maxPlacesByFormation[eventId] || DEFAULT_MAX_PLACES
      const available = Math.max(0, maxPlaces - reserved)
      availability[eventId] = {
        reserved,
        available,
        isFull: reserved >= maxPlaces,
        maxPlaces
      }
    })
    
    // Ajouter aussi les formations sans réservations
    events.forEach((event) => {
      if (event.type === 'formation') {
        const eventId = normalizeEventId(event.id)
        if (!availability[eventId]) {
          const maxPlaces = event.maxPlaces || DEFAULT_MAX_PLACES
          availability[eventId] = {
            reserved: 0,
            available: maxPlaces,
            isFull: false,
            maxPlaces
          }
        }
      }
    })
    
    return NextResponse.json(availability)
  } catch (error) {
    console.error('Error getting places:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des places' },
      { status: 500 }
    )
  }
}

