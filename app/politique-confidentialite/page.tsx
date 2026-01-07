import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Perma-coach',
  description: 'Politique de confidentialité et protection des données personnelles de Perma-coach',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section padding="xl" background="white" className="relative">
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                Politique de confidentialité
              </h1>
              <p className="text-sm text-[#1a1a1a]/60 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </ScrollReveal>

            <div className="prose prose-lg max-w-none space-y-8 text-[#1a1a1a]/80 leading-relaxed">
              <ScrollReveal direction="up" delay={100}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">1. Introduction</h2>
                  <p className="mb-4">
                    Perma-coach (ci-après "nous", "notre" ou "le Site") s'engage à protéger la confidentialité et la sécurité des données personnelles de ses utilisateurs et clients (ci-après "vous" ou "l'utilisateur").
                  </p>
                  <p>
                    La présente politique de confidentialité a pour objet de vous informer sur la manière dont nous collectons, utilisons, partageons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">2. Responsable du traitement</h2>
                  <p className="mb-4">
                    Le responsable du traitement des données personnelles est :
                  </p>
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-200/50 mb-4">
                    <p className="mb-2"><strong>Perma-coach</strong></p>
                    <p className="mb-2">EARL - Exploitation agricole à responsabilité limitée</p>
                    <p className="mb-2">La Chapelle Lasson, 20 rue Saint Fiacre</p>
                    <p className="mb-2">Email : <a href="mailto:contact@perma-coach.fr" className="text-green-700 hover:text-green-800 underline">contact@perma-coach.fr</a></p>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">3. Données collectées</h2>
                  <p className="mb-4">
                    Nous collectons les données personnelles suivantes :
                  </p>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">3.1. Données collectées lors de la commande</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Nom et prénom</li>
                      <li>Adresse postale (pour la facturation et la récupération)</li>
                      <li>Adresse e-mail</li>
                      <li>Numéro de téléphone</li>
                      <li>Date de récupération souhaitée</li>
                      <li>Notes et commentaires éventuels</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">3.2. Données collectées lors du paiement</h3>
                    <p className="ml-4">
                      Les données de paiement (numéro de carte bancaire, coordonnées bancaires) sont collectées et traitées exclusivement par nos prestataires de paiement sécurisés (Stripe, PayPal). Nous ne conservons pas ces données sur nos serveurs.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">3.3. Données collectées lors de l'utilisation du formulaire de contact</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Nom et prénom</li>
                      <li>Adresse e-mail</li>
                      <li>Numéro de téléphone (optionnel)</li>
                      <li>Message</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">3.4. Données de navigation</h3>
                    <p className="ml-4">
                      Lors de votre visite sur le Site, nous collectons automatiquement certaines données techniques (adresse IP, type de navigateur, pages visitées, durée de visite) via des cookies et technologies similaires, dans le respect de votre consentement.
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">4. Finalités du traitement</h2>
                  <p className="mb-4">
                    Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><strong>Gestion des commandes :</strong> traitement, suivi et exécution de vos commandes</li>
                    <li><strong>Facturation :</strong> établissement et envoi des factures</li>
                    <li><strong>Livraison :</strong> organisation de la récupération des produits</li>
                    <li><strong>Relation client :</strong> réponse à vos demandes, gestion des réclamations et du service après-vente</li>
                    <li><strong>Paiement :</strong> traitement sécurisé des paiements via nos prestataires</li>
                    <li><strong>Obligations légales :</strong> respect des obligations comptables et fiscales</li>
                    <li><strong>Amélioration du service :</strong> analyse statistique et amélioration de l'expérience utilisateur</li>
                    <li><strong>Communication :</strong> envoi d'informations relatives à votre commande (uniquement si nécessaire à l'exécution du contrat)</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={500}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">5. Base légale du traitement</h2>
                  <p className="mb-4">
                    Le traitement de vos données personnelles est fondé sur les bases légales suivantes :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><strong>Exécution d'un contrat :</strong> pour la gestion de votre commande et l'exécution de nos obligations contractuelles</li>
                    <li><strong>Obligation légale :</strong> pour le respect de nos obligations comptables, fiscales et de conservation des données</li>
                    <li><strong>Consentement :</strong> pour l'utilisation de cookies non essentiels et l'envoi de communications commerciales (si vous y avez consenti)</li>
                    <li><strong>Intérêt légitime :</strong> pour l'amélioration de nos services et la prévention de la fraude</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={600}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">6. Destinataires des données</h2>
                  <p className="mb-4">
                    Vos données personnelles sont destinées à :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><strong>Perma-coach :</strong> personnel autorisé pour la gestion des commandes et la relation client</li>
                    <li><strong>Prestataires de paiement :</strong> Stripe et PayPal pour le traitement sécurisé des paiements</li>
                    <li><strong>Hébergeur du site :</strong> Vercel Inc. pour l'hébergement du Site</li>
                    <li><strong>Autorités compétentes :</strong> en cas d'obligation légale ou de réquisition judiciaire</li>
                  </ul>
                  <p>
                    Nous ne vendons, ne louons ni ne cédons vos données personnelles à des tiers à des fins commerciales.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={700}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">7. Durée de conservation</h2>
                  <p className="mb-4">
                    Vos données personnelles sont conservées pour les durées suivantes :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><strong>Données de commande :</strong> 10 ans à compter de la dernière transaction (obligation comptable et fiscale)</li>
                    <li><strong>Données de contact :</strong> 3 ans à compter du dernier contact</li>
                    <li><strong>Données de navigation (cookies) :</strong> 13 mois maximum</li>
                    <li><strong>Données de paiement :</strong> conservées par nos prestataires selon leurs propres politiques de conservation</li>
                  </ul>
                  <p>
                    Passé ces délais, vos données sont supprimées ou anonymisées de manière sécurisée.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={800}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">8. Sécurité des données</h2>
                  <p className="mb-4">
                    Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li>L'accès non autorisé</li>
                    <li>La perte ou la destruction accidentelle</li>
                    <li>La modification ou la divulgation non autorisée</li>
                  </ul>
                  <p className="mb-4">
                    Ces mesures incluent notamment :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li>Chiffrement des données sensibles</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Sauvegardes régulières</li>
                    <li>Mise à jour régulière des systèmes de sécurité</li>
                    <li>Utilisation de prestataires de paiement certifiés (PCI-DSS pour les cartes bancaires)</li>
                  </ul>
                  <p>
                    Toutefois, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée. Nous ne pouvons garantir une sécurité absolue, mais nous nous engageons à prendre toutes les mesures raisonnables pour protéger vos données.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={900}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">9. Vos droits</h2>
                  <p className="mb-4">
                    Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants concernant vos données personnelles :
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">9.1. Droit d'accès</h3>
                      <p className="ml-4">
                        Vous avez le droit d'obtenir la confirmation que des données personnelles vous concernant sont ou ne sont pas traitées, et d'obtenir une copie de ces données.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">9.2. Droit de rectification</h3>
                      <p className="ml-4">
                        Vous avez le droit d'obtenir la rectification des données inexactes vous concernant et de compléter des données incomplètes.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">9.3. Droit à l'effacement ("droit à l'oubli")</h3>
                      <p className="ml-4">
                        Vous avez le droit d'obtenir l'effacement de vos données personnelles dans certains cas (données non nécessaires, retrait du consentement, etc.), sous réserve des obligations légales de conservation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">9.4. Droit à la limitation du traitement</h3>
                      <p className="ml-4">
                        Vous avez le droit d'obtenir la limitation du traitement de vos données dans certains cas.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">9.5. Droit à la portabilité</h3>
                      <p className="ml-4">
                        Vous avez le droit de recevoir vos données personnelles dans un format structuré et couramment utilisé, et de les transmettre à un autre responsable de traitement.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">9.6. Droit d'opposition</h3>
                      <p className="ml-4">
                        Vous avez le droit de vous opposer au traitement de vos données personnelles pour des motifs légitimes, notamment pour des finalités de prospection commerciale.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">9.7. Droit de retirer votre consentement</h3>
                      <p className="ml-4">
                        Lorsque le traitement est fondé sur votre consentement, vous avez le droit de le retirer à tout moment, sans affecter la licéité du traitement effectué avant le retrait.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">9.8. Droit de définir des directives post-mortem</h3>
                      <p className="ml-4">
                        Vous avez le droit de définir des directives relatives au sort de vos données personnelles après votre décès.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-6 bg-green-50 rounded-2xl border border-green-200/50">
                    <p className="font-semibold mb-2">Pour exercer vos droits :</p>
                    <p>
                      Vous pouvez nous contacter par e-mail à l'adresse : <a href="mailto:contact@perma-coach.fr" className="text-green-700 hover:text-green-800 underline">contact@perma-coach.fr</a>
                    </p>
                    <p className="mt-2">
                      Nous nous engageons à répondre à votre demande dans un délai d'un mois. Si nécessaire, nous pouvons demander une preuve d'identité pour vérifier votre identité avant de traiter votre demande.
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1000}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">10. Cookies</h2>
                  <p className="mb-4">
                    Le Site utilise des cookies pour améliorer votre expérience de navigation. Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site.
                  </p>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">10.1. Types de cookies utilisés</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Cookies strictement nécessaires :</strong> indispensables au fonctionnement du Site (gestion du panier, authentification)</li>
                      <li><strong>Cookies de performance :</strong> pour analyser l'utilisation du Site et améliorer nos services (avec votre consentement)</li>
                      <li><strong>Cookies de fonctionnalité :</strong> pour mémoriser vos préférences (avec votre consentement)</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">10.2. Gestion des cookies</h3>
                    <p className="ml-4">
                      Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. Le refus des cookies peut entraîner l'impossibilité d'accéder à certaines fonctionnalités du Site.
                    </p>
                  </div>
                  <p>
                    Pour plus d'informations sur la gestion des cookies, consultez les paramètres de votre navigateur ou le site de la CNIL : <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 underline">www.cnil.fr</a>
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1100}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">11. Transferts de données hors UE</h2>
                  <p>
                    Vos données personnelles sont hébergées en Europe. En cas de transfert de données vers des pays situés hors de l'Union Européenne (notamment pour l'hébergement par Vercel Inc. aux États-Unis), nous nous assurons que des garanties appropriées sont mises en place conformément au RGPD (clauses contractuelles types, Privacy Shield, etc.).
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1200}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">12. Réclamation auprès de la CNIL</h2>
                  <p>
                    Si vous estimez que le traitement de vos données personnelles constitue une violation de la réglementation, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
                  </p>
                  <div className="mt-4 p-6 bg-green-50 rounded-2xl border border-green-200/50">
                    <p className="mb-2"><strong>CNIL</strong></p>
                    <p className="mb-2">3 Place de Fontenoy - TSA 80715</p>
                    <p className="mb-2">75334 PARIS CEDEX 07</p>
                    <p className="mb-2">Téléphone : 01 53 73 22 22</p>
                    <p>Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 underline">www.cnil.fr</a></p>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1300}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">13. Modification de la politique de confidentialité</h2>
                  <p className="mb-4">
                    Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment pour refléter les changements dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.
                  </p>
                  <p>
                    Toute modification sera publiée sur cette page avec une indication de la date de dernière mise à jour. Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance de la politique de confidentialité en vigueur.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1400}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">14. Contact</h2>
                  <p>
                    Pour toute question concernant la présente politique de confidentialité ou le traitement de vos données personnelles, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:contact@perma-coach.fr" className="text-green-700 hover:text-green-800 underline">contact@perma-coach.fr</a>
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


