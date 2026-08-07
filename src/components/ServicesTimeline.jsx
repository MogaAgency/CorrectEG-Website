import { useEffect, useRef, useState } from 'react'

/**
 * Builds a smooth zig-zag path through N points, one per step, alternating
 * between the 25% and 75% horizontal marks. Coordinate space is percentage
 * based (0-100 wide, 100 tall per step) so it stretches to fit the timeline
 * container exactly via `preserveAspectRatio="none"` — no DOM measurement
 * needed, and it stays correct however many steps are passed in.
 */
function buildZigzagPath(stepCount) {
  const points = Array.from({ length: stepCount }, (_, i) => ({
    x: i % 2 === 0 ? 25 : 75,
    y: i * 100 + 50,
  }))

  return points.slice(1).reduce((d, point, i) => {
    const prev = points[i]
    const midY = (prev.y + point.y) / 2
    // Curve through a vertical midpoint so the line stays smooth regardless
    // of how far the x position swings between steps.
    return `${d} C ${prev.x} ${midY}, ${point.x} ${midY}, ${point.x} ${point.y}`
  }, `M ${points[0].x} ${points[0].y}`)
}

/** Observes each step + the container once, revealing them as they enter the viewport. */
function useScrollReveal(stepCount) {
  const containerRef = useRef(null)
  const stepRefs = useRef([])
  const [containerVisible, setContainerVisible] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState(() => new Set())

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      setContainerVisible(true)
      setVisibleSteps(new Set(Array.from({ length: stepCount }, (_, i) => i)))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (entry.target === containerRef.current) {
            setContainerVisible(true)
          } else {
            const index = Number(entry.target.dataset.stepIndex)
            setVisibleSteps((prev) => new Set(prev).add(index))
          }
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )

    if (containerRef.current) observer.observe(containerRef.current)
    stepRefs.current.forEach((el) => el && observer.observe(el))

    return () => observer.disconnect()
  }, [stepCount])

  return { containerRef, stepRefs, containerVisible, visibleSteps }
}

export default function ServicesTimeline({ items, isRTL }) {
  const { containerRef, stepRefs, containerVisible, visibleSteps } = useScrollReveal(items.length)
  const pathRef = useRef(null)
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength())
  }, [items.length])

  const pathD = buildZigzagPath(items.length)

  return (
    <div
      ref={containerRef}
      className={`services-timeline ${containerVisible ? 'is-visible' : ''}`}
    >
      {/* Desktop zig-zag connector (hidden on mobile via CSS) */}
      <svg
        aria-hidden="true"
        className="services-timeline__path"
        viewBox={`0 0 100 ${items.length * 100}`}
        preserveAspectRatio="none"
        style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
      >
        <path
          ref={pathRef}
          d={pathD}
          className="services-timeline__path-line"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: containerVisible ? 0 : pathLength,
          }}
        />
      </svg>

      {/* Mobile straight connector (hidden on desktop via CSS) */}
      <div aria-hidden="true" className="services-mobile-line" />

      <div className="services-steps">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              ref={(el) => (stepRefs.current[i] = el)}
              data-step-index={i}
              style={{ '--services-i': i }}
              className={`services-step ${visibleSteps.has(i) ? 'is-visible' : ''}`}
            >
              <div className="services-step__node">
                <Icon strokeWidth={1.75} />
              </div>
              <div className="services-step__content">
                <h3 className="services-step__title">{item.title}</h3>
                <p className="services-step__desc">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
