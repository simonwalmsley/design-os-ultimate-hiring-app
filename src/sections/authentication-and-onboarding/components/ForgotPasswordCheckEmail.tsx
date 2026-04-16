import { useState } from 'react'
import { Mail } from 'lucide-react'
import type { AuthenticationProps } from '@/../product/sections/authentication-and-onboarding/types'

interface ForgotPasswordCheckEmailProps extends AuthenticationProps {
  /** The email address to display */
  email: string
}

export function ForgotPasswordCheckEmail({ email, onResendEmail }: ForgotPasswordCheckEmailProps) {
  const [showToast, setShowToast] = useState(false)

  const handleResend = () => {
    onResendEmail?.()
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {showToast && (
        <div
          className="fixed top-4 right-4 rounded-[0.4rem] px-4 py-3 text-sm shadow-lg z-50"
          style={{
            backgroundColor: '#171717',
            border: '1px solid #404040',
            color: '#fafafa',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Password reset email resent.
        </div>
      )}

      <div className="w-full max-w-[420px]">
        <p
          className="text-center text-sm font-semibold tracking-tight mb-8"
          style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Ultimate Hiring Process
        </p>

        <div
          className="rounded-[0.4rem] p-8 text-center"
          style={{ backgroundColor: '#171717', border: '1px solid #404040' }}
        >
          <Mail
            className="mx-auto mb-5"
            size={48}
            strokeWidth={1.5}
            style={{ color: '#a3a3a3' }}
          />

          <h1
            className="text-2xl font-semibold mb-3"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Check your email
          </h1>

          <p
            className="text-base mb-6"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            We've sent a password reset link to{' '}
            <strong>{email}</strong>.
          </p>

          <button
            onClick={handleResend}
            className="text-sm transition-colors hover:underline"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Resend email
          </button>
        </div>
      </div>
    </div>
  )
}
