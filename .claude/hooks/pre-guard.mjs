// PreToolUse hook: 위험한 명령과 보호 대상 파일 수정을 실행 전에 차단
import path from "node:path"

import { projectDir, readInput, toPosix } from "./lib.mjs"

// 차단할 명령 패턴과 이유
const blockedCommands = [
  {
    pattern: /\bgit\s+push\b.*(\s--force(?!-with-lease)\b|\s-f\b)/,
    reason: "git push --force는 원격 이력을 덮어씁니다. 꼭 필요하면 사용자가 직접 실행해야 합니다.",
  },
  {
    pattern: /\brm\s+(-[a-z]*r[a-z]*f|-[a-z]*f[a-z]*r)\b|\brm\s+-r\s+-f\b|\brm\s+-f\s+-r\b/i,
    reason: "rm -rf는 복구할 수 없는 삭제입니다. 삭제할 대상을 구체적으로 확인한 뒤 사용자에게 요청하세요.",
  },
  {
    pattern: /Remove-Item\b(?=.*-Recurse)(?=.*-Force)/i,
    reason: "Remove-Item -Recurse -Force는 복구할 수 없는 삭제입니다. 사용자에게 먼저 확인하세요.",
  },
  {
    pattern: /\bnpm\s+audit\s+fix\b.*--force/,
    reason: "npm audit fix --force는 주요 버전을 강제로 올려 프로젝트를 깨뜨릴 수 있습니다.",
  },
]

// 수정을 막을 파일 경로 규칙
const protectedFiles = [
  {
    test: (p) => /(^|\/)\.env(\.[^/]+)?$/.test(p) && !/\.env\.example$/.test(p),
    reason: ".env 파일에는 비밀 값이 들어 있어 수정할 수 없습니다. .env.example을 수정하거나 사용자에게 요청하세요.",
  },
  {
    test: (p) => p.startsWith("src/components/ui/"),
    reason: "src/components/ui/는 shadcn이 생성한 파일입니다. 직접 수정하지 말고 감싸는 컴포넌트를 따로 만드세요.",
  },
]

function deny(reason) {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: `[pre-guard] ${reason}`,
      },
    })
  )
  process.exit(0)
}

const input = await readInput()
const toolInput = input.tool_input ?? {}

// 셸 명령 검사 (Bash, PowerShell)
if (typeof toolInput.command === "string") {
  for (const { pattern, reason } of blockedCommands) {
    if (pattern.test(toolInput.command)) deny(reason)
  }
}

// 파일 수정 검사 (Edit, Write, MultiEdit, NotebookEdit)
const filePath = toolInput.file_path ?? toolInput.notebook_path
if (typeof filePath === "string") {
  const relative = toPosix(path.relative(projectDir, path.resolve(projectDir, filePath)))
  for (const { test, reason } of protectedFiles) {
    if (test(relative)) deny(reason)
  }
}
