import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/GlassCard'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ScrollReveal'
import ParallaxSection from '@/components/ParallaxSection'
import HeroSimple from '@/components/HeroSimple'
import GoogleMap from '@/components/GoogleMap'
import { getSettings, getEvents } from '@/lib/data'
import PlanningClient from '@/components/PlanningClient'

export const metadata: Metadata = {
  title: 'Chantiers participatifs - Perma-coach',
  description: 'Participez à nos chantiers de plantation et découvrez la permaculture en pratique',
  openGraph: {
    title: 'Chantiers participatifs - Perma-coach',
    description: 'Participez à nos chantiers de plantation et découvrez la permaculture en pratique',
  },
}

const activities = [
  'Planter des arbres et arbustes pour créer des haies',
  'Apprendre les techniques de plantation adaptées à chaque espèce',
  'Découvrir les principes de la permaculture appliqués au terrain',
  'Partager un moment convivial autour d\'un repas',
  'Rencontrer d\'autres personnes passionnées par la terre',
]

const toBring = [
  'Des vêtements adaptés au travail en extérieur (qui peuvent être salis)',
  'Des chaussures de marche ou bottes',
  'Des gants de jardinage si vous en avez',
  'Une bouteille d\'eau',
  'Votre bonne humeur et votre envie d\'apprendre !',
]

export default async function ChantiersParticipatifsPage() {
  const settings = await getSettings()
  const events = await getEvents()
  const chantiers = events.filter(e => e.type === 'chantier')

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <Section padding="xl" background="green" className="relative overflow-hidden" snap>
          <div className="container-custom">
            <HeroSimple
              title="Chantiers participatifs"
              subtitle="Venez participer à la création d'un écosystème vivant et durable"
            />
            <div className="text-center mt-8">
              {settings.chantiersEnabled && settings.chantiersLink ? (
                <Button
                  as="a"
                  href={settings.chantiersLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="bg-green-700 hover:bg-green-800 text-white shadow-2xl"
                >
                  S'inscrire aux chantiers
                </Button>
              ) : (
                <Button
                  as="a"
                  href="/contact"
                  size="lg"
                  className="bg-green-700 hover:bg-green-800 text-white shadow-2xl"
                >
                  S'inscrire aux chantiers
                </Button>
              )}
            </div>
          </div>
        </Section>

        {/* Explication */}
        <Section padding="xl" background="white" snap className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                  Découvrir
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                  Qu'est-ce qu'un chantier participatif ?
                </h2>
              </div>
              <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed">
                <p className="text-lg md:text-xl">
                  Les chantiers participatifs sont des moments conviviaux où nous nous retrouvons pour créer ensemble
                  des éléments essentiels de notre écosystème : plantation de haies, création de mares, installation
                  de buttes, mise en place du verger...
                </p>
                <p className="text-lg md:text-xl">
                  C'est l'occasion d'apprendre en pratiquant, de partager des savoir-faire et de contribuer concrètement
                  à la transformation d'un terrain en écosystème vivant et productif.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* Cards */}
        <Section padding="xl" background="off-white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.05),transparent_50%)]" />
          <div className="container-custom relative z-10">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ScrollReveal direction="up">
                <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/30 border-green-200/50">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="text-3xl font-serif text-[#1a1a1a] mb-6">Ce que vous allez faire</h3>
                  </div>
                  <ul className="space-y-4 text-[#1a1a1a]/80">
                    {activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="text-green-700 mt-1 text-xl font-bold">•</span>
                        <span className="text-lg">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={150}>
                <GlassCard className="bg-gradient-to-br from-earth-50 to-earth-100/30 border-earth-200/50">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-earth-500 to-earth-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h3 className="text-3xl font-serif text-[#1a1a1a] mb-6">À prévoir</h3>
                  </div>
                  <ul className="space-y-4 text-[#1a1a1a]/80">
                    {toBring.map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="text-earth-700 mt-1 text-xl font-bold">•</span>
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </Section>

        {/* Planning des chantiers */}
        {chantiers.length > 0 && (
          <Section padding="xl" background="white" snap className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-earth-50/30" />
            <div className="container-custom max-w-4xl relative z-10">
              <ScrollReveal direction="up">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-earth-100 to-earth-50 rounded-full text-sm font-semibold text-earth-800 mb-4">
                    Calendrier
                  </span>
                  <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-4 leading-tight">
                    Prochains chantiers
                  </h2>
                  <p className="text-lg text-[#1a1a1a]/70 mb-12">
                    Découvrez les dates des prochains chantiers participatifs
                  </p>
                </div>
                <PlanningClient events={chantiers} />
              </ScrollReveal>
            </div>
          </Section>
        )}

        {/* CTA Inscription */}
        <Section padding="xl" background="off-white" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-earth-50/30" />
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800">
                    Inscription
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                  Comment participer ?
                </h2>
                
                {settings.chantiersEnabled && settings.chantiersLink ? (
                  <div className="space-y-6">
                    <p className="text-lg text-[#1a1a1a]/70 mb-8">
                      {settings.chantiersText || 'Inscrivez-vous via le formulaire ci-dessous :'}
                    </p>
                    <Button
                      as="a"
                      href={settings.chantiersLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                    >
                      {settings.chantiersText || 'S\'inscrire aux chantiers participatifs'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-lg text-[#1a1a1a]/70 mb-8">
                      Utilisez le formulaire ci-dessous pour nous contacter et vous inscrire aux prochains chantiers :
                    </p>
                    <Card className="bg-[#faf9f7]">
                      <ContactForm />
                    </Card>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* Carte Google Maps */}
        <Section padding="xl" background="off-white" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.05),transparent_50%)]" />
          <div className="container-custom max-w-6xl relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-8 text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4 leading-tight">
                  Lieu des chantiers
                </h2>
                <p className="text-lg text-[#1a1a1a]/70">
                  La Chapelle Lasson, 20 rue Saint Fiacre
                </p>
              </div>
              <GlassCard className="bg-white/95 backdrop-blur-sm border-green-200/50 p-0 overflow-hidden">
                <GoogleMap address="La Chapelle Lasson, 20 rue Saint Fiacre" height="500px" />
              </GlassCard>
            </ScrollReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
