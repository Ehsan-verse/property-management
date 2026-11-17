import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Public pages
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import BuildingOverview from './pages/public/BuildingOverview'
import UnitsPage from './pages/public/UnitsPage'
import UnitDetailPage from './pages/public/UnitDetailPage'

// Auth
import LoginPage from './pages/auth/LoginPage'

// Dashboard (requires auth)
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardOverview from './pages/dashboard/Overview'
import FloorsUnits from './pages/dashboard/FloorsUnits'
import TenantManagement from './pages/dashboard/TenantManagement'
import Payments from './pages/dashboard/Payments'
import Expenses from './pages/dashboard/Expenses'
import Maintenance from './pages/dashboard/Maintenance'
import Documents from './pages/dashboard/Documents'
import WiFiManager from './pages/dashboard/WiFiManager'
import Enquiries from './pages/dashboard/Enquiries'
import Reports from './pages/dashboard/Reports'
import Settings from './pages/dashboard/Settings'

// Auth provider
import { AuthProvider } from './hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/buildings" element={<BuildingOverview />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/units/:unitId" element={<UnitDetailPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Dashboard Routes - protected */}
          <Route path="/admin/*" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="floors" element={<FloorsUnits />} />
            <Route path="tenants" element={<TenantManagement />} />
            <Route path="payments" element={<Payments />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="documents" element={<Documents />} />
            <Route path="wifi" element={<WiFiManager />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App