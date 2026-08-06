import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

// Column heights as a % of the chart's fixed height; the last bar is the
// highlighted / highest one. Kept well under 100% so the pulse dot and
// tooltip badge have headroom above it.
const BARS_BY_PERIOD = {
  monthly: [38, 58, 34, 70, 46, 80],
  yearly: [22, 34, 48, 60, 74, 92],
}

const METRICS_BY_PERIOD = {
  monthly: { growth: '+34.5%', tooltipValue: '$48,200', tooltipPct: '+96%' },
  yearly: { growth: '+212%', tooltipValue: '$612,400', tooltipPct: '+312%' },
}

const HIGHLIGHT_INDEX = BARS_BY_PERIOD.monthly.length - 1
const GRIDLINE_ROWS = [0.22, 0.44, 0.66, 0.88]
const MONTH_COUNT = 6
const YEAR_COUNT = 6

const chartVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const barVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Last N months ending with the current month, named in the active locale
// (e.g. "Jan"…"Jun" or "يناير"…"يونيو").
function getRollingMonthLabels(locale) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  const now = new Date()
  return Array.from({ length: MONTH_COUNT }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (MONTH_COUNT - 1 - i), 1)
    return formatter.format(d)
  })
}

// Last N years ending with the current year (e.g. 2021…2026).
function getRollingYearLabels() {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: YEAR_COUNT }, (_, i) =>
    String(currentYear - (YEAR_COUNT - 1 - i)),
  )
}

export default function About() {
  const { t, language } = useLanguage()
  const [period, setPeriod] = useState('monthly')

  const locale = language === 'ar' ? 'ar-EG' : 'en-US'
  const monthLabels = useMemo(() => getRollingMonthLabels(locale), [locale])
  const yearLabels = useMemo(() => getRollingYearLabels(), [])

  const labels = period === 'monthly' ? monthLabels : yearLabels
  const bars = BARS_BY_PERIOD[period]
  const metrics = METRICS_BY_PERIOD[period]

  return (
    <section id="about" className="py-40 sm:py-52 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Rendered first in the DOM so the grid's direction-aware auto-placement
            puts it on the right in Arabic (RTL) and on the left in English (LTR). */}
        <div data-reveal className="relative flex items-center justify-center md:justify-start">
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-64 w-64 rounded-full bg-brand/15 blur-3xl dark:bg-brand/10"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={chartVariants}
            className="relative w-full max-w-md rounded-2xl border border-black/5 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#12161b]"
          >
            {/* Title + time-range filter chips */}
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-ink dark:text-white">
                {t.about.chart.title}
              </h3>
              <div className="flex items-center gap-0.5 rounded-full bg-black/5 p-0.5 dark:bg-white/5">
                {[
                  { key: 'monthly', label: t.about.chart.monthly },
                  { key: 'yearly', label: t.about.chart.yearly },
                ].map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setPeriod(option.key)}
                    aria-pressed={period === option.key}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      period === option.key
                        ? 'bg-white text-ink shadow-sm dark:bg-white/10 dark:text-white'
                        : 'text-body/70 hover:text-body dark:text-gray-500 dark:hover:text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Growth metric */}
            <div className="mb-6 mt-3 flex items-center gap-2">
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full bg-brand/60"
                />
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex"
                >
                  <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
                </motion.span>
              </span>
              <motion.span
                key={metrics.growth}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-extrabold text-brand"
              >
                {metrics.growth}
              </motion.span>
            </div>

            {/* Chart plot */}
            <div className="relative h-44">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                {GRIDLINE_ROWS.map((frac) => (
                  <line
                    key={frac}
                    x1="0"
                    x2="100%"
                    y1={`${frac * 100}%`}
                    y2={`${frac * 100}%`}
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    className="stroke-black/5 dark:stroke-white/5"
                  />
                ))}
              </svg>

              <div className="relative flex h-full items-end justify-between gap-2.5">
                {bars.map((height, i) => {
                  const isHighlight = i === HIGHLIGHT_INDEX
                  return (
                    <div key={i} className="relative flex h-full flex-1 items-end">
                      {isHighlight && (
                        <>
                          {/* Floating tooltip badge with exact figures */}
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 1, duration: 0.4 }}
                            style={{ bottom: `calc(${height}% + 18px)` }}
                            className="absolute end-0 z-20 whitespace-nowrap rounded-lg bg-[#0b0d10] px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg transition-[bottom] duration-300 ease-out"
                          >
                            <motion.span
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                              className="block"
                            >
                              {t.about.chart.tooltipLabel}: {metrics.tooltipValue} | {metrics.tooltipPct}
                            </motion.span>
                            <span className="absolute end-3 top-full -mt-1 h-2 w-2 rotate-45 bg-[#0b0d10]" />
                          </motion.div>

                          {/* Pulsing indicator at the bar's tip */}
                          <div
                            aria-hidden="true"
                            style={{ bottom: `${height}%` }}
                            className="absolute start-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-[bottom] duration-300 ease-out"
                          >
                            <motion.span
                              animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                              className="absolute inset-0 rounded-full bg-brand"
                            />
                            <span className="relative block h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_rgba(31,162,74,0.9)]" />
                          </div>

                          <motion.div
                            aria-hidden="true"
                            animate={{ opacity: [0.35, 0.75, 0.35] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ height: `${height}%` }}
                            className="absolute inset-x-0 bottom-0 rounded-t-lg bg-brand blur-md transition-[height] duration-300 ease-out"
                          />
                        </>
                      )}

                      <motion.div
                        variants={barVariants}
                        style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                        className={`relative z-10 w-full rounded-t-lg transition-[height,transform] duration-300 ease-out hover:-translate-y-1 ${
                          isHighlight
                            ? 'bg-gradient-to-t from-brand to-emerald-400 shadow-[0_0_16px_rgba(31,162,74,0.55)]'
                            : 'bg-brand/25 hover:bg-brand/40 dark:bg-brand/20 dark:hover:bg-brand/35'
                        }`}
                      />

                      {isHighlight ? (
                        // Light sweep gliding up through the highlighted bar on a loop
                        <div
                          aria-hidden="true"
                          style={{ height: `${height}%` }}
                          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden rounded-t-lg transition-[height] duration-300 ease-out"
                        >
                          <motion.div
                            animate={{ y: ['120%', '-120%'] }}
                            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
                            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-white/50 to-transparent"
                          />
                        </div>
                      ) : (
                        // Subtle staggered breathing pulse to keep the rest of the chart feeling alive
                        <motion.div
                          aria-hidden="true"
                          animate={{ opacity: [0.4, 0.85, 0.4] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                          style={{ height: `${height}%` }}
                          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 rounded-t-lg bg-white/30 transition-[height] duration-300 ease-out dark:bg-white/5"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* X-axis labels */}
            <div className="mt-2 flex items-center justify-between gap-2.5">
              {labels.map((label, i) => (
                <span
                  key={`${period}-${i}`}
                  className="flex-1 text-center text-[10px] font-medium text-body/60 dark:text-gray-500"
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div data-reveal>
          <h2 className="text-3xl font-bold mb-6">{t.about.title}</h2>
          <p className="text-lg leading-relaxed mb-4 dark:text-gray-400">
            {t.about.body}
          </p>
          <p className="text-lg font-semibold text-brand-dark dark:text-green-400">
            {t.about.trusted}
          </p>
        </div>
      </div>
    </section>
  )
}
