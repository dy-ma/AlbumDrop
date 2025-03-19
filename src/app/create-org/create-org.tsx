"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string()
    .min(2, {
      message: "Organization Name must be at least 2 characters."
    }),
  slug: z.string()
})

export default function CreateOrgForm({ slug }: { slug: string }) {
  const router = useRouter()

  // Define form object from react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: slug
    }
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    await authClient.organization.create({
      name: values.name,
      slug: slug
    }, {
      onSuccess: () => {
        router.push(`/app/${slug}`)
      },
      onError: (ctx) => {
        toast.error(ctx.error.message)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 md:min-w-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="My Organization" {...field} />
              </FormControl>
              <FormDescription>
                your organization slug will be {slug}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Organization</Button>
      </form>
    </Form>
  )
}