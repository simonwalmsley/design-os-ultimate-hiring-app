import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { AuthenticationProps } from '@/../product/sections/authentication-and-onboarding/types'

interface SignInProps extends AuthenticationProps {
  /** Show session expired toast on mount */
  sessionExpired?: boolean
  /** Override to show the Account Inactive failure card */
  showInactive?: boolean
}

export function SignIn({
  onSignIn,
  onForgotPassword,
  showInactive = false,
  sessionExpired = false,
}: SignInProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [showToast, setShowToast] = useState(sessionExpired)

  const validate = () => {
    const errors: { email?: string; password?: string } = {}
    if (!email.trim()) errors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
    if (!password.trim()) errors.password = 'Password is required.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!validate()) return

    setIsLoading(true)
    // Simulate sign-in attempt
    setTimeout(() => {
      setIsLoading(false)
      if (onSignIn) {
        onSignIn(email, password)
      } else {
        // Demo: show error state
        setError("Those details didn't match an account. Try again or reset your password.")
        setPassword('')
      }
    }, 1200)
  }

  // Toast auto-dismiss
  if (showToast) {
    setTimeout(() => setShowToast(false), 4000)
  }

  // Account Inactive failure card
  if (showInactive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: '#0a0a0a' }}>
        <div className="w-full max-w-[420px]">
          <p className="text-center text-sm font-semibold tracking-tight mb-8"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}>
            Ultimate Hiring Process
          </p>

          <div className="rounded-[0.4rem] p-8 text-center"
            style={{ backgroundColor: '#171717', border: '1px solid #404040' }}>
            <h1 className="text-2xl font-semibold mb-3"
              style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}>
              Account inactive
            </h1>
            <p className="text-base mb-6"
              style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}>
              Your account has been deactivated. Please contact UPA to reactivate it.
            </p>
            <button
              className="w-full py-2.5 rounded-[0.4rem] text-sm font-medium transition-colors"
              style={{
                border: '1px solid #404040',
                color: '#fafafa',
                backgroundColor: 'transparent',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
              onClick={() => window.location.reload()}
            >
              Back to sign in
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{ backgroundColor: '#0a0a0a' }}>

      {/* Session expired toast */}
      {showToast && (
        <div
          className="fixed top-4 right-4 rounded-[0.4rem] px-4 py-3 text-sm shadow-lg z-50
            animate-[fadeIn_200ms_ease-out]"
          style={{
            backgroundColor: '#171717',
            border: '1px solid #404040',
            color: '#fafafa',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Your session expired. Please sign in again.
        </div>
      )}

      <div className="w-full max-w-[420px]">
        {/* Product mark */}
        <p className="text-center text-sm font-semibold tracking-tight mb-8"
          style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}>
          Ultimate Hiring Process
        </p>

        {/* Page title */}
        <h1 className="text-center text-2xl font-semibold mb-6"
          style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}>
          Sign In
        </h1>

        {/* Card */}
        <div className="rounded-[0.4rem] p-8"
          style={{ backgroundColor: '#171717', border: '1px solid #404040' }}>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5"
                style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })) }}
                className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all
                  focus:ring-2"
                style={{
                  backgroundColor: '#404040',
                  border: '1px solid #404040',
                  color: '#fafafa',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  // @ts-expect-error CSS custom property
                  '--tw-ring-color': '#ffcd05',
                }}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5"
                style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })) }}
                className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all
                  focus:ring-2"
                style={{
                  backgroundColor: '#404040',
                  border: '1px solid #404040',
                  color: '#fafafa',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  // @ts-expect-error CSS custom property
                  '--tw-ring-color': '#ffcd05',
                }}
              />
              {fieldErrors.password && (
                <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.password}</p>
              )}

              {/* Forgot password link */}
              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  onClick={() => onForgotPassword?.(email)}
                  className="text-sm transition-colors hover:underline"
                  style={{ color: '#a3a3a3', fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Form-level error */}
            {error && (
              <p className="text-sm" style={{ color: '#dc2828' }}>{error}</p>
            )}

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-[0.4rem] text-sm font-medium transition-all
                focus:outline-none focus:ring-2 disabled:opacity-70 flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#ffcd05',
                color: '#0a0a0a',
                fontFamily: "'Inter', system-ui, sans-serif",
                // @ts-expect-error CSS custom property
                '--tw-ring-color': '#ffcd05',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: '#404040' }} />
          <span className="px-3 text-sm" style={{ color: '#a3a3a3' }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#404040' }} />
        </div>

        {/* Create account block */}
        <div className="text-center">
          <p className="text-sm font-medium mb-3"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}>
            New to Ultimate Hiring Process?
          </p>
          <button
            className="w-full py-2.5 rounded-[0.4rem] text-sm font-medium transition-colors
              hover:bg-white/5"
            style={{
              border: '1px solid #404040',
              color: '#fafafa',
              backgroundColor: 'transparent',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  )
}
