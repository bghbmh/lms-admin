
import React from "react"
import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"

interface EmptyStateProps {
	className?: string
	icon?: React.ReactNode
	title: string
	description?: string
	action?: React.ReactNode
}

export default function EmptyState({
	className,
	icon = <Inbox size={32} strokeWidth={2} className="text-muted-foreground" />,
	title = '등록된 콘텐츠가 없습니다',
	description,
	action = null
}: EmptyStateProps) {

	return (
		<div className={cn("px-3 py-20 text-center ", className)}>

			{icon && (
				<div className="flex justify-center p-3">{icon}</div>
			)}

			{title && (
				<p className="text-md font-medium text-gray-600">{title}</p>
			)}
			{description && (
				<p className="text-sm text-gray-500 mt-1.5">{description}</p>
			)}
			{action && <div className="mt-5">{action}</div>}
		</div>

	)

}