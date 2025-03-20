"use client"

import { authClient, useActiveOrganization } from "@/lib/auth-client"
import InviteDialog from "../invite-dialog";
import MembersSidebar from "../members-sidebar";
import { DataTable } from "@/components/ui/data-table";
import { Invitation } from "@/lib/auth-types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

async function removeInvitation(invitationId: string) {
  const { error } = await authClient.organization.cancelInvitation({
    invitationId: invitationId
  })
  if (error) {
    toast.error(error.message)
  }
}

const columns: ColumnDef<Invitation>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invite = row.original

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
              onClick={() => removeInvitation(invite.id)}
            >
              Cancel Invitation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function InvitesTable() {
  const { data: org } = useActiveOrganization()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex gap-6">
        {/* Sidebar on the left */}
        <MembersSidebar page="invites" />

        {/* Main Content Area */}
        <div className="flex-1" suppressHydrationWarning>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Invitations</h2>
              <p>Invite new members, assign roles, or remove from the organization.</p>
            </div>
            {org && <InviteDialog org={JSON.parse(JSON.stringify(org))} />}
          </div>

          {/* Members Table */}
          {org && <DataTable columns={columns} data={org?.invitations} />}
        </div>
      </div>
    </div>
  );
}