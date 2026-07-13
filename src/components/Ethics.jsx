import { ShieldCheck, Lock, Target, Eye } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const icons = {
  ShieldCheck,
  Lock,
  Target,
  Eye,
}

export default function Ethics() {
  const { t } = useLanguage()

  return (
    <section id="ethics" className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.ethics.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.ethics.subtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.ethics.items.map((pillar) => {
            const Icon = icons[pillar.icon]
            return (
              <div key={pillar.title} data-reveal className="text-center px-4">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold text-ink dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-body dark:text-gray-400">{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
