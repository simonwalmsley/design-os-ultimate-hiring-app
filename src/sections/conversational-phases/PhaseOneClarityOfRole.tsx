import data from '@/../product/sections/conversational-phases/data.json'
import { PhaseOneClarityOfRole } from './components/PhaseOneClarityOfRole'
import type {
  PhaseOneData,
  ThreadContext,
} from '@/../product/sections/conversational-phases/types'

export default function PhaseOneClarityOfRolePreview() {
  return (
    <PhaseOneClarityOfRole
      thread={data.thread as ThreadContext}
      phase={data.phaseOne as PhaseOneData}
      onSendMessage={(content) => console.log('Send message:', content)}
      onEditField={(artifact, field, value) =>
        console.log('Edit field:', artifact, field, value)
      }
      onRegenerateArtifact={(artifact) => console.log('Regenerate artifact:', artifact)}
      onApprove={() => console.log('Approve & continue')}
      onReopen={() => console.log('Reopen phase')}
    />
  )
}
