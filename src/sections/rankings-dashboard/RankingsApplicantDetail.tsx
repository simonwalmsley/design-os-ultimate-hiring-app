import data from '@/../product/sections/rankings-dashboard/data.json'
import { RankingsApplicantDetail } from './components/RankingsApplicantDetail'
import type {
  Applicant,
  ScoringCategory,
  ThreadContext,
} from '@/../product/sections/rankings-dashboard/types'

export default function RankingsApplicantDetailPreview() {
  return (
    <RankingsApplicantDetail
      thread={data.thread as ThreadContext}
      applicant={data.applicants[0] as Applicant}
      scoringCategories={data.scoringCategories as ScoringCategory[]}
      onBack={() => console.log('Back to ranking')}
      onShortlist={(id) => console.log('Shortlist:', id)}
      onReject={(id) => console.log('Reject:', id)}
      onResetStatus={(id) => console.log('Reset status:', id)}
      onPrevApplicant={() => console.log('Previous applicant')}
      onNextApplicant={() => console.log('Next applicant')}
    />
  )
}
