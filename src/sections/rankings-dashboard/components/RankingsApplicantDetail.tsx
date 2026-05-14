import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon as StarSolid,
  XCircleIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/20/solid'
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'
import type { RankingsApplicantDetailProps } from '@/../product/sections/rankings-dashboard/types'
import { OverallScoreBadge } from './OverallScoreBadge'
import { ApplicantStatusPill } from './ApplicantStatusPill'
import { CategoryScoreBlock } from './CategoryScoreBlock'

export function RankingsApplicantDetail({
  thread,
  applicant,
  scoringCategories,
  onBack,
  onShortlist,
  onReject,
  onResetStatus,
  onPrevApplicant,
  onNextApplicant,
}: RankingsApplicantDetailProps) {
  const sortedScores = [...applicant.scores].sort(
    (a, b) => a.categoryPriority - b.categoryPriority,
  )

  return (
    <div className="space-y-6">
      {/* Back + prev/next navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeftIcon className="size-4" />
          Back to ranking
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevApplicant}
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ChevronLeftIcon className="size-5" />
            <span className="sr-only">Previous applicant</span>
          </button>
          <button
            onClick={onNextApplicant}
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ChevronRightIcon className="size-5" />
            <span className="sr-only">Next applicant</span>
          </button>
        </div>
      </div>

      {/* Header card */}
      <div className="flex flex-col gap-5 rounded-xl bg-white/5 p-5 outline -outline-offset-1 outline-white/10 sm:flex-row sm:items-center">
        <OverallScoreBadge score={applicant.overallScore} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500">
            {thread.roleTitle} · {thread.businessName}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            {applicant.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <ApplicantStatusPill status={applicant.status} />
            <span className="text-xs text-gray-600">
              {applicant.cvFileName} · {applicant.submittedDate}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          {applicant.status !== 'shortlisted' ? (
            <button
              onClick={() => onShortlist?.(applicant.id)}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#16a249] px-3.5 py-2 text-sm/6 font-semibold text-white transition-colors hover:bg-[#138a3e]"
            >
              <StarOutline className="size-4" />
              Shortlist
            </button>
          ) : (
            <button
              onClick={() => onResetStatus?.(applicant.id)}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#16a249]/15 px-3.5 py-2 text-sm/6 font-semibold text-[#16a249] outline -outline-offset-1 outline-[#16a249]/30 transition-colors hover:bg-[#16a249]/25"
            >
              <StarSolid className="size-4" />
              Shortlisted
            </button>
          )}
          {applicant.status !== 'rejected' ? (
            <button
              onClick={() => onReject?.(applicant.id)}
              className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3.5 py-2 text-sm/6 font-semibold text-gray-300 outline -outline-offset-1 outline-white/10 transition-colors hover:bg-white/10 hover:text-white"
            >
              <XCircleIcon className="size-4" />
              Reject
            </button>
          ) : (
            <button
              onClick={() => onResetStatus?.(applicant.id)}
              className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3.5 py-2 text-sm/6 font-semibold text-gray-400 outline -outline-offset-1 outline-white/10 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowUturnLeftIcon className="size-4" />
              Restore
            </button>
          )}
        </div>
      </div>

      {/* Body: score breakdown + CV panel */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Score Breakdown
          </h2>
          {sortedScores.map((score) => {
            const category = scoringCategories.find(
              (c) => c.priority === score.categoryPriority,
            )
            if (!category) return null
            return (
              <CategoryScoreBlock
                key={score.categoryPriority}
                category={category}
                score={score}
              />
            )
          })}
        </div>

        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">CV</h2>
            <div className="mt-4 rounded-xl bg-white/5 p-5 outline -outline-offset-1 outline-white/10">
              <p className="text-xs text-gray-600">{applicant.cvFileName}</p>
              <p className="mt-3 text-sm/6 whitespace-pre-line text-gray-300">
                {applicant.cvText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
