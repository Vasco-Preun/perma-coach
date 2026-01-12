import { NextRequest, NextResponse } from 'next/server'
import { getKV, setKV } from '@/lib/kv'
import { sendOrderEmail } from '@/lib/email'

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
    
    // Envoyer un email de notification
    try {
      await sendOrderEmail(newOrder)
      console.log('Email de commande envoyé avec succès')
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError)
      // Ne pas faire échouer la commande si l'email échoue
      // La commande est déjà sauvegardée
    }
    
    return NextResponse.json({ success: true, orderId: newOrder.id })
  } catch (error) {
    console.error('Error saving order:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement de la commande' },
      { status: 500 }
    )
  }
}


