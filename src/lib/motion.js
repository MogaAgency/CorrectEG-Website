// Shared "soft reveal" preset: a gentle opacity + scale fade-in, triggered
// once as an element scrolls into view. No vertical movement (by design —
// translateY reveals read as jumpy on mobile). The eased curve and modest
// scale delta keep it feeling soft rather than snappy.
export const SOFT_EASE = [0.16, 1, 0.3, 1]

export function softReveal(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.97 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay, ease: SOFT_EASE },
  }
}
