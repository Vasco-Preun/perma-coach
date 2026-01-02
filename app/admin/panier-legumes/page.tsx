'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/GlassCard'
import type { Legume } from '@/lib/data'

export default function AdminPanierLegumesPage() {
  const [legumes, setLegumes] = useState<Legume[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  useEffect(() => {
    const savedAuth = localStorage.getItem('panier_admin_authenticated')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      loadLegumes()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('panier_admin_authenticated', 'true')
      loadLegumes()
      setPassword('')
    } else {
      setMessage({ type: 'error', text: 'Code incorrect' })
    }
  }

  const loadLegumes = async () => {
    try {
      const response = await fetch('/api/legumes')
      if (!response.ok) throw new Error('Erreur de chargement')
      const data = await response.json()
      setLegumes(data)
      setMessage(null)
    } catch (error) {
      console.error('Error loading legumes:', error)
      setMessage({ type: 'error', text: 'Erreur lors du chargement des légumes' })
    } finally {
      setLoading(false)
    }
  }

  const toggleLegume = (id: string) => {
    setLegumes(legumes.map(legume => 
      legume.id === id ? { ...legume, enabled: !legume.enabled } : legume
    ))
  }

  const saveLegumes = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
      const response = await fetch('/api/legumes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify(legumes),
      })
      if (response.ok) {
        setMessage({ type: 'success', text: 'Modifications enregistrées avec succès !' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  const enabledCount = legumes.filter(l => l.enabled).length
  const categories = Array.from(new Set(legumes.map(l => l.category || 'Autres'))).sort()

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
          <Section padding="xl" background="white">
            <div className="container-custom max-w-md mx-auto">
              <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2">
                    Accès éditeur
                  </h1>
                  <p className="text-[#1a1a1a]/70">
                    Gestion des légumes disponibles
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

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
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

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
        {/* Header Admin */}
        <Section padding="lg" background="white" className="border-b border-green-200/50">
          <div className="container-custom max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-2">
                  Gestion des légumes
                </h1>
                <p className="text-[#1a1a1a]/70">
                  Activez ou désactivez les légumes disponibles pour les clients
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-green-100 rounded-full">
                  <span className="text-sm font-semibold text-green-800">
                    {enabledCount} légume{enabledCount > 1 ? 's' : ''} activé{enabledCount > 1 ? 's' : ''}
                  </span>
                </div>
                <Button
                  onClick={saveLegumes}
                  disabled={saving}
                  size="lg"
                  className="bg-green-700 hover:bg-green-800 text-white shadow-xl whitespace-nowrap"
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
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

        {/* Liste des légumes par catégorie */}
        <Section padding="xl" background="white">
          <div className="container-custom max-w-6xl">
            <div className="space-y-8">
              {categories.map((category) => {
                const categoryLegumes = legumes.filter(l => (l.category || 'Autres') === category)
                const enabledInCategory = categoryLegumes.filter(l => l.enabled).length
                
                return (
                  <div key={category} className="bg-white/80 backdrop-blur-sm rounded-3xl border border-green-200/50 shadow-lg overflow-hidden">
                    {/* En-tête de catégorie */}
                    <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200/50">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-serif text-green-800 font-semibold">
                          {category}
                        </h2>
                        <span className="text-sm text-green-700 font-medium">
                          {enabledInCategory} / {categoryLegumes.length}
                        </span>
                      </div>
                    </div>
                    
                    {/* Liste des légumes */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categoryLegumes.map((legume) => (
                          <button
                            key={legume.id}
                            onClick={() => toggleLegume(legume.id)}
                            className={`group flex flex-col p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                              legume.enabled
                                ? 'bg-green-50 border-green-500 shadow-md'
                                : 'bg-white border-earth-200 hover:border-earth-300'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className={`font-medium text-base flex-1 ${
                                legume.enabled ? 'text-green-800' : 'text-[#1a1a1a]/60'
                              }`}>
                                {legume.name}
                              </span>
                              <div className={`flex items-center justify-center w-16 h-9 rounded-xl font-bold text-sm transition-all flex-shrink-0 ml-3 ${
                                legume.enabled
                                  ? 'bg-green-600 text-white shadow-md'
                                  : 'bg-earth-100 text-earth-600'
                              }`}>
                                {legume.enabled ? 'ON' : 'OFF'}
                              </div>
                            </div>
                            {legume.price && (
                              <div className="text-sm text-[#1a1a1a]/70">
                                <span className="font-semibold text-green-700">{legume.price.toFixed(2)} €</span>
                                {legume.unit && (
                                  <span className="ml-1">/ {legume.unit}</span>
                                )}
                                {legume.isLot && legume.lotDescription && (
                                  <span className="block text-xs mt-1 text-[#1a1a1a]/60">
                                    {legume.lotDescription}
                                  </span>
                                )}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
