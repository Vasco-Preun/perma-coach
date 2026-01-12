import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getKV, setKV } from '@/lib/kv'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Sauvegarder dans KV (ou fichier JSON en local)
    const contacts = await getKV('contacts') || []
    contacts.push({
      ...data,
      date: new Date().toISOString(),
    })
    await setKV('contacts', contacts)
    
    // Envoyer un email avec Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      // Déterminer le sujet de l'email
      let emailSubject = data.subject || 'Nouveau message depuis le site'
      if (data.eventType === 'chantier' && data.eventId) {
        emailSubject = `Inscription au chantier : ${data.subject || 'Nouvelle inscription'}`
      }
      
      // Formater le contenu de l'email
      const emailText = data.eventType === 'chantier' && data.eventId
        ? `Nouvelle inscription au chantier\n\n` +
          `Nom: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Téléphone: ${data.phone || 'Non renseigné'}\n` +
          `\nMessage:\n${data.message || data.subject || ''}\n\n` +
          `Date de la demande: ${new Date().toLocaleString('fr-FR')}`
        : `Nouveau message depuis le site\n\n` +
          `Nom: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Téléphone: ${data.phone || 'Non renseigné'}\n` +
          `${data.subject ? `Sujet: ${data.subject}\n` : ''}` +
          `\nMessage:\n${data.message}\n\n` +
          `Date: ${new Date().toLocaleString('fr-FR')}`
      
      const emailHtml = data.eventType === 'chantier' && data.eventId
        ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">Nouvelle inscription au chantier</h2>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nom:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Téléphone:</strong> ${data.phone || 'Non renseigné'}</p>
            </div>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${data.message || data.subject || ''}</p>
            </div>
            <p style="color: #6b7280; font-size: 12px;">Date: ${new Date().toLocaleString('fr-FR')}</p>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">Nouveau message depuis le site</h2>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nom:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Téléphone:</strong> ${data.phone || 'Non renseigné'}</p>
              ${data.subject ? `<p><strong>Sujet:</strong> ${data.subject}</p>` : ''}
            </div>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
            <p style="color: #6b7280; font-size: 12px;">Date: ${new Date().toLocaleString('fr-FR')}</p>
          </div>
        `
      
      // Envoyer l'email
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Perma-coach <onboarding@resend.dev>',
        to: 'permacoach51@gmail.com',
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      })
      
      if (emailError) {
        console.error('Erreur Resend:', emailError)
      } else {
        console.log('Email de contact envoyé avec succès:', emailData?.id)
      }
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError)
      // Ne pas faire échouer la requête si l'email échoue
      // Le message est déjà sauvegardé
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving contact:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}


