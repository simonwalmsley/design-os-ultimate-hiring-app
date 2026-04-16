import { useState } from 'react'
import type { HiringThreadsEmptyProps } from '@/../product/sections/hiring-threads/types'

export function HiringThreadsEmpty({ onCreateThread }: HiringThreadsEmptyProps) {
  const [roleTitle, setRoleTitle] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && roleTitle.trim()) {
      e.preventDefault()
      onCreateThread?.(roleTitle.trim())
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center px-4" style={{ paddingTop: '142px' }}>
      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className="font-semibold text-white" style={{ fontSize: '48px', lineHeight: '48px', letterSpacing: '0.5px', fontFamily: "'Inter', system-ui, sans-serif" }}>Start A New Hiring Thread</h1>
        <div className="mx-auto mt-8 max-w-xl">
          <textarea
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter the role you are hiring for…"
            rows={2}
            className="block w-full rounded-xl bg-white/5 px-5 py-4 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05] resize-none"
          />
        </div>
        <button
          onClick={() => { if (roleTitle.trim()) onCreateThread?.(roleTitle.trim()) }}
          className="mt-6 rounded-md bg-[#ffcd05] px-6 py-2.5 text-sm/6 font-semibold text-[#0a0a0a] hover:bg-[#e6b800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
