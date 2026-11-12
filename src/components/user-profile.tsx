import { cn } from "@/lib/utils"

interface UserProfileProps {
  className?: string
  children?: React.ReactNode
}

// UserProfile 컴포넌트
export function UserProfile({ className, children }: UserProfileProps) {
  return (
    <div className={cn("flex flex-col gap-4 p-4 md:p-6", className)}>
      {children}
    </div>
  )
}
