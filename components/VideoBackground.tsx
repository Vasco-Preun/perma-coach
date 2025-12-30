'use client'

import { useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  src: string
  className?: string
}

export default function VideoBackground({ src, className = '' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // S'assurer que la vidéo est en lecture automatique, en boucle et muette
      video.play().catch((error) => {
        console.log('Erreur de lecture vidéo:', error)
      })
    }
  }, [])

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
      {/* Overlay gradient pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      {/* Effet de blur léger sur les bords pour plus de profondeur */}
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  )
}

