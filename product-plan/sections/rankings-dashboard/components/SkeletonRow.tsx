export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 outline -outline-offset-1 outline-white/10">
      <span className="w-7 shrink-0" />
      <div className="size-12 shrink-0 animate-pulse rounded-xl bg-white/10" />
      <div className="min-w-0 flex-1">
        <div className="h-3.5 w-40 animate-pulse rounded bg-white/10" />
        <div className="mt-2 h-2.5 w-56 animate-pulse rounded bg-white/5" />
      </div>
      <span className="text-xs text-gray-600">Scoring…</span>
    </div>
  )
}
