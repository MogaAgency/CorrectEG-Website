import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle({ className = '' }) {
  const { toggleLanguage, t } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t.languageToggle.ariaLabel}
      className={`inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-body hover:text-brand hover:bg-brand/10 transition-colors dark:text-gray-300 dark:hover:text-brand ${className}`}
    >
      {t.languageToggle.label}
    </button>
  )
}
