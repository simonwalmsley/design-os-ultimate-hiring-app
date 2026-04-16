import { SignIn } from './components/SignIn'

export default function SignInPreview() {
  return (
    <SignIn
      onSignIn={(email, password) => console.log('Sign in:', email, password)}
      onForgotPassword={(email) => console.log('Forgot password:', email)}
      sessionExpired={false}
      showInactive={false}
    />
  )
}
