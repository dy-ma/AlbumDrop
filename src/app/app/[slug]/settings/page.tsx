import { authClient, Organization } from "@/lib/auth-client"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import UserSettingsPage from "./user-settings"
import OrgSettingsPage from "./org-settings"

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Either org slug or 'u' for personal account
  const { slug } = await params

  // Preload and store headers, since we need to use them twice
  const header = await headers()

  const { data, error } = await authClient.getSession({
    fetchOptions: {
      headers: header
    },
  })
  if (error) {
    redirect("/login")
  }
  const user = data.user

  let org: Organization | null = null;

  if (slug !== 'u') {
    const { data } = await authClient.organization.getFullOrganization({
      fetchOptions: {
        headers: header,
      },
      query: {
        organizationSlug: slug
      }
    })

    org = data
  }

  const deleteResponse = await authClient.organization.hasPermission({
    fetchOptions: {
      headers: header,
    },
    permission: {
      organization: ["delete"]
    },
    organizationId: org?.id
  })

  const canDelete = deleteResponse.data?.success ?? false

  const canUpdate = await authClient.organization.hasPermission({
    fetchOptions: {
      headers: header,
    },
    permission: {
      organization: ["update"]
    },
    organizationId: org?.id
  }).then(({ data }) => data?.success ?? false)

  if (!org) {
    return <UserSettingsPage user={user} />
  }
  return (
    <OrgSettingsPage
      user={user}
      org={org}
      canUpdate={canUpdate}
      canDelete={canDelete}
    />)
}