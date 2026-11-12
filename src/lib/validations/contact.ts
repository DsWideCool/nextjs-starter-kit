import { z } from "zod"

// 문의 폼 카테고리 목록 (Select 옵션으로 사용)
export const contactCategories = [
  { label: "일반 문의", value: "general" },
  { label: "기술 지원", value: "support" },
  { label: "제휴 제안", value: "partnership" },
] as const

const categoryValues = contactCategories.map((c) => c.value) as [
  (typeof contactCategories)[number]["value"],
  ...(typeof contactCategories)[number]["value"][],
]

// 문의 폼 유효성 검사 스키마
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "이름은 2자 이상 입력해주세요.")
    .max(30, "이름은 30자 이하로 입력해주세요."),
  email: z.email("올바른 이메일 주소를 입력해주세요."),
  category: z.enum(categoryValues, "문의 유형을 선택해주세요."),
  message: z
    .string()
    .trim()
    .min(10, "문의 내용은 10자 이상 입력해주세요.")
    .max(500, "문의 내용은 500자 이하로 입력해주세요."),
  agree: z.boolean().refine((value) => value, "개인정보 수집에 동의해주세요."),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
