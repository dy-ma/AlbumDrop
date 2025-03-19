"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient, Organization } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

const infoSchema = z.object({
  name: z.string()
    .min(2, {
      message: "Organization Name must be at least 2 characters."
    })
})

export default function OrgGeneralInfo({
  org,
}: {
  org: Organization,
  canUpdate: boolean
}) {
  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      name: org.name
    }
  })

  async function onSubmit(values: z.infer<typeof infoSchema>) {
    const name = values.name

    await authClient.organization.update({
      data: {
        name: name,
      },
      organizationId: org.id
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder={org.name} {...field} className="max-w-80" />
                  </FormControl>
                  <FormDescription className="flex flex-col">
                    This will not change your organization&apos;s homepage url.
                    <span className="font-semibold">
                      {`${process.env.NEXT_PUBLIC_BASE_URL}/app/${org.slug}`}
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}