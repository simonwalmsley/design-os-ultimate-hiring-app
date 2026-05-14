import type {
  ApplicantScore,
  ScoringCategory,
} from '../types'
import { ScoreBar } from './ScoreBar'

interface CategoryScoreBlockProps {
  category: ScoringCategory
  score: ApplicantScore
}

export function CategoryScoreBlock({ category, score }: CategoryScoreBlockProps) {
  return (
    <section className="rounded-xl bg-white/5 p-5 outline -outline-offset-1 outline-white/10">
      <div className="flex items-center gap-2.5">
        <span
          className="flex size-6 items-center justify-center rounded-md bg-[#ffcd05]/10 text-xs font-semibold text-[#ffcd05]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {category.priority}
        </span>
        <h3 className="text-sm font-semibold text-white">{category.label}</h3>
      </div>

      <div className="mt-3">
        <ScoreBar score={score.score} />
      </div>

      <p className="mt-3 text-sm/6 text-gray-300">{score.explanation}</p>

      <blockquote className="mt-3 border-l-2 border-[#ffcd05]/40 bg-white/[0.03] py-2 pr-2 pl-3 text-sm/6 text-gray-400 italic">
        {score.evidence}
      </blockquote>
    </section>
  )
}
