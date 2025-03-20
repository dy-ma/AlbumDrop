import AccountSwitcher from "@/components/auth/account-switch";
import UserCard from "@/components/auth/user-card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

  const [session, activeSessions] =
    await Promise.all([
      auth.api.getSession({
        headers: await headers(),
      }),
      auth.api.listSessions({
        headers: await headers(),
      })
    ]).catch((e) => {
      console.log(e);
      throw redirect("/sign-in");
    });
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col gap-y-1 max-w-xl">
        <div className="flex w-full justify-between">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              Back to Dashboard
            </Link>
          </Button>
          <AccountSwitcher variant="box" />
        </div>
        <UserCard
          session={JSON.parse(JSON.stringify(session))}
          activeSessions={JSON.parse(JSON.stringify(activeSessions))}
        />
      </div>
    </div>
  )
}