"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { organization } from "@/lib/auth-client";
import { toast } from "sonner";
import { IconWrapper } from "@/components/ui/icon-wrapper";

export default function InvitationForm({
  invitation
}: {
  invitation: {
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
}) {
  const router = useRouter();
  const [invitationStatus, setInvitationStatus] = useState<
    "pending" | "accepted" | "rejected"
  >("pending");

  const handleAccept = async () => {
    await organization.acceptInvitation({
      invitationId: invitation.id,
    }, {
      onSuccess: () => {
        setInvitationStatus("accepted")
        router.push('/dashboard')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message)
      }
    })
  };

  const handleReject = async () => {
    await organization.rejectInvitation({
      invitationId: invitation.id,
    }, {
      onError: (ctx) => {
        toast.error(ctx.error.message)
      },
      onSuccess: () => setInvitationStatus("rejected")
    })
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-end gap-2">
          <IconWrapper>
            <Building2 className="size-10" />
          </IconWrapper>
          <div>
            <CardTitle>
              Organization Invitation
            </CardTitle>
            <CardDescription>
              You&apos;ve been invited to join an organization
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {invitationStatus === "pending" && (
            <div className="space-y-4">
              <p>
                <strong>{invitation.inviterEmail}</strong> has invited you to
                join <strong>{invitation?.organizationName}</strong>.
              </p>
              <p>
                This invitation was sent to{" "}
                <strong>{invitation?.email}</strong>.
              </p>
            </div>
          )}
          {invitationStatus === "accepted" && (
            <div className="space-y-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                <CheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-center">
                Welcome to {invitation?.organizationName}!
              </h2>
              <p className="text-center">
                You&apos;ve successfully joined the organization. We&apos;re excited to
                have you on board!
              </p>
            </div>
          )}
          {invitationStatus === "rejected" && (
            <div className="space-y-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full">
                <XIcon className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-center">
                Invitation Declined
              </h2>
              <p className="text-center">
                You&lsquo;ve declined the invitation to join{" "}
                {invitation?.organizationName}.
              </p>
            </div>
          )}
        </CardContent>
        {invitationStatus === "pending" && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReject}>
              Decline
            </Button>
            <Button onClick={handleAccept}>Accept Invitation</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
