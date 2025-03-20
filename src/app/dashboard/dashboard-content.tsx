import { Skeleton } from "@/components/ui/skeleton"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function DashboardContent() {
  const org = await auth.api.getFullOrganization({
    headers: await headers()
  })

  return (
    <p className="font-semibold text-3xl">
      {org ? `${org.name} Projects` : "Personal Projects"}
    </p>
  )
}

export async function DashboardContentFallback() {
  return (
    <Skeleton className="w-32 h-9" />
  )
}