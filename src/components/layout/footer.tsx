import Link from "next/link"

import { siteConfig } from "@/config/site"

// 하단 푸터
export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &
          shadcn/ui.
        </p>
        <nav className="flex flex-wrap justify-center gap-4">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
