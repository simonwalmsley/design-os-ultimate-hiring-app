import AppShell from './components/AppShell'

export default function ShellPreview() {
  return (
    <AppShell
      breadcrumbs={['Hiring Threads', 'Senior Plumber', 'Advertise for Role']}
      activeNav="Hiring Threads"
      activeThread="Senior Plumber"
      user={{ name: 'James Ryan', email: 'james.ryan@pattersonplumbing.com.au' }}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      {/* Sample chat content */}
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Advertise for Role
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Phase 2 of 4 — Generate a psychology-driven job ad from your Phase 1 data.
        </p>

        <div className="flex flex-col gap-4">
          <div className="bg-white/5 rounded-lg p-4 max-w-lg">
            <p className="text-sm text-gray-300">
              Great, I have everything I need from Phase 1. Let me ask a few logistics
              questions before drafting your job ad. Where is this role based?
            </p>
          </div>

          <div className="ml-auto bg-[#ffcd05]/10 border-l-2 border-[#ffcd05] rounded-lg p-4 max-w-lg">
            <p className="text-sm text-gray-200">
              Brisbane southside, we cover Logan to Redlands.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 max-w-lg">
            <p className="text-sm text-gray-300">
              Got it — Brisbane southside, Logan to Redlands. Is this a full-time role, or
              are you looking for part-time or casual?
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          <input
            type="text"
            placeholder="Type your reply..."
            className="flex-1 rounded-md bg-white/5 px-4 py-2.5 text-sm text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffcd05]"
          />
          <button className="bg-[#ffcd05] text-[#0a0a0a] px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-[#e6b800]">
            Send
          </button>
        </div>
      </div>
    </AppShell>
  )
}
