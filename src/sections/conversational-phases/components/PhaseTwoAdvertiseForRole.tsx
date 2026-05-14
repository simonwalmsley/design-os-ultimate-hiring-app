import { LockClosedIcon } from '@heroicons/react/20/solid'
import type {
  PhaseTwoProps,
  JobAdLogistics,
} from '@/../product/sections/conversational-phases/types'
import { PhaseShell } from './PhaseShell'
import { ChatPanel } from './ChatPanel'
import { ArtifactCard } from './ArtifactCard'
import { EditableField } from './EditableField'
import { ReviewPlaceholder } from './ReviewPlaceholder'
import { RegenerationBanner } from './RegenerationBanner'

const logisticsFields: { key: keyof JobAdLogistics; label: string }[] = [
  { key: 'location', label: 'Location' },
  { key: 'hours', label: 'Hours' },
  { key: 'salary', label: 'Pay' },
  { key: 'howToApply', label: 'How to Apply' },
  { key: 'responseTimeframe', label: 'Response Timeframe' },
]

export function PhaseTwoAdvertiseForRole({
  thread,
  phase,
  onSendMessage,
  onUpdateLogistics,
  onEditSection,
  onRegenerateSection,
  onRegenerateAll,
  onApprove,
  onReopen,
}: PhaseTwoProps) {
  const readOnly = phase.status === 'completed'
  const showPlaceholder = phase.status === 'not-started' || phase.status === 'in-progress'

  const review = showPlaceholder ? (
    <ReviewPlaceholder title="Your job ad" />
  ) : (
    <div className="space-y-5 p-5">
      {phase.status === 'needs-update' && phase.regenerationNote && (
        <RegenerationBanner note={phase.regenerationNote} onRegenerate={onRegenerateAll} />
      )}

      {/* Logistics — fixed practical detail */}
      <section className="rounded-xl bg-white/5 outline -outline-offset-1 outline-white/10">
        <header className="border-b border-white/10 px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Job Details</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            The practical facts — these stay fixed across the ad.
          </p>
        </header>
        <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
          {logisticsFields.map((f) => (
            <EditableField
              key={f.key}
              label={f.label}
              value={phase.jobAd.logistics[f.key]}
              multiline={false}
              readOnly={readOnly}
              onChange={(v) => onUpdateLogistics?.(f.key, v)}
            />
          ))}
        </div>
      </section>

      {/* The seven-section ad */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            The Ad — 7 Sections
          </p>
          <span className="text-[11px] text-gray-600">Headings locked · content yours to edit</span>
        </div>
        {phase.jobAd.sections.map((section, i) => (
          <ArtifactCard
            key={section.heading}
            title={section.heading}
            icon={
              <span className="flex items-center gap-1.5">
                <span
                  className="text-xs text-gray-600"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <LockClosedIcon className="size-3 text-gray-600" />
              </span>
            }
            onRegenerate={readOnly ? undefined : () => onRegenerateSection?.(section.heading)}
          >
            <EditableField
              value={section.content}
              readOnly={readOnly}
              onChange={(v) => onEditSection?.(section.heading, v)}
            />
          </ArtifactCard>
        ))}
      </div>
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
