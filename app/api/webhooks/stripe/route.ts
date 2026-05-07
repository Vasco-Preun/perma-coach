import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getKV, setKV } from '@/lib/kv'
import { sendOrderEmail } from '@/lib/email'

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
      const orderId = session.client_reference_id || session.metadata?.order_id || session.metadata?.orderId
      
      if (orderId) {
        // Récupérer la session complète + line_items pour tracer précisément ce qui a été acheté
        const sessionWithItems = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items.data.price.product'],
        })

        const lineItems = sessionWithItems.line_items?.data || []
        const purchasedItems = lineItems.map((line) => ({
          description: line.description || '',
          quantity: line.quantity || 0,
          amount_total: typeof line.amount_total === 'number' ? line.amount_total / 100 : 0,
          amount_subtotal: typeof line.amount_subtotal === 'number' ? line.amount_subtotal / 100 : 0,
          price_id: typeof line.price === 'string' ? line.price : line.price?.id,
          product_id:
            typeof line.price === 'string'
              ? undefined
              : typeof line.price?.product === 'string'
                ? line.price.product
                : line.price?.product?.id,
          product_name:
            typeof line.price === 'string'
              ? undefined
              : typeof line.price?.product === 'string'
                ? undefined
                : line.price?.product && 'name' in line.price.product
                  ? line.price.product.name
                  : undefined,
        }))

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
            stripeAccountType: accountType,
            stripeMetadata: sessionWithItems.metadata || {},
            stripeLineItems: purchasedItems,
            purchasedProductName:
              sessionWithItems.metadata?.product_name ||
              purchasedItems.map((i) => i.product_name || i.description).filter(Boolean).join(', '),
            purchasedFormationName: sessionWithItems.metadata?.formation_name || '',
            customerEmail:
              sessionWithItems.metadata?.customer_email ||
              sessionWithItems.customer_details?.email ||
              sessionWithItems.customer_email ||
              orders[orderIndex]?.email ||
              '',
            amountPaid:
              typeof sessionWithItems.amount_total === 'number'
                ? sessionWithItems.amount_total / 100
                : orders[orderIndex]?.total || 0,
          }
          
          await setKV('orders', orders)
          console.log(`Commande ${orderId} payée (${accountType})`, {
            product: orders[orderIndex].purchasedProductName,
            formation: orders[orderIndex].purchasedFormationName,
            email: orders[orderIndex].customerEmail,
            amount: orders[orderIndex].amountPaid,
            metadata: sessionWithItems.metadata || {},
            lineItems: purchasedItems,
          })
          
          // Envoyer un email uniquement après confirmation du paiement
          try {
            await sendOrderEmail(orders[orderIndex])
            console.log(`Email de commande envoyé pour ${orderId}`)
          } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'email:', emailError)
            // Ne pas faire échouer le webhook si l'email échoue
            // La commande est déjà marquée comme payée
          }
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
