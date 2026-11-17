// hook 스크립트 공통 유틸
import { spawnSync } from "node:child_process"

// 프로젝트 루트 (Claude Code가 넘겨주는 환경변수 우선)
export const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd()

// stdin으로 들어오는 hook 입력 JSON 읽기
export async function readInput() {
  const chunks = []
  for await (const chunk of process.stdin) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString("utf8").trim()
  return raw ? JSON.parse(raw) : {}
}

// 명령 실행 후 종료 코드와 출력 반환 (Windows의 npx.cmd 대응을 위해 shell 사용)
export function run(command, timeoutMs = 120_000) {
  const result = spawnSync(command, {
    cwd: projectDir,
    shell: true,
    encoding: "utf8",
    timeout: timeoutMs,
  })
  return {
    code: result.status ?? 1,
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`.trim(),
  }
}

// 긴 출력은 끝부분만 남김 (Claude에게 전달되는 분량 제한)
export function tail(text, max = 3000) {
  return text.length > max ? `...(앞부분 생략)\n${text.slice(-max)}` : text
}

// 경로 구분자를 / 로 통일
export const toPosix = (p) => p.replaceAll("\\", "/")
