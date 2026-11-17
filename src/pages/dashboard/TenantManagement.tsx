import { useState, useMemo } from 'react'
import { Plus, Edit, Mail, Phone, User, Home, Calendar, CreditCard, FileText } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/common/StatusBadge'
import type { Tenant } from '../../types'

// Sample tenant data
const sampleTenants: Tenant[] = [
  {
    id: 'tenant-1',
    full_name: 'Rajesh Kumar',
    phone: '9876543210',
    email: 'rajesh.kumar@email.com',
    permanent_address: 'Delhi, India',
    emergency_contact: 'Suresh Kumar - 9876543211',
    family_members: 2,
    unit_id: 'f2-02',
    lease_start: '2024-01-01',
    lease_end: '2024-12-31',
    monthly_rent: 30000,
    security_deposit: 30000,
    status: 'Active',
    notes: 'Good tenant, pays rent on time'
  },
  {
    id: 'tenant-2',
    full_name: 'Priya Sharma',
    phone: '9876543212',
    email: 'priya.sharma@email.com',
    permanent_address: 'Noida, India',
    emergency_contact: 'Amit Sharma - 9876543213',
    family_members: 1,
    unit_id: 'f3-02',
    lease_start: '2024-02-15',
    lease_end: '2025-02-14',
    monthly_rent: 30000,
    security_deposit: 30000,
    status: 'Active',
    notes: 'Software engineer, very quiet'
  },
  {
    id: 'tenant-3',
    full_name: 'Ahmed Hassan',
    phone: '9876543214',
    email: 'ahmed.hassan@email.com',
    permanent_address: 'Lucknow, India',
    emergency_contact: 'Fatima Hassan - 9876543215',
    family_members: 3,
    unit_id: 'f5-02',
    lease_start: '2024-03-01',
    lease_end: '2025-02-28',
    monthly_rent: 30000,
    security_deposit: 30000,
    status: 'Active',
    notes: 'Family of three, responsible tenant'
  }
]

export default function TenantManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Former'>('All')

  const filteredTenants = useMemo(() => {
    return sampleTenants.filter(tenant => {
      const matchesSearch =
        tenant.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.phone.includes(searchTerm) ||
        tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || tenant.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Tenant Management</h1>
          <p className="text-manzil-dark/60">Manage tenant records and lease information</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={User}
          title="Active Tenants"
          value="7"
          color="success"
        />
        <StatCard
          icon={User}
          title="Former Tenants"
          value="3"
          color="info"
        />
        <StatCard
          icon={Home}
          title="Total Tenants"
          value="10"
          color="primary"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <User className="absolute left-3 top-3.5 w-5 h-5 text-manzil-dark/40" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-manzil-300 rounded-md focus:outline-none focus:ring-2 focus:ring-manzil-gold"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-4 py-2 border border-manzil-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-manzil-gold"
        >
          <option value="All">All Tenants</option>
          <option value="Active">Active Only</option>
          <option value="Former">Former Only</option>
        </select>
      </div>

      {/* Tenant List */}
      <div className="bg-white rounded-xl shadow-sm border border-manzil-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-manzil-50 border-b border-manzil-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Tenant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase hidden md:table-cell">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase hidden md:table-cell">Lease Term</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase hidden md:table-cell">Rent</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-manzil-dark/60 uppercase">Status</th>
                <th className="px-4 py-3 text-right w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <TenantRow key={tenant.id} tenant={tenant} />
              ))}
            </tbody>
          </table>
        </div>

        {filteredTenants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-medium text-manzil-dark mb-2">No tenants found</h3>
            <p className="text-manzil-dark/60 mb-4">
              {searchTerm || statusFilter !== 'All'
                ? 'Try adjusting your search criteria'
                : 'No tenant records yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, title, value, color = 'primary' }: {
  icon: any
  title: string
  value: string | number
  color?: 'primary' | 'success' | 'warning' | 'info'
}) {
  const colors = {
    primary: 'text-manzil-dark bg-manzil-100',
    success: 'text-green-700 bg-green-100',
    warning: 'text-orange-700 bg-orange-100',
    info: 'text-blue-700 bg-blue-100'
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-manzil-200">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-manzil-dark/60">{title}</p>
          <h3 className="font-bold text-manzil-dark text-lg">{value}</h3>
        </div>
      </div>
    </div>
  )
}

function TenantRow({ tenant }: { tenant: Tenant }) {
  return (
    <tr className="border-b border-manzil-100 hover:bg-manzil-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-manzil-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-manzil-dark/60" />
          </div>
          <div>
            <p className="font-medium text-manzil-dark">{tenant.full_name}</p>
            <p className="text-xs text-manzil-dark/50 hidden md:inline">
              {tenant.family_members > 1 ? `${tenant.family_members} members` : 'Single'}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-manzil-dark/40" />
          <span>{tenant.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-manzil-dark/60 md:hidden">
          <Mail className="w-4 h-4" />
          <span className="truncate max-w-[150px]">{tenant.email}</span>
        </div>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-manzil-dark">{tenant.unit_id}</span>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-manzil-dark/40" />
          <span>
            {new Date(tenant.lease_start).getFullYear()} - {new Date(tenant.lease_end).getFullYear()}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="font-medium text-manzil-dark">₹{tenant.monthly_rent.toLocaleString()}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <StatusBadge status={tenant.status} type="tenant" />
      </td>
      <td className="px-4 py-3 text-right">
        <Link to={`/admin/tenants/${tenant.id}`}>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
      </td>
    </tr>
  )
}