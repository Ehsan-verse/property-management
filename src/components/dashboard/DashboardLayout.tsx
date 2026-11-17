import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Building,
  Users,
  CreditCard,
  FileText,
  Wrench,
  Receipt,
  Wifi,
  Mail,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

const sidebarItems = [
  { name: 'Overview', href: '/admin', icon: Home },
  { name: 'Floors & Units', href: '/admin/floors', icon: Building },
  { name: 'Tenants', href: '/admin/tenants', icon: Users },
  { name: 'Rent & Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Documents', href: '/admin/documents', icon: FileText },
  { name: 'Maintenance', href: '/admin/maintenance', icon: Wrench },
  { name: 'Expenses', href: '/admin/expenses', icon: Receipt },
  { name: 'Wi-Fi Access', href: '/admin/wifi', icon: Wifi },
  { name: 'Enquiries', href: '/admin/enquiries', icon: Mail },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
]

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const sidebar = (
    <>
      <div className="p-6 border-b border-manzil-200">
        <h2 className="text-xl font-bold text-manzil-dark">
          Hamzah's Manzil
        </h2>
        <p className="text-sm text-manzil-dark/60 mt-1">Property Management</p>
      </div>

      <nav className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.href}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-manzil-gold text-white'
                      : 'text-manzil-dark hover:bg-manzil-100'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-manzil-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-manzil-dark hover:bg-manzil-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="h-screen flex bg-manzil-50">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r border-manzil-200 flex flex-col">
        {sidebar}
      </aside>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 bg-black/50 transition-all ${mobileOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-y-0 left-0 z-50 w-64 bg-white flex flex-col">
          {sidebar}
        </div>
        <button
          className="absolute inset-0"
          onClick={() => setMobileOpen(false)}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-manzil-200 px-4 py-3 md:hidden">
          <h1 className="text-lg font-bold text-manzil-dark">
            {location.pathname === '/admin' && 'Dashboard Overview'}
            {location.pathname === '/admin/floors' && 'Floors & Units'}
            {location.pathname === '/admin/tenants' && 'Tenant Management'}
            {location.pathname === '/admin/payments' && 'Rent & Payments'}
            {location.pathname === '/admin/expenses' && 'Expenses'}
            {location.pathname === '/admin/maintenance' && 'Maintenance'}
            {location.pathname === '/admin/documents' && 'Documents'}
            {location.pathname === '/admin/wifi' && 'Wi-Fi Access'}
            {location.pathname === '/admin/enquiries' && 'Enquiries'}
            {location.pathname === '/admin/reports' && 'Reports'}
            {location.pathname === '/admin/settings' && 'Settings'}
          </h1>
        </div>

        <Outlet />
      </main>
    </div>
  )
}