"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { User } from "better-auth";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BadgeCheck } from "lucide-react";
import AccountProfile from "./profile";

type Props = {
  user: User;
};

export default function AccountProfileModal({ user }: Props) {
  return (
    <Dialog>
      {/* Button to open the modal */}
      < DialogTrigger asChild >
        <DropdownMenuItem>
          <BadgeCheck />
          Account
        </DropdownMenuItem>
      </DialogTrigger >

      {/* Modal content */}
      < DialogContent
        className="max-w-lg"
      >
        <DialogHeader>
          <DialogTitle>Manage Account</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* Render the AccountProfile inside the modal */}
        <AccountProfile user={user} />

        {/* Close button at the bottom */}
        <DialogClose asChild>
          <Button variant="secondary" className="mt-4 w-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent >
    </Dialog >
  );
}