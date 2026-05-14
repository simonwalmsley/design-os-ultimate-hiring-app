import type { ThreadStatus } from '../types'

const config: Record<ThreadStatus, { label: string; className: string }> = {
  'setup-in-progress': { label: 'Setup in progress', className: 'bg-[#ff8907]/10 text-[#ff8907]' },
  'waiting-for-applicants': {
    label: 'Waiting for applicants',
    className: 'bg-white/5 text-gray-400',
  },
  'ranking-in-progress': {
    label: 'Ranking in progress',
    className: 'bg-[#1a6ef4]/10 text-[#1a6ef4]',
  },
  'shortlist-ready': { label: 'Shortlist ready', className: 'bg-[#16a249]/10 text-[#16a249]' },
  'hire-closed': { label: 'Hire closed', className: 'bg-white/5 text-gray-500' },
}

export function ThreadStatusPill({ status }: { status: ThreadStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
