'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  Cog6ToothIcon,
  CheckIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export type PhaseState = 'completed' | 'current' | 'locked' | 'post-mvp'

export interface PhaseItem {
  label: string
  state: PhaseState
}

interface AppShellProps {
  children: React.ReactNode
  breadcrumbs?: string[]
  activeThread?: string
  activeNav?: string
  phases?: PhaseItem[]
  isAdmin?: boolean
  user?: { name: string; email?: string; imageUrl?: string }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

const iconNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Hiring Threads', href: '/threads', icon: ChatBubbleLeftRightIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
]

const adminIconNavigation = [
  { name: 'Admin Dashboard', href: '/admin', icon: ShieldCheckIcon },
  { name: 'AI Configuration', href: '/admin/ai', icon: CpuChipIcon },
]

const userNavigation = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function PhaseIcon({ state }: { state: PhaseState }) {
  switch (state) {
    case 'completed':
      return <CheckIcon className="size-4 text-emerald-400" />
    case 'current':
      return <div className="size-2 rounded-full bg-[#ffcd05]" />
    case 'locked':
      return <LockClosedIcon className="size-3.5 text-gray-600" />
    case 'post-mvp':
      return <div className="size-2 rounded-full border border-dashed border-gray-600" />
  }
}

export default function AppShell({
  children,
  breadcrumbs = ['Hiring Threads'],
  activeThread,
  activeNav = 'Home',
  phases = [
    { label: 'Clarity of Role', state: 'completed' },
    { label: 'Advertise for Role', state: 'current' },
    { label: 'Role Outcomes', state: 'locked' },
    { label: 'Ranking', state: 'locked' },
    { label: '2nd Round Screening', state: 'post-mvp' },
    { label: 'Update Rankings', state: 'post-mvp' },
    { label: 'Informal Phone Interview', state: 'post-mvp' },
    { label: 'Formal Interview', state: 'post-mvp' },
    { label: 'Job Presentation', state: 'post-mvp' },
  ],
  isAdmin = true,
  user = { name: 'James Ryan', email: 'james.ryan@pattersonplumbing.com.au' },
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const allIcons = [...iconNavigation, ...(isAdmin ? adminIconNavigation : [])]
  const showSecondary = activeNav === 'Hiring Threads' && activeThread

  return (
    <div className="h-screen bg-[#0a0a0a]">
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#0a0a0a]/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0a0a0a] px-6 pb-2 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Ultimate Hiring Process"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="-mx-2 flex-1 space-y-1">
                  {allIcons.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); onNavigate?.(item.href); setSidebarOpen(false) }}
                        className={classNames(
                          activeNav === item.name
                            ? 'bg-[#ffcd05]/10 text-[#ffcd05]'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        )}
                      >
                        <item.icon aria-hidden="true" className="size-6 shrink-0" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* Phases in mobile */}
                {showSecondary && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="px-2 text-xs font-semibold text-gray-400">{activeThread}</p>
                    <ul role="list" className="mt-2 space-y-1">
                      {phases.map((phase) => (
                        <li key={phase.label}>
                          <button
                            disabled={phase.state === 'locked' || phase.state === 'post-mvp'}
                            className={classNames(
                              phase.state === 'current'
                                ? 'text-[#ffcd05] font-medium'
                                : phase.state === 'completed'
                                  ? 'text-gray-300 hover:text-white'
                                  : 'text-gray-600 cursor-not-allowed',
                              'flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm/6',
                            )}
                          >
                            <PhaseIcon state={phase.state} />
                            {phase.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Icon rail — desktop */}
      <div className="hidden before:pointer-events-none before:absolute before:inset-0 before:border-r before:border-white/10 before:bg-black/10 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-[#0a0a0a] lg:pb-4">
        <div className="relative flex h-16 shrink-0 items-center justify-center">
          <img
            alt="Ultimate Hiring Process"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=yellow&shade=400"
            className="h-8 w-auto"
          />
        </div>
        <nav className="relative mt-8">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {iconNavigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); onNavigate?.(item.href) }}
                  title={item.name}
                  className={classNames(
                    activeNav === item.name ? 'bg-[#ffcd05]/10 text-[#ffcd05]' : 'text-gray-400 hover:bg-white/5 hover:text-white',
                    'group flex gap-x-3 rounded-md p-3 text-sm/6 font-semibold',
                  )}
                >
                  <item.icon aria-hidden="true" className="size-6 shrink-0" />
                  <span className="sr-only">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
          {/* Admin icons */}
          {isAdmin && (
            <ul role="list" className="mt-6 flex flex-col items-center space-y-1 border-t border-white/10 pt-6">
              {adminIconNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); onNavigate?.(item.href) }}
                    title={item.name}
                    className={classNames(
                      activeNav === item.name ? 'bg-[#ffcd05]/10 text-[#ffcd05]' : 'text-gray-400 hover:bg-white/5 hover:text-white',
                      'group flex gap-x-3 rounded-md p-3 text-sm/6 font-semibold',
                    )}
                  >
                    <item.icon aria-hidden="true" className="size-6 shrink-0" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
        {/* Settings at bottom */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <a
            href="#"
            title="Settings"
            className="text-gray-400 hover:bg-white/5 hover:text-white rounded-md p-3"
          >
            <Cog6ToothIcon aria-hidden="true" className="size-6" />
            <span className="sr-only">Settings</span>
          </a>
        </div>
      </div>

      <div className="lg:pl-20">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-[#0a0a0a] px-4 before:pointer-events-none before:absolute before:inset-0 before:bg-black/10 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          {/* Separator */}
          <div aria-hidden="true" className="h-6 w-px bg-white/10 lg:hidden" />

          <div className="relative flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Breadcrumbs */}
            <div className="flex flex-1 items-center gap-1.5 text-sm">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5 min-w-0">
                  {i > 0 && (
                    <ChevronRightIcon className="size-4 text-gray-600 shrink-0" />
                  )}
                  <span
                    className={classNames(
                      i === breadcrumbs.length - 1
                        ? 'text-white font-medium'
                        : 'text-gray-500',
                      'truncate',
                    )}
                  >
                    {crumb}
                  </span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="relative flex items-center">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {user.imageUrl ? (
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                    />
                  ) : (
                    <span className="flex size-8 items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-gray-300 outline -outline-offset-1 outline-white/10">
                      {initials}
                    </span>
                  )}
                  <span className="hidden lg:flex lg:items-center">
                    <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-white">
                      {user.name}
                    </span>
                    <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-500" />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-gray-800 py-2 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          if (item.name === 'Sign out') onLogout?.()
                          if (item.name === 'Your profile') onNavigate?.('/profile')
                        }}
                        className="block px-3 py-1 text-sm/6 text-white data-focus:bg-white/5 data-focus:outline-hidden"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Main area with optional secondary sidebar */}
        <main className={showSecondary ? 'lg:pl-80' : ''}>
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">{children}</div>
        </main>
      </div>

      {/* Secondary sidebar — phase navigation */}
      {showSecondary && (
        <aside className="fixed top-16 bottom-0 left-20 hidden w-80 overflow-y-auto border-r border-white/10 bg-[#0a0a0a] px-4 py-6 sm:px-6 lg:px-8 lg:block">
          <p className="text-xs/6 font-semibold text-gray-400 uppercase tracking-wider">Hiring Thread</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{activeThread}</h3>

          <nav className="mt-6">
            <ul role="list" className="space-y-1">
              {phases.map((phase) => (
                <li key={phase.label}>
                  <button
                    disabled={phase.state === 'locked' || phase.state === 'post-mvp'}
                    title={
                      phase.state === 'locked'
                        ? 'Complete the previous phase first.'
                        : phase.state === 'post-mvp'
                          ? 'Coming soon.'
                          : undefined
                    }
                    className={classNames(
                      phase.state === 'current'
                        ? 'bg-[#ffcd05]/10 text-[#ffcd05] font-medium'
                        : phase.state === 'completed'
                          ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                          : 'text-gray-600 cursor-not-allowed',
                      'flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm/6 font-semibold',
                    )}
                  >
                    <PhaseIcon state={phase.state} />
                    {phase.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  )
}
