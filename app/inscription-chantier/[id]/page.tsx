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

export default function InscriptionChantierPage() {
  const params = useParams()
  const eventId = params.id as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  })

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) throw new Error('Erreur de chargement')
        const events = await response.json()
        const foundEvent = events.find((e: Event) => e.id === eventId && e.type === 'chantier')
        if (foundEvent) {
          setEvent(foundEvent)
          setFormData(prev => ({
            ...prev,
            message: `Bonjour,\n\nJe souhaite m'inscrire au chantier : "${foundEvent.title}"\nDate : ${formatDateRange(foundEvent.startDate, foundEvent.endDate)}\n\n`
          }))
        }
      } catch (error) {
        console.error('Error loading event:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [eventId])

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

  if (!event) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <Section padding="xl" background="white">
            <div className="container-custom text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-serif text-[#1a1a1a] mb-4">Chantier introuvable</h1>
              <p className="text-lg text-[#1a1a1a]/70 mb-8">
                Le chantier demandé n'existe pas ou n'est plus disponible.
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

  return (
    <>
      <Header />
      <main className="pt-20">
        <Section padding="xl" background="white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-earth-50/30 via-white to-green-50/20" />
          <div className="container-custom max-w-3xl relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">
                  Inscription au chantier
                </h1>
                <div className="inline-block px-4 py-2 bg-earth-100 rounded-full mb-4">
                  <span className="text-sm font-semibold text-earth-800">Chantier participatif</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-2">
                  {event.title}
                </h2>
                <p className="text-lg text-[#1a1a1a]/70 mb-4">
                  {formatDateRange(event.startDate, event.endDate)}
                </p>
                {event.description && (
                  <p className="text-base text-[#1a1a1a]/70 mb-4 leading-relaxed">
                    {event.description}
                  </p>
                )}
              </div>

              <GlassCard className="bg-white/95 backdrop-blur-sm border-earth-200/50 shadow-xl">
                <form action="https://formsubmit.co/permacoach51@gmail.com" method="POST" className="space-y-6">
                  <input type="hidden" name="_subject" value={`Inscription au chantier : ${event.title}`} />
                  <input type="hidden" name="_url" value="https://www.lesjardinsduclos.com/contact" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="eventId" value={eventId} />
                  <input type="hidden" name="eventType" value="chantier" />
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 focus:border-earth-500 transition-all bg-white text-[#1a1a1a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 focus:border-earth-500 transition-all bg-white text-[#1a1a1a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 focus:border-earth-500 transition-all bg-white text-[#1a1a1a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 focus:border-earth-500 transition-all bg-white text-[#1a1a1a] resize-none"
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 mr-3 w-4 h-4 rounded border-earth-300 text-earth-700 focus:ring-earth-500"
                    />
                    <label htmlFor="consent" className="text-sm text-[#1a1a1a]/70">
                      J'accepte que mes données soient utilisées pour me recontacter *
                    </label>
                  </div>

                  <p className="text-sm text-[#1a1a1a]/70">
                    Vous allez être redirigé vers FormSubmit pour terminer l’envoi.
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-earth-700 hover:bg-earth-800 text-white"
                  >
                    Envoyer ma demande d’inscription
                  </Button>
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

