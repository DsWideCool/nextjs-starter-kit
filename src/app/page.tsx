import {
  ArrowRight,
  Boxes,
  FileCheck,
  Moon,
  Palette,
  Smartphone,
  Zap,
} from "lucide-react"
import Link from "next/link"

import { FeatureCard } from "@/components/home/feature-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Zap,
    title: "Next.js 15 App Router",
    description: "서버 컴포넌트와 파일 기반 라우팅으로 빠르게 시작하세요.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS v4",
    description: "유틸리티 클래스와 CSS 변수 기반 디자인 토큰을 제공합니다.",
  },
  {
    icon: Boxes,
    title: "shadcn/ui",
    description: "복사해서 소유하는 접근성 높은 UI 컴포넌트 모음입니다.",
  },
  {
    icon: FileCheck,
    title: "React Hook Form + Zod",
    description: "타입 안전한 스키마 기반 폼 유효성 검사 예제를 포함합니다.",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description: "next-themes로 라이트/다크/시스템 테마를 지원합니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 레이아웃",
    description: "모바일 슬라이드 메뉴를 포함한 반응형 헤더를 제공합니다.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* 히어로 섹션 */}
      <section className="container mx-auto flex flex-col items-center gap-6 px-4 py-20 text-center md:py-32">
        <Badge variant="secondary">Next.js 15 · React 19 · Tailwind v4</Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          모던 웹 개발을 위한
          <br />
          <span className="text-primary">스타터킷</span>
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          검증된 기술 스택과 예제 페이지로 새 프로젝트를 몇 분 만에 시작하세요.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ size: "lg" }), "px-5")}
          >
            대시보드 보기
            <ArrowRight />
          </Link>
          <Link
            href="/form"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-5")}
          >
            폼 예제 보기
          </Link>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              포함된 기능
            </h2>
            <p className="mt-2 text-muted-foreground">
              바로 사용할 수 있는 구성 요소들입니다.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
