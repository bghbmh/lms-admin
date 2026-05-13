import {
	LayoutDashboard,
	Globe,
	BookOpen,
	Users,
	MessageSquare,
	Megaphone,
	BarChart2,
	Settings,
	CreditCard,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface GnbChild {
	label: string
	path: string
}

export interface GnbItem {
	label: string
	path?: string
	icon: LucideIcon
	children?: GnbChild[]
}

export const GNB_ICON_W = 60

export const gnbItems: GnbItem[] = [
	{
		label: '대시보드',
		path: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		label: '내 사이트',
		icon: Globe,
		children: [
			{ label: '테마 설정', path: '/settings/theme' },
			{ label: '페이지 편집', path: '/settings/site' },
			{ label: 'GNB 관리', path: '/settings/gnb' },
			{ label: '도메인 관리', path: '/settings/domain' },
		],
	},
	{
		label: '콘텐츠',
		icon: BookOpen,
		children: [
			{ label: '강의 목록', path: '/courses' },
			{ label: '카테고리', path: '/courses/categories' },
			{ label: '쿠폰·할인', path: '/coupons' },
		],
	},
	{
		label: '수강생 관리',
		icon: Users,
		children: [
			{ label: '수강생 목록', path: '/learners' },
			{ label: '학습 현황', path: '/enrollments' },
			{ label: '수료증 발급', path: '/certificates' },
		],
	},
	{
		label: '소통',
		icon: MessageSquare,
		children: [
			{ label: 'Q&A', path: '/boards/qna' },
			{ label: '공지사항', path: '/boards/notice' },
			{ label: '자동 알림', path: '/boards/notifications' },
		],
	},
	{
		label: '마케팅',
		icon: Megaphone,
		children: [
			{ label: '채널 연결', path: '/marketing/channels' },
			{ label: '공유 링크', path: '/marketing/links' },
			{ label: '유입 통계', path: '/marketing/stats' },
		],
	},
	{
		label: '매출·정산',
		icon: BarChart2,
		children: [
			{ label: '매출 통계', path: '/payments' },
			{ label: '강사 정산', path: '/settlements' },
		],
	},
	{
		label: '설정',
		icon: Settings,
		children: [
			{ label: '기본 정보', path: '/settings/info' },
			{ label: '결제 PG 연동', path: '/settings/pg' },
			{ label: '쇼케이스 공개', path: '/settings/showcase' },
			{ label: '멤버 관리', path: '/settings/members' },
		],
	},
	{
		label: '내 플랜',
		icon: CreditCard,
		children: [
			{ label: '구독 현황', path: '/plan' },
			{ label: '플랜 업그레이드', path: '/plan/upgrade' },
			{ label: '결제 내역', path: '/plan/billing' },
		],
	},
]