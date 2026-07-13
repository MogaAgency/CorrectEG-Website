import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../i18n/LanguageContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t.themeToggle.toLight : t.themeToggle.toDark}
      className={`inline-flex items-center justify-center rounded-full p-2 text-body hover:text-brand hover:bg-brand/10 transition-colors dark:text-gray-300 dark:hover:text-brand ${className}`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
