import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    const type = searchParams.get('type') || 'boutique' // 'boutique' ou 'formation'

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      )
    }

    // Déterminer quel compte Stripe utiliser
    const isFormation = type === 'formation'
    const stripeSecretKey = isFormation
      ? process.env.STRIPE_SECRET_KEY_FORMATIONS
      : process.env.STRIPE_SECRET_KEY_BOUTIQUE

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Configuration Stripe manquante' },
        { status: 500 }
      )
    }

    // Initialiser Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    // Récupérer la session Stripe + line_items pour vérification détaillée
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency,
        customerEmail: session.customer_email,
        clientReferenceId: session.client_reference_id,
        metadata: session.metadata || {},
        lineItems: (session.line_items?.data || []).map((lineItem) => ({
          description: lineItem.description || '',
          quantity: lineItem.quantity || 0,
          amountTotal: typeof lineItem.amount_total === 'number' ? lineItem.amount_total / 100 : 0,
          productName:
            typeof lineItem.price === 'string'
              ? undefined
              : typeof lineItem.price?.product === 'string'
                ? undefined
                : lineItem.price?.product && 'name' in lineItem.price.product
                  ? lineItem.price.product.name
                  : undefined,
          productId:
            typeof lineItem.price === 'string'
              ? undefined
              : typeof lineItem.price?.product === 'string'
                ? lineItem.price.product
                : lineItem.price?.product?.id,
        })),
      },
    })
  } catch (error: any) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du paiement' },
      { status: 500 }
    )
  }
}
