import { NextResponse } from 'next/server'
import { isUsingKV } from '@/lib/kv'

export async function GET() {
  const diagnostics: any = {
    environment: process.env.NODE_ENV,
    isVercel: !!process.env.VERCEL,
    hasKVUrl: !!process.env.KV_REST_API_URL,
    hasKVToken: !!process.env.KV_REST_API_TOKEN,
    kvUrlPrefix: process.env.KV_REST_API_URL ? process.env.KV_REST_API_URL.substring(0, 20) + '...' : 'non défini',
    usingKV: false,
    error: null,
  }

  try {
    diagnostics.usingKV = await isUsingKV()
    
    // Tester l'import du module
    try {
      const kvModule = await import('@vercel/kv')
      diagnostics.kvModuleAvailable = !!kvModule.kv
    } catch (error) {
      diagnostics.kvModuleError = error instanceof Error ? error.message : 'Erreur inconnue'
    }
  } catch (error) {
    diagnostics.error = error instanceof Error ? error.message : 'Erreur inconnue'
  }

  return NextResponse.json(diagnostics, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

