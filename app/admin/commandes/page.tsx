'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/GlassCard'
import Button from '@/components/ui/Button'

type OrderStatus = 'all' | 'paid' | 'pending'

interface StripeLineItem {
  description?: string
  quantity?: number
  amount_total?: number
  product_name?: string
}

interface AdminOrder {
  id: string
  type?: 'formation' | 'boutique'
  status?: string
  name?: string
  email?: string
  total?: number
  amount?: number
  amountPaid?: number
  date?: string
  paymentDate?: string
  eventTitle?: string
  purchasedFormationName?: string
  purchasedProductName?: string
  stripeSessionId?: string
  stripeMetadata?: Record<string, string>
  stripeLineItems?: StripeLineItem[]
}

export default function AdminCommandesPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'lesjardinsduclos26'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_authenticated', 'true')
      setPassword('')
      void loadOrders()
    } else {
      setMessage({ type: 'error', text: 'Mot de passe incorrect' })
    }
  }

  const loadOrders = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const response = await fetch('/api/admin/orders', {
        headers: {
          Authorization: `Bearer ${ADMIN_PASSWORD}`,
        },
      })
      const data = await response.json().catch(() => [])
      if (!response.ok) {
        throw new Error(data?.error || 'Erreur de chargement')
      }
      setOrders(Array.isArray(data) ? data : [])
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.message || 'Erreur lors du chargement des commandes' })
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders
    return orders.filter((o) => (o.status || 'pending') === statusFilter)
  }, [orders, statusFilter])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
          <Section padding="xl" background="off-white">
            <div className="container-custom max-w-md mx-auto">
              <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 shadow-2xl">
                <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2 text-center">Suivi des commandes</h1>
                <p className="text-[#1a1a1a]/70 text-center mb-6">Accès administration</p>
                {message && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-800 border border-red-200">
                    {message.text}
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Code d'accès"
                    className="w-full px-4 py-3.5 border-2 border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-[#1a1a1a] text-base"
                    required
                    autoFocus
                  />
                  <Button type="submit" size="lg" className="w-full bg-green-700 hover:bg-green-800 text-white shadow-xl">
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

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
        <Section padding="lg" background="off-white" className="border-b border-green-200/50">
          <div className="container-custom max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-2">Suivi commandes & paiements</h1>
                <p className="text-[#1a1a1a]/70">Vue centralisée des paiements Stripe (produits, formations, email, montant)</p>
              </div>
              <div className="flex items-center gap-3">
                <Button as="a" href="/admin" variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                  Formations
                </Button>
                <Button as="a" href="/admin/boutique" variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                  Boutique
                </Button>
                <Button onClick={loadOrders} disabled={loading} className="bg-green-700 hover:bg-green-800 text-white">
                  {loading ? 'Actualisation...' : 'Actualiser'}
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <Section padding="xl" background="off-white">
          <div className="container-custom max-w-6xl">
            <div className="flex gap-2 mb-6">
              {(['all', 'paid', 'pending'] as OrderStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    statusFilter === status
                      ? 'bg-green-700 text-white'
                      : 'bg-white text-[#1a1a1a] border border-earth-200 hover:bg-earth-50'
                  }`}
                >
                  {status === 'all' ? 'Toutes' : status === 'paid' ? 'Payées' : 'En attente'}
                </button>
              ))}
            </div>

            {message && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-800 border border-red-200">
                {message.text}
              </div>
            )}

            {filteredOrders.length === 0 ? (
              <GlassCard className="bg-white/80 backdrop-blur-sm border-green-200/50 text-center py-12">
                <p className="text-[#1a1a1a]/70">Aucune commande à afficher.</p>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const customerEmail = order.email || order.stripeMetadata?.customer_email || '-'
                  const formationName = order.purchasedFormationName || order.eventTitle || order.stripeMetadata?.formation_name
                  const productName = order.purchasedProductName || order.stripeMetadata?.product_name
                  const amount = order.amountPaid ?? order.total ?? order.amount ?? 0
                  const status = order.status || 'pending'
                  return (
                    <GlassCard key={order.id} className="bg-white/90 backdrop-blur-sm border-green-200/50">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm font-semibold text-[#1a1a1a]/70">Commande #{order.id}</span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {status === 'paid' ? 'Payée' : 'En attente'}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-earth-100 text-earth-800">
                              {order.type === 'formation' ? 'Formation' : 'Boutique'}
                            </span>
                          </div>

                          <p className="text-sm text-[#1a1a1a]">
                            <strong>Client :</strong> {order.name || '-'} · <strong>Email :</strong> {customerEmail}
                          </p>

                          {formationName && (
                            <p className="text-sm text-[#1a1a1a]">
                              <strong>Formation :</strong> {formationName}
                            </p>
                          )}

                          {productName && (
                            <p className="text-sm text-[#1a1a1a]">
                              <strong>Produit(s) :</strong> {productName}
                            </p>
                          )}

                          {Array.isArray(order.stripeLineItems) && order.stripeLineItems.length > 0 && (
                            <div className="text-sm text-[#1a1a1a]">
                              <strong>Détail ligne(s) Stripe :</strong>
                              <ul className="mt-1 space-y-1 text-[#1a1a1a]/80">
                                {order.stripeLineItems.map((item, idx) => (
                                  <li key={`${order.id}-${idx}`}>
                                    - {(item.product_name || item.description || 'Article')} × {item.quantity || 1}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="lg:text-right space-y-1">
                          <p className="text-2xl font-bold text-green-700">{Number(amount).toFixed(2)} €</p>
                          <p className="text-xs text-[#1a1a1a]/60">
                            Paiement : {order.paymentDate ? new Date(order.paymentDate).toLocaleString('fr-FR') : '-'}
                          </p>
                          <p className="text-xs text-[#1a1a1a]/60">Session Stripe : {order.stripeSessionId || '-'}</p>
                        </div>
                      </div>
                    </GlassCard>
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

