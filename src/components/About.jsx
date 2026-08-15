import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { SOFT_EASE } from '../lib/motion'

// Chart card: fades/scales in like the rest of the site's soft-reveal
// elements, then hands the same "visible" trigger down to its children
// (staggerChildren/delayChildren) so the bars grow in right after.
const chartCardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: SOFT_EASE, staggerChildren: 0.08, delayChildren: 0.25 },
  },
}

// Bars grow from their baseline, easing out softly — no bounce, no snap.
const barVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 0.6, ease: SOFT_EASE } },
}

// Tooltip badge fades in just after its bar has grown, instead of popping in.
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: SOFT_EASE } },
}

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
        <div className="relative flex items-center justify-center md:justify-start">
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-64 w-64 rounded-full bg-brand/15 blur-3xl dark:bg-brand/10"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={chartCardVariants}
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
                <span className="relative flex">
                  <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </span>
              <motion.span
                key={metrics.growth}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
                      <motion.div
                        variants={barVariants}
                        style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                        className={`relative z-10 w-full rounded-t-lg transition-[height] duration-300 ease-out ${
                          isHighlight
                            ? 'bg-gradient-to-t from-brand to-emerald-400 shadow-[0_0_16px_rgba(31,162,74,0.55)]'
                            : 'bg-brand/25 hover:bg-brand/40 dark:bg-brand/20 dark:hover:bg-brand/35'
                        }`}
                      />

                      {isHighlight && (
                        <>
                          {/* Floating tooltip badge with exact figures — fades in just as the bar finishes growing */}
                          <motion.div
                            variants={fadeVariants}
                            style={{ bottom: `calc(${height}% + 18px)` }}
                            className="absolute end-0 z-20 whitespace-nowrap rounded-lg bg-[#0b0d10] px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg transition-[bottom] duration-300 ease-out"
                          >
                            <span className="block">
                              {t.about.chart.tooltipLabel}: {metrics.tooltipValue} | {metrics.tooltipPct}
                            </span>
                            <span className="absolute end-3 top-full -mt-1 h-2 w-2 rotate-45 bg-[#0b0d10]" />
                          </motion.div>

                          {/* Pulsing indicator at the bar's tip — gated behind the same
                              reveal as the tooltip, so the ring doesn't pulse in empty
                              space before the bar has grown up to meet it. */}
                          <motion.div
                            variants={fadeVariants}
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
                          </motion.div>

                          {/* Blurred glow — same reveal gate, infinite breathing loop nested
                              inside so it only starts once the bar is actually visible. */}
                          <motion.div
                            variants={fadeVariants}
                            aria-hidden="true"
                            style={{ height: `${height}%` }}
                            className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-lg transition-[height] duration-300 ease-out"
                          >
                            <motion.div
                              animate={{ opacity: [0.35, 0.75, 0.35] }}
                              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                              className="absolute inset-0 bg-brand blur-md"
                            />
                          </motion.div>
                        </>
                      )}

                      {isHighlight ? (
                        // Gentle breathing glow to keep the highlighted bar feeling alive,
                        // only once the bar itself has grown into view.
                        <motion.div
                          variants={fadeVariants}
                          aria-hidden="true"
                          style={{ height: `${height}%` }}
                          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden rounded-t-lg transition-[height] duration-300 ease-out"
                        >
                          <motion.div
                            animate={{ opacity: [0.35, 0.7, 0.35] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-white/40"
                          />
                        </motion.div>
                      ) : (
                        // Subtle staggered breathing pulse, same deal — waits for its bar.
                        <motion.div
                          variants={fadeVariants}
                          aria-hidden="true"
                          style={{ height: `${height}%` }}
                          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden rounded-t-lg transition-[height] duration-300 ease-out"
                        >
                          <motion.div
                            animate={{ opacity: [0.4, 0.85, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                            className="absolute inset-0 bg-white/30 dark:bg-white/5"
                          />
                        </motion.div>
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
