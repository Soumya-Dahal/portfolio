import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { user, signOut, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-gray-900 hover:text-gray-700">
          Soumya Dahal
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Contact
          </button>
          {!loading && (
            <>
              {user ? (
                <>
                  <Link
                    to="/downloads"
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                  >
                    Downloads
                  </Link>
                  <span className="text-gray-500 text-sm truncate max-w-[120px]" title={user.email}>
                    {user.email}
                  </span>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Login / Sign up
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
