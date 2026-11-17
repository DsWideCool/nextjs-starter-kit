import { describe, expect, it } from "vitest"

import { contactFormSchema, type ContactFormValues } from "./contact"

// 모든 검증을 통과하는 기본 입력값
const validInput: ContactFormValues = {
  name: "홍길동",
  email: "user@example.com",
  category: "general",
  message: "문의 내용을 열 글자 이상 적었습니다.",
  agree: true,
}

// 실패한 검증 결과에서 특정 필드의 첫 에러 메시지를 꺼냄
const getFieldError = (input: unknown, field: keyof ContactFormValues) => {
  const result = contactFormSchema.safeParse(input)
  if (result.success) return undefined
  return result.error.issues.find((issue) => issue.path[0] === field)?.message
}

describe("contactFormSchema", () => {
  it("올바른 입력은 통과한다", () => {
    expect(contactFormSchema.safeParse(validInput).success).toBe(true)
  })

  it("이름 앞뒤 공백을 제거한 뒤 길이를 검사한다", () => {
    expect(getFieldError({ ...validInput, name: "  김  " }, "name")).toBe(
      "이름은 2자 이상 입력해주세요."
    )
  })

  it("잘못된 이메일 형식은 거부한다", () => {
    expect(getFieldError({ ...validInput, email: "not-an-email" }, "email")).toBe(
      "올바른 이메일 주소를 입력해주세요."
    )
  })

  it("목록에 없는 문의 유형은 거부한다", () => {
    expect(getFieldError({ ...validInput, category: "etc" }, "category")).toBe(
      "문의 유형을 선택해주세요."
    )
  })

  it("개인정보 수집에 동의하지 않으면 거부한다", () => {
    expect(getFieldError({ ...validInput, agree: false }, "agree")).toBe(
      "개인정보 수집에 동의해주세요."
    )
  })
})
