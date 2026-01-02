import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Sauvegarder dans un fichier JSON (ou envoyer par email si configuré)
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
    
    // TODO: Ajouter l'envoi d'email ici si nécessaire
    // Exemple avec nodemailer ou service externe
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving contact:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}


