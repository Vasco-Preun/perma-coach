'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Event } from '@/lib/data'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { scaleIn } from '@/lib/animations'

interface PlanningClientProps {
  events: Event[]
}

export default function PlanningClient({ events: initialEvents }: PlanningClientProps) {
  const [filter, setFilter] = useState<'all' | 'formation' | 'chantier'>('all')
  
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
          sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card
                className={`${
                  event.type === 'formation'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-earth-50 border-earth-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge
                        variant={event.type === 'formation' ? 'green' : 'earth'}
                      >
                        {event.type === 'formation' ? 'Formation' : 'Chantier'}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-serif text-[#1a1a1a] mb-2">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-[#1a1a1a]/70">{event.description}</p>
                    )}
                  </div>
                  <div className="text-right sm:text-left sm:min-w-[200px]">
                    <p className="text-lg font-medium text-[#1a1a1a]">
                      {formatDateRange(event.startDate, event.endDate)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

