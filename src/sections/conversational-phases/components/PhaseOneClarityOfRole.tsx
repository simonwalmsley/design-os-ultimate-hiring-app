import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import type { PhaseOneProps } from '@/../product/sections/conversational-phases/types'
import { PhaseShell } from './PhaseShell'
import { ChatPanel } from './ChatPanel'
import { ArtifactCard } from './ArtifactCard'
import { EditableField } from './EditableField'
import { ReviewPlaceholder } from './ReviewPlaceholder'

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm/6 text-gray-300">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-[#ffcd05]" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function PhaseOneClarityOfRole({
  thread,
  phase,
  onSendMessage,
  onEditField,
  onRegenerateArtifact,
  onApprove,
  onReopen,
}: PhaseOneProps) {
  const readOnly = phase.status === 'completed'
  const showPlaceholder = phase.status === 'not-started' || phase.status === 'in-progress'

  const review = showPlaceholder ? (
    <ReviewPlaceholder title="Your Phase 1 documents" />
  ) : (
    <div className="space-y-5 p-5">
      <ArtifactCard
        title="Company Profile"
        icon={<BuildingOffice2Icon className="size-4 text-gray-500" />}
        onRegenerate={readOnly ? undefined : () => onRegenerateArtifact?.('companyProfile')}
      >
        <EditableField
          label="Story"
          value={phase.companyProfile.story}
          readOnly={readOnly}
          onChange={(v) => onEditField?.('companyProfile', 'story', v)}
        />
        <EditableField
          label="Culture"
          value={phase.companyProfile.culture}
          readOnly={readOnly}
          onChange={(v) => onEditField?.('companyProfile', 'culture', v)}
        />
        <EditableField
          label="Value Proposition"
          value={phase.companyProfile.valueProposition}
          readOnly={readOnly}
          onChange={(v) => onEditField?.('companyProfile', 'valueProposition', v)}
        />
      </ArtifactCard>

      <ArtifactCard
        title="Intent Document"
        icon={<DocumentTextIcon className="size-4 text-gray-500" />}
        onRegenerate={readOnly ? undefined : () => onRegenerateArtifact?.('intentDocument')}
      >
        <EditableField
          label="Role Summary"
          value={phase.intentDocument.roleSummary}
          readOnly={readOnly}
          onChange={(v) => onEditField?.('intentDocument', 'roleSummary', v)}
        />
        <EditableField
          label="Why It Exists"
          value={phase.intentDocument.whyItExists}
          readOnly={readOnly}
          onChange={(v) => onEditField?.('intentDocument', 'whyItExists', v)}
        />
        <EditableField
          label="Success Looks Like"
          value={phase.intentDocument.successLooksLike}
          readOnly={readOnly}
          onChange={(v) => onEditField?.('intentDocument', 'successLooksLike', v)}
        />
      </ArtifactCard>

      <ArtifactCard
        title="Person Profile"
        icon={<UserCircleIcon className="size-4 text-gray-500" />}
        onRegenerate={readOnly ? undefined : () => onRegenerateArtifact?.('personProfile')}
      >
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Traits
          </p>
          <BulletList items={phase.personProfile.traits} />
        </div>
        <EditableField
          label="Experience"
          value={phase.personProfile.experience}
          readOnly={readOnly}
          onChange={(v) => onEditField?.('personProfile', 'experience', v)}
        />
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Qualities
          </p>
          <BulletList items={phase.personProfile.qualities} />
        </div>
      </ArtifactCard>
    </div>
  )

  return (
    <PhaseShell
      thread={thread}
      phaseNumber={phase.phaseNumber}
      title={phase.title}
      description={phase.description}
      status={phase.status}
      lastGeneratedAt={phase.lastGeneratedAt}
      onApprove={onApprove}
      onReopen={onReopen}
      chat={
        <ChatPanel messages={phase.messages} onSendMessage={onSendMessage} disabled={readOnly} />
      }
      review={review}
    />
  )
}
