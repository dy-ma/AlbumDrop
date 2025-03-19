"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Building } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Custom Invite type here because the slug is added by join
 * Won't be properly type checked if we use the default export
 */
type Invite = {
  organizationName: string;
  organizationSlug: string;
  inviterEmail: string;
  id: string;
  email: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
  expiresAt: Date;
  organizationId: string;
  role: string;
  inviterId: string;
  teamId?: string | undefined;
}

export default function InviteCard({
  invite,
}: {
  invite: Invite
}) {

  const router = useRouter()

  async function handleAccept(invitation: Invite) {
    await authClient.organization.acceptInvitation({
      invitationId: invitation.id
    }, {
      onSuccess: () => {
        router.push(`/app/${invitation.organizationSlug}`)
      }
    })
  }

  async function handleCancel(invitation: Invite) {
    await authClient.organization.rejectInvitation({
      invitationId: invitation.id
    }, {
      onSuccess: () => {
        router.push(`/app/u`)
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>
            <div className="flex aspect-square size-20 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground mx-auto mb-6">
              <Building className="size-16" />
            </div>
            You&apos;ve been invited to join {' '}
            <span className="font-semibold">{invite.organizationName}</span>
          </CardTitle>
          <CardDescription>
            Invited by {' '}
            <span className="font-semibold">
              {invite.inviterEmail}
            </span>
          </CardDescription>
          <CardContent>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => handleCancel(invite)}
              >
                Decline
              </Button>
              <Button
                onClick={() => handleAccept(invite)}
              >
                Join {invite.organizationName}
              </Button>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )

}