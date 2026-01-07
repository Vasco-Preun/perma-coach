import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Sauvegarder dans un fichier JSON
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const contactsFile = path.join(dataDir, 'contacts.json')
    const contacts = fs.existsSync(contactsFile) 
      ? JSON.parse(fs.readFileSync(contactsFile, 'utf-8'))
      : []
    
    contacts.push({
      ...data,
      date: new Date().toISOString(),
    })
    
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2))
    
    // Envoyer un email si c'est une inscription à un chantier
    if (data.eventType === 'chantier' && data.eventId) {
      try {
        // Utiliser mailto pour envoyer un email (solution simple)
        // En production, vous pouvez utiliser un service comme Resend, SendGrid, etc.
        const emailSubject = encodeURIComponent(data.subject || `Inscription au chantier`)
        const emailBody = encodeURIComponent(
          `Nouvelle inscription au chantier\n\n` +
          `Nom: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Téléphone: ${data.phone}\n` +
          `\nMessage:\n${data.message}\n\n` +
          `Date de la demande: ${new Date().toLocaleString('fr-FR')}`
        )
        
        // Pour l'instant, on sauvegarde juste les données
        // En production, intégrer avec un service d'email comme Resend:
        // const resend = new Resend(process.env.RESEND_API_KEY)
        // await resend.emails.send({
        //   from: 'noreply@perma-coach.fr',
        //   to: 'permacoach51@gmail.com',
        //   subject: emailSubject,
        //   text: emailBody,
        // })
        
        console.log('Email à envoyer à permacoach51@gmail.com:', {
          subject: emailSubject,
          body: emailBody
        })
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Ne pas faire échouer la requête si l'email échoue
      }
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


