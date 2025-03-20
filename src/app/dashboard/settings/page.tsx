import { OrganizationCard } from "@/components/auth/organization-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import OrgDangerCard from "./org-danger-card";

export default async function OrgPage() {

  const [session, organization] =
    await Promise.all([
      auth.api.getSession({
        headers: await headers(),
      }),
      auth.api.getFullOrganization({
        headers: await headers(),
      }),
    ]).catch((e) => {
      console.log(e);
      throw redirect("/dashboard");
    });
  return (
    <div className="flex flex-col p-4 gap-4">
      <OrganizationCard
        session={session}
        activeOrganization={organization}
      />
      <OrgDangerCard activeOrganization={organization} />
    </div>
  )
}