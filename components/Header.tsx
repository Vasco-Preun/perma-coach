'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/notre-histoire', label: 'Notre histoire' },
  { href: '/chantiers-participatifs', label: 'Chantiers' },
  { href: '/pebi-formations', label: 'PEBI / Formations' },
  { href: '/boutique', label: 'Boutique' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isNotreHistoire = pathname === '/notre-histoire'
  const isHome = pathname === '/'
  const isPebi = pathname === '/pebi-formations'
  const isBoutique = pathname === '/boutique'
  const isHeroVisible = (isNotreHistoire || isHome || isPebi || isBoutique) && !isScrolled
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isHeroVisible
          ? 'bg-transparent backdrop-blur-none shadow-none border-none'
          : isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-earth-100/50'
          : 'bg-white/90 backdrop-blur-md shadow-sm'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className={cn(
              "text-2xl font-serif font-bold tracking-tight transition-all duration-200 group-hover:scale-105",
              isHeroVisible ? 'text-white drop-shadow-lg' : 'text-green-700'
            )}>
              Perma-coach
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative text-sm font-medium transition-colors',
                      isHeroVisible
                        ? isActive
                          ? 'text-white drop-shadow-md'
                          : 'text-white/90 hover:text-white drop-shadow-md'
                        : isActive
                        ? 'text-green-700'
                        : 'text-[#1a1a1a] hover:text-green-700'
                    )}
                  >
                  {item.label}
                    {isActive && (
                      <motion.div
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-0.5",
                          isHeroVisible ? "bg-white" : "bg-green-700"
                        )}
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    {!isActive && (
                      <motion.div
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-0.5 origin-left",
                          isHeroVisible ? "bg-white" : "bg-green-700"
                        )}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                </Link>
              )
            })}
              <Link href="/contact">
                <motion.button
                  className={cn(
                    "px-6 py-2.5 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all",
                    isHeroVisible
                      ? "bg-white/90 hover:bg-white text-green-700"
                      : "bg-gradient-to-r from-green-700 to-green-600 text-white"
                  )}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(42, 115, 73, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Contact
                </motion.button>
              </Link>
          </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden p-2 transition-colors",
                isHeroVisible ? "text-white" : "text-[#1a1a1a]"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
            <motion.div
              animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-earth-100 bg-white/95 backdrop-blur-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block py-2 text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'text-green-700'
                      : 'text-[#1a1a1a] hover:text-green-700'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block w-full text-center py-2.5 bg-green-700 text-white rounded-2xl text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
