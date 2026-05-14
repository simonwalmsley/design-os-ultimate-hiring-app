// =============================================================================
// Ultimate Hiring Process - Canonical Data Model
//
// These are the canonical entity definitions. Each section ships its own
// types.ts shaped for its UI; reconcile those against this file when building
// the backend. Field names marked "(section: X uses Y)" note known divergences.
// =============================================================================

export type ProfileRole = 'super-admin' | 'coach' | 'client'
export type ProfileStatus = 'unverified' | 'pending' | 'active' | 'inactive'

export type ThreadStatus =
  | 'setup-in-progress'
  | 'waiting-for-applicants'
  | 'ranking-in-progress'
  | 'shortlist-ready'
  | 'hire-closed'

export type ApplicantStatus = 'scored' | 'shortlisted' | 'rejected'
export type MessageRole = 'user' | 'assistant' | 'system'
export type ModelCost = 'low' | 'medium' | 'high'

export interface Account {
  id: string
  businessName: string
  industry: string
  location: string
  phoneNumber: string
}

export interface Profile {
  id: string
  accountId: string
  fullName: string
  email: string
  role: ProfileRole
  status: ProfileStatus
}

export interface HiringThread {
  id: string
  accountId: string
  roleTitle: string
  currentPhase: number
  status: ThreadStatus
}

export interface CompanyProfile {
  id: string
  accountId: string
  story: string
  culture: string
  valueProposition: string
}

export interface IntentDocument {
  id: string
  threadId: string
  roleSummary: string
  whyItExists: string
  successLooksLike: string
}

export interface PersonProfile {
  id: string
  threadId: string
  traits: string[]
  experience: string
  qualities: string[]
}

export interface JobAdSection {
  heading: string
  content: string
}

export interface JobAdLogistics {
  location: string
  hours: string
  salary: string
  howToApply: string
  responseTimeframe: string
}

export interface JobAd {
  id: string
  threadId: string
  logistics: JobAdLogistics
  sections: JobAdSection[]
}

export interface ScoringCategory {
  id: string
  threadId: string
  priority: number // 1-5
  label: string
  description: string
  priorityReason: string
}

export interface Applicant {
  id: string
  threadId: string
  name: string
  cvFileName: string
  cvText: string
  overallScore: number // 0-100
  status: ApplicantStatus
}

export interface ApplicantScore {
  id: string
  applicantId: string
  scoringCategoryId: string
  score: number // 1-10
  explanation: string
  evidence: string // quoted CV snippet
}

export interface ConversationMessage {
  id: string
  threadId: string
  phaseNumber: number
  role: MessageRole
  content: string
  timestamp: string
}

export interface AiProviderConfig {
  id: string
  phaseNumber: number
  phaseName: string
  providerId: string
  modelId: string
  cost: ModelCost
}
