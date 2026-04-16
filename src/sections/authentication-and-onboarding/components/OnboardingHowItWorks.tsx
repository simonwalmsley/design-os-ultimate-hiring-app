import {
  DocumentTextIcon,
  MegaphoneIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import type { OnboardingPhase } from '@/../product/sections/authentication-and-onboarding/types'

interface OnboardingHowItWorksProps {
  onboardingPhases: OnboardingPhase[]
  onCompleteOnboarding?: () => void
}

const iconMap: Record<string, typeof DocumentTextIcon> = {
  FileText: DocumentTextIcon,
  Megaphone: MegaphoneIcon,
  Target: AdjustmentsHorizontalIcon,
  BarChart3: ChartBarIcon,
}

export function OnboardingHowItWorks({ onboardingPhases, onCompleteOnboarding }: OnboardingHowItWorksProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0a0a0a] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Ultimate Hiring Process"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-white">AI assists, you decide.</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[640px]">
        <div className="bg-[#171717]/80 px-6 py-12 outline -outline-offset-1 outline-white/10 sm:rounded-lg sm:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {onboardingPhases.map((phase) => {
              const Icon = iconMap[phase.icon] || DocumentTextIcon
              return (
                <div
                  key={phase.id}
                  className="rounded-lg bg-white/5 p-5 outline -outline-offset-1 outline-white/10"
                >
                  <Icon className="size-6 text-gray-400" />
                  <h3 className="mt-3 text-sm/6 font-semibold text-white">{phase.title}</h3>
                  <p className="mt-1 text-sm/6 text-gray-400">{phase.body}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8">
            <button
              onClick={onCompleteOnboarding}
              className="flex w-full justify-center rounded-md bg-[#ffcd05] px-3 py-1.5 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
            >
              Let's start
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
