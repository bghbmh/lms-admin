import { useState } from 'react'
import { Save, Eye, EyeOff, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/common/PageHeader'
import { dummySiteSettings } from '@/data/settings'
import { cn } from '@/lib/utils'

export default function SettingsPgPage() {
	const [mode, setMode] = useState<'test' | 'live'>(dummySiteSettings.tossMode)
	const [clientKey, setClientKey] = useState(dummySiteSettings.tossClientKey ?? '')
	const [secretKey, setSecretKey] = useState(dummySiteSettings.tossSecretKey ?? '')
	const [showSecret, setShowSecret] = useState(false)

	return (
		<div>
			<PageHeader
				title="결제 PG 연동"
				description="토스페이먼츠 API 키를 입력하고 결제 환경을 설정해요"
				actions={
					<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
						<Save size={14} />
						저장
					</Button>
				}
			/>

			<div className="flex flex-col gap-5 max-w-2xl">

				{/* 연동 모드 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">연동 모드</h2>
					<div className="flex gap-3">
						{(['test', 'live'] as const).map((m) => (
							<button
								key={m}
								onClick={() => setMode(m)}
								className={cn(
									'flex-1 py-3 rounded-lg border text-sm font-medium transition-colors',
									mode === m
										? 'border-brand-500 bg-brand-50 text-brand-700'
										: 'border-border text-muted-foreground hover:border-brand-200'
								)}
							>
								{m === 'test' ? '🧪 테스트 모드' : '🚀 라이브 모드'}
								<p className="text-xs font-normal mt-0.5 text-muted-foreground">
									{m === 'test' ? '개발·테스트용 — 실제 결제 안 됨' : '실제 결제 활성화'}
								</p>
							</button>
						))}
					</div>

					{mode === 'live' && (
						<div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
							<p className="text-xs text-amber-700">
								라이브 모드에서는 실제 결제가 발생해요. 토스페이먼츠 대시보드에서 발급받은 라이브 키를 입력해 주세요.
							</p>
						</div>
					)}
				</div>

				{/* API 키 입력 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-sm font-semibold text-foreground">API 키</h2>

						<a href="https://developers.tosspayments.com"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700"
						>
							토스페이먼츠 대시보드
							<ExternalLink size={11} />
						</a>
					</div>

					<div className="flex flex-col gap-4">
						{/* 클라이언트 키 */}
						<div className="flex flex-col gap-1.5">
							<Label className="text-sm font-medium">
								{mode === 'test' ? '테스트' : '라이브'} 클라이언트 키
							</Label>
							<Input
								value={clientKey}
								onChange={(e) => setClientKey(e.target.value)}
								placeholder={`${mode}_ck_...`}
							/>
						</div>

						{/* 시크릿 키 */}
						<div className="flex flex-col gap-1.5">
							<Label className="text-sm font-medium">
								{mode === 'test' ? '테스트' : '라이브'} 시크릿 키
							</Label>
							<p className="text-xs text-muted-foreground -mt-0.5">
								서버에서만 사용돼요. 외부에 노출하지 마세요.
							</p>
							<div className="relative">
								<Input
									type={showSecret ? 'text' : 'password'}
									value={secretKey}
									onChange={(e) => setSecretKey(e.target.value)}
									placeholder={`${mode}_sk_...`}
									className="pr-10"
								/>
								<button
									type="button"
									onClick={() => setShowSecret((p) => !p)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								>
									{showSecret ? <EyeOff size={15} /> : <Eye size={15} />}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* 연결 테스트 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-2">연결 테스트</h2>
					<p className="text-xs text-muted-foreground mb-4">
						키를 저장한 후 연결 테스트를 실행해 올바른 키인지 확인해 주세요.
					</p>
					<Button variant="outline" size="sm">
						연결 테스트 실행
					</Button>
				</div>

			</div>
		</div >
	)
}