'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ScrollReveal'
import GlassCard from '@/components/GlassCard'
import type { Legume } from '@/lib/data'

interface CartItem extends Legume {
  quantity: number
}

export default function PanierLegumesPage() {
  const [legumes, setLegumes] = useState<Legume[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLegumes()
    // Récupérer le panier depuis localStorage
    const savedCart = localStorage.getItem('panier_legumes')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing cart:', error)
      }
    }
  }, [])

  const loadLegumes = async () => {
    try {
      const response = await fetch('/api/legumes')
      if (!response.ok) throw new Error('Erreur de chargement')
      const data = await response.json()
      // Afficher uniquement les légumes activés
      setLegumes(data.filter((l: Legume) => l.enabled))
      setError(null)
    } catch (error) {
      console.error('Error loading legumes:', error)
      setError('Impossible de charger les légumes. Vérifiez que le serveur est démarré.')
    } finally {
      setLoading(false)
    }
  }

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.price || 0
      return total + (price * item.quantity)
    }, 0)
  }

  const addToCart = (legume: Legume) => {
    const existingItem = cart.find(item => item.id === legume.id)
    const newCart = existingItem
      ? cart.map(item =>
          item.id === legume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...legume, quantity: 1 }]
    setCart(newCart)
    localStorage.setItem('panier_legumes', JSON.stringify(newCart))
  }

  const removeFromCart = (id: string) => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
    localStorage.setItem('panier_legumes', JSON.stringify(newCart))
  }

  const updateQuantity = (id: string, quantity: number) => {
    let newCart
    if (quantity <= 0) {
      newCart = cart.filter(item => item.id !== id)
    } else {
      newCart = cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }
    setCart(newCart)
    localStorage.setItem('panier_legumes', JSON.stringify(newCart))
  }

  const categories = Array.from(new Set(legumes.map(l => l.category || 'Autres'))).sort()

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <section className="relative overflow-hidden h-screen flex items-center px-4 sm:px-6 lg:px-8 snap-section">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="relative w-full h-full">
                <img
                  src="/PERMACOACH13.JPG"
                  alt="Récolte de légumes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </div>
            <div className="container-custom relative z-10 w-full">
              <div className="text-center">
                <p className="text-xl text-white drop-shadow-lg">Chargement...</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <Section padding="xl" background="white">
            <div className="container-custom text-center">
              <p className="text-lg text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => {
                  setError(null)
                  setLoading(true)
                  loadLegumes()
                }}
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                Réessayer
              </Button>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden h-screen flex items-center px-4 sm:px-6 lg:px-8 snap-section">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src="/PERMACOACH13.JPG"
                alt="Récolte de légumes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </div>
          <div className="container-custom relative z-10 w-full">
            <ScrollReveal direction="up">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white drop-shadow-2xl mb-6 leading-tight">
                  Panier légumes
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-white/95 drop-shadow-lg mb-8">
                  Choisissez vos légumes et composez votre panier
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Panier Sticky */}
        {cart.length > 0 && (
          <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-green-200/50 shadow-lg">
            <div className="container-custom py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-[#1a1a1a]/60 mb-1">Panier</p>
                    <p className="text-xl font-bold text-[#1a1a1a]">
                      {cart.length} {cart.length > 1 ? 'articles' : 'article'}
                    </p>
                  </div>
                  <div className="h-12 w-px bg-green-200/50"></div>
                  <div>
                    <p className="text-sm text-[#1a1a1a]/60 mb-1">Total</p>
                    <p className="text-2xl font-bold text-green-700">
                      {getTotal().toFixed(2)} €
                    </p>
                  </div>
                </div>
                <Button
                  as="a"
                  href="/checkout"
                  size="lg"
                  className="bg-green-700 hover:bg-green-800 text-white shadow-xl whitespace-nowrap"
                >
                  Passer la commande
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Liste des légumes disponibles */}
        {legumes.length === 0 ? (
          <Section padding="xl" background="off-white">
            <div className="container-custom text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h2 className="text-3xl font-serif text-[#1a1a1a] mb-4">
                Aucun légume disponible
              </h2>
              <p className="text-lg text-[#1a1a1a]/70">
                Les légumes seront bientôt disponibles. Revenez plus tard !
              </p>
            </div>
          </Section>
        ) : (
          <Section padding="xl" background="off-white" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.03),transparent_50%)]" />
            <div className="container-custom max-w-6xl relative z-10">
              <ScrollReveal direction="up">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">
                    Légumes disponibles
                  </h2>
                  <p className="text-lg text-[#1a1a1a]/70">
                    Sélectionnez les légumes que vous souhaitez commander
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-8">
                {categories.map((category, categoryIndex) => {
                  const categoryLegumes = legumes.filter(l => (l.category || 'Autres') === category)
                  if (categoryLegumes.length === 0) return null
                  
                  return (
                    <ScrollReveal key={category} direction="up" delay={categoryIndex * 100}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-green-200/50 shadow-lg overflow-hidden">
                        {/* En-tête de catégorie */}
                        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200/50">
                          <h3 className="text-xl font-serif text-green-800 font-semibold">
                            {category}
                          </h3>
                        </div>
                        
                        {/* Grille de légumes */}
                        <div className="p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryLegumes.map((legume) => {
                              const cartItem = cart.find(item => item.id === legume.id)
                              return (
                                <GlassCard
                                  key={legume.id}
                                  className="bg-white/90 border-green-200/50 hover:border-green-300/50 transition-all"
                                >
                                  <div className="flex flex-col h-full">
                                    <div className="flex-1 mb-4">
                                      <h4 className="text-xl font-serif text-[#1a1a1a] mb-2">
                                        {legume.name}
                                      </h4>
                                      {legume.price && (
                                        <p className="text-lg font-bold text-green-700">
                                          {legume.price.toFixed(2)} € {legume.unit || '/kg'}
                                        </p>
                                      )}
                                    </div>
                                    
                                    {cartItem ? (
                                      <div className="flex items-center gap-3">
                                        <button
                                          onClick={() => updateQuantity(legume.id, cartItem.quantity - 1)}
                                          className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition-colors font-bold"
                                        >
                                          −
                                        </button>
                                        <span className="flex-1 text-center text-lg font-semibold text-[#1a1a1a]">
                                          {cartItem.quantity}
                                        </span>
                                        <button
                                          onClick={() => updateQuantity(legume.id, cartItem.quantity + 1)}
                                          className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition-colors font-bold"
                                        >
                                          +
                                        </button>
                                        <button
                                          onClick={() => removeFromCart(legume.id)}
                                          className="ml-2 text-sm text-red-600 hover:text-red-700 font-medium"
                                        >
                                          Retirer
                                        </button>
                                      </div>
                                    ) : (
                                      <Button
                                        onClick={() => addToCart(legume)}
                                        size="sm"
                                        className="w-full bg-green-700 hover:bg-green-800 text-white"
                                      >
                                        Ajouter au panier
                                      </Button>
                                    )}
                                  </div>
                                </GlassCard>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            </div>
          </Section>
        )}
      </main>
      <Footer />
    </>
  )
}
