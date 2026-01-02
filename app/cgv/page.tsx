import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - Perma-coach',
  description: 'Conditions Générales de Vente de Perma-coach',
}

export default function CGVPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section padding="xl" background="white" className="relative">
          <div className="container-custom max-w-4xl relative z-10">
            <ScrollReveal direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-8 leading-tight">
                Conditions Générales de Vente
              </h1>
              <p className="text-sm text-[#1a1a1a]/60 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </ScrollReveal>

            <div className="prose prose-lg max-w-none space-y-8 text-[#1a1a1a]/80 leading-relaxed">
              <ScrollReveal direction="up" delay={100}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 1 - Objet</h2>
                  <p className="mb-4">
                    Les présentes Conditions Générales de Vente (ci-après "CGV") ont pour objet de définir les conditions et modalités de vente des produits proposés par Perma-coach (ci-après "le Vendeur") sur le site internet www.perma-coach.fr (ci-après "le Site").
                  </p>
                  <p>
                    Toute commande passée sur le Site implique l'acceptation sans réserve des présentes CGV par l'acheteur (ci-après "le Client"). Ces conditions prévalent sur tout autre document, sauf accord écrit contraire.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 2 - Produits</h2>
                  <p className="mb-4">
                    Le Vendeur propose à la vente des légumes frais et des paniers de légumes issus de sa production agricole. Les produits sont cultivés selon les principes de la permaculture et de l'agriculture biologique.
                  </p>
                  <p className="mb-4">
                    Les produits proposés sont variables selon les saisons et les disponibilités des récoltes. Le contenu exact des paniers peut varier en fonction des conditions climatiques et des récoltes disponibles.
                  </p>
                  <p>
                    Les photographies et descriptions des produits sont fournies à titre indicatif et ne sauraient engager la responsabilité du Vendeur en cas d'écart avec le produit livré, notamment en ce qui concerne les variétés, les calibres ou les quantités, qui peuvent varier selon les récoltes.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 3 - Prix</h2>
                  <p className="mb-4">
                    Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC), sur chaque fiche produit du Site.
                  </p>
                  <p className="mb-4">
                    Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant sur le Site au jour de la commande sera le seul applicable à l'acheteur.
                  </p>
                  <p className="mb-4">
                    <strong>Panier minimum :</strong> Le montant minimum de commande est fixé à 15,00 € TTC.
                  </p>
                  <p>
                    <strong>Réduction automatique :</strong> Une réduction de 15% est automatiquement appliquée lorsque le montant total de la commande (avant réduction) dépasse 25,00 € TTC. Cette réduction est calculée automatiquement et visible dans le panier avant validation de la commande.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 4 - Processus de commande</h2>
                  <p className="mb-4">
                    Le Client sélectionne les produits qu'il souhaite commander et les ajoute à son panier. Il peut à tout moment modifier son panier avant validation.
                  </p>
                  <p className="mb-4">
                    Pour valider sa commande, le Client doit :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li>Remplir le formulaire de commande avec ses coordonnées complètes</li>
                    <li>Vérifier le récapitulatif de sa commande (produits, quantités, prix total)</li>
                    <li>Accepter les présentes CGV</li>
                    <li>Effectuer le paiement selon les modalités prévues à l'article 5</li>
                  </ul>
                  <p className="mb-4">
                    Toute commande vaut acceptation des prix et descriptions des produits disponibles à la vente, tels qu'ils apparaissent sur le Site au moment de la commande.
                  </p>
                  <p>
                    La commande ne sera considérée comme définitive qu'après l'envoi au Client de la confirmation de l'acceptation de la commande par le Vendeur par courrier électronique, après réception du paiement.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={500}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 5 - Paiement</h2>
                  <p className="mb-4">
                    Le paiement est exigible immédiatement à la commande. Le Client peut effectuer le règlement par :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li>Carte bancaire (via le système de paiement sécurisé Stripe ou PayPal)</li>
                    <li>Virement bancaire (sur demande et après validation du Vendeur)</li>
                  </ul>
                  <p className="mb-4">
                    Les transactions sont sécurisées par les prestataires de paiement mentionnés ci-dessus. Le Vendeur ne conserve pas les données bancaires du Client.
                  </p>
                  <p>
                    En cas de défaut de paiement, de refus d'autorisation de paiement par carte bancaire ou de tout autre incident, la commande sera automatiquement annulée.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={600}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 6 - Livraison</h2>
                  <p className="mb-4">
                    <strong>Zone de livraison :</strong> Les produits sont à récupérer sur place à Reims (51100) et ses environs. Le lieu exact de récupération sera communiqué au Client après validation de la commande.
                  </p>
                  <p className="mb-4">
                    <strong>Modalités de récupération :</strong> Le Client doit indiquer lors de la commande une date de récupération souhaitée. Le Vendeur confirmera cette date par courrier électronique ou téléphone dans les meilleurs délais.
                  </p>
                  <p className="mb-4">
                    <strong>Délais :</strong> Les délais de récupération sont indicatifs et peuvent varier en fonction des disponibilités des produits et des contraintes de récolte. Le Vendeur s'engage à informer le Client de tout retard éventuel.
                  </p>
                  <p>
                    Le Client est tenu de récupérer sa commande dans les délais convenus. En cas d'absence ou de non-récupération dans un délai raisonnable, le Vendeur se réserve le droit de facturer des frais de stockage ou de proposer une nouvelle date de récupération.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={700}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 7 - Droit de rétractation</h2>
                  <p className="mb-4">
                    Conformément aux dispositions de l'article L.221-28 du Code de la consommation, le droit de rétractation prévu aux articles L.221-18 et suivants du Code de la consommation ne peut être exercé pour :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li>Les contrats de fourniture de biens qui sont confectionnés selon les spécifications du consommateur ou nettement personnalisés</li>
                    <li>Les contrats de fourniture de biens susceptibles de se détériorer ou de se périmer rapidement</li>
                    <li>Les contrats de fourniture de denrées alimentaires</li>
                  </ul>
                  <p>
                    Par conséquent, les produits proposés par le Vendeur étant des denrées alimentaires périssables (légumes frais), le Client ne dispose pas du droit de rétractation prévu par le Code de la consommation.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={800}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 8 - Annulation et remboursement</h2>
                  <p className="mb-4">
                    <strong>Annulation par le Client :</strong> Le Client peut annuler sa commande avant la date de récupération convenue, sous réserve d'en informer le Vendeur par courrier électronique à l'adresse contact@perma-coach.fr au moins 48 heures avant la date prévue.
                  </p>
                  <p className="mb-4">
                    En cas d'annulation dans les délais, le remboursement sera effectué selon les modalités suivantes :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li>Si le paiement a été effectué par carte bancaire : remboursement sur la carte bancaire utilisée dans un délai de 14 jours ouvrés</li>
                    <li>Si le paiement a été effectué par virement : remboursement par virement bancaire dans un délai de 14 jours ouvrés</li>
                  </ul>
                  <p className="mb-4">
                    <strong>Annulation par le Vendeur :</strong> Le Vendeur se réserve le droit d'annuler toute commande en cas d'indisponibilité des produits, de force majeure ou de cas exceptionnels. Dans ce cas, le Client sera intégralement remboursé dans les meilleurs délais.
                  </p>
                  <p>
                    <strong>Non-récupération :</strong> En cas de non-récupération de la commande par le Client à la date convenue, sans annulation préalable, aucun remboursement ne sera effectué.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={900}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 9 - Garanties et responsabilité</h2>
                  <p className="mb-4">
                    <strong>Garantie légale de conformité :</strong> Les produits bénéficient de la garantie légale de conformité prévue aux articles L.217-4 à L.217-14 du Code de la consommation, ainsi que de la garantie des vices cachés prévue aux articles 1641 à 1648 et 2232 du Code civil.
                  </p>
                  <p className="mb-4">
                    <strong>Responsabilité du Vendeur :</strong> Le Vendeur s'engage à livrer des produits conformes à la commande et aux descriptions figurant sur le Site. La responsabilité du Vendeur ne saurait être engagée en cas de non-conformité résultant d'une mauvaise conservation des produits par le Client après récupération.
                  </p>
                  <p>
                    Le Vendeur ne saurait être tenu responsable des dommages indirects résultant de l'utilisation des produits, notamment des pertes de profits, de clientèle, de données ou de tout autre dommage indirect.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1000}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 10 - Force majeure</h2>
                  <p>
                    Le Vendeur ne pourra être tenu responsable de tout retard ou défaillance dans l'exécution de la commande résultant d'un cas de force majeure ou de tout événement indépendant de sa volonté, notamment : intempéries, grèves, conflits sociaux, pannes, accidents, restrictions gouvernementales, épidémies, ou tout autre événement imprévisible et insurmontable.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1100}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 11 - Données personnelles</h2>
                  <p className="mb-4">
                    Les données personnelles collectées lors de la commande sont nécessaires au traitement de celle-ci et à l'établissement de la facture. Elles sont conservées dans des conditions sécurisées et ne sont utilisées que dans le cadre de la gestion de la relation commerciale.
                  </p>
                  <p>
                    Conformément à la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD), le Client dispose d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles le concernant. Pour exercer ces droits, le Client peut contacter le Vendeur à l'adresse : contact@perma-coach.fr.
                  </p>
                  <p className="mt-4">
                    Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-green-700 hover:text-green-800 underline">Politique de confidentialité</a>.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1200}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 12 - Propriété intellectuelle</h2>
                  <p>
                    Tous les éléments du Site, qu'ils soient visuels ou sonores, y compris la technologie sous-jacente, sont protégés par le droit d'auteur, des marques ou des brevets. Ils sont la propriété exclusive du Vendeur. Toute reproduction totale ou partielle du Site est strictement interdite.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1300}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 13 - Loi applicable et règlement des litiges</h2>
                  <p className="mb-4">
                    Les présentes CGV sont régies par le droit français.
                  </p>
                  <p className="mb-4">
                    <strong>Médiation :</strong> Conformément aux articles L.611-1 et R.612-1 et suivants du Code de la consommation, si le Client est un consommateur, il a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige qui l'oppose au Vendeur.
                  </p>
                  <p className="mb-4">
                    Le Client peut contacter le médiateur suivant :
                  </p>
                  <p className="ml-4 mb-4">
                    Médiateur de la consommation<br />
                    Centre de la Médiation de la Consommation de Conciliateurs de Justice (CM2C)<br />
                    14 rue Saint Jean, 75017 Paris<br />
                    Site web : <a href="https://www.cm2c.net" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 underline">www.cm2c.net</a>
                  </p>
                  <p>
                    À défaut de résolution amiable, le litige sera porté devant les tribunaux compétents du ressort du siège social du Vendeur, conformément aux règles de compétence en vigueur.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1400}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 14 - Acceptation des CGV</h2>
                  <p className="mb-4">
                    L'acceptation des présentes CGV est matérialisée par une case à cocher lors du processus de commande. Cette acceptation est un préalable indispensable à toute commande.
                  </p>
                  <p>
                    Le fait de valider sa commande implique l'acceptation pleine et entière des présentes CGV.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1500}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 15 - Modification des CGV</h2>
                  <p className="mb-4">
                    Le Vendeur se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur au jour de la commande.
                  </p>
                  <p>
                    Il est conseillé au Client de consulter régulièrement la dernière version des CGV disponible sur le Site.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1600}>
                <section>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4 mt-8">Article 16 - Contact</h2>
                  <p>
                    Pour toute question concernant les présentes CGV, le Client peut contacter le Vendeur à l'adresse suivante : <a href="mailto:contact@perma-coach.fr" className="text-green-700 hover:text-green-800 underline">contact@perma-coach.fr</a>
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


