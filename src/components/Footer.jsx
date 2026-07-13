import { Mail, Phone } from 'lucide-react'
import logo from '../assets/logo.svg'
import SocialIcon from './SocialIcon'
import { socialLinks } from '../data/shared'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="bg-ink text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="font-heading font-bold">
              {t.brand.part1} {t.brand.part2}
            </span>
          </div>
          <p className="text-sm text-white/60">{t.footer.tagline}</p>

          <div className="flex gap-3 mt-5">
            {/* TODO: replace placeholder social links with real profile URLs */}
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors"
              >
                <SocialIcon name={s.icon} size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-4">
            {t.footer.quickLinksTitle}
          </h3>
          <ul className="space-y-2">
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-4">
            {t.footer.contactTitle}
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            {/* TODO: replace with real contact details */}
            <li className="flex items-center gap-2">
              <Mail size={16} /> <span dir="ltr">{t.footer.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> <span dir="ltr">{t.footer.phone}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
        {t.footer.copyright}
      </div>
    </footer>
  )
}
