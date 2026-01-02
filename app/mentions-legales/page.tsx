import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Mentions légales - Perma-coach',
  description: 'Mentions légales du site Perma-coach',
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section padding="xl" background="white" className="relative">
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                Mentions légales
              </h1>
              <p className="text-sm text-[#1a1a1a]/60 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </ScrollReveal>

            <div className="prose prose-lg max-w-none space-y-8 text-[#1a1a1a]/80 leading-relaxed">
              <ScrollReveal direction="up" delay={100}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">1. Éditeur du site</h2>
                  <div className="space-y-3">
                    <p>
                      <strong>Dénomination :</strong> Perma-coach
                    </p>
                    <p>
                      <strong>Forme juridique :</strong> Exploitation agricole à responsabilité limitée (EARL)
                    </p>
                    <p>
                      <strong>Siège social :</strong> 8 hectares, 51100 Reims, France
                    </p>
                    <p>
                      <strong>Numéro SIRET :</strong> 123 456 789 00012 (exemple - à remplacer par le numéro réel)
                    </p>
                    <p>
                      <strong>Numéro SIREN :</strong> 123 456 789 (exemple - à remplacer par le numéro réel)
                    </p>
                    <p>
                      <strong>RCS :</strong> Reims B 123 456 789 (exemple - à remplacer par le numéro réel)
                    </p>
                    <p>
                      <strong>Numéro de TVA intracommunautaire :</strong> FR 12 123456789 (si applicable)
                    </p>
                    <p>
                      <strong>Capital social :</strong> 10 000 €
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">2. Coordonnées</h2>
                  <div className="space-y-3">
                    <p>
                      <strong>Adresse e-mail :</strong> contact@perma-coach.fr
                    </p>
                    <p>
                      <strong>Téléphone :</strong> Disponible sur demande via le formulaire de contact
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">3. Directeur de la publication</h2>
                  <p>
                    <strong>Nom :</strong> Sébastien
                  </p>
                  <p>
                    <strong>Qualité :</strong> Gérant de l'exploitation agricole Perma-coach
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">4. Hébergeur du site</h2>
                  <div className="space-y-3">
                    <p>
                      <strong>Dénomination :</strong> Vercel Inc.
                    </p>
                    <p>
                      <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                    </p>
                    <p>
                      <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 underline">https://vercel.com</a>
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={500}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">5. Propriété intellectuelle</h2>
                  <p className="mb-4">
                    L'ensemble du contenu du site Perma-coach (textes, images, graphismes, logo, icônes, vidéos, sons, logiciels, etc.) est la propriété exclusive de Perma-coach, sauf mention contraire.
                  </p>
                  <p className="mb-4">
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Perma-coach.
                  </p>
                  <p>
                    Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={600}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">6. Limitation de responsabilité</h2>
                  <p className="mb-4">
                    Perma-coach s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                  </p>
                  <p className="mb-4">
                    Tous les informations indiquées sur le site sont données à titre indicatif, et sont susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur le site ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.
                  </p>
                  <p>
                    Perma-coach ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={700}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">7. Liens hypertextes</h2>
                  <p className="mb-4">
                    Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site Perma-coach.
                  </p>
                  <p>
                    Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur. Aucune autorisation ni demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur. Il convient toutefois d'afficher ce site dans une nouvelle fenêtre du navigateur.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={800}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">8. Droit applicable et juridiction compétente</h2>
                  <p className="mb-4">
                    Les présentes mentions légales sont régies par le droit français.
                  </p>
                  <p>
                    En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={900}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">9. Contact</h2>
                  <p>
                    Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:contact@perma-coach.fr" className="text-green-700 hover:text-green-800 underline">contact@perma-coach.fr</a>
                  </p>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

