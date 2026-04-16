import data from '@/../product/sections/authentication-and-onboarding/data.json'
import { OnboardingHowItWorks } from './components/OnboardingHowItWorks'

export default function OnboardingHowItWorksPreview() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <OnboardingHowItWorks
        onboardingPhases={data.onboardingPhases}
        onCompleteOnboarding={() => console.log('Complete onboarding')}
      />
    </div>
  )
}
