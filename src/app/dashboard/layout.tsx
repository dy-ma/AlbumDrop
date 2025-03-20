import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  /**
   * We can get the active org from the session and organization list
   * getFullOrganization is much slower
   */
  const [session, organizations] = await Promise.all([
    auth.api.getSession({
      headers: await headers()
    }),
    auth.api.listOrganizations({
      headers: await headers()
    }),
  ]).catch((e) => {
    console.error(e)
    throw redirect("/sign-in")
  })

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader
          session={JSON.parse(JSON.stringify(session))}
          orgs={JSON.parse(JSON.stringify(organizations))}
        />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}