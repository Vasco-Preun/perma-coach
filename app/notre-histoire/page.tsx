import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import Section from '@/components/ui/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ParallaxSection from '@/components/ParallaxSection'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import GlassCard from '@/components/GlassCard'
import { getGalleryImages } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Notre histoire - Perma-coach',
  description: 'Découvrez notre parcours vers l\'autonomie et la reconnexion à la terre',
  openGraph: {
    title: 'Notre histoire - Perma-coach',
    description: 'Découvrez notre parcours vers l\'autonomie et la reconnexion à la terre',
  },
}

const chapters = [
  {
    id: 'declic',
    title: 'Le déclic',
    content: [
      'Il y a 15 ans, je travaillais à mon compte, dans un rythme effréné au pied du périph. Entre deux rendez-vous clients, je retrouvais mes écrans – sans vraiment lever la tête.',
      'Le week-end n\'apportait pas de répit et j\'étais incapable de faire une vraie pause.',
      'Puis la santé a commencé à vaciller, sérieusement. J\'ai commencé à douter, à lire les étiquettes, à questionner ce qu\'on mangeait.',
    ],
    quote: 'Petit à petit, la confiance dans le système alimentaire s\'est effondrée.',
  },
  {
    id: 'depart',
    title: 'Le départ',
    content: [
      'Ma femme, qui rêvait d\'arbres et de nature, m\'a dit un jour : "Viens, on part vivre à la campagne."',
      'Elle m\'a embarqué dans un petit village, avec une vieille maison pleine de charme… mais sans réseau, sans écran, sans travail immédiat.',
    ],
    quote: 'Alors j\'ai fait ce qu\'il restait à faire : je suis allé dans le jardin.',
  },
  {
    id: 'terre',
    title: 'La terre',
    content: [
      'La première année ? Je me suis formé avec des tutos YouTube. Résultat : une seule courgette, une !',
      'Mais je n\'ai pas abandonné, j\'ai lu, testé, échoué, appris.',
      'Et saison après saison, j\'ai construit notre autonomie, à force de patience et d\'observation.',
    ],
    quote: 'C\'est en cultivant que j\'ai compris cette chose de fondamental : Je ne jardinais pas uniquement pour ma famille.',
    additional: [
      'Le sol, l\'eau, les écosystèmes… le jardin m\'a ouvert les yeux sur des enjeux bien plus vastes.',
      'Rapidement, j\'ai acquis la certitude que mon avenir passerait par la terre, mais dans notre région, les terres ne se vendent pas facilement.',
      'Les agriculteurs d\'ici sont viscéralement attachés à leur foncier – et on les comprend.',
      'La terre, c\'est souvent une histoire de famille, de transmission, de racines. Alors on a attendu…',
      'J\'ai continué à cultiver dans notre jardin, colonisant de plus en plus l\'espace.',
    ],
  },
  {
    id: 'projet',
    title: 'Le projet',
    content: [
      'Et puis un jour, notre voisin et ami a annoncé qu\'il prendrait sa retraite 3 ans plus tard.',
      'Il vendait une petite parcelle : 8 hectares entièrement nus, sans arbre ni clôture, cultivés jusque-là en grande culture.',
      'Pour nous, il a démarré la conversion en bio pendant que je reprenais des formations, faisais des stages et obtenait mon BPREA.',
      'En 2024, on s\'est lancés et aujourd\'hui ce terrain vide est devenu un écosystème en construction :',
    ],
    list: ['des haies', 'des mares', 'des buttes', 'un verger', 'des légumes', 'des animaux…'],
    quote: 'Et moi, je me consacre pleinement à transmettre cette expérience, à accompagner celles et ceux qui veulent se reconnecter à la terre, gagner en autonomie, ou envisager une autre façon de vivre.',
  },
]

