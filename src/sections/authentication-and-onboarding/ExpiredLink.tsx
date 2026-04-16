import { ExpiredLink } from './components/ExpiredLink'

export default function ExpiredLinkPreview() {
  return (
    <ExpiredLink
      linkType="verification"
      onResend={() => console.log('Resend verification')}
    />
  )
}
