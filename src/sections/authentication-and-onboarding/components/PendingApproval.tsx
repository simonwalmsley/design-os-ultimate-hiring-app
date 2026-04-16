import { Clock } from 'lucide-react'

interface PendingApprovalProps {
  /** Called when user clicks "Back to sign in" */
  onGoToSignIn?: () => void
}

export function PendingApproval({ onGoToSignIn }: PendingApprovalProps) {
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
          className="rounded-[0.4rem] p-8 text-center"
          style={{ backgroundColor: '#171717', border: '1px solid #404040' }}
        >
          <Clock
            className="mx-auto mb-5"
            size={48}
            strokeWidth={1.5}
            style={{ color: '#a3a3a3' }}
          />

          <h1
            className="text-2xl font-semibold mb-3"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Account pending approval
          </h1>

          <p
            className="text-base mb-6"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Your email is verified. A UPA admin will approve you shortly.
            You'll get an email once your account is active.
          </p>

          <button
            onClick={onGoToSignIn}
            className="text-sm transition-colors hover:underline"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Back to sign in
          </button>
        </div>
      </div>
    </div>
  )
}
