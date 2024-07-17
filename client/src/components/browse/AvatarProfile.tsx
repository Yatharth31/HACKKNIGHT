import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AvatarProfile() {
  return (
    <Avatar>
      <AvatarImage src="../../assets/cuban.png" />
      <AvatarFallback>DP</AvatarFallback>
    </Avatar>
  )
}
