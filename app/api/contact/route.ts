import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getKV, setKV } from '@/lib/kv'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json().catch(() => null)
    if (!data || typeof data.name !== 'string' || !data.name.trim() ||
        typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
        typeof data.message !== 'string' || !data.message.trim() || data.consent !== true) {
      return NextResponse.json({ error: 'Veuillez vérifier les champs obligatoires.' }, { status: 400 })
    }
    const from = process.env.CONTACT_FROM_EMAIL
    if (!process.env.RESEND_API_KEY || !from) {
      console.error('Contact: configuration email manquante')
      return NextResponse.json({ error: 'Envoi indisponible. Contactez-nous directement par email.' }, { status: 503 })
    }
    
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
      
      // Envoyer l'email
      const { data: emailData, error: emailError } = await resend.emails.send({
        from,
        to: 'permacoach51@gmail.com',
        reply_to: data.email,
        subject: emailSubject,
        text: emailText,
        // Use text content so visitor input cannot inject HTML into the email.
        html: undefined,
      })
      
      if (emailError) {
        console.error('Contact: refus Resend', emailError.name)
        return NextResponse.json({ error: 'Votre demande a été enregistrée, mais la notification email a échoué. Contactez-nous directement par email.' }, { status: 502 })
      } else {
        console.log('Email de contact envoyé avec succès:', emailData?.id)
      }
    } catch (emailError) {
      console.error('Contact: envoi email indisponible')
      return NextResponse.json({ error: 'Votre demande a été enregistrée, mais la notification email a échoué. Contactez-nous directement par email.' }, { status: 502 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact: sauvegarde indisponible')
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}


