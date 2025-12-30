'use client'

import { motion } from 'framer-motion'

interface AnimatedGradientProps {
  className?: string
  speed?: number
}

export default function AnimatedGradient({ className = '', speed = 20 }: AnimatedGradientProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-earth-50/30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(42,115,73,0.08),transparent_50%)]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

