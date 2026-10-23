import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import FadeIn from '../ui/FadeIn'

const videos = [
  { src: '/images/video1.mp4', title: 'Daily Routine' },
  { src: '/images/video2.mp4', title: 'How It Works' },
  { src: '/images/video3.mp4', title: 'Plain Packaging' },
  { src: '/images/video4.mp4', title: 'Doctor Reviewed' },
  { src: '/images/video5.mp4', title: 'Customer Story' },
]

const THUMB_TIME = 0.1

function VideosSection() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null) return

    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [active])

  const current = active === null ? null : videos[active]

  return (
    <section className="relative overflow-hidden bg-surface py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Watch &amp; learn</h2>
          <p className="mt-2 text-sm text-mist">Tap any clip to play.</p>
        </FadeIn>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
          {videos.map((video, i) => (
            <motion.button
              key={video.src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group w-32 shrink-0 overflow-hidden rounded-2xl border border-line bg-card text-left shadow-lux transition hover:border-accent/60 sm:w-auto"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-accent-soft to-surface">
                <video
                  src={`${video.src}#t=${THUMB_TIME}`}
                  preload="metadata"
                  muted
                  playsInline
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/15">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg transition group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </span>
                </div>
              </div>

              <p className="truncate px-3 py-2.5 text-xs font-bold text-ink">{video.title}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && <VideoModal video={current} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function VideoModal({ video, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <motion.div
        key={video.src}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-card shadow-lux"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-accent"
        >
          <X className="h-5 w-5" />
        </button>

        <video
          src={video.src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="max-h-[80vh] w-full bg-black"
        />

        <p className="px-5 py-4 text-sm font-bold text-ink">{video.title}</p>
      </motion.div>
    </motion.div>
  )
}

export default VideosSection