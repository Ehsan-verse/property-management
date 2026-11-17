import { useState } from 'react'
import { Plus, Edit, Trash2, Wifi, Power } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/common/StatusBadge'

// Sample Wi-Fi access data
const wifiAccess = [
  { unit: 'F1-01', floor: '1st', status: 'Enabled', included: true, notes: 'Tenant: Rajesh Kumar' },
  { unit: 'F1-02', floor: '1st', status: 'Disabled', included: false, notes: 'Vacant' },
  { unit: 'F2-01', floor: '2nd', status: 'Enabled', included: true, notes: 'Tenant: Priya Sharma' },
]

export default function WiFiManager() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Wi-Fi Management</h1>
          <p className="text-manzil-dark/60">Manage Wi-Fi access for individual rental units</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-manzil-200">
        <table className="w-full">
          <thead className="bg-manzil-50 border-b border-manzil-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Unit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Floor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Access Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Included in Rent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Notes</th>
              <th className="px-4 py-3 text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wifiAccess.map((access, i) => (
              <tr key={i} className="border-b border-manzil-100 hover:bg-manzil-50">
                <td className="px-4 py-3 font-medium text-manzil-dark">{access.unit}</td>
                <td className="px-4 py-3 text-manzil-dark">{access.floor}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${access.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {access.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-manzil-dark">{access.included ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-manzil-dark/60 text-sm">{access.notes}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="outline" size="sm">
                    <Power className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}