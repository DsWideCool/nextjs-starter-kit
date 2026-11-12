import type { Metadata } from "next"

import { ContactForm } from "@/components/form/contact-form"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "폼 예제" }

export default function FormPage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <PageHeader
        title="폼 예제"
        description="React Hook Form과 Zod를 사용한 유효성 검사 예제입니다."
      />
      <ContactForm />
    </div>
  )
}
