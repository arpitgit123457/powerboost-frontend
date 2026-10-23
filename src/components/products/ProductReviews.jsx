import { useState } from 'react'
import { Play, X, BadgeCheck } from 'lucide-react'
import FadeIn from '../ui/FadeIn'
import { getProductReviews } from '../../data/reviews'

function ProductReviews({ product }) {
  const reviews = getProductReviews(product)
  const [active, setActive] = useState(null)

  if (!reviews) return null

  const media = [
    ...reviews.images.map((src) => ({ type: 'image', src })),
    ...reviews.videos.map((src) => ({ type: 'video', src })),
  ]

  if (media.length === 0) return null

  return (
    <>
      <FadeIn>
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-accent" />
            <div>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{reviews.title}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-mist">
                <BadgeCheck className="h-4 w-4 text-accent" />
                Real photos from verified buyers
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {media.map((item) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(item)}
                aria-label="Open review media"
                className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lux"
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={`${product.name} review`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <video
                      src={`${item.src}#t=0.1`}
                      preload="metadata"
                      muted
                      playsInline
                      className="pointer-events-none h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/15">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg transition group-hover:scale-110">
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      </span>
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </section>
      </FadeIn>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Close review"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>

          {active.type === 'image' ? (
            <img
              onClick={(e) => e.stopPropagation()}
              src={active.src}
              alt={`${product.name} review`}
              className="max-h-[85vh] max-w-3xl rounded-2xl object-contain"
            />
          ) : (
            <video
              onClick={(e) => e.stopPropagation()}
              src={active.src}
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] w-full max-w-3xl rounded-2xl bg-black"
            />
          )}
        </div>
      )}
    </>
  )
}

export default ProductReviews
