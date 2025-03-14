"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { User } from "better-auth"
import ProfilePic from "./profile-pic"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Separator } from "./ui/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

type AccountProps = {
  user: User
}

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required")
})

export default function AccountProfile({ user }: AccountProps) {
  const [updatingProfile, setUpdatingProfile] = useState(false)
  const [name, setName] = useState(user.name)

  const profileForm = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name
    }
  })

  async function handleUpdate(values: z.infer<typeof updateProfileSchema>) {
    await authClient.updateUser({
      name: values.name
    }, {
      onSuccess: () => {
        setName(values.name)
        setUpdatingProfile(false)
      },
      onError: (ctx) => {
        toast.error(ctx.error.message)
      }
    })
  }

  async function handleDelete() {
    await authClient.deleteUser({
      callbackURL: "/"
    })
  }

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account info.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ProfilePic user={user} />
              <div>{name}</div>
            </div>
            <Button variant="ghost" onClick={() => setUpdatingProfile(true)}>
              Update profile
            </Button>
          </CardContent>
          {updatingProfile && (
            <>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleUpdate)}>
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="px-4">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder={user.name} {...field} type="text" required />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                        <div className="flex gap-2 justify-end">
                          <Button variant="secondary" onClick={() => setUpdatingProfile(false)}>
                            Cancel
                          </Button>
                          <Button>
                            Save
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </>
          )}
          <Separator className="" />
          <CardContent className="flex items-center justify-between">
            <CardTitle>Email Address</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardContent>
          <Separator className="" />
          <CardContent className="flex items-center justify-between">
            <CardTitle>Danger</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account, including any photos you have uploaded.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
