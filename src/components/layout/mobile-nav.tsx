"use client"

import { Menu } from "lucide-react"
import { useState } from "react"

import { NavLinks } from "@/components/layout/nav-links"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"

// 모바일 화면에서 사용하는 슬라이드 메뉴
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="메뉴 열기"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{siteConfig.name}</SheetTitle>
          <SheetDescription>{siteConfig.description}</SheetDescription>
        </SheetHeader>
        <NavLinks
          className="flex flex-col gap-1 px-4"
          linkClassName="rounded-md px-3 py-2 text-base hover:bg-muted aria-[current=page]:bg-muted"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
