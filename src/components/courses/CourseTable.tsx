import { useNavigate } from 'react-router-dom'
import { MoreHorizontal, Users, BookOpen } from 'lucide-react'
import type { Course } from '@/types'
import CourseStatusBadge from './CourseStatusBadge'

import { Table, StickyTable, StickyTHead, THead, TBody, TR, TD, TH } from '@/components/common/Table/Table'


import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CourseTableProps {
	courses: Course[]
}

export default function CourseTable({ courses }: CourseTableProps) {
	const navigate = useNavigate()

	return (
		<Table>
			<THead>
				<TR>
					<TH className='w-[35%]'>강의명</TH>
					<TH>유형</TH>
					<TH>가격</TH>
					<TH>수강생</TH>
					<TH className='w-[100px]'>상태</TH>
					<TH>등록일</TH>
					<TH className="w-10" />
				</TR>
			</THead>
			<TBody>
				{courses.map((course) => (
					<TR
						key={course.id}
						onClick={() => navigate(`/courses/${course.id}`)}
						className="cursor-pointer text-[13px]"
					>
						<TD>
							<div className="flex items-center gap-3">
								<div className="w-14 h-10 rounded-md bg-muted overflow-hidden shrink-0">
									{course.thumbnailUrl ? (
										<img
											src={course.thumbnailUrl}
											alt={course.title}
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<BookOpen size={16} className="text-muted-foreground" />
										</div>
									)}
								</div>
								<div>
									<p className="font-medium text-foreground line-clamp-1">{course.title}</p>
									{course.chapterCount !== undefined && (
										<p className="text-xs text-muted-foreground mt-0.5">{course.chapterCount}차시</p>
									)}
								</div>
							</div>
						</TD>
						<TD>{course.courseType}</TD>
						<TD>{course.price === 0 ? '무료' : `${course.price.toLocaleString()}원`}</TD>
						<TD>{course.studentCount ?? 0}명</TD>
						<TD><CourseStatusBadge status={course.isPublished ? 'published' : 'draft'} /></TD>
						<TD>{course.createdAt.slice(0, 10)}</TD>
						<TD onClick={(e) => e.stopPropagation()}>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors">
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
						</TD>
					</TR>

				))}
			</TBody>
		</Table>

	)
}