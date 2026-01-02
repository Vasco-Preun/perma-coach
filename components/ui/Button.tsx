'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { buttonHover } from '@/lib/animations'
import { cn } from '@/lib/utils'

type ButtonElementProps = Omit<HTMLMotionProps<'button'>, 'children' | 'className'>
type AnchorElementProps = Omit<HTMLMotionProps<'a'>, 'children' | 'className'>

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  as?: 'button' | 'a'
}

type ButtonProps = BaseButtonProps & (
  | ({ as?: 'button' } & Partial<ButtonElementProps>)
  | ({ as: 'a'; href: string } & Partial<AnchorElementProps>)
)

const variants = {
  primary: 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-500',
  secondary: 'bg-earth-100 text-earth-900 hover:bg-earth-200 focus:ring-earth-500',
  outline: 'border-2 border-earth-300 text-earth-900 hover:border-earth-400 hover:bg-earth-50 focus:ring-earth-500',
  ghost: 'text-earth-900 hover:bg-earth-100 focus:ring-earth-500',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  as = 'button',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const commonProps = {
    className: cn(baseClasses, variants[variant], sizes[size], className),
    whileHover: buttonHover,
    whileTap: { scale: 0.98 },
  }

  if (as === 'a') {
    const { href, ...anchorProps } = props as AnchorElementProps & { href: string }
    return (
      <motion.a
        href={href}
        {...commonProps}
        {...anchorProps}
      >
        {children}
      </motion.a>
    )
  }

  const buttonProps = props as ButtonElementProps
  return (
    <motion.button
      type={buttonProps.type || 'button'}
      {...commonProps}
      {...buttonProps}
    >
      {children}
    </motion.button>
  )
}

