import { useState } from 'react'
import { Save, Globe, Palette, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/common/PageHeader'
import { dummySiteSettings } from '@/data/settings'

export default function SiteSettingsPage() {
	const [form, setForm] = useState({
		brandName: dummySiteSettings.brandName,
		subdomain: dummySiteSettings.subdomain,
		description: '영어가 처음인 분들을 위한 기초 회화 강의 사이트입니다.',
		contactEmail: 'hello@hongenglish.com',
		contactPhone: '010-1234-5678',
		kakaoChannel: '_xLMSAdmin',
		footerText: '© 2025 홍쌤 영어연구소. All rights reserved.',
	})

	const handleChange = (key: keyof typeof form) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setForm((prev) => ({ ...prev, [key]: e.target.value }))
		}

	return (
		<div>
			<PageHeader
				title="사이트 설정"
				description="학습자에게 보여지는 사이트 기본 정보를 설정해요"
				actions={
					<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
						<Save size={14} />
						저장
					</Button>
				}
			/>

			<div className="flex flex-col gap-5 max-w-2xl">

				{/* 기본 정보 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<div className="flex items-center gap-2 mb-4">
						<Globe size={15} className="text-brand-500" />
						<h2 className="text-sm font-semibold text-foreground">사이트 기본 정보</h2>
					</div>
					<div className="flex flex-col gap-4">

						<label className="flex flex-col gap-1.5">
							<Label>사이트 이름</Label>
							<Input
								name="brandName"
								value={form.brandName}
								onChange={handleChange('brandName')}
								placeholder="예: 홍쌤 영어연구소"
							/>
						</label>

						<label className="flex flex-col gap-1.5">
							<Label>사이트 소개</Label>
							<textarea
								name="description"
								value={form.description}
								onChange={handleChange('description')}
								rows={3}
								className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
								placeholder="사이트를 소개하는 짧은 문구를 입력해주세요"
							/>
							<p className="text-xs text-muted-foreground">검색엔진 및 SNS 공유 시 표시돼요</p>
						</label>

						<div className="flex gap-3">
							<label className="flex flex-col gap-1.5 flex-1">
								<Label>문의 이메일</Label>
								<Input
									name="contactEmail"
									type="email"
									value={form.contactEmail}
									onChange={handleChange('contactEmail')}
									placeholder="contact@example.com"
								/>
							</label>
							<label className="flex flex-col gap-1.5 flex-1">
								<Label>문의 전화번호</Label>
								<Input
									name="contactPhone"
									value={form.contactPhone}
									onChange={handleChange('contactPhone')}
									placeholder="010-0000-0000"
								/>
							</label>
						</div>

					</div>
				</div>

				{/* 푸터 설정 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<div className="flex items-center gap-2 mb-4">
						<Type size={15} className="text-brand-500" />
						<h2 className="text-sm font-semibold text-foreground">푸터</h2>
					</div>
					<label className="flex flex-col gap-1.5">
						<Label>푸터 문구</Label>
						<Input
							name="footerText"
							value={form.footerText}
							onChange={handleChange('footerText')}
							placeholder="© 2025 사이트명. All rights reserved."
						/>
						<p className="text-xs text-muted-foreground">사이트 하단에 표시되는 문구예요</p>
					</label>
				</div>

				{/* OG 이미지 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<div className="flex items-center gap-2 mb-1">
						<Palette size={15} className="text-brand-500" />
						<h2 className="text-sm font-semibold text-foreground">대표 이미지 (OG Image)</h2>
					</div>
					<p className="text-xs text-muted-foreground mb-4">
						카카오톡, SNS 공유 시 표시되는 이미지예요. 권장 크기: 1200×630px
					</p>
					<div className="aspect-[1200/630] max-w-sm bg-muted rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border cursor-pointer hover:border-brand-300 hover:bg-brand-50/50 transition-colors">
						<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
							<Palette size={18} className="text-muted-foreground" />
						</div>
						<p className="text-xs text-muted-foreground">이미지 업로드</p>
					</div>
				</div>

			</div>
		</div>
	)
}