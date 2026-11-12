// 사이트 전역 설정 및 내비게이션 메뉴 정의
export interface NavItem {
  title: string
  href: string
}

export const siteConfig = {
  name: "Starter Kit",
  description: "Next.js 15 + Tailwind CSS + shadcn/ui 기반 스타터킷",
  mainNav: [
    { title: "홈", href: "/" },
    { title: "대시보드", href: "/dashboard" },
    { title: "폼 예제", href: "/form" },
    { title: "카운터", href: "/counter" },
  ] satisfies NavItem[],
} as const
