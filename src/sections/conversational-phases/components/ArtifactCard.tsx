import { ArrowPathIcon } from '@heroicons/react/20/solid'

interface ArtifactCardProps {
  title: string
  icon?: React.ReactNode
  onRegenerate?: () => void
  children: React.ReactNode
}

export function ArtifactCard({ title, icon, onRegenerate, children }: ArtifactCardProps) {
  return (
    <section className="rounded-xl bg-white/5 outline -outline-offset-1 outline-white/10">
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowPathIcon className="size-3.5" />
            Regenerate
          </button>
        )}
      </header>
      <div className="space-y-4 px-5 py-4">{children}</div>
    </section>
  )
}
