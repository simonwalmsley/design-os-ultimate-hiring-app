import data from '@/../product/sections/admin/data.json'
import { ClientManagement } from './components/ClientManagement'
import type { PendingApproval, Account } from '@/../product/sections/admin/types'

export default function ClientManagementPreview() {
  return (
    <ClientManagement
      pendingApprovals={data.pendingApprovals as PendingApproval[]}
      accounts={data.accounts as Account[]}
      onApprove={(id) => console.log('Approve:', id)}
      onReject={(id) => console.log('Reject:', id)}
      onSearch={(query) => console.log('Search:', query)}
      onFilterStatus={(status) => console.log('Filter status:', status)}
      onToggleAccountStatus={(id) => console.log('Toggle account status:', id)}
      onToggleUserStatus={(accountId, userId) =>
        console.log('Toggle user status:', accountId, userId)
      }
      onOpenThread={(id) => console.log('Open thread:', id)}
    />
  )
}
