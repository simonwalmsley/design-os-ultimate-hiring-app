import { StarIcon as StarOutline } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid, XMarkIcon } from '@heroicons/react/20/solid'
import type { Applicant } from '../types'
import { OverallScoreBadge } from './OverallScoreBadge'
import { CategoryScoreStrip } from './CategoryScoreStrip'
import { ApplicantStatusPill } from './ApplicantStatusPill'

interface ApplicantRowProps {
  rank: number
  applicant: Applicant
  onOpen?: () => void
  onShortlist?: () => void
  onReject?: () => void
  onResetStatus?: () => void
}

export function ApplicantRow({
  rank,
  applicant,
  onOpen,
  onShortlist,
  onReject,
  onResetStatus,
}: ApplicantRowProps) {
  const isShortlisted = applicant.status === 'shortlisted'
  const isRejected = applicant.status === 'rejected'

  return (
    <div
      onClick={onOpen}
      className="group flex cursor-pointer items-center gap-4 rounded-xl bg-white/5 p-4 outline -outline-offset-1 outline-white/10 transition-colors hover:bg-white/[0.07]"
    >
      <span
        className="w-7 shrink-0 text-center text-sm font-semibold text-gray-500"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {rank}
      </span>

      <OverallScoreBadge score={applicant.overallScore} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{applicant.name}</p>
        <p className="mt-0.5 truncate text-xs text-gray-500">
          {applicant.cvFileName} · {applicant.submittedDate}
        </p>
      </div>

      <div className="hidden sm:block">
        <CategoryScoreStrip scores={applicant.scores} />
      </div>

      <ApplicantStatusPill status={applicant.status} />

      <div className="flex shrink-0 items-center gap-0.5">
        {!isRejected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onReject?.()
            }}
            title="Reject applicant"
            className="rounded-md p-1.5 text-gray-600 opacity-0 transition-all hover:bg-white/5 hover:text-gray-300 group-hover:opacity-100"
          >
            <XMarkIcon className="size-5" />
            <span className="sr-only">Reject applicant</span>
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            isShortlisted ? onResetStatus?.() : onShortlist?.()
          }}
          title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
          className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-white/5 hover:text-[#ffcd05]"
        >
          {isShortlisted ? (
            <StarSolid className="size-5 text-[#ffcd05]" />
          ) : (
            <StarOutline className="size-5" />
          )}
          <span className="sr-only">
            {isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
          </span>
        </button>
      </div>
    </div>
  )
}
