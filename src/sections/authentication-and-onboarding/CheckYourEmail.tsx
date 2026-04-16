import { CheckYourEmail } from './components/CheckYourEmail'

export default function CheckYourEmailPreview() {
  return (
    <CheckYourEmail
      email="james.ryan@pattersonplumbing.com.au"
      onResendEmail={() => console.log('Resend verification email')}
    />
  )
}
