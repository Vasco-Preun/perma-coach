'use client'

import { motion } from 'framer-motion'
import { cardHover } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface GlassCardProps {
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

export default function GlassCard({ children, className, hover = true, padding = 'md' }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20',
        'bg-gradient-to-br from-white/80 to-white/40',
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


