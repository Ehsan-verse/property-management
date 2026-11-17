import { useParams, Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/common/StatusBadge'
import type { Unit } from '../../types'

// Sample unit data matching UnitsPage
const sampleUnits: Unit[] = [
  {
    id: 'f1-01',
    floor_id: 'floor-1',
    unit_number: 'F1-01',
    unit_type: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    status: 'Vacant',
    monthly_rent: 45000,
    security_deposit: 45000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Spacious two-bedroom apartment with modern amenities and premium finishes. Located on the first floor, this unit offers excellent natural light, a fully-equipped kitchen, and a private balcony.',
    facilities: ['Attached Bathroom', 'Kitchen with Utensils', 'Furnished AC', 'Wi-Fi', 'Balcony'],
    images: []
  },
  {
    id: 'f1-02',
    floor_id: 'floor-1',
    unit_number: 'F1-02',
    unit_type: 'Room Set',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 25000,
    security_deposit: 25000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Comfortable room with attached facilities. Ideal for singles or couples seeking efficient living space. Includes a private bathroom, kitchenette, and all essential furnishings.',
    facilities: ['Attached Bathroom', 'Kitchenette', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f2-01',
    floor_id: 'floor-2',
    unit_number: 'F2-01',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Elegant one-bedroom apartment with premium finishes. This well-designed unit offers excellent storage space, modern fixtures, and a balcony overlooking the building grounds.',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi', 'Balcony'],
    images: []
  },
  {
    id: 'f2-02',
    floor_id: 'floor-2',
    unit_number: 'F2-02',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Occupied',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Currently occupied unit. For enquiry about future availability, please contact the owner.',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  }
  // Additional units would be added here
]

export default function UnitDetailPage() {
  const { unitId } = useParams<{ unitId: string }>()
  const unit = sampleUnits.find(u => u.id === unitId)

  if (!unit) {
    return (
      <div className="min-h-screen bg-manzil-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-manzil-dark mb-4">Unit Not Found</h1>
          <Link to="/units">
            <Button>View All Units</Button>
          </Link>
        </div>
      </div>
    )
  }

  const floorNumber = parseInt(unit.unit_number.split('-')[1])
  const isVacant = unit.status === 'Vacant'

  return (
    <div className="min-h-screen bg-manzil-50">
      {/* Hero Section */}
      <section className="relative h-48 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-manzil-dark to-manzil-800 opacity-90" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/unit-hero.jpg)' }} />
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white">{unit.unit_number}</h1>
          <p className="text-manzil-dark/80">{unit.unit_type} - Floor {floorNumber}</p>
        </div>
      </section>

      {/* Unit Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-xl shadow-sm border border-manzil-200 p-8">
            {/* Header Info */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-manzil-dark mb-2">{unit.unit_number}</h2>
                <p className="text-manzil-dark/60">{unit.unit_type}</p>
              </div>
              <StatusBadge status={unit.status} type="availability" />
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-manzil-200 rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Key Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-manzil-dark mb-4">Unit Details</h3>
                <div className="space-y-3">
                  <DetailRow label="Bedrooms" value={`${unit.bedrooms} (${unit.unit_type})`} />
                  <DetailRow label="Bathrooms" value={unit.bathrooms.toString()} />
                  <DetailRow label="Floor" value={`${floorNumber}${getFloorSuffix(floorNumber)}`} />
                  <DetailRow label="Status" value={unit.status} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-manzil-dark mb-4">
                  {isVacant ? 'Rental Details' : 'Unit Information'}
                </h3>
                <div className="space-y-3">
                  {isVacant && (
                    <>
                      <DetailRow label="Monthly Rent" value={`₹${unit.monthly_rent.toLocaleString()}`} />
                      <DetailRow label="Security Deposit" value={`₹${unit.security_deposit.toLocaleString()}`} />
                    </>
                  )}
                  <DetailRow label="Wi-Fi Available" value={unit.wifi_included ? 'Yes' : 'No'} />
                  {unit.wifi_included && (
                    <DetailRow
                      label="Wi-Fi Included in Rent"
                      value={unit.wifi_charges === 0 ? 'Yes' : `₹${unit.wifi_charges}/month`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-manzil-dark mb-3">Description</h3>
              <p className="text-manzil-dark/80 leading-relaxed">{unit.description}</p>
            </div>

            {/* Facilities */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-manzil-dark mb-3">Facilities</h3>
              <div className="flex flex-wrap gap-2">
                {unit.facilities.map((facility) => (
                  <span
                    key={facility}
                    className="px-3 py-1 text-sm bg-manzil-100 text-manzil-dark rounded-full"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-manzil-200 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {isVacant ? (
                  <>
                    <Button className="flex-1">
                      Schedule Viewing
                    </Button>
                    <Link to="/#contact">
                      <Button variant="outline" className="flex-1">
                        Contact Owner
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/units">
                    <Button className="w-full">
                      View Other Units
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-manzil-dark/70">{label}</span>
      <span className="font-medium text-manzil-dark">{value}</span>
    </div>
  )
}

function getFloorSuffix(n: number): string {
  if (n >= 11 && n <= 13) return 'th'
  switch (n % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}