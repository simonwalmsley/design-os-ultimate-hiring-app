import type { Account } from '@/../product/sections/authentication-and-onboarding/types'

interface OnboardingBusinessDetailsProps {
  onSubmitBusinessDetails?: (details: Omit<Account, 'id'>) => void
}

export function OnboardingBusinessDetails({ onSubmitBusinessDetails }: OnboardingBusinessDetailsProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0a0a0a] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Ultimate Hiring Process"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-white">Tell us about your business</h2>
        <p className="mt-2 text-center text-sm/6 text-gray-400">
          We'll use these details across your hiring threads.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-[#171717]/80 px-6 py-12 outline -outline-offset-1 outline-white/10 sm:rounded-lg sm:px-12">
          <form action="#" method="POST" className="space-y-6" onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            onSubmitBusinessDetails?.({
              businessName: (form.elements.namedItem('business-name') as HTMLInputElement).value,
              industry: (form.elements.namedItem('industry') as HTMLInputElement).value,
              location: (form.elements.namedItem('location') as HTMLInputElement).value,
              phoneNumber: (form.elements.namedItem('phone') as HTMLInputElement).value,
            })
          }}>
            <div>
              <label htmlFor="business-name" className="block text-sm/6 font-medium text-white">
                Business name
              </label>
              <div className="mt-2">
                <input
                  id="business-name"
                  name="business-name"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm/6 font-medium text-white">
                Industry
              </label>
              <div className="mt-2">
                <input
                  id="industry"
                  name="industry"
                  type="text"
                  required
                  placeholder="e.g. Plumbing, Hospitality, Construction"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm/6 font-medium text-white">
                Location
              </label>
              <div className="mt-2">
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  placeholder="City or suburb, state"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm/6 font-medium text-white">
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#ffcd05] px-3 py-1.5 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
