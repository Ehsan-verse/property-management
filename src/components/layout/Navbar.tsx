import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/buildings', label: 'Building' },
  { to: '/units', label: 'Units' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm tracking-wide transition-colors duration-300 ${
      isActive ? 'text-manzil-gold' : 'text-manzil-700 hover:text-manzil-dark'
    }`

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'border-b border-manzil-200/70 bg-manzil-50/85 backdrop-blur-md'
          : 'border-b border-transparent bg-manzil-50'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="font-display text-2xl text-manzil-dark">
            Hamzah&apos;s <span className="italic text-manzil-gold">Manzil</span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end className={linkClass}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Link to="/admin" className="btn btn-outline">Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-outline gap-2" aria-label="Log out">
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-manzil-500 transition hover:text-manzil-dark">
                  Owner login
                </Link>
                <Link to="/#contact" className="btn btn-primary">Enquire</Link>
              </>
            )}
          </div>

          <button
            className="p-2 text-manzil-dark md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-manzil-200/70 md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-6 py-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) => `py-2 ${linkClass({ isActive })}`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <Link
              to={user ? '/admin' : '/login'}
              className="py-2 text-sm text-manzil-500"
              onClick={() => setMobileOpen(false)}
            >
              {user ? 'Dashboard' : 'Owner login'}
            </Link>
            <Link to="/#contact" className="btn btn-primary mt-2" onClick={() => setMobileOpen(false)}>
              Enquire
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
