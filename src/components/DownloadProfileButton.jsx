import { FileDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import profileEn from '../assets/PDFs/correct company profile en.pdf?url'
import profileAr from '../assets/PDFs/correct company profile Ar.pdf?url'

export default function DownloadProfileButton({ className = '' }) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <a
      href={isAr ? profileAr : profileEn}
      download={isAr ? 'Correct - Company Profile (Arabic).pdf' : 'Correct - Company Profile (English).pdf'}
      aria-label={t.downloadProfile.ariaLabel}
      title={t.downloadProfile.ariaLabel}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-body hover:text-brand transition-colors dark:text-gray-400 dark:hover:text-brand ${className}`}
    >
      <FileDown size={18} strokeWidth={2.25} />
      {t.downloadProfile.label}
    </a>
  )
}
