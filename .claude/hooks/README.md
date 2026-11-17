# Claude Code hook 안내

이 폴더의 스크립트는 `.claude/settings.json`에 등록되어 Claude Code가 작업할 때 자동으로 실행됩니다.
`/hooks` 메뉴의 이벤트 설명은 Claude Code가 영어로 표시하는 부분이라 바꿀 수 없어서, 이 문서에 한국어로 정리했습니다.

## 한눈에 보기

| 이벤트 (`/hooks` 메뉴 표시) | 스크립트 | 실행 시점 | 하는 일 |
|---|---|---|---|
| `PreToolUse` | `pre-guard.mjs` | 명령 실행·파일 수정 **직전** | 위험한 명령과 보호 파일 수정을 차단 |
| `PostToolUse` | `post-edit-check.mjs` | `.ts`/`.tsx` 파일 수정 **직후** | prettier 정리 → 타입 검사 → lint, 문제가 있으면 Claude에게 수정 요청 |
| `Stop` | `stop-tests.mjs` | Claude가 응답을 **마치기 직전** | 변경 파일과 관련된 테스트 실행, 실패하면 종료를 막음 |

`/hooks` 메뉴에 보이는 이벤트 이름의 뜻:

- **PreToolUse**: 도구 사용 전. 여기서 차단하면 명령이 실행되지 않습니다.
- **PostToolUse**: 도구 사용 후. 이미 실행된 결과를 검사합니다.
- **Stop**: 응답 종료 시. 여기서 막으면 Claude가 작업을 계속합니다.
- **All events**: 목록 끝에 있는 항목입니다. hook이 없는 이벤트까지 모두 보여줍니다.

## 1. pre-guard: 위험 명령·보호 파일 차단

| 차단 대상 | 이유 |
|---|---|
| `git push --force`, `git push -f` | 원격 이력을 덮어씀 (`--force-with-lease`는 허용) |
| `rm -rf`, `rm -fr` | 복구할 수 없는 삭제 |
| `Remove-Item -Recurse -Force` | PowerShell의 복구할 수 없는 삭제 |
| `npm audit fix --force` | 주요 버전을 강제로 올려 프로젝트가 깨질 수 있음 |
| `.env`, `.env.local` 등 수정 | 비밀 값 보호 (`.env.example`은 허용) |
| `src/components/ui/` 수정 | shadcn이 생성한 파일이라 직접 수정하면 업데이트할 때 충돌함 |

- 명령 안에 해당 문구가 들어 있기만 해도 차단합니다. 예를 들어 `echo "rm -rf"`도 막힙니다.
- 스크립트가 오류로 멈춰도 안전하게 차단되도록 `onFailure: "block"`으로 설정했습니다.

## 2. post-edit-check: 수정 후 prettier 정리·타입 검사·lint

- 먼저 `npx prettier --write <수정한 파일>`로 코드를 정리합니다.
  - 설정: 루트의 `.prettierrc.json`(세미콜론 없음, 큰따옴표), 제외 대상: `.prettierignore`
  - prettier가 `node_modules`에 설치되어 있지 않으면 이 단계는 건너뜁니다(`npm install -D prettier`로 설치).
  - 흔히 쓰는 `jq -r '.tool_input.file_path' | ...` 셸 명령 대신 Node에서 입력 JSON을 읽습니다. Windows에는 jq가 기본 설치되어 있지 않기 때문입니다.
  - 같은 이벤트에 hook을 따로 추가하면 동시에 실행되어 정리 전 파일을 검사할 수 있습니다. 그래서 한 스크립트 안에서 순서대로 실행합니다.
- 그다음 `npx tsc --noEmit`으로 프로젝트 전체를 검사하고, `npx eslint <수정한 파일>`을 실행합니다.
- 문제가 있으면 오류 내용을 Claude에게 전달해서 바로 고치게 합니다.
- `node_modules`, 프로젝트 밖 파일, `.ts`/`.tsx`가 아닌 파일은 검사하지 않습니다.

## 3. stop-tests: 종료 전 관련 테스트

- 커밋되지 않은 `src/` 안의 `.ts`/`.tsx` 변경 파일을 찾아 `vitest related --run`으로 관련 테스트만 실행합니다.
- 실패하면 종료를 막고, 실패 내용을 Claude에게 전달해 고치게 합니다.
- 반복 방지 장치:
  - 이미 한 번 막혀서 작업을 계속하는 중이면 다시 막지 않습니다(`stop_hook_active`).
  - 지난번 테스트를 통과했을 때와 변경 내용이 같으면 다시 실행하지 않습니다. 캐시는 OS 임시 폴더에 저장됩니다.

## 끄거나 수정하려면

- 특정 hook만 끄기: `.claude/settings.json`에서 해당 항목을 지웁니다.
- 모든 hook 끄기: 설정에 `"disableAllHooks": true`를 추가합니다.
- 차단 규칙 바꾸기: `pre-guard.mjs`의 `blockedCommands`, `protectedFiles` 배열을 수정합니다.
- 공통 함수(입력 읽기, 명령 실행)는 `lib.mjs`에 있습니다.
