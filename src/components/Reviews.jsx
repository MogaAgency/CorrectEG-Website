import { Star } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Reviews() {
  const { t } = useLanguage()

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-brand-tint border-t border-black/5 dark:bg-[#111418] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.reviews.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">
            {t.reviews.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.reviews.items.map((r) => (
            <div
              key={r.name}
              data-reveal
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 flex flex-col dark:bg-[#171b21] dark:ring-white/10"
            >
              <div className="flex gap-1 mb-4 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < r.rating ? 'currentColor' : 'none'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="text-sm text-body dark:text-gray-400 flex-1">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-ink dark:text-white">{r.name}</p>
                <p className="text-xs text-body dark:text-gray-500">{r.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
