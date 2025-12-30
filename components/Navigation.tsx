'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom section-padding py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif text-green-700 hover:text-green-800 transition-colors">
            Perma-coach
          </Link>
          
          {/* Menu desktop */}
          <div className="hidden md:flex gap-6">
            <Link href="/notre-histoire" className="hover:text-green-700 transition-colors">
              Notre histoire
            </Link>
            <Link href="/chantiers-participatifs" className="hover:text-green-700 transition-colors">
              Chantiers participatifs
            </Link>
            <Link href="/pebi-formations" className="hover:text-green-700 transition-colors">
              PEBI / Formations
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-earth-900 hover:text-green-700"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3">
            <Link 
              href="/notre-histoire" 
              className="block hover:text-green-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Notre histoire
            </Link>
            <Link 
              href="/chantiers-participatifs" 
              className="block hover:text-green-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Chantiers participatifs
            </Link>
            <Link 
              href="/pebi-formations" 
              className="block hover:text-green-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              PEBI / Formations
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

