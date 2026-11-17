import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

const ADDRESS_LINES = [
  'Z/19 Hamzah Manzil',
  'Near Utkarsh Hospital, Haldoni',
  'Post - Kuleshra, Gautam Budh Nagar',
  'Greater Noida, Uttar Pradesh 201306',
  'India',
]
const MAP_QUERY = encodeURIComponent(
  'Utkarsh Hospital, Haldoni, Kuleshra, Greater Noida, Uttar Pradesh 201306, India'
)

export function Footer() {
  return (
    <footer className="bg-manzil-dark text-manzil-200">
      {/* Location */}
      <section id="location" className="border-b border-white/5">
        <div className="container mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-5 md:items-center">
          <div className="md:col-span-2">
            <p className="eyebrow text-manzil-gold">Location</p>
            <h2 className="mt-3 font-display text-4xl text-white">Find us</h2>
            <address className="mt-6 flex gap-3 not-italic leading-relaxed text-manzil-300">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-manzil-gold" />
              <span>
                {ADDRESS_LINES.map(line => (
                  <span key={line} className="block">{line}</span>
                ))}
              </span>
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-manzil-gold/50 pb-1 text-sm tracking-wide text-white transition hover:border-manzil-gold hover:text-manzil-gold"
            >
              Get directions <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 md:col-span-3">
            <iframe
              title="Map showing Hamzah Manzil, Greater Noida"
              src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
              className="h-72 w-full grayscale-[60%] invert-[90%] hue-rotate-180 contrast-[0.9] md:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="container mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-2xl text-white">Hamzah&apos;s Manzil</p>
          <p className="mt-2 max-w-xs text-sm text-manzil-400">
            Calm, well-kept homes in Greater Noida.
          </p>
        </div>
        <nav className="flex gap-8 text-sm">
          <Link to="/about" className="transition hover:text-manzil-gold">About</Link>
          <Link to="/buildings" className="transition hover:text-manzil-gold">Building</Link>
          <Link to="/units" className="transition hover:text-manzil-gold">Units</Link>
        </nav>
        <div className="space-y-2 text-sm">
          <a href="tel:+919873444716" className="flex items-center gap-2 transition hover:text-manzil-gold">
            <Phone className="h-4 w-4" /> +91 98734 44716
          </a>
          <a href="mailto:khalid0142759@gmail.com" className="flex items-center gap-2 transition hover:text-manzil-gold">
            <Mail className="h-4 w-4" /> khalid0142759@gmail.com
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs tracking-wide text-manzil-500">
        © {new Date().getFullYear()} Hamzah&apos;s Manzil · Z/19, Haldoni, Greater Noida
      </div>
    </footer>
  )
}
