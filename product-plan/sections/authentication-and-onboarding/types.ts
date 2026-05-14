// =============================================================================
// Data Types
// =============================================================================

export type ProfileRole = 'super_admin' | 'coach' | 'client'

export type ProfileStatus = 'unverified' | 'pending' | 'active' | 'inactive'

export interface Profile {
  id: string
  fullName: string
  email: string
  role: ProfileRole
  status: ProfileStatus
  accountId: string
}

export interface Account {
  id: string
  businessName: string
  industry: string
  location: string
  phoneNumber: string
}

export interface OnboardingPhase {
  id: string
  title: string
  icon: string
  body: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface AuthenticationProps {
  /** Called when user submits the sign in form */
  onSignIn?: (email: string, password: string) => void
  /** Called when user submits the sign up form */
  onSignUp?: (fullName: string, email: string, password: string) => void
  /** Called when user requests a password reset */
  onForgotPassword?: (email: string) => void
  /** Called when user sets a new password */
  onResetPassword?: (newPassword: string) => void
  /** Called when user clicks resend verification or reset email */
  onResendEmail?: () => void
  /** Called when user clicks sign out */
  onSignOut?: () => void
}

export interface OnboardingProps {
  /** The current user's profile */
  profile: Profile
  /** The onboarding phases to display on the How It Works screen */
  onboardingPhases: OnboardingPhase[]
  /** Called when user submits business details in Step 1 */
  onSubmitBusinessDetails?: (details: Omit<Account, 'id'>) => void
  /** Called when user clicks Let's start on Step 2, completing onboarding */
  onCompleteOnboarding?: () => void
}
