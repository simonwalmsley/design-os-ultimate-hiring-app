import type { ScoringProgress } from '@/../product/sections/rankings-dashboard/types'

export function ScoringProgressBanner({ progress }: { progress: ScoringProgress }) {
  const pct = Math.round((progress.scored / progress.total) * 100)

  return (
    <div className="rounded-xl bg-[#1a6ef4]/10 p-4 outline -outline-offset-1 outline-[#1a6ef4]/20">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-[#1a6ef4]">
          Scoring applicants — {progress.scored} of {progress.total} done
        </p>
        <span
          className="text-xs text-blue-200/70"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {pct}%
        </span>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#1a6ef4] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
