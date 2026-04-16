import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import type { HiringThread, HiringThreadsPopulatedProps, ThreadStatus } from '@/../product/sections/hiring-threads/types'

const statusConfig: Record<ThreadStatus, { label: string; color: string }> = {
  'setup-in-progress': { label: 'Setup in progress', color: 'bg-[#ff8907]/10 text-[#ff8907]' },
  'waiting-for-applicants': { label: 'Waiting for applicants', color: 'bg-white/5 text-gray-400' },
  'ranking-in-progress': { label: 'Ranking in progress', color: 'bg-[#1a6ef4]/10 text-[#1a6ef4]' },
  'shortlist-ready': { label: 'Shortlist ready', color: 'bg-[#16a249]/10 text-[#16a249]' },
  'hire-closed': { label: 'Hire closed', color: 'bg-white/5 text-gray-500' },
}

function KPICard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-5 py-4 outline -outline-offset-1 outline-white/10">
      <p className="text-3xl font-semibold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {value}
      </p>
      <p className="mt-1 text-sm/6 font-medium text-gray-400">{label}</p>
    </div>
  )
}

function ThreadCard({
  thread,
  onOpen,
}: {
  thread: HiringThread
  onOpen?: () => void
}) {
  const status = statusConfig[thread.status]
  const progress = (thread.currentPhase / thread.totalPhases) * 100

  return (
    <button
      onClick={onOpen}
      className="w-full rounded-lg bg-white/5 p-5 text-left outline -outline-offset-1 outline-white/10 transition-colors hover:bg-white/[0.07] cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-white truncate">{thread.roleTitle}</h3>
            {thread.needsUpdate && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#ff8907]/10 px-2 py-0.5 text-xs font-medium text-[#ff8907]">
                <ExclamationTriangleIcon className="size-3.5" />
                Needs update
              </span>
            )}
          </div>
          <p className="mt-1 text-sm/6 text-gray-400">
            {thread.businessName} · {thread.location}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300 outline -outline-offset-1 outline-white/10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Phase {thread.currentPhase} / {thread.totalPhases}
          </span>
          <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Counts */}
      <div className="mt-4 flex items-center gap-6 text-sm text-gray-400">
        <span>
          Applicants{' '}
          <span className="font-medium text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {thread.applicants}
          </span>
        </span>
        <span>
          Shortlisted{' '}
          <span className="font-medium text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {thread.shortlisted}
          </span>
        </span>
        <span>
          Reviewed{' '}
          <span className="font-medium text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {thread.reviewed}
          </span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
        <div
          className="h-1.5 rounded-full bg-[#ffcd05]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-gray-500">{thread.lastUpdated}</p>
    </button>
  )
}

export function HiringThreadsPopulated({
  kpis,
  threads,
  onOpenThread,
  onCreateThread,
  onFilterStatus,
  onSearch,
  onSort,
}: HiringThreadsPopulatedProps) {
  const [showNewThread, setShowNewThread] = useState(false)
  const [newRoleTitle, setNewRoleTitle] = useState('')

  const handleNewThread = (e: React.FormEvent) => {
    e.preventDefault()
    if (newRoleTitle.trim()) {
      onCreateThread?.(newRoleTitle.trim())
      setNewRoleTitle('')
      setShowNewThread(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Hiring Threads</h1>
          <p className="mt-1 text-sm/6 text-gray-400">All your hires in one place.</p>
        </div>
        <button
          onClick={() => setShowNewThread(!showNewThread)}
          className="inline-flex items-center gap-2 rounded-md bg-[#ffcd05] px-3.5 py-2 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
        >
          <PlusIcon className="size-5" />
          New Hiring Thread
        </button>
      </div>

      {/* New thread input */}
      {showNewThread && (
        <form onSubmit={handleNewThread} className="mt-6 flex items-center gap-3">
          <input
            type="text"
            value={newRoleTitle}
            onChange={(e) => setNewRoleTitle(e.target.value)}
            placeholder="Enter the role you're hiring for"
            autoFocus
            className="block flex-1 rounded-md bg-white/5 px-3 py-2 text-sm text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
          />
          <button
            type="submit"
            className="rounded-md bg-[#ffcd05] px-4 py-2 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800]"
          >
            Get Started
          </button>
          <button
            type="button"
            onClick={() => { setShowNewThread(false); setNewRoleTitle('') }}
            className="rounded-md px-4 py-2 text-sm/6 font-semibold text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </form>
      )}

      {/* KPI row */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard value={kpis.activeThreads} label="Active Threads" />
        <KPICard value={kpis.totalApplicants} label="Total Applicants" />
        <KPICard value={kpis.shortlisted} label="Shortlisted" />
      </div>

      {/* Filter bar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          onChange={(e) => onFilterStatus?.(e.target.value as ThreadStatus | 'all')}
          defaultValue="all"
          className="rounded-md bg-white/5 px-3 py-2 text-sm text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
        >
          <option value="all">All</option>
          <option value="setup-in-progress">Setup in progress</option>
          <option value="waiting-for-applicants">Waiting for applicants</option>
          <option value="ranking-in-progress">Ranking in progress</option>
          <option value="shortlist-ready">Shortlist ready</option>
          <option value="hire-closed">Hire closed</option>
        </select>

        <div className="relative flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search role or business"
            onChange={(e) => onSearch?.(e.target.value)}
            className="block w-full rounded-md bg-white/5 py-2 pl-9 pr-3 text-sm text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
          />
        </div>

        <select
          onChange={(e) => onSort?.(e.target.value as 'last-updated' | 'role-az' | 'applicant-count')}
          defaultValue="last-updated"
          className="rounded-md bg-white/5 px-3 py-2 text-sm text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
        >
          <option value="last-updated">Last updated</option>
          <option value="role-az">Role A–Z</option>
          <option value="applicant-count">Applicant count</option>
        </select>
      </div>

      {/* Thread list */}
      <div className="mt-6 space-y-3">
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            onOpen={() => onOpenThread?.(thread.id)}
          />
        ))}
      </div>
    </div>
  )
}
