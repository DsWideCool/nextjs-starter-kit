// PostToolUse hook: .ts/.tsx 파일 수정 직후 prettier 정리 → 타입 검사 → lint 순서로 실행
// 문제가 있으면 exit 2로 stderr 내용을 Claude에게 전달해 바로 고치게 함
import { existsSync } from "node:fs"
import path from "node:path"

import { projectDir, readInput, run, tail, toPosix } from "./lib.mjs"

const input = await readInput()
const filePath = input.tool_input?.file_path ?? input.tool_response?.filePath
if (!filePath) process.exit(0)

const relative = toPosix(path.relative(projectDir, filePath))

// 프로젝트 밖 파일, node_modules, ts/tsx가 아닌 파일은 검사하지 않음
if (relative.startsWith("..") || relative.includes("node_modules/")) process.exit(0)
if (!/\.(ts|tsx)$/.test(relative)) process.exit(0)

const problems = []

// 1단계: prettier로 코드 정리 (jq 대신 Node에서 입력 JSON을 읽어 파일 경로를 얻음)
// 로컬에 설치되어 있을 때만 실행 (npx가 매번 내려받지 않도록), .prettierignore 대상은 prettier가 알아서 건너뜀
const prettierBin = path.join(projectDir, "node_modules", ".bin", "prettier")
if (existsSync(prettierBin) || existsSync(`${prettierBin}.cmd`)) {
  const prettier = run(`npx prettier --write --log-level warn "${relative}"`)
  if (prettier.code !== 0) problems.push(`## prettier 실패 (${relative})\n${tail(prettier.output)}`)
}

// 타입 검사는 파일 단위로 할 수 없어 프로젝트 전체를 검사 (incremental로 빠르게 동작)
const tsc = run("npx tsc --noEmit")
if (tsc.code !== 0) problems.push(`## 타입 검사 실패 (tsc)\n${tail(tsc.output)}`)

const eslint = run(`npx eslint "${relative}"`)
if (eslint.code !== 0) problems.push(`## lint 실패 (${relative})\n${tail(eslint.output)}`)

if (problems.length > 0) {
  console.error(`[post-edit-check] ${relative} 수정 후 검사에서 문제가 발견되었습니다. 수정해주세요.\n\n${problems.join("\n\n")}`)
  process.exit(2)
}
