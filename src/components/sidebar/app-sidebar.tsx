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
import { TeamSwitcher } from "../auth/org-switcher"
import { Organization } from "@/lib/auth-client"

type SidebarProps = {
  user: User,
  org: Organization | null
}

export async function AppSidebar({ user, org }: SidebarProps) {
  const route_slug = org ? org.slug : 'u'

  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher user={user} org={org} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain slug={route_slug} orgContext={org !== null} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
