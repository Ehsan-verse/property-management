import { useState } from 'react'
import { floorNumbers } from '../../data/floors'

export default function BuildingOverview() {
  const [selectedFloor, setSelectedFloor] = useState(0)

  return (
    <div className="min-h-screen bg-manzil-50">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-manzil-dark to-manzil-800 opacity-90" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/building-hero.jpg)' }} />
        <div className="absolute inset-0 bg-black opacity-30" />
        <h1 className="relative z-10 text-4xl font-bold text-white">
          Building Overview
        </h1>
      </section>

      {/* Floor Selector */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-manzil-dark mb-8 text-center">
            Six Storey Building
          </h2>

          <div className="mb-12">
            <FloorSelector
              selectedFloor={selectedFloor}
              onSelect={setSelectedFloor}
            />
          </div>

          {/* Floor Details */}
          <div className="bg-white rounded-xl shadow-sm border border-manzil-200 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FloorImagePlaceholder floor={selectedFloor} />
              <FloorDetails floor={selectedFloor} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Floor List */}
      <section className="py-16 px-4 bg-manzil-100">
        <div className="container mx-auto max-w-5xl">
          <h3 className="text-2xl font-bold text-manzil-dark mb-6">All Floors</h3>

          <div className="space-y-4">
            {floorNumbers.map((floor) => (
              <FloorListItem
                key={floor.number}
                floor={floor}
                onClick={() => setSelectedFloor(floor.number - 1)}
                isSelected={selectedFloor === floor.number - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function FloorSelector({ selectedFloor, onSelect }: { selectedFloor: number, onSelect: (index: number) => void }) {
  return (
    <div className="flex justify-center gap-2 overflow-x-auto pb-4">
      {floorNumbers.map((floor, index) => (
        <button
          key={floor.number}
          onClick={() => onSelect(index)}
          className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
            selectedFloor === index
              ? 'bg-manzil-gold text-white'
              : 'bg-white text-manzil-dark hover:bg-manzil-100 border border-manzil-300'
          }`}
        >
          {floor.name}
          {floor.isOwnerResidence && ' (Owner)'}
          {floor.unitCount > 0 && ` - ${floor.unitCount} ${floor.unitCount === 1 ? 'Unit' : 'Units'}`}
        </button>
      ))}
    </div>
  )
}

function FloorImagePlaceholder({ floor }: { floor: number }) {
  const isOwnerResidence = floor === 0

  return (
    <div className="bg-manzil-200 rounded-xl h-64 flex items-center justify-center">
      {isOwnerResidence ? (
        <div className="text-center">
          <div className="text-4xl mb-2">🏠</div>
          <p className="text-manzil-dark font-medium">Owner Residence</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-4xl mb-2">🏢</div>
          <p className="text-manzil-dark font-medium">Floor {floor + 1}</p>
          <p className="text-sm text-manzil-dark/60">Rental Units</p>
        </div>
      )}
    </div>
  )
}

function FloorDetails({ floor }: { floor: number }) {
  const isOwnerResidence = floor === 0
  const floorData = floorNumbers[floor]

  return (
    <div>
      <h3 className="text-2xl font-bold text-manzil-dark mb-4">
        {floorData.name}
      </h3>

      {isOwnerResidence ? (
        <div className="space-y-4">
          <p className="text-manzil-dark/80">
            The ground floor is reserved for the owner's residence and is not available for rent.
          </p>
          <div className="bg-manzil-50 rounded-lg p-4">
            <h4 className="font-medium text-manzil-dark mb-2">Owner Residence Features</h4>
            <ul className="space-y-2 text-manzil-dark/70">
              <li>• Private entrance</li>
              <li>• Secure living space</li>
              <li>• Dedicated parking</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-manzil-dark/80">
            {floorData.description}
          </p>

          <div className="space-y-2">
            <h4 className="font-medium text-manzil-dark">Available Unit Types:</h4>
            {floorData.unitTypes.map((unitType) => (
              <div key={unitType} className="bg-manzil-50 rounded-lg p-3">
                <span className="font-medium text-manzil-dark">{unitType}</span>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={() => {
              const event = new CustomEvent('floor-units-clicked', { detail: floor + 1 })
              window.dispatchEvent(event)
            }}
          >
            View Units on This Floor
          </button>
        </div>
      )}
    </div>
  )
}

function FloorListItem({ floor, onClick, isSelected }: {
  floor: typeof floorNumbers[0]
  onClick: () => void
  isSelected: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all ${
        isSelected
          ? 'bg-manzil-gold text-white'
          : 'bg-white hover:bg-manzil-100 border border-manzil-200'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-manzil-dark">
            {floor.name}
            {floor.isOwnerResidence && ' (Owner Residence)'}
          </h4>
          <p className="text-sm text-manzil-dark/60">
            {floor.description}
          </p>
        </div>
        <div className="text-right">
          <span className="px-2 py-0.5 text-xs font-medium bg-manzil-100 text-manzil-800 rounded-full">
            {floor.unitCount} {floor.unitCount === 1 ? 'Unit' : 'Units'}
          </span>
        </div>
      </div>
    </button>
  )
}