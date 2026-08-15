import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { Building2, Clock, Rocket } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import ParticleBackground from './ParticleBackground'

const icons = [Rocket, Clock, Building2]

function Counter({ value, prefix = '', suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => `${prefix}${Math.floor(v)}${suffix}`)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, value, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [isInView, value, count, duration])

  return <motion.span ref={ref}>{display}</motion.span>
}

export default function Achievements() {
  const { t } = useLanguage()

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.achievements.title}</h2>
        </div>

        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-b from-brand-tint via-brand-tint to-white shadow-xl dark:border-white/10 dark:from-[#0d1013] dark:via-[#111418] dark:to-[#0b0d10]"
        >
          <ParticleBackground />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -left-20 h-56 w-56 rounded-full bg-brand/10"
          />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3">
            {t.achievements.items.map((item, i) => {
              const Icon = icons[i]
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-3 px-6 py-10 text-center sm:border-e sm:border-black/10 sm:py-14 sm:last:border-e-0 dark:sm:border-white/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <div className="text-4xl font-extrabold text-body dark:text-white sm:text-5xl">
                    <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
                  </div>
                  <p className="text-sm font-semibold text-body dark:text-gray-400">
                    {item.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
