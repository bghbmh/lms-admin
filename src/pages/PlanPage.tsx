import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Zap, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import { dummySitePlan } from '@/data/settings'
import { cn } from '@/lib/utils'

const planConfig = {
	free: {
		label: '프리',
		color: 'text-gray-600',
		bg: 'bg-gray-100',
		enrollmentLimit: 20,
		payoutRate: 90,
	},
	starter: {
		label: '스타터',
		color: 'text-brand-700',
		bg: 'bg-brand-50',
		enrollmentLimit: 100,
		payoutRate: 95,
	},
	pro: {
		label: '프로',
		color: 'text-purple-700',
		bg: 'bg-purple-50',
		enrollmentLimit: 300,
		payoutRate: 97,
	},
}

const plans = [
	{
		type: 'free' as const,
		label: '프리',
		price: 0,
		features: [
			'월 수강신청 20건',
			'정산 비율 90%',
			'서브도메인 제공',
			'강의 등록 무제한',
		],
	},
	{
		type: 'starter' as const,
		label: '스타터',
		price: 29000,
		features: [
			'월 수강신청 100건',
			'정산 비율 95%',
			'커스텀 도메인 연결',
			'쿠폰 발행',
			'마케팅 채널 연결',
		],
	},
	{
		type: 'pro' as const,
		label: '프로',
		price: 59000,
		features: [
			'월 수강신청 300건',
			'정산 비율 97%',
			'커스텀 도메인 연결',
			'쿠폰 발행',
			'마케팅 채널 연결',
			'라이브 강의',
			'수료증 발급',
		],
	},
]

export default function PlanPage() {
	const navigate = useNavigate()
	const plan = dummySitePlan
	const config = planConfig[plan.planType]
	const usagePercent = Math.round((plan.enrollmentUsed / plan.enrollmentLimit) * 100)
	const isWarning = usagePercent >= 80

	return (
		<div>
			<PageHeader
				title="내 플랜"
				description="현재 구독 상태와 플랜을 관리해요"
			/>

			<div className="flex flex-col gap-5">

				{/* 현재 플랜 현황 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">구독 현황</h2>
					<div className="flex items-start justify-between">
						<div className="flex flex-col gap-4">
							{/* 플랜 뱃지 */}
							<div className="flex items-center gap-2">
								<span className={cn(
									'px-3 py-1 rounded-full text-sm font-semibold',
									config.bg, config.color
								)}>
									{config.label} 플랜
								</span>
								<span className="text-xs text-muted-foreground">
									{plan.status === 'active' ? '구독 중' : '비활성'}
								</span>
							</div>

							{/* 수강신청 사용량 */}
							<div className="flex flex-col gap-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">이번 달 수강신청</span>
									<span className={cn(
										'font-semibold',
										isWarning ? 'text-amber-600' : 'text-foreground'
									)}>
										{plan.enrollmentUsed} / {plan.enrollmentLimit}건
									</span>
								</div>
								<div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
									<div
										className={cn(
											'h-2 rounded-full transition-all',
											isWarning ? 'bg-amber-500' : 'bg-brand-500'
										)}
										style={{ width: `${usagePercent}%` }}
									/>
								</div>
								{isWarning && (
									<p className="text-xs text-amber-600">
										한도의 {usagePercent}%를 사용했어요. 업그레이드를 고려해보세요.
									</p>
								)}
							</div>

							{/* 정산 비율 */}
							<div className="text-sm text-muted-foreground">
								정산 비율{' '}
								<span className="font-semibold text-foreground">
									{config.payoutRate}%
								</span>
							</div>

							{/* 다음 결제일 */}
							{plan.nextBillingDate && (
								<div className="text-sm text-muted-foreground">
									다음 결제일{' '}
									<span className="font-medium text-foreground">
										{plan.nextBillingDate}
									</span>
								</div>
							)}
						</div>

						{plan.planType !== 'pro' && (
							<Button
								size="sm"
								className="bg-brand-500 hover:bg-brand-600 text-white gap-1 shrink-0"
								onClick={() => navigate('/plan/upgrade')}
							>
								<Zap size={13} />
								업그레이드
							</Button>
						)}
					</div>
				</div>

				{/* 플랜 비교표 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">플랜 비교</h2>
					<div className="grid grid-cols-3 gap-3">
						{plans.map((p) => {
							const isCurrent = p.type === plan.planType
							return (
								<div
									key={p.type}
									className={cn(
										'rounded-xl border p-4 flex flex-col gap-3 transition-colors',
										isCurrent
											? 'border-brand-400 bg-brand-50/50'
											: 'border-border'
									)}
								>
									{/* 플랜명 + 현재 뱃지 */}
									<div className="flex items-center justify-between">
										<span className={cn(
											'text-sm font-semibold',
											isCurrent ? 'text-brand-700' : 'text-foreground'
										)}>
											{p.label}
										</span>
										{isCurrent && (
											<span className="text-xs bg-brand-500 text-white px-2 py-0.5 rounded-full">
												현재
											</span>
										)}
									</div>

									{/* 가격 */}
									<div>
										{p.price === 0 ? (
											<span className="text-xl font-bold text-foreground">무료</span>
										) : (
											<div>
												<span className="text-xl font-bold text-foreground">
													{p.price.toLocaleString()}원
												</span>
												<span className="text-xs text-muted-foreground"> / 월</span>
											</div>
										)}
									</div>

									{/* 기능 목록 */}
									<ul className="flex flex-col gap-1.5">
										{p.features.map((f) => (
											<li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground">
												<CheckCircle2 size={12} className="text-brand-500 shrink-0 mt-0.5" />
												{f}
											</li>
										))}
									</ul>

									{/* 버튼 */}
									{!isCurrent && p.type !== 'free' && (
										<Button
											variant="outline"
											size="sm"
											className="mt-auto gap-1 text-xs"
											onClick={() => navigate('/plan/upgrade')}
										>
											업그레이드
											<ArrowUpRight size={12} />
										</Button>
									)}
								</div>
							)
						})}
					</div>
				</div>

			</div>
		</div>
	)
}