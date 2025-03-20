import { SidebarTrigger } from "@/components/ui/sidebar"
import { Organization, Session } from "@/lib/auth-types"
import AccountSwitcher from "@/components/auth/account-switch"
import OrgSwitcher from "@/components/auth/org-switcher"
import Link from "next/link"
import { GalleryVerticalEnd } from "lucide-react"

function DiagonalSeparator() {
  return (
    <span
      className="text-muted-foreground"
    >
      /
    </span>
  )
}

export function SiteHeader({
  session,
  orgs
}: {
  session?: Session,
  orgs?: Organization[]
}) {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2">
        <SidebarTrigger className="ml-2 md:hidden" />
        <div className="p-4 hidden md:block">
          <Link href="/" className="flex gap-1 items-center">
            <GalleryVerticalEnd className="size-6" />
            <h1 className="font-bold text-end">AlbumDrop</h1>
          </Link>
        </div>
        <DiagonalSeparator />
        <OrgSwitcher session={session} orgs={orgs} />
        <div className="ml-auto">
          <AccountSwitcher initialSession={session} />
        </div>
      </div>
    </header>
  )
}
