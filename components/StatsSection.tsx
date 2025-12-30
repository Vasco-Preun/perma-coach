'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import GlassCard from '@/components/GlassCard'
import ScrollReveal from '@/components/ScrollReveal'

interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

interface StatsSectionProps {
  stats: Stat[]
  title?: string
  subtitle?: string
}

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplay(end)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(start))
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export default function StatsSection({ stats, title, subtitle }: StatsSectionProps) {
  return (
    <div className="container-custom">
      {(title || subtitle) && (
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-6">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-[#1a1a1a]/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </ScrollReveal>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <ScrollReveal key={index} direction="up" delay={index * 150}>
            <GlassCard className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <span className="text-3xl">📊</span>
              </motion.div>
              <div className="text-5xl md:text-6xl font-bold text-green-700 mb-4">
                <AnimatedNumber 
                  value={stat.value} 
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <p className="text-xl text-[#1a1a1a]/70 font-medium">
                {stat.label}
              </p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}

