import { motion } from 'framer-motion'
import { Briefcase, Factory, Hammer, Handshake, ShoppingCart, Store, UtensilsCrossed } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { softReveal } from '../lib/motion'

const icons = {
  ShoppingCart,
  Store,
  Briefcase,
  Handshake,
  Hammer,
  Factory,
  UtensilsCrossed,
}

// Filenames mirror the English industry names, so keying by the (language
// -neutral) lucide icon name lets both locales resolve the same photo.
const imageModules = import.meta.glob('../assets/Industries We Serve/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})

const images = {
  ShoppingCart: imageModules['../assets/Industries We Serve/E-commerce.jpg'],
  Store: imageModules['../assets/Industries We Serve/Retail and Wholesale.png'],
  Briefcase: imageModules['../assets/Industries We Serve/Professional Services.jpeg'],
  Handshake: imageModules['../assets/Industries We Serve/Service-Based Businesses.png'],
  Hammer: imageModules['../assets/Industries We Serve/Construction Companies.png'],
  Factory: imageModules['../assets/Industries We Serve/Manufacturing Companies.png'],
  UtensilsCrossed: imageModules['../assets/Industries We Serve/Restaurants and Cafés.png'],
}

export default function Industries() {
  const { t } = useLanguage()

  return (
    <section id="industries" className="py-20 sm:py-28 bg-white border-t border-black/5 dark:bg-[#0b0d10] dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...softReveal()} className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold">{t.industries.title}</h2>
          <p className="mt-3 text-body dark:text-gray-400">{t.industries.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.industries.items.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <motion.div
                key={item.label}
                {...softReveal(i * 0.08)}
                className="group relative overflow-hidden rounded-2xl border border-black/5 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:border-white/10"
              >
                <div className="relative h-56 sm:h-60 overflow-hidden bg-brand-tint dark:bg-[#12161b]">
                  <img
                    src={images[item.icon]}
                    alt={item.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-base font-bold text-white">{item.label}</p>
                      <span className="mt-1 block h-0.5 w-8 origin-start scale-x-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}