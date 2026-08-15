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

export default function ServicesTimeline({ items, isRTL }) {
  const pathD = buildZigzagPath(items.length)

  return (
    <div className="services-timeline">
      {/* Desktop zig-zag connector (hidden on mobile via CSS) */}
      <svg
        aria-hidden="true"
        className="services-timeline__path"
        viewBox={`0 0 100 ${items.length * 100}`}
        preserveAspectRatio="none"
        style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
      >
        <path d={pathD} className="services-timeline__path-line" />
      </svg>

      {/* Mobile straight connector (hidden on desktop via CSS) */}
      <div aria-hidden="true" className="services-mobile-line" />

      <div className="services-steps">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} data-reveal className="services-step">
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
