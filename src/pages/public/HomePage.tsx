import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Wifi, Sparkles, MapPin, ShieldCheck, Home, BadgeIndianRupee, Phone, Mail } from 'lucide-react'
import { useReveal } from '../../hooks/useReveal'

const FLOORS = [
  { floor: 'Fifth', name: '3 × 1 BHK', units: 3 },
  { floor: 'Fourth', name: '3 × 1 BHK', units: 3 },
  { floor: 'Third', name: '3 × 1 BHK', units: 3 },
  { floor: 'Second', name: '3 × 1 BHK', units: 3 },
  { floor: 'First', name: '1 × 2 BHK + 1 Room Set', units: 2 },
  { floor: 'Ground', name: 'Owner Residence', units: 0 },
]

const FEATURES = [
  { icon: Home, title: 'Well kept', text: 'Thoughtfully maintained homes with modern essentials.' },
  { icon: Wifi, title: 'High-speed Wi-Fi', text: 'Reliable internet throughout the building.' },
  { icon: Sparkles, title: 'Clean & quiet', text: 'A peaceful setting with regular upkeep.' },
  { icon: MapPin, title: 'Easy to reach', text: 'Close to Utkarsh Hospital and daily conveniences.' },
  { icon: ShieldCheck, title: 'Secure', text: 'Gated access and attentive visitor management.' },
  { icon: BadgeIndianRupee, title: 'Honest pricing', text: 'Clear, fair terms with no hidden charges.' },
]

export default function HomePage() {
  useReveal()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-manzil-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-manzil-200/60 blur-3xl" />

        <div className="container relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 pt-16 md:grid-cols-2 md:pb-32 md:pt-24">
          <div>
            <p className="eyebrow fade-up text-manzil-gold">Greater Noida · Residential Rentals</p>
            <h1 className="fade-up mt-6 font-display text-5xl leading-[1.05] text-manzil-dark md:text-7xl" style={{ animationDelay: '0.1s' }}>
              A calm place
              <br />
              to call <span className="italic text-manzil-gold">home.</span>
            </h1>
            <p className="fade-up mt-8 max-w-md text-lg font-light leading-relaxed text-manzil-700" style={{ animationDelay: '0.2s' }}>
              Comfortable 1 & 2 BHK homes in a quiet, well-managed building at Hamzah&apos;s Manzil.
            </p>
            <div className="fade-up mt-10 flex flex-wrap items-center gap-6" style={{ animationDelay: '0.3s' }}>
              <Link to="/units" className="btn btn-primary gap-2 px-7 py-3">
                View available homes <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#location" className="text-sm tracking-wide text-manzil-700 underline-offset-8 transition hover:text-manzil-gold hover:underline">
                See location
              </a>
            </div>
          </div>

          {/* Minimal building illustration */}
          <div className="fade-up relative mx-auto w-full max-w-sm" style={{ animationDelay: '0.25s' }}>
            <div className="rounded-t-[10rem] border border-manzil-200 bg-white/70 p-6 pt-24 shadow-2xl shadow-manzil-900/10 backdrop-blur">
              <div className="space-y-2.5">
                {FLOORS.map(({ floor, units }) => (
                  <div key={floor} className="flex gap-2.5">
                    {Array.from({ length: Math.max(units, 1) }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-9 flex-1 rounded-md ${
                          units === 0 ? 'bg-manzil-dark/90' : (i + floor.length) % 3 === 0 ? 'bg-manzil-gold/70' : 'bg-manzil-100'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center font-display text-lg italic text-manzil-600">Z/19 · Hamzah Manzil</p>
            </div>
          </div>
        </div>
      </section>

      {/* Building */}
      <section className="px-6 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="reveal mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-manzil-gold">The building</p>
              <h2 className="mt-3 font-display text-4xl text-manzil-dark md:text-5xl">Six floors, thoughtfully planned</h2>
            </div>
            <Link to="/buildings" className="text-sm text-manzil-700 transition hover:text-manzil-gold">
              Explore the building →
            </Link>
          </div>

          <div className="divide-y divide-manzil-200 border-y border-manzil-200">
            {FLOORS.map(({ floor, name, units }) => (
              <div key={floor} className="reveal group flex items-center justify-between gap-4 py-6 transition-colors">
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="w-24 font-display text-2xl text-manzil-dark md:w-32">{floor}</span>
                  <span className="text-manzil-600">{name}</span>
                </div>
                {units > 0 ? (
                  <Link to="/units" className="text-sm text-manzil-500 transition group-hover:text-manzil-gold">
                    {units} {units === 1 ? 'unit' : 'units'} →
                  </Link>
                ) : (
                  <span className="text-xs uppercase tracking-widest text-manzil-400">Private</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-manzil-100/60 px-6 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="reveal mx-auto mb-16 max-w-xl text-center">
            <p className="eyebrow text-manzil-gold">Why live here</p>
            <h2 className="mt-3 font-display text-4xl text-manzil-dark md:text-5xl">Simple comforts, done well</h2>
          </div>
          <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="reveal">
                <Icon className="h-6 w-6 text-manzil-gold" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl text-manzil-dark">{title}</h3>
                <p className="mt-2 font-light leading-relaxed text-manzil-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 px-6 py-24">
        <div className="container mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow text-manzil-gold">Get in touch</p>
            <h2 className="mt-3 font-display text-4xl text-manzil-dark md:text-5xl">Come and see it</h2>
            <p className="mt-6 max-w-sm font-light leading-relaxed text-manzil-700">
              Questions about a home or want to arrange a visit? Speak with Khalid Anwar, the property manager.
            </p>
            <div className="mt-10 space-y-4">
              <a href="tel:+919873444716" className="flex items-center gap-4 text-manzil-dark transition hover:text-manzil-gold">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-manzil-200"><Phone className="h-4 w-4" /></span>
                +91 98734 44716
              </a>
              <a href="mailto:khalid0142759@gmail.com" className="flex items-center gap-4 text-manzil-dark transition hover:text-manzil-gold">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-manzil-200"><Mail className="h-4 w-4" /></span>
                khalid0142759@gmail.com
              </a>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </div>
  )
}

function EnquiryForm() {
  // Opens the visitor's email app with the enquiry pre-filled for the owner
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = [
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      data.get('email') ? `Email: ${data.get('email')}` : '',
      '',
      String(data.get('message') ?? ''),
    ].filter((l, i) => l !== '' || i === 3).join('\n')
    window.location.href = `mailto:khalid0142759@gmail.com?subject=${encodeURIComponent("Enquiry - Hamzah's Manzil")}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={handleSubmit} className="reveal space-y-6 rounded-3xl border border-manzil-200 bg-white/70 p-8 md:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input name="name" required className="field" placeholder="Your name *" />
        </label>
        <label className="block">
          <span className="sr-only">Phone</span>
          <input name="phone" type="tel" required className="field" placeholder="Phone *" />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Email</span>
        <input name="email" type="email" className="field" placeholder="Email (optional)" />
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea name="message" rows={4} required className="field resize-none" placeholder="How can we help? *" />
      </label>
      <button type="submit" className="btn btn-primary w-full py-3.5">Send enquiry</button>
    </form>
  )
}
