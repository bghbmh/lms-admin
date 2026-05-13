import { useNavigate } from 'react-router-dom'
import { Users, BookOpen, MoreHorizontal } from 'lucide-react'
import type { Course } from '@/types'
import CourseStatusBadge from './CourseStatusBadge'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CourseCardProps {
	course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
	const navigate = useNavigate()

	return (
		<div
			className="bg-white rounded-xl border border-border overflow-hidden hover:border-brand-200 transition-colors cursor-pointer"
			onClick={() => navigate(`/courses/${course.id}`)}
		>
			{/* 썸네일 */}
			<div className="aspect-video bg-muted relative">
				{course.thumbnailUrl ? (
					<img
						src={course.thumbnailUrl}
						alt={course.title}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<BookOpen size={24} className="text-muted-foreground" />
					</div>
				)}
				<div className="absolute top-2 left-2">
					<CourseStatusBadge status={course.isPublished ? 'published' : 'draft'} />
				</div>
				<div
					className="absolute top-2 right-2"
					onClick={(e) => e.stopPropagation()}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="w-7 h-7 flex items-center justify-center rounded-md bg-white/90 hover:bg-white transition-colors">
								<MoreHorizontal size={15} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => navigate(`/courses/${course.id}`)}>
								수정
							</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive">
								삭제
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* 정보 */}
			<div className="p-4">
				<p className="font-medium text-foreground line-clamp-2 leading-snug">
					{course.title}
				</p>
				<div className="flex items-center justify-between mt-3">
					<div className="flex items-center gap-3 text-xs text-muted-foreground">
						<span className="flex items-center gap-1">
							<Users size={12} />
							{course.studentCount ?? 0}명
						</span>
						<span className="flex items-center gap-1">
							<BookOpen size={12} />
							{course.chapterCount ?? 0}차시
						</span>
					</div>
					<span className={`text-sm font-semibold ${course.price === 0 ? 'text-brand-600' : 'text-foreground'}`}>
						{course.price === 0 ? '무료' : `${course.price.toLocaleString()}원`}
					</span>
				</div>
			</div>
		</div>
	)
}