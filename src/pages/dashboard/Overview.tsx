import { Users, CreditCard, Home, AlertCircle, TrendingUp, Calendar } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function Overview() {
  // Demo data - will come from database
  const stats = {
    totalUnits: 14,
    vacant: 6,
    occupied: 7,
    temporarilyUnavailable: 1,
    activeTenants: 7,
    monthlyExpectedRent: 270000,
    rentCollected: 189000,
    pendingRent: 81000,
    totalExpenses: 15000
  }

  const recentActivity = [
    { action: 'Unit F3-03 marked as Available', time: '2 hours ago' },
    { action: 'Payment received from tenant', time: '1 day ago' },
    { action: 'Maintenance request created', time: '3 days ago' },
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Dashboard Overview</h1>
          <p className="text-manzil-dark/60">Welcome back, Khalid!</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Home}
          title="Total Units"
          value={stats.totalUnits}
          description="Rental units only"
          color="primary"
        />
        <StatCard
          icon={Users}
          title="Active Tenants"
          value={stats.activeTenants}
          description="Currently residing"
          color="success"
        />
        <StatCard
          icon={CreditCard}
          title="Monthly Rent"
          value={`₹${stats.monthlyExpectedRent.toLocaleString()}`}
          description="Expected this month"
          color="primary"
        />
        <StatCard
          icon={TrendingUp}
          title="Rent Collected"
          value={`₹${stats.rentCollected.toLocaleString()}`}
          description="This month"
          color="success"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Home}
          title="Vacant Units"
          value={stats.vacant}
          description="Available for rent"
          color="success"
          gradient
        />
        <StatCard
          icon={Home}
          title="Occupied Units"
          value={stats.occupied}
          description="Currently rented"
          color="info"
          gradient
        />
        <StatCard
          icon={AlertCircle}
          title="Pending Rent"
          value={`₹${stats.pendingRent.toLocaleString()}`}
          description="Outstanding payments"
          color="warning"
          gradient
        />
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-manzil-200 p-6">
          <h2 className="text-xl font-semibold text-manzil-dark mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <ActivityItem key={i} activity={activity} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-manzil-200 p-6">
          <h2 className="text-xl font-semibold text-manzil-dark mb-4">Quick Actions</h2>
          <div className="grid gap-3">
            <Button variant="outline" className="justify-start">
              Add New Tenant
            </Button>
            <Button variant="outline" className="justify-start">
              Record Payment
            </Button>
            <Button variant="outline" className="justify-start">
              Create Maintenance Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  color = 'primary',
  gradient = false
}: {
  icon: any
  title: string
  value: string | number
  description: string
  color?: 'primary' | 'success' | 'warning' | 'info'
  gradient?: boolean
}) {
  const colors = {
    primary: 'text-manzil-dark bg-manzil-100',
    success: 'text-green-700 bg-green-100',
    warning: 'text-orange-700 bg-orange-100',
    info: 'text-blue-700 bg-blue-100'
  }

  const gradientColors = {
    primary: 'from-manzil-100 to-manzil-50',
    success: 'from-green-100 to-green-50',
    warning: 'from-orange-100 to-orange-50',
    info: 'from-blue-100 to-blue-50'
  }

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-manzil-200 ${gradient ? `bg-gradient-to-r ${colors[color]}` : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-manzil-dark/60">{title}</p>
          <h3 className="text-xl font-bold text-manzil-dark">{value}</h3>
        </div>
      </div>
      <p className="text-xs text-manzil-dark/50">{description}</p>
    </div>
  )
}

function ActivityItem({ activity }: { activity: { action: string, time: string } }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-manzil-50 rounded-lg">
      <div className="w-2 h-2 bg-manzil-gold rounded-full mt-2 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-manzil-dark">{activity.action}</p>
        <p className="text-xs text-manzil-dark/50 mt-1">{activity.time}</p>
      </div>
    </div>
  )
}