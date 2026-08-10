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
import GoogleMap from '@/components/GoogleMap'
import { getSettings, getEvents } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Formation Potager & Permaculture - Perma-coach',
  description: 'En deux jours, apprenez à construire un potager plus simple, plus productif et adapté à votre réalité.',
  openGraph: {
    title: 'Formation Potager & Permaculture - Perma-coach',
    description: 'En deux jours, apprenez à construire un potager plus simple, plus productif et adapté à votre réalité.',
  },
}

// Désactiver le cache pour que les modifications admin soient visibles immédiatement
export const revalidate = 0
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

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
              title={
                <>
                  FORMATION POTAGER & PERMACULTURE
                  <br />
                  Arrêtez de jardiner au hasard.
                </>
              }
              subtitle="En deux jours, apprenez à construire un potager plus simple, plus productif et adapté à votre réalité."
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
                  ÉTAPE 1 · VOS DIFFICULTÉS
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                  Cette formation est faite pour vous si...
                </h2>
              </div>
              <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed">
                <p className="text-lg md:text-xl">
                  <strong className="text-[#1a1a1a]">Vos planches sont pleines... mais votre panier reste vide.</strong>{' '}
                  Vous semez et plantez beaucoup, sans récolter assez par rapport au temps et à la surface mobilisés.
                </p>
                <p className="text-lg md:text-xl">
                  <strong className="text-[#1a1a1a]">Vous connaissez plein d&apos;astuces... mais vous n&apos;avez pas de système.</strong>{' '}
                  Vous accumulez les conseils sans savoir quoi appliquer, dans quel ordre ni au bon moment.
                </p>
                <p className="text-lg md:text-xl">
                  <strong className="text-[#1a1a1a]">Vous ratez les bons créneaux et le potager tourne au ralenti.</strong>{' '}
                  Les semis sont lancés trop tard et les planches restent vides entre deux cultures.
                  <br /><br />
                  <strong className="text-[#1a1a1a]">Vous récoltez trop d&apos;un coup... puis presque plus rien.</strong>{' '}
                  Votre production arrive par vagues au lieu de remplir régulièrement votre panier.
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
                  ÉTAPE 2 · POURQUOI APPRENDRE AVEC MOI ?
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">Je n&apos;enseigne que ce que je cultive.</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Colonne gauche : Texte */}
                <div className="space-y-6 text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed">
                  <p>
                    Ce que je vous transmets est appliqué chaque jour à la ferme-école Les Jardins du Clos.
                  </p>
                  <p>
                    <strong className="text-[#1a1a1a]">Je cultive depuis plus de 10 ans.</strong>{' '}
                    J&apos;ai testé, observé et amélioré mes pratiques au fil des saisons, des réussites comme des erreurs.
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
                        <h3 className="text-2xl font-serif text-[#1a1a1a] mb-2">Je suis maraîcher, pas seulement formateur</h3>
                        <p className="text-lg text-[#1a1a1a]/70 mb-3">
                          <strong className="text-green-700">Je produis les légumes aux Jardins du Clos et je les vends directement en circuit court.</strong>
                        </p>
                        
                        {/* Tarifs */}
                        <div className="mb-4 p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl border border-green-200/50">
                          <h4 className="text-lg font-semibold text-[#1a1a1a] mb-3">J&apos;ai créé une méthode claire et structurée</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-base text-[#1a1a1a]/80">La méthode PEBI aide à mieux organiser les cultures, récolter davantage et éviter les planches vides.</span>
                              <span className="text-xl font-bold text-green-700">03</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-base text-[#1a1a1a]/80">J&apos;accompagne déjà des jardiniers vers plus d&apos;autonomie</span>
                              <span className="text-xl font-bold text-green-700">04</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-base text-[#1a1a1a]/70 mb-4">
                          Mes formations et coachings permettent de comprendre son potager et de gagner en confiance.
                        </p>
                        <div className="space-y-2 text-sm text-[#1a1a1a]/70">
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Mon travail est suivi et reconnu</strong> : je partage mon expérience à travers mes formations, mes contenus et mes chroniques, mais ma légitimité reste le terrain.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Je cultive depuis plus de 10 ans</strong> : j&apos;ai testé, observé et amélioré mes pratiques au fil des saisons</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>Je suis maraîcher, pas seulement formateur</strong> : je produis les légumes aux Jardins du Clos en circuit court</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span><strong>J&apos;ai créé une méthode claire et structurée</strong> : la méthode PEBI organise les cultures semaine après semaine</span>
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
                  ÉTAPE 3 · LA RÉPONSE PEBI
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">À chaque blocage, une solution concrète.</h2>
              </div>
              
              <div className="space-y-6 text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed mb-8">
                <p>
                  La méthode PEBI transforme vos difficultés en un système simple à appliquer dans votre potager.
                </p>
                <p>
                  <strong className="text-[#1a1a1a]">RÉPONSE AU PROBLÈME 01 — Mieux utiliser chaque planche pour récolter davantage.</strong>{' '}
                  Vous apprenez à combiner cultures étagées, associations et successions pour exploiter l&apos;espace sans surcharger la planche.
                  <br /><br />
                  <strong className="text-[#1a1a1a]">RÉPONSE AU PROBLÈME 02 — Suivre une méthode claire, semaine après semaine.</strong>{' '}
                  Vous savez quoi semer, planter, surveiller et récolter, avec des priorités précises plutôt qu&apos;une accumulation d&apos;astuces.
                  <br /><br />
                  <strong className="text-[#1a1a1a]">RÉPONSE AU PROBLÈME 03 — Anticiper et enchaîner les cultures sans laisser de vide.</strong>{' '}
                  Vous préparez la culture suivante avant la fin de la précédente grâce à la planification, aux semis échelonnés et à la pépinière.
                  <br /><br />
                  <strong className="text-[#1a1a1a]">RÉPONSE AU PROBLÈME 04 — Échelonner les récoltes pour produire plus régulièrement.</strong>{' '}
                  Vous adaptez les quantités et la fréquence des semis pour éviter les surplus d&apos;un côté et les longues périodes sans récolte de l&apos;autre.
                  <br /><br />
                  Le résultat : un potager organisé pour produire davantage, plus régulièrement, sans vous demander chaque semaine ce que vous devez faire.
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
                        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Coachings en ligne complets</h3>
                        <p className="text-lg font-medium text-[#1a1a1a]">
                          {settings.coachingsText || 'Les coachings en ligne sont complets (plus de places disponibles pour le moment).'}
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
                  ÉTAPE 4 · PASSEZ À L&apos;ACTION
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-4 leading-tight">Deux jours pour reprendre le contrôle de votre potager.</h2>
                <p className="text-lg text-[#1a1a1a]/70 mb-12">
                  ✓ 2 journées complètes · ✓ Petit groupe · ✓ Théorie + pratique · ✓ Sur une vraie ferme · ✓ Accessible aux débutants · ✓ Solutions adaptées à votre projet
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
                  Prêt à arrêter de jardiner au hasard ?
                </h2>
                <p className="text-xl text-[#1a1a1a]/70 mb-10">
                  Réservez votre place et repartez avec une méthode claire, des gestes concrets et un plan d&apos;action adapté à votre potager. Places volontairement limitées pour préserver les échanges.
                </p>
                <ParallaxSection speed={0.2}>
                  <Button
                    as="a"
                    href="/contact"
                    size="lg"
                    className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-2xl hover:shadow-3xl"
                  >
                    Je réserve ma place maintenant
                  </Button>
                </ParallaxSection>
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* Carte Google Maps */}
        <Section padding="xl" background="white" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
          <div className="container-custom max-w-6xl relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-8 text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4 leading-tight">
                  Lieu des formations
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
