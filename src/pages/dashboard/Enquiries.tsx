import { useState } from 'react'
import { Plus, Edit, Mail, MessageSquare } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function Enquiries() {
  const enquiries = [
    { name: 'Amit Verma', phone: '9876543217', unit: 'F3-03', status: 'New', date: '2024-11-14' },
    { name: 'Sneha Patel', phone: '9876543218', unit: 'F2-01', status: 'Contacted', date: '2024-11-12' },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Enquiries</h1>
          <p className="text-manzil-dark/60">Messages from potential tenants</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-manzil-200">
        <table className="w-full">
          <thead className="bg-manzil-50 border-b border-manzil-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase hidden md:table-cell">Interested Unit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Date</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-manzil-dark/60 uppercase">Status</th>
              <th className="px-4 py-3 text-right w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry, i) => (
              <tr key={i} className="border-b border-manzil-100 hover:bg-manzil-50">
                <td className="px-4 py-3 font-medium text-manzil-dark">{enquiry.name}</td>
                <td className="px-4 py-3"><span className="text-manzil-dark">{enquiry.phone}</span></td>
                <td className="px-4 py-3 hidden md:table-cell text-manzil-dark">{enquiry.unit}</td>
                <td className="px-4 py-3 text-manzil-dark">{enquiry.date}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${enquiry.status === 'New' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {enquiry.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
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