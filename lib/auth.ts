// Fonction utilitaire pour vérifier l'authentification admin
export function verifyAdminAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader) {
    return false
  }

  // Format attendu: "Bearer admin123" ou simplement le token
  const token = authHeader.replace('Bearer ', '')
  // Utiliser ADMIN_PASSWORD (côté serveur uniquement) ou fallback sur NEXT_PUBLIC pour compatibilité
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
  
  return token === ADMIN_PASSWORD
}

