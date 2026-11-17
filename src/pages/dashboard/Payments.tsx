import { useState, useMemo } from 'react'
import { Plus, Edit, Download, CreditCard as CreditCardIcon, Calendar, Landmark } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/common/StatusBadge'
import type { Payment } from '../../types'

// Sample payment data
const samplePayments: Payment[] = [
  {
    id: 'pay-1',
    tenant_id: 'tenant-1',
    unit_id: 'f2-02',
    lease_id: 'lease-1',
    payment_month: '2024-10',
    amount: 30000,
    payment_date: '2024-10-05',
    payment_method: 'Bank Transfer',
    transaction_ref: 'TXN-2024-10-001',
    status: 'Paid',
    notes: 'Rent payment for October 2024'
  },
  {
    id: 'pay-2',
    tenant_id: 'tenant-1',
    unit_id: 'f2-02',
    lease_id: 'lease-1',
    payment_month: '2024-11',
    amount: 30000,
    payment_date: '2024-11-03',
    payment_method: 'Cash',
    transaction_ref: '',
    status: 'Paid',
    notes: 'Rent payment for November 2024'
  },
  {
    id: 'pay-3',
    tenant_id: 'tenant-2',
    unit_id: 'f3-02',
    lease_id: 'lease-2',
    payment_month: '2024-10',
    amount: 30000,
    payment_date: '2024-10-10',
    payment_method: 'UPI',
    transaction_ref: 'UPi-Pay-2024-002',
    status: 'Paid',
    notes: 'October rent via UPI'
  },
  {
    id: 'pay-4',
    tenant_id: 'tenant-2',
    unit_id: 'f3-02',
    lease_id: 'lease-2',
    payment_month: '2024-11',
    amount: 30000,
    payment_date: '',
    payment_method: 'Cash',
    transaction_ref: '',
    status: 'Pending',
    notes: 'November rent due'
  }
]

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Partial'>('All')
  const [monthFilter, setMonthFilter] = useState('all')

  const filteredPayments = useMemo(() => {
    return samplePayments.filter(payment => {
      const matchesSearch =
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transaction_ref?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || payment.status === statusFilter
      const matchesMonth = monthFilter === 'all' || payment.payment_month === monthFilter
      return matchesSearch && matchesStatus && matchesMonth
    }).sort((a, b) => b.payment_month.localeCompare(a.payment_month))
  }, [searchTerm, statusFilter, monthFilter])

  const stats = {
    totalThisMonth: 270000,
    collected: 60000,
    pending: 60000,
    pendingCount: 1
  }

  const months = ['all', '2024-10', '2024-11', '2024-12', '2025-01']

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Rent & Payments</h1>
          <p className="text-manzil-dark/60">Track rent collection and payment history</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Record Payment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={CreditCardIcon}
          title="This Month"
          value={`₹${stats.totalThisMonth.toLocaleString()}`}
          color="primary"
        />
        <StatCard
          icon={Landmark}
          title="Collected"
          value={`₹${stats.collected.toLocaleString()}`}
          color="success"
        />
        <StatCard
          icon={Calendar}
          title="Pending"
          value={`₹${stats.pending.toLocaleString()}`}
          color="warning"
        />
        <StatCard
          icon={Edit}
          title="Pending Records"
          value={stats.pendingCount.toString()}
          color="warning"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <CreditCardIcon className="absolute left-3 top-3.5 w-5 h-5 text-manzil-dark/40" />
          <input
            type="text"
            placeholder="Search by transaction ID or unit..."
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
          <option value="All">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Partial">Partial</option>
        </select>

        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="px-4 py-2 border border-manzil-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-manzil-gold"
        >
          <option value="all">All Months</option>
          {months.slice(1).map((month) => (
            <option key={month} value={month}>
              {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
            </option>
          ))}
        </select>

        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Payment List */}
      <div className="bg-white rounded-xl shadow-sm border border-manzil-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-manzil-50 border-b border-manzil-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Month</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase hidden md:table-cell">Tenant</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-manzil-dark/60 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase hidden md:table-cell">Method</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase hidden md:table-cell">Reference</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-manzil-dark/60 uppercase">Status</th>
                <th className="px-4 py-3 text-right w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} />
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-medium text-manzil-dark mb-2">No payments found</h3>
            <p className="text-manzil-dark/60 mb-4">
              {searchTerm || statusFilter !== 'All' || monthFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'No payment records for this period'}
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

function PaymentRow({ payment }: { payment: Payment }) {
  return (
    <tr className="border-b border-manzil-100 hover:bg-manzil-50 transition-colors">
      <td className="px-4 py-3 font-medium text-manzil-dark">
        {new Date(payment.payment_month + '-01').toLocaleString('default', {
          month: 'short',
          year: 'numeric'
        })}
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-manzil-dark">{payment.tenant_id}</span>
      </td>
      <td className="px-4 py-3 text-right font-medium text-manzil-dark">
        ₹{payment.amount.toLocaleString()}
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-manzil-dark">{payment.payment_method}</span>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-manzil-dark/60 text-sm">{payment.transaction_ref || '-'}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <StatusBadge status={payment.status} type="payment" />
      </td>
      <td className="px-4 py-3 text-right">
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  )
}