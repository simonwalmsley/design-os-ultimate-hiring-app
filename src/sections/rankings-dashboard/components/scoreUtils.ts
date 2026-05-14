interface ScoreGrade {
  text: string
  bg: string
  fill: string
}

/** Colour grade for an overall applicant score (0-100). */
export function gradeOverall(score: number): ScoreGrade {
  if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', fill: 'bg-emerald-400' }
  if (score >= 60) return { text: 'text-[#ff8907]', bg: 'bg-[#ff8907]/10', fill: 'bg-[#ff8907]' }
  return { text: 'text-gray-400', bg: 'bg-white/5', fill: 'bg-gray-500' }
}

/** Colour grade for a per-category score (1-10). */
export function gradeCategory(score: number): ScoreGrade {
  if (score >= 8) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', fill: 'bg-emerald-400' }
  if (score >= 6) return { text: 'text-[#ff8907]', bg: 'bg-[#ff8907]/10', fill: 'bg-[#ff8907]' }
  return { text: 'text-gray-400', bg: 'bg-white/5', fill: 'bg-gray-500' }
}
