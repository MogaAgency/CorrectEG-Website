import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-tint dark:bg-[#111418] pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-20 h-56 w-56 rounded-full bg-brand/10"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        <motion.img
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={logo}
          alt={t.hero.title}
          className="h-56 w-auto mb-6"
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-body dark:text-gray-400"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="https://scheduler.zoom.us/correct-team/correct" target="_blank" rel="noopener noreferrer"
          className="mt-8 inline-flex items-center rounded-full bg-brand px-7 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-dark transition-colors"
        >
          {t.hero.cta}
        </motion.a>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          href="#services"
          className="mt-4 inline-flex items-center rounded-full border border-brand px-7 py-3 text-base font-semibold text-brand hover:bg-brand hover:text-white transition-colors"
        >
          {t.hero.servicesCta}
        </motion.a>
      </div>
    </section>
  )
}
