import { Activity, CreditCard, DollarSign, Users } from "lucide-react"
import type { Metadata } from "next"

import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StatCard } from "@/components/dashboard/stat-card"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "대시보드" }

// 예제용 지표 데이터
const stats = [
  { title: "총 매출", value: "₩45,231,000", change: "+20.1%", trend: "up", icon: DollarSign },
  { title: "신규 가입자", value: "2,350", change: "+18.0%", trend: "up", icon: Users },
  { title: "결제 건수", value: "12,234", change: "+19.0%", trend: "up", icon: CreditCard },
  { title: "활성 사용자", value: "573", change: "-4.2%", trend: "down", icon: Activity },
] as const

export default function DashboardPage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader title="대시보드" description="서비스 현황을 한눈에 확인하세요.">
        <CreateProjectDialog />
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <RecentActivity />
    </div>
  )
}
