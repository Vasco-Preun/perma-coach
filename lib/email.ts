import { Resend } from 'resend'

interface OrderData {
  id: string
  name: string
  email: string
  phone: string
  pickupType: 'farm' | 'delivery'
  pickupDate?: string
  address?: string
  items: Array<{
    name: string
    type: string
    price: number
    quantity: number
    category?: string
    unit?: string
  }>
  subtotal: number
  discount: number
  total: number
  notes?: string
  date: string
  status?: string
}

export async function sendOrderEmail(order: OrderData) {
  try {
    // Initialiser Resend avec la clé API
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Formater les items de la commande
    const itemsList = order.items.map(item => {
      const itemInfo = [
        `  • ${item.name}`,
        `    Type: ${item.type}`,
        `    Quantité: ${item.quantity}`,
        `    Prix unitaire: ${item.price.toFixed(2)}€`,
        `    Prix total: ${(item.price * item.quantity).toFixed(2)}€`,
      ]
      if (item.category) itemInfo.push(`    Catégorie: ${item.category}`)
      if (item.unit) itemInfo.push(`    Unité: ${item.unit}`)
      return itemInfo.join('\n')
    }).join('\n\n')

    // Formater le mode de récupération
    const pickupInfo = order.pickupType === 'farm'
      ? `Récupération à la ferme\nLa Chapelle Lasson, 20 rue Saint Fiacre`
      : `Livraison à Reims${order.address ? `\nAdresse: ${order.address}` : ''}`

    // Créer le contenu de l'email
    const emailSubject = `Nouvelle commande #${order.id} - ${order.name}`
    
    const emailText = `
Nouvelle commande reçue !

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom: ${order.name}
Email: ${order.email}
Téléphone: ${order.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MODE DE RÉCUPÉRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${pickupInfo}
${order.pickupDate ? `Date souhaitée: ${new Date(order.pickupDate).toLocaleDateString('fr-FR')}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMANDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉCAPITULATIF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sous-total: ${order.subtotal.toFixed(2)}€
Remise: ${order.discount.toFixed(2)}€
TOTAL: ${order.total.toFixed(2)}€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${order.notes ? `NOTES\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${order.notes}\n\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Numéro de commande: ${order.id}
Date de la commande: ${new Date(order.date).toLocaleString('fr-FR')}
Statut: ${order.status || 'En attente'}
`

    // Envoyer l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: 'Perma-coach <onboarding@resend.dev>', // Vous pouvez changer l'email après vérification du domaine
      to: 'permacoach51@gmail.com',
      subject: emailSubject,
      text: emailText,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Nouvelle commande reçue !</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Informations client</h3>
            <p><strong>Nom:</strong> ${order.name}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Téléphone:</strong> ${order.phone}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Mode de récupération</h3>
            <p>${pickupInfo.replace(/\n/g, '<br>')}</p>
            ${order.pickupDate ? `<p><strong>Date souhaitée:</strong> ${new Date(order.pickupDate).toLocaleDateString('fr-FR')}</p>` : ''}
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Commande</h3>
            ${order.items.map(item => `
              <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
                <p style="margin: 5px 0;"><strong>${item.name}</strong></p>
                <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">Type: ${item.type} | Quantité: ${item.quantity} | Prix unitaire: ${item.price.toFixed(2)}€</p>
                <p style="margin: 5px 0; color: #16a34a; font-weight: bold;">Prix total: ${(item.price * item.quantity).toFixed(2)}€</p>
              </div>
            `).join('')}
          </div>

          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Récapitulatif</h3>
            <p><strong>Sous-total:</strong> ${order.subtotal.toFixed(2)}€</p>
            <p><strong>Remise:</strong> ${order.discount.toFixed(2)}€</p>
            <p style="font-size: 18px; font-weight: bold; color: #16a34a; margin-top: 10px;"><strong>TOTAL: ${order.total.toFixed(2)}€</strong></p>
          </div>

          ${order.notes ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Notes</h3>
            <p style="white-space: pre-wrap;">${order.notes}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>Numéro de commande: <strong>${order.id}</strong></p>
            <p>Date de la commande: ${new Date(order.date).toLocaleString('fr-FR')}</p>
            <p>Statut: ${order.status || 'En attente'}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Erreur Resend:', error)
      throw error
    }

    console.log('Email envoyé avec succès via Resend:', data?.id)
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    throw error
  }
}
