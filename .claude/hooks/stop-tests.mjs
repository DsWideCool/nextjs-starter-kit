// Stop hook: 응답을 마치기 전에 변경된 파일과 관련된 테스트 실행
// 실패하면 exit 2로 종료를 막고 실패 내용을 Claude에게 전달
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"

import { projectDir, readInput, run, tail } from "./lib.mjs"

const input = await readInput()

// 이미 Stop hook 때문에 계속 진행 중이면 다시 막지 않음 (무한 반복 방지)
if (input.stop_hook_active) process.exit(0)

// 커밋되지 않은 변경 파일(수정 + 새 파일) 중 src 안의 ts/tsx만 대상
const changed = run("git diff --name-only HEAD").output
const untracked = run("git ls-files --others --exclude-standard").output
const files = [...new Set(`${changed}\n${untracked}`.split(/\r?\n/))]
  .map((f) => f.trim())
  .filter((f) => /^src\/.+\.(ts|tsx)$/.test(f))

if (files.length === 0) process.exit(0)

// 변경 내용이 지난번 통과했을 때와 같으면 다시 실행하지 않음 (대화만 할 때 반복 실행 방지)
const hash = createHash("sha256")
hash.update(run("git diff HEAD").output)
for (const f of files) {
  try {
    hash.update(readFileSync(path.join(projectDir, f)))
  } catch {
    // 삭제된 파일은 건너뜀
  }
}
const digest = hash.digest("hex")
const projectKey = createHash("sha256").update(projectDir).digest("hex").slice(0, 12)
const cacheFile = path.join(os.tmpdir(), `claude-stop-tests-${projectKey}.txt`)

let lastPassed = ""
try {
  lastPassed = readFileSync(cacheFile, "utf8")
} catch {
  // 캐시가 없으면 처음 실행
}
if (lastPassed === digest) process.exit(0)

const quoted = files.map((f) => `"${f}"`).join(" ")
const result = run(`npx vitest related --run --passWithNoTests ${quoted}`, 170_000)

if (result.code !== 0) {
  console.error(`[stop-tests] 변경된 파일과 관련된 테스트가 실패했습니다. 원인을 분석해 수정해주세요.\n대상: ${files.join(", ")}\n\n${tail(result.output)}`)
  process.exit(2)
}

writeFileSync(cacheFile, digest)
