'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export default function ScrollReveal({ 
  children, 
  className, 
  direction = 'up',
  delay = 0 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  }

  const initial = directions[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: initial.y,
        x: initial.x,
        scale: 0.95,
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        x: 0,
        scale: 1,
      } : { 
        opacity: 0, 
        y: initial.y,
        x: initial.x,
        scale: 0.95,
      }}
      transition={{ 
        duration: 0.6, 
        delay: delay / 1000,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
