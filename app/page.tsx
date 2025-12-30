import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/GlassCard'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ScrollReveal'
import ParallaxSection from '@/components/ParallaxSection'
import FloatingCards from '@/components/FloatingCards'
import Hero from '@/components/Hero'
import VideoBackground from '@/components/VideoBackground'
import Image from 'next/image'
import { getSettings, getEvents } from '@/lib/data'

export default function Home() {
  const settings = getSettings()
  const events = getEvents()
  const upcomingEvents = events
    .filter(e => {
      try {
        return new Date(e.startDate) >= new Date()
      } catch {
        return false
      }
    })
    .sort((a, b) => {
      try {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      } catch {
        return 0
      }
    })
    .slice(0, 4)

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden h-screen flex items-center px-4 sm:px-6 lg:px-8 snap-section">
          <VideoBackground src="/accueil.mp4" />
          <div className="container-custom relative z-10 w-full">
            <Hero
              title={
                <>
                  Se reconnecter
                  <br />
                  <span className="text-green-300">à la terre</span>
                </>
              }
              subtitle="Transmission et accompagnement vers l'autonomie et la reconnexion à la terre"
              primaryCTA={{ label: 'Découvrir notre histoire', href: '/notre-histoire' }}
              secondaryCTA={{ label: 'Nos formations', href: '/pebi-formations' }}
            />
          </div>
        </section>

        {/* Section Notre histoire - Moderne */}
        <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 snap-section">
          {/* Gradient de transition depuis la vidéo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#faf9f7] to-[#faf9f7]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(42,115,73,0.03),transparent_50%)]" />
          <div className="container-custom relative z-10 max-w-6xl">
            <div className="grid md:grid-cols-5 gap-12 lg:gap-20 items-start">
              {/* Titre sur le côté avec éléments visuels */}
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div className="inline-block mb-2">
                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Notre parcours
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] leading-tight">
                    Notre histoire
                  </h2>
                  {/* Chiffres clés visuels */}
                  <div className="flex gap-6 pt-4">
                    <div>
                      <div className="text-3xl font-bold text-green-700">15</div>
                      <div className="text-xs text-[#1a1a1a]/50 uppercase tracking-wide mt-1">ans</div>
                    </div>
                    <div className="w-px bg-earth-200" />
                    <div>
                      <div className="text-3xl font-bold text-green-700">8</div>
                      <div className="text-xs text-[#1a1a1a]/50 uppercase tracking-wide mt-1">hectares</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu simplifié */}
              <div className="md:col-span-3">
                <div className="space-y-6">
                  <p className="text-xl text-[#1a1a1a]/80 leading-relaxed">
                    Il y a 15 ans, un rythme effréné au pied du périph. Puis un déclic, un départ vers la campagne.
                  </p>
                  <p className="text-lg text-[#1a1a1a]/70 leading-relaxed">
                    Aujourd'hui, 8 hectares transformés en écosystème vivant. Une mission : transmettre cette expérience.
                  </p>
                  
                  {/* Mots-clés modernes */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {['Autonomie', 'Transmission', 'Écosystème'].map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-earth-50 border border-green-200/50 rounded-full text-sm font-medium text-green-800 hover:border-green-300 hover:shadow-sm transition-all duration-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button as="a" href="/notre-histoire" size="lg" className="shadow-lg">
                      Découvrir notre histoire
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Séparation */}
        <div className="relative bg-white">
          <div className="container-custom">
            <div className="h-px bg-gray-200"></div>
          </div>
        </div>

        {/* Méthode PEBI - Sticky Split Layout */}
        <section className="relative pt-16 lg:pt-20 pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-white snap-section">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-earth-50/30" />
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24">
              {/* Partie gauche - Sticky (reste fixe sur l'écran pendant le scroll) */}
              <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:flex lg:flex-col lg:justify-center">
                <ScrollReveal direction="left">
                  <div className="space-y-6 mb-8">
                    <div className="inline-block">
                      <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800">
                        Notre méthode
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] leading-tight">
                      La méthode <span className="text-green-700">PEBI</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-md">
                      Une approche holistique qui allie permaculture, écosystèmes, biodiversité et innovation.
                    </p>
                  </div>
                  <div className="relative">
                    <GlassCard className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-green-50 to-earth-50 border-green-200/50 p-0">
                      <div className="relative w-full h-full">
                        <Image
                          src="/mandala.jpg"
                          alt="Méthode PEBI - Mandala permaculture"
                          fill
                          className="object-cover rounded-2xl"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
                      </div>
                    </GlassCard>
                  </div>
                </ScrollReveal>
              </div>

              {/* Partie droite - Scroll (défile) */}
              <div className="space-y-6 lg:space-y-8 lg:pt-16">
                <div className="grid gap-6 lg:gap-8">
                {[
                  {
                    letter: 'P',
                    title: 'Permaculture',
                    description: 'Design de systèmes agricoles inspirés des écosystèmes naturels. Création de jardins et fermes durables, productifs et autonomes.',
                    details: [
                      'Observation des cycles naturels',
                      'Design en zones et secteurs',
                      'Associations bénéfiques',
                      'Récupération et valorisation des ressources',
                    ],
                  },
                  {
                    letter: 'E',
                    title: 'Écosystèmes',
                    description: 'Compréhension et création d\'écosystèmes équilibrés où chaque élément interagit positivement avec les autres.',
                    details: [
                      'Diversité des espèces',
                      'Chaînes trophiques naturelles',
                      'Régulation naturelle des ravageurs',
                      'Résilience face aux perturbations',
                    ],
                  },
                  {
                    letter: 'B',
                    title: 'Biodiversité',
                    description: 'Favoriser la diversité biologique pour créer des systèmes robustes, productifs et adaptatifs.',
                    details: [
                      'Plantes compagnes',
                      'Habitats variés',
                      'Pollinisateurs et auxiliaires',
                      'Conservation des variétés locales',
                    ],
                  },
                  {
                    letter: 'I',
                    title: 'Innovation',
                    description: 'Allier savoir-faire traditionnels et techniques modernes pour créer des solutions adaptées à chaque contexte.',
                    details: [
                      'Techniques éprouvées',
                      'Adaptation au terrain',
                      'Expérimentation et observation',
                      'Transmission des connaissances',
                    ],
                  },
                ].map((item, index) => (
                  <ScrollReveal key={index} direction="up" delay={index * 80}>
                    <GlassCard className="bg-white/90 backdrop-blur-sm border-green-200/50 hover:border-green-300/50 hover:shadow-xl transition-all duration-300 group h-full min-h-[280px]">
                      <div className="flex flex-col sm:flex-row gap-6 h-full">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <span className="text-2xl lg:text-3xl font-bold text-white">{item.letter}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <h3 className="text-xl md:text-2xl font-serif text-[#1a1a1a] mb-3 group-hover:text-green-700 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-base text-[#1a1a1a]/70 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                          <ul className="space-y-2.5 flex-1">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-2.5 text-sm text-[#1a1a1a]/65">
                                <span className="text-green-600 mt-1 flex-shrink-0">•</span>
                                <span className="leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                ))}
                </div>

                {/* CTA */}
                <ScrollReveal direction="up" delay={320}>
                  <div className="pt-4">
                    <Button as="a" href="/pebi-formations" size="lg" className="shadow-xl w-full sm:w-auto">
                      Découvrir nos formations
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Formations & Chantiers */}
        <Section padding="xl" background="off-white" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.05),transparent_50%)]" />
          <div className="container-custom relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-earth-100 to-earth-50 rounded-full text-sm font-semibold text-earth-800">
                    Prochaines dates
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-6">
                  Formations & Chantiers
                </h2>
                <p className="text-xl text-[#1a1a1a]/70 max-w-2xl mx-auto">
                  Découvrez nos prochaines dates et participez à la création d'un écosystème vivant
                </p>
              </div>
            </ScrollReveal>

            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents.map((event, index) => (
                  <ScrollReveal key={event.id || index} direction="up" delay={index * 150}>
                    <GlassCard hover className="group h-full flex flex-col">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                              event.type === 'formation'
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                                : 'bg-gradient-to-r from-earth-500 to-earth-600 text-white shadow-lg'
                            }`}
                          >
                            {event.type === 'formation' ? 'Formation' : 'Chantier'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif text-[#1a1a1a] mb-4 group-hover:text-green-700 transition-colors flex-1">
                          {event.title}
                        </h3>
                        <p className="text-base text-[#1a1a1a]/60 font-medium mt-auto">
                          {new Date(event.startDate).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                          {event.endDate &&
                            ` - ${new Date(event.endDate).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                            })}`}
                        </p>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#1a1a1a]/60">Aucun événement à venir pour le moment.</p>
            )}

            <ScrollReveal direction="up" delay={600}>
              <div className="text-center mt-16">
                <Button as="a" href="/pebi-formations" size="lg" className="shadow-xl">
                  Voir tout le planning
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* Section Stats */}
        <Section padding="xl" background="white" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
          <div className="container-custom relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800">
                    Notre impact
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-6">
                  En quelques chiffres
                </h2>
                <p className="text-xl text-[#1a1a1a]/70 max-w-2xl mx-auto">
                  Notre parcours et notre communauté en quelques données clés
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {/* Première carte - Expérience */}
              <ScrollReveal direction="up" delay={0}>
                <GlassCard hover={false} className="text-center relative overflow-hidden group md:scale-90 bg-gradient-to-br from-green-700 via-green-800 to-green-900 border-green-600/50">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-white group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                      15
                    </div>
                    <div className="text-2xl font-semibold text-green-200 mb-4">ans</div>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-green-400/50 to-transparent mx-auto mb-4"></div>
                    <p className="text-lg text-white/90 font-semibold mb-3">
                      D'expérience
                    </p>
                    <p className="text-base text-white/70 leading-relaxed px-4 mb-4">
                      De pratique et d'apprentissage continu de la permaculture
                    </p>
                    <div className="space-y-2.5 text-left px-4">
                      <div className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Formations certifiées</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-green-300 mt-1">•</span>
                        <span>BPREA obtenu</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Stages et expérimentations</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
              
              {/* Carte réseaux sociaux combinée - Au centre et plus grande */}
              <ScrollReveal direction="up" delay={100}>
                <GlassCard className="text-center h-full hover:shadow-2xl transition-all duration-300 group relative overflow-hidden md:scale-110 bg-gradient-to-br from-green-700 via-green-800 to-green-900 border-green-600/50">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl text-white group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <div className="space-y-5 mb-6">
                      <a
                        href="https://www.instagram.com/perma_coach"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                          <div className="text-5xl md:text-6xl font-bold text-white">
                            141k
                          </div>
                        </div>
                        <p className="text-base text-white/80 font-medium">
                          Instagram
                        </p>
                      </a>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-24 mx-auto"></div>
                      <a
                        href="https://www.tiktok.com/@permacoach"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                          </svg>
                          <div className="text-5xl md:text-6xl font-bold text-white">
                            60k
                          </div>
                        </div>
                        <p className="text-base text-white/80 font-medium">
                          TikTok
                        </p>
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              {/* Troisième carte - Hectares */}
              <ScrollReveal direction="up" delay={200}>
                <GlassCard hover={false} className="text-center relative overflow-hidden group md:scale-90 bg-gradient-to-br from-green-700 via-green-800 to-green-900 border-green-600/50">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-white group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                      8
                    </div>
                    <div className="text-2xl font-semibold text-green-200 mb-4">hectares</div>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-green-400/50 to-transparent mx-auto mb-4"></div>
                    <p className="text-lg text-white/90 font-semibold mb-3">
                      De terrain transformé
                    </p>
                    <p className="text-base text-white/70 leading-relaxed px-4 mb-4">
                      D'un champ nu à un écosystème vivant et diversifié
                    </p>
                    <div className="space-y-2.5 text-left px-4">
                      <div className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Haies et mares créées</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Verger et potager</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Écosystème en construction</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </Section>

        {/* CTA Final */}
        <Section padding="xl" background="green" id="contact" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-green-50 to-earth-600/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(42,115,73,0.15),transparent_50%)]" />
          <div className="container-custom text-center relative z-10">
            <ScrollReveal direction="up">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-6 leading-tight">
                  Prêt à vous reconnecter à la terre ?
                </h2>
                <p className="text-xl text-[#1a1a1a]/80 mb-10 leading-relaxed">
                  Rejoignez-nous pour découvrir la permaculture, gagner en autonomie et créer un avenir plus durable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    as="a" 
                    href="/chantiers-participatifs" 
                    size="lg"
                    className="bg-green-700 hover:bg-green-800 text-white shadow-2xl"
                  >
                    Participer aux chantiers
                  </Button>
                  <Button 
                    as="a" 
                    href="/pebi-formations" 
                    variant="outline" 
                    size="lg"
                    className="bg-white/90 hover:bg-white text-[#1a1a1a] border-2 border-[#1a1a1a]/20 shadow-2xl"
                  >
                    Voir les formations
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
