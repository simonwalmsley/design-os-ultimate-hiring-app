import type { PhaseStatus } from '@/../product/sections/conversational-phases/types'

const config: Record<PhaseStatus, { label: string; className: string }> = {
  'not-started': { label: 'Not started', className: 'bg-white/5 text-gray-400' },
  'in-progress': { label: 'In progress', className: 'bg-[#1a6ef4]/10 text-[#1a6ef4]' },
  generated: { label: 'Ready for review', className: 'bg-[#ffcd05]/10 text-[#ffcd05]' },
  completed: { label: 'Completed', className: 'bg-emerald-500/10 text-emerald-400' },
  'needs-update': { label: 'Needs update', className: 'bg-[#ff8907]/10 text-[#ff8907]' },
}

export function StatusPill({ status }: { status: PhaseStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
