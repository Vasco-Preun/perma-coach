'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import GlassCard from '@/components/GlassCard'
import { cn } from '@/lib/utils'

interface FloatingCard {
  id: string
  title: string
  description: string
  icon?: string
  color?: 'green' | 'earth' | 'neutral'
}

interface FloatingCardsProps {
  cards: FloatingCard[]
  className?: string
}

const colorClasses = {
  green: 'from-green-50 to-green-100/50 border-green-200/50',
  earth: 'from-earth-50 to-earth-100/50 border-earth-200/50',
  neutral: 'from-white to-gray-50/50 border-gray-200/50',
}

export default function FloatingCards({ cards, className }: FloatingCardsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Décalages organiques pour chaque card (uniquement sur desktop)
  const getCardOffset = (index: number) => {
    const patterns = [
      { x: 0, y: 0, width: 'full' },
      { x: 20, y: -24, width: '5/6' },
      { x: -16, y: 16, width: 'full' },
      { x: 24, y: -32, width: '4/5' },
      { x: -12, y: 8, width: 'full' },
      { x: 16, y: -20, width: '6/7' },
    ]
    return patterns[index % patterns.length]
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, index) => {
          const offset = getCardOffset(index)
          const colorClass = colorClasses[card.color || 'neutral']
          const widthClass = offset.width === 'full' ? 'w-full' : 
                            offset.width === '5/6' ? 'w-full lg:w-5/6' :
                            offset.width === '4/5' ? 'w-full lg:w-4/5' :
                            'w-full lg:w-6/7'

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
              } : { 
                opacity: 0, 
                y: 40,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className={cn('relative', widthClass)}
            >
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={isInView ? {
                  x: isDesktop ? [0, offset.x, offset.x] : 0,
                  y: isDesktop ? [0, offset.y, offset.y] : 0,
                } : { x: 0, y: 0 }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ 
                  y: isDesktop ? offset.y - 8 : -8,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                className="h-full"
              >
                <GlassCard
                  className={cn(
                    'h-full bg-gradient-to-br',
                    colorClass,
                    'shadow-md hover:shadow-2xl transition-all duration-300',
                    'border border-opacity-30',
                    'rounded-2xl'
                  )}
                  hover={false}
                  padding="lg"
                >
                  {card.icon && (
                    <motion.div 
                      className="mb-6"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">{card.icon}</span>
                      </div>
                    </motion.div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed">
                    {card.description}
                  </p>
                </GlassCard>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
