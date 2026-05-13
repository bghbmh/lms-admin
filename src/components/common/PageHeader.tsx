import { cn } from '@/lib/utils'

interface PageHeaderProps {
	title: string
	description?: string
	actions?: React.ReactNode
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
	return (
		<div className="flex items-center justify-between mb-6">
			<div className='flex flex-row md:flex-row items-center gap-x-2 gap-y-1'>
				<h1 className="text-xl font-semibold text-foreground">{title}</h1>
				{description && (
					<p className="text-sm text-muted-foreground">{description}</p>
				)}
			</div>
			{actions && <div className="flex items-center gap-2">{actions}</div>}
		</div>
	)
}