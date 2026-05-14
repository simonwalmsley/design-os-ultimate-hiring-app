import { ClockIcon } from '@heroicons/react/24/outline'

interface PendingApprovalProps {
  onGoToSignIn?: () => void
}

export function PendingApproval({ onGoToSignIn }: PendingApprovalProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0a0a0a] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Ultimate Hiring Process"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-white">Account pending approval</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-[#171717]/80 px-6 py-12 text-center outline -outline-offset-1 outline-white/10 sm:rounded-lg sm:px-12">
          <ClockIcon className="mx-auto size-12 text-gray-400" />
          <p className="mt-6 text-sm/6 text-white">
            Your email is verified. A UPA admin will approve you shortly. You'll get an email once your account is active.
          </p>
          <button
            onClick={onGoToSignIn}
            className="mt-6 text-sm/6 font-semibold text-[#ffcd05] hover:text-[#e6b800]"
          >
            Back to sign in
          </button>
        </div>
      </div>
    </div>
  )
}