export default function NotreHistoirePage() {
  const galleryImages = getGalleryImages()

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center pt-32 pb-0 px-4 sm:px-6 lg:px-8 bg-transparent snap-section -mb-32">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src="/PERMACOACH8.JPG"
                alt=""
                className="w-full h-full object-cover"
                style={{ transform: 'translateY(-15%) scale(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between py-20 md:py-24 min-h-screen px-4 sm:px-6 lg:px-8">
            {/* Titre + Sous-titre + CTA en haut à gauche */}
            <div className="w-full max-w-2xl">
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-sans font-bold text-white drop-shadow-lg leading-none tracking-tight text-left mb-6">
                Notre
                <br />
                histoire
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-6 drop-shadow-md">
                Un parcours de transformation, de la ville à la terre
              </p>
              <Button
                as="a"
                href="/pebi-formations"
                size="lg"
                className="bg-white/95 hover:bg-white text-green-700 shadow-2xl font-semibold"
              >
                Découvrir la méthode PEBI
              </Button>
            </div>
          </div>
        </section>

        {/* Chapters */}
        {chapters.map((chapter, index) => (
          <Section
            key={chapter.id}
            id={chapter.id}
            padding="xl"
            background={index % 2 === 0 ? 'white' : 'off-white'}
            className={index === 0 ? "relative !pt-32" : "relative"}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(42,115,73,0.03),transparent_50%)]" />
            <div className="container-custom max-w-6xl relative z-10">
              <ScrollReveal direction="up">
                {chapter.id === 'declic' ? (
                  <>
                    <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 ${index % 2 === 0 ? 'items-center' : 'items-start'}`}>
                      {index % 2 === 1 ? (
                        <>
                          <div className="relative flex items-center order-1 md:order-1">
                            <div className="sticky top-24 w-full">
                              <div className="rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                  src="/overworked.jpg"
                                  alt="Le déclic - Rythme effréné"
                                  width={600}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed flex flex-col order-2 md:order-2">
                            <div className="mb-6">
                              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                                Chapitre {index + 1}
                              </span>
                              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                                {chapter.title}
                              </h2>
                            </div>
                            {chapter.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed flex flex-col order-1 md:order-1">
                            <div className="mb-6">
                              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                                Chapitre {index + 1}
                              </span>
                              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                                {chapter.title}
                              </h2>
                            </div>
                            {chapter.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                            ))}
                          </div>
                          <div className="relative flex items-center order-2 md:order-2">
                            <div className="sticky top-24 w-full">
                              <div className="rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                  src="/overworked.jpg"
                                  alt="Le déclic - Rythme effréné"
                                  width={600}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {chapter.quote && (
                      <ParallaxSection speed={0.2}>
                        <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 my-12">
                          <blockquote className="text-2xl md:text-3xl font-serif text-green-800 italic text-center py-6 leading-relaxed">
                            "{chapter.quote}"
                          </blockquote>
                        </GlassCard>
                      </ParallaxSection>
                    )}
                  </>
                ) : chapter.id === 'depart' ? (
                  <>
                    <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 ${index % 2 === 0 ? 'items-center' : 'items-start'}`}>
                      {index % 2 === 1 ? (
                        <>
                          <div className="relative flex items-start order-1 md:order-1">
                            <div className="sticky top-24 w-full">
                              <div className="rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                  src="/MANDALA2.jpg"
                                  alt="Le départ - Moving to countryside"
                                  width={600}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed flex flex-col order-2 md:order-2">
                            <div className="mb-6">
                              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                                Chapitre {index + 1}
                              </span>
                              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                                {chapter.title}
                              </h2>
                            </div>
                            {chapter.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed flex flex-col order-1 md:order-1">
                            <div className="mb-6">
                              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                                Chapitre {index + 1}
                              </span>
                              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                                {chapter.title}
                              </h2>
                            </div>
                            {chapter.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                            ))}
                          </div>
                          <div className="relative flex items-start order-2 md:order-2">
                            <div className="sticky top-24 w-full">
                              <div className="rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                  src="/MANDALA2.jpg"
                                  alt="Le départ - Moving to countryside"
                                  width={600}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {chapter.quote && (
                      <ParallaxSection speed={0.2}>
                        <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 my-12">
                          <blockquote className="text-2xl md:text-3xl font-serif text-green-800 italic text-center py-6 leading-relaxed">
                            "{chapter.quote}"
                          </blockquote>
                        </GlassCard>
                      </ParallaxSection>
                    )}
                  </>
                ) : chapter.id === 'terre' ? (
                  <>
                    <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 ${index % 2 === 0 ? 'items-center' : 'items-start'}`}>
                      {index % 2 === 1 ? (
                        <>
                          <div className="relative flex items-start order-1 md:order-1">
                            <div className="sticky top-24 w-full">
                              <div className="rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                  src="/COURGETTE.jpg"
                                  alt="La terre - Première courgette"
                                  width={600}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed flex flex-col order-2 md:order-2">
                            <div className="mb-6">
                              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                                Chapitre {index + 1}
                              </span>
                              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                                {chapter.title}
                              </h2>
                            </div>
                            {chapter.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed flex flex-col order-1 md:order-1">
                            <div className="mb-6">
                              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                                Chapitre {index + 1}
                              </span>
                              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                                {chapter.title}
                              </h2>
                            </div>
                            {chapter.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                            ))}
                          </div>
                          <div className="relative flex items-start order-2 md:order-2">
                            <div className="sticky top-24 w-full">
                              <div className="rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                  src="/COURGETTE.jpg"
                                  alt="La terre - Première courgette"
                                  width={600}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {chapter.quote && (
                      <ParallaxSection speed={0.2}>
                        <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 my-12">
                          <blockquote className="text-2xl md:text-3xl font-serif text-green-800 italic text-center py-6 leading-relaxed">
                            "{chapter.quote}"
                          </blockquote>
                        </GlassCard>
                      </ParallaxSection>
                    )}
                    
                    {chapter.additional && (
                      <div className="space-y-6 mt-6">
                        {chapter.additional.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </>
                ) : chapter.id === 'projet' ? (
                  <>
                    <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 ${index % 2 === 0 ? 'items-center' : 'items-start'}`}>
                      {index % 2 === 1 ? (
                        <>
                          <div className="relative flex items-start order-1 md:order-1">
                            <div className="sticky top-24 w-full">
                              <div className="rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                  src="/PERMACOACH35.JPG"
                                  alt="Le projet - Écosystème"
                                  width={600}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed flex flex-col order-2 md:order-2">
                            <div className="mb-6">
                              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                                Chapitre {index + 1}
                              </span>
                              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                                {chapter.title}
                              </h2>
                            </div>
                            {chapter.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                            ))}
                            
                            {chapter.list && (
                              <ul className="list-disc list-inside space-y-2 ml-4 mt-6">
                                {chapter.list.map((item, iIndex) => (
                                  <li key={iIndex} className="text-lg">{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed flex flex-col order-1 md:order-1">
                            <div className="mb-6">
                              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                                Chapitre {index + 1}
                              </span>
                              <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                                {chapter.title}
                              </h2>
                            </div>
                            {chapter.content.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                            ))}
                            
                            {chapter.list && (
                              <ul className="list-disc list-inside space-y-2 ml-4 mt-6">
                                {chapter.list.map((item, iIndex) => (
                                  <li key={iIndex} className="text-lg">{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="relative flex items-start order-2 md:order-2">
                            <div className="sticky top-24 w-full">
                              <div className="rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                  src="/PERMACOACH35.JPG"
                                  alt="Le projet - Écosystème"
                                  width={600}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {chapter.quote && (
                      <ParallaxSection speed={0.2}>
                        <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 my-12">
                          <blockquote className="text-2xl md:text-3xl font-serif text-green-800 italic text-center py-6 leading-relaxed">
                            "{chapter.quote}"
                          </blockquote>
                        </GlassCard>
                      </ParallaxSection>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800 mb-4">
                        Chapitre {index + 1}
                      </span>
                      <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                        {chapter.title}
                      </h2>
                    </div>
                    <div className="space-y-6 text-xl text-[#1a1a1a]/80 leading-relaxed">
                      {chapter.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-lg md:text-xl">{paragraph}</p>
                      ))}
                    </div>
                    
                    {chapter.list && (
                      <ul className="list-disc list-inside space-y-2 ml-4 mt-6">
                        {chapter.list.map((item, iIndex) => (
                          <li key={iIndex} className="text-lg">{item}</li>
                        ))}
                      </ul>
                    )}
                    
                    {chapter.quote && (
                      <ParallaxSection speed={0.2}>
                        <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 my-12">
                          <blockquote className="text-2xl md:text-3xl font-serif text-green-800 italic text-center py-6 leading-relaxed">
                            "{chapter.quote}"
                          </blockquote>
                        </GlassCard>
                      </ParallaxSection>
                    )}
                    
                    {chapter.additional && (
                      <div className="space-y-6 mt-6">
                        {chapter.additional.map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </ScrollReveal>
            </div>
          </Section>
        ))}

        {/* Galerie */}
        <Section padding="xl" background="off-white" id="galerie" snap className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.05),transparent_70%)]" />
          <div className="container-custom relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-earth-100 to-earth-50 rounded-full text-sm font-semibold text-earth-800">
                    Notre parcours
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-6">
                  Galerie
                </h2>
                <p className="text-xl text-[#1a1a1a]/70">
                  Découvrez notre parcours en images
                </p>
              </div>
            </ScrollReveal>
            <ParallaxSection speed={0.3}>
              <Gallery images={galleryImages} />
            </ParallaxSection>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
