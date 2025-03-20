"use client"

import { authClient, useSession } from "@/lib/auth-client";
import { Session } from "@/lib/auth-types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, PlusCircle, UserRoundCog } from "lucide-react";
import { Command, CommandList, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

export default function AccountSwitcher({
  initialSession,
  variant,
}: {
  initialSession?: Session,
  variant?: "avatar" | "box",
}) {
  /**
   * useSession on it's own will cause the component to client-fetch
   * User button pops in
   * This way, we pass in the initial state server rendered, but pass it to 
   * useSession for managing updates
   */
  const { data: session, isPending } = useSession()
  const currentUser = isPending ? initialSession : session

  const [open, setOpen] = useState(false)
  const router = useRouter()

  /**
   * Fetch the list of sessions using React Query instead of useEffect.
   * This keeps it clean and reactive.
   */
  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data, error } = await authClient.multiSession.listDeviceSessions();
      if (error) throw new Error("Failed to fetch sessions");
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return (
    <Popover open={open} onOpenChange={(setOpen)}>
      {variant === "avatar" || variant === undefined &&
        <PopoverTrigger asChild>
          <Avatar className="mr-2 h-8 w-8 cursor-pointer">
            <AvatarImage
              src={currentUser?.user.image || undefined}
              alt={currentUser?.user.name}
            />
            <AvatarFallback>{currentUser?.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
      }
      {variant === "box" &&
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label="w-[250px] justify-between"
          >
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage
                src={currentUser?.user.image || undefined}
                alt={currentUser?.user.name}
              />
              <AvatarFallback>{currentUser?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {currentUser?.user.name}
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      }
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="Current Account">
              <CommandItem
                onSelect={() => { }}
                className="text-sm w-full justify-between"
                key={currentUser?.user.id}
              >
                <div className="flex items-center">
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={currentUser?.user.image || undefined}
                      alt={currentUser?.user.name}
                    />
                    <AvatarFallback>
                      {currentUser?.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {currentUser?.user.name}
                </div>
              </CommandItem>
              <CommandItem
                onSelect={() => router.push('/profile')}
                className="text-sm w-full"
              >
                <UserRoundCog />
                Account Settings
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Switch Account">
              {sessions && sessions
                .filter((s) => s.user.id !== currentUser?.user.id)
                .map((u, i) => (
                  <CommandItem
                    key={i}
                    onSelect={async () => {
                      await authClient.multiSession.setActive({
                        sessionToken: u.session.token,
                      });
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={u.user.image || undefined}
                        alt={u.user.name}
                      />
                      <AvatarFallback>{u.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p>{u.user.name}</p>
                        <p className="text-xs">({u.user.email})</p>
                      </div>
                    </div>
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  router.push("/sign-in");
                  setOpen(false);
                }}
                className="cursor-pointer text-sm"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Account
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}