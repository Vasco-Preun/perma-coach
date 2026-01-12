import { NextRequest, NextResponse } from 'next/server'
import { getKV, setKV } from '@/lib/kv'

export async function POST(request: NextRequest) {
  try {
    const order = await request.json()
    
    // Récupérer les commandes existantes
    const orders = await getKV('orders') || []
    
    // Ajouter la nouvelle commande
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
    }
    
    orders.push(newOrder)
    
    // Sauvegarder
    await setKV('orders', orders)
    
    // Note: L'email sera envoyé uniquement après confirmation du paiement via le webhook Stripe
    // Cela garantit que Sébastien ne reçoit que les commandes payées
    
    return NextResponse.json({ success: true, orderId: newOrder.id })
  } catch (error) {
    console.error('Error saving order:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement de la commande' },
      { status: 500 }
    )
  }
}


