import { NextResponse } from 'next/server'
import { getKV } from '@/lib/kv'

const MAX_PLACES = 20

async function getOrders(): Promise<any[]> {
  const orders = await getKV('orders')
  return orders || []
}

export async function GET() {
  try {
    const orders = await getOrders()
    
    // Compter les inscriptions par formation (eventId)
    const placesByFormation: Record<string, number> = {}
    
    orders.forEach((order: any) => {
      if (order.type === 'formation' && order.eventId) {
        if (!placesByFormation[order.eventId]) {
          placesByFormation[order.eventId] = 0
        }
        placesByFormation[order.eventId]++
      }
    })
    
    // Calculer les places disponibles
    const availability: Record<string, { reserved: number; available: number; isFull: boolean }> = {}
    
    Object.keys(placesByFormation).forEach(eventId => {
      const reserved = placesByFormation[eventId]
      const available = Math.max(0, MAX_PLACES - reserved)
      availability[eventId] = {
        reserved,
        available,
        isFull: reserved >= MAX_PLACES
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

