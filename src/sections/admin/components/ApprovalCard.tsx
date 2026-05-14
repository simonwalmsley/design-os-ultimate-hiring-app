import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import type { PendingApproval, ProfileRole } from '@/../product/sections/admin/types'

const roleLabel: Record<ProfileRole, string> = {
  'super-admin': 'Super Admin',
  coach: 'Coach',
  client: 'Client',
}

interface ApprovalCardProps {
  approval: PendingApproval
  onApprove?: () => void
  onReject?: () => void
}

export function ApprovalCard({ approval, onApprove, onReject }: ApprovalCardProps) {
  const initials = approval.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="rounded-xl bg-white/5 p-4 outline -outline-offset-1 outline-white/10">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-gray-300">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{approval.name}</p>
          <p className="mt-0.5 truncate text-xs text-gray-500">
            {approval.businessName} · {roleLabel[approval.requestedRole]} · {approval.appliedDate}
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={onReject}
          className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 outline -outline-offset-1 outline-white/10 transition-colors hover:bg-white/10 hover:text-white"
        >
          <XMarkIcon className="size-4" />
          Reject
        </button>
        <button
          onClick={onApprove}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#16a249] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#138a3e]"
        >
          <CheckIcon className="size-4" />
          Approve
        </button>
      </div>
    </div>
  )
}
