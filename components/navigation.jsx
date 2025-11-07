"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/clubs", label: "Clubs" },
    { href: "/events", label: "Upcoming Events" },
    { href: "/events", label: "Ongoing Events" },
    { href: "/guest-talks", label: "Guest Talks" },
    { href: "/news", label: "All India" },
  ]

  const isActive = (href) => pathname === href

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            College Connect
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="text-primary border-primary hover:bg-primary/10"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
