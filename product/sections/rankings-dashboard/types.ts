// =============================================================================
// Data Types
// =============================================================================

export type ApplicantStatus = 'scored' | 'shortlisted' | 'rejected'

export type RankingStatus =
  | 'waiting-for-applicants'
  | 'ranking-in-progress'
  | 'shortlist-ready'

export type LeaderboardFilter = 'all' | 'shortlisted' | 'rejected'

export type LeaderboardSort = 'overall' | 'category'

export interface ThreadContext {
  id: string
  roleTitle: string
  businessName: string
}

export interface ScoringCategory {
  priority: number
  label: string
  description: string
  priorityReason: string
}

export interface ApplicantScore {
  /** Links to a ScoringCategory via its priority (1-5) */
  categoryPriority: number
  /** Denormalised category label for convenient display */
  categoryLabel: string
  /** Rating from 1 to 10 */
  score: number
  explanation: string
  /** Quoted CV snippet used as evidence for the score */
  evidence: string
}

export interface Applicant {
  id: string
  name: string
  cvFileName: string
  submittedDate: string
  status: ApplicantStatus
  /** Overall AI score from 0 to 100 */
  overallScore: number
  /** Extracted CV text */
  cvText: string
  /** One score per ScoringCategory (five in total) */
  scores: ApplicantScore[]
}

export interface ScoringProgress {
  scored: number
  total: number
}

export interface RankingPhase {
  phaseNumber: 4
  title: string
  status: RankingStatus
  scoringProgress: ScoringProgress
}

export interface RankingSummary {
  totalApplicants: number
  scored: number
  shortlisted: number
  rejected: number
  /** Average overall score across all scored applicants */
  averageScore: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface RankingsLeaderboardProps {
  /** The hiring thread this ranking belongs to */
  thread: ThreadContext
  /** Phase 4 status and scoring progress */
  phase: RankingPhase
  /** Headline counts for the leaderboard */
  summary: RankingSummary
  /** The five criteria every applicant is scored against */
  scoringCategories: ScoringCategory[]
  /** The applicants to rank and display */
  applicants: Applicant[]
  /** Called when the user uploads more CV files */
  onUploadCVs?: () => void
  /** Called when the user clicks an applicant to open the detail view */
  onOpenApplicant?: (id: string) => void
  /** Called when the user shortlists an applicant */
  onShortlist?: (id: string) => void
  /** Called when the user rejects an applicant */
  onReject?: (id: string) => void
  /** Called when the user resets an applicant back to the scored (un-actioned) state */
  onResetStatus?: (id: string) => void
  /** Called when the user changes the filter tab */
  onFilter?: (filter: LeaderboardFilter) => void
  /** Called when the user changes sort order; categoryPriority is set when sorting by a category */
  onSort?: (sortBy: LeaderboardSort, categoryPriority?: number) => void
}

export interface RankingsApplicantDetailProps {
  /** The hiring thread this applicant belongs to */
  thread: ThreadContext
  /** The applicant being viewed */
  applicant: Applicant
  /** The five criteria the applicant was scored against */
  scoringCategories: ScoringCategory[]
  /** Called when the user navigates back to the leaderboard */
  onBack?: () => void
  /** Called when the user shortlists the applicant */
  onShortlist?: (id: string) => void
  /** Called when the user rejects the applicant */
  onReject?: (id: string) => void
  /** Called when the user resets the applicant back to the scored (un-actioned) state */
  onResetStatus?: (id: string) => void
  /** Called when the user navigates to the previous applicant in the ranking */
  onPrevApplicant?: () => void
  /** Called when the user navigates to the next applicant in the ranking */
  onNextApplicant?: () => void
}
