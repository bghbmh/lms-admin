import { useState } from 'react'
import { CheckCircle2, AlertCircle, Clock, ExternalLink, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/common/PageHeader'
import { dummySiteSettings } from '@/data/settings'
import { cn } from '@/lib/utils'

const domainStatusConfig = {
	connected: {
		label: '연결됨',
		icon: <CheckCircle2 size={14} className="text-brand-500" />,
		className: 'text-brand-600 bg-brand-50 border-brand-200',
	},
	pending: {
		label: '확인 중',
		icon: <Clock size={14} className="text-amber-500" />,
		className: 'text-amber-600 bg-amber-50 border-amber-200',
	},
	error: {
		label: '연결 실패',
		icon: <AlertCircle size={14} className="text-destructive" />,
		className: 'text-destructive bg-destructive/10 border-destructive/20',
	},
}

export default function SettingsDomainPage() {
	const [customDomain, setCustomDomain] = useState(dummySiteSettings.customDomain ?? '')
	const domainStatus = dummySiteSettings.domainStatus as keyof typeof domainStatusConfig
	const config = domainStatusConfig[domainStatus]

	return (
		<div>
			<PageHeader
				title="도메인 관리"
				description="커스텀 도메인을 연결해서 나만의 주소로 사이트를 운영해요"
			/>

			<div className="flex flex-col gap-5 max-w-2xl">

				{/* 기본 서브도메인 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-3">기본 주소</h2>
					<p className="text-xs text-muted-foreground mb-3">
						모든 플랜에서 기본으로 제공되는 주소예요
					</p>
					<div className="flex items-center gap-2">
						<div className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm font-mono text-foreground">
							{dummySiteSettings.subdomain}.lms.co.kr
						</div>
						<span className="flex items-center gap-1 text-xs text-brand-600 shrink-0">
							<CheckCircle2 size={13} />
							항상 연결됨
						</span>
					</div>
				</div>

				{/* 커스텀 도메인 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<div className="flex items-center justify-between mb-1">
						<h2 className="text-sm font-semibold text-foreground">커스텀 도메인</h2>
						<span className="text-xs text-muted-foreground bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
							스타터 이상
						</span>
					</div>
					<p className="text-xs text-muted-foreground mb-4">
						보유한 도메인을 연결하면 나만의 주소로 사이트를 운영할 수 있어요
					</p>

					<div className="flex flex-col gap-4">
						<label className="flex flex-col gap-1.5">
							<Label>도메인 주소</Label>
							<div className="flex gap-2">
								<Input
									name="customDomain"
									placeholder="www.mysite.com"
									value={customDomain}
									onChange={(e) => setCustomDomain(e.target.value)}
									className="flex-1"
								/>
								<Button
									size="sm"
									className="bg-brand-500 hover:bg-brand-600 text-white gap-1 shrink-0"
								>
									<Save size={13} />
									저장
								</Button>
							</div>
						</label>

						{/* 연결 상태 */}
						{customDomain && (
							<div className={cn(
								'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm',
								config.className
							)}>
								{config.icon}
								<span className="font-medium">{customDomain}</span>
								<span className="text-xs ml-auto">{config.label}</span>
							</div>
						)}
					</div>
				</div>

				{/* DNS 설정 안내 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-3">DNS 설정 방법</h2>
					<p className="text-xs text-muted-foreground mb-4">
						도메인 등록 업체의 DNS 설정에서 아래 값을 추가해주세요
					</p>

					<div className="flex flex-col gap-3">
						{[
							{ type: 'CNAME', name: 'www', value: 'cname.lms.co.kr', desc: 'www 주소 연결' },
							{ type: 'A', name: '@', value: '123.456.789.0', desc: '루트 도메인 연결 (선택)' },
						].map((record) => (
							<div key={record.type} className="rounded-lg border border-border overflow-hidden">
								<div className="flex items-center px-3 py-1.5 bg-gray-50/50 border-b border-border">
									<span className="text-xs font-medium text-muted-foreground">{record.desc}</span>
								</div>
								<div className="grid grid-cols-3 gap-0 text-xs">
									<div className="px-3 py-2 border-r border-border">
										<p className="text-muted-foreground mb-0.5">타입</p>
										<p className="font-mono font-medium text-foreground">{record.type}</p>
									</div>
									<div className="px-3 py-2 border-r border-border">
										<p className="text-muted-foreground mb-0.5">이름</p>
										<p className="font-mono font-medium text-foreground">{record.name}</p>
									</div>
									<div className="px-3 py-2">
										<p className="text-muted-foreground mb-0.5">값</p>
										<p className="font-mono font-medium text-foreground">{record.value}</p>
									</div>
								</div>
							</div>
						))}
					</div>


					<a href="https://docs.lms.co.kr/domain"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 mt-4"
					>
						도메인 연결 자세한 안내 보기
						<ExternalLink size={11} />
					</a>
				</div>

			</div>
		</div>
	)
}