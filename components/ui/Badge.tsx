'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'green' | 'earth' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

const variants = {
  default: 'bg-earth-100 text-earth-900',
  green: 'bg-green-100 text-green-800',
  earth: 'bg-earth-200 text-earth-900',
  outline: 'border border-earth-300 text-earth-900',
}

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

