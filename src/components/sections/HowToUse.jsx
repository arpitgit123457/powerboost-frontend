import { Pill, Droplets, Check, Zap, HeartPulse, Flame } from 'lucide-react'
import FadeIn from '../ui/FadeIn'

const capImg = 'https://powerboost-backend.onrender.com/api/images/6a9fc9024131460ea969c980'
const oilImg = 'https://powerboost-backend.onrender.com/api/images/6a9fc8ee4131460ea969c97e'

const capsule = {
  name: 'Powerbooster Capsule',
  tagline: 'Andar ki towat — stamina, energy aur vitality ke liye',
  image: capImg,
  icon: Pill,
  steps: [
    'Rozana sirf 1 Powerbooster Capsule lein',
    'Kisi ek meal ke baad doodh ya paani ke saath',
    'Lagaatar 45–60 din tak use karein — isi se result dikhta hai',
    'Prescribed dose se zyada kabhi na lein',
  ],
  benefits: ['Stamina', 'Energy', 'Vitality'],
}

const oil = {
  name: 'Powerbooster Oil',
  tagline: 'Bahari massage — strength, muscles aur relaxation ke liye',
  image: oilImg,
  icon: Droplets,
  steps: [
    'Thodi si Powerbooster Oil apni haath ki hatheli par lein',
    'Jis body part ko jaroorat hai us par 10–15 minute gently massage karein',
    'Rozana ya kam se kam hafte mein 3 baar massage karein',
    'Sirf external use ke liye — muha/naak se bilkul na lein',
  ],
  benefits: ['Muscle Strength', 'Relaxation', 'Stiffness Relief'],
}

function HowToUse() {
  return (
    <section id="how-to-use" className="relative overflow-hidden bg-surface py-24">
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            <Zap className="h-4 w-4" />
            How To Use
          </span>
          <h2 className="mt-5 max-w-3xl text-2xl font-bold tracking-tight text-ink sm:text-4xl">
            Power Booster kaise use karein? <span className="text-accent">Bas 2 aasan formulas</span>
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-mist">
            Andar se Powerbooster Capsule, bahar se Powerbooster Oil — dono ko saath use karne par hi Power
            Booster ka full result milta hai. Nature ka power, science ka proof. In dono formulas ko follow
            karein aur lagaatar istemal karein.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {[capsule, oil].map((item, i) => (
            <FadeIn key={item.name} delay={0.1 * i}>
              <article className="group h-full overflow-hidden rounded-[2rem] border border-line bg-card transition duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-lux">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-72"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <span className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-stone-950/70 px-4 py-2 text-sm font-bold text-accent backdrop-blur">
                    <item.icon className="h-4 w-4" />
                    {i === 0 ? 'Internal Use' : 'External Use'}
                  </span>
                </div>

                <div className="p-7 sm:p-8">
                  <h3 className="text-xl font-bold text-ink">{item.name}</h3>
                  <p className="mt-1.5 text-sm text-mist">{item.tagline}</p>

                  <ul className="mt-6 space-y-3.5">
                    {item.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm leading-relaxed text-white/85">{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
                    {item.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent"
                      >
                        <Flame className="h-3.5 w-3.5" />
                        {benefit}
                      </span>
                    ))}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-bold text-mist">
                      <HeartPulse className="h-3.5 w-3.5" />
                      Daily Use
                    </span>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowToUse