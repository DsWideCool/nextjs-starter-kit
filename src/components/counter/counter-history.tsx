"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCounterStore } from "@/stores/counter-store"

// 같은 스토어를 다른 컴포넌트에서 구독하는 예제 (상태 공유)
export function CounterHistory() {
  const history = useCounterStore((state) => state.history)

  return (
    <Card>
      <CardHeader>
        <CardTitle>변경 이력</CardTitle>
        <CardDescription>
          별도 컴포넌트에서 같은 스토어를 구독합니다. (최근 10개)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">아직 변경 이력이 없습니다.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {history.map((value, index) => (
              <li key={`${index}-${value}`}>
                <Badge variant={index === 0 ? "default" : "outline"}>{value}</Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
