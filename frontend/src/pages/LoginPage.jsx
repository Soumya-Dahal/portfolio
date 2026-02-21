import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const {
    signInWithOtp,
    verifyOtp,
    signInWithPassword,
    signUpWithPassword,
    updatePassword,
    user,
  } = useAuth()

  const [mode, setMode] = useState('choose') // 'choose' | 'otp' | 'password' | 'set-password'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRequestCode = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error: err } = await signInWithOtp(email.trim())
    setLoading(false)
    if (err) {
      setError(err.message || 'Failed to send code')
      return
    }
    setMessage('Check your email for a 6-digit code.')
    setMode('otp')
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await verifyOtp(email.trim(), code.trim())
    setLoading(false)
    if (err) {
      setError(err.message || 'Invalid or expired code')
      return
    }
    setMode('set-password')
    setMessage('Set a password for future logins (optional).')
  }

  const handleSetPassword = async (e) => {
    e.preventDefault()
    setError('')
    if (password && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password && password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    if (password) {
      const { error: err } = await updatePassword(password)
      if (err) {
        setError(err.message || 'Failed to set password')
        setLoading(false)
        return
      }
    }
    setLoading(false)
    navigate('/downloads', { replace: true })
  }

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signInWithPassword(email.trim(), password)
    setLoading(false)
    if (err) {
      setError(err.message || 'Invalid email or password')
      return
    }
    navigate('/downloads', { replace: true })
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    const { error: err } = await signUpWithPassword(email.trim(), password)
    setLoading(false)
    if (err) {
      setError(err.message || 'Sign up failed')
      return
    }
    setMessage('Check your email to confirm your account, then you can log in.')
  }

  if (user && mode !== 'set-password') {
    navigate('/downloads', { replace: true })
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Login / Sign up</h1>
        <p className="text-gray-600 mb-6">
          Sign in with a one-time code sent to your email, or use your password if you already have an account.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded" role="alert">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 bg-green-50 text-green-800 text-sm rounded">
            {message}
          </div>
        )}

        {mode === 'choose' && (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gray-900 text-white font-medium rounded hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Send verification code'}
            </button>
            <p className="text-sm text-gray-500 text-center">
              Already have a password?{' '}
              <button
                type="button"
                onClick={() => setMode('password')}
                className="text-gray-900 font-medium underline"
              >
                Log in with password
              </button>
            </p>
          </form>
        )}

        {mode === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-gray-600">Code sent to {email}</p>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                6-digit code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                maxLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-gray-900 font-mono text-lg tracking-widest"
                placeholder="000000"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gray-900 text-white font-medium rounded hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Verifying…' : 'Verify'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('choose'); setCode(''); setMessage(''); }}
              className="w-full py-2 text-gray-600 text-sm"
            >
              Use a different email
            </button>
          </form>
        )}

        {mode === 'set-password' && (
          <form onSubmit={handleSetPassword} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password (optional)
              </label>
              <input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Min 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Repeat password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gray-900 text-white font-medium rounded hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Saving…' : 'Continue'}
            </button>
          </form>
        )}

        {mode === 'password' && (
          <>
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gray-900 text-white font-medium rounded hover:bg-gray-700 disabled:opacity-50"
              >
                {loading ? 'Signing in…' : 'Log in'}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-500 text-center">
              New here?{' '}
              <button
                type="button"
                onClick={() => { setMode('choose'); setPassword(''); setError(''); }}
                className="text-gray-900 font-medium underline"
              >
                Sign up with email code
              </button>
            </p>
          </>
        )}

        <p className="mt-6 text-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
