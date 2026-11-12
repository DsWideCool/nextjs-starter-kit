# Next.js 스타터킷

Next.js 15 + Tailwind CSS v4 + shadcn/ui 기반의 웹 애플리케이션 스타터킷입니다.
반응형 공통 레이아웃, 다크 모드, 폼 유효성 검사, 전역 상태 관리 예제가 포함되어 있습니다.

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| 프레임워크 | [Next.js 15](https://nextjs.org) (App Router), React 19 |
| 언어 | TypeScript |
| 스타일 | [Tailwind CSS v4](https://tailwindcss.com) |
| UI 컴포넌트 | [shadcn/ui](https://ui.shadcn.com) (`base-nova` 스타일, [Base UI](https://base-ui.com) 기반) |
| 아이콘 | [lucide-react](https://lucide.dev) |
| 다크 모드 | [next-themes](https://github.com/pacocoursey/next-themes) |
| 상태 관리 | [Zustand](https://zustand.docs.pmnd.rs) |
| 폼 | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| 알림(Toast) | [Sonner](https://sonner.emilkowal.ski) |

## 시작하기

### 요구 사항

- Node.js 18.18 이상 (20 LTS 이상 권장)
- npm

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 주요 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과물로 프로덕션 서버 실행 (`build` 이후) |
| `npm run lint` | ESLint 검사 |

## 예제 페이지

| 경로 | 설명 |
| --- | --- |
| `/` | 랜딩 페이지 (히어로 + 기능 소개 카드) |
| `/dashboard` | 대시보드 (지표 카드, 최근 활동 테이블, Dialog로 프로젝트 생성) |
| `/form` | React Hook Form + Zod 문의 폼 (Input, Select, Textarea, Checkbox 검증) |
| `/counter` | Zustand 카운터 (증감 단위 선택, 컴포넌트 간 상태 공유) |

## 폴더 구조

```
.
├── public/                       # 정적 파일
├── src/
│   ├── app/                      # App Router 페이지
│   │   ├── layout.tsx            # 루트 레이아웃 (ThemeProvider, Header, Footer, Toaster)
│   │   ├── page.tsx              # 홈 (랜딩)
│   │   ├── globals.css           # Tailwind 및 테마 CSS 변수
│   │   ├── dashboard/page.tsx    # 대시보드
│   │   ├── form/page.tsx         # 폼 예제
│   │   └── counter/page.tsx      # Zustand 카운터 예제
│   ├── components/
│   │   ├── ui/                   # shadcn/ui 컴포넌트 (CLI로 추가)
│   │   ├── layout/               # Header, Footer, 내비게이션, 테마 토글, PageHeader
│   │   ├── providers/            # ThemeProvider 등 컨텍스트 Provider
│   │   ├── home/                 # 랜딩 페이지 전용 컴포넌트
│   │   ├── dashboard/            # 대시보드 전용 컴포넌트
│   │   ├── form/                 # 폼 예제 컴포넌트
│   │   └── counter/              # 카운터 예제 컴포넌트
│   ├── config/
│   │   └── site.ts               # 사이트 이름, 설명, 내비게이션 메뉴
│   ├── lib/
│   │   ├── utils.ts              # cn() 클래스 병합 유틸
│   │   └── validations/          # Zod 스키마
│   └── stores/                   # Zustand 스토어
├── components.json               # shadcn/ui 설정
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

## 커스터마이징 가이드

### 내비게이션 메뉴 추가

`src/config/site.ts`의 `mainNav` 배열에 항목을 추가하면 Header(데스크톱/모바일)와 Footer에 함께 반영됩니다.

```ts
mainNav: [
  { title: "홈", href: "/" },
  { title: "새 메뉴", href: "/new-page" },
]
```

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add tabs tooltip
```

컴포넌트는 `src/components/ui/`에 생성됩니다.

> **참고:** 이 프로젝트는 Radix UI가 아닌 **Base UI** 기반 스타일(`base-nova`)을 사용합니다.
> 다른 컴포넌트를 트리거로 감쌀 때는 `asChild` 대신 `render` prop을 사용합니다.
>
> ```tsx
> <DialogTrigger render={<Button variant="outline" />}>열기</DialogTrigger>
> ```
>
> 링크를 버튼처럼 보이게 하려면 `buttonVariants`를 사용합니다.
>
> ```tsx
> <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>이동</Link>
> ```

### 테마 색상 변경

`src/app/globals.css`의 `:root`(라이트)와 `.dark`(다크) 블록에 정의된 CSS 변수를 수정합니다.

### 폼 추가

1. `src/lib/validations/`에 Zod 스키마를 정의합니다.
2. `useForm({ resolver: zodResolver(schema) })`로 폼을 생성합니다.
3. `Controller`와 `Field`, `FieldLabel`, `FieldError` 컴포넌트로 필드를 구성합니다.

`src/components/form/contact-form.tsx`를 참고하세요.

### 전역 상태 추가

`src/stores/`에 새 스토어 파일을 만들고 `create()`로 정의합니다.
컴포넌트에서는 selector로 필요한 값만 구독하는 것을 권장합니다.

```ts
const count = useCounterStore((state) => state.count)
```
