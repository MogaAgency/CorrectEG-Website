import whyCorrectLight from '../assets/Why-Correct/why-correct-light.png'
import whyCorrectDark from '../assets/Why-Correct/why-correct-dark.png'
import { useLanguage } from '../i18n/LanguageContext'

export default function WhyCorrect() {
  const { t } = useLanguage()

  return (
    <section id="why-correct" className="py-20 sm:py-28 bg-brand-tint border-t border-black/5 dark:bg-[#111418] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-start">
          {/* Heading + illustration — stays in view alongside the timeline on desktop */}
          <div className="md:sticky md:top-32">
            <div data-reveal className="text-start">
              <h2 className="text-3xl sm:text-4xl font-bold">{t.whyCorrect.title}</h2>
              <p className="mt-4 max-w-md text-body dark:text-gray-400">{t.whyCorrect.subtitle}</p>
            </div>

            {/* Separate light/dark artwork (swapped via CSS) so the line art's
                stroke color stays legible against either theme's background. */}
            <div data-reveal className="mt-8 max-w-sm">
              <img src={whyCorrectLight} alt="" aria-hidden="true" className="h-auto w-full dark:hidden" />
              <img src={whyCorrectDark} alt="" aria-hidden="true" className="hidden h-auto w-full dark:block" />
            </div>
          </div>

          {/* Numbered vertical timeline */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute top-6 bottom-6 start-6 border-s-2 border-dashed border-brand/30 dark:border-brand/25"
            />

            <div className="space-y-10">
              {t.whyCorrect.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="flex gap-5"
                >
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brand/40 bg-brand-tint text-sm font-bold text-brand dark:border-brand/40 dark:bg-[#111418]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold text-ink dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}