import { useLanguage } from '../i18n/LanguageContext'

// One bespoke line-art illustration per pillar, sharing the same stroke
// weight, size and accent color.
function IntegrityIllustration() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-9 w-9">
      <path
        d="M32 6 L54 14 V30 C54 44 44 54 32 58 C20 54 10 44 10 30 V14 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M22 32 L29 39 L42 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ConfidentialityIllustration() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-9 w-9">
      <path
        d="M20 28 V20 C20 12.27 25.37 6 32 6 C38.63 6 44 12.27 44 20 V28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="14" y="28" width="36" height="28" rx="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="41" r="3.5" fill="currentColor" />
    </svg>
  )
}

function AccuracyIllustration() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-9 w-9">
      {[26, 18, 10].map((r) => (
        <circle key={r} cx="32" cy="32" r={r} stroke="currentColor" strokeWidth="2" />
      ))}
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />
    </svg>
  )
}

function TransparencyIllustration() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-9 w-9">
      <path
        d="M6 32 C14 18 26 12 32 12 C38 12 50 18 58 32 C50 46 38 52 32 52 C26 52 14 46 6 32 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />
    </svg>
  )
}

const illustrations = {
  ShieldCheck: IntegrityIllustration,
  Lock: ConfidentialityIllustration,
  Target: AccuracyIllustration,
  Eye: TransparencyIllustration,
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.ethics.items.map((pillar, i) => {
            const Illustration = illustrations[pillar.icon]
            return (
              <div
                key={pillar.title}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="group rounded-2xl border border-black/5 bg-white p-7 text-start transition-all duration-300 hover:border-brand/30 hover:shadow-xl hover:shadow-black/5 dark:border-white/10 dark:bg-[#12161b] dark:hover:shadow-black/30"
              >
                <span className="block text-xs font-bold tracking-[0.2em] text-brand/70">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/5 text-brand transition-colors duration-300 group-hover:bg-brand/10 dark:bg-brand/10 dark:group-hover:bg-brand/15">
                  <Illustration />
                </div>

                <h3 className="mt-6 text-lg font-bold text-ink dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body dark:text-gray-400">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}