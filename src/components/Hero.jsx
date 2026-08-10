import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import heroMobile from '../assets/hero-section-images/hero-mobile.png'
import heroCard from '../assets/hero-section-images/hero-card.png'
import employee1 from '../assets/hero-section-images/employees/e1.jpg'
import employee2 from '../assets/hero-section-images/employees/e2.jpeg'
import employee3 from '../assets/hero-section-images/employees/e3.jpeg'
import { useLanguage } from '../i18n/LanguageContext'
import ParticleBackground from './ParticleBackground'

const employeeAvatars = [employee1, employee2, employee3]

export default function Hero() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
  // Overlay card entry direction: Arabic slides in left -> right,
  // English slides in right -> left.
  const cardOffset = isRTL ? -90 : 90

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-brand-tint via-brand-tint to-white dark:from-[#0d1013] dark:via-[#111418] dark:to-[#0b0d10] pt-32 pb-16 sm:pt-40 sm:pb-20"
    >
      <ParticleBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-20 h-56 w-56 rounded-full bg-brand/10"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        {/* Side A — text content */}
        <div className="flex flex-col items-start text-start">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={logo}
            alt={t.hero.title}
            className="h-14 w-auto mb-6"
          />

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-body dark:text-gray-400"
          >
            {t.hero.subtitle}
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="https://scheduler.zoom.us/correct-team/correct" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-brand px-7 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-dark transition-colors"
            >
              {t.hero.cta}
            </motion.a>

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              href="#services"
              className="inline-flex items-center rounded-full border border-brand px-7 py-3 text-base font-semibold text-brand hover:bg-brand hover:text-white transition-colors"
            >
              {t.hero.servicesCta}
            </motion.a>
          </div>
        </div>

        {/* Side B — mobile mockup + overlay card, grouped and layered */}
        <div className="relative flex items-center justify-center h-[360px] sm:h-[440px] md:h-[520px]">
          <div
            aria-hidden="true"
            className="absolute h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-brand/20 blur-3xl"
          />

          {/* Phone stack: sized to the mockup itself so the card/badge anchor to its edges, not the wider column */}
          <div className="relative z-10 h-full w-fit">
            {/* Crop window: only the top 80% of the phone mockup's height is shown */}
            <div className="h-full w-fit overflow-hidden">
              <img
                src={heroMobile}
                alt={t.hero.title}
                className="h-[125%] w-auto drop-shadow-2xl"
              />
            </div>

            <motion.img
              initial={{ opacity: 0, x: cardOffset }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
              src={heroCard}
              alt=""
              aria-hidden="true"
              className="absolute z-20 top-[30%] end-0 sm:-end-6 w-48 sm:w-60 rounded-xl drop-shadow-xl"
            />

            {/* Team badge — opposite side to the overlay card, near the phone's lower half */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
              className="absolute z-20 bottom-[14%] start-0 sm:-start-6 flex items-center gap-2 rounded-full bg-[#0b0d10]/95 py-2 ps-2 pe-4 shadow-xl ring-1 ring-white/10 backdrop-blur-sm"
            >
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {employeeAvatars.map((avatar, i) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt=""
                    className="h-7 w-7 rounded-full border-2 border-[#0b0d10] object-cover"
                    style={{ zIndex: employeeAvatars.length - i }}
                  />
                ))}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">{t.hero.teamBadgeValue}</p>
                <p className="text-[11px] text-gray-400">{t.hero.teamBadgeLabel}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
