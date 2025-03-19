import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import Link from "next/link";
import InviteCard from "./invite-card";

export default async function AcceptInvitePage({
  params,
}: {
  params: Promise<{ inviteId: string }>
}) {
  const { inviteId } = await params;

  const { data: invite, error } = await authClient.organization.getInvitation({
    fetchOptions: {
      headers: await headers()
    },
    query: {
      id: inviteId
    }
  })

  if (error) {
    const callbackURL = `${process.env.NEXT_PUBLIC_BASE_URL}/accept-invitation/${inviteId}`
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
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/signup?callbackURL=${callbackURL}`}>Create an Account</Link>
              </Button>
              <Button asChild>
                <Link href={`/login?callbackURL=${callbackURL}`}>Log In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <InviteCard invite={invite} />
  )
}