import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { api } from '../../api'

const fallbackBanners = [
  {
    image: '/images/banner1.jpg',
    eyebrow: 'India\u2019s Premium Men\u2019s Wellness Brand',
    title: 'Last longer. Feel stronger.',
    sub: 'Doctor-verified solutions for performance, stamina and confidence. Discreetly delivered.',
    cta: 'Shop Products',
    link: '#shop',
  },
  {
    image: '/images/banner2.jpg',
    eyebrow: 'Clinically Dosed Capsules & Oils',
    title: 'Build real stamina, naturally.',
    sub: 'Ashwagandha, Shilajit and more \u2014 backed by science and trusted by 1,00,000+ men.',
    cta: 'Explore Range',
    link: '#shop',
  },
  {
    image: '/images/banner3.jpg',
    eyebrow: '100% Private & Discreet',
    title: 'Confidence, delivered to your door.',
    sub: 'Plain packaging, free fast delivery and 24/7 support. Shop with total privacy.',
    cta: 'Shop Now',
    link: '#shop',
  },
]

const AUTOPLAY_MS = 5000

function HeroSection() {
  const [index, setIndex] = useState(0)
  const [banners, setBanners] = useState(fallbackBanners)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${api}/banners`)
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            const baseUrl = api.replace(/\/api$/, '')
            setBanners(data.map(b => ({
              image: b.image ? (b.image.startsWith('http') ? b.image : baseUrl + b.image) : '/images/banner1.jpg',
              eyebrow: b.eyebrow || '',
              title: b.title || '',
              sub: b.sub || '',
              cta: b.cta || 'Shop Now',
              link: b.link || '#shop',
            })))
          }
        }
      } catch {}
    }
    fetchBanners()
  }, [])

  const next = useCallback(() => setIndex((i) => (i + 1) % banners.length), [banners.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + banners.length) % banners.length), [banners.length])

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [next])

  const banner = banners[index]

  return (
    <section id="home" className="relative h-[480px] overflow-hidden bg-ink sm:h-[620px] lg:h-[680px]">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white backdrop-blur sm:gap-2 sm:px-4 sm:py-2 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {banner.eyebrow}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
              {banner.title}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-base lg:text-lg">{banner.sub}</p>

            <a
              href={banner.link}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-amber-600/30 transition hover:bg-amber-500 sm:mt-9 sm:px-8 sm:py-4"
            >
              {banner.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        aria-label="Previous banner"
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next banner"
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {banners.map((b, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to banner ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? 'w-9 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
