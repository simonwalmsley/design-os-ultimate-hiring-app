import { OnboardingBusinessDetails } from './components/OnboardingBusinessDetails'

export default function OnboardingBusinessDetailsPreview() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <OnboardingBusinessDetails
        onSubmitBusinessDetails={(details) => console.log('Business details:', details)}
      />
    </div>
  )
}
