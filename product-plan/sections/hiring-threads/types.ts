// =============================================================================
// Data Types
// =============================================================================

export type ThreadStatus =
  | 'setup-in-progress'
  | 'waiting-for-applicants'
  | 'ranking-in-progress'
  | 'shortlist-ready'
  | 'hire-closed'

export interface HiringThread {
  id: string
  roleTitle: string
  businessName: string
  location: string
  currentPhase: number
  totalPhases: number
  applicants: number
  shortlisted: number
  reviewed: number
  status: ThreadStatus
  lastUpdated: string
  needsUpdate: boolean
}

export interface ThreadKPIs {
  activeThreads: number
  totalApplicants: number
  shortlisted: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface HiringThreadsEmptyProps {
  /** Called when user submits a role name to create a new thread */
  onCreateThread?: (roleTitle: string) => void
}

export interface HiringThreadsPopulatedProps {
  /** Summary KPIs for the dashboard */
  kpis: ThreadKPIs
  /** The list of hiring threads to display */
  threads: HiringThread[]
  /** Called when user clicks a thread card to resume */
  onOpenThread?: (id: string) => void
  /** Called when user starts creating a new thread */
  onCreateThread?: (roleTitle: string) => void
  /** Called when user filters by status */
  onFilterStatus?: (status: ThreadStatus | 'all') => void
  /** Called when user searches */
  onSearch?: (query: string) => void
  /** Called when user changes sort order */
  onSort?: (sortBy: 'last-updated' | 'role-az' | 'applicant-count') => void
}
