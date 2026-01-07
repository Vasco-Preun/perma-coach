'use client'

import { useEffect, useRef } from 'react'

interface GoogleMapProps {
  address?: string
  lat?: number
  lng?: number
  zoom?: number
  height?: string
  className?: string
}

export default function GoogleMap({ 
  address = 'La Chapelle Lasson, 20 rue Saint Fiacre',
  lat,
  lng,
  zoom = 15,
  height = '400px',
  className = ''
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Si on a des coordonnées précises, on les utilise
    // Sinon, on utilise l'adresse
    const mapUrl = lat && lng
      ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${lat},${lng}&zoom=${zoom}`
      : `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(address)}&zoom=${zoom}`

    // Si pas de clé API, utiliser l'iframe simple
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      const simpleUrl = lat && lng
        ? `https://www.google.com/maps?q=${lat},${lng}&output=embed`
        : `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
      
      if (mapRef.current) {
        mapRef.current.innerHTML = `<iframe 
          width="100%" 
          height="${height}" 
          style="border:0; border-radius: 1.5rem;" 
          loading="lazy" 
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="${simpleUrl}">
        </iframe>`
      }
    } else {
      // Utiliser l'API Google Maps avec clé
      if (mapRef.current) {
        mapRef.current.innerHTML = `<iframe 
          width="100%" 
          height="${height}" 
          style="border:0; border-radius: 1.5rem;" 
          loading="lazy" 
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="${mapUrl}">
        </iframe>`
      }
    }
  }, [address, lat, lng, zoom, height])

  return (
    <div 
      ref={mapRef} 
      className={`w-full overflow-hidden rounded-3xl shadow-lg ${className}`}
      style={{ height }}
    />
  )
}

