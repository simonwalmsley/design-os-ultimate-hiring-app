import type { ModelCost } from '@/../product/sections/admin/types'

const config: Record<ModelCost, { label: string; className: string }> = {
  low: { label: 'Low cost', className: 'bg-emerald-500/10 text-emerald-400' },
  medium: { label: 'Medium cost', className: 'bg-[#ff8907]/10 text-[#ff8907]' },
  high: { label: 'High cost', className: 'bg-red-500/10 text-red-400' },
}

export function CostBadge({ cost }: { cost: ModelCost }) {
  const { label, className } = config[cost]
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  )
}
