import { motion } from 'framer-motion'
import { ClipboardList, FileCheck2, PenTool, Search, Settings2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const icons = {
  Search,
  ClipboardList,
  PenTool,
  Settings2,
  FileCheck2,
}

export default function HowWeWork() {
  const { t } = useLanguage()

  return (
    <section id="how-we-work" className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.howWeWork.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.howWeWork.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {t.howWeWork.items.map((step, i) => {
            const Icon = icons[step.icon]
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="group relative rounded-2xl border border-black/5 bg-white p-6 text-start transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-black/5 dark:border-white/10 dark:bg-[#12161b] dark:hover:shadow-black/30"
              >
                <span className="absolute end-5 top-5 text-xs font-bold tracking-[0.2em] text-brand/40">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/25 transition-transform duration-300 group-hover:scale-105">
                  <Icon size={22} strokeWidth={2} />
                </div>

                <h3 className="mt-5 text-base font-bold text-ink dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}