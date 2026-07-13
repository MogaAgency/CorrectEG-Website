import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from '../data/content.en'
import ar from '../data/content.ar'

const dictionaries = { en, ar }

const LanguageContext = createContext(null)

function getInitialLanguage() {
  const stored = localStorage.getItem('lang')
  if (stored === 'en' || stored === 'ar') return stored
  return 'ar'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    const dict = dictionaries[language]
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.title = dict.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', dict.meta.description)
    localStorage.setItem('lang', language)
  }, [language])

  const toggleLanguage = () => setLanguage((l) => (l === 'ar' ? 'en' : 'ar'))

  const value = useMemo(
    () => ({ language, toggleLanguage, t: dictionaries[language] }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
