import { useState } from 'react'
import { CheckIcon, ArrowUturnLeftIcon } from '@heroicons/react/20/solid'
import type { PhaseStatus, ThreadContext } from '@/../product/sections/conversational-phases/types'
import { StatusPill } from './StatusPill'

interface PhaseShellProps {
  thread: ThreadContext
  phaseNumber: number
  title: string
  description: string
  status: PhaseStatus
  lastGeneratedAt: string | null
  chat: React.ReactNode
  review: React.ReactNode
  onApprove?: () => void
  onReopen?: () => void
}

export function PhaseShell({
  thread,
  phaseNumber,
  title,
  description,
  status,
  lastGeneratedAt,
  chat,
  review,
  onApprove,
  onReopen,
}: PhaseShellProps) {
  const [mobileView, setMobileView] = useState<'chat' | 'review'>('chat')
  const isCompleted = status === 'completed'

  return (
    <div className="flex flex-col lg:h-[calc(100vh-7rem)] lg:min-h-[560px]">
      {/* Phase header */}
      <header className="flex flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500">
            {thread.roleTitle} · {thread.businessName}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-md bg-[#ffcd05]/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#ffcd05]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Phase {phaseNumber}
            </span>
            <StatusPill status={status} />
            {lastGeneratedAt && <span className="text-xs text-gray-600">{lastGeneratedAt}</span>}
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-1 text-sm/6 text-gray-400">{description}</p>
        </div>

        <div className="shrink-0">
          {isCompleted ? (
            <button
              onClick={onReopen}
              className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3.5 py-2 text-sm/6 font-semibold text-white outline -outline-offset-1 outline-white/10 transition-colors hover:bg-white/10"
            >
              <ArrowUturnLeftIcon className="size-4" />
              Reopen to edit
            </button>
          ) : (
            <button
              onClick={onApprove}
              className="inline-flex items-center gap-2 rounded-md bg-[#ffcd05] px-3.5 py-2 text-sm/6 font-semibold text-[#0a0a0a] transition-colors hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
            >
              <CheckIcon className="size-4" />
              Approve &amp; Continue
            </button>
          )}
        </div>
      </header>

      {/* Mobile / tablet pane toggle */}
      <div className="mb-3 flex rounded-lg bg-white/5 p-1 outline -outline-offset-1 outline-white/10 lg:hidden">
        {(['chat', 'review'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setMobileView(v)}
            className={[
              'flex-1 rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors',
              mobileView === v ? 'bg-[#ffcd05] text-[#0a0a0a]' : 'text-gray-400 hover:text-white',
            ].join(' ')}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Two-pane: chat + review */}
      <div className="flex min-h-[70vh] flex-1 overflow-hidden rounded-xl outline -outline-offset-1 outline-white/10 lg:min-h-0">
        {/* Chat */}
        <div
          className={[
            'flex-col lg:flex lg:w-2/5 lg:border-r lg:border-white/10',
            mobileView === 'chat' ? 'flex w-full' : 'hidden',
          ].join(' ')}
        >
          {chat}
        </div>

        {/* Review */}
        <div
          className={[
            'lg:block lg:w-3/5 lg:overflow-y-auto',
            mobileView === 'review' ? 'block w-full overflow-y-auto' : 'hidden',
          ].join(' ')}
        >
          {review}
        </div>
      </div>
    </div>
  )
}
