import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clientLogos } from '../data/shared'
import { useLanguage } from '../i18n/LanguageContext'

const CARD_GAP_PX = 20 // matches the track's gap-5
const SET_REPEATS = 3 // logos rendered 3x so the track can wrap seamlessly in either direction
const AUTOPLAY_MS = 3200

const logoModules = import.meta.glob('../assets/clients/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})

const logos = clientLogos.map(({ file, alt, needsBackdrop }) => ({
  src: logoModules[`../assets/clients/${file}`],
  alt,
  needsBackdrop,
}))

export default function Clients() {
  const { t } = useLanguage()
  const scrollerRef = useRef(null)
  const cardRefs = useRef([])
  const pausedRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const trackLogos = useMemo(
    () => Array.from({ length: SET_REPEATS }, () => logos).flat(),
    [],
  )

  const syncState = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    // One "set" is the width of the original logo list. Once the user
    // scrolls past a set boundary, jump back by exactly one set — since the
    // sets are identical, the jump is invisible and the track feels infinite.
    const setWidth = scroller.scrollWidth / SET_REPEATS
    if (scroller.scrollLeft < setWidth * 0.5) {
      scroller.scrollLeft += setWidth
    } else if (scroller.scrollLeft > setWidth * 1.5) {
      scroller.scrollLeft -= setWidth
    }

    const { scrollLeft, clientWidth } = scroller
    const center = scrollLeft + clientWidth / 2
    let closest = 0
    let closestDistance = Infinity
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - center)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = i
      }
    })
    setActiveIndex(closest % logos.length)
  }, [])

  // Start the track in the middle set so the user can scroll either
  // direction immediately. Runs before paint to avoid a visible jump.
  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    scroller.scrollLeft = scroller.scrollWidth / SET_REPEATS
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    syncState()

    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        syncState()
        frame = null
      })
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', syncState)
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', syncState)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [syncState])

  const slide = useCallback((direction) => {
    const scroller = scrollerRef.current
    const card = cardRefs.current[0]
    if (!scroller || !card) return
    const step = card.offsetWidth + CARD_GAP_PX
    scroller.scrollBy({ left: direction * step, behavior: 'smooth' })
  }, [])

  // Continuous autoplay, paused while the user is hovering or touching the
  // carousel and disabled entirely for prefers-reduced-motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      if (!pausedRef.current) slide(1)
    }, AUTOPLAY_MS)

    return () => clearInterval(id)
  }, [slide])

  const pause = () => {
    pausedRef.current = true
  }
  const resume = () => {
    pausedRef.current = false
  }

  return (
    <section
      id="clients"
      className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.clients.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.clients.subtitle}</p>
        </div>

        <div dir="ltr" className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label={t.clients.prevAria}
            className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 text-body transition-colors hover:border-brand hover:text-brand dark:border-white/10 dark:text-gray-300"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative min-w-0 flex-1"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
          >
            <div
              ref={scrollerRef}
              dir="ltr"
              className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory"
            >
              {trackLogos.map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={`flex h-28 w-[calc(50%-10px)] md:w-[calc(33.333%-13.33px)] lg:w-[calc(20%-16px)] shrink-0 snap-center items-center justify-center rounded-2xl border-2 border-gray-200 bg-white p-4 transition-all duration-300 hover:border-brand dark:border-white/10 dark:bg-[#12161b]`}
                >
                  {logo.needsBackdrop ? (
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-white p-2">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Edge fades: cards blend into the section background instead of cutting off abruptly */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 start-0 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0b0d10]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 end-0 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0b0d10]"
            />
          </div>

          <button
            type="button"
            onClick={() => slide(1)}
            aria-label={t.clients.nextAria}
            className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 text-body transition-colors hover:border-brand hover:text-brand dark:border-white/10 dark:text-gray-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
