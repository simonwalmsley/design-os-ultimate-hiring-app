// =============================================================================
// Data Types
// =============================================================================

export type PhaseStatus =
  | 'not-started'
  | 'in-progress'
  | 'generated'
  | 'completed'
  | 'needs-update'

export type MessageRole = 'system' | 'user' | 'assistant'

export interface ConversationMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
}

export interface ThreadContext {
  id: string
  roleTitle: string
  businessName: string
}

export interface CompanyProfile {
  story: string
  culture: string
  valueProposition: string
}

export interface IntentDocument {
  roleSummary: string
  whyItExists: string
  successLooksLike: string
}

export interface PersonProfile {
  traits: string[]
  experience: string
  qualities: string[]
}

export interface JobAdLogistics {
  location: string
  hours: string
  salary: string
  howToApply: string
  responseTimeframe: string
}

export interface JobAdSection {
  heading: string
  content: string
}

export interface JobAd {
  logistics: JobAdLogistics
  sections: JobAdSection[]
}

export interface ScoringCategory {
  priority: number
  label: string
  description: string
  priorityReason: string
}

// =============================================================================
// Phase Shapes
// =============================================================================

export interface PhaseOneData {
  phaseNumber: 1
  title: string
  description: string
  status: PhaseStatus
  lastGeneratedAt: string | null
  messages: ConversationMessage[]
  companyProfile: CompanyProfile
  intentDocument: IntentDocument
  personProfile: PersonProfile
}

export interface PhaseTwoData {
  phaseNumber: 2
  title: string
  description: string
  status: PhaseStatus
  lastGeneratedAt: string | null
  /** Set when the phase is flagged 'needs-update' - explains what changed upstream */
  regenerationNote?: string
  messages: ConversationMessage[]
  jobAd: JobAd
}

export interface PhaseThreeData {
  phaseNumber: 3
  title: string
  description: string
  status: PhaseStatus
  lastGeneratedAt: string | null
  messages: ConversationMessage[]
  scoringCategories: ScoringCategory[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface PhaseOneProps {
  /** The hiring thread these phases belong to */
  thread: ThreadContext
  /** Phase 1 conversation and its three artifacts */
  phase: PhaseOneData
  /** Called when the user sends a chat message */
  onSendMessage?: (content: string) => void
  /** Called when the user edits a field on one of the three artifacts inline */
  onEditField?: (
    artifact: 'companyProfile' | 'intentDocument' | 'personProfile',
    field: string,
    value: string,
  ) => void
  /** Called when the user regenerates one of the three artifacts */
  onRegenerateArtifact?: (
    artifact: 'companyProfile' | 'intentDocument' | 'personProfile',
  ) => void
  /** Called when the user approves the phase to unlock the next */
  onApprove?: () => void
  /** Called when the user reopens a completed phase for editing */
  onReopen?: () => void
}

export interface PhaseTwoProps {
  /** The hiring thread these phases belong to */
  thread: ThreadContext
  /** Phase 2 conversation, logistics, and the seven-section job ad */
  phase: PhaseTwoData
  /** Called when the user sends a chat message */
  onSendMessage?: (content: string) => void
  /** Called when the user edits a job ad logistics field */
  onUpdateLogistics?: (field: keyof JobAdLogistics, value: string) => void
  /** Called when the user edits a job ad section's content inline */
  onEditSection?: (heading: string, content: string) => void
  /** Called when the user regenerates a single job ad section */
  onRegenerateSection?: (heading: string) => void
  /** Called when the user regenerates the whole job ad after a 'needs-update' flag */
  onRegenerateAll?: () => void
  /** Called when the user approves the phase to unlock the next */
  onApprove?: () => void
  /** Called when the user reopens a completed phase for editing */
  onReopen?: () => void
}

export interface PhaseThreeProps {
  /** The hiring thread these phases belong to */
  thread: ThreadContext
  /** Phase 3 conversation and the five ranked scoring categories */
  phase: PhaseThreeData
  /** Called when the user sends a chat message */
  onSendMessage?: (content: string) => void
  /** Called when the user edits a scoring category's label or description inline */
  onEditCategory?: (
    priority: number,
    field: 'label' | 'description',
    value: string,
  ) => void
  /** Called when the user reorders a scoring category up or down the priority list */
  onReorderCategory?: (priority: number, direction: 'up' | 'down') => void
  /** Called when the user regenerates a single scoring category */
  onRegenerateCategory?: (priority: number) => void
  /** Called when the user approves the phase to unlock the next */
  onApprove?: () => void
  /** Called when the user reopens a completed phase for editing */
  onReopen?: () => void
}
