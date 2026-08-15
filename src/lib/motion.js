// Shared easing curve for the site's other (JS-driven) framer-motion reveals.
// The scroll-into-view fade itself now lives in `useScrollReveal` +
// `[data-reveal]` (see src/hooks/useScrollReveal.js, src/index.css) — a
// plain IntersectionObserver + CSS transition, not framer-motion, because
// the framer-motion `whileInView` version flickered on iOS Safari.
export const SOFT_EASE = [0.16, 1, 0.3, 1]
