interface ResetPasswordProps {
  onResetPassword?: (newPassword: string) => void
}

export function ResetPassword({ onResetPassword }: ResetPasswordProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0a0a0a] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Ultimate Hiring Process"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-white">Set a new password</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-[#171717]/80 px-6 py-12 outline -outline-offset-1 outline-white/10 sm:rounded-lg sm:px-12">
          <form action="#" method="POST" className="space-y-6" onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const password = (form.elements.namedItem('new-password') as HTMLInputElement).value
            onResetPassword?.(password)
          }}>
            <div>
              <label htmlFor="new-password" className="block text-sm/6 font-medium text-white">
                New password
              </label>
              <div className="mt-2">
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-white">
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#ffcd05] px-3 py-1.5 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
              >
                Set new password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
