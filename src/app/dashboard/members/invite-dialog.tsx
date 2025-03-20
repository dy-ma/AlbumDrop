import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Role, RoleOptions } from "@/lib/permissions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { authClient } from "@/lib/auth-client"
import type { Organization } from "@/lib/auth-types"
import { useRouter } from "next/navigation"

const inviteFormSchema = z.object({
  invites: z.array(
    z.object({
      email: z.string().email({ message: "Please enter a valid email address" })
        .or(z.string().length(0)),
      role: z.string().min(1, { message: "Please select a role" })
    })
  ).min(1)
})
type InviteForm = z.infer<typeof inviteFormSchema>

export default function InviteDialog({ org }: { org: Organization }) {
  // Redirect to the invites page after sending
  const router = useRouter()

  const inviteForm = useForm<InviteForm>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      invites: [{ email: "", role: "member" }]
    }
  })

  async function onSubmit(values: InviteForm, org: Organization) {
    const validInvites = values.invites.filter(invite => invite.email.trim() !== "")

    await Promise.all(
      validInvites.map(async ({ email, role }) =>
        authClient.organization.inviteMember({
          email,
          role: role as Role,
          organizationId: org.id
        })
      )
    )

    router.push(`/dashboard/members/invites`)
  }

  function handleEmailChange(index: number, value: string) {
    const invites = inviteForm.getValues().invites

    if (index === invites.length - 1 && value.trim() !== "") {
      inviteForm.setValue("invites", [...invites, { email: "", role: "member" }])
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Invite member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Members</DialogTitle>
          <DialogDescription>
            Invite users to join {`${org.name}`}
          </DialogDescription>
        </DialogHeader>
        <Form {...inviteForm}>
          <form onSubmit={inviteForm.handleSubmit((values) => onSubmit(values, org))}>
            <div className="space-y-4">
              <div className="mb-2">
                <h3 className="text-sm font-medium">Email addresses</h3>
              </div>

              {inviteForm.watch("invites").map((_, index) => (
                <div key={index} className="flex gap-2">
                  <FormField
                    control={inviteForm.control}
                    name={`invites.${index}.email`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              handleEmailChange(index, e.target.value)
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={inviteForm.control}
                    name={`invites.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RoleOptions.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <FormMessage />
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Invite members</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}