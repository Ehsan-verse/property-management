import { BarChart3, Calendar, Download } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function Reports() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Reports</h1>
          <p className="text-manzil-dark/60">Generate financial and occupancy reports</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard
          title="Monthly Rent Collection"
          description="Track rent paid vs expected each month"
          icon={<BarChart3 className="w-8 h-8 text-manzil-gold" />}
        />
        <ReportCard
          title="Occupancy Rate"
          description="Percentage of rented units"
          icon={<BarChart3 className="w-8 h-8 text-manzil-gold" />}
        />
        <ReportCard
          title="Expense Overview"
          description="Monthly expense breakdown"
          icon={<BarChart3 className="w-8 h-8 text-manzil-gold" />}
        />
      </div>
    </div>
  )
}

function ReportCard({ title, description, icon }: { title: string, description: string, icon: JSX.Element }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-manzil-200 p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-manzil-100 rounded-lg">{icon}</div>
        <div>
          <h3 className="font-bold text-manzil-dark">{title}</h3>
          <p className="text-sm text-manzil-dark/60">{description}</p>
        </div>
      </div>
      <Button variant="outline" className="w-full">
        View Report
      </Button>
    </div>
  )
}