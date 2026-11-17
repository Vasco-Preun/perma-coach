'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  })
  return (
    <motion.form
      action="https://formsubmit.co/permacoach51@gmail.com"
      method="POST"
      className="space-y-6 max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={scaleIn}
    >
      <input type="hidden" name="_subject" value={formData.subject || "Nouveau message depuis le site"} />
      <input type="hidden" name="_url" value="https://www.lesjardinsduclos.com/contact" />
      <input type="hidden" name="_template" value="table" />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          id="name"
          name="name"
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
          name="email"
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
          name="phone"
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
          name="subject"
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
          name="message"
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
          name="consent"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 mr-3 w-4 h-4 rounded border-earth-300 text-green-700 focus:ring-green-500"
        />
        <label htmlFor="consent" className="text-sm text-[#1a1a1a]/70">
          J'accepte que mes données soient utilisées pour me recontacter *
        </label>
      </div>

      <p className="text-sm text-[#1a1a1a]/70">
        Vous allez être redirigé vers FormSubmit pour terminer l’envoi.
      </p>

      <Button
        type="submit"
        size="lg"
        className="w-full"
      >
        Envoyer
      </Button>
    </motion.form>
  )
}
