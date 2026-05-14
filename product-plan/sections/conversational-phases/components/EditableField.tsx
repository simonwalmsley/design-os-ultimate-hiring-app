import { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/20/solid'

interface EditableFieldProps {
  label?: string
  value: string
  onChange?: (value: string) => void
  multiline?: boolean
  readOnly?: boolean
  variant?: 'body' | 'heading'
}

export function EditableField({
  label,
  value,
  onChange,
  multiline = true,
  readOnly = false,
  variant = 'body',
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(value)

  const commit = () => {
    setEditing(false)
    if (text.trim() !== value) onChange?.(text.trim())
  }

  const displayClass =
    variant === 'heading'
      ? 'text-base font-semibold text-white'
      : 'text-sm/6 text-gray-300'

  return (
    <div className="group">
      {label && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </p>
      )}

      {editing && !readOnly ? (
        multiline ? (
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={commit}
            rows={4}
            className="block w-full resize-none rounded-md bg-white/5 px-3 py-2 text-sm/6 text-white outline-2 -outline-offset-2 outline-[#ffcd05]"
          />
        ) : (
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit()
            }}
            className={[
              'block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-2 -outline-offset-2 outline-[#ffcd05]',
              variant === 'heading' ? 'text-base font-semibold' : 'text-sm/6',
            ].join(' ')}
          />
        )
      ) : (
        <div
          onClick={() => !readOnly && setEditing(true)}
          className={[
            'relative rounded-md',
            displayClass,
            readOnly ? '' : '-mx-2 cursor-text px-2 py-1 transition-colors hover:bg-white/5',
          ].join(' ')}
        >
          {text}
          {!readOnly && (
            <PencilSquareIcon className="absolute right-1 top-1.5 size-3.5 text-gray-600 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
      )}
    </div>
  )
}
