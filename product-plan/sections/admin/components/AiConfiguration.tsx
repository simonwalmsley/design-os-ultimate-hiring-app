import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import type { AiConfigurationProps, PhaseAiConfig } from '../types'
import { PhaseModelRow } from './PhaseModelRow'

export function AiConfiguration({
  providers,
  config,
  onChangeModel,
  onSave,
}: AiConfigurationProps) {
  const [draft, setDraft] = useState<PhaseAiConfig[]>(config)
  const [saved, setSaved] = useState(true)

  const handleChange = (phaseNumber: number, providerId: string, modelId: string) => {
    setDraft((prev) =>
      prev.map((c) => (c.phaseNumber === phaseNumber ? { ...c, providerId, modelId } : c)),
    )
    setSaved(false)
    onChangeModel?.(phaseNumber, providerId, modelId)
  }

  const handleSave = () => {
    setSaved(true)
    onSave?.()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">AI Configuration</h1>
          <p className="mt-1 text-sm/6 text-gray-400">
            Choose the AI model that powers each phase.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saved}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#ffcd05] px-3.5 py-2 text-sm/6 font-semibold text-[#0a0a0a] transition-colors hover:bg-[#e6b800] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-600"
        >
          <CheckIcon className="size-4" />
          {saved ? 'Saved' : 'Save changes'}
        </button>
      </div>

      <div className="space-y-2.5">
        {draft.map((phase) => (
          <PhaseModelRow
            key={phase.phaseNumber}
            phaseNumber={phase.phaseNumber}
            phaseName={phase.phaseName}
            providers={providers}
            modelId={phase.modelId}
            onChange={(providerId, modelId) =>
              handleChange(phase.phaseNumber, providerId, modelId)
            }
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-white/5 px-4 py-3 text-xs text-gray-500 outline -outline-offset-1 outline-white/10">
        <span className="font-medium text-gray-400">Cost guide</span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-400" /> Low
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#ff8907]" /> Medium
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-400" /> High
        </span>
      </div>
    </div>
  )
}
