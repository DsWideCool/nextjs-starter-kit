import type { Metadata } from "next"

import { CounterCard } from "@/components/counter/counter-card"
import { CounterHistory } from "@/components/counter/counter-history"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "카운터" }

export default function CounterPage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader
        title="Zustand 카운터"
        description="전역 상태 관리 라이브러리 Zustand 사용 예제입니다."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <CounterCard />
        <CounterHistory />
      </div>
    </div>
  )
}
