"use client"

import { Banknote, Home, Image as ImageIcon, Settings, Users, Workflow } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export type SidebarMainProps = {
  slug: string,
  orgContext: boolean,
}

export function SidebarMain({ slug, orgContext }: SidebarMainProps) {
  const pathname = usePathname()

  const data = {
    navMain: [
      {
        title: 'Application',
        display: true,
        items: [
          {
            title: 'Home',
            url: `/app/${slug}`,
            active: pathname == `/app/${slug}`,
            icon: Home
          },
          {
            title: "Albums",
            url: `/app/${slug}/albums`,
            active: pathname == `/app/${slug}/albums`,
            icon: ImageIcon,
          },
          {
            title: "Integrations",
            url: `/app/${slug}/integrations`,
            active: pathname == `/app/${slug}/integrations`,
            icon: Workflow,
          },

        ]
      },
      {
        title: 'Organization',
        display: orgContext === true,
        items: [
          {
            title: "People",
            url: `/app/${slug}/members`,
            active: pathname.startsWith(`/app/${slug}/members`),
            icon: Users,
          },
          {
            title: "Billing",
            url: `/app/${slug}/billing`,
            active: pathname.startsWith(`/app/${slug}/billing`),
            icon: Banknote,
          },
          {
            title: "Settings",
            url: `/app/${slug}/settings`,
            active: pathname.startsWith(`/app/${slug}/settings`),
            icon: Settings,
          }
        ]
      },
      {
        title: 'Account',
        display: orgContext === false,
        items: [
          {
            title: "Billing",
            url: `/app/${slug}/billing`,
            active: pathname.startsWith(`/app/${slug}/billing`),
            icon: Banknote,
          },
          {
            title: "Settings",
            url: `/app/${slug}/settings`,
            active: pathname.startsWith(`/app/${slug}/settings`),
            icon: Settings,
          }
        ]
      }
    ]
  }

  return (
    <>
      {data.navMain.map((item) => (
        <SidebarGroup key={item.title} className={item.display ? "" : "hidden"}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.active}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}