import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/20/solid'

interface RegenerationBannerProps {
  note: string
  onRegenerate?: () => void
}

export function RegenerationBanner({ note, onRegenerate }: RegenerationBannerProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-[#ff8907]/10 p-4 outline -outline-offset-1 outline-[#ff8907]/20">
      <ExclamationTriangleIcon className="size-5 shrink-0 text-[#ff8907]" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#ff8907]">This phase needs an update</p>
        <p className="mt-0.5 text-sm/6 text-amber-200/70">{note}</p>
      </div>
      <button
        onClick={onRegenerate}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#ff8907] px-3 py-1.5 text-xs font-semibold text-[#0a0a0a] transition-colors hover:bg-[#e07b06]"
      >
        <ArrowPathIcon className="size-3.5" />
        Regenerate
      </button>
    </div>
  )
}
