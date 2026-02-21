import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const {
    signInWithOtp,
    signUpWithOtp,
    verifyOtp,
    signInWithPassword,
    updatePassword,
    user,
  } = useAuth()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [step, setStep] = useState('forms') // 'forms' | 'login-otp' | 'signup-otp' | 'signup-set-password'
  const [otpEmail, setOtpEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  if (user && step !== 'signup-set-password') {
    navigate('/downloads', { replace: true })
    return null
  }

  const clearFeedback = () => {
    setError('')
    setMessage('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    clearFeedback()
    setLoading(true)
    const { error: err } = await signInWithPassword(loginEmail.trim(), loginPassword)
    setLoading(false)
    if (err) {
      setError(err.message || 'Invalid email or password')
      return
    }
    navigate('/downloads', { replace: true })
  }

  const handleLoginOtpRequest = async (e) => {
    e.preventDefault()
    clearFeedback()
    if (!loginEmail.trim()) {
      setError('Please enter your email in the Log in form above first.')
      return
    }
    setLoading(true)
    const { error: err } = await signInWithOtp(loginEmail.trim())
    setLoading(false)
    if (err) {
      setError(err.message || 'Failed to send code')
      return
    }
    setOtpEmail(loginEmail.trim())
    setMessage('Check your email for a 6-digit code.')
    setStep('login-otp')
  }

  const handleSignupOtpRequest = async (e) => {
    e.preventDefault()
    clearFeedback()
    setLoading(true)
    const { error: err } = await signUpWithOtp(signupEmail.trim())
    setLoading(false)
    if (err) {
      setError(err.message || 'Failed to send code')
      return
    }
    setOtpEmail(signupEmail.trim())
    setMessage('Check your email for a 6-digit code.')
    setStep('signup-otp')
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    clearFeedback()
    setLoading(true)
    const { error: err } = await verifyOtp(otpEmail, code.trim())
    setLoading(false)
    if (err) {
      setError(err.message || 'Invalid or expired code')
      return
    }
    if (step === 'login-otp') {
      navigate('/downloads', { replace: true })
      return
    }
    setMessage('Set a password for future logins (optional).')
    setStep('signup-set-password')
  }

  const handleSetPassword = async (e) => {
    e.preventDefault()
    clearFeedback()
    if (password && password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password && password !== confirmPassword) {
      setError('Passwords do not match')
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

  const backToForms = () => {
    setStep('forms')
    setCode('')
    setPassword('')
    setConfirmPassword('')
    clearFeedback()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Log in / Sign up</h1>
        <p className="text-gray-600 mb-8 text-center text-sm">
          Use the form on the left to log in, or the form on the right to create an account.
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

        {step === 'forms' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Login form */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Log in</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
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
              <p className="mt-3 text-sm text-gray-500 text-center">
                No password?{' '}
                <button
                  type="button"
                  onClick={handleLoginOtpRequest}
                  disabled={loading}
                  className="text-gray-900 font-medium underline hover:no-underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send one-time code to my email
                </button>
              </p>
            </div>

            {/* Sign up form */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sign up</h2>
              <form onSubmit={handleSignupOtpRequest} className="space-y-4">
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
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
              </form>
              <p className="mt-3 text-sm text-gray-500">
                We’ll send a 6-digit code to your email. Enter it to create your account.
              </p>
            </div>
          </div>
        )}

        {(step === 'login-otp' || step === 'signup-otp') && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Enter verification code</h2>
            <p className="text-sm text-gray-600 mb-4">Code sent to {otpEmail}</p>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
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
                onClick={backToForms}
                className="w-full py-2 text-gray-600 text-sm"
              >
                ← Back to login / sign up
              </button>
            </form>
          </div>
        )}

        {step === 'signup-set-password' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Set a password (optional)</h2>
            <form onSubmit={handleSetPassword} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
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
          </div>
        )}

        <p className="mt-8 text-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
