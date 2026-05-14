import type { ConversationMessage } from '@/../product/sections/conversational-phases/types'

export function ChatMessage({ message }: { message: ConversationMessage }) {
  if (message.role === 'system') {
    return (
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-white/10" />
        <span className="shrink-0 text-xs text-gray-600">{message.content}</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    )
  }

  const isUser = message.role === 'user'

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={[
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm/6',
          isUser
            ? 'rounded-br-md bg-[#ffcd05]/10 text-gray-100'
            : 'rounded-bl-md bg-white/5 text-gray-300 outline -outline-offset-1 outline-white/10',
        ].join(' ')}
      >
        {message.content}
      </div>
      <span className="mt-1 px-1 text-[11px] text-gray-600">{message.timestamp}</span>
    </div>
  )
}
