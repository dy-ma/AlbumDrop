"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { authClient, Organization } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DeleteOrgCard({
  org,
}: {
  org: Organization,
}) {

  const router = useRouter()

  async function handleDelete() {
    await authClient.organization.delete({
      organizationId: org.id
    }, {
      onSuccess: () => {
        router.push("/app/u")
      }
    })
  }

  return (
    <Dialog>
      <Card>
        <CardHeader>
          <CardTitle>Delete organization</CardTitle>
          <CardDescription>This is permanent.</CardDescription>
        </CardHeader>
        <CardFooter>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete organization</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This cannot be undone. Are you sure you want to delete this organization?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}