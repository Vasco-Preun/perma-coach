import { NextResponse } from 'next/server'

// Contact forms now POST directly from the browser to FormSubmit.
// Retire the failed server relay without touching stored contacts.
export async function POST() {
  return NextResponse.json(
    { error: 'Veuillez recharger la page de contact pour utiliser le formulaire actuel.' },
    { status: 410 }
  )
}
