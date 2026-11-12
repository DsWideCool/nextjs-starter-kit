import { Layers } from "lucide-react"
import Link from "next/link"

import { MobileNav } from "@/components/layout/mobile-nav"
import { NavLinks } from "@/components/layout/nav-links"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { siteConfig } from "@/config/site"

// 상단 고정 헤더: 로고, 데스크톱 내비게이션, 모바일 메뉴, 테마 토글
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center gap-2 px-4">
        <MobileNav />
        <Link href="/" className="mr-4 flex items-center gap-2 font-semibold">
          <Layers className="size-5" />
          <span>{siteConfig.name}</span>
        </Link>
        <NavLinks className="hidden items-center gap-6 md:flex" />
        <div className="ml-auto flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
