// Suspense boundaries must be in Server Components for static prerendering
import type { ReactNode } from "react"
import { Suspense } from "react"
import DealroomLayoutContent from "./layout-content"

export default function DealroomLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <DealroomLayoutContent>{children}</DealroomLayoutContent>
    </Suspense>
  )
}
