'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/GlassCard'

export default function PaiementAnnulePage() {
  const router = useRouter()

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50">
        <Section padding="xl" background="off-white">
          <div className="container-custom max-w-2xl mx-auto">
            <GlassCard className="bg-white/80 backdrop-blur-sm border-yellow-200/50 text-center py-12">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-serif text-[#1a1a1a] mb-4">Paiement annulé</h1>
              <p className="text-[#1a1a1a]/70 mb-6">
                Votre paiement a été annulé. Aucun montant n'a été débité.
              </p>
              <p className="text-sm text-[#1a1a1a]/50 mb-6">
                Vous pouvez réessayer plus tard ou nous contacter si vous avez des questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  size="lg"
                  className="border-green-700 text-green-700 hover:bg-green-50"
                >
                  Retour à l'accueil
                </Button>
                <Button
                  onClick={() => router.push('/contact')}
                  size="lg"
                  className="bg-green-700 hover:bg-green-800 text-white"
                >
                  Nous contacter
                </Button>
              </div>
            </GlassCard>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
