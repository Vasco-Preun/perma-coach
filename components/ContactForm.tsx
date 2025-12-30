'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scaleIn } from '@/lib/animations'
import Button from '@/components/ui/Button'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  consent: boolean
}

export default function ContactForm({ onSubmit }: { onSubmit?: (data: ContactFormData) => Promise<void> }) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error('Erreur lors de l\'envoi')
      }
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', consent: false })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={scaleIn}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-[#1a1a1a]"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-[#1a1a1a]"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a1a] mb-2">
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-[#1a1a1a]"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#1a1a1a] mb-2">
          Sujet (optionnel)
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Ex: Formation permaculture, Chantier participatif..."
          className="w-full px-4 py-3 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-[#1a1a1a]"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-2">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-[#1a1a1a] resize-none"
        />
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 mr-3 w-4 h-4 rounded border-earth-300 text-green-700 focus:ring-green-500"
        />
        <label htmlFor="consent" className="text-sm text-[#1a1a1a]/70">
          J'accepte que mes données soient utilisées pour me recontacter *
        </label>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200"
          >
            Message envoyé avec succès ! Nous vous recontacterons bientôt.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200"
          >
            Une erreur est survenue. Veuillez réessayer.
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </Button>
    </motion.form>
  )
}
