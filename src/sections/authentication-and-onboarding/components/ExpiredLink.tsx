import { AlertCircle } from 'lucide-react'

type LinkType = 'verification' | 'reset'

interface ExpiredLinkProps {
  /** Which type of link expired */
  linkType?: LinkType
  /** Called when user clicks the primary action */
  onResend?: () => void
}

const content: Record<LinkType, { body: string; button: string }> = {
  verification: {
    body: 'Verification links expire after 24 hours. Click below to get a fresh one.',
    button: 'Resend verification email',
  },
  reset: {
    body: 'Password reset links expire. Click below to request a new one.',
    button: 'Request a new reset link',
  },
}

export function ExpiredLink({ linkType = 'verification', onResend }: ExpiredLinkProps) {
  const { body, button } = content[linkType]

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
          className="rounded-[0.4rem] p-8 text-center"
          style={{ backgroundColor: '#171717', border: '1px solid #404040' }}
        >
          <AlertCircle
            className="mx-auto mb-5"
            size={48}
            strokeWidth={1.5}
            style={{ color: '#dc2828' }}
          />

          <h1
            className="text-2xl font-semibold mb-3"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            This link has expired
          </h1>

          <p
            className="text-base mb-6"
            style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {body}
          </p>

          <button
            onClick={onResend}
            className="w-full py-2.5 rounded-[0.4rem] text-sm font-medium transition-all
              focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#ffcd05',
              color: '#0a0a0a',
              fontFamily: "'Inter', system-ui, sans-serif",
              // @ts-expect-error CSS custom property
              '--tw-ring-color': '#ffcd05',
            }}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  )
}
