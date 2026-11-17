import { Save, SaveAll, Globe, Phone, Mail, Megaphone } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function Settings() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-manzil-dark">Website Settings</h1>
        <p className="text-manzil-dark/60">Configure public website information</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-manzil-200">
        <form className="p-6 space-y-6">
          {/* Property Info */}
          <div>
            <h2 className="text-xl font-semibold text-manzil-dark mb-4">Property Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-manzil-dark mb-2" htmlFor="name">
                  Property Name
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue="Hamzah's Manzil"
                  className="w-full px-3 py-2 border border-manzil-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-manzil-dark mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue="9873444716"
                  className="w-full px-3 py-2 border border-manzil-300 rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-manzil-dark mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue="khalid0142759@gmail.com"
                  className="w-full px-3 py-2 border border-manzil-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Visibility Settings */}
          <div>
            <h2 className="text-xl font-semibold text-manzil-dark mb-4">Public Visibility</h2>
            <div className="space-y-3">
              <ToggleSetting
                label="Show contact information on public pages"
                defaultChecked
              />
              <ToggleSetting
                label="Display rent information on unit pages"
                defaultChecked
              />
              <ToggleSetting
                label="Show Wi-Fi availability status"
                defaultChecked
              />
            </div>
          </div>

          {/* Announcement */}
          <div>
            <h2 className="text-xl font-semibold text-manzil-dark mb-4">Website Announcement</h2>
            <textarea
              defaultValue="Welcome to Hamzah's Manzil - Premium residential rental accommodation"
              rows={3}
              className="w-full px-3 py-2 border border-manzil-300 rounded-md"
              placeholder="Important announcement for visitors..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline">
              <SaveAll className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ToggleSetting({ label, defaultChecked }: { label: string, defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-manzil-50 rounded-lg">
      <label className="text-manzil-dark font-medium">{label}</label>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-5 h-5 rounded border border-manzil-300 focus:ring-manzil-gold"
      />
    </div>
  )
}