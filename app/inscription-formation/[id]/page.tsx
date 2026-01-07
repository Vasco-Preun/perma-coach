'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/GlassCard'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ScrollReveal'
import type { Event } from '@/lib/data'

const MAX_PLACES = 20

export default function InscriptionFormationPage() {
  const params = useParams()
  const eventId = params.id as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [availability, setAvailability] = useState<{ reserved: number; available: number; isFull: boolean } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const [eventsResponse, placesResponse] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/formations/places')
        ])
        
        if (!eventsResponse.ok) throw new Error('Erreur de chargement')
        const events = await eventsResponse.json()
        const foundEvent = events.find((e: Event) => e.id === eventId && e.type === 'formation')
        if (foundEvent) {
          setEvent(foundEvent)
        }
        
        if (placesResponse.ok) {
          const places = await placesResponse.json()
          if (places[eventId]) {
            setAvailability(places[eventId])
          }
        }
      } catch (error) {
        console.error('Error loading event:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [eventId])

  const getDuration = (start: string, end?: string): number => {
    if (!end) return 1
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  const getFormationPrice = (start: string, end?: string): number | null => {
    const duration = getDuration(start, end)
    if (duration === 2) return 200
    if (duration === 4) return 500
    return null
  }

  const formatDateRange = (start: string, end?: string) => {
    if (!end) {
      const date = new Date(start)
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    }
    const startDate = new Date(start)
    const endDate = new Date(end)
    
    if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
      return `${startDate.getDate()} - ${endDate.getDate()} ${endDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`
    }
    
    return `${startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} - ${endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`
  }

  const price = event ? getFormationPrice(event.startDate, event.endDate) : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Vérifier les places disponibles
    if (availability?.isFull) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Créer une commande pour la formation
      const order = {
        ...formData,
        type: 'formation',
        eventId: eventId,
        eventTitle: event?.title,
        eventDate: formatDateRange(event!.startDate, event!.endDate),
        amount: price,
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
          amount: price,
          type: 'formation',
          eventId: eventId,
        }),
      })

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json()
        if (paymentData.paymentUrl) {
          window.location.href = paymentData.paymentUrl
        } else {
          setSubmitStatus('success')
          setFormData({ name: '', email: '', phone: '', notes: '' })
        }
      } else {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', notes: '' })
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <Section padding="xl" background="white">
            <div className="container-custom text-center">
              <p className="text-lg text-[#1a1a1a]/70">Chargement...</p>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    )
  }

  if (!event || !price) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <Section padding="xl" background="white">
            <div className="container-custom text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-serif text-[#1a1a1a] mb-4">Formation introuvable</h1>
              <p className="text-lg text-[#1a1a1a]/70 mb-8">
                La formation demandée n'existe pas ou n'est plus disponible.
              </p>
              <Button as="a" href="/pebi-formations" size="lg">
                Retour au planning
              </Button>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    )
  }

  if (availability?.isFull) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <Section padding="xl" background="white" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-white to-red-50/20" />
            <div className="container-custom max-w-3xl relative z-10">
              <ScrollReveal direction="up">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-3 bg-yellow-100 rounded-full mb-6">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">
                    Victime de son succès !
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-2">
                    {event.title}
                  </h2>
                  <p className="text-lg text-[#1a1a1a]/70 mb-6">
                    {formatDateRange(event.startDate, event.endDate)}
                  </p>
                </div>

                <GlassCard className="bg-white/95 backdrop-blur-sm border-yellow-200/50 shadow-xl">
                  <div className="text-center space-y-6">
                    <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                      <p className="text-lg font-semibold text-yellow-800 mb-2">
                        Cette formation est complète
                      </p>
                      <p className="text-base text-yellow-700">
                        Les {MAX_PLACES} places ont été réservées. Contactez-nous pour être ajouté à la liste d'attente.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <Button
                        as="a"
                        href="/contact"
                        size="lg"
                        className="w-full bg-green-700 hover:bg-green-800 text-white"
                      >
                        Nous contacter pour la liste d'attente
                      </Button>
                      <Button
                        as="a"
                        href="/pebi-formations"
                        variant="outline"
                        size="lg"
                        className="w-full border-earth-300 text-[#1a1a1a] hover:bg-earth-50"
                      >
                        Retour au planning
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
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
        <Section padding="xl" background="white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">
                  Inscription à la formation
                </h1>
                <div className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4">
                  <span className="text-sm font-semibold text-green-800">Formation</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-2">
                  {event.title}
                </h2>
                <p className="text-lg text-[#1a1a1a]/70 mb-4">
                  {formatDateRange(event.startDate, event.endDate)}
                </p>
                <div className="inline-block px-6 py-3 bg-green-50 rounded-2xl border border-green-200 mb-4">
                  <p className="text-3xl font-bold text-green-700">
                    {price} €
                  </p>
                </div>
                {availability && (
                  <div className="inline-block px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm font-semibold text-blue-800">
                      {availability.available} place{availability.available > 1 ? 's' : ''} disponible{availability.available > 1 ? 's' : ''} sur {MAX_PLACES}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 shadow-xl">
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-6">
                      Informations de contact
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                          className="w-full px-4 py-3 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
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
                          className="w-full px-4 py-3 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                        />
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
                          className="w-full px-4 py-3 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                        />
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                          Notes (optionnel)
                        </label>
                        <textarea
                          id="notes"
                          rows={4}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] resize-none"
                          placeholder="Informations complémentaires..."
                        />
                      </div>

                      {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200">
                          Votre inscription a été enregistrée ! Nous vous contacterons bientôt pour finaliser le paiement et confirmer votre inscription.
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200">
                          {availability?.isFull 
                            ? 'Cette formation est complète. Impossible de procéder à l\'inscription.' 
                            : 'Une erreur est survenue. Veuillez réessayer.'}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full bg-green-700 hover:bg-green-800 text-white"
                      >
                        {isSubmitting ? 'Traitement en cours...' : `Payer ${price} € et s'inscrire`}
                      </Button>
                    </form>
                  </GlassCard>
                </div>

                <div className="lg:col-span-1">
                  <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/30 border-green-200/50 shadow-xl sticky top-24">
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-6 pb-4 border-b-2 border-green-300/50">
                      Récapitulatif
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-[#1a1a1a]/60 mb-1">Formation</p>
                        <p className="font-semibold text-[#1a1a1a]">{event.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#1a1a1a]/60 mb-1">Date</p>
                        <p className="font-semibold text-[#1a1a1a]">
                          {formatDateRange(event.startDate, event.endDate)}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-green-200/50">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-[#1a1a1a]">Total</span>
                          <span className="text-3xl font-bold text-green-700">
                            {price} €
                          </span>
                        </div>
                      </div>
                      <div className="pt-3 space-y-2">
                        <p className="text-xs text-[#1a1a1a]/60 leading-relaxed">
                          Le paiement sera finalisé lors de la confirmation de votre inscription ou par virement bancaire.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

