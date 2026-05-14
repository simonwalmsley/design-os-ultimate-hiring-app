import data from '@/../product/sections/conversational-phases/data.json'
import { PhaseTwoAdvertiseForRole } from './components/PhaseTwoAdvertiseForRole'
import type {
  PhaseTwoData,
  ThreadContext,
} from '@/../product/sections/conversational-phases/types'

export default function PhaseTwoAdvertiseForRolePreview() {
  return (
    <PhaseTwoAdvertiseForRole
      thread={data.thread as ThreadContext}
      phase={data.phaseTwo as PhaseTwoData}
      onSendMessage={(content) => console.log('Send message:', content)}
      onUpdateLogistics={(field, value) => console.log('Update logistics:', field, value)}
      onEditSection={(heading, content) => console.log('Edit section:', heading, content)}
      onRegenerateSection={(heading) => console.log('Regenerate section:', heading)}
      onRegenerateAll={() => console.log('Regenerate whole job ad')}
      onApprove={() => console.log('Approve & continue')}
      onReopen={() => console.log('Reopen phase')}
    />
  )
}
