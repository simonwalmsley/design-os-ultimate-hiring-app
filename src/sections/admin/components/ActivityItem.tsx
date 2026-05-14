import {
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  StarIcon,
  BriefcaseIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'
import type { ActivityEvent, ActivityType } from '@/../product/sections/admin/types'

const iconMap: Record<ActivityType, typeof BuildingOffice2Icon> = {
  'client-signed-up': BuildingOffice2Icon,
  'thread-created': ChatBubbleLeftRightIcon,
  'phase-completed': CheckCircleIcon,
  'applicant-shortlisted': StarIcon,
  'hire-closed': BriefcaseIcon,
  'user-approved': UserPlusIcon,
}

export function ActivityItem({ event }: { event: ActivityEvent }) {
  const Icon = iconMap[event.type]
  return (
    <li className="flex gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 outline -outline-offset-1 outline-white/10">
        <Icon className="size-4 text-gray-400" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm/6 text-gray-300">{event.message}</p>
        <p className="text-xs text-gray-600">{event.timestamp}</p>
      </div>
    </li>
  )
}
