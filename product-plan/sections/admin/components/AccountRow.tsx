import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import type { Account, ProfileRole } from '../types'
import { StatusPill } from './StatusPill'
import { ThreadStatusPill } from './ThreadStatusPill'

const roleLabel: Record<ProfileRole, string> = {
  'super-admin': 'Super Admin',
  coach: 'Coach',
  client: 'Client',
}

interface AccountRowProps {
  account: Account
  onToggleAccountStatus?: () => void
  onToggleUserStatus?: (userId: string) => void
  onOpenThread?: (threadId: string) => void
}

export function AccountRow({
  account,
  onToggleAccountStatus,
  onToggleUserStatus,
  onOpenThread,
}: AccountRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl bg-white/5 outline -outline-offset-1 outline-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <ChevronRightIcon
          className={`size-5 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{account.businessName}</p>
          <p className="mt-0.5 truncate text-xs text-gray-500">
            {account.industry} · {account.location}
          </p>
        </div>
        <div className="hidden items-center gap-5 text-xs text-gray-400 sm:flex">
          <span>
            Users{' '}
            <span
              className="font-medium text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {account.users.length}
            </span>
          </span>
          <span>
            Threads{' '}
            <span
              className="font-medium text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {account.threads.length}
            </span>
          </span>
        </div>
        <StatusPill status={account.status} />
        <span className="hidden text-xs text-gray-600 md:block">{account.joinedDate}</span>
      </button>

      {open && (
        <div className="border-t border-white/10 px-4 py-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Users
              </h4>
              <ul className="mt-3 space-y-2">
                {account.users.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{user.name}</p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email} · {roleLabel[user.role]}
                      </p>
                    </div>
                    <StatusPill status={user.status} />
                    <button
                      onClick={() => onToggleUserStatus?.(user.id)}
                      className="shrink-0 text-xs font-medium text-gray-500 transition-colors hover:text-white"
                    >
                      {user.status === 'inactive' ? 'Reactivate' : 'Deactivate'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Hiring Threads
              </h4>
              {account.threads.length === 0 ? (
                <p className="mt-3 rounded-lg bg-white/[0.03] px-3 py-4 text-center text-xs text-gray-600">
                  No threads yet
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {account.threads.map((thread) => (
                    <li key={thread.id}>
                      <button
                        onClick={() => onOpenThread?.(thread.id)}
                        className="flex w-full items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2 text-left transition-colors hover:bg-white/[0.06]"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {thread.roleTitle}
                          </p>
                          <p
                            className="text-xs text-gray-500"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            Phase {thread.currentPhase}
                          </p>
                        </div>
                        <ThreadStatusPill status={thread.status} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end border-t border-white/10 pt-4">
            <button
              onClick={onToggleAccountStatus}
              className="rounded-md bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 outline -outline-offset-1 outline-white/10 transition-colors hover:bg-white/10 hover:text-white"
            >
              {account.status === 'inactive' ? 'Reactivate account' : 'Deactivate account'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
