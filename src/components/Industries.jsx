import { motion } from 'framer-motion'
import { Briefcase, Factory, Hammer, Handshake, ShoppingCart, Store, UtensilsCrossed } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const icons = {
  ShoppingCart,
  Store,
  Briefcase,
  Handshake,
  Hammer,
  Factory,
  UtensilsCrossed,
}

export default function Industries() {
  const { t } = useLanguage()

  return (
    <section id="industries" className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.industries.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.industries.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {t.industries.items.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-[#12161b] dark:hover:shadow-black/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <p className="text-sm font-semibold text-ink dark:text-white">
                  {item.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}