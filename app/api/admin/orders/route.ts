import { NextRequest, NextResponse } from 'next/server'
import { getKV } from '@/lib/kv'
import { verifyAdminAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminAuth(request)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const orders = (await getKV('orders')) || []
    const normalized = Array.isArray(orders) ? orders : []

    // Tri du plus récent au plus ancien.
    const sorted = normalized.sort((a: any, b: any) => {
      const aDate = new Date(a?.paymentDate || a?.date || 0).getTime()
      const bDate = new Date(b?.paymentDate || b?.date || 0).getTime()
      return bDate - aDate
    })

    return NextResponse.json(sorted)
  } catch (error) {
    console.error('Erreur chargement commandes admin:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des commandes' },
      { status: 500 }
    )
  }
}

