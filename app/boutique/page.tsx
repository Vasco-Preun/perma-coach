'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ScrollReveal'
import GoogleMap from '@/components/GoogleMap'
import GlassCard from '@/components/GlassCard'
import type { Legume, Graine, Plan, Product } from '@/lib/data'

type ProductCategory = 'legumes' | 'graines' | 'plans'

interface CartItem extends Product {
  quantity: number
}

export default function BoutiquePage() {
  const [activeTab, setActiveTab] = useState<ProductCategory>('legumes')
  const [legumes, setLegumes] = useState<Legume[]>([])
  const [graines, setGraines] = useState<Graine[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAllProducts()
    const savedCart = localStorage.getItem('panier_boutique')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing cart:', error)
      }
    }
  }, [])

  const loadAllProducts = async () => {
    setLoading(true)
    try {
      const [legumesRes, grainesRes, plansRes] = await Promise.all([
        fetch('/api/legumes'),
        fetch('/api/graines'),
        fetch('/api/plans')
      ])
      
      if (!legumesRes.ok || !grainesRes.ok || !plansRes.ok) {
        throw new Error('Erreur de chargement')
      }
      
      const legumesData = await legumesRes.json()
      const grainesData = await grainesRes.json()
      const plansData = await plansRes.json()
      
      setLegumes(legumesData.filter((l: Legume) => l.enabled))
      setGraines(grainesData.filter((g: Graine) => g.enabled))
      setPlans(plansData.filter((p: Plan) => p.enabled))
      setError(null)
    } catch (error) {
      console.error('Error loading products:', error)
      setError('Impossible de charger les produits.')
    } finally {
      setLoading(false)
    }
  }

  const MINIMUM_ORDER = 15 // Pour légumes et plans uniquement
  const DISCOUNT_THRESHOLD = 25
  const DISCOUNT_PERCENTAGE = 15
  const DELIVERY_LOCATION = 'Reims'
  const FARM_ADDRESS = 'La Chapelle Lasson, 20 rue Saint Fiacre'
  const GRAINE_DELIVERY_COST = 2.90 // Frais de livraison par paquet de graines

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.price || 0
      return total + (price * item.quantity)
    }, 0)
  }

  const getGraineDeliveryCost = () => {
    const grainesInCart = cart.filter(item => item.type === 'graine')
    return grainesInCart.reduce((total, item) => {
      return total + (GRAINE_DELIVERY_COST * item.quantity)
    }, 0)
  }

  const getDiscount = () => {
    const subtotal = getSubtotal()
    if (subtotal > DISCOUNT_THRESHOLD) {
      return subtotal * (DISCOUNT_PERCENTAGE / 100)
    }
    return 0
  }

  const getTotal = () => {
    const subtotal = getSubtotal()
    const discount = getDiscount()
    const graineDelivery = getGraineDeliveryCost()
    return subtotal - discount + graineDelivery
  }

  const isMinimumReached = () => {
    // Le minimum de 15€ ne s'applique qu'aux légumes et plans
    const legumesAndPlans = cart.filter(item => item.type === 'legume' || item.type === 'plan')
    const subtotalLegumesPlans = legumesAndPlans.reduce((total, item) => {
      const price = item.price || 0
      return total + (price * item.quantity)
    }, 0)
    
    // Si le panier contient uniquement des graines, pas de minimum
    if (legumesAndPlans.length === 0) {
      return true
    }
    
    return subtotalLegumesPlans >= MINIMUM_ORDER
  }

  const getLegumesAndPlansSubtotal = () => {
    return cart
      .filter(item => item.type === 'legume' || item.type === 'plan')
      .reduce((total, item) => {
        const price = item.price || 0
        return total + (price * item.quantity)
      }, 0)
  }

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id && item.type === product.type)
    const newCart = existingItem
      ? cart.map(item =>
          item.id === product.id && item.type === product.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }]
    setCart(newCart)
    localStorage.setItem('panier_boutique', JSON.stringify(newCart))
  }

  const removeFromCart = (id: string, type: ProductCategory) => {
    const newCart = cart.filter(item => !(item.id === id && item.type === type))
    setCart(newCart)
    localStorage.setItem('panier_boutique', JSON.stringify(newCart))
  }

  const updateQuantity = (id: string, type: ProductCategory, quantity: number) => {
    let newCart
    if (quantity <= 0) {
      newCart = cart.filter(item => !(item.id === id && item.type === type))
    } else {
      newCart = cart.map(item =>
        item.id === id && item.type === type ? { ...item, quantity } : item
      )
    }
    setCart(newCart)
    localStorage.setItem('panier_boutique', JSON.stringify(newCart))
  }

  const getCurrentProducts = (): Product[] => {
    switch (activeTab) {
      case 'legumes':
        return legumes.map(l => ({ ...l, type: 'legume' as const })) as Product[]
      case 'graines':
        return graines as Product[]
      case 'plans':
        return plans as Product[]
      default:
        return []
    }
  }

  const getCurrentProductsCategories = () => {
    const products = getCurrentProducts()
    return Array.from(new Set(products.map(p => p.category || 'Autres'))).sort()
  }

  const getTabLabel = (tab: ProductCategory) => {
    switch (tab) {
      case 'legumes':
        return 'Légumes'
      case 'graines':
        return 'Graines'
      case 'plans':
        return 'Plans'
    }
  }

  const renderProductCard = (product: Product, index: number) => {
    const cartItem = cart.find(item => item.id === product.id && item.type === product.type)
    const isInCart = !!cartItem
    
    return (
      <motion.div
        key={`${product.type}-${product.id}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        className="group"
      >
        <div className={`relative h-full bg-white rounded-3xl border-2 transition-all duration-300 ${
          isInCart
            ? 'border-green-500 shadow-xl shadow-green-500/10'
            : 'border-green-200/50 hover:border-green-300 shadow-lg hover:shadow-xl'
        } overflow-hidden`}>
          <div className="p-6 md:p-8 flex flex-col h-full">
            <h4 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-3 group-hover:text-green-700 transition-colors">
              {product.name}
            </h4>
            
            {product.price && (
              <div className="mb-6">
                <p className="text-2xl font-bold text-green-700">
                  {product.price.toFixed(2)} €
                  {product.unit && (
                    <span className="text-lg font-normal text-[#1a1a1a]/60 ml-1">
                      / {product.unit}
                    </span>
                  )}
                </p>
                {product.isLot && product.lotDescription && (
                  <p className="text-sm text-[#1a1a1a]/60 mt-1">
                    {product.lotDescription}
                  </p>
                )}
              </div>
            )}
            
            <div className="mt-auto">
              {isInCart ? (
                <motion.div
                  initial={false}
                  animate={{ scale: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between bg-green-50 rounded-2xl p-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(product.id, product.type as ProductCategory, cartItem.quantity - 1)}
                      className="w-10 h-10 rounded-xl bg-white text-green-700 flex items-center justify-center hover:bg-green-100 transition-colors font-bold text-lg shadow-sm"
                    >
                      −
                    </motion.button>
                    <span className="text-2xl font-bold text-green-800 min-w-[3rem] text-center">
                      {cartItem.quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(product.id, product.type as ProductCategory, cartItem.quantity + 1)}
                      className="w-10 h-10 rounded-xl bg-white text-green-700 flex items-center justify-center hover:bg-green-100 transition-colors font-bold text-lg shadow-sm"
                    >
                      +
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => removeFromCart(product.id, product.type as ProductCategory)}
                    className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2 transition-colors"
                  >
                    Retirer du panier
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Ajouter au panier
                </motion.button>
              )}
            </div>
          </div>

          {isInCart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <section className="relative overflow-hidden h-screen flex items-center px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/PERMACOACH13.JPG"
                  alt="Récolte de légumes"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </div>
            <div className="container-custom relative z-10 w-full">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl text-white drop-shadow-lg">Chargement de la boutique...</p>
                </motion.div>
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
            <div className="container-custom text-center max-w-md mx-auto">
              <div className="p-6 bg-red-50 rounded-3xl border border-red-200 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
              <Button
                onClick={() => {
                  setError(null)
                  setLoading(true)
                  loadAllProducts()
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

  const currentProducts = getCurrentProducts()
  const categories = getCurrentProductsCategories()

  return (
    <>
      <Header />
      <main className="pb-32 md:pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-screen flex items-center px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/PERMACOACH13.JPG"
                alt="Boutique"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </div>
          <div className="container-custom relative z-10 w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white drop-shadow-2xl mb-6 leading-tight">
                Boutique
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/95 drop-shadow-lg mb-8 max-w-2xl mx-auto">
                Découvrez nos légumes frais, graines et plants
              </p>
            </motion.div>
          </div>
        </section>

        {/* Panier Sticky - Desktop Top / Mobile Bottom */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed bottom-0 left-0 right-0 md:top-20 md:bottom-auto z-50"
            >
              <div className="absolute inset-0 backdrop-blur-2xl bg-white/30 border-t md:border-t-0 md:border-b border-white/40 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] md:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"></div>
              
              <div className="relative z-10">
                <div className="container-custom py-4 md:py-3">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex-1 w-full lg:w-auto">
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-3">
                      <div className="text-center sm:text-left">
                        <p className="text-xs text-[#1a1a1a]/60 mb-1 uppercase tracking-wider">Panier</p>
                        <p className="text-xl font-bold text-[#1a1a1a]">
                          {cart.length} {cart.length > 1 ? 'articles' : 'article'}
                        </p>
                      </div>
                      <div className="h-10 w-px bg-green-200/50 hidden sm:block"></div>
                      <div className="text-center sm:text-left">
                        <p className="text-xs text-[#1a1a1a]/60 mb-1 uppercase tracking-wider">Sous-total</p>
                        <p className="text-xl font-semibold text-[#1a1a1a]">
                          {getSubtotal().toFixed(2)} €
                        </p>
                      </div>
                      {getDiscount() > 0 && (
                        <>
                          <div className="h-10 w-px bg-green-200/50 hidden sm:block"></div>
                          <div className="text-center sm:text-left">
                            <p className="text-xs text-green-600 mb-1 uppercase tracking-wider font-semibold">
                              Remise -{DISCOUNT_PERCENTAGE}%
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              -{getDiscount().toFixed(2)} €
                            </p>
                          </div>
                        </>
                      )}
                        {getGraineDeliveryCost() > 0 && (
                          <>
                            <div className="h-10 w-px bg-green-200/50 hidden sm:block"></div>
                            <div className="text-center sm:text-left">
                              <p className="text-xs text-[#1a1a1a]/60 mb-1 uppercase tracking-wider">Livraison graines</p>
                              <p className="text-xl font-semibold text-[#1a1a1a]">
                                +{getGraineDeliveryCost().toFixed(2)} €
                              </p>
                            </div>
                          </>
                        )}
                      <div className="h-10 w-px bg-green-200/50 hidden sm:block"></div>
                      <div className="text-center sm:text-left">
                        <p className="text-xs text-[#1a1a1a]/60 mb-1 uppercase tracking-wider">Total</p>
                        <p className="text-2xl md:text-3xl font-bold text-green-700">
                          {getTotal().toFixed(2)} €
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                        {getGraineDeliveryCost() > 0 && (
                          <>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                              <span className="text-[#1a1a1a]/70">Livraison graines : +{getGraineDeliveryCost().toFixed(2)}€</span>
                      </div>
                      <div className="h-3 w-px bg-green-200/50"></div>
                          </>
                        )}
                      <div className={`flex items-center gap-1.5 ${isMinimumReached() ? 'text-green-600' : 'text-red-600'}`}>
                        {isMinimumReached() ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                        <span className={`font-semibold ${isMinimumReached() ? '' : 'drop-shadow-sm'}`}>
                            {cart.some(item => item.type === 'legume' || item.type === 'plan') 
                              ? (isMinimumReached() 
                            ? `Minimum atteint (${MINIMUM_ORDER}€)` 
                                  : `Minimum : ${(MINIMUM_ORDER - getLegumesAndPlansSubtotal()).toFixed(2)}€ restants`)
                              : 'Commande valide'}
                        </span>
                        </div>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-auto">
                    {isMinimumReached() ? (
                      <Button
                        as="a"
                        href="/checkout"
                        size="lg"
                        className="w-full lg:w-auto bg-green-700 hover:bg-green-800 text-white shadow-xl text-lg px-8 py-4"
                      >
                        Passer la commande
                      </Button>
                    ) : (
                      <Button
                        as="a"
                        href="#"
                        size="lg"
                        onClick={(e) => {
                          e.preventDefault()
                        }}
                        className="w-full lg:w-auto bg-gray-300 text-gray-500 cursor-not-allowed shadow-xl text-lg px-8 py-4 opacity-60"
                      >
                        Ajoutez {(MINIMUM_ORDER - getTotal()).toFixed(2)}€
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Onglets de navigation */}
        <Section padding="lg" background="white" className="sticky top-20 z-40 border-b border-green-200/50">
          <div className="container-custom max-w-7xl">
            <div className="flex gap-2 md:gap-4 justify-center">
              {(['legumes', 'graines', 'plans'] as ProductCategory[]).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-green-700 text-white shadow-lg'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{getTabLabel(tab)}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </Section>

        {/* Liste des produits */}
        {currentProducts.length === 0 ? (
          <Section padding="xl" background="off-white">
            <div className="container-custom text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-12 bg-white rounded-3xl border border-green-200/50 shadow-lg"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-serif text-[#1a1a1a] mb-4">
                  Aucun {getTabLabel(activeTab).toLowerCase()} disponible
                </h2>
                <p className="text-lg text-[#1a1a1a]/70">
                  Les {getTabLabel(activeTab).toLowerCase()} seront bientôt disponibles. Revenez plus tard !
                </p>
              </motion.div>
            </div>
          </Section>
        ) : (
          <Section padding="xl" background="off-white" className="relative">
            <div className="container-custom max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-4">
                  Nos {getTabLabel(activeTab)}
                </h2>
                <p className="text-xl text-[#1a1a1a]/70 max-w-2xl mx-auto mb-8">
                  Sélectionnez les {getTabLabel(activeTab).toLowerCase()} que vous souhaitez commander
                </p>
              </motion.div>

              {/* Informations commerciales */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-16"
              >
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl border border-green-200/50 p-6 md:p-8">
                  {activeTab === 'legumes' || activeTab === 'plans' ? (
                  <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                      <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a1a1a] mb-1">Livraison</p>
                          <p className="text-sm text-[#1a1a1a]/70">Sur {DELIVERY_LOCATION} à partir de {MINIMUM_ORDER}€</p>
                          <p className="text-xs text-[#1a1a1a]/60 mt-1">Ou récupération à la ferme : {FARM_ADDRESS} (toute quantité)</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                      <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a1a1a] mb-1">Minimum de commande</p>
                        <p className="text-sm text-[#1a1a1a]/70">{MINIMUM_ORDER} €</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                      <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a1a1a] mb-1">Remise automatique</p>
                        <p className="text-sm text-[#1a1a1a]/70">-{DISCOUNT_PERCENTAGE}% dès {DISCOUNT_THRESHOLD}€</p>
                      </div>
                    </div>
                  </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                        <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a1a1a] mb-1">Livraison</p>
                          <p className="text-sm text-[#1a1a1a]/70">Dans toute la France</p>
                          <p className="text-xs text-[#1a1a1a]/60 mt-1">{GRAINE_DELIVERY_COST}€ par paquet de graines</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                        <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a1a1a] mb-1">Pas de minimum</p>
                          <p className="text-sm text-[#1a1a1a]/70">Commande possible dès 1 paquet</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <div className="space-y-16 md:space-y-20">
                {categories.map((category, categoryIndex) => {
                  const categoryProducts = currentProducts.filter(p => (p.category || 'Autres') === category)
                  if (categoryProducts.length === 0) return null
                  
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    >
                      <div className="mb-8 md:mb-12">
                        <h3 className="text-3xl md:text-4xl font-serif text-green-800 font-semibold">
                          {category}
                        </h3>
                        <div className="mt-3 h-px w-24 bg-gradient-to-r from-green-400 to-transparent"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {categoryProducts.map((product, index) => renderProductCard(product, index))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </Section>
        )}

        {/* Carte Google Maps */}
        <Section padding="xl" background="white" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
          <div className="container-custom max-w-6xl relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-8 text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4 leading-tight">
                  Point de récupération
                </h2>
                <p className="text-lg text-[#1a1a1a]/70">
                  {FARM_ADDRESS}
                </p>
              </div>
              <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 p-0 overflow-hidden">
                <GoogleMap address={FARM_ADDRESS} height="500px" />
              </GlassCard>
            </ScrollReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
