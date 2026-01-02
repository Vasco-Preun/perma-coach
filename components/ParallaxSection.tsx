'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export default function ParallaxSection({ children, className, speed = 0.5 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}


