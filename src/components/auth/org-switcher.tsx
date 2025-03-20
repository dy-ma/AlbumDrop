"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Building, ChevronsUpDown, Loader2, Plus, User } from "lucide-react";
import { IconWrapper } from "../ui/icon-wrapper";
import { Organization, Session } from "@/lib/auth-types";
import { useEffect, useState } from "react";
import { authClient, organization } from "@/lib/auth-client";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function OrgSwitcher({
  session,
  orgs,
}: {
  orgs?: Organization[],
  session?: Session
}) {

  const [activeOrg, setActiveOrg] = useState(orgs?.find(org => org.id === session?.session.activeOrganizationId) || null)

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            {activeOrg
              ? (
                <>
                  <IconWrapper>
                    <Building />
                  </IconWrapper>
                  <span>{activeOrg.name}</span>
                  <ChevronsUpDown />
                </>
              )
              : (
                <>
                  <IconWrapper>
                    <User />
                  </IconWrapper>
                  <span>Personal</span>
                  <ChevronsUpDown />
                </>
              )}

          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-56">
          <DropdownMenuItem
            className={!activeOrg ? "bg-secondary" : ""}
            onClick={async () => {
              if (!activeOrg) return;
              setActiveOrg(null)
              await authClient.organization.setActive({
                organizationId: null
              })
              // Do a full refresh without cached layout to reload session cookies
              // We mainly need this to reload the orgs switcher
              if (typeof window !== undefined) {
                window.location.reload();
              }
            }}
          >
            <IconWrapper>
              <User className="text-primary-foreground dark:text-primary" />
            </IconWrapper>
            Personal
          </DropdownMenuItem>
          {orgs?.map((org) => (
            <DropdownMenuItem
              key={org.id}
              className={org.id === activeOrg?.id ? "bg-secondary" : ""}
              onClick={async () => {
                if (org.id === activeOrg?.id) return;
                // optimistic ui update
                setActiveOrg(org)
                await authClient.organization.setActive({
                  organizationId: org.id
                })
                // Do a full refresh without cached layout to reload session cookies
                // We mainly need this to reload the orgs switcher
                if (typeof window !== undefined) {
                  window.location.reload();
                }
              }}
            >
              <IconWrapper>
                <Building className="text-primary-foreground dark:text-primary" />
              </IconWrapper>
              {org.name}
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full gap-2" variant="default">
                <Plus />
                <p>New Organization</p>
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateOrganizationDialog />
    </Dialog>
  )
}

export function CreateOrganizationDialog() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  useEffect(() => {
    if (!isSlugEdited) {
      const generatedSlug = name.trim().toLowerCase().replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  }, [name, isSlugEdited]);

  useEffect(() => {
    if (open) {
      setName("");
      setSlug("");
      setIsSlugEdited(false);
    }
  }, [open]);

  return (

    <DialogContent className="sm:max-w-[425px] w-11/12">
      <DialogHeader>
        <DialogTitle>New Organization</DialogTitle>
        <DialogDescription>
          Create a new organization to collaborate with your team.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>Organization Name</Label>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Organization Slug</Label>
          <Input
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setIsSlugEdited(true);
            }}
            placeholder="Slug"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await organization.create(
                {
                  name: name,
                  slug: slug,
                },
                {
                  onResponse: () => {
                    setLoading(false);
                  },
                  onSuccess: () => {
                    toast.success("Organization created successfully");
                    setOpen(false);
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                    setLoading(false);
                  },
                },
              );
            }}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Create"
            )}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}