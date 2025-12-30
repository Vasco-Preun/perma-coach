'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'off-white' | 'green' | 'earth'
  id?: string
  snap?: boolean // Active le scroll snapping pour cette section
}

const paddings = {
  sm: 'py-12 px-4 sm:px-6',
  md: 'py-16 px-4 sm:px-6 lg:px-8',
  lg: 'py-24 px-4 sm:px-6 lg:px-8',
  xl: 'py-32 px-4 sm:px-6 lg:px-8',
}

const backgrounds = {
  white: 'bg-white',
  'off-white': 'bg-[#faf9f7]',
  green: 'bg-gradient-to-br from-green-50 via-green-50/50 to-white',
  earth: 'bg-gradient-to-br from-earth-50 via-earth-50/50 to-white',
}

export default function Section({
  children,
  className,
  padding = 'md',
  background = 'white',
  id,
  snap = false,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(
        paddings[padding],
        backgrounds[background],
        snap && 'snap-section',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      {children}
    </motion.section>
  )
}

