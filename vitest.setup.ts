// toBeInTheDocument 등 DOM 전용 매처 등록
import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// 각 테스트가 끝나면 렌더링한 DOM 정리
afterEach(() => {
  cleanup()
})
