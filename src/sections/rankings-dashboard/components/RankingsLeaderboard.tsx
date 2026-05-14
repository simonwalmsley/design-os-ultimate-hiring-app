import { useState } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid'
import type {
  RankingsLeaderboardProps,
  LeaderboardFilter,
} from '@/../product/sections/rankings-dashboard/types'
import { CvUploadZone } from './CvUploadZone'
import { ScoringProgressBanner } from './ScoringProgressBanner'
import { ApplicantRow } from './ApplicantRow'
import { SkeletonRow } from './SkeletonRow'

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-5 py-4 outline -outline-offset-1 outline-white/10">
      <p
        className="text-2xl font-semibold text-white"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {value}
      </p>
      <p className="mt-1 text-sm/6 font-medium text-gray-400">{label}</p>
    </div>
  )
}

export function RankingsLeaderboard({
  thread,
  phase,
  summary,
  scoringCategories,
  applicants,
  onUploadCVs,
  onOpenApplicant,
  onShortlist,
  onReject,
  onResetStatus,
  onFilter,
  onSort,
}: RankingsLeaderboardProps) {
  const [filter, setFilter] = useState<LeaderboardFilter>('all')
  const [sortBy, setSortBy] = useState('overall')

  const handleFilter = (f: LeaderboardFilter) => {
    setFilter(f)
    onFilter?.(f)
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    if (value === 'overall') onSort?.('overall')
    else onSort?.('category', Number(value))
  }

  const sorted = [...applicants].sort((a, b) => {
    if (sortBy === 'overall') return b.overallScore - a.overallScore
    const cp = Number(sortBy)
    const sa = a.scores.find((s) => s.categoryPriority === cp)?.score ?? 0
    const sb = b.scores.find((s) => s.categoryPriority === cp)?.score ?? 0
    return sb - sa
  })

  const ranked = sorted.map((applicant, i) => ({ applicant, rank: i + 1 }))
  const visible = ranked.filter(({ applicant }) => {
    if (filter === 'shortlisted') return applicant.status === 'shortlisted'
    if (filter === 'rejected') return applicant.status === 'rejected'
    return true
  })

  const skeletonCount = Math.max(0, phase.scoringProgress.total - applicants.length)
  const isScoring = phase.scoringProgress.scored < phase.scoringProgress.total

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500">
          {thread.roleTitle} · {thread.businessName}
        </p>
        <div className="mt-1.5 flex items-center gap-2.5">
          <span
            className="rounded-md bg-[#ffcd05]/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#ffcd05]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Phase {phase.phaseNumber}
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">{phase.title}</h1>
        <p className="mt-1 text-sm/6 text-gray-400">
          Applicants scored against your five criteria, ranked by overall fit.
        </p>
      </div>
      <button
        onClick={onUploadCVs}
        className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#ffcd05] px-3.5 py-2 text-sm/6 font-semibold text-[#0a0a0a] transition-colors hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
      >
        <ArrowUpTrayIcon className="size-5" />
        Upload CVs
      </button>
    </div>
  )

  if (applicants.length === 0) {
    return (
      <div className="space-y-8">
        {header}
        <CvUploadZone onUpload={onUploadCVs} />
      </div>
    )
  }

  const filterTabs: { key: LeaderboardFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: summary.scored },
    { key: 'shortlisted', label: 'Shortlisted', count: summary.shortlisted },
    { key: 'rejected', label: 'Rejected', count: summary.rejected },
  ]

  return (
    <div className="space-y-6">
      {header}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard value={summary.totalApplicants} label="Total Applicants" />
        <StatCard value={summary.scored} label="Scored" />
        <StatCard value={summary.shortlisted} label="Shortlisted" />
        <StatCard value={summary.averageScore} label="Average Score" />
      </div>

      {isScoring && <ScoringProgressBanner progress={phase.scoringProgress} />}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-lg bg-white/5 p-1 outline -outline-offset-1 outline-white/10">
          {filterTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => handleFilter(t.key)}
              className={[
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                filter === t.key ? 'bg-[#ffcd05] text-[#0a0a0a]' : 'text-gray-400 hover:text-white',
              ].join(' ')}
            >
              {t.label}
              <span
                className={`ml-1.5 ${filter === t.key ? 'text-[#0a0a0a]/60' : 'text-gray-600'}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="rounded-md bg-white/5 px-3 py-1.5 text-sm text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
          >
            <option value="overall">Overall score</option>
            {scoringCategories.map((c) => (
              <option key={c.priority} value={String(c.priority)}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2.5">
        {visible.map(({ applicant, rank }) => (
          <ApplicantRow
            key={applicant.id}
            rank={rank}
            applicant={applicant}
            onOpen={() => onOpenApplicant?.(applicant.id)}
            onShortlist={() => onShortlist?.(applicant.id)}
            onReject={() => onReject?.(applicant.id)}
            onResetStatus={() => onResetStatus?.(applicant.id)}
          />
        ))}

        {filter === 'all' &&
          Array.from({ length: skeletonCount }).map((_, i) => <SkeletonRow key={`skeleton-${i}`} />)}

        {visible.length === 0 && (
          <div className="rounded-xl bg-white/5 px-5 py-10 text-center text-sm text-gray-500 outline -outline-offset-1 outline-white/10">
            No {filter} applicants yet.
          </div>
        )}
      </div>
    </div>
  )
}
