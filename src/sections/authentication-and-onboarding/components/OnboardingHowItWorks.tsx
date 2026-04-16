import { FileText, Megaphone, Target, BarChart3 } from 'lucide-react'
import type { OnboardingPhase, OnboardingProps } from '@/../product/sections/authentication-and-onboarding/types'

type OnboardingHowItWorksProps = Pick<OnboardingProps, 'onboardingPhases' | 'onCompleteOnboarding'>

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Megaphone,
  Target,
  BarChart3,
}

function PhaseTile({ phase }: { phase: OnboardingPhase }) {
  const Icon = iconMap[phase.icon] || FileText

  return (
    <div
      className="rounded-[0.4rem] p-5"
      style={{ backgroundColor: '#1f1f1f', border: '1px solid #404040' }}
    >
      <Icon
        className="mb-3"
        size={24}
        strokeWidth={1.5}
        style={{ color: '#a3a3a3' }}
      />
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {phase.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: '#a3a3a3', fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {phase.body}
      </p>
    </div>
  )
}

export function OnboardingHowItWorks({ onboardingPhases, onCompleteOnboarding }: OnboardingHowItWorksProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dim overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />

      {/* Overlay card */}
      <div
        className="relative w-full max-w-[800px] mx-4 rounded-[0.4rem] p-8"
        style={{ backgroundColor: '#171717', border: '1px solid #404040' }}
      >
        <h1
          className="text-[28px] font-semibold mb-6"
          style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          AI assists, you decide.
        </h1>

        {/* 2x2 tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {onboardingPhases.map((phase) => (
            <PhaseTile key={phase.id} phase={phase} />
          ))}
        </div>

        {/* Let's start — right-aligned */}
        <div className="flex justify-end">
          <button
            onClick={onCompleteOnboarding}
            className="px-6 py-2.5 rounded-[0.4rem] text-sm font-medium transition-all
              focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#ffcd05',
              color: '#0a0a0a',
              fontFamily: "'Inter', system-ui, sans-serif",
              // @ts-expect-error CSS custom property
              '--tw-ring-color': '#ffcd05',
            }}
          >
            Let's start
          </button>
        </div>
      </div>
    </div>
  )
}
