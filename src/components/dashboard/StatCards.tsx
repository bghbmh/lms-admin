import { TrendingUp, Users, BookOpen, MessageSquare } from 'lucide-react'
import { dummyEnrollments } from '@/data/enrollments'
import { dummyPayments } from '@/data/payments'
import { dummyUsers } from '@/data/users'

const todayStr = new Date().toISOString().slice(0, 10)

function calcStats() {
	const todayEnrollments = dummyEnrollments.filter((e) =>
		e.enrolledAt.startsWith(todayStr)
	).length

	const todayRevenue = dummyPayments
		.filter((p) => p.status === 'success' && p.paidAt?.startsWith(todayStr))
		.reduce((sum, p) => sum + p.amount, 0)

	const newLearners = dummyUsers.filter(
		(u) => u.role === 'learner' && u.createdAt.startsWith(todayStr)
	).length

	// 더미: 미답변 Q&A
	const unansweredQna = 3

	return { todayEnrollments, todayRevenue, newLearners, unansweredQna }
}

export default function StatCards() {
	const { todayEnrollments, todayRevenue, newLearners, unansweredQna } = calcStats()

	const stats = [
		{
			label: '오늘 수강신청',
			value: `${todayEnrollments}건`,
			icon: <BookOpen size={18} className="text-brand-500" />,
			sub: '전체 누적 234건',
		},
		{
			label: '오늘 매출',
			value: `${todayRevenue.toLocaleString()}원`,
			icon: <TrendingUp size={18} className="text-brand-500" />,
			sub: '이번 달 1,240,000원',
		},
		{
			label: '신규 수강생',
			value: `${newLearners}명`,
			icon: <Users size={18} className="text-brand-500" />,
			sub: '전체 수강생 128명',
		},
		{
			label: '미답변 Q&A',
			value: `${unansweredQna}건`,
			icon: <MessageSquare size={18} className="text-amber-500" />,
			sub: '빠른 답변이 필요해요',
			highlight: unansweredQna > 0,
		},
	]

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
			{stats.map((stat) => (
				<div
					key={stat.label}
					className="bg-white rounded-xl border border-border p-4 flex flex-col gap-3"
				>
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">{stat.label}</span>
						<div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
							{stat.icon}
						</div>
					</div>
					<div>
						<p
							className={`text-2xl font-semibold ${stat.highlight ? 'text-amber-500' : 'text-foreground'
								}`}
						>
							{stat.value}
						</p>
						<p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
					</div>
				</div>
			))}
		</div>
	)
}