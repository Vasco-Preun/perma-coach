'use client'

import { motion } from 'framer-motion'
import { cardHover } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddings = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({ children, className, hover = true, padding = 'md' }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-3xl shadow-lg border border-earth-100/50',
        'hover:shadow-2xl transition-all duration-300',
        paddings[padding],
        className
      )}
      whileHover={hover ? cardHover : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

