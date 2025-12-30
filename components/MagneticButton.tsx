'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import Button, { ButtonProps } from '@/components/ui/Button'

interface MagneticButtonProps extends Omit<ButtonProps, 'children'> {
  children: React.ReactNode
  magnetic?: boolean
}

export default function MagneticButton({ 
  children, 
  magnetic = true,
  className,
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { stiffness: 500, damping: 30 })
  const springY = useSpring(y, { stiffness: 500, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetic || !ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    const strength = 0.3
    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: springX,
        y: springY,
      }}
      className="inline-block"
    >
      <Button className={cn(className)} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

