import type { AiProvider, ModelCost } from '../types'
import { CostBadge } from './CostBadge'

interface PhaseModelRowProps {
  phaseNumber: number
  phaseName: string
  providers: AiProvider[]
  modelId: string
  onChange?: (providerId: string, modelId: string) => void
}

export function PhaseModelRow({
  phaseNumber,
  phaseName,
  providers,
  modelId,
  onChange,
}: PhaseModelRowProps) {
  let currentCost: ModelCost = 'medium'
  for (const provider of providers) {
    const model = provider.models.find((m) => m.id === modelId)
    if (model) currentCost = model.cost
  }

  const handleChange = (newModelId: string) => {
    const provider = providers.find((p) => p.models.some((m) => m.id === newModelId))
    if (provider) onChange?.(provider.id, newModelId)
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white/5 p-4 outline -outline-offset-1 outline-white/10 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2.5 sm:w-56">
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#ffcd05]/10 text-xs font-semibold text-[#ffcd05]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {phaseNumber}
        </span>
        <p className="text-sm font-semibold text-white">{phaseName}</p>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <select
          value={modelId}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 rounded-md bg-white/5 px-3 py-2 text-sm text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
        >
          {providers.map((provider) => (
            <optgroup key={provider.id} label={provider.name}>
              {provider.models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <CostBadge cost={currentCost} />
      </div>
    </div>
  )
}
