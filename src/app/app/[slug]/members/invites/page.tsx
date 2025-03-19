import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import InviteTable from "./invite-table";

export default async function InvitesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
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

  return (
    <div>
      <InviteTable org={response.data} invitations={response.data.invitations} />
    </div>
  )

}