'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/GlassCard'
import type { Legume, Graine, Plan, ProductType } from '@/lib/data'

type ProductCategory = 'legumes' | 'graines' | 'plans'

interface ProductForm {
  id: string
  name: string
  enabled: boolean
  category: string
  price: string
  unit: string
  isLot: boolean
  lotDescription: string
}

export default function AdminBoutiquePage() {
  const [activeTab, setActiveTab] = useState<ProductCategory>('legumes')
  const [legumes, setLegumes] = useState<Legume[]>([])
  const [graines, setGraines] = useState<Graine[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState<ProductForm>({
    id: '',
    name: '',
    enabled: true,
    category: '',
    price: '',
    unit: '',
    isLot: false,
    lotDescription: ''
  })

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  useEffect(() => {
    const savedAuth = localStorage.getItem('boutique_admin_authenticated')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      loadAllProducts()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('boutique_admin_authenticated', 'true')
      loadAllProducts()
      setPassword('')
    } else {
      setMessage({ type: 'error', text: 'Code incorrect' })
    }
  }

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
      
      setLegumes(await legumesRes.json())
      setGraines(await grainesRes.json())
      setPlans(await plansRes.json())
      setMessage(null)
    } catch (error) {
      console.error('Error loading products:', error)
      setMessage({ type: 'error', text: 'Erreur lors du chargement des produits' })
    } finally {
      setLoading(false)
    }
  }

  const getCurrentProducts = () => {
    switch (activeTab) {
      case 'legumes':
        return legumes
      case 'graines':
        return graines
      case 'plans':
        return plans
    }
  }

  const setCurrentProducts = (products: any[]) => {
    switch (activeTab) {
      case 'legumes':
        setLegumes(products as Legume[])
        break
      case 'graines':
        setGraines(products as Graine[])
        break
      case 'plans':
        setPlans(products as Plan[])
        break
    }
  }

  const getApiEndpoint = () => {
    switch (activeTab) {
      case 'legumes':
        return '/api/legumes'
      case 'graines':
        return '/api/graines'
      case 'plans':
        return '/api/plans'
    }
  }

  const toggleProduct = (id: string) => {
    const products = getCurrentProducts()
    const updated = products.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    )
    setCurrentProducts(updated)
  }

  const deleteProduct = (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return
    }
    const products = getCurrentProducts()
    const updated = products.filter(p => p.id !== id)
    setCurrentProducts(updated)
  }

  const startEdit = (product: any) => {
    setEditingProduct(product.id)
    setFormData({
      id: product.id,
      name: product.name,
      enabled: product.enabled,
      category: product.category || '',
      price: product.price?.toString() || '',
      unit: product.unit || '',
      isLot: product.isLot || false,
      lotDescription: product.lotDescription || ''
    })
  }

  const startAdd = () => {
    setEditingProduct(null)
    setFormData({
      id: '',
      name: '',
      enabled: true,
      category: '',
      price: '',
      unit: '',
      isLot: false,
      lotDescription: ''
    })
    setShowAddForm(true)
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setShowAddForm(false)
    setFormData({
      id: '',
      name: '',
      enabled: true,
      category: '',
      price: '',
      unit: '',
      isLot: false,
      lotDescription: ''
    })
  }

  const saveProduct = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Le nom est requis' })
      return
    }

    const products = getCurrentProducts()
    
    // Générer un ID unique si c'est un nouveau produit
    let newId = formData.id
    if (!editingProduct) {
      // Créer un ID basé sur le nom (slug)
      const slug = formData.name.trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      // Vérifier que l'ID n'existe pas déjà
      let counter = 1
      newId = slug
      while (products.some(p => p.id === newId)) {
        newId = `${slug}-${counter}`
        counter++
      }
    }
    
    const productData: any = {
      id: newId,
      name: formData.name.trim(),
      enabled: formData.enabled,
      category: formData.category.trim() || undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      unit: formData.unit.trim() || undefined,
      isLot: formData.isLot,
      lotDescription: formData.lotDescription.trim() || undefined
    }

    // Ajouter le type selon l'onglet actif
    if (activeTab === 'graines') {
      productData.type = 'graine'
    } else if (activeTab === 'plans') {
      productData.type = 'plan'
    }

    let updated: any[]
    if (editingProduct) {
      // Modifier un produit existant
      updated = products.map(p => p.id === editingProduct ? productData : p)
    } else {
      // Ajouter un nouveau produit
      updated = [...products, productData]
    }

    setCurrentProducts(updated)
    cancelEdit()
    setMessage({ type: 'success', text: editingProduct ? 'Produit modifié' : 'Produit ajouté' })
    setTimeout(() => setMessage(null), 2000)
  }

  const saveAll = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
      
      const [legumesRes, grainesRes, plansRes] = await Promise.all([
        fetch('/api/legumes', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_PASSWORD}`
          },
          body: JSON.stringify(legumes),
        }),
        fetch('/api/graines', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_PASSWORD}`
          },
          body: JSON.stringify(graines),
        }),
        fetch('/api/plans', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_PASSWORD}`
          },
          body: JSON.stringify(plans),
        })
      ])

      if (legumesRes.ok && grainesRes.ok && plansRes.ok) {
        setMessage({ type: 'success', text: 'Toutes les modifications ont été enregistrées avec succès !' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
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

  const currentProducts = getCurrentProducts()
  const enabledCount = currentProducts.filter(p => p.enabled).length
  const categories = Array.from(new Set(currentProducts.map(p => p.category || 'Autres'))).sort()

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
          <Section padding="xl" background="white">
            <div className="container-custom max-w-md mx-auto">
              <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2">
                    Accès éditeur
                  </h1>
                  <p className="text-[#1a1a1a]/70">
                    Gestion de la boutique
                  </p>
                </div>
                
                {message && (
                  <div className={`mb-6 p-4 rounded-2xl ${
                    message.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Code d'accès
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez le code"
                      className="w-full px-4 py-3.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] text-base"
                      required
                      autoFocus
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-700 hover:bg-green-800 text-white shadow-xl"
                  >
                    Se connecter
                  </Button>
                </form>
              </GlassCard>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    )
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
          <Section padding="xl" background="white">
            <div className="container-custom text-center">
              <p className="text-lg text-[#1a1a1a]/70">Chargement...</p>
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
      <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
        {/* Header Admin */}
        <Section padding="lg" background="white" className="border-b border-green-200/50">
          <div className="container-custom max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-2">
                  Gestion de la boutique
                </h1>
                <p className="text-[#1a1a1a]/70">
                  Gérez les légumes, graines et plans disponibles
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-green-100 rounded-full">
                  <span className="text-sm font-semibold text-green-800">
                    {enabledCount} {getTabLabel(activeTab).toLowerCase()} activé{enabledCount > 1 ? 's' : ''}
                  </span>
                </div>
                <Button
                  onClick={saveAll}
                  disabled={saving}
                  size="lg"
                  className="bg-green-700 hover:bg-green-800 text-white shadow-xl whitespace-nowrap"
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer tout'}
                </Button>
              </div>
            </div>
            
            {message && (
              <div className={`mt-4 p-4 rounded-2xl ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
          </div>
        </Section>

        {/* Onglets */}
        <Section padding="md" background="white" className="border-b border-green-200/50">
          <div className="container-custom max-w-6xl">
            <div className="flex gap-2 md:gap-4">
              {(['legumes', 'graines', 'plans'] as ProductCategory[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    cancelEdit()
                  }}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold text-base md:text-lg transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-green-700 text-white shadow-lg'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {getTabLabel(tab)}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* Formulaire d'ajout/modification */}
        {(showAddForm || editingProduct) && (
          <Section padding="lg" background="off-white" className="border-b border-green-200/50">
            <div className="container-custom max-w-6xl">
              <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-[#1a1a1a]">
                    {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                  </h2>
                  <button
                    onClick={cancelEdit}
                    className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                      placeholder="Nom du produit"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Catégorie
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                      placeholder="Ex: Racines, Solanacées..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Prix (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                      Unité
                    </label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                      placeholder="Ex: kg, pièce, sachet..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.isLot}
                        onChange={(e) => setFormData({ ...formData, isLot: e.target.checked })}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-sm font-semibold text-[#1a1a1a]">Vendu en lot</span>
                    </label>
                  </div>
                  
                  {formData.isLot && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                        Description du lot
                      </label>
                      <input
                        type="text"
                        value={formData.lotDescription}
                        onChange={(e) => setFormData({ ...formData, lotDescription: e.target.value })}
                        className="w-full px-4 py-2.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a]"
                        placeholder="Ex: Lot de 2 betteraves (environ 500g)"
                      />
                    </div>
                  )}
                  
                  <div className="md:col-span-2 flex items-center gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.enabled}
                        onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-sm font-semibold text-[#1a1a1a]">Activé (visible sur le site)</span>
                    </label>
                  </div>
                  
                  <div className="md:col-span-2 flex gap-4">
                    <Button
                      onClick={saveProduct}
                      size="lg"
                      className="bg-green-700 hover:bg-green-800 text-white shadow-xl"
                    >
                      {editingProduct ? 'Enregistrer les modifications' : 'Ajouter le produit'}
                    </Button>
                    <Button
                      onClick={cancelEdit}
                      variant="outline"
                      size="lg"
                      className="border-earth-300 text-[#1a1a1a] hover:bg-earth-50"
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </Section>
        )}

        {/* Liste des produits par catégorie */}
        <Section padding="xl" background="white">
          <div className="container-custom max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-[#1a1a1a]">
                {getTabLabel(activeTab)}
              </h2>
              {!showAddForm && !editingProduct && (
                <Button
                  onClick={startAdd}
                  size="md"
                  className="bg-green-700 hover:bg-green-800 text-white"
                >
                  + Ajouter un {getTabLabel(activeTab).toLowerCase().slice(0, -1)}
                </Button>
              )}
            </div>

            {currentProducts.length === 0 ? (
              <GlassCard className="bg-white/80 backdrop-blur-sm border-green-200/50 text-center py-12">
                <p className="text-[#1a1a1a]/70 mb-4">Aucun {getTabLabel(activeTab).toLowerCase()} enregistré.</p>
                <Button
                  onClick={startAdd}
                  size="md"
                  className="bg-green-700 hover:bg-green-800 text-white"
                >
                  Ajouter le premier {getTabLabel(activeTab).toLowerCase().slice(0, -1)}
                </Button>
              </GlassCard>
            ) : (
              <div className="space-y-8">
                {categories.map((category) => {
                  const categoryProducts = currentProducts.filter(p => (p.category || 'Autres') === category)
                  const enabledInCategory = categoryProducts.filter(p => p.enabled).length
                  
                  return (
                    <div key={category} className="bg-white/80 backdrop-blur-sm rounded-3xl border border-green-200/50 shadow-lg overflow-hidden">
                      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200/50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-serif text-green-800 font-semibold">
                            {category}
                          </h3>
                          <span className="text-sm text-green-700 font-medium">
                            {enabledInCategory} / {categoryProducts.length}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="space-y-3">
                          {categoryProducts.map((product) => (
                            <div
                              key={product.id}
                              className={`group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                                product.enabled
                                  ? 'bg-green-50 border-green-500 shadow-md'
                                  : 'bg-white border-earth-200 hover:border-earth-300'
                              }`}
                            >
                              {editingProduct === product.id ? (
                                <div className="flex-1 grid md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1">Nom *</label>
                                    <input
                                      type="text"
                                      value={formData.name}
                                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                      className="w-full px-3 py-2 border-2 border-earth-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1">Catégorie</label>
                                    <input
                                      type="text"
                                      value={formData.category}
                                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                      className="w-full px-3 py-2 border-2 border-earth-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1">Prix (€)</label>
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={formData.price}
                                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                      className="w-full px-3 py-2 border-2 border-earth-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1">Unité</label>
                                    <input
                                      type="text"
                                      value={formData.unit}
                                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                      className="w-full px-3 py-2 border-2 border-earth-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-sm"
                                    />
                                  </div>
                                  <div className="md:col-span-2 flex gap-2">
                                    <Button
                                      onClick={saveProduct}
                                      size="sm"
                                      className="bg-green-700 hover:bg-green-800 text-white"
                                    >
                                      Enregistrer
                                    </Button>
                                    <Button
                                      onClick={cancelEdit}
                                      variant="outline"
                                      size="sm"
                                      className="border-earth-300 text-[#1a1a1a]"
                                    >
                                      Annuler
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                      <span className={`font-medium text-base flex-1 ${
                                        product.enabled ? 'text-green-800' : 'text-[#1a1a1a]/60'
                                      }`}>
                                        {product.name}
                                      </span>
                                      <button
                                        onClick={() => toggleProduct(product.id)}
                                        className={`flex items-center justify-center w-16 h-9 rounded-xl font-bold text-sm transition-all flex-shrink-0 ml-3 ${
                                          product.enabled
                                            ? 'bg-green-600 text-white shadow-md'
                                            : 'bg-earth-100 text-earth-600'
                                        }`}
                                      >
                                        {product.enabled ? 'ON' : 'OFF'}
                                      </button>
                                    </div>
                                    {product.price && (
                                      <div className="text-sm text-[#1a1a1a]/70">
                                        <span className="font-semibold text-green-700">{product.price.toFixed(2)} €</span>
                                        {product.unit && (
                                          <span className="ml-1">/ {product.unit}</span>
                                        )}
                                        {product.isLot && product.lotDescription && (
                                          <span className="block text-xs mt-1 text-[#1a1a1a]/60">
                                            {product.lotDescription}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => startEdit(product)}
                                      className="px-3 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium"
                                    >
                                      Modifier
                                    </button>
                                    <button
                                      onClick={() => deleteProduct(product.id)}
                                      className="px-3 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium"
                                    >
                                      Supprimer
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
