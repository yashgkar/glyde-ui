"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Code, Layers, AlertTriangle, Server } from "lucide-react"

const navItems = [
  { href: "/docs", label: "Getting Started", icon: BookOpen },
  { href: "/docs/api", label: "API Reference", icon: Code },
  { href: "/docs/interceptors", label: "Interceptors", icon: Layers },
  { href: "/docs/errors", label: "Error Handling", icon: AlertTriangle },
  { href: "/docs/nextjs", label: "Next.js Usage", icon: Server },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <nav className="glass rounded-2xl p-4 sticky top-24">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
