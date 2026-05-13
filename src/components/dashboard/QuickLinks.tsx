import { useNavigate } from 'react-router-dom'
import { BookOpen, Users, Megaphone, BarChart2 } from 'lucide-react'

const links = [
	{
		label: '강의 등록',
		desc: '새 강의를 만들어보세요',
		icon: <BookOpen size={20} className="text-brand-500" />,
		path: '/courses/new',
	},
	{
		label: '수강생 관리',
		desc: '수강생 현황을 확인하세요',
		icon: <Users size={20} className="text-brand-500" />,
		path: '/learners',
	},
	{
		label: '쿠폰 만들기',
		desc: '할인 쿠폰을 발행하세요',
		icon: <Megaphone size={20} className="text-brand-500" />,
		path: '/coupons',
	},
	{
		label: '매출 확인',
		desc: '이번 달 매출을 확인하세요',
		icon: <BarChart2 size={20} className="text-brand-500" />,
		path: '/payments',
	},
]

export default function QuickLinks() {
	const navigate = useNavigate()

	return (
		<div className="bg-white rounded-xl border border-border p-5 w-64 shrink-0">
			<h3 className="text-sm font-semibold text-foreground mb-4">바로가기</h3>
			<div className="flex flex-col gap-2">
				{links.map((link) => (
					<button
						key={link.label}
						onClick={() => navigate(link.path)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left w-full"
					>
						<div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
							{link.icon}
						</div>
						<div>
							<p className="text-sm font-medium text-foreground">{link.label}</p>
							<p className="text-xs text-muted-foreground">{link.desc}</p>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}