import { useEffect, useRef, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import type { ConversationMessage } from '@/../product/sections/conversational-phases/types'
import { ChatMessage } from './ChatMessage'

interface ChatPanelProps {
  messages: ConversationMessage[]
  onSendMessage?: (content: string) => void
  /** Disables the composer — used when the phase is completed and read-only */
  disabled?: boolean
}

export function ChatPanel({ messages, onSendMessage, disabled }: ChatPanelProps) {
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [thinking])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    onSendMessage?.(text)
    setDraft('')
    setThinking(true)
    setTimeout(() => setThinking(false), 1600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex h-full flex-col bg-white/[0.02]">
      {/* Message thread */}
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {thinking && (
          <div className="flex items-center gap-1.5 px-1">
            <span className="size-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-gray-500" />
            <span className="ml-1.5 text-xs text-gray-600">UHP is thinking…</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-end gap-2 rounded-xl bg-white/5 px-3 py-2 outline -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#ffcd05]">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            placeholder={
              disabled
                ? 'This phase is complete — reopen to continue the conversation'
                : 'Type your answer…'
            }
            className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-white placeholder:text-gray-600 focus:outline-none disabled:cursor-not-allowed"
          />
          <button
            onClick={send}
            disabled={disabled || !draft.trim()}
            className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#ffcd05] text-[#0a0a0a] transition-colors hover:bg-[#e6b800] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-600"
          >
            <PaperAirplaneIcon className="size-4" />
            <span className="sr-only">Send</span>
          </button>
        </div>
        <p className="mt-1.5 flex items-center gap-1 px-1 text-[11px] text-gray-600">
          <span className="size-1.5 rounded-full bg-emerald-500/70" />
          Autosaved
        </p>
      </div>
    </div>
  )
}
