import { gradeCategory } from './scoreUtils'

export function ScoreBar({ score }: { score: number }) {
  const grade = gradeCategory(score)

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${grade.fill}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span
        className={`text-sm font-semibold ${grade.text}`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {score}
        <span className="text-gray-600">/10</span>
      </span>
    </div>
  )
}
