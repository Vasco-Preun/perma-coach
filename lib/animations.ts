// Animation helpers avec support reduce-motion

import { Variants } from 'framer-motion'

// Détecter prefers-reduced-motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Durées adaptatives
export const getDuration = (base: number): number => {
  return prefersReducedMotion() ? 0 : base
}

// Easing moderne
export const easings = {
  smooth: [0.4, 0, 0.2, 1],
  smoothOut: [0.4, 0, 1, 1],
  smoothIn: [0, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const

// Variants de base pour reveal on scroll
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getDuration(0.6),
      ease: easings.smooth,
    },
  },
}

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: getDuration(0.4),
      ease: easings.smooth,
    },
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: getDuration(0.4),
      ease: easings.smooth,
    },
  },
}

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.15,
      delayChildren: prefersReducedMotion() ? 0 : 0.1,
    },
  },
}

// Transition de page
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: getDuration(0.5),
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: {
      duration: getDuration(0.3),
      ease: easings.smoothOut,
    },
  },
}

// Hover variants pour boutons
export const buttonHover = {
  scale: prefersReducedMotion() ? 1 : 1.01,
  transition: {
    duration: getDuration(0.2),
    ease: easings.smooth,
  },
}

// Hover variants pour cards
export const cardHover = {
  y: prefersReducedMotion() ? 0 : -4,
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  transition: {
    duration: getDuration(0.3),
    ease: easings.smooth,
  },
}

