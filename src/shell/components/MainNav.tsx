import {
  LayoutList,
  User,
  Shield,
  Cpu,
  Check,
  Lock,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import type { ReactNode } from 'react'

export type PhaseState = 'completed' | 'current' | 'locked' | 'post-mvp'

export interface PhaseItem {
  label: string
  state: PhaseState
  onClick?: () => void
}

export interface NavItem {
  label: string
  href: string
  icon: ReactNode
  isActive?: boolean
  isAdminOnly?: boolean
  phases?: PhaseItem[]
}

interface MainNavProps {
  items: NavItem[]
  activeThread?: string
  onNavigate?: (href: string) => void
}

function PhaseIcon({ state }: { state: PhaseState }) {
  switch (state) {
    case 'completed':
      return <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
    case 'current':
      return <div className="w-2 h-2 rounded-full bg-yellow-400" />
    case 'locked':
      return <Lock className="w-3 h-3 text-neutral-600" strokeWidth={1.5} />
    case 'post-mvp':
      return <div className="w-2 h-2 rounded-full border border-dashed border-neutral-600" />
  }
}

export function MainNav({ items, activeThread, onNavigate }: MainNavProps) {
  const clientItems = items.filter((item) => !item.isAdminOnly)
  const adminItems = items.filter((item) => item.isAdminOnly)

  return (
    <nav className="flex flex-col gap-1 px-3">
      {clientItems.map((item) => (
        <NavEntry key={item.href} item={item} activeThread={activeThread} onNavigate={onNavigate} />
      ))}

      {adminItems.length > 0 && (
        <>
          <div className="my-2 border-t border-neutral-800" />
          {adminItems.map((item) => (
            <NavEntry key={item.href} item={item} activeThread={activeThread} onNavigate={onNavigate} />
          ))}
        </>
      )}
    </nav>
  )
}

function NavEntry({
  item,
  activeThread,
  onNavigate,
}: {
  item: NavItem
  activeThread?: string
  onNavigate?: (href: string) => void
}) {
  const showPhases = item.isActive && item.phases && activeThread

  return (
    <div>
      <button
        onClick={() => onNavigate?.(item.href)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          item.isActive
            ? 'bg-yellow-400/10 text-yellow-400'
            : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50'
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
        {item.phases && activeThread && (
          <span className="ml-auto">
            {showPhases ? (
              <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            )}
          </span>
        )}
      </button>

      {showPhases && item.phases && (
        <div className="ml-5 mt-1 mb-1 flex flex-col gap-0.5 border-l border-neutral-800 pl-3">
          {activeThread && (
            <p className="text-xs font-medium text-neutral-500 px-2 py-1 truncate">
              {activeThread}
            </p>
          )}
          {item.phases.map((phase) => (
            <button
              key={phase.label}
              onClick={phase.state !== 'locked' && phase.state !== 'post-mvp' ? phase.onClick : undefined}
              disabled={phase.state === 'locked' || phase.state === 'post-mvp'}
              title={
                phase.state === 'locked'
                  ? 'Complete the previous phase first.'
                  : phase.state === 'post-mvp'
                    ? 'Coming soon.'
                    : undefined
              }
              className={`flex items-center gap-2.5 px-2 py-1.5 rounded text-xs transition-colors ${
                phase.state === 'current'
                  ? 'text-yellow-400 font-medium'
                  : phase.state === 'completed'
                    ? 'text-neutral-300 hover:text-neutral-100'
                    : 'text-neutral-600 cursor-not-allowed'
              }`}
            >
              <PhaseIcon state={phase.state} />
              <span>{phase.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const defaultNavItems: NavItem[] = [
  {
    label: 'Hiring Threads',
    href: '/threads',
    icon: <LayoutList className="w-4 h-4" strokeWidth={1.5} />,
    isActive: true,
    phases: [
      { label: 'Clarity of Role', state: 'completed' },
      { label: 'Advertise for Role', state: 'current' },
      { label: 'Role Outcomes', state: 'locked' },
      { label: 'Ranking', state: 'locked' },
      { label: 'Psych Profiling', state: 'post-mvp' },
      { label: 'Interview Process', state: 'post-mvp' },
      { label: 'Interview Scoring', state: 'post-mvp' },
      { label: 'Job Presentation', state: 'post-mvp' },
      { label: 'Post-Hire Review', state: 'post-mvp' },
    ],
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: <User className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    label: 'Admin Dashboard',
    href: '/admin',
    icon: <Shield className="w-4 h-4" strokeWidth={1.5} />,
    isAdminOnly: true,
  },
  {
    label: 'AI Configuration',
    href: '/admin/ai',
    icon: <Cpu className="w-4 h-4" strokeWidth={1.5} />,
    isAdminOnly: true,
  },
]
