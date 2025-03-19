import Link from "next/link"

function PeopleSidebarItem({
  route,
  label,
  active
}: {
  route: string,
  label: string,
  active: boolean
}) {

  return (
    <Link href={route} className={`block pl-4 py-2 ${active && "border-l-2 -ml-px font-bold"}`}>
      {label}
    </Link>
  )
}

export default function PeopleSidebar({
  slug,
  page
}: {
  slug: string,
  page: "members" | "invites" | "collaborators"
}) {

  return (
    <div className="w-48 mr-6">
      <nav className="space-y-1 border-l">
        <PeopleSidebarItem route={`/app/${slug}/members`} label="Members" active={page == "members"} />
        <PeopleSidebarItem route={`/app/${slug}/members/invites`} label="Invites" active={page == "invites"} />
        <PeopleSidebarItem route={`/app/${slug}/members/collaborators`} label="Collaborators" active={page == "collaborators"} />
      </nav>
    </div>
  )
}