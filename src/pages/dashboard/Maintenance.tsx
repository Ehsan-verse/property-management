import { useState } from 'react'
import { Plus, Edit, Wrench, AlertCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/common/StatusBadge'

export default function Maintenance() {
  const requests = [
    { title: 'Plumbing in F2-02', unit: 'F2-02', priority: 'High', status: 'Pending', date: '2024-11-10' },
    { title: 'Electrical Check', unit: 'F1-01', priority: 'Medium', status: 'In Progress', date: '2024-11-12' },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Maintenance</h1>
          <p className="text-manzil-dark/60">Track property maintenance requests</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-manzil-200">
        <table className="w-full">
          <thead className="bg-manzil-50 border-b border-manzil-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Request</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Unit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Priority</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-manzil-dark/60 uppercase">Status</th>
              <th className="px-4 py-3 text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, i) => (
              <tr key={i} className="border-b border-manzil-100 hover:bg-manzil-50">
                <td className="px-4 py-3 text-manzil-dark">{req.date}</td>
                <td className="px-4 py-3 font-medium text-manzil-dark">{req.title}</td>
                <td className="px-4 py-3 text-manzil-dark">{req.unit}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${req.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {req.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={req.status} type="maintenance" />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}