'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: string | React.ReactNode
  className?: string
  delay?: number
  splitBy?: 'words' | 'chars'
}

export default function TextReveal({ 
  children, 
  className,
  delay = 0,
  splitBy = 'words'
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Si children n'est pas une string, on le retourne tel quel
  if (typeof children !== 'string') {
    return <span className={cn('inline-block', className)}>{children}</span>
  }

  const splitText = splitBy === 'words' 
    ? children.split(' ')
    : children.split('')

  return (
    <div ref={ref} className={cn('inline-block', className)}>
      {splitText.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: (delay / 1000) + (index * 0.05),
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="inline-block"
        >
          {word}
          {splitBy === 'words' && index < splitText.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </div>
  )
}

