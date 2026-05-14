import { gradeOverall } from './scoreUtils'

interface OverallScoreBadgeProps {
  score: number
  size?: 'sm' | 'lg'
}

export function OverallScoreBadge({ score, size = 'sm' }: OverallScoreBadgeProps) {
  const grade = gradeOverall(score)
  const dims = size === 'lg' ? 'size-20' : 'size-12'
  const text = size === 'lg' ? 'text-4xl' : 'text-lg'

  return (
    <div
      className={`flex ${dims} shrink-0 flex-col items-center justify-center rounded-xl ${grade.bg}`}
    >
      <span
        className={`font-semibold ${text} ${grade.text}`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {score}
      </span>
      {size === 'lg' && (
        <span className="text-[10px] uppercase tracking-wide text-gray-600">/ 100</span>
      )}
    </div>
  )
}
