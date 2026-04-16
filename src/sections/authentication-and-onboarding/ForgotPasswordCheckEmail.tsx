import { ForgotPasswordCheckEmail } from './components/ForgotPasswordCheckEmail'

export default function ForgotPasswordCheckEmailPreview() {
  return (
    <ForgotPasswordCheckEmail
      email="michael.thompson@brisbanecoastalbuilders.com.au"
      onResendEmail={() => console.log('Resend reset email')}
    />
  )
}
