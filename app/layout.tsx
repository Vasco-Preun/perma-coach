import type { Metadata } from 'next'
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Perma-coach - Transmission et permaculture',
  description: 'Accompagnement vers l\'autonomie et la reconnexion à la terre',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jakarta.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#faf9f7] text-[#1a1a1a] font-sans">
        {children}
      </body>
    </html>
  )
}

