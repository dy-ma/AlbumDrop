import AccountProfile from "@/components/auth/profile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    redirect("/login")
  }

  const user = session.user

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <AccountProfile user={user} />
    </div>
  )
}