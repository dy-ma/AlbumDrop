import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { User } from "better-auth"
import { SidebarMain } from "./nav-main"
import NavHeader from "./nav-header"

type SidebarProps = {
  user: User
}

export async function AppSidebar({ user }: SidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
