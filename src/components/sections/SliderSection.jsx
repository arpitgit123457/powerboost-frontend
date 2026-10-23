import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../ui/FadeIn'

const slides = [
  { src: '/images/slideimg1.jpg' },
  { src: '/images/slideimg2.jpg' },
  { src: '/images/slideimg3.jpg' },
  { src: '/images/slideimg4.jpg' },
  { src: '/images/slideimg5.jpg' },
  { src: '/images/slideimg6.jpg' },
]

const SCROLL_SECONDS = 38

function SliderSection() {
  const strip = [...slides, ...slides]

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Inside the box</h2>
            <p className="mt-2 text-sm text-mist">A closer look at what arrives at your door.</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-line px-5 py-2.5 text-sm font-bold text-ink transition hover:border-accent hover:bg-accent hover:text-white"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>

      <div className="mt-8">
        <div
          className="marquee-track flex w-max items-center gap-4 pr-4"
          style={{ animation: `marquee ${SCROLL_SECONDS}s linear infinite` }}
        >
          {strip.map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              className="w-36 shrink-0 overflow-hidden rounded-2xl border border-line bg-card shadow-lux sm:w-44"
              aria-hidden={i >= slides.length}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-surface">
                <img
                  src={slide.src}
                  alt={i < slides.length ? `Gallery slide ${i + 1}` : ''}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SliderSection