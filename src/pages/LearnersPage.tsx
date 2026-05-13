import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import SearchFilterBar from '@/components/common/SearchFilterBar'
import LearnerTable from '@/components/learners/LearnerTable'
import { dummyUsers } from '@/data/users'
import { dummyEnrollments } from '@/data/enrollments'

export default function LearnersPage() {
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')

	// 수강생만 필터
	const learners = useMemo(() => {
		return dummyUsers
			.filter((u) => u.role === 'learner')
			.map((u) => {
				// 수강중인 강의 수 계산
				const enrollCount = dummyEnrollments.filter(
					(e) => e.learnerId === u.id && e.status === 'active'
				).length
				return { ...u, enrollCount }
			})
	}, [])

	const filtered = useMemo(() => {
		return learners.filter((u) => {
			const matchSearch =
				u.name.includes(search) || u.email.includes(search)
			const matchStatus =
				statusFilter === 'all' ||
				(statusFilter === 'active' && u.lastLoginAt) ||
				(statusFilter === 'inactive' && !u.lastLoginAt)
			return matchSearch && matchStatus
		})
	}, [learners, search, statusFilter])

	return (
		<div>
			<PageHeader
				title="수강생 목록"
				description={`전체 ${filtered.length}명`}
				actions={
					<Button
						size="sm"
						className="bg-brand-500 hover:bg-brand-600 text-white gap-1"
					>
						<Plus size={15} />
						수강생 초대
					</Button>
				}
			/>

			<SearchFilterBar
				searchPlaceholder="이름, 이메일 검색..."
				searchValue={search}
				onSearchChange={setSearch}
				filters={[
					{
						placeholder: '상태',
						value: statusFilter,
						onChange: setStatusFilter,
						options: [
							{ label: '활성', value: 'active' },
							{ label: '미접속', value: 'inactive' },
						],
					},
				]}
			/>

			{filtered.length === 0 ? (
				<div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
					검색 결과가 없어요
				</div>
			) : (
				<LearnerTable learners={filtered} />
			)}
		</div>
	)
}