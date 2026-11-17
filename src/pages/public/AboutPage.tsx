import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-manzil-50">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-manzil-dark to-manzil-800 opacity-90" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/about-hero.jpg)' }} />
        <div className="absolute inset-0 bg-black opacity-30" />
        <h1 className="relative z-10 text-4xl font-bold text-white">
          About Hamzah's Manzil
        </h1>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-manzil-dark mb-6">
            A Premium Living Experience
          </h2>
          <p className="text-lg text-manzil-dark/80 leading-relaxed mb-8">
            Hamzah's Manzil is a premium residential rental property offering comfortable, well-maintained
            living spaces in a professionally managed building. We provide a range of accommodation options
            from spacious 2 BHK units to efficient 1 BHK apartments and room sets.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <PropertyPhotoGrid />
            <PropertyStats />
          </div>
        </div>
      </section>

      {/* Building Details */}
      <section className="py-16 px-4 bg-manzil-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-manzil-dark mb-8 text-center">
            Building Details
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-manzil-200 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <BuildingInfoCard
                title="Total Floors"
                value="6"
                icon="🏢"
              />
              <BuildingInfoCard
                title="Rental Units"
                value="14"
                icon="🏠"
              />
              <BuildingInfoCard
                title="Ground Floor"
                value="Owner Residence"
                icon="🔑"
              />
              <BuildingInfoCard
                title="Wi-Fi"
                value="Common Network"
                icon="📶"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-manzil-dark mb-8 text-center">
            Property Facilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FacilityCard
              icon="🛏️"
              name="Bedrooms"
              description="Well-furnished bedrooms with comfortable beds"
            />
            <FacilityCard
              icon="🚿"
              name="Attached Bathrooms"
              description="Clean, maintained bathrooms with all amenities"
            />
            <FacilityCard
              icon="🔌"
              name="Power Outlets"
              description="Sufficient power outlets throughout the unit"
            />
            <FacilityCard
              icon="🪟"
              name="Windows"
              description="Good ventilation and natural light"
            />
            <FacilityCard
              icon="🧹"
              name="Regular Cleaning"
              description="Professional cleaning services provided"
            />
            <FacilityCard
              icon="📶"
              name="High-Speed Wi-Fi"
              description="Common network available throughout the building"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-manzil-gold to-manzil-600 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your New Home?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Explore our available rental units and schedule a viewing today.
          </p>
          <Link to="/units">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-manzil-dark">
              View Available Units
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function PropertyPhotoGrid() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="aspect-square bg-manzil-200 rounded-lg" />
        <div className="aspect-square bg-manzil-200 rounded-lg" />
        <div className="aspect-square bg-manzil-200 rounded-lg" />
        <div className="aspect-square bg-manzil-200 rounded-lg" />
      </div>
    </div>
  )
}

function PropertyStats() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-manzil-200 p-6">
      <h3 className="text-xl font-semibold text-manzil-dark mb-4">Property Summary</h3>
      <div className="space-y-3">
        <StatRow label="Building Type" value="Residential Apartment" />
        <StatRow label="Construction Year" value="Sample Building" />
        <StatRow label="Management" value="Owner-Managed" />
        <StatRow label="Security" value="Available" />
      </div>
    </div>
  )
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-manzil-dark/60">{label}</span>
      <span className="font-medium text-manzil-dark">{value}</span>
    </div>
  )
}

function BuildingInfoCard({ title, value, icon }: { title: string, value: string, icon: string }) {
  return (
    <div className="bg-manzil-50 rounded-lg p-4 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="text-sm text-manzil-dark/60 mb-1">{title}</h4>
      <p className="font-semibold text-manzil-dark">{value}</p>
    </div>
  )
}

function FacilityCard({ icon, name, description }: { icon: string, name: string, description: string }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-manzil-200">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-medium text-manzil-dark mb-1">{name}</h4>
      <p className="text-sm text-manzil-dark/60">{description}</p>
    </div>
  )
}