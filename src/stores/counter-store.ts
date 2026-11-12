import { create } from "zustand"

// 카운터 상태 타입 정의
interface CounterState {
  count: number
  step: number
  history: number[]
  increment: () => void
  decrement: () => void
  reset: () => void
  setStep: (step: number) => void
}

const MAX_HISTORY = 10

// 변경 이력을 최대 개수만큼만 유지하며 추가
const pushHistory = (history: number[], value: number) =>
  [value, ...history].slice(0, MAX_HISTORY)

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  step: 1,
  history: [],
  increment: () =>
    set((state) => {
      const next = state.count + state.step
      return { count: next, history: pushHistory(state.history, next) }
    }),
  decrement: () =>
    set((state) => {
      const next = state.count - state.step
      return { count: next, history: pushHistory(state.history, next) }
    }),
  reset: () => set({ count: 0, history: [] }),
  setStep: (step) => set({ step }),
}))
