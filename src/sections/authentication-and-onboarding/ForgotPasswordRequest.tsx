import { ForgotPasswordRequest } from './components/ForgotPasswordRequest'

export default function ForgotPasswordRequestPreview() {
  return (
    <ForgotPasswordRequest
      onForgotPassword={(email) => console.log('Forgot password:', email)}
      onGoToSignIn={() => console.log('Go to sign in')}
    />
  )
}
