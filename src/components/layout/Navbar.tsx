import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/buildings', label: 'Buildings' },
    { to: '/units', label: 'Units' },
  ]

  return (
    <nav className="bg-white border-b border-manzil-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="text-manzil-dark font-bold text-xl">
            <span className="text-manzil-gold">Manzil</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive
                      ? 'text-manzil-gold font-medium'
                      : 'text-manzil-dark hover:text-manzil-gold'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/units"
              className="btn btn-primary"
            >
              View Available Units
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/admin"
                  className="btn btn-outline text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline text-sm flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary text-sm"
              >
                Owner Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-manzil-200 ${mobileOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-2 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `block py-2 text-base transition-colors duration-200 ${
                  isActive
                    ? 'text-manzil-gold font-medium'
                    : 'text-manzil-dark hover:text-manzil-gold'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/units"
            className="block py-2 text-base btn btn-primary text-center"
            onClick={() => setMobileOpen(false)}
          >
            View Available Units
          </Link>
          {user ? (
            <Link
              to="/admin"
              className="block py-2 text-base text-center text-manzil-dark hover:text-manzil-gold"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="block py-2 text-base text-center text-manzil-dark hover:text-manzil-gold"
              onClick={() => setMobileOpen(false)}
            >
              Owner Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}