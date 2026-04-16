import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

interface UserMenuProps {
  name: string
  email?: string
  avatarUrl?: string
  onLogout?: () => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function UserMenu({ name, email, onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-neutral-800/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">
        <Avatar className="w-7 h-7">
          <AvatarFallback className="bg-neutral-800 text-neutral-300 text-xs font-medium">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm text-neutral-300 hidden sm:inline">{name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {email && (
          <div className="px-2 py-1.5 text-xs text-neutral-500 truncate">{email}</div>
        )}
        <DropdownMenuItem onClick={onLogout} className="text-red-400 focus:text-red-300">
          <LogOut className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
