import { Organization } from "@/lib/auth-client"
import { User } from "better-auth"
import OrgGeneralInfo from "./org-components/general-info"
import DeleteOrgCard from "./org-components/delete-org"

type OrgSettingsProps = {
  user: User,
  org: Organization,
  canUpdate: boolean,
  canDelete: boolean
}

export default function OrgSettingsPage({ org, canUpdate, canDelete }: OrgSettingsProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col gap-y-6 w-full max-w-3xl p-10">
        <h1 className="text-3xl font-semibold">Organization Settings</h1>
        <OrgGeneralInfo org={org} canUpdate={canUpdate} />
        {canDelete && <DeleteOrgCard org={org} />}
      </div>
    </div>
  )
}