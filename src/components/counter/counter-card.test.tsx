import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"

import { useCounterStore } from "@/stores/counter-store"

import { CounterCard } from "./counter-card"

beforeEach(() => {
  useCounterStore.setState({ count: 0, step: 1, history: [] })
})

describe("CounterCard", () => {
  it("증가·감소·초기화 버튼으로 값이 바뀐다", async () => {
    const user = userEvent.setup()
    render(<CounterCard />)

    const output = screen.getByRole("status")
    expect(output).toHaveTextContent("0")

    await user.click(screen.getByRole("button", { name: "증가" }))
    await user.click(screen.getByRole("button", { name: "증가" }))
    expect(output).toHaveTextContent("2")

    await user.click(screen.getByRole("button", { name: "감소" }))
    expect(output).toHaveTextContent("1")

    await user.click(screen.getByRole("button", { name: "초기화" }))
    expect(output).toHaveTextContent("0")
  })

  it("증감 단위를 선택하면 해당 단위로 증가하고 선택 상태가 표시된다", async () => {
    const user = userEvent.setup()
    render(<CounterCard />)

    const stepButton = screen.getByRole("button", { name: "±5" })
    await user.click(stepButton)
    expect(stepButton).toHaveAttribute("aria-pressed", "true")

    await user.click(screen.getByRole("button", { name: "증가" }))
    expect(screen.getByRole("status")).toHaveTextContent("5")
  })
})
