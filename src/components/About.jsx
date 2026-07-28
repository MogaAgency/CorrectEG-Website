import { LineChart } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div data-reveal>
          <h2 className="text-3xl font-bold mb-6">{t.about.title}</h2>
          <p className="text-lg leading-relaxed mb-4 dark:text-gray-400">
            {t.about.body}
          </p>
          <p className="text-lg font-semibold text-brand-dark dark:text-green-400">
            {t.about.trusted}
          </p>
        </div>

        <div data-reveal className="flex items-center justify-center">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-brand-tint dark:bg-white/5">
            <div className="absolute inset-4 rounded-full border-2 border-brand/20" />
            <LineChart className="h-24 w-24 text-brand" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  )
}
