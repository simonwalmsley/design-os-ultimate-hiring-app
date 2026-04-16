import { useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

interface ForgotPasswordCheckEmailProps {
  email: string
  onResendEmail?: () => void
}

export function ForgotPasswordCheckEmail({ email, onResendEmail }: ForgotPasswordCheckEmailProps) {
  const [showToast, setShowToast] = useState(false)

  const handleResend = () => {
    onResendEmail?.()
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0a0a0a] py-12 sm:px-6 lg:px-8">
      {showToast && (
        <div className="fixed top-4 right-4 z-50 rounded-md bg-gray-800 px-4 py-3 text-sm text-white shadow-lg outline -outline-offset-1 outline-white/10">
          Password reset email resent.
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Ultimate Hiring Process"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-white">Check your email</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-[#171717]/80 px-6 py-12 text-center outline -outline-offset-1 outline-white/10 sm:rounded-lg sm:px-12">
          <EnvelopeIcon className="mx-auto size-12 text-gray-400" />
          <p className="mt-6 text-sm/6 text-white">
            We've sent a password reset link to{' '}
            <span className="font-semibold">{email}</span>.
          </p>
          <button
            onClick={handleResend}
            className="mt-6 text-sm/6 font-semibold text-[#ffcd05] hover:text-[#e6b800]"
          >
            Resend email
          </button>
        </div>
      </div>
    </div>
  )
}
