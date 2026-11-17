export interface FloorInfo {
  number: number
  name: string
  description: string
  isOwnerResidence: boolean
  unitCount: number
  unitTypes: string[]
}

export const floorNumbers: FloorInfo[] = [
  {
    number: 0,
    name: 'Ground Floor',
    description: 'Owner Residence - Private living space for the property owner',
    isOwnerResidence: true,
    unitCount: 0,
    unitTypes: []
  },
  {
    number: 1,
    name: 'First Floor',
    description: 'Premium accommodation options',
    isOwnerResidence: false,
    unitCount: 2,
    unitTypes: ['2 BHK', 'Room Set']
  },
  {
    number: 2,
    name: 'Second Floor',
    description: 'Efficient one-bedroom apartments',
    isOwnerResidence: false,
    unitCount: 3,
    unitTypes: ['1 BHK']
  },
  {
    number: 3,
    name: 'Third Floor',
    description: 'Efficient one-bedroom apartments',
    isOwnerResidence: false,
    unitCount: 3,
    unitTypes: ['1 BHK']
  },
  {
    number: 4,
    name: 'Fourth Floor',
    description: 'Efficient one-bedroom apartments',
    isOwnerResidence: false,
    unitCount: 3,
    unitTypes: ['1 BHK']
  },
  {
    number: 5,
    name: 'Fifth Floor',
    description: 'Efficient one-bedroom apartments',
    isOwnerResidence: false,
    unitCount: 3,
    unitTypes: ['1 BHK']
  }
]

export const totalRentalUnits = 14