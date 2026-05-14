import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export function CvUploadZone({ onUpload }: { onUpload?: () => void }) {
  return (
    <button
      onClick={onUpload}
      className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] px-8 py-16 text-center transition-colors hover:border-[#ffcd05]/40 hover:bg-white/[0.04]"
    >
      <div className="flex size-14 items-center justify-center rounded-xl bg-white/5">
        <ArrowUpTrayIcon className="size-7 text-gray-500" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">Upload applicant CVs</h3>
      <p className="mt-1.5 max-w-sm text-sm/6 text-gray-500">
        Drop CV files here or click to browse. PDF and Word documents, multiple at once. The AI
        scores each one against your five criteria.
      </p>
      <span className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#ffcd05] px-4 py-2 text-sm/6 font-semibold text-[#0a0a0a]">
        <ArrowUpTrayIcon className="size-4" />
        Upload CVs
      </span>
    </button>
  )
}
