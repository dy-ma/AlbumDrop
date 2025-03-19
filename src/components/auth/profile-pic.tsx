import { User } from "better-auth"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type ProfilePicProps = {
  user: User
}

export default function ProfilePic({ user }: ProfilePicProps) {
  return (
    <Avatar>
      <AvatarImage src={user.image || ""} alt={user.name} />
      <AvatarFallback>{user.name[0]}</AvatarFallback>
    </Avatar>
  )
}