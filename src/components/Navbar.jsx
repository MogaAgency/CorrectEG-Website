import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-sm border-b border-black/5 dark:bg-[#0b0d10]/90 dark:border-white/10'
          : 'bg-transparent backdrop-blur-0 border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-around px-4 sm:px-6 h-16">
        <a href="#home" className="flex flex-nowrap items-center gap-2 font-heading font-bold text-xs md:text-lg text-ink dark:text-white">
          <img src={logo} alt="" className="h-11 w-auto" />
          {t.brand.part1} <span className="text-brand">{t.brand.part2}</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {t.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-bold text-body hover:text-brand transition-colors dark:text-gray-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="https://scheduler.zoom.us/correct-team/correct" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-brand px-5 py-2 text-xs font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-ink dark:text-white"
            aria-label={open ? t.menu.close : t.menu.open}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 border-t border-black/5 bg-white px-4 py-3 dark:bg-[#0b0d10] dark:border-white/10">
          {t.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-bold text-body hover:bg-brand-tint hover:text-brand dark:text-gray-300 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
