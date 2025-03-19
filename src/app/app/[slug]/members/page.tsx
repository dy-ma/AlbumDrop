import { notFound } from "next/navigation"
import MemberTable from "./member-table"
import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers"



export default async function MembersPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const response = await authClient.organization.getFullOrganization({
    fetchOptions: {
      headers: await headers()
    },
    query: {
      organizationSlug: slug
    }
  })

  if (!response || !response.data) {
    notFound()
  }

  const perm_response = await authClient.organization.hasPermission({
    organizationId: response.data.id,
    fetchOptions: {
      headers: await headers()
    },
    permission: {
      member: ["update"]
    },
  })

  const canEditUsers = perm_response.data?.success ?? false

  return (
    <div>
      <MemberTable
        members={response.data.members}
        org={response.data}
        edit={canEditUsers}
      />
    </div>
  )
}