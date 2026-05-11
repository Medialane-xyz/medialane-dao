"use client"

import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"

function MobileIconTrigger() {
  return (
    <Link href="/" className="md:hidden flex items-center focus-visible:outline-none">
      <Image src="/medialane-icon.png" alt="Medialane" width={20} height={20} className="opacity-90" />
    </Link>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex items-center h-12 px-3 gap-2 bg-background/95 backdrop-blur-sm border-b border-border/40">
          <SidebarTrigger />
          <MobileIconTrigger />
        </header>
        <main className="flex-1 bg-background overflow-x-hidden">
          {children}
        </main>
        <footer className="bg-background border-t border-border/60 px-6 py-8 mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="text-xs">© {new Date().getFullYear()} Medialane DAO · </p>
            <nav className="flex items-center gap-4 flex-wrap justify-center text-xs">
              <Link href="/dao"     className="hover:text-foreground transition-colors">Governance</Link>
              <Link href="/explore" className="hover:text-foreground transition-colors">Protocol</Link>
              <Link href="/members" className="hover:text-foreground transition-colors">Token</Link>
              <Link href="/build"   className="hover:text-foreground transition-colors">Build</Link>
              <Link href="/airdrop" className="hover:text-foreground transition-colors">Airdrop</Link>
              <Link href="/docs"    className="hover:text-foreground transition-colors">Docs</Link>
              <Link href="/connect" className="hover:text-foreground transition-colors">Connect</Link>
              <a href="https://medialane.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">App ↗</a>
            </nav>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
