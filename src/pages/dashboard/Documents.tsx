import { FileText, Download, Upload } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function Documents() {
  const docs = [
    { name: 'Rent Agreement - Rajesh Kumar', type: 'PDF', date: '2024-01-01', size: '1.2 MB' },
    { name: 'Identity Proof - Priya Sharma', type: 'JPG', date: '2024-02-15', size: '0.5 MB' },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-manzil-dark">Documents</h1>
          <p className="text-manzil-dark/60">Securely store and manage property documents</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-manzil-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-manzil-100 rounded-lg">
                <FileText className="w-6 h-6 text-manzil-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-manzil-dark truncate">{doc.name}</h3>
                <p className="text-xs text-manzil-dark/50">{doc.type} • {doc.size}</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-manzil-dark/40 mb-4">
              <span>Uploaded on {doc.date}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}