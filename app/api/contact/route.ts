import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getKV, setKV } from '@/lib/kv'

export async function POST(request: NextRequest) {
  let saved = false
  try {
    const data = await request.json().catch(() => null)
    if (!data || typeof data.name !== 'string' || !data.name.trim() || data.name.length > 200 ||
        typeof data.email !== 'string' || data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
        typeof data.message !== 'string' || !data.message.trim() || data.message.length > 10000 || data.consent !== true ||
        ['phone', 'subject', 'eventId', 'eventType'].some(key => data[key] !== undefined && (typeof data[key] !== 'string' || data[key].length > 500))) {
      return NextResponse.json({ error: 'Veuillez vérifier les champs obligatoires.' }, { status: 400 })
    }
    const from = process.env.CONTACT_FROM_EMAIL?.trim()
    if (!process.env.RESEND_API_KEY || !from || /@resend\.dev\b/i.test(from)) {
      console.error('Contact Resend:', { reason: 'sender-not-configured' })
      return NextResponse.json({ error: 'L’envoi est momentanément indisponible. Contactez-nous à permacoach51@gmail.com.' }, { status: 503 })
    }

    const contact = {
      name: data.name.trim(), email: data.email.trim(), phone: data.phone || '',
      subject: data.subject || '', message: data.message, consent: true,
      ...(data.eventType === 'chantier' && data.eventId ? {eventType: 'chantier', eventId: data.eventId} : {}),
    }
    // Never read or write production contacts from a Preview deployment.
    if (process.env.VERCEL_ENV !== 'preview') {
      const contacts = await getKV('contacts') || []
      contacts.push({ ...contact, date: new Date().toISOString() })
      await setKV('contacts', contacts)
      saved = true
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data: sent, error } = await resend.emails.send({
      from,
      to: 'permacoach51@gmail.com',
      reply_to: contact.email,
      subject: contact.subject || 'Nouveau message depuis le site',
      text: `Nom : ${contact.name}\nEmail : ${contact.email}\nTéléphone : ${contact.phone || 'Non renseigné'}\n` +
        (contact.eventId ? `Chantier : ${contact.eventId}\n` : '') +
        `\n${contact.message}\n\nConsentement au recontact : oui`,
    })
    if (error || !sent?.id) {
      console.error('Contact Resend:', { reason: error?.name || 'missing-message-id' })
      return NextResponse.json({ error: saved
        ? 'Votre demande a été enregistrée, mais la notification email a échoué. Contactez-nous à permacoach51@gmail.com.'
        : 'L’envoi n’a pas pu être confirmé. Contactez-nous à permacoach51@gmail.com.' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch {
    console.error('Contact Resend:', { reason: 'send-or-storage-failed' })
    return NextResponse.json({ error: saved
      ? 'Votre demande a été enregistrée, mais la notification email a échoué. Contactez-nous à permacoach51@gmail.com.'
      : 'L’envoi n’a pas pu être confirmé. Contactez-nous à permacoach51@gmail.com.' }, { status: 502 })
  }
}
