import type { ApplicantStatus } from '@/../product/sections/rankings-dashboard/types'

const config: Record<ApplicantStatus, { label: string; className: string }> = {
  scored: { label: 'Scored', className: 'bg-white/5 text-gray-400' },
  shortlisted: { label: 'Shortlisted', className: 'bg-[#16a249]/10 text-[#16a249]' },
  rejected: { label: 'Rejected', className: 'bg-white/5 text-gray-600' },
}

export function ApplicantStatusPill({ status }: { status: ApplicantStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
