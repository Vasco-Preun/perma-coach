'use client'

import { useState, useEffect } from 'react'
import type { SiteSettings, Event } from '@/lib/data'

export default function AdminPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Vérification simple de l'authentification (à améliorer en production)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_authenticated')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_authenticated', 'true')
      loadData()
    } else {
      setMessage({ type: 'error', text: 'Mot de passe incorrect' })
    }
  }

  const loadData = async () => {
    try {
      const [settingsRes, eventsRes] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/admin/events'),
      ])
      const settingsData = await settingsRes.json()
      const eventsData = await eventsRes.json()
      setSettings(settingsData)
      setEvents(eventsData)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const saveSettings = async () => {
    if (!settings) return
    setLoading(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (response.ok) {
        setMessage({ type: 'success', text: 'Paramètres sauvegardés avec succès' })
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setLoading(false)
    }
  }

  const saveEvents = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
      })
      if (response.ok) {
        setMessage({ type: 'success', text: 'Événements sauvegardés avec succès' })
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

  const addThematique = () => {
    if (!settings) return
    setSettings({
      ...settings,
      thematiques: [...settings.thematiques, ''],
    })
  }

  const removeThematique = (index: number) => {
    if (!settings) return
    setSettings({
      ...settings,
      thematiques: settings.thematiques.filter((_, i) => i !== index),
    })
  }

  const updateThematique = (index: number, value: string) => {
    if (!settings) return
    const newThematiques = [...settings.thematiques]
    newThematiques[index] = value
    setSettings({ ...settings, thematiques: newThematiques })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-earth-50 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-serif text-earth-900 mb-6">Administration</h1>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-earth-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {message && (
            <div className={`p-3 rounded-lg mb-4 ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
          <button type="submit" className="btn-primary w-full">
            Se connecter
          </button>
        </form>
      </div>
    )
  }

  if (!settings) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-earth-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-3xl font-serif text-earth-900 mb-6">Administration</h1>
          
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {/* Paramètres généraux */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif text-earth-900 mb-4">Paramètres généraux</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Lien d'inscription chantiers
                </label>
                <input
                  type="text"
                  value={settings.chantiersLink}
                  onChange={(e) => setSettings({ ...settings, chantiersLink: e.target.value })}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Texte CTA chantiers
                </label>
                <input
                  type="text"
                  value={settings.chantiersText}
                  onChange={(e) => setSettings({ ...settings, chantiersText: e.target.value })}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.chantiersEnabled}
                  onChange={(e) => setSettings({ ...settings, chantiersEnabled: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-earth-700">
                  Activer le lien d'inscription (sinon affiche le formulaire interne)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.coachingsComplete}
                  onChange={(e) => setSettings({ ...settings, coachingsComplete: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-earth-700">
                  Coachings complets
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Texte coachings complets
                </label>
                <textarea
                  value={settings.coachingsText}
                  onChange={(e) => setSettings({ ...settings, coachingsText: e.target.value })}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg"
                  rows={2}
                />
              </div>
            </div>

            <button onClick={saveSettings} disabled={loading} className="btn-primary mt-4">
              Sauvegarder les paramètres
            </button>
          </section>

          {/* Thématiques */}
          <section className="mb-8">
            <h2 className="text-2xl font-serif text-earth-900 mb-4">Thématiques 2026</h2>
            <div className="space-y-2">
              {settings.thematiques.map((theme, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={theme}
                    onChange={(e) => updateThematique(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-earth-300 rounded-lg"
                  />
                  <button
                    onClick={() => removeThematique(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button onClick={addThematique} className="btn-secondary">
                Ajouter une thématique
              </button>
            </div>
            <button onClick={saveSettings} disabled={loading} className="btn-primary mt-4">
              Sauvegarder les thématiques
            </button>
          </section>

          {/* Planning */}
          <section>
            <h2 className="text-2xl font-serif text-earth-900 mb-4">Planning</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border border-earth-300 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">Type</label>
                      <select
                        value={event.type}
                        onChange={(e) => updateEvent(event.id, 'type', e.target.value)}
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg"
                      >
                        <option value="formation">Formation</option>
                        <option value="chantier">Chantier</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">Titre</label>
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => updateEvent(event.id, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">Date début</label>
                      <input
                        type="date"
                        value={event.startDate}
                        onChange={(e) => updateEvent(event.id, 'startDate', e.target.value)}
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">Date fin (optionnel)</label>
                      <input
                        type="date"
                        value={event.endDate || ''}
                        onChange={(e) => updateEvent(event.id, 'endDate', e.target.value || undefined)}
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button onClick={addEvent} className="btn-secondary">
                Ajouter un événement
              </button>
            </div>
            <button onClick={saveEvents} disabled={loading} className="btn-primary mt-4">
              Sauvegarder le planning
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

