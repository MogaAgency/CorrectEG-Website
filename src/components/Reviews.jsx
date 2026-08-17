import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import cpLogo from '../assets/clients/cp.png'
import novaLogo from '../assets/clients/nova-investment.jpeg'

const SPACING = 68 // % of a card's own width each neighbor shifts by
const SWIPE_THRESHOLD = 60 // px of drag before a swipe counts as prev/next

// Reviewer -> company logo. Matched by a language-neutral prefix, since the
// Arabic name field is formatted as "English name - Arabic name" while the
// English field is just the English name — both start with the same key.
// Reviewers with no logo on file fall back to an initials avatar below.
const COMPANY_LOGOS = [
  { match: 'For Gomla', src: cpLogo },
  { match: 'Nova Investment', src: novaLogo },
]

function getCompanyLogo(name) {
  return COMPANY_LOGOS.find((entry) => name.startsWith(entry.match))?.src
}

// Neighboring cards only peek on screens wide enough to show them
// (Tailwind's `sm` breakpoint) — tracked in JS because Framer Motion's
// `animate`-driven opacity is applied as an inline style, which would
// otherwise always win over a responsive Tailwind opacity class.
function useShowNeighbors() {
  const [show, setShow] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia('(min-width: 640px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(min-width: 640px)')
    const onChange = (e) => setShow(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return show
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

// Shortest circular distance from `index` to `active` (e.g. with 3 items,
// going from the last item to the first via "next" reads as +1, not -2) so
// wrap-around never causes a card to fly across the whole stage.
function circularOffset(index, active, length) {
  let diff = index - active
  if (diff > length / 2) diff -= length
  if (diff < -length / 2) diff += length
  return diff
}

function Stars({ rating }) {
  return (
    <div className="flex gap-1 text-brand">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill={i < rating ? "#FFD700" : 'none'} stroke="#FFD700" strokeWidth={1.5} />
      ))}
    </div>
  )
}

// Shows the company logo when one is on file, falling back to an initials
// avatar so new reviewers work out of the box without needing an image.
function ReviewerAvatar({ name }) {
  const logo = getCompanyLogo(name)

  if (logo) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-transparent p-1.5">
        <img src={logo} alt="" className="h-full w-full object-contain" />
      </span>
    )
  }

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
      {getInitials(name)}
    </span>
  )
}

export default function Reviews() {
  const { t, language } = useLanguage()
  const items = t.reviews.items
  const [active, setActive] = useState(0)
  const isRTL = language === 'ar'
  const dir = isRTL ? -1 : 1
  const showNeighbors = useShowNeighbors()

  const goNext = () => setActive((i) => (i + 1) % items.length)
  const goPrev = () => setActive((i) => (i - 1 + items.length) % items.length)

  const handleDragEnd = (_event, info) => {
    const swipe = dir * info.offset.x
    if (swipe < -SWIPE_THRESHOLD) goNext()
    else if (swipe > SWIPE_THRESHOLD) goPrev()
  }

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-brand-tint border-t border-black/5 dark:bg-[#111418] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.reviews.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.reviews.subtitle}</p>
        </div>

        <div className="relative">
          <div className="relative h-[440px] sm:h-[400px] overflow-hidden">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
            >
              {items.map((review, i) => {
                const offset = circularOffset(i, active, items.length)
                const isActive = offset === 0
                const isVisible = Math.abs(offset) <= 1

                const sideOpacity = showNeighbors ? 0.45 : 0
                // A peeking neighbor (visible + on a screen wide enough to show it)
                // can be clicked to bring it to the center.
                const isClickableNeighbor = !isActive && isVisible && showNeighbors

                return (
                  <motion.div
                    key={review.name}
                    animate={{
                      x: `${dir * offset * SPACING}%`,
                      scale: isActive ? 1 : 0.85,
                      opacity: isVisible ? (isActive ? 1 : sideOpacity) : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    style={{
                      zIndex: 10 - Math.abs(offset),
                      pointerEvents: isActive || isClickableNeighbor ? 'auto' : 'none',
                    }}
                    onClick={isClickableNeighbor ? () => setActive(i) : undefined}
                    className={`absolute w-[88%] max-w-sm sm:w-[26rem] rounded-3xl bg-white p-7 sm:p-8 shadow-xl ring-1 ring-black/5 dark:bg-[#171b21] dark:ring-white/10 ${
                      isActive ? 'cursor-grab active:cursor-grabbing' : isClickableNeighbor ? 'cursor-pointer' : ''
                    }`}
                  >
                    <Quote
                      aria-hidden="true"
                      className="mb-3 h-8 w-8 text-brand/20 dark:text-brand/25"
                      fill="currentColor"
                      strokeWidth={0}
                    />

                    <Stars rating={review.rating} />

                    <p
                      className={`mt-4 text-sm leading-relaxed text-body dark:text-gray-400 ${
                        isActive ? '' : 'line-clamp-3'
                      }`}
                    >
                      &ldquo;{review.quote}&rdquo;
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <ReviewerAvatar name={review.name} />
                      <div>
                        <p className="text-sm font-semibold text-ink dark:text-white">
                          {review.name}
                        </p>
                        {review.company && (
                          <p className="text-xs text-body dark:text-gray-500">{review.company}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label={t.reviews.prevAria}
            className="absolute start-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 p-2.5 text-body shadow-sm transition-colors hover:border-brand hover:text-brand sm:flex dark:border-white/10 dark:bg-[#12161b]/90 dark:text-gray-300"
          >
            {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={t.reviews.nextAria}
            className="absolute end-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 p-2.5 text-body shadow-sm transition-colors hover:border-brand hover:text-brand sm:flex dark:border-white/10 dark:bg-[#12161b]/90 dark:text-gray-300"
          >
            {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {items.map((review, i) => (
              <button
                key={review.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={review.name}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all ${
                  i === active ? 'w-6 bg-brand' : 'w-2 bg-black/15 hover:bg-black/30 dark:bg-white/20 dark:hover:bg-white/35'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}