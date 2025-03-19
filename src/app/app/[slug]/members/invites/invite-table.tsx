"use client"

import { DataTable } from "@/components/ui/data-table";
import { Invitation, Organization } from "@/lib/auth-client";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";
import PeopleSidebar from "../people-sidebar";

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
    accessorKey: "cancel",
    header: "Cancel",
    cell: () => (<X />)
  }
]

export default function InviteTable({
  org,
  invitations
}: {
  org: Organization,
  invitations: Invitation[]
}) {
  return (
    <div className="">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-6">People</h1>

        <div className="flex">
          {/* Sidebar */}
          <PeopleSidebar slug={org.slug} page="invites" />

          {/* Main content */}
          <div className="flex-1 border-2 rounded-lg">
            <div className="rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Members</h2>
                  <p className="">Invite new members, assign roles, or remove from the organization.</p>
                </div>
              </div>

              <DataTable columns={columns} data={invitations} />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}