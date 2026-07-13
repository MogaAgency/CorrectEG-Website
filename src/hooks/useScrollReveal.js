import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    try {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced || !('IntersectionObserver' in window)) return

      const els = document.querySelectorAll('[data-reveal]')
      if (!els.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('reveal-hidden')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15 },
      )

      els.forEach((el) => {
        el.classList.add('reveal-hidden')
        observer.observe(el)
      })

      return () => observer.disconnect()
    } catch {
      // If anything above fails, elements stay in their default,
      // fully-visible state — no class was ever added.
    }
  }, [])
}
