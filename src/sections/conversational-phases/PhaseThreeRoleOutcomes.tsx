import data from '@/../product/sections/conversational-phases/data.json'
import { PhaseThreeRoleOutcomes } from './components/PhaseThreeRoleOutcomes'
import type {
  PhaseThreeData,
  ThreadContext,
} from '@/../product/sections/conversational-phases/types'

export default function PhaseThreeRoleOutcomesPreview() {
  return (
    <PhaseThreeRoleOutcomes
      thread={data.thread as ThreadContext}
      phase={data.phaseThree as PhaseThreeData}
      onSendMessage={(content) => console.log('Send message:', content)}
      onEditCategory={(priority, field, value) =>
        console.log('Edit category:', priority, field, value)
      }
      onReorderCategory={(priority, direction) =>
        console.log('Reorder category:', priority, direction)
      }
      onRegenerateCategory={(priority) => console.log('Regenerate category:', priority)}
      onApprove={() => console.log('Approve & continue')}
      onReopen={() => console.log('Reopen phase')}
    />
  )
}
