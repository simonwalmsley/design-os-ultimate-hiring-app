import { useState } from 'react'
import type { HiringThreadsEmptyProps } from '@/../product/sections/hiring-threads/types'

export function HiringThreadsEmpty({ onCreateThread }: HiringThreadsEmptyProps) {
  const [roleTitle, setRoleTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (roleTitle.trim()) {
      onCreateThread?.(roleTitle.trim())
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-white" style={{ letterSpacing: '-0.05em' }}>
          Start a new hiring thread
        </h1>
        <p className="mt-4 text-base text-gray-400">
          Enter the role you're hiring for
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-4">
          <input
            type="text"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="e.g. Senior Plumber"
            className="block w-full max-w-md rounded-md bg-white/5 px-4 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] sm:text-sm/6"
          />
          <button
            type="submit"
            className="rounded-md bg-[#ffcd05] px-6 py-2 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  )
}
