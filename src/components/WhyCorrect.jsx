import { motion } from 'framer-motion'
import { BarChart3, Compass, Layers, LifeBuoy } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const icons = {
  Layers,
  Compass,
  BarChart3,
  LifeBuoy,
}

export default function WhyCorrect() {
  const { t } = useLanguage()

  return (
    <section id="why-correct" className="py-20 sm:py-28 bg-brand-tint border-t border-black/5 dark:bg-[#111418] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.whyCorrect.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.whyCorrect.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.whyCorrect.items.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="flex items-start gap-5 rounded-2xl border border-black/5 bg-white p-6 text-start shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-black/5 dark:border-white/10 dark:bg-[#12161b] dark:hover:shadow-black/30"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}