import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { AuthenticationProps } from '@/../product/sections/authentication-and-onboarding/types'

interface ForgotPasswordRequestProps extends AuthenticationProps {
  /** Called when user clicks "Back to sign in" */
  onGoToSignIn?: () => void
}

export function ForgotPasswordRequest({ onForgotPassword, onGoToSignIn }: ForgotPasswordRequestProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fieldError, setFieldError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFieldError(null)

    if (!email.trim()) {
      setFieldError('Email is required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('Enter a valid email address.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onForgotPassword?.(email)
    }, 1000)
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
            className="text-2xl font-semibold mb-2"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Reset your password
          </h1>

          <p
            className="text-base mb-6"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Enter your email and we'll send you a reset link.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                onChange={(e) => { setEmail(e.target.value); setFieldError(null) }}
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
              {fieldError && (
                <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldError}</p>
              )}
            </div>

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
                  Sending…
                </>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-5">
            <button
              onClick={onGoToSignIn}
              className="transition-colors hover:underline"
              style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Back to sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
