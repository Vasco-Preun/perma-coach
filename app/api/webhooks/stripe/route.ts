import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getKV, setKV } from '@/lib/kv'

const stripeBoutique = process.env.STRIPE_SECRET_KEY_BOUTIQUE
  ? new Stripe(process.env.STRIPE_SECRET_KEY_BOUTIQUE, {
      apiVersion: '2023-10-16',
    })
  : null

const stripeFormations = process.env.STRIPE_SECRET_KEY_FORMATIONS
  ? new Stripe(process.env.STRIPE_SECRET_KEY_FORMATIONS, {
      apiVersion: '2023-10-16',
    })
  : null

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature manquante' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  // Essayer de vérifier avec le compte boutique
  if (stripeBoutique) {
    try {
      event = stripeBoutique.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET_BOUTIQUE || ''
      )
      await handleWebhookEvent(event, 'boutique', stripeBoutique)
      return NextResponse.json({ received: true })
    } catch (err) {
      // Si ça échoue, essayer avec le compte formations
      if (stripeFormations) {
        try {
          event = stripeFormations.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET_FORMATIONS || ''
          )
          await handleWebhookEvent(event, 'formation', stripeFormations)
          return NextResponse.json({ received: true })
        } catch (err2) {
          console.error('Erreur de vérification webhook:', err2)
          return NextResponse.json(
            { error: 'Erreur de vérification' },
            { status: 400 }
          )
        }
      }
    }
  } else if (stripeFormations) {
    // Si seulement le compte formations est configuré
    try {
      event = stripeFormations.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET_FORMATIONS || ''
      )
      await handleWebhookEvent(event, 'formation', stripeFormations)
      return NextResponse.json({ received: true })
    } catch (err) {
      console.error('Erreur de vérification webhook:', err)
      return NextResponse.json(
        { error: 'Erreur de vérification' },
        { status: 400 }
      )
    }
  }

  return NextResponse.json(
    { error: 'Aucun compte Stripe configuré' },
    { status: 400 }
  )
}

async function handleWebhookEvent(
  event: Stripe.Event,
  accountType: 'boutique' | 'formation',
  stripe: Stripe
) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    if (session.payment_status === 'paid') {
      const orderId = session.client_reference_id || session.metadata?.orderId
      
      if (orderId) {
        // Mettre à jour le statut de la commande
        const orders = await getKV('orders') || []
        const orderIndex = orders.findIndex((o: any) => o.id === orderId)
        
        if (orderIndex !== -1) {
          orders[orderIndex] = {
            ...orders[orderIndex],
            status: 'paid',
            paymentDate: new Date().toISOString(),
            stripeSessionId: session.id,
            stripePaymentIntentId: typeof session.payment_intent === 'string' 
              ? session.payment_intent 
              : session.payment_intent?.id,
          }
          
          await setKV('orders', orders)
          console.log(`Commande ${orderId} marquée comme payée (${accountType})`)
          
          // TODO: Envoyer un email de confirmation
        }
      }
    }
  }

  // Gérer d'autres événements si nécessaire
  if (event.type === 'payment_intent.succeeded') {
    // Log supplémentaire pour le suivi
    console.log(`Paiement réussi pour ${accountType}`)
  }
}
