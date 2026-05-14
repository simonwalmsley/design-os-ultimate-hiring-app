// =============================================================================
// Data Types
// =============================================================================

export type AccountStatus = 'active' | 'inactive'

export type ProfileRole = 'super-admin' | 'coach' | 'client'

export type ProfileStatus = 'active' | 'inactive' | 'pending' | 'unverified'

export type ThreadStatus =
  | 'setup-in-progress'
  | 'waiting-for-applicants'
  | 'ranking-in-progress'
  | 'shortlist-ready'
  | 'hire-closed'

export type ActivityType =
  | 'client-signed-up'
  | 'thread-created'
  | 'phase-completed'
  | 'applicant-shortlisted'
  | 'hire-closed'
  | 'user-approved'

export type ModelCost = 'low' | 'medium' | 'high'

export interface AdminSummary {
  totalClients: number
  activeThreads: number
  applicantsProcessed: number
  pendingApprovals: number
}

export interface ActivityEvent {
  id: string
  type: ActivityType
  message: string
  timestamp: string
}

export interface PendingApproval {
  id: string
  name: string
  email: string
  businessName: string
  requestedRole: ProfileRole
  appliedDate: string
}

export interface AccountUser {
  id: string
  name: string
  email: string
  role: ProfileRole
  status: ProfileStatus
}

export interface AccountThread {
  id: string
  roleTitle: string
  currentPhase: number
  status: ThreadStatus
}

export interface Account {
  id: string
  businessName: string
  industry: string
  location: string
  phone: string
  status: AccountStatus
  joinedDate: string
  users: AccountUser[]
  threads: AccountThread[]
}

export interface AiModel {
  id: string
  name: string
  cost: ModelCost
}

export interface AiProvider {
  id: string
  name: string
  models: AiModel[]
}

export interface PhaseAiConfig {
  phaseNumber: number
  phaseName: string
  providerId: string
  modelId: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface AdminDashboardProps {
  /** Platform-wide headline numbers */
  summary: AdminSummary
  /** Recent platform activity, newest first */
  activity: ActivityEvent[]
  /** People awaiting access approval */
  pendingApprovals: PendingApproval[]
  /** Called when the admin approves a pending person */
  onApprove?: (id: string) => void
  /** Called when the admin rejects a pending person */
  onReject?: (id: string) => void
  /** Called when the admin navigates to the full client list */
  onViewAllClients?: () => void
}

export interface ClientManagementProps {
  /** People awaiting access approval */
  pendingApprovals: PendingApproval[]
  /** All client accounts on the platform */
  accounts: Account[]
  /** Called when the admin approves a pending person */
  onApprove?: (id: string) => void
  /** Called when the admin rejects a pending person */
  onReject?: (id: string) => void
  /** Called when the admin searches the account list */
  onSearch?: (query: string) => void
  /** Called when the admin filters the account list by status */
  onFilterStatus?: (status: AccountStatus | 'all') => void
  /** Called when the admin deactivates or reactivates an account */
  onToggleAccountStatus?: (accountId: string) => void
  /** Called when the admin deactivates or reactivates a user on an account */
  onToggleUserStatus?: (accountId: string, userId: string) => void
  /** Called when the admin opens a hiring thread from an expanded account */
  onOpenThread?: (threadId: string) => void
}

export interface AiConfigurationProps {
  /** The catalogue of available providers and models */
  providers: AiProvider[]
  /** The currently assigned provider and model for each phase */
  config: PhaseAiConfig[]
  /** Called when the admin changes the model for a phase */
  onChangeModel?: (phaseNumber: number, providerId: string, modelId: string) => void
  /** Called when the admin saves the AI configuration */
  onSave?: () => void
}
