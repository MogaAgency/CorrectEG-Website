import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SocialIcon from './SocialIcon'
import { whatsappNumber } from '../data/shared'
import { useLanguage } from '../i18n/LanguageContext'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsapp.ariaLabel}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        >
          <motion.span
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.6, repeat: 3, repeatDelay: 1 }}
            className="flex"
          >
            <SocialIcon name="WhatsApp" size={28} />
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
