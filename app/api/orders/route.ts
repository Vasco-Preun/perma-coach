import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const order = await request.json()
    
    // Sauvegarder la commande dans un fichier JSON
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const ordersFile = path.join(dataDir, 'orders.json')
    const orders = fs.existsSync(ordersFile) 
      ? JSON.parse(fs.readFileSync(ordersFile, 'utf-8'))
      : []
    
    orders.push({
      ...order,
      id: Date.now().toString(),
      status: 'pending',
    })
    
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
    
    // TODO: Envoyer un email de notification
    // TODO: Intégrer avec un système de paiement (Stripe, PayPal, etc.)
    
    return NextResponse.json({ success: true, orderId: orders[orders.length - 1].id })
  } catch (error) {
    console.error('Error saving order:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement de la commande' },
      { status: 500 }
    )
  }
}


