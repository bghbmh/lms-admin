import { useState } from 'react'
import { CheckCircle2, Circle, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const steps = [
	{ id: 1, label: '브랜드 기본 정보', desc: '사이트 이름과 주소 설정' },
	{ id: 2, label: '테마 꾸미기', desc: '색상·폰트 선택' },
	{ id: 3, label: '첫 강의 등록', desc: '강의와 영상 1개 등록' },
	{ id: 4, label: '결제 연동', desc: '토스페이먼츠 키 입력' },
	{ id: 5, label: '사이트 공개·공유', desc: '사이트 주소 공유' },
]

// 더미: 1,2단계 완료 상태
const completedSteps = [1, 2]

export default function OnboardingBanner() {
	const [dismissed, setDismissed] = useState(false)

	if (dismissed) return null

	const completedCount = completedSteps.length
	const nextStep = steps.find((s) => !completedSteps.includes(s.id))
	const progressPercent = (completedCount / steps.length) * 100

	return (
		<div className="rounded-xl border  bg-[#0bb4ac] p-5 mb-6 relative">
			{/* 닫기 버튼 */}
			<Button
				variant="ghost"
				onClick={() => setDismissed(true)}
				className="absolute top-4 right-4 rounded-full text-white hover:text-[#0bb4ac] transition-colors"
			>
				<X size={24} />
			</Button>

			{/* 타이틀 */}
			<div className="mb-4">
				<h2 className="text-base font-semibold text-brand-50">
					내 강의 사이트를 완성해보세요 🚀
				</h2>
				<p className="text-sm text-brand-100 mt-0.5">
					{completedCount}단계 완료 · {steps.length - completedCount}단계 남았어요
				</p>
				{/* 프로그레스 바 */}
				<div className="mt-3 h-1.5 bg-brand-100 rounded-full w-full max-w-sm">
					<div
						className="h-1.5 bg-brand-500 rounded-full transition-all"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>
			</div>

			{/* 단계 목록 */}
			<div className="flex flex-wrap gap-2">
				{steps.map((step) => {
					const isDone = completedSteps.includes(step.id)
					const isCurrent = step.id === nextStep?.id
					return (
						<div
							key={step.id}
							className={cn(
								'flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors',
								isDone
									? 'bg-white border-brand-200 text-brand-600'
									: isCurrent
										? 'bg-brand-500 border-brand-500 text-white cursor-pointer hover:bg-brand-600'
										: 'bg-white border-brand-100 text-brand-300'
							)}
						>
							{isDone ? (
								<CheckCircle2 size={15} className="text-brand-500 shrink-0" />
							) : (
								<Circle size={15} className="shrink-0 opacity-60" />
							)}
							<span>{step.label}</span>
							{isCurrent && <ChevronRight size={14} className="ml-1 opacity-80" />}
						</div>
					)
				})}
			</div>

			{/* 다음 단계 버튼 */}
			{nextStep && (
				<div className="mt-4">
					<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
						{nextStep.label} 시작하기
					</Button>
				</div>
			)}
		</div>
	)
}