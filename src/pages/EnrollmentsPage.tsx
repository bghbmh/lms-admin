import { useState, useMemo } from 'react'
import PageHeader from '@/components/common/PageHeader'
import SearchFilterBar from '@/components/common/SearchFilterBar'
import { Table, THead, TBody, TR, TH, TD } from '@/components/common/Table/Table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { dummyLearnerProgress } from '@/data/progress'
import { dummyCourses } from '@/data/courses'
import { cn } from '@/lib/utils'

const statusConfig = {
	active: { label: '수강중', className: 'bg-brand-50 text-brand-700 border-brand-200' },
	completed: { label: '수료', className: 'bg-blue-50 text-blue-700 border-blue-200' },
	refunded: { label: '환불', className: 'bg-gray-100 text-gray-500 border-gray-200' },
}

function ProgressBar({ value }: { value: number }) {
	return (
		<div className="flex items-center gap-2">
			<div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden min-w-16">
				<div
					className={cn(
						'h-1.5 rounded-full transition-all',
						value === 100 ? 'bg-blue-500' : 'bg-brand-500'
					)}
					style={{ width: `${value}%` }}
				/>
			</div>
			<span className="text-xs text-muted-foreground w-8 text-right shrink-0">
				{value}%
			</span>
		</div>
	)
}

export default function EnrollmentsPage() {
	const [search, setSearch] = useState('')
	const [courseFilter, setCourseFilter] = useState('all')
	const [statusFilter, setStatusFilter] = useState('all')

	const filtered = useMemo(() => {
		return dummyLearnerProgress.filter((p) => {
			const matchSearch =
				p.learnerName.includes(search) ||
				p.learnerEmail.includes(search) ||
				p.courseTitle.includes(search)
			const matchCourse = courseFilter === 'all' || p.courseId === courseFilter
			const matchStatus = statusFilter === 'all' || p.status === statusFilter
			return matchSearch && matchCourse && matchStatus
		})
	}, [search, courseFilter, statusFilter])

	// 요약 통계
	const stats = useMemo(() => {
		const total = dummyLearnerProgress.length
		const completed = dummyLearnerProgress.filter((p) => p.status === 'completed').length
		const avgProgress = Math.round(
			dummyLearnerProgress
				.filter((p) => p.status === 'active')
				.reduce((sum, p) => sum + p.progress, 0) /
			dummyLearnerProgress.filter((p) => p.status === 'active').length
		)
		return { total, completed, avgProgress }
	}, [])

	return (
		<div>
			<PageHeader
				title="학습 현황"
				description="수강생별 강의 진도율을 확인해요"
			/>

			{/* 요약 카드 */}
			<div className="grid grid-cols-3 gap-4 mb-6">
				<div className="bg-white rounded-xl border border-border p-4">
					<p className="text-sm text-muted-foreground">전체 수강신청</p>
					<p className="text-2xl font-semibold text-foreground mt-1">
						{stats.total}건
					</p>
				</div>
				<div className="bg-white rounded-xl border border-border p-4">
					<p className="text-sm text-muted-foreground">수료 완료</p>
					<p className="text-2xl font-semibold text-blue-600 mt-1">
						{stats.completed}명
					</p>
				</div>
				<div className="bg-white rounded-xl border border-border p-4">
					<p className="text-sm text-muted-foreground">평균 진도율</p>
					<p className="text-2xl font-semibold text-brand-600 mt-1">
						{stats.avgProgress}%
					</p>
				</div>
			</div>

			<SearchFilterBar
				searchPlaceholder="수강생 이름, 이메일, 강의명 검색..."
				searchValue={search}
				onSearchChange={setSearch}
				filters={[
					{
						placeholder: '강의',
						value: courseFilter,
						onChange: setCourseFilter,
						options: dummyCourses.map((c) => ({
							label: c.title,
							value: c.id,
						})),
					},
					{
						placeholder: '상태',
						value: statusFilter,
						onChange: setStatusFilter,
						options: [
							{ label: '수강중', value: 'active' },
							{ label: '수료', value: 'completed' },
							{ label: '환불', value: 'refunded' },
						],
					},
				]}
			/>

			{filtered.length === 0 ? (
				<div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
					검색 결과가 없어요
				</div>
			) : (
				<Table>
					<THead>
						<TR>
							<TH>수강생</TH>
							<TH>강의</TH>
							<TH>진도율</TH>
							<TH>완료 레슨</TH>
							<TH>마지막 접속</TH>
							<TH>상태</TH>
						</TR>
					</THead>
					<TBody>
						{filtered.map((item) => {
							const config = statusConfig[item.status]
							return (
								<TR key={item.id}>
									{/* 수강생 */}
									<TD>
										<div className="flex items-center gap-2.5">
											<Avatar className="w-7 h-7 shrink-0">
												<AvatarFallback className="bg-brand-50 text-brand-700 text-xs">
													{item.learnerName.slice(0, 2)}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className="text-sm font-medium text-foreground">
													{item.learnerName}
												</p>
												<p className="text-xs text-muted-foreground">
													{item.learnerEmail}
												</p>
											</div>
										</div>
									</TD>

									{/* 강의 */}
									<TD className="max-w-[200px]">
										<p className="text-sm text-foreground truncate">
											{item.courseTitle}
										</p>
										<p className="text-xs text-muted-foreground mt-0.5">
											{item.enrolledAt.slice(0, 10)} 수강신청
										</p>
									</TD>

									{/* 진도율 */}
									<TD className="min-w-[140px]">
										<ProgressBar value={item.progress} />
									</TD>

									{/* 완료 레슨 */}
									<TD className="text-sm text-muted-foreground">
										{item.completedLessons} / {item.totalLessons}개
									</TD>

									{/* 마지막 접속 */}
									<TD className="text-sm text-muted-foreground">
										{item.lastAccessedAt.slice(0, 10)}
									</TD>

									{/* 상태 */}
									<TD>
										<span className={cn(
											'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
											config.className
										)}>
											{config.label}
										</span>
									</TD>
								</TR>
							)
						})}
					</TBody>
				</Table>
			)}
		</div>
	)
}