import { SignUp } from './components/SignUp'

export default function SignUpPreview() {
  return (
    <SignUp
      onSignUp={(name, email, password) => console.log('Sign up:', name, email, password)}
      onGoToSignIn={() => console.log('Go to sign in')}
    />
  )
}
