'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/GlassCard'
import type { Event } from '@/lib/data'

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  // Ne pas vérifier automatiquement le localStorage pour forcer la demande du mot de passe
  // useEffect(() => {
  //   const savedAuth = localStorage.getItem('admin_authenticated')
  //   if (savedAuth === 'true') {
  //     setIsAuthenticated(true)
  //     loadEvents()
  //   }
  // }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_authenticated', 'true')
      loadEvents()
      setPassword('')
    } else {
      setMessage({ type: 'error', text: 'Mot de passe incorrect' })
    }
  }

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/admin/events')
      if (!response.ok) throw new Error('Erreur de chargement')
      const data = await response.json()
      setEvents(data)
      setMessage(null)
    } catch (error) {
      console.error('Error loading events:', error)
      setMessage({ type: 'error', text: 'Erreur lors du chargement des événements' })
    }
  }

  const saveEvents = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify(events),
      })
      if (response.ok) {
        setMessage({ type: 'success', text: 'Formations sauvegardées avec succès !' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setLoading(false)
    }
  }

  const addEvent = () => {
    setEvents([
      ...events,
      {
        id: Date.now().toString(),
        type: 'formation',
        title: '',
        startDate: new Date().toISOString().split('T')[0],
      },
    ])
  }

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id))
  }

  const updateEvent = (id: string, field: keyof Event, value: any) => {
    setEvents(events.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
          <Section padding="xl" background="off-white">
            <div className="container-custom max-w-md mx-auto">
              <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2">
                    Accès administration
                  </h1>
                  <p className="text-[#1a1a1a]/70">
                    Gestion des formations
                  </p>
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
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Code d'accès
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez le code"
                      className="w-full px-4 py-3.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] text-base"
                      required
                      autoFocus
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-700 hover:bg-green-800 text-white shadow-xl"
                  >
                    Se connecter
                  </Button>
                </form>
              </GlassCard>
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
      <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
        {/* Header Admin */}
        <Section padding="lg" background="off-white" className="border-b border-green-200/50">
          <div className="container-custom max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-2">
                  Administration - Formations
                </h1>
                <p className="text-[#1a1a1a]/70">
                  Gérez les formations et événements affichés sur le site
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  as="a"
                  href="/admin/boutique"
                  variant="outline"
                  size="lg"
                  className="border-green-700 text-green-700 hover:bg-green-50"
                >
                  Gérer la boutique
                </Button>
                <Button
                  onClick={saveEvents}
                  disabled={loading}
                  size="lg"
                  className="bg-green-700 hover:bg-green-800 text-white shadow-xl whitespace-nowrap"
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </div>
            </div>
            
            {message && (
              <div className={`mt-4 p-4 rounded-2xl ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
          </div>
        </Section>

        {/* Liste des formations */}
        <Section padding="xl" background="off-white">
          <div className="container-custom max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-serif text-[#1a1a1a]">
                Formations et événements
              </h2>
              <Button
                onClick={addEvent}
                variant="outline"
                size="md"
                className="border-green-700 text-green-700 hover:bg-green-50"
              >
                + Ajouter une formation
              </Button>
            </div>

            {events.length === 0 ? (
              <GlassCard className="bg-white/80 backdrop-blur-sm border-green-200/50 text-center py-12">
                <p className="text-[#1a1a1a]/70">Aucune formation enregistrée. Cliquez sur "Ajouter une formation" pour commencer.</p>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <GlassCard key={event.id} className="bg-white/80 backdrop-blur-sm border-green-200/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Type</label>
                        <select
                          value={event.type}
                          onChange={(e) => updateEvent(event.id, 'type', e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                        >
                          <option value="formation">Formation</option>
                          <option value="chantier">Chantier</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Titre</label>
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) => updateEvent(event.id, 'title', e.target.value)}
                          placeholder="Ex: Formation initiation permaculture"
                          className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Date début</label>
                        <input
                          type="date"
                          value={event.startDate}
                          onChange={(e) => updateEvent(event.id, 'startDate', e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Date fin (optionnel)</label>
                        <input
                          type="date"
                          value={event.endDate || ''}
                          onChange={(e) => updateEvent(event.id, 'endDate', e.target.value || undefined)}
                          className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                        />
                      </div>
                    </div>
                    {event.description && (
                      <div className="mt-4">
                        <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Description (optionnel)</label>
                        <textarea
                          value={event.description}
                          onChange={(e) => updateEvent(event.id, 'description', e.target.value)}
                          rows={2}
                          placeholder="Description de la formation..."
                          className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] resize-none"
                        />
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={() => removeEvent(event.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
