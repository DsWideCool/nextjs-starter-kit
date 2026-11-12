"use client"

import { Minus, Plus, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCounterStore } from "@/stores/counter-store"

const STEP_OPTIONS = [1, 5, 10] as const

// Zustand 스토어를 사용하는 카운터 카드
export function CounterCard() {
  // 필요한 상태만 개별 구독하여 불필요한 리렌더링 방지
  const count = useCounterStore((state) => state.count)
  const step = useCounterStore((state) => state.step)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)
  const setStep = useCounterStore((state) => state.setStep)

  return (
    <Card>
      <CardHeader>
        <CardTitle>카운터</CardTitle>
        <CardDescription>증감 단위를 선택하고 값을 변경해보세요.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <output
          aria-live="polite"
          className="text-6xl font-bold tabular-nums sm:text-7xl"
        >
          {count}
        </output>
        <div className="flex items-center gap-2" role="group" aria-label="증감 단위">
          {STEP_OPTIONS.map((option) => (
            <Button
              key={option}
              size="sm"
              variant={step === option ? "default" : "outline"}
              onClick={() => setStep(option)}
              aria-pressed={step === option}
            >
              ±{option}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="lg" onClick={decrement} aria-label="감소">
          <Minus />
        </Button>
        <Button variant="secondary" size="lg" onClick={reset} aria-label="초기화">
          <RotateCcw />
        </Button>
        <Button size="lg" onClick={increment} aria-label="증가">
          <Plus />
        </Button>
      </CardFooter>
    </Card>
  )
}
