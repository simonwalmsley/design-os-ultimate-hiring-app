import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

type LinkType = 'verification' | 'reset'

interface ExpiredLinkProps {
  linkType?: LinkType
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
    <div className="flex min-h-screen flex-col justify-center bg-[#0a0a0a] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Ultimate Hiring Process"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-white">This link has expired</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-[#171717]/80 px-6 py-12 text-center outline -outline-offset-1 outline-white/10 sm:rounded-lg sm:px-12">
          <ExclamationCircleIcon className="mx-auto size-12 text-red-500" />
          <p className="mt-6 text-sm/6 text-white">{body}</p>
          <div className="mt-6">
            <button
              onClick={onResend}
              className="flex w-full justify-center rounded-md bg-[#ffcd05] px-3 py-1.5 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
            >
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
