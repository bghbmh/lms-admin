import { LayoutGrid, List } from 'lucide-react'
import { cn } from '@/lib/utils'

type ViewMode = 'table' | 'card'

interface ViewToggleProps {
	view: ViewMode
	onChange: (view: ViewMode) => void
	className?: string
}

export default function ViewToggle({ view, onChange, className = '' }: ViewToggleProps) {
	return (
		<div className={
			cn("inline-flex  border border-border rounded-lg overflow-hidden bg-white", className)
		}>
			<button
				onClick={() => onChange('table')}
				className={cn(
					'flex items-center justify-center min-w-8 min-h-8 transition-colors',
					view === 'table' ? 'bg-brand-500 text-white' : 'text-muted-foreground hover:bg-muted'
				)}
			>
				<List size={15} />
			</button>
			<button
				onClick={() => onChange('card')}
				className={cn(
					'flex items-center justify-center min-w-8 min-h-8 transition-colors',
					view === 'card' ? 'bg-brand-500 text-white' : 'text-muted-foreground hover:bg-muted'
				)}
			>
				<LayoutGrid size={15} />
			</button>
		</div>
	)
}