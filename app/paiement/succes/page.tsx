'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/GlassCard'

export default function PaiementSuccesPage() {
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setSessionId(params.get('session_id'))
      setOrderId(params.get('order_id'))
    }
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
        <Section padding="xl" background="off-white">
          <div className="container-custom max-w-2xl mx-auto">
            <GlassCard className="bg-white/80 backdrop-blur-sm border-green-200/50 text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">
                Paiement réussi !
              </h1>
              
              <p className="text-lg text-[#1a1a1a]/70 mb-8">
                Votre paiement a été traité avec succès. Nous avons bien reçu votre commande et vous remercions de votre confiance.
              </p>

              {orderId && (
                <p className="text-sm text-[#1a1a1a]/50 mb-8">
                  Numéro de commande : <span className="font-semibold">{orderId}</span>
                </p>
              )}

              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-2xl p-4 mb-8 text-left">
                <p className="text-sm text-blue-800">
                  <strong>Prochaines étapes :</strong> Vous allez recevoir un email de confirmation sous peu. 
                  Nous vous contacterons pour convenir d'un rendez-vous de récupération.
                </p>
              </div>

              <Button
                onClick={() => router.push('/')}
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                Retourner à l'accueil
              </Button>
            </GlassCard>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
