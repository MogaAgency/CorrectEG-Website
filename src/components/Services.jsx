import { motion } from 'framer-motion'
import { Boxes, BookOpenCheck, SearchCheck, Receipt, LineChart, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { softReveal } from '../lib/motion'
import ServicesTimeline from './ServicesTimeline'
import './Services.css'

const icons = {
  Boxes,
  BookOpenCheck,
  SearchCheck,
  Receipt,
  LineChart,
}

export default function Services() {
  const { t, language } = useLanguage()

  // Resolve each item's icon name to its component once, up front, so the
  // timeline stays a plain presentational component.
  const items = t.services.items.map((service) => ({
    ...service,
    icon: icons[service.icon],
  }))

  return (
    <section id="services" className="py-20 sm:py-28 bg-brand-tint border-t border-black/5 dark:bg-[#111418] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...softReveal()} className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.services.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.services.subtitle}</p>
        </motion.div>

        <ServicesTimeline items={items} isRTL={language === 'ar'} />

        <motion.div {...softReveal()} className="services-banner services-banner-bg mt-16 sm:mt-20">
          <p className="services-banner__text">{t.services.banner.text}</p>
          <a
            href="https://scheduler.zoom.us/correct-team/correct"
            target="_blank"
            rel="noopener noreferrer"
            className="services-banner__cta"
          >
            {t.services.banner.cta}
            <ArrowUpRight size={18} strokeWidth={2.25} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
