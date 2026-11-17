import { useState } from 'react'
import { Plus, Edit, Trash2, Receipt, Calendar } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function Expenses() {
  const expenses = [
    { title: 'Electricity Bill', category: 'Electricity', amount: 4500, date: '2024-10-15', description: 'Main building meter' },
    { title: 'Cleaning Staff', category: 'Cleaning', amount: 8000, date: '2024-10-30', description: 'Monthly common area cleaning' },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Expense Management</h1>
          <p className="text-manzil-dark/60">Track property maintenance and utility expenses</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-manzil-200">
        <table className="w-full">
          <thead className="bg-manzil-50 border-b border-manzil-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-manzil-dark/60 uppercase">Category</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-manzil-dark/60 uppercase">Amount</th>
              <th className="px-4 py-3 text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <tr key={i} className="border-b border-manzil-100 hover:bg-manzil-50">
                <td className="px-4 py-3 text-manzil-dark">{expense.date}</td>
                <td className="px-4 py-3 font-medium text-manzil-dark">{expense.title}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-manzil-100 text-xs rounded-full">{expense.category}</span></td>
                <td className="px-4 py-3 text-right font-bold">₹{expense.amount.toLocaleString()}</td>
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