"use client"

import * as React from "react"
import {
  Banknote,
  Home,
  LifeBuoy,
  Send,
  Settings,
  Users,
  Workflow,
} from "lucide-react"

import { NavOrg } from "@/components/nav-org"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"

const data = {
  NavMain: [
    {
      name: "Home",
      url: "/dashboard",
      icon: Home
    },
    {
      name: "Integrations",
      url: "/dashboard/integrations",
      icon: Workflow
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  navOrg: [
    {
      name: "Billing",
      url: "/dashboard/billing",
      icon: Banknote,
    },
    {
      name: "Members",
      url: "/dashboard/members",
      icon: Users,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.NavMain} />
        <NavOrg items={data.navOrg} display={true} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
