'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ScrollReveal'
import GlassCard from '@/components/GlassCard'
import type { Product } from '@/lib/data'

interface CartItem extends Product {
  quantity: number
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    const savedCart = localStorage.getItem('panier_boutique')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing cart:', error)
      }
    }
  }, [])

  const MINIMUM_ORDER = 15
  const DISCOUNT_THRESHOLD = 25
  const DISCOUNT_PERCENTAGE = 15
  const DELIVERY_LOCATION = 'Reims'
  const FARM_ADDRESS = 'La Chapelle Lasson, 20 rue Saint Fiacre'
  const GRAINE_DELIVERY_COST = 2.90

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.price || 0
      return total + (price * item.quantity)
    }, 0)
  }

  const getGraineDeliveryCost = () => {
    const grainesInCart = cart.filter(item => item.type === 'graine')
    return grainesInCart.reduce((total, item) => {
      return total + (GRAINE_DELIVERY_COST * item.quantity)
    }, 0)
  }

  const getDiscount = () => {
    const subtotal = getSubtotal()
    if (subtotal > DISCOUNT_THRESHOLD) {
      return subtotal * (DISCOUNT_PERCENTAGE / 100)
    }
    return 0
  }

  const getTotal = () => {
    const subtotal = getSubtotal()
    const discount = getDiscount()
    const graineDelivery = getGraineDeliveryCost()
    return subtotal - discount + graineDelivery
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const order = {
        ...formData,
        items: cart,
        subtotal: getSubtotal(),
        discount: getDiscount(),
        total: getTotal(),
        date: new Date().toISOString(),
      }

      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })

      if (!orderResponse.ok) {
        throw new Error('Erreur lors de l\'enregistrement de la commande')
      }

      const orderData = await orderResponse.json()

      // Initier le paiement
      const paymentResponse = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.orderId,
          amount: getTotal(),
          subtotal: getSubtotal(),
          discount: getDiscount(),
          items: cart,
        }),
      })

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json()
        if (paymentData.paymentUrl) {
          window.location.href = paymentData.paymentUrl
        } else {
          setMessage({ 
            type: 'success', 
            text: 'Commande enregistrée ! Nous vous contacterons bientôt pour finaliser le paiement et convenir d\'un rendez-vous de récupération.' 
          })
          localStorage.removeItem('panier_boutique')
          setCart([])
        }
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Commande enregistrée ! Nous vous contacterons bientôt pour finaliser le paiement et convenir d\'un rendez-vous de récupération.' 
        })
        localStorage.removeItem('panier_boutique')
        setCart([])
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'enregistrement de la commande' })
    } finally {
      setSubmitting(false)
    }
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <Section padding="xl" background="white">
            <div className="container-custom max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">
                Votre panier est vide
              </h1>
              <p className="text-lg text-[#1a1a1a]/70 mb-8">
                Ajoutez des légumes à votre panier pour passer une commande.
              </p>
              <Button
                as="a"
                href="/boutique"
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white shadow-2xl"
              >
                Voir les légumes disponibles
              </Button>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <Section padding="xl" background="off-white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.03),transparent_50%)]" />
          <div className="container-custom max-w-7xl relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-4">
                  Finaliser votre commande
                </h1>
                <p className="text-lg text-[#1a1a1a]/70">
                  Remplissez vos informations pour récupérer vos légumes
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Formulaire - 2 colonnes */}
              <div className="lg:col-span-2">
                <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 shadow-xl">
                  <div className="mb-8">
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-4">
                      Informations de récupération
                    </h2>
                    <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-2xl space-y-2">
                      {cart.some(item => item.type === 'legume' || item.type === 'plan') && (
                        <p className="text-sm text-green-800 font-medium flex items-start gap-2">
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Légumes et plans : Livraison sur {DELIVERY_LOCATION} à partir de {MINIMUM_ORDER}€ ou récupération à la ferme ({FARM_ADDRESS}) - toute quantité.</span>
                        </p>
                      )}
                      {cart.some(item => item.type === 'graine') && (
                        <p className="text-sm text-blue-800 font-medium flex items-start gap-2">
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>Graines : Livraison dans toute la France ({GRAINE_DELIVERY_COST}€ par paquet).</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {message && (
                    <div className={`mb-6 p-4 rounded-2xl ${
                      message.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {message.text}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] text-base"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] text-base"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] text-base"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pickupDate" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                        Date de récupération souhaitée *
                      </label>
                      <input
                        type="date"
                        id="pickupDate"
                        required
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] text-base"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                        Notes
                        <span className="text-[#1a1a1a]/50 font-normal ml-1">(optionnel)</span>
                      </label>
                      <textarea
                        id="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] resize-none text-base"
                        placeholder="Informations complémentaires..."
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={submitting}
                        size="lg"
                        className="w-full bg-green-700 hover:bg-green-800 text-white shadow-2xl text-lg py-4"
                      >
                        {submitting ? 'Enregistrement...' : 'Confirmer la commande'}
                      </Button>
                    </div>
                  </form>
                </GlassCard>
              </div>

              {/* Récapitulatif - 1 colonne */}
              <div className="lg:col-span-1">
                <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/30 border-green-200/50 shadow-xl sticky top-24">
                  <h2 className="text-2xl font-serif text-[#1a1a1a] mb-6 pb-4 border-b-2 border-green-300/50">
                    Récapitulatif
                  </h2>
                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-4 pb-4 border-b border-green-200/30 last:border-0">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#1a1a1a] mb-1">{item.name}</p>
                          <p className="text-sm text-[#1a1a1a]/60">
                            {item.quantity} × {item.price?.toFixed(2) || '0.00'} €
                          </p>
                        </div>
                        <p className="font-bold text-green-700 text-lg whitespace-nowrap">
                          {((item.price || 0) * item.quantity).toFixed(2)} €
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t-2 border-green-300/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base text-[#1a1a1a]/70">Sous-total</span>
                      <span className="text-lg font-semibold text-[#1a1a1a]">
                        {getSubtotal().toFixed(2)} €
                      </span>
                    </div>
                    {getDiscount() > 0 && (
                      <div className="flex justify-between items-center bg-green-50 rounded-xl p-3">
                        <span className="text-base font-semibold text-green-700">
                          Remise -{DISCOUNT_PERCENTAGE}%
                        </span>
                        <span className="text-lg font-bold text-green-700">
                          -{getDiscount().toFixed(2)} €
                        </span>
                      </div>
                    )}
                    {getGraineDeliveryCost() > 0 && (
                      <div className="flex justify-between items-center bg-blue-50 rounded-xl p-3">
                        <span className="text-base font-semibold text-blue-700">
                          Livraison graines
                        </span>
                        <span className="text-lg font-bold text-blue-700">
                          +{getGraineDeliveryCost().toFixed(2)} €
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-green-200/50">
                      <span className="text-xl font-bold text-[#1a1a1a]">Total</span>
                      <span className="text-3xl font-bold text-green-700">
                        {getTotal().toFixed(2)} €
                      </span>
                    </div>
                    <div className="pt-3 space-y-2">
                      {cart.some(item => item.type === 'legume' || item.type === 'plan') && (
                        <div className="flex items-start gap-2 text-xs text-[#1a1a1a]/60">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Légumes/Plans : Livraison {DELIVERY_LOCATION} ou récupération à la ferme ({FARM_ADDRESS})</span>
                        </div>
                      )}
                      {cart.some(item => item.type === 'graine') && (
                        <div className="flex items-start gap-2 text-xs text-[#1a1a1a]/60">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>Graines : Livraison France ({GRAINE_DELIVERY_COST}€/paquet)</span>
                        </div>
                      )}
                      <p className="text-xs text-[#1a1a1a]/60 leading-relaxed">
                        Le paiement sera finalisé lors de la récupération ou par virement bancaire.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
