import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import SearchFilterBar from '@/components/common/SearchFilterBar'
import ViewToggle from '@/components/common/ViewToggle'
import CourseTable from '@/components/courses/CourseTable'
import CourseCard from '@/components/courses/CourseCard'
import { dummyCourses } from '@/data/courses'

type ViewMode = 'table' | 'card'

export default function CoursesPage() {
	const navigate = useNavigate()
	const [view, setView] = useState<ViewMode>('table')
	const [search, setSearch] = useState('')
	const [typeFilter, setTypeFilter] = useState('all')
	const [statusFilter, setStatusFilter] = useState('all')

	// 필터링
	const filtered = useMemo(() => {
		return dummyCourses.filter((course) => {
			const matchSearch = course.title.includes(search)
			const matchType = typeFilter === 'all' || course.courseType === typeFilter
			const matchStatus =
				statusFilter === 'all' ||
				(statusFilter === 'published' && course.isPublished) ||
				(statusFilter === 'draft' && !course.isPublished)
			return matchSearch && matchType && matchStatus
		})
	}, [search, typeFilter, statusFilter])

	return (
		<div>
			<PageHeader
				title="강의 목록"
				description={`전체 ${filtered.length}개`}
				actions={
					<Button
						size="sm"
						className="bg-brand-500 hover:bg-brand-600 text-white gap-1"
						onClick={() => navigate('/courses/new')}
					>
						<Plus size={15} />
						강의 등록
					</Button>
				}
			/>

			<div className='flex justify-between mb-5'>
				<SearchFilterBar
					className='m-0'
					searchPlaceholder="강의명 검색..."
					searchValue={search}
					onSearchChange={setSearch}
					filters={[
						{
							placeholder: '유형',
							value: typeFilter,
							onChange: setTypeFilter,
							options: [
								{ label: 'VOD', value: 'vod' },
								{ label: '라이브', value: 'live' },
								{ label: '라이브+VOD', value: 'live_bundle' },
							],
						},
						{
							placeholder: '상태',
							value: statusFilter,
							onChange: setStatusFilter,
							options: [
								{ label: '공개', value: 'published' },
								{ label: '임시저장', value: 'draft' },
							],
						},
					]}
				/>

				<ViewToggle view={view} onChange={setView} />
			</div>

			{filtered.length === 0 ? (
				<div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
					검색 결과가 없어요
				</div>
			) : view === 'table' ? (
				<CourseTable courses={filtered} />
			) : (
				<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{filtered.map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
			)}
		</div>
	)
}