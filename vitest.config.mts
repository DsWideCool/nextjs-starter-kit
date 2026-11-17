import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

// Vitest 설정 (React 플러그인 없이 내장 변환기로 JSX 처리)
export default defineConfig({
  resolve: {
    // tsconfig의 "@/*" 경로 별칭과 동일하게 맞춤
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  oxc: {
    // React 17+ 자동 JSX 런타임 사용 (import React 불필요)
    jsx: { runtime: "automatic" },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: false,
  },
})
