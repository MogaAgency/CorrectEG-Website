// Meta Pixel event helper. The base code + PageView live in index.html;
// this fires the conversion events from button clicks. `language` is added
// to every event so Events Manager can split leads by Arabic vs English.
// No-ops if fbq is missing (e.g. blocked by an ad blocker).
export function trackEvent(name, params = {}) {
  if (typeof window.fbq !== 'function') return
  window.fbq('track', name, { language: document.documentElement.lang, ...params })
}
