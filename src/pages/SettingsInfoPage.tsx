import { useState } from 'react'
import { Save, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/common/PageHeader'
import { dummySiteSettings } from '@/data/settings'

export default function SettingsInfoPage() {
	const [form, setForm] = useState({
		brandName: dummySiteSettings.brandName,
		subdomain: dummySiteSettings.subdomain,
		customDomain: dummySiteSettings.customDomain ?? '',
		businessNumber: dummySiteSettings.businessNumber ?? '',
		bankAccount: dummySiteSettings.bankAccount ?? '',
	})

	const handleChange = (key: string, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }))
	}

	const domainStatus = dummySiteSettings.domainStatus

	return (
		<div>
			<PageHeader
				title="기본 정보"
				description="사이트 이름, 도메인, 사업자 정보를 관리해요"
				actions={
					<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
						<Save size={14} />
						저장
					</Button>
				}
			/>

			<div className="flex flex-col gap-5 max-w-2xl">

				{/* 브랜드 정보 */}
				<Section title="브랜드 정보">
					<Field label="사이트 이름">
						<Input
							value={form.brandName}
							onChange={(e) => handleChange('brandName', e.target.value)}
							placeholder="홍쌤 영어연구소"
						/>
					</Field>
					<Field label="서브도메인" description="플랫폼 기본 주소예요">
						<div className="flex items-center gap-2">
							<Input
								value={form.subdomain}
								onChange={(e) => handleChange('subdomain', e.target.value)}
								placeholder="honggd"
								className="max-w-48"
							/>
							<span className="text-sm text-muted-foreground">.lms.co.kr</span>
						</div>
					</Field>
					<Field label="커스텀 도메인" description="스타터 이상 플랜에서 사용 가능">
						<div className="flex items-center gap-2">
							<Input
								value={form.customDomain}
								onChange={(e) => handleChange('customDomain', e.target.value)}
								placeholder="www.mysite.com"
							/>
							{domainStatus === 'connected' ? (
								<span className="flex items-center gap-1 text-xs text-brand-600 whitespace-nowrap">
									<CheckCircle2 size={13} />
									연결됨
								</span>
							) : (
								<span className="flex items-center gap-1 text-xs text-amber-600 whitespace-nowrap">
									<AlertCircle size={13} />
									미연결
								</span>
							)}
						</div>
					</Field>
				</Section>

				{/* 사업자 정보 */}
				<Section title="사업자 정보">
					<Field label="사업자등록번호" description="세금계산서 발행 시 필요해요">
						<Input
							value={form.businessNumber}
							onChange={(e) => handleChange('businessNumber', e.target.value)}
							placeholder="123-45-67890"
							className="max-w-64"
						/>
					</Field>
					<Field label="정산 계좌" description="수익금을 받을 계좌를 입력해 주세요">
						<Input
							value={form.bankAccount}
							onChange={(e) => handleChange('bankAccount', e.target.value)}
							placeholder="은행명 계좌번호"
						/>
					</Field>
				</Section>

			</div>
		</div>
	)
}

// 섹션 래퍼
function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="bg-white rounded-xl border border-border p-5">
			<h2 className="text-sm font-semibold text-foreground mb-4">{title}</h2>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	)
}

// 필드 래퍼
function Field({
	label,
	description,
	children,
}: {
	label: string
	description?: string
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<Label className="text-sm font-medium text-foreground">{label}</Label>
			{description && (
				<p className="text-xs text-muted-foreground -mt-0.5">{description}</p>
			)}
			{children}
		</div>
	)
}