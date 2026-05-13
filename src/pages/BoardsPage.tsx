import { useNavigate } from 'react-router-dom'
import { MessageSquare, Bell, ChevronRight } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import { dummyQnaPosts } from '@/data/qna'
import { dummyNotices } from '@/data/notice'

const boards = [
	{
		id: 'qna',
		label: 'Q&A',
		icon: <MessageSquare size={20} className="text-brand-500" />,
		path: '/boards/qna',
		description: '수강생들의 질문에 답변해요',
		count: dummyQnaPosts.length,
		unread: dummyQnaPosts.filter((p) => !p.isAnswered).length,
		unreadLabel: '미답변',
	},
	{
		id: 'notice',
		label: '공지사항',
		icon: <Bell size={20} className="text-brand-500" />,
		path: '/boards/notice',
		description: '수강생에게 공지를 전달해요',
		count: dummyNotices.length,
		unread: 0,
		unreadLabel: '',
	},
]

export default function BoardsPage() {
	const navigate = useNavigate()

	return (
		<div>
			<PageHeader
				title="게시판 관리"
				description="Q&A와 공지사항을 관리해요"
			/>

			<div className="flex flex-col gap-3 max-w-xl">
				{boards.map((board) => (
					<button
						key={board.id}
						onClick={() => navigate(board.path)}
						className="flex items-center gap-4 bg-white rounded-xl border border-border p-5 hover:border-brand-200 transition-colors text-left"
					>
						<div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
							{board.icon}
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-2">
								<span className="text-sm font-semibold text-foreground">{board.label}</span>
								{board.unread > 0 && (
									<span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full font-medium">
										{board.unreadLabel} {board.unread}건
									</span>
								)}
							</div>
							<p className="text-xs text-muted-foreground mt-0.5">{board.description}</p>
							<p className="text-xs text-muted-foreground mt-1">전체 {board.count}개</p>
						</div>
						<ChevronRight size={16} className="text-muted-foreground shrink-0" />
					</button>
				))}
			</div>
		</div>
	)
}