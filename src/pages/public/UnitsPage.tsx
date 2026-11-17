import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/common/StatusBadge'
import type { Unit } from '../../types'

// Sample unit data - will be managed from database in production
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
    description: 'Elegant one-bedroom apartment with premium finishes. Currently occupied.',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f2-03',
    floor_id: 'floor-2',
    unit_number: 'F2-03',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Elegant one-bedroom apartment with premium finishes',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f3-01',
    floor_id: 'floor-3',
    unit_number: 'F3-01',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Spacious one-bedroom apartment with good ventilation',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f3-02',
    floor_id: 'floor-3',
    unit_number: 'F3-02',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Occupied',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Spacious one-bedroom apartment with good ventilation',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f3-03',
    floor_id: 'floor-3',
    unit_number: 'F3-03',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Spacious one-bedroom apartment with good ventilation',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f4-01',
    floor_id: 'floor-4',
    unit_number: 'F4-01',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Modern one-bedroom unit on fourth floor',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f4-02',
    floor_id: 'floor-4',
    unit_number: 'F4-02',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Temporarily Unavailable',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Modern one-bedroom unit - Under Maintenance',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f4-03',
    floor_id: 'floor-4',
    unit_number: 'F4-03',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Modern one-bedroom unit on fourth floor',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f5-01',
    floor_id: 'floor-5',
    unit_number: 'F5-01',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Comfortable one-bedroom on top floor with good natural light',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f5-02',
    floor_id: 'floor-5',
    unit_number: 'F5-02',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Occupied',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Comfortable one-bedroom on top floor with good natural light',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  },
  {
    id: 'f5-03',
    floor_id: 'floor-5',
    unit_number: 'F5-03',
    unit_type: '1 BHK',
    bedrooms: 1,
    bathrooms: 1,
    status: 'Vacant',
    monthly_rent: 30000,
    security_deposit: 30000,
    wifi_included: true,
    wifi_charges: 0,
    description: 'Comfortable one-bedroom on top floor with good natural light',
    facilities: ['Attached Bathroom', 'Kitchen', 'Furnished', 'Wi-Fi'],
    images: []
  }
]

export default function UnitsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'rent' | 'unit_number'>('rent')

  const floorNumbers = [1, 2, 3, 4, 5]

  const filteredUnits = useMemo(() => {
    return sampleUnits
      .filter(unit => {
        const matchesSearch = unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase())
        const floorNum = parseInt(unit.unit_number.split('-')[1])
        const matchesFloor = selectedFloor ? floorNum === selectedFloor : true
        const matchesType = selectedType === 'All' || unit.unit_type === selectedType
        const matchesStatus = selectedStatus === 'All' || unit.status === selectedStatus
        return matchesSearch && matchesFloor && matchesType && matchesStatus
      })
      .sort((a, b) => {
        if (sortBy === 'rent') {
          return b.monthly_rent - a.monthly_rent
        }
        return a.unit_number.localeCompare(b.unit_number)
      })
  }, [searchTerm, selectedFloor, selectedType, selectedStatus, sortBy])

  const vacancyCount = filteredUnits.filter(u => u.status === 'Vacant').length

  return (
    <div className="min-h-screen bg-manzil-50">
      {/* Hero Section */}
      <section className="relative h-56 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-manzil-dark to-manzil-800 opacity-90" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/units-hero.jpg)' }} />
        <div className="absolute inset-0 bg-black opacity-30" />
        <h1 className="relative z-10 text-3xl font-bold text-white">
          Available Rental Units
        </h1>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 border-b border-manzil-200">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-manzil-dark">
              {vacancyCount} {vacancyCount === 1 ? 'Unit' : 'Units'} Available
            </h2>
            <div className="text-sm text-manzil-dark/60">
              Showing {filteredUnits.length} of {sampleUnits.length} units
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by unit number (e.g., F1-01, F2-02)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-manzil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-manzil-gold"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-manzil-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-manzil-gold"
            >
              <option value="All">All Unit Types</option>
              <option value="2 BHK">2 BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="Room Set">Room Set</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-manzil-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-manzil-gold"
            >
              <option value="All">All Statuses</option>
              <option value="Vacant">Vacant</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Under Maintenance</option>
              <option value="Temporarily Unavailable">Temporarily Unavailable</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-manzil-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-manzil-gold"
            >
              <option value="rent">Sort by Rent {sortBy === 'rent' && '↓'}</option>
              <option value="unit_number">Sort by Unit Number {sortBy === 'unit_number' && 'A-Z'}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Units Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {filteredUnits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-manzil-dark mb-2">No units found</h3>
              <p className="text-manzil-dark/60 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedType('All')
                  setSelectedStatus('All')
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function UnitCard({ unit }: { unit: Unit }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-manzil-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-manzil-dark">{unit.unit_number}</h3>
          <StatusBadge status={unit.status} type="availability" />
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{unit.bedrooms > 0 ? '🛏️' : '🏠'}</span>
            <span className="text-manzil-dark font-medium">{unit.unit_type}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl">🚿</span>
            <span className="text-manzil-dark">{unit.bathrooms} Bathroom{unit.bathrooms > 1 ? 's' : ''}</span>
          </div>

          {unit.status === 'Vacant' && (
            <div className="bg-manzil-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-manzil-dark text-sm">Monthly Rent</span>
                <span className="font-bold text-manzil-gold text-base">₹{unit.monthly_rent.toLocaleString()}</span>
              </div>
              {unit.wifi_included && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-manzil-dark/70">Wi-Fi</span>
                  <span className="text-manzil-dark">Included</span>
                </div>
              )}
            </div>
          )}
        </div>

        <Link to={`/units/${unit.id}`}>
          <Button className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}