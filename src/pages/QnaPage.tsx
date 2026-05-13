import { useState, useMemo } from 'react'
import PageHeader from '@/components/common/PageHeader'
import SearchFilterBar from '@/components/common/SearchFilterBar'
import QnaTable from '@/components/qna/QnaTable'
import { dummyQnaPosts } from '@/data/qna'

export default function QnaPage() {
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')

	const filtered = useMemo(() => {
		return dummyQnaPosts.filter((post) => {
			const matchSearch =
				post.title.includes(search) || post.authorName.includes(search)
			const matchStatus =
				statusFilter === 'all' ||
				(statusFilter === 'answered' && post.isAnswered) ||
				(statusFilter === 'unanswered' && !post.isAnswered)
			return matchSearch && matchStatus
		})
	}, [search, statusFilter])

	const unansweredCount = dummyQnaPosts.filter((p) => !p.isAnswered).length

	return (
		<div>
			<PageHeader
				title="Q&A"
				description={
					unansweredCount > 0
						? `미답변 ${unansweredCount}건이 있어요`
						: '모든 질문에 답변했어요'
				}
			/>

			<SearchFilterBar
				searchPlaceholder="질문 제목, 수강생 이름 검색..."
				searchValue={search}
				onSearchChange={setSearch}
				filters={[
					{
						placeholder: '답변 상태',
						value: statusFilter,
						onChange: setStatusFilter,
						options: [
							{ label: '답변 완료', value: 'answered' },
							{ label: '미답변', value: 'unanswered' },
						],
					},
				]}
			/>

			{filtered.length === 0 ? (
				<div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
					검색 결과가 없어요
				</div>
			) : (
				<QnaTable posts={filtered} />
			)}
		</div>
	)
}