"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { siteConfig } from "@/config/site"

interface NavLinksProps {
  className?: string
  linkClassName?: string
  onNavigate?: () => void
}

// 현재 경로를 강조 표시하는 내비게이션 링크 목록 (데스크톱/모바일 공용)
export function NavLinks({ className, linkClassName, onNavigate }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav className={className}>
      {siteConfig.mainNav.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              isActive && "text-foreground",
              linkClassName
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
