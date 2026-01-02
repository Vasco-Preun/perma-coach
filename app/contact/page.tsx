import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ContactForm from '@/components/ContactForm'
import GlassCard from '@/components/GlassCard'

export const metadata: Metadata = {
  title: 'Contact - Perma-coach',
  description: 'Contactez-nous pour en savoir plus sur nos formations et chantiers participatifs',
  openGraph: {
    title: 'Contact - Perma-coach',
    description: 'Contactez-nous pour en savoir plus sur nos formations et chantiers participatifs',
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section padding="xl" background="green" className="relative overflow-hidden" snap>
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-earth-50/30" />
          <div className="container-custom relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm font-semibold text-green-800">
                    Contactez-nous
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1a1a1a] mb-6 leading-tight">
                  Une question ?
                  <br />
                  <span className="text-green-700">Écrivons-nous</span>
                </h1>
                <p className="text-xl md:text-2xl text-[#1a1a1a]/70 leading-relaxed">
                  Nous sommes là pour répondre à vos questions sur nos formations, chantiers participatifs ou la méthode PEBI.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* Formulaire de contact */}
        <Section padding="xl" background="white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,115,73,0.03),transparent_50%)]" />
          <div className="container-custom relative z-10 max-w-4xl">
            <div className="grid md:grid-cols-3 gap-12 items-start">
              {/* Informations de contact */}
              <ScrollReveal direction="left" className="md:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-4">
                      Informations
                    </h2>
                    <p className="text-[#1a1a1a]/70 leading-relaxed">
                      Remplissez le formulaire ci-contre ou contactez-nous directement.
                    </p>
                  </div>
                  
                  <GlassCard className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wider mb-2">
                          Réponse rapide
                        </h3>
                        <p className="text-sm text-[#1a1a1a]/70">
                          Nous répondons généralement sous 24-48h.
                        </p>
                      </div>
                      <div className="h-px bg-green-200/50"></div>
                      <div>
                        <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wider mb-2">
                          Sujets fréquents
                        </h3>
                        <ul className="space-y-2 text-sm text-[#1a1a1a]/70">
                          <li>• Formations et dates</li>
                          <li>• Chantiers participatifs</li>
                          <li>• Méthode PEBI</li>
                          <li>• Inscriptions</li>
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </ScrollReveal>

              {/* Formulaire */}
              <ScrollReveal direction="right" className="md:col-span-2">
                <GlassCard className="bg-white/90 backdrop-blur-sm border-green-200/50 p-8 md:p-12">
                  <ContactForm />
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </Section>

        {/* Section CTA alternative */}
        <Section padding="xl" background="off-white" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-earth-50/20" />
          <div className="container-custom relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">
                  Autres façons de nous suivre
                </h2>
                <p className="text-xl text-[#1a1a1a]/70 mb-8 leading-relaxed">
                  Retrouvez-nous sur les réseaux sociaux pour suivre notre aventure permaculturelle au quotidien.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://www.instagram.com/perma_coach"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@permacoach"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    TikTok
                  </a>
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


