import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, items, type, eventId, eventTitle } = await request.json()

    // Déterminer quel compte Stripe utiliser selon le type de paiement
    const isFormation = type === 'formation'
    const stripeSecretKey = isFormation
      ? process.env.STRIPE_SECRET_KEY_FORMATIONS
      : process.env.STRIPE_SECRET_KEY_BOUTIQUE

    if (!stripeSecretKey) {
      const missingKey = isFormation ? 'STRIPE_SECRET_KEY_FORMATIONS' : 'STRIPE_SECRET_KEY_BOUTIQUE'
      console.error(`Clé Stripe manquante: ${missingKey}`)
      console.error('Variables d\'environnement disponibles:', {
        hasBoutique: !!process.env.STRIPE_SECRET_KEY_BOUTIQUE,
        hasFormations: !!process.env.STRIPE_SECRET_KEY_FORMATIONS,
        type: type,
        isFormation: isFormation
      })
      return NextResponse.json(
        { 
          error: `Configuration Stripe manquante pour ${isFormation ? 'les formations' : 'la boutique'}`,
          message: `La clé Stripe ${missingKey} n'est pas configurée. Vérifiez votre fichier .env.local`
        },
        { status: 500 }
      )
    }

    // Initialiser Stripe avec la bonne clé
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    // Préparer les items pour Stripe selon le type
    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    if (isFormation) {
      // Pour les formations : un seul item
      lineItems = [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: eventTitle || 'Formation',
              description: `Inscription à la formation${eventId ? ` (ID: ${eventId})` : ''}`,
            },
            unit_amount: Math.round(amount * 100), // Convertir en centimes
          },
          quantity: 1,
        },
      ]
    } else {
      // Pour la boutique : plusieurs items (plans, graines, légumes)
      lineItems = (items || []).map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.type === 'legume' || item.type === 'graine' || item.type === 'plan'
              ? `${item.type === 'legume' ? 'Légume' : item.type === 'graine' ? 'Graine' : 'Plan'}${item.category ? ` - ${item.category}` : ''}${item.unit ? ` (${item.unit})` : ''}`
              : undefined,
          },
          unit_amount: Math.round((item.price || 0) * 100), // Convertir en centimes
        },
        quantity: item.quantity || 1,
      }))
    }

    // Créer la session Stripe Checkout
    // Déterminer l'URL de base : utiliser NEXT_PUBLIC_BASE_URL ou détecter automatiquement
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    
    if (!baseUrl) {
      // Détecter l'environnement
      const isDevelopment = process.env.NODE_ENV === 'development'
      
      if (isDevelopment) {
        // En développement local, utiliser localhost:3001
        baseUrl = 'http://localhost:3001'
      } else {
        // En production, essayer de détecter depuis les headers
        const origin = request.headers.get('origin')
        const host = request.headers.get('host')
        
        if (origin) {
          baseUrl = origin
        } else if (host) {
          // Si pas d'origin, construire depuis le host
          const protocol = request.headers.get('x-forwarded-proto') || 'https'
          baseUrl = `${protocol}://${host}`
        } else {
          // Fallback vers l'URL de production
          baseUrl = 'https://perma-coach.vercel.app'
        }
      }
    }
    
    const successUrl = `${baseUrl}/paiement/succes?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}&type=${isFormation ? 'formation' : 'boutique'}`
    const cancelUrl = `${baseUrl}/paiement/annule`
    
    console.log('Creating Stripe session with URLs:', { successUrl, cancelUrl, baseUrl, env: process.env.NODE_ENV })
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: orderId,
      metadata: {
        orderId: orderId,
        type: isFormation ? 'formation' : 'boutique',
        ...(isFormation && eventId ? { eventId } : {}),
      },
    })
    
    console.log('Stripe session created:', session.id, 'URL:', session.url)

    return NextResponse.json({ 
      success: true,
      paymentUrl: session.url,
      sessionId: session.id,
    })
  } catch (error: any) {
    console.error('Error creating Stripe payment:', error)
    console.error('Error details:', {
      message: error?.message,
      type: error?.type,
      code: error?.code,
      stack: error?.stack
    })
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création du paiement',
        message: error?.message || 'Paiement à finaliser par virement bancaire ou à la livraison',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
