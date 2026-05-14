import { ChevronUpIcon, ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import type { PhaseThreeProps } from '../types'
import { PhaseShell } from './PhaseShell'
import { ChatPanel } from './ChatPanel'
import { EditableField } from './EditableField'
import { ReviewPlaceholder } from './ReviewPlaceholder'

export function PhaseThreeRoleOutcomes({
  thread,
  phase,
  onSendMessage,
  onEditCategory,
  onReorderCategory,
  onRegenerateCategory,
  onApprove,
  onReopen,
}: PhaseThreeProps) {
  const readOnly = phase.status === 'completed'
  const showPlaceholder = phase.status === 'not-started' || phase.status === 'in-progress'
  const sorted = [...phase.scoringCategories].sort((a, b) => a.priority - b.priority)

  const review = showPlaceholder ? (
    <ReviewPlaceholder title="Your scoring categories" />
  ) : (
    <div className="space-y-4 p-5">
      <div className="px-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Ranked Criteria
        </p>
        <p className="mt-0.5 text-sm/6 text-gray-500">
          Five things that decide the hire, ordered by what matters most. Reorder if your gut says
          different.
        </p>
      </div>

      {sorted.map((cat, i) => (
        <section
          key={cat.priority}
          className="rounded-xl bg-white/5 outline -outline-offset-1 outline-white/10"
        >
          <div className="flex gap-4 p-5">
            {/* Priority + reorder controls */}
            <div className="flex flex-col items-center gap-2">
              <span
                className="flex size-9 items-center justify-center rounded-lg bg-[#ffcd05]/10 text-lg font-semibold text-[#ffcd05]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {cat.priority}
              </span>
              {!readOnly && (
                <div className="flex flex-col">
                  <button
                    disabled={i === 0}
                    onClick={() => onReorderCategory?.(cat.priority, 'up')}
                    className="text-gray-600 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-gray-600"
                  >
                    <ChevronUpIcon className="size-4" />
                    <span className="sr-only">Move up</span>
                  </button>
                  <button
                    disabled={i === sorted.length - 1}
                    onClick={() => onReorderCategory?.(cat.priority, 'down')}
                    className="text-gray-600 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-gray-600"
                  >
                    <ChevronDownIcon className="size-4" />
                    <span className="sr-only">Move down</span>
                  </button>
                </div>
              )}
            </div>

            {/* Category content */}
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <EditableField
                    value={cat.label}
                    variant="heading"
                    multiline={false}
                    readOnly={readOnly}
                    onChange={(v) => onEditCategory?.(cat.priority, 'label', v)}
                  />
                </div>
                {!readOnly && (
                  <button
                    onClick={() => onRegenerateCategory?.(cat.priority)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <ArrowPathIcon className="size-3.5" />
                    Regenerate
                  </button>
                )}
              </div>

              <EditableField
                value={cat.description}
                readOnly={readOnly}
                onChange={(v) => onEditCategory?.(cat.priority, 'description', v)}
              />

              <div className="rounded-lg bg-white/[0.03] px-3 py-2 outline -outline-offset-1 outline-white/5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                  Why this rank
                </p>
                <p className="mt-0.5 text-sm/6 text-gray-400">{cat.priorityReason}</p>
              </div>
            </div>
          </div>
        </section>
      ))}
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
