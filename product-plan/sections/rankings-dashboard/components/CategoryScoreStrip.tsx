import type { ApplicantScore } from '../types'
import { gradeCategory } from './scoreUtils'

export function CategoryScoreStrip({ scores }: { scores: ApplicantScore[] }) {
  const sorted = [...scores].sort((a, b) => a.categoryPriority - b.categoryPriority)

  return (
    <div className="flex items-end gap-1">
      {sorted.map((s) => {
        const grade = gradeCategory(s.score)
        return (
          <div
            key={s.categoryPriority}
            title={`${s.categoryLabel}: ${s.score}/10`}
            className="flex h-7 w-1.5 items-end overflow-hidden rounded-full bg-white/10"
          >
            <div
              className={`w-full rounded-full ${grade.fill}`}
              style={{ height: `${s.score * 10}%` }}
            />
          </div>
        )
      })}
    </div>
  )
}
