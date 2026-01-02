import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlanningClient from '@/components/PlanningClient'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/GlassCard'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ScrollReveal'
import ParallaxSection from '@/components/ParallaxSection'
import Hero from '@/components/Hero'
import VideoBackground from '@/components/VideoBackground'
import { getSettings, getEvents } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Méthode PEBI / Formations & Coachings - Perma-coach',
  description: 'Découvrez la méthode PEBI et nos formations en permaculture et autonomie',
  openGraph: {
    title: 'Méthode PEBI / Formations & Coachings - Perma-coach',
    description: 'Découvrez la méthode PEBI et nos formations en permaculture et autonomie',
  },
}

// Désactiver le cache pour que les modifications admin soient visibles immédiatement
export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function PebiFormationsPage() {
  const settings = await getSettings()
  const events = await getEvents()

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden h-screen flex items-center px-4 sm:px-6 lg:px-8 snap-section">
          <VideoBackground src="/waste.mp4" />
          <div className="container-custom relative z-10 w-full">
            <Hero
              title="Méthode PEBI"
              subtitle="Formations & Coachings pour se reconnecter à la terre"
            />
          </div>
        </section>

        {/* Présentation PEBI */}
        <Section padding="xl" background="white" snap className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-white to-earth-50/20" />
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                  Notre méthode
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                  La méthode PEBI
                </h2>
              </div>
              <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed">
                <p className="text-lg md:text-xl">
                  La méthode PEBI (Permaculture, Écosystèmes, Biodiversité, Innovation) est une approche holistique
                  qui allie les principes de la permaculture à une compréhension profonde des écosystèmes naturels.
                </p>
                <p className="text-lg md:text-xl">
                  Elle vise à créer des systèmes résilients, autonomes et productifs en s'inspirant des modèles naturels
                  et en respectant les cycles et les interactions entre les différents éléments.
                </p>
                <p className="text-lg md:text-xl">
                  Cette méthode s'appuie sur l'observation, la patience et la transmission de savoir-faire traditionnels
                  et modernes pour accompagner chacun vers une plus grande autonomie alimentaire et une reconnexion
                  authentique à la terre.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* Formations - Mise en avant */}
        <Section padding="xl" background="off-white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.05),transparent_50%)]" />
          <div className="container-custom max-w-6xl relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-earth-100 to-earth-50 rounded-full text-sm font-semibold text-earth-800 mb-4">
                  Formations
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">Nos formations</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Colonne gauche : Texte */}
                <div className="space-y-6 text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed">
                  <p>
                    Nos formations en permaculture et autonomie sont conçues pour vous donner les bases pratiques et théoriques 
                    nécessaires à votre projet. Que vous soyez débutant ou que vous souhaitiez approfondir vos connaissances, 
                    nos formations s'adaptent à votre niveau et à vos objectifs.
                  </p>
                  <p>
                    Chaque formation allie théorie et pratique, avec des temps d'observation, d'expérimentation et d'échange 
                    pour une compréhension approfondie. Vous apprendrez à observer votre environnement, à comprendre les interactions 
                    entre les différents éléments, et à concevoir des systèmes durables et productifs.
                  </p>
                </div>
                
                {/* Colonne droite : Carte Formations en présentiel */}
                <div>
                  <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/30 border-green-200/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-[#1a1a1a] mb-2">Formations en présentiel</h3>
                        <p className="text-lg text-[#1a1a1a]/70 mb-3">
                          <strong className="text-green-700">Durée : 2 à 4 jours</strong>
                        </p>
                        <p className="text-base text-[#1a1a1a]/70 mb-4">
                          Nos formations se déroulent en présentiel sur notre site, au cœur de notre écosystème en construction. 
                          Vous serez immergé dans un environnement réel où vous pourrez observer, toucher, expérimenter et apprendre 
                          directement sur le terrain.
                        </p>
                        <div className="space-y-2 text-sm text-[#1a1a1a]/70">
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Théorie et pratique</strong> : alternance entre apports théoriques et mise en pratique immédiate</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Observation sur le terrain</strong> : découverte de notre écosystème et de ses interactions</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Échanges et partage</strong> : temps de discussion et d'échange d'expériences</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Support pédagogique</strong> : documentation et ressources pour continuer votre apprentissage</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>

            </ScrollReveal>
          </div>
        </Section>

        {/* Coachings */}
        <Section padding="xl" background="white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-earth-100 to-earth-50 rounded-full text-sm font-semibold text-earth-800 mb-4">
                  Accompagnement
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">Coachings</h2>
              </div>
              
              <div className="space-y-6 text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed mb-8">
                <p>
                  Nos coachings complets offrent un accompagnement personnalisé et approfondi pour vous guider dans votre projet 
                  de permaculture et d'autonomie. Un suivi sur mesure adapté à vos besoins spécifiques, votre terrain et vos objectifs.
                </p>
                <p>
                  Que vous souhaitiez créer votre potager, transformer votre terrain, ou développer votre autonomie alimentaire, 
                  nos coachings vous accompagnent de la conception à la mise en œuvre de votre projet.
                </p>
              </div>

              {/* Mention coachings complets - Mise en avant */}
              {settings.coachingsComplete && (
                <ParallaxSection speed={0.2}>
                  <GlassCard className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-300/50 border-2">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Coachings complets</h3>
                        <p className="text-lg font-medium text-[#1a1a1a]">
                          {settings.coachingsText || 'Les coachings sont complets (plus de places disponibles pour le moment).'}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </ParallaxSection>
              )}
            </ScrollReveal>
          </div>
        </Section>

        {/* Thématiques 2026 */}
        {settings.thematiques && settings.thematiques.length > 0 && (
          <Section padding="xl" background="white" className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
            <div className="container-custom max-w-4xl relative z-10">
              <ScrollReveal direction="up">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                    Programme 2026
                  </span>
                  <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-4 leading-tight">Thèmes de l'année</h2>
                  <p className="text-lg text-[#1a1a1a]/70 mb-12">
                    Découvrez les thématiques que nous aborderons cette année dans nos formations
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {settings.thematiques.map((theme, index) => (
                    <ScrollReveal key={index} direction="up" delay={index * 150}>
                      <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/30 border-green-200/50 hover:border-green-300/50 transition-colors">
                        <h3 className="text-2xl font-serif text-[#1a1a1a]">{theme}</h3>
                      </GlassCard>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </Section>
        )}

        {/* Planning */}
        <Section padding="xl" background="off-white" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.05),transparent_50%)]" />
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-earth-100 to-earth-50 rounded-full text-sm font-semibold text-earth-800 mb-4">
                  Calendrier
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-4 leading-tight">Planning</h2>
                <p className="text-lg text-[#1a1a1a]/70 mb-12">
                  Programme évolutif avec une visibilité prévue jusqu'à <strong className="text-green-700">juillet 2026</strong>
                </p>
              </div>
              <PlanningClient events={events} />
            </ScrollReveal>
          </div>
        </Section>

        {/* CTA Inscription */}
        <Section padding="xl" background="white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800">
                    Inscription
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-6 leading-tight">
                  Inscrivez-vous à nos formations !
                </h2>
                <p className="text-xl text-[#1a1a1a]/70 mb-10">
                  Contactez-nous pour réserver votre place ou obtenir plus d'informations
                </p>
                <ParallaxSection speed={0.2}>
                  <Button
                    as="a"
                    href="/contact"
                    size="lg"
                    className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-2xl hover:shadow-3xl"
                  >
                    Inscrivez-vous à nos formations !
                  </Button>
                </ParallaxSection>
              </div>
            </ScrollReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
