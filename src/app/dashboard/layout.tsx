import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "./header"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    redirect("/login")
  }

  const user = session.user

  return (
    <SidebarProvider>
      <div className="flex w-full h-full">
        <AppSidebar user={user} />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
