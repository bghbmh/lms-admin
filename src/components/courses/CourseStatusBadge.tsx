import { cn } from '@/lib/utils'

type CourseStatus = 'published' | 'draft' | 'hidden'

interface CourseStatusBadgeProps {
	status: CourseStatus
}

const statusConfig: Record<CourseStatus, { label: string; className: string }> = {
	published: {
		label: '공개',
		className: 'bg-brand-50 text-brand-700 border-brand-200',
	},
	draft: {
		label: '임시저장',
		className: 'bg-amber-50 text-amber-700 border-amber-200',
	},
	hidden: {
		label: '비공개',
		className: 'bg-gray-100 text-gray-500 border-gray-200',
	},
}

export default function CourseStatusBadge({ status }: CourseStatusBadgeProps) {
	const config = statusConfig[status]
	return (
		<span className={cn(
			'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
			config.className
		)}>
			{config.label}
		</span>
	)
}