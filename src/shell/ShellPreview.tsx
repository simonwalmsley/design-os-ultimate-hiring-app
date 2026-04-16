import AppShell from './components/AppShell'
import { defaultNavItems } from './components/MainNav'

export default function ShellPreview() {
  const user = {
    name: 'Alex Morgan',
    email: 'alex@acmeplumbing.com.au',
  }

  return (
    <AppShell
      navigationItems={defaultNavItems}
      breadcrumbs={['Hiring Threads', 'Senior Plumber', 'Advertise for Role']}
      activeThread="Senior Plumber"
      user={user}
      isDark={true}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
      onToggleTheme={() => console.log('Toggle theme')}
    >
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-semibold text-neutral-100 mb-2">
          Advertise for Role
        </h1>
        <p className="text-sm text-neutral-500 mb-8">
          Phase 2 of 4 — Generate a psychology-driven job ad from your Phase 1 data.
        </p>

        {/* Sample chat messages */}
        <div className="flex flex-col gap-4">
          <div className="bg-neutral-900 rounded-lg p-4 max-w-lg">
            <p className="text-sm text-neutral-300">
              Great, I have everything I need from Phase 1. Let me ask a few logistics
              questions before drafting your job ad. Where is this role based?
            </p>
          </div>

          <div className="ml-auto bg-yellow-400/10 border-l-2 border-yellow-400 rounded-lg p-4 max-w-lg">
            <p className="text-sm text-neutral-200">
              Brisbane southside, we cover Logan to Redlands.
            </p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-4 max-w-lg">
            <p className="text-sm text-neutral-300">
              Got it — Brisbane southside, Logan to Redlands. Is this a full-time role, or
              are you looking for part-time or casual?
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="mt-8 flex gap-2">
          <input
            type="text"
            placeholder="Type your reply..."
            className="flex-1 bg-neutral-900 border border-neutral-700 rounded-md px-4 py-2.5 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
          <button className="bg-yellow-400 text-neutral-950 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-yellow-300 transition-colors">
            Send
          </button>
        </div>
      </div>
    </AppShell>
  )
}
