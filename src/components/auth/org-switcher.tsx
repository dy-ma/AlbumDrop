"use client"
import { Building, ChevronsUpDown, Plus, User as UserIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { User } from "better-auth"
import { Organization } from "@/lib/auth-client"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export type TeamSwitcherProps = {
  user: User,
  org: Organization | null
}

export function TeamSwitcher({ user, org }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const { data: orgs } = authClient.useListOrganizations()

  // We can calculate just once because
  const isOrgContext = org !== null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* TODO: Implement org logo images */}
                {isOrgContext
                  ? <Building />
                  : <UserIcon />
                }
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {isOrgContext
                    ? org?.name
                    : user.name
                  }
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Personal Account
            </DropdownMenuLabel>
            <Link href="/app/u">
              <DropdownMenuItem>
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <UserIcon />
                </div>
                {user.name}
                <DropdownMenuShortcut>⌘{1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {orgs?.map((org, index) => (
              <Link href={`/app/${org.slug}`} key={org.slug}>
                <DropdownMenuItem
                  key={org.name}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {org.logo
                      ? <Image src={org.logo} width={32} height={32} alt="Organization Logo" />
                      : <Building />
                    }
                  </div>
                  {org.name}
                  <DropdownMenuShortcut>⌘{index + 2}</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="">
              <Link href="/create-org" className="flex gap-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Create Organization</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
