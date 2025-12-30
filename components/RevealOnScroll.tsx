'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  stagger = false,
}: RevealOnScrollProps) {
  const variants = stagger ? staggerContainer : fadeInUp

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}

