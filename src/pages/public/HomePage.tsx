import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-manzil-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-manzil-dark to-manzil-800 opacity-90" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/placeholder-hero.jpg)' }} />
        <div className="absolute inset-0 bg-black opacity-30" />

        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Find Your Comfortable Home at Hamzah&apos;s Manzil
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Premium residential rental property offering comfortable living spaces with modern amenities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/units">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Available Units
              </Button>
            </Link>
            <Link to="#contact">
              <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-manzil-dark">
                Contact Owner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Building Overview Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-manzil-dark mb-4">
              Building Overview
            </h2>
            <p className="text-manzil-dark/70 max-w-2xl mx-auto">
              A premium 6-storey residential building with diverse accommodation options
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BuildingFloorCard
              floor="Ground Floor"
              name="Owner Residence"
              units={0}
              isOwnerResidence
              color="from-manzil-100 to-manzil-50"
            />
            <BuildingFloorCard
              floor="First Floor"
              name="1 x 2 BHK + 1 x Room Set"
              units={2}
              color="from-manzil-50 to-manzil-100"
            />
            <BuildingFloorCard
              floor="Second Floor"
              name="3 x 1 BHK"
              units={3}
              color="from-manzil-100 to-manzil-50"
            />
            <BuildingFloorCard
              floor="Third Floor"
              name="3 x 1 BHK"
              units={3}
              color="from-manzil-50 to-manzil-100"
            />
            <BuildingFloorCard
              floor="Fourth Floor"
              name="3 x 1 BHK"
              units={3}
              color="from-manzil-100 to-manzil-50"
            />
            <BuildingFloorCard
              floor="Fifth Floor"
              name="3 x 1 BHK"
              units={3}
              color="from-manzil-50 to-manzil-100"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-manzil-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-manzil-dark mb-4">
              Why Choose Hamzah's Manzil?
            </h2>
            <p className="text-manzil-dark/70 max-w-2xl mx-auto">
              We offer premium residential comfort with professional management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="🏠"
              title="Premium Quality"
              description="Well-maintained units with modern amenities and comfortable living spaces"
            />
            <FeatureCard
              icon="📶"
              title="High-Speed Wi-Fi"
              description="High-speed internet connectivity available throughout the building"
            />
            <FeatureCard
              icon="✨"
              title="Clean & Quiet"
              description="Peaceful environment with regular maintenance and cleaning services"
            />
            <FeatureCard
              icon="📍"
              title="Prime Location"
              description="Convenient location with easy access to public transport and amenities"
            />
            <FeatureCard
              icon="🛡️"
              title="Secure Environment"
              description="Gated security access with proper visitor management"
            />
            <FeatureCard
              icon="💰"
              title="Transparent Pricing"
              description="Clear, fair rental terms with no hidden charges"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-manzil-dark mb-4">
              Contact Owner
            </h2>
            <p className="text-manzil-dark/70">
              Have questions? Get in touch with Khalid Anwar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ContactInfoCard />
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  )
}

function BuildingFloorCard({ floor, name, units, isOwnerResidence, color }: {
  floor: string
  name: string
  units: number
  isOwnerResidence?: boolean
  color: string
}) {
  return (
    <div className={`bg-gradient-to-r ${color} rounded-xl p-6 shadow-sm border border-manzil-200`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-manzil-dark">{floor}</h3>
        {isOwnerResidence && (
          <span className="px-2 py-0.5 text-xs font-medium bg-manzil-800 text-manzil-300 rounded-full">
            Owner Residence
          </span>
        )}
      </div>
      <p className="text-manzil-dark/70 text-sm mb-3">{name}</p>
      {!isOwnerResidence && (
        <Link to="/units" className="text-manzil-gold font-medium text-sm hover:underline">
          View {units} {units === 1 ? 'Unit' : 'Units'}
        </Link>
      )}
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-manzil-200 hover:shadow-md transition-shadow">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-manzil-dark mb-2">{title}</h3>
      <p className="text-manzil-dark/70 text-sm">{description}</p>
    </div>
  )
}

function ContactInfoCard() {
  return (
    <div className="space-y-6">
      <ContactInfoItem
        icon="📞"
        label="Phone"
        value="9873444716"
      />
      <ContactInfoItem
        icon="✉️"
        label="Email"
        value="khalid0142759@gmail.com"
      />
      <ContactInfoItem
        icon="💼"
        label="Property Manager"
        value="Khalid Anwar"
      />
    </div>
  )
}

function ContactInfoItem({ icon, label, value }: { icon: string, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-manzil-100 rounded-lg">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs text-manzil-dark/60">{label}</p>
        <p className="font-medium text-manzil-dark">{value}</p>
      </div>
    </div>
  )
}

function EnquiryForm() {
  return (
    <form className="bg-white rounded-xl p-6 shadow-sm border border-manzil-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-manzil-dark mb-1" htmlFor="name">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-manzil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-manzil-gold"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-manzil-dark mb-1" htmlFor="phone">
          Phone *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="w-full px-3 py-2 border border-manzil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-manzil-gold"
          placeholder="Your phone number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-manzil-dark mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-manzil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-manzil-gold"
          placeholder="Your email (optional)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-manzil-dark mb-1" htmlFor="message">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-3 py-2 border border-manzil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-manzil-gold"
          placeholder="How can we help you?"
        />
      </div>
      <button type="submit" className="w-full btn btn-primary">
        Send Enquiry
      </button>
    </form>
  )
}