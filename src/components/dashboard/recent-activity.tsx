import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ActivityStatus = "완료" | "진행 중" | "대기"

interface Activity {
  id: number
  project: string
  owner: string
  status: ActivityStatus
  updatedAt: string
}

// 예제용 더미 데이터
const activities: Activity[] = [
  { id: 1, project: "랜딩 페이지 개편", owner: "김민수", status: "완료", updatedAt: "2026-11-10" },
  { id: 2, project: "결제 모듈 연동", owner: "이지은", status: "진행 중", updatedAt: "2026-11-09" },
  { id: 3, project: "관리자 대시보드", owner: "박서준", status: "진행 중", updatedAt: "2026-11-08" },
  { id: 4, project: "모바일 앱 API", owner: "최유나", status: "대기", updatedAt: "2026-11-05" },
]

const statusVariant: Record<ActivityStatus, "default" | "secondary" | "outline"> = {
  완료: "default",
  "진행 중": "secondary",
  대기: "outline",
}

// 최근 활동 목록 (작은 화면에서는 가로 스크롤)
export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 활동</CardTitle>
        <CardDescription>최근 업데이트된 프로젝트 목록입니다.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-3 font-medium">프로젝트</th>
              <th className="pb-3 font-medium">담당자</th>
              <th className="pb-3 font-medium">상태</th>
              <th className="pb-3 text-right font-medium">수정일</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-b last:border-0">
                <td className="py-3 font-medium">{activity.project}</td>
                <td className="py-3 text-muted-foreground">{activity.owner}</td>
                <td className="py-3">
                  <Badge variant={statusVariant[activity.status]}>
                    {activity.status}
                  </Badge>
                </td>
                <td className="py-3 text-right text-muted-foreground">
                  {activity.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
