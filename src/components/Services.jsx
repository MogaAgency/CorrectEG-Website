import { Boxes, BookOpenCheck, SearchCheck, Receipt, LineChart } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const icons = {
  Boxes,
  BookOpenCheck,
  SearchCheck,
  Receipt,
  LineChart,
}

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-20 sm:py-28 bg-brand-tint border-t border-black/5 dark:bg-[#111418] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.services.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.services.subtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service) => {
            const Icon = icons[service.icon]
            return (
              <div
                key={service.title}
                data-reveal
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow dark:bg-[#171b21] dark:ring-white/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-ink dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-body dark:text-gray-400">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
