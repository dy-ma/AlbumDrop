import CreateOrgForm from "@/app/create-org/create-org";
import { RandomOrgSlug } from "@/lib/rword";

export default function CreateOrgPage() {
  const slug = RandomOrgSlug()

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <CreateOrgForm slug={slug} />
    </main>
  )
}