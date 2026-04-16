import { ResetPassword } from './components/ResetPassword'

export default function ResetPasswordPreview() {
  return (
    <ResetPassword
      onResetPassword={(password) => console.log('Reset password:', password)}
    />
  )
}
