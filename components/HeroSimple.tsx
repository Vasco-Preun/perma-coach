'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'

interface HeroSimpleProps {
  title: string
  subtitle?: string
}

export default function HeroSimple({ title, subtitle }: HeroSimpleProps) {
  return (
    <motion.div
      className="text-center max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h1
        variants={staggerContainer}
        className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1a1a1a] mb-6"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={staggerContainer}
          className="text-xl md:text-2xl text-[#1a1a1a]/70 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}


