"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import {
  LayoutDashboard, Vote, Layers, Coins, BookOpen,
  MessageSquare, Sun, Moon, ArrowUpRight, FileText,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { MedialaneLogo } from "@/components/brand/medialane-logo"
import { MedialaneIcon } from "@/components/brand/medialane-icon"

// ── Nav data ─────────────────────────────────────────────────────────────────

const DOCS_SUB = [
  { href: "/docs/Governance-Charter",           label: "Governance Charter",      icon: FileText },
  { href: "/docs/Constitution-of-Medialane-DAO", label: "Constitution",            icon: FileText },
  { href: "/docs/Compliance-Guidelines",         label: "Compliance Guidelines",   icon: FileText },
  { href: "/docs/Community-Guidelines",          label: "Community Guidelines",    icon: FileText },
  { href: "/docs/Terms-of-Use",                  label: "Terms of Use",            icon: FileText },
  { href: "/docs/Privacy-Policy",                label: "Privacy Policy",          icon: FileText },
]

const TOP_NAV = [
  { href: "/",        label: "Overview",   icon: LayoutDashboard },
  { href: "/dao",     label: "Governance", icon: Vote            },
  { href: "/explore", label: "Protocol",   icon: Layers          },
  { href: "/members", label: "Token",      icon: Coins           },
  { href: "/connect", label: "Connect",    icon: MessageSquare   },
]

// ── Theme toggle ──────────────────────────────────────────────────────────────

function ThemeToggleItem() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        tooltip={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
        <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

// ── Docs collapsible ──────────────────────────────────────────────────────────

function DocsNavItem({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(pathname?.startsWith("/docs"))
  const { state, isMobile, setOpen: setSidebarOpen } = useSidebar()
  const collapsed = !isMobile && state === "collapsed"

  const isAnyActive = DOCS_SUB.some((s) => pathname === s.href)

  if (collapsed) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip="Docs"
          isActive={isAnyActive || pathname?.startsWith("/docs")}
          onClick={() => { setSidebarOpen(true); setOpen(true) }}
        >
          <BookOpen />
          <span>Docs</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip="Docs"
            isActive={(isAnyActive || pathname?.startsWith("/docs")) && !open}
          >
            <BookOpen />
            <span>Docs</span>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {DOCS_SUB.map(({ href, label, icon: Icon }) => (
              <SidebarMenuSubItem key={href}>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === href}
                  onClick={onClose}
                >
                  <Link href={href}>
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpen, setOpenMobile, isMobile, state } = useSidebar()

  const closeSidebar = () => {
    if (isMobile) setOpenMobile(false)
    else setOpen(false)
  }

  return (
    <Sidebar collapsible="icon">

      {/* Brand */}
      <SidebarMenu className="p-2">
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild onClick={closeSidebar}>
            {isMobile || state === "expanded"
              ? <MedialaneLogo />
              : <MedialaneIcon size={28} />
            }
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarContent>

        {/* Main nav */}
        <SidebarGroup>
          <SidebarMenu>
            {TOP_NAV.map(({ href, label, icon: Icon }) => {
              const isActive = href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(href + "/")
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={label}
                    onClick={closeSidebar}
                  >
                    <Link href={href}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
            <DocsNavItem onClose={closeSidebar} />
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Utilities */}
        <SidebarGroup>
          <SidebarMenu>
            <ThemeToggleItem />
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      {/* Footer: Open App link */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Open medialane.io app"
            >
              <a
                href="https://medialane.io"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2",
                  !isMobile && state === "collapsed" ? "justify-center" : ""
                )}
              >
                <ArrowUpRight className="size-4 shrink-0" />
                <span>Open App</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}
