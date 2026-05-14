import { SparklesIcon } from '@heroicons/react/24/outline'

export function ReviewPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex h-full min-h-[20rem] flex-col items-center justify-center px-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-white/5 outline -outline-offset-1 outline-white/10">
        <SparklesIcon className="size-6 text-gray-600" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{title} will appear here</h3>
      <p className="mt-1 max-w-xs text-sm/6 text-gray-500">
        Keep answering in the chat. Once UHP has enough to work with, it drafts this for you to
        review and refine.
      </p>
    </div>
  )
}
