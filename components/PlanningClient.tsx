'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Event } from '@/lib/data'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { scaleIn } from '@/lib/animations'

interface PlanningClientProps {
  events: Event[]
}

interface PlacesAvailability {
  reserved: number
  available: number
  isFull: boolean
}

const MAX_PLACES = 20

export default function PlanningClient({ events: initialEvents }: PlanningClientProps) {
  const [filter, setFilter] = useState<'all' | 'formation' | 'chantier'>('all')
  const [placesAvailability, setPlacesAvailability] = useState<Record<string, PlacesAvailability>>({})
  
  const filteredEvents = initialEvents.filter(event => {
    if (filter === 'all') return true
    return event.type === filter
  })

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const formatDateRange = (start: string, end?: string) => {
    if (!end) return formatDate(start)
    const startDate = new Date(start)
    const endDate = new Date(end)
    
    if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
      return `${startDate.getDate()} - ${endDate.getDate()} ${endDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`
    }
    
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  const getDuration = (start: string, end?: string): number => {
    if (!end) return 1
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 pour inclure le jour de début
    return diffDays
  }

  const getFormationPrice = (start: string, end?: string): number | null => {
    const duration = getDuration(start, end)
    if (duration === 2) return 200
    if (duration === 4) return 500
    return null // Prix non défini pour d'autres durées
  }

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const response = await fetch('/api/formations/places')
        if (response.ok) {
          const data = await response.json()
          setPlacesAvailability(data)
        }
      } catch (error) {
        console.error('Error loading places:', error)
      }
    }
    loadPlaces()
  }, [])

  const getFormationAvailability = (eventId: string): PlacesAvailability | null => {
    return placesAvailability[eventId] || null
  }

  const filters = [
    { value: 'all' as const, label: 'Tout' },
    { value: 'formation' as const, label: 'Formations' },
    { value: 'chantier' as const, label: 'Chantiers' },
  ]

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex gap-3 justify-center flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-6 py-2.5 rounded-2xl font-medium transition-all duration-250 ${
              filter === f.value
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-white text-[#1a1a1a] hover:bg-earth-50 border border-earth-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste des événements */}
      <div className="space-y-4">
        {sortedEvents.length === 0 ? (
          <p className="text-center text-[#1a1a1a]/60 py-12">
            Aucun événement à afficher pour le moment.
          </p>
        ) : (
          sortedEvents.map((event, index) => {
            const availability = event.type === 'formation' ? getFormationAvailability(event.id) : null
            const isFull = availability?.isFull || false
            const availablePlaces = availability ? availability.available : MAX_PLACES
            
            const CardContent = (
              <Card
                className={`transition-all duration-200 ${
                  isFull
                    ? 'bg-gray-100 border-gray-300 opacity-75'
                    : event.type === 'formation'
                    ? 'bg-green-50 border-green-200 hover:border-green-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                    : 'bg-earth-50 border-earth-200 hover:border-earth-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <Badge
                        variant={event.type === 'formation' ? 'green' : 'earth'}
                      >
                        {event.type === 'formation' ? 'Formation' : 'Chantier'}
                      </Badge>
                      {isFull && (
                        <Badge variant="earth" className="bg-red-100 text-red-800 border-red-300">
                          Complet
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-serif text-[#1a1a1a] mb-2">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-[#1a1a1a]/70">{event.description}</p>
                    )}
                    {isFull && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="text-sm font-semibold text-yellow-800">
                          🎉 Victime de son succès !
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Cette formation est complète. Contactez-nous pour être ajouté à la liste d'attente.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="text-right sm:text-left sm:min-w-[200px]">
                    <p className="text-lg font-medium text-[#1a1a1a] mb-1">
                      {formatDateRange(event.startDate, event.endDate)}
                    </p>
                    {event.type === 'formation' && getFormationPrice(event.startDate, event.endDate) && (
                      <p className="text-xl font-bold text-green-700">
                        {getFormationPrice(event.startDate, event.endDate)} €
                      </p>
                    )}
                    {event.type === 'formation' && availability && (
                      <p className={`text-sm font-medium mt-2 ${
                        isFull ? 'text-red-600' : 'text-green-700'
                      }`}>
                        {isFull 
                          ? `${MAX_PLACES}/${MAX_PLACES} places` 
                          : `${availablePlaces} place${availablePlaces > 1 ? 's' : ''} disponible${availablePlaces > 1 ? 's' : ''}`
                        }
                      </p>
                    )}
                    {!isFull && (
                      <p className="text-sm text-[#1a1a1a]/60 mt-2">
                        {event.type === 'formation' ? 'S\'inscrire →' : 'S\'inscrire →'}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {isFull ? (
                  CardContent
                ) : (
                  <Link
                    href={
                      event.type === 'formation'
                        ? `/inscription-formation/${event.id}`
                        : `/inscription-chantier/${event.id}`
                    }
                  >
                    {CardContent}
                  </Link>
                )}
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}

