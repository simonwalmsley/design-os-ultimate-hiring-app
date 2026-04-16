import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { AuthenticationProps } from '@/../product/sections/authentication-and-onboarding/types'

type ResetPasswordProps = AuthenticationProps

export function ResetPassword({ onResetPassword }: ResetPasswordProps) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!newPassword.trim()) errors.newPassword = 'Password is required.'
    else if (newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters.'
    if (!confirmPassword.trim()) errors.confirmPassword = 'Please confirm your password.'
    else if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onResetPassword?.(newPassword)
    }, 1000)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="w-full max-w-[420px]">
        <p
          className="text-center text-sm font-semibold tracking-tight mb-8"
          style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Ultimate Hiring Process
        </p>

        <div
          className="rounded-[0.4rem] p-8"
          style={{ backgroundColor: '#171717', border: '1px solid #404040' }}
        >
          <h1
            className="text-2xl font-semibold mb-6"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Set a new password
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); clearFieldError('newPassword') }}
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
              {fieldErrors.newPassword && (
                <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.newPassword}</p>
              )}
            </div>

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
                  Setting password…
                </>
              ) : (
                'Set new password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
