import { useState } from 'react'
import { Save, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import { cn } from '@/lib/utils'

export default function ShowcasePage() {
	const [agreed, setAgreed] = useState(false)

	return (
		<div>
			<PageHeader
				title="쇼케이스 공개 동의"
				description="플랫폼 공식 사이트에 내 브랜드를 노출할지 설정해요"
				actions={
					<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
						<Save size={14} />
						저장
					</Button>
				}
			/>

			<div className="flex flex-col gap-5 max-w-xl">

				{/* 쇼케이스 안내 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-2">플랫폼 쇼케이스란?</h2>
					<p className="text-sm text-muted-foreground leading-relaxed">
						플랫폼 공식 사이트의 강사 쇼케이스 페이지에 내 브랜드·강의 수·학습자 수가 공개돼요.
						새로운 수강생에게 노출될 수 있는 좋은 기회예요!
					</p>

					<a href="#"
						className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 mt-3"
					>
						쇼케이스 페이지 미리보기
						<ExternalLink size={11} />
					</a>
				</div>

				{/* 공개 항목 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-3">공개되는 정보</h2>
					<ul className="flex flex-col gap-2 text-sm text-muted-foreground">
						{[
							'브랜드 이름 (사이트 설정에서 입력한 이름)',
							'강의 수 (공개된 강의만)',
							'누적 학습자 수',
							'대표 강의 썸네일 1개',
						].map((item) => (
							<li key={item} className="flex items-center gap-2">
								<div className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
								{item}
							</li>
						))}
					</ul>
					<div className="mt-3 pt-3 border-t border-border">
						<p className="text-xs text-muted-foreground">
							개인 연락처, 정산 정보 등 민감한 정보는 공개되지 않아요
						</p>
					</div>
				</div>

				{/* 동의 토글 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-sm font-semibold text-foreground">쇼케이스 공개 동의</p>
							<p className="text-xs text-muted-foreground mt-1">
								동의하면 플랫폼 공식 사이트 쇼케이스에 내 브랜드가 노출돼요.
								언제든지 변경할 수 있어요.
							</p>
						</div>
						<button
							onClick={() => setAgreed((p) => !p)}
							className={cn(
								'relative w-11 h-6 rounded-full transition-colors shrink-0 mt-0.5',
								agreed ? 'bg-brand-500' : 'bg-gray-200'
							)}
						>
							<div className={cn(
								'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform',
								agreed ? 'translate-x-6' : 'translate-x-1'
							)} />
						</button>
					</div>
				</div>

			</div>
		</div>
	)
}