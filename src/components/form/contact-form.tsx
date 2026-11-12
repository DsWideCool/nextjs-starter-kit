"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  contactCategories,
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact"

const FORM_ID = "contact-form"

// 서버 요청을 흉내 내는 지연 함수
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// React Hook Form + Zod 기반 문의 폼
export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      category: undefined,
      message: "",
      agree: false,
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    await wait(800)
    toast.success("문의가 접수되었습니다.", {
      description: `${values.name}님, ${values.email}로 답변을 보내드릴게요.`,
    })
    form.reset()
  }

  const { isSubmitting } = form.formState

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>문의하기</CardTitle>
        <CardDescription>
          모든 필드는 Zod 스키마로 검증됩니다. 빈 값으로 제출해보세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-name">이름</FieldLabel>
                  <Input
                    {...field}
                    id="contact-name"
                    placeholder="홍길동"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-email">이메일</FieldLabel>
                  <Input
                    {...field}
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-category">문의 유형</FieldLabel>
                  <Select
                    items={contactCategories}
                    value={field.value ?? null}
                    onValueChange={(value) => field.onChange(value ?? undefined)}
                  >
                    <SelectTrigger
                      id="contact-category"
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                      onBlur={field.onBlur}
                    >
                      <SelectValue placeholder="유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-message">문의 내용</FieldLabel>
                  <Textarea
                    {...field}
                    id="contact-message"
                    rows={5}
                    placeholder="문의하실 내용을 입력하세요."
                    className="resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>{field.value.length} / 500자</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="agree"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                  <Checkbox
                    id="contact-agree"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    aria-invalid={fieldState.invalid}
                  />
                  <div className="grid gap-1">
                    <FieldLabel htmlFor="contact-agree" className="font-normal">
                      개인정보 수집 및 이용에 동의합니다.
                    </FieldLabel>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => form.reset()}
          disabled={isSubmitting}
        >
          초기화
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          제출
        </Button>
      </CardFooter>
    </Card>
  )
}
