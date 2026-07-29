import { clientLogos } from '../data/shared'
import { useLanguage } from '../i18n/LanguageContext'

const logoModules = import.meta.glob('../assets/logo*.png', {
  eager: true,
  import: 'default',
})

const logos = clientLogos.map(({ file, alt }) => ({
  src: logoModules[`../assets/${file}`],
  alt,
}))

export default function Clients() {
  const { t } = useLanguage()

  return (
    <section id="clients" className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.clients.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.clients.subtitle}</p>
        </div>
      </div>

      <div
        data-reveal
        className="relative [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="mx-4 flex h-24 w-44 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-16 max-w-[70%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
