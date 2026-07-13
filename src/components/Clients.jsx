import { clientPlaceholders } from '../data/shared'
import { useLanguage } from '../i18n/LanguageContext'

export default function Clients() {
  const { t } = useLanguage()

  return (
    <section id="clients" className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.clients.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">
            {/* TODO: replace with real brand logos */}
            {t.clients.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {clientPlaceholders.map((n) => (
            <div
              key={n}
              data-reveal
              className="flex h-20 items-center justify-center rounded-xl bg-gray-100 grayscale hover:grayscale-0 hover:bg-brand/10 transition dark:bg-white/5"
            >
              <span className="text-sm font-medium text-gray-400">
                {t.clients.logoLabel} {n}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
