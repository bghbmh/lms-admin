import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'


interface FilterOption {
	label: string
	value: string
}

interface SearchFilterBarProps {
	className?: string
	searchPlaceholder?: string
	searchValue: string
	onSearchChange: (value: string) => void
	filters?: {
		placeholder: string
		options: FilterOption[]
		value: string
		onChange: (value: string) => void
	}[]
}

export default function SearchFilterBar({
	searchPlaceholder = '검색...',
	searchValue,
	onSearchChange,
	filters = [],
	className
}: SearchFilterBarProps) {
	return (
		<div className={cn("flex gap-1 mb-5", className)}>
			{/* 필터 셀렉트들 */}
			{filters.map((filter, i) => (
				<Select key={i} value={filter.value} onValueChange={filter.onChange}>
					<SelectTrigger className=" min-w-30  min-h-9 text-sm bg-white">
						<SelectValue placeholder={filter.placeholder} />
					</SelectTrigger>
					<SelectContent position='popper'>
						<SelectItem value="all">{filter.placeholder} 전체</SelectItem>
						{filter.options.map((opt) => (
							<SelectItem key={opt.value} value={opt.value}>
								{opt.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			))}

			{/* 검색창 */}
			<div className="relative flex-1 max-w-xs">
				<Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder={searchPlaceholder}
					value={searchValue}
					onChange={(e) => onSearchChange(e.target.value)}
					className="pl-8 min-h-9 text-sm bg-white"
				/>
			</div>
		</div>
	)
}