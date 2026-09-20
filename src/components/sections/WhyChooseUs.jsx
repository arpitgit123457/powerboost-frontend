import { Star, Leaf, ShieldCheck, Award, Lock, BadgeCheck } from 'lucide-react'
import FadeIn from '../ui/FadeIn'

const points = [
  {
    icon: Leaf,
    title: '100% Natural Formulation',
    desc: 'Amrit Urja Capsule aur Oil dono time-tested ayurvedic herbs se bane hain — bina kisi harsh chemicals ya side effects ke.',
  },
  {
    icon: ShieldCheck,
    title: 'Original Amrit Urja Formula',
    desc: 'Poori Power Booster range ek hi trusted formula par based hai jo strength, stamina aur everyday energy ke liye sadiyon se use hota aaya hai.',
  },
  {
    icon: Award,
    title: 'GMP Certified & Lab Tested',
    desc: 'Har batch GMP-certified facility mein banta hai aur third-party labs se test hokar hi aapke paas pahunchta hai.',
  },
  {
    icon: Lock,
    title: 'Discreet & Fast Delivery',
    desc: '24 ghante mein plain, unbranded packaging mein dispatch — poori India mein free delivery ke saath, privacy 100% safe.',
  },
]

function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-surface py-24">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <BadgeCheck className="h-4 w-4" />
              Why Choose Us
            </span>
            <h2 className="mt-5 max-w-xl text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              Nature ka power, <span className="text-accent">science ka proof</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-mist">
              Amrit Urja Capsule aur Amrit Urja Oil — poori Power Booster range ek hi cheez ke liye bani hai:
              aapki roj ki strength, stamina aur energy ko naturally wapas lana. Sirf original formula, sirf asli results.
            </p>

            <ul className="mt-8 space-y-5">
              {points.map((point, i) => (
                <FadeIn key={point.title} delay={0.08 * i}>
                  <li className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-amber-600 text-white shadow-lg">
                      <point.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-bold text-ink">{point.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-mist">{point.desc}</p>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative">
              <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-card p-6 shadow-lux">
                <img
                  src="/images/product5.jpg"
                  alt="Amrit Urja Power Booster Capsule"
                  loading="lazy"
                  className="h-[420px] w-full rounded-[2rem] object-cover"
                />
                <span className="absolute left-10 top-10 inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-stone-900 shadow-xl">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Bestseller
                </span>
                <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/10 bg-stone-950/80 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-white">Amrit Urja Capsule</p>
                      <p className="mt-0.5 text-sm text-white/60">100% Natural · Formula verified</p>
                    </div>
                    <div className="shrink-0 rounded-xl bg-accent px-3 py-2 text-center">
                      <p className="flex items-center gap-1 text-xs font-extrabold text-stone-900">
                        <Star className="h-3.5 w-3.5 fill-current" /> 4.8
                      </p>
                      <p className="text-[10px] font-semibold text-stone-800">540+ reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs