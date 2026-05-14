import data from '@/../product/sections/rankings-dashboard/data.json'
import { RankingsLeaderboard } from './components/RankingsLeaderboard'
import type {
  Applicant,
  RankingPhase,
  RankingSummary,
  ScoringCategory,
  ThreadContext,
} from '@/../product/sections/rankings-dashboard/types'

export default function RankingsLeaderboardPreview() {
  return (
    <RankingsLeaderboard
      thread={data.thread as ThreadContext}
      phase={data.phase as RankingPhase}
      summary={data.summary as RankingSummary}
      scoringCategories={data.scoringCategories as ScoringCategory[]}
      applicants={data.applicants as Applicant[]}
      onUploadCVs={() => console.log('Upload CVs')}
      onOpenApplicant={(id) => console.log('Open applicant:', id)}
      onShortlist={(id) => console.log('Shortlist:', id)}
      onReject={(id) => console.log('Reject:', id)}
      onResetStatus={(id) => console.log('Reset status:', id)}
      onFilter={(filter) => console.log('Filter:', filter)}
      onSort={(sortBy, categoryPriority) => console.log('Sort:', sortBy, categoryPriority)}
    />
  )
}
