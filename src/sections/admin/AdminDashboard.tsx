import data from '@/../product/sections/admin/data.json'
import { AdminDashboard } from './components/AdminDashboard'
import type {
  AdminSummary,
  ActivityEvent,
  PendingApproval,
} from '@/../product/sections/admin/types'

export default function AdminDashboardPreview() {
  return (
    <AdminDashboard
      summary={data.summary as AdminSummary}
      activity={data.activity as ActivityEvent[]}
      pendingApprovals={data.pendingApprovals as PendingApproval[]}
      onApprove={(id) => console.log('Approve:', id)}
      onReject={(id) => console.log('Reject:', id)}
      onViewAllClients={() => console.log('View all clients')}
    />
  )
}
