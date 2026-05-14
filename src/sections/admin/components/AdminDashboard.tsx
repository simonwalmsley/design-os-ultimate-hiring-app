import { ArrowRightIcon } from '@heroicons/react/20/solid'
import type { AdminDashboardProps } from '@/../product/sections/admin/types'
import { KpiCard } from './KpiCard'
import { ApprovalCard } from './ApprovalCard'
import { ActivityItem } from './ActivityItem'

export function AdminDashboard({
  summary,
  activity,
  pendingApprovals,
  onApprove,
  onReject,
  onViewAllClients,
}: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Admin Dashboard</h1>
        <p className="mt-1 text-sm/6 text-gray-400">Platform activity and accounts at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard value={summary.totalClients} label="Total Clients" />
        <KpiCard value={summary.activeThreads} label="Active Threads" />
        <KpiCard
          value={summary.applicantsProcessed.toLocaleString()}
          label="Applicants Processed"
        />
        <KpiCard
          value={summary.pendingApprovals}
          label="Pending Approvals"
          highlight={summary.pendingApprovals > 0}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Recent Activity
          </h2>
          <ul className="mt-4 space-y-4">
            {activity.map((event) => (
              <ActivityItem key={event.id} event={event} />
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Needs Attention
            </h2>
            {pendingApprovals.length > 0 && (
              <span
                className="rounded-md bg-[#ff8907]/10 px-2 py-0.5 text-xs font-medium text-[#ff8907]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {pendingApprovals.length}
              </span>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {pendingApprovals.length === 0 ? (
              <p className="rounded-xl bg-white/5 px-4 py-8 text-center text-sm text-gray-500 outline -outline-offset-1 outline-white/10">
                Nothing waiting. All caught up.
              </p>
            ) : (
              pendingApprovals.map((approval) => (
                <ApprovalCard
                  key={approval.id}
                  approval={approval}
                  onApprove={() => onApprove?.(approval.id)}
                  onReject={() => onReject?.(approval.id)}
                />
              ))
            )}
            <button
              onClick={onViewAllClients}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#ffcd05] transition-colors hover:text-[#e6b800]"
            >
              View all clients
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
