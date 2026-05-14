import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import type { ClientManagementProps, AccountStatus } from '../types'
import { ApprovalCard } from './ApprovalCard'
import { AccountRow } from './AccountRow'

export function ClientManagement({
  pendingApprovals,
  accounts,
  onApprove,
  onReject,
  onSearch,
  onFilterStatus,
  onToggleAccountStatus,
  onToggleUserStatus,
  onOpenThread,
}: ClientManagementProps) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<AccountStatus | 'all'>('all')

  const handleSearch = (q: string) => {
    setQuery(q)
    onSearch?.(q)
  }

  const handleFilter = (status: AccountStatus | 'all') => {
    setStatusFilter(status)
    onFilterStatus?.(status)
  }

  const visible = accounts.filter((account) => {
    if (statusFilter !== 'all' && account.status !== statusFilter) return false
    if (query.trim()) {
      const q = query.toLowerCase()
      return (
        account.businessName.toLowerCase().includes(q) ||
        account.industry.toLowerCase().includes(q) ||
        account.location.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Client Management</h1>
        <p className="mt-1 text-sm/6 text-gray-400">
          Approve new users and manage client accounts.
        </p>
      </div>

      {pendingApprovals.length > 0 && (
        <section className="rounded-xl bg-[#ff8907]/[0.07] p-4 outline -outline-offset-1 outline-[#ff8907]/20">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-[#ff8907]">Pending Approvals</h2>
            <span
              className="rounded-md bg-[#ff8907]/15 px-2 py-0.5 text-xs font-medium text-[#ff8907]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {pendingApprovals.length}
            </span>
          </div>
          <div className="mt-3 space-y-2.5">
            {pendingApprovals.map((approval) => (
              <ApprovalCard
                key={approval.id}
                approval={approval}
                onApprove={() => onApprove?.(approval.id)}
                onReject={() => onReject?.(approval.id)}
              />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by business, industry, or location"
            className="block w-full rounded-md bg-white/5 py-2 pr-3 pl-9 text-sm text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => handleFilter(e.target.value as AccountStatus | 'all')}
          className="rounded-md bg-white/5 px-3 py-2 text-sm text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="space-y-2.5">
        {visible.map((account) => (
          <AccountRow
            key={account.id}
            account={account}
            onToggleAccountStatus={() => onToggleAccountStatus?.(account.id)}
            onToggleUserStatus={(userId) => onToggleUserStatus?.(account.id, userId)}
            onOpenThread={onOpenThread}
          />
        ))}
        {visible.length === 0 && (
          <div className="rounded-xl bg-white/5 px-5 py-10 text-center text-sm text-gray-500 outline -outline-offset-1 outline-white/10">
            No accounts match.
          </div>
        )}
      </div>
    </div>
  )
}
