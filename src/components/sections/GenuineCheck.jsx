import { QrCode, ScanLine, PackageCheck, ShieldCheck, ShieldAlert, X, MessageCircleQuestion, Phone } from 'lucide-react'
import FadeIn from '../ui/FadeIn'

const steps = [
  {
    icon: QrCode,
    title: 'Hologram & QR Code',
    desc: 'Har original pack par hollogram aur QR code hota hai. QR ko phone se scan karte hi authenticity verify ho jati hai.',
  },
  {
    icon: ScanLine,
    title: 'Scratch & Verify Code',
    desc: 'Pack ke andar ek unique scratch code hota hai — use official website ya helpline par enter karke check karein.',
  },
  {
    icon: PackageCheck,
    title: 'Batch No. & Expiry Date',
    desc: 'Original pack par batch number, manufacturing aur expiry date clearly printed hoti hai. Faded ya missing text = red flag.',
  },
  {
    icon: ShieldCheck,
    title: 'Tamper-Proof Sealing',
    desc: 'Pack poori tarah sealed aata hai. Agar sealing tead hai, blister open hai ya packing damaged hai — return karein.',
  },
]

const redFlags = [
  'Unverified sellers ya random ads se sasta Power Booster',
  'E-bay, OLX ya kisi bhi third-party site par offer',
  'Fixed MRP se kaafi kam price — sasta hamesha fake hota hai',
  'Mrp ya manufacture details missing hona',
]

function GenuineCheck() {
  return (
    <section id="genuine-check" className="relative overflow-hidden bg-card py-24">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            <ShieldAlert className="h-4 w-4" />
            Originality Check
          </span>
          <h2 className="mt-5 max-w-3xl text-2xl font-bold tracking-tight text-ink sm:text-4xl">
            Asli Power Booster ki pehchan <span className="text-accent">kaise karein?</span>
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-mist">
            Market mein kai fake products mil jaate hain jo naam ka suraj ho ya result ka suraj nahi. Apne Power
            Booster pack par in 4 easy steps se confirm kijiye ke aapko <strong className="font-semibold text-ink">100% original</strong> diya gaya hai.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={0.07 * i}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-lux">
                  <span className="absolute right-5 top-4 text-5xl font-black leading-none text-line/60 transition group-hover:text-accent/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-amber-600 text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="h-full overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-950/40 via-surface to-card p-8 transition duration-300 hover:shadow-lux">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg">
                <ShieldAlert className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">Fake products se bachein</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Original Power Booster sirf <strong className="font-semibold text-accent">official website</strong> aur authorized
                channels se bikta hai. In signs par dhyan dein:
              </p>
              <ul className="mt-6 space-y-3.5">
                {redFlags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-white/80">{flag}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-stone-900 transition hover:bg-accent-dark"
                >
                  <MessageCircleQuestion className="h-4 w-4" />
                  Verify With Us
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-bold text-ink transition hover:border-accent/40 hover:text-accent"
                >
                  <Phone className="h-4 w-4" />
                  Support Helpline
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default GenuineCheck