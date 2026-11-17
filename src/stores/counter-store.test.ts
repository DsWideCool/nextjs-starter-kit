import { beforeEach, describe, expect, it } from "vitest"

import { useCounterStore } from "./counter-store"

// 테스트마다 스토어를 초기 상태로 되돌림
beforeEach(() => {
  useCounterStore.setState({ count: 0, step: 1, history: [] })
})

describe("useCounterStore", () => {
  it("증가하면 step만큼 count가 늘고 이력에 기록된다", () => {
    useCounterStore.getState().setStep(5)
    useCounterStore.getState().increment()

    const { count, history } = useCounterStore.getState()
    expect(count).toBe(5)
    expect(history).toEqual([5])
  })

  it("감소하면 step만큼 count가 줄어든다", () => {
    useCounterStore.getState().decrement()

    expect(useCounterStore.getState().count).toBe(-1)
  })

  it("이력은 최신값이 앞에 오며 최대 10개까지만 유지된다", () => {
    for (let i = 0; i < 12; i++) {
      useCounterStore.getState().increment()
    }

    const { history } = useCounterStore.getState()
    expect(history).toHaveLength(10)
    expect(history[0]).toBe(12)
    expect(history[9]).toBe(3)
  })

  it("초기화하면 count와 이력이 비워지고 step은 유지된다", () => {
    useCounterStore.getState().setStep(10)
    useCounterStore.getState().increment()
    useCounterStore.getState().reset()

    const { count, step, history } = useCounterStore.getState()
    expect(count).toBe(0)
    expect(history).toEqual([])
    expect(step).toBe(10)
  })
})
