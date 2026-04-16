interface ForgotPasswordRequestProps {
  onForgotPassword?: (email: string) => void
  onGoToSignIn?: () => void
}

export function ForgotPasswordRequest({ onForgotPassword, onGoToSignIn }: ForgotPasswordRequestProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0a0a0a] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Ultimate Hiring Process"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-white">Reset your password</h2>
        <p className="mt-2 text-center text-sm/6 text-gray-400">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-[#171717]/80 px-6 py-12 outline -outline-offset-1 outline-white/10 sm:rounded-lg sm:px-12">
          <form action="#" method="POST" className="space-y-6" onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const email = (form.elements.namedItem('email') as HTMLInputElement).value
            onForgotPassword?.(email)
          }}>
            <div>
              <label htmlFor="reset-email" className="block text-sm/6 font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#ffcd05] px-3 py-1.5 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
              >
                Send reset link
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          <button onClick={onGoToSignIn} className="font-semibold text-[#ffcd05] hover:text-[#e6b800]">
            Back to sign in
          </button>
        </p>
      </div>
    </div>
  )
}
