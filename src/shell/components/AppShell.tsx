import { useState } from 'react'
import { Menu, X, Sun, Moon, ChevronRight } from 'lucide-react'
import { MainNav, type NavItem } from './MainNav'
import { UserMenu } from './UserMenu'

interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavItem[]
  breadcrumbs?: string[]
  activeThread?: string
  user?: { name: string; email?: string; avatarUrl?: string }
  isDark?: boolean
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onToggleTheme?: () => void
}

export default function AppShell({
  children,
  navigationItems,
  breadcrumbs = ['Hiring Threads'],
  activeThread,
  user = { name: 'Alex Morgan', email: 'alex@acmeplumbing.com.au' },
  isDark = true,
  onNavigate,
  onLogout,
  onToggleTheme,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 font-['Inter',system-ui,sans-serif]">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-neutral-800 bg-neutral-950 shrink-0">
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-neutral-800">
          <span className="text-sm font-semibold tracking-tight text-neutral-100">
            Ultimate Hiring Process
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <MainNav
            items={navigationItems}
            activeThread={activeThread}
            onNavigate={onNavigate}
          />
        </div>

        {/* Footer — user identity + theme toggle */}
        <div className="border-t border-neutral-800 px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-medium text-neutral-300">
              {user.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-200 truncate">{user.name}</p>
              {user.email && (
                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
              )}
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5" strokeWidth={1.5} />
            ) : (
              <Moon className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 h-full flex flex-col bg-neutral-950 border-r border-neutral-800">
            <div className="h-14 flex items-center justify-between px-5 border-b border-neutral-800">
              <span className="text-sm font-semibold tracking-tight text-neutral-100">
                Ultimate Hiring Process
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-neutral-400 hover:text-neutral-100"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <MainNav
                items={navigationItems}
                activeThread={activeThread}
                onNavigate={(href) => {
                  onNavigate?.(href)
                  setSidebarOpen(false)
                }}
              />
            </div>
            <div className="border-t border-neutral-800 px-4 py-3">
              <button
                onClick={onToggleTheme}
                className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-3.5 h-3.5" strokeWidth={1.5} />
                ) : (
                  <Moon className="w-3.5 h-3.5" strokeWidth={1.5} />
                )}
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 flex items-center gap-4 px-4 md:px-6 border-b border-neutral-800 bg-neutral-950 shrink-0">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-neutral-400 hover:text-neutral-100"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-sm min-w-0">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 min-w-0">
                {i > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" strokeWidth={1.5} />
                )}
                <span
                  className={`truncate ${
                    i === breadcrumbs.length - 1
                      ? 'text-neutral-100 font-medium'
                      : 'text-neutral-500'
                  }`}
                >
                  {crumb}
                </span>
              </span>
            ))}
          </div>

          {/* User menu — top right */}
          <div className="ml-auto">
            <UserMenu
              name={user.name}
              email={user.email}
              avatarUrl={user.avatarUrl}
              onLogout={onLogout}
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
