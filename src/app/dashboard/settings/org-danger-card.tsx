"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useActiveOrganization, organization } from "@/lib/auth-client";
import { ActiveOrganization } from "@/lib/auth-types";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OrgDangerCard({
  activeOrganization,
}: {
  activeOrganization: ActiveOrganization | null;
}) {
  const { data: activeOrg } = useActiveOrganization();
  const org: ActiveOrganization | null =
    JSON.parse(JSON.stringify(activeOrg)) || activeOrganization;

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter()

  async function handleDelete() {
    if (!org) return;

    setLoading(true);
    await organization.delete(
      { organizationId: org.id },
      {
        onResponse: () => setLoading(false),
        onSuccess: () => {
          toast.success("Organization deleted successfully");
          setLoading(false);
          router.push("/dashboard")
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Organization</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Deleting your organization is permanent and cannot be undone.
                <br />
                Type <strong>{org?.name}</strong> to confirm.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Enter organization name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-2"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  disabled={loading || inputValue !== org?.name}
                  onClick={handleDelete}
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : "Delete"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}