import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { organization } from "@/lib/auth-client";
import { headers } from "next/headers";
import InvitationForm from "./invitation-form";
import AccountSwitcher from "@/components/auth/account-switch";

export default async function InvitationPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: invitation, error } = await organization.getInvitation({
    fetchOptions: { headers: await headers() },
    query: {
      id: id
    }
  })

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>
              Invitation Invalid
            </CardTitle>
            <CardDescription>
              {error.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <AccountSwitcher variant="box" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <InvitationForm invitation={invitation} />
  )
}