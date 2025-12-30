'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'

interface HeroProps {
  title: string | React.ReactNode
  subtitle?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
}

export default function Hero({ title, subtitle, primaryCTA, secondaryCTA }: HeroProps) {
  return (
    <motion.div
      className="text-center max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h1
        variants={staggerContainer}
        className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl [text-shadow:_2px_2px_8px_rgba(0,0,0,0.8)]"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={staggerContainer}
          className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-xl [text-shadow:_1px_1px_4px_rgba(0,0,0,0.7)]"
        >
          {subtitle}
        </motion.p>
      )}
      {(primaryCTA || secondaryCTA) && (
        <motion.div
          variants={staggerContainer}
          className="flex flex-col sm:flex-row gap-4 justify-center [&_a]:shadow-2xl [&_a]:backdrop-blur-sm"
        >
          {primaryCTA && (
            <Button 
              as="a" 
              href={primaryCTA.href} 
              size="lg"
              className="bg-green-700/95 hover:bg-green-800/95 text-white border-2 border-white/20 shadow-2xl backdrop-blur-sm"
            >
              {primaryCTA.label}
            </Button>
          )}
          {secondaryCTA && (
            <Button 
              as="a" 
              href={secondaryCTA.href} 
              variant="outline" 
              size="lg"
              className="bg-white/90 hover:bg-white text-[#1a1a1a] border-2 border-white/30 shadow-2xl backdrop-blur-sm font-semibold"
            >
              {secondaryCTA.label}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

