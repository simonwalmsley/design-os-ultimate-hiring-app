import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { AuthenticationProps } from '@/../product/sections/authentication-and-onboarding/types'

interface SignUpProps extends AuthenticationProps {
  /** Called when user clicks "Already have an account? Sign in" */
  onGoToSignIn?: () => void
}

export function SignUp({ onSignUp, onGoToSignIn }: SignUpProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!fullName.trim()) errors.fullName = 'Full name is required.'
    if (!email.trim()) errors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
    if (!password.trim()) errors.password = 'Password is required.'
    else if (password.length < 8) errors.password = 'Password must be at least 8 characters.'
    if (!confirmPassword.trim()) errors.confirmPassword = 'Please confirm your password.'
    else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!validate()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (onSignUp) {
        onSignUp(fullName, email, password)
      } else {
        setFormError("Couldn't create your account. Try again.")
      }
    }, 1200)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="w-full max-w-[420px]">
        {/* Product mark */}
        <p
          className="text-center text-sm font-semibold tracking-tight mb-8"
          style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Ultimate Hiring Process
        </p>

        {/* Card */}
        <div
          className="rounded-[0.4rem] p-8"
          style={{ backgroundColor: '#171717', border: '1px solid #404040' }}
        >
          <h1
            className="text-2xl font-semibold mb-6"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Create your account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Full name */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); clearFieldError('fullName') }}
                className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: '#404040',
                  border: '1px solid #404040',
                  color: '#fafafa',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  // @ts-expect-error CSS custom property
                  '--tw-ring-color': '#ffcd05',
                }}
              />
              {fieldErrors.fullName && (
                <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearFieldError('email') }}
                className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all focus:ring-2"
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
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearFieldError('password') }}
                className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all focus:ring-2"
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
            </div>

            {/* Confirm password */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword') }}
                className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: '#404040',
                  border: '1px solid #404040',
                  color: '#fafafa',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  // @ts-expect-error CSS custom property
                  '--tw-ring-color': '#ffcd05',
                }}
              />
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Form-level error */}
            {formError && (
              <p className="text-sm" style={{ color: '#dc2828' }}>{formError}</p>
            )}

            {/* Create account button */}
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
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm mt-5">
            <button
              onClick={onGoToSignIn}
              className="transition-colors hover:underline"
              style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Already have an account? Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
