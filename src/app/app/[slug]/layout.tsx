import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "./header"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authClient, Organization } from "@/lib/auth-client"

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ slug: string }>
}) {
  // Either org slug or 'u' for personal account
  const { slug } = await params

  // Preload and store headers, since we need to use them twice
  const header = await headers()

  const { data, error } = await authClient.getSession({
    fetchOptions: {
      headers: header
    },
  })
  if (error || !data) {
    redirect("/login")
  }
  const user = data.user

  let org: Organization | null = null;

  if (slug !== 'u') {
    const { data, error } = await authClient.organization.getFullOrganization({
      fetchOptions: {
        headers: header,
      },
      query: {
        organizationSlug: slug
      }
    })

    if (!error && data) {
      org = data
    }
  }

  return (
    <SidebarProvider>
      <div className="flex w-full h-full">
        <AppSidebar user={user} org={org} />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
