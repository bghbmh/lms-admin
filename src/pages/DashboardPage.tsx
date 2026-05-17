import OnboardingBanner from '@/components/dashboard/OnboardingBanner'
import StatCards from '@/components/dashboard/StatCards'
import RecentEnrollments from '@/components/dashboard/RecentEnrollments'
import QuickLinks from '@/components/dashboard/QuickLinks'

export default function DashboardPage() {
	return (
		<div>
			{/* 페이지 타이틀 */}
			<div className="mb-6">
				<h1 className="text-xl font-semibold text-foreground">대시보드</h1>
				<p className="text-sm text-muted-foreground mt-0.5">
					안녕하세요, 김대표님 👋
				</p>
				<div>음... 난 뭐가 문제인거지.. 어느 부분이 이해가 안되는지도 모르곘다</div>
				<div>asdf asdf asdf asdf asdf asdf</div>
			</div>

			{/* 온보딩 배너 */}
			<OnboardingBanner />

			{/* 현황 카드 */}
			<StatCards />

			{/* 하단: 최근 수강신청 + 바로가기 */}
			<div className="flex gap-4">
				<RecentEnrollments />
				<QuickLinks />
			</div>
		</div>
	)
}