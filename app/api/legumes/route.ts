import { NextRequest, NextResponse } from 'next/server'
import { getLegumes, saveLegumes } from '@/lib/data'

export async function GET() {
  try {
    const legumes = getLegumes()
    return NextResponse.json(legumes)
  } catch (error) {
    console.error('Error getting legumes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des légumes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const legumes = await request.json()
    saveLegumes(legumes)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving legumes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde des légumes' },
      { status: 500 }
    )
  }
}

