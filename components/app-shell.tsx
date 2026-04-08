import { Sidebar } from '@/components/sidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 pb-14 md:pb-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
