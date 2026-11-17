export interface Unit {
  id: string
  floor_id: string
  unit_number: string
  unit_type: '1 BHK' | '2 BHK' | 'Room Set'
  bedrooms: number
  bathrooms: number
  status: 'Vacant' | 'Occupied' | 'Maintenance' | 'Temporarily Unavailable'
  monthly_rent: number
  security_deposit: number
  wifi_included: boolean
  wifi_charges: number
  description: string
  facilities: string[]
  images: string[]
}

export interface Floor {
  id: string
  floor_number: number
  name: string
  description: string
  is_owner_residence: boolean
  units: Unit[]
}

export interface Tenant {
  id: string
  full_name: string
  phone: string
  email: string
  permanent_address: string
  emergency_contact: string
  family_members: number
  unit_id: string
  lease_start: string
  lease_end: string
  monthly_rent: number
  security_deposit: number
  status: 'Active' | 'Former'
  notes: string
}

export interface Payment {
  id: string
  tenant_id: string
  unit_id: string
  lease_id?: string
  payment_month: string // YYYY-MM
  amount: number
  payment_date: string
  payment_method: 'Cash' | 'UPI' | 'Bank Transfer' | 'Other'
  transaction_ref: string
  status: 'Paid' | 'Pending' | 'Partial'
  notes: string
}

export interface MaintenanceRequest {
  id: string
  unit_id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  status: 'Pending' | 'In Progress' | 'Completed'
  estimated_cost: number
  created_at: string
}

export interface Expense {
  id: string
  title: string
  category: 'Electricity' | 'Water' | 'Repairs' | 'Cleaning' | 'Maintenance' | 'Internet/Wi-Fi' | 'Other'
  amount: number
  date: string
  unit_id?: string
  description: string
}

export interface Enquiry {
  id: string
  visitor_name: string
  phone: string
  email: string
  unit_id?: string
  message: string
  status: 'New' | 'Contacted' | 'Closed'
  created_at: string
}

export interface WifiAccess {
  id: string
  unit_id: string
  wifi_available: boolean
  wifi_included: boolean
  additional_charges: number
  access_enabled: boolean
  notes: string
}
