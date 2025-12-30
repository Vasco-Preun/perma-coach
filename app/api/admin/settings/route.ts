import { NextRequest, NextResponse } from 'next/server'
import { getSettings, saveSettings } from '@/lib/data'

export async function GET() {
  try {
    const settings = getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des paramètres' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()
    saveSettings(settings)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    )
  }
}

