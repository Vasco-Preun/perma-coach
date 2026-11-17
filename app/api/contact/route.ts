import { NextRequest, NextResponse } from 'next/server'
import { getKV, setKV } from '@/lib/kv'

const FORM_URL = 'https://www.lesjardinsduclos.com/contact'
const RECIPIENT = 'permacoach51@gmail.com'

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

    // Preview must never read or write the production contact collection.
    if (process.env.VERCEL_ENV !== 'preview') {
      const contacts = await getKV('contacts') || []
      contacts.push({ ...data, date: new Date().toISOString() })
      await setKV('contacts', contacts)
      saved = true
    }

    const subject = data.subject || 'Nouveau message depuis le site'
    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || 'Non renseigné',
        subject,
        message: data.message,
        ...(data.eventType === 'chantier' && data.eventId ? { eventType: 'chantier', eventId: data.eventId } : {}),
        _subject: subject,
        _replyto: data.email,
        // A stable canonical URL avoids a different form identity for each preview.
        _url: FORM_URL,
        _template: 'table',
      }),
    })
    const result = await response.json().catch(() => null)
    const activationRequired = typeof result?.message === 'string' && /activat|activé|actived/i.test(result.message)
    if (activationRequired) {
      return NextResponse.json({ error: 'Le formulaire attend son activation par le propriétaire. Contactez-nous directement à permacoach51@gmail.com.' }, { status: 503 })
    }
    // FormSubmit can return HTTP 200 with success set to the string "false".
    if (!response.ok || (result?.success !== true && result?.success !== 'true')) {
      return NextResponse.json({ error: saved
        ? 'Votre demande a été enregistrée, mais la notification email a échoué. Contactez-nous à permacoach51@gmail.com.'
        : 'L’envoi n’a pas pu être confirmé. Contactez-nous à permacoach51@gmail.com.' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch {
    console.error('Contact: envoi ou sauvegarde indisponible')
    return NextResponse.json({ error: saved
      ? 'Votre demande a été enregistrée, mais la notification email a échoué. Contactez-nous à permacoach51@gmail.com.'
      : 'L’envoi n’a pas pu être confirmé. Contactez-nous à permacoach51@gmail.com.' }, { status: 502 })
  }
}
