import type { AccountStatus, ProfileStatus } from '@/../product/sections/admin/types'

type Status = AccountStatus | ProfileStatus

const config: Record<Status, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-[#16a249]/10 text-[#16a249]' },
  pending: { label: 'Pending', className: 'bg-[#ff8907]/10 text-[#ff8907]' },
  inactive: { label: 'Inactive', className: 'bg-white/5 text-gray-600' },
  unverified: { label: 'Unverified', className: 'bg-white/5 text-gray-500' },
}

export function StatusPill({ status }: { status: Status }) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
