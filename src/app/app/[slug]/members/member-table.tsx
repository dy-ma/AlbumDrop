"use client"

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { authClient, Organization } from "@/lib/auth-client";
import { Role, RoleOptions } from "@/lib/permissions";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import InviteDialog from "./invite-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PeopleSidebar from "./people-sidebar";

/**
 * Custom definition for member format from getFullOrganization
 */
type MemberCell = {
  id: string;
  organizationId: string;
  createdAt: Date;
  role: "admin" | "member" | "owner";
  teamId?: string;
  userId: string;
  user: {
    email: string;
    name: string;
    image?: string;
  };
}

async function removeMember(member: MemberCell, orgId: string) {
  await authClient.organization.removeMember({
    memberIdOrEmail: member.id,
    organizationId: orgId
  })
}

async function changeRole(member: MemberCell, role: Role, orgId: string) {
  await authClient.organization.updateMemberRole({
    memberId: member.id,
    role: role,
    organizationId: orgId
  })
}



export default function MemberTable({
  members,
  org,
  edit
}: {
  members: MemberCell[],
  org: Organization,
  edit: boolean
}) {

  const columns: ColumnDef<MemberCell>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => row.original.user.name
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => row.original.user.email
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const member = row.original

        return (
          <Select
            disabled={member.role === "owner" || !edit}
            onValueChange={(value) => changeRole(member, value as Role, member.organizationId)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder={member.role} />
            </SelectTrigger>
            <SelectContent>
              {
                RoleOptions.map((role) => (
                  <SelectItem
                    key={role}
                    value={role}
                  >
                    {role}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const member = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                variant="destructive"
                disabled={!edit}
                onClick={() => removeMember(member, org.id)}
              >
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  return (
    <div className="">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-6">People</h1>

        <div className="flex">
          {/* Sidebar */}
          <PeopleSidebar slug={org.slug} page="members" />

          {/* Main content */}
          <div className="flex-1 border-2 rounded-lg">
            <div className="rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Members</h2>
                  <p>Invite new members, assign roles, or remove from the organization.</p>
                </div>
                <InviteDialog org={org} />
              </div>

              <DataTable columns={columns} data={members} />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}