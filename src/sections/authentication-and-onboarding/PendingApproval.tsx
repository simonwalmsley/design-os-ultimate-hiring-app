import { PendingApproval } from './components/PendingApproval'

export default function PendingApprovalPreview() {
  return (
    <PendingApproval
      onGoToSignIn={() => console.log('Go to sign in')}
    />
  )
}
