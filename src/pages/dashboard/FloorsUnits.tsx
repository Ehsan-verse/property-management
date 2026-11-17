import { Plus, Edit, Trash2, Home, Users, BedDouble, Bath as BathIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/common/StatusBadge'
import type { Floor, Unit } from '../../types'

// Sample data - will come from database
const floors: Floor[] = [
  {
    id: 'floor-0',
    floor_number: 0,
    name: 'Ground Floor',
    description: 'Owner Residence',
    is_owner_residence: true,
    units: []
  },
  {
    id: 'floor-1',
    floor_number: 1,
    name: 'First Floor',
    description: 'Premium 2 BHK and Room Set',
    is_owner_residence: false,
    units: [
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
        description: '',
        facilities: [],
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
        description: '',
        facilities: [],
        images: []
      }
    ]
  },
  {
    id: 'floor-2',
    floor_number: 2,
    name: 'Second Floor',
    description: 'Three 1 BHK units',
    is_owner_residence: false,
    units: [
      { id: 'f2-01', floor_id: 'floor-2', unit_number: 'F2-01', unit_type: '1 BHK', bedrooms: 1, bathrooms: 1, status: 'Vacant', monthly_rent: 30000, security_deposit: 30000, wifi_included: true, wifi_charges: 0, description: '', facilities: [], images: [] },
      { id: 'f2-02', floor_id: 'floor-2', unit_number: 'F2-02', unit_type: '1 BHK', bedrooms: 1, bathrooms: 1, status: 'Occupied', monthly_rent: 30000, security_deposit: 30000, wifi_included: true, wifi_charges: 0, description: '', facilities: [], images: [] },
      { id: 'f2-03', floor_id: 'floor-2', unit_number: 'F2-03', unit_type: '1 BHK', bedrooms: 1, bathrooms: 1, status: 'Vacant', monthly_rent: 30000, security_deposit: 30000, wifi_included: true, wifi_charges: 0, description: '', facilities: [], images: [] }
    ]
  }
  // Additional floors would be here
]

export default function FloorsUnits() {
  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Floors & Units</h1>
          <p className="text-manzil-dark/60">Manage building floors and rental units</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Floor
        </Button>
      </div>

      {/* Floors List */}
      <div className="space-y-6">
        {floors.map((floor) => (
          <FloorCard key={floor.id} floor={floor} />
        ))}
      </div>
    </div>
  )
}

function FloorCard({ floor }: { floor: Floor }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-manzil-200 overflow-hidden">
      {/* Floor Header */}
      <div className="p-4 md:p-6 border-b border-manzil-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-manzil-dark flex items-center gap-2">
              <Home className="w-5 h-5 text-manzil-gold" />
              {floor.name}
              {floor.is_owner_residence && (
                <span className="text-xs bg-manzil-800 text-manzil-300 px-2 py-0.5 rounded-full">
                  Owner Residence
                </span>
              )}
            </h2>
            <p className="text-sm text-manzil-dark/60 mt-1">{floor.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Units */}
      {floor.units.length > 0 ? (
        <div className="p-4 md:p-6">
          <h3 className="text-sm font-medium text-manzil-dark mb-4">
            Units ({floor.units.length})
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {floor.units.map((unit) => (
              <UnitListItem key={unit.id} unit={unit} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-6">
          <p className="text-sm text-manzil-dark/60">No units on this floor</p>
        </div>
      )}
    </div>
  )
}

function UnitListItem({ unit }: { unit: Unit }) {
  return (
    <div className="border border-manzil-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-manzil-dark">{unit.unit_number}</h4>
        <StatusBadge status={unit.status} type="availability" />
      </div>
      <div className="flex items-center gap-4 text-sm text-manzil-dark/60 mb-3">
        <div className="flex items-center gap-1">
          <BedDouble className="w-4 h-4" />
          {unit.bedrooms} {unit.bedrooms === 1 ? 'BR' : 'BRs'}
        </div>
        <div className="flex items-center gap-1">
          <BathIcon className="w-4 h-4" />
          {unit.bathrooms} {unit.bathrooms === 1 ? 'BA' : 'BAs'}
        </div>
      </div>
      <div className="text-sm font-medium text-manzil-dark mb-3">
        ₹{unit.monthly_rent.toLocaleString()}/month
      </div>
      {unit.wifi_included && (
        <div className="flex items-center gap-2 text-xs text-manzil-dark/60 mb-3">
          <Users className="w-4 h-4" />
          <span>Wi-Fi Available</span>
        </div>
      )}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Edit
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50">
          Remove
        </Button>
      </div>
    </div>
  )
}