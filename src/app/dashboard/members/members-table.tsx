"use client"
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authClient, Member, useActiveOrganization } from "@/lib/auth-client";
import { Role, RoleOptions } from "@/lib/permissions";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import InviteDialog from "./invite-dialog";
import MembersSidebar from "./members-sidebar";

async function removeMember(memberId: string) {
  const { error } = await authClient.organization.removeMember({
    memberIdOrEmail: memberId,
  })

  if (error) {
    toast.error(error.message)
  }
}

async function changeRole(memberId: string, role: Role) {
  const { error } = await authClient.organization.updateMemberRole({
    memberId: memberId,
    role: role,
  })
  if (error) {
    toast.error(error.message)
  }
}

const columns: ColumnDef<(Member & {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | undefined;
  };
})>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.user.name
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.user.email
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const member = row.original

        return (
          <Select
            disabled={member.role === "owner"}
            onValueChange={(value) => changeRole(member.id, value as Role)}
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
              <DropdownMenuLabel hidden={true}>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => removeMember(member.id)}
              >
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

export default function MembersTable() {

  const { data: org } = useActiveOrganization()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex gap-6">
        {/* Sidebar on the left */}
        <MembersSidebar page="members" />

        {/* Main Content Area */}
        <div className="flex-1" suppressHydrationWarning>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Members</h2>
              <p>Invite new members, assign roles, or remove from the organization.</p>
            </div>
            {org && <InviteDialog org={JSON.parse(JSON.stringify(org))} />}
          </div>

          {/* Members Table */}
          {org && <DataTable columns={columns} data={org?.members ?? []} />}
        </div>
      </div>
    </div>
  );
}