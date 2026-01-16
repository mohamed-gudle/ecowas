import { Skeleton } from "@/components/ui/skeleton"

export default function QueryLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-[500px] rounded-xl" />
    </div>
  )
}
