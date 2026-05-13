import { useState } from 'react'
import { Save, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/common/PageHeader'
import SitePreview from '@/components/preview/SitePreview'
import { cn } from '@/lib/utils'

const colorPresets = [
	{ id: 'green', label: '브랜드 그린', primary: '#0bb489', secondary: '#e6faf5' },
	{ id: 'blue', label: '오션 블루', primary: '#3b82f6', secondary: '#eff6ff' },
	{ id: 'purple', label: '로열 퍼플', primary: '#8b5cf6', secondary: '#f5f3ff' },
	{ id: 'orange', label: '선셋 오렌지', primary: '#f97316', secondary: '#fff7ed' },
	{ id: 'rose', label: '로즈 핑크', primary: '#f43f5e', secondary: '#fff1f2' },
	{ id: 'slate', label: '모던 슬레이트', primary: '#475569', secondary: '#f8fafc' },
]

const fontPresets = [
	{ id: 'pretendard', label: 'Pretendard', desc: '깔끔하고 현대적인 한국어 폰트' },
	{ id: 'noto', label: 'Noto Sans KR', desc: '가독성이 뛰어난 구글 폰트' },
	{ id: 'nanum', label: '나눔고딕', desc: '친근하고 부드러운 느낌' },
]

const layoutPresets = [
	{ id: 'modern', label: '모던', desc: '여백이 넉넉하고 미니멀한 레이아웃' },
	{ id: 'classic', label: '클래식', desc: '전통적인 강의 플랫폼 스타일' },
	{ id: 'bold', label: '볼드', desc: '강렬한 색상과 굵은 타이포그래피' },
]

export default function ThemeSettingsPage() {
	const [selectedColor, setSelectedColor] = useState('green')
	const [selectedFont, setSelectedFont] = useState('pretendard')
	const [selectedLayout, setSelectedLayout] = useState('modern')
	const [customColor, setCustomColor] = useState('')

	const currentPreset = colorPresets.find((c) => c.id === selectedColor)
	const primaryColor = customColor || currentPreset?.primary || '#0bb489'
	const secondaryColor = currentPreset?.secondary || '#e6faf5'

	return (
		<div>
			<PageHeader
				title="테마 설정"
				description="학습자 사이트의 색상, 폰트, 레이아웃을 설정해요"
				actions={
					<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
						<Save size={14} />
						저장
					</Button>
				}
			/>

			{/* 2단 레이아웃 — 왼쪽 설정 / 오른쪽 미리보기 */}
			<div className="flex gap-6">

				{/* 왼쪽 — 설정 패널 */}
				<div className="flex flex-col gap-5 w-80 shrink-0">

					{/* 색상 */}
					<div className="bg-white rounded-xl border border-border p-5">
						<h2 className="text-sm font-semibold text-foreground mb-4">브랜드 색상</h2>
						<div className="grid grid-cols-2 gap-2">
							{colorPresets.map((preset) => (
								<button
									key={preset.id}
									onClick={() => {
										setSelectedColor(preset.id)
										setCustomColor('')
									}}
									className={cn(
										'flex items-center gap-2 p-2.5 rounded-lg border transition-colors text-left',
										selectedColor === preset.id && !customColor
											? 'border-brand-400 bg-brand-50/50'
											: 'border-border hover:border-brand-200'
									)}
								>
									<div
										className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
										style={{ background: preset.primary }}
									>
										{selectedColor === preset.id && !customColor && (
											<Check size={12} className="text-white" strokeWidth={3} />
										)}
									</div>
									<span className="text-xs font-medium text-foreground">{preset.label}</span>
								</button>
							))}
						</div>

						{/* 커스텀 색상 */}
						<div className="mt-3 pt-3 border-t border-border">
							<Label className="text-xs text-muted-foreground mb-2 block">직접 입력</Label>
							<div className="flex items-center gap-2">
								<input
									type="color"
									value={customColor || currentPreset?.primary || '#0bb489'}
									onChange={(e) => {
										setCustomColor(e.target.value)
										setSelectedColor('')
									}}
									className="w-9 h-9 rounded-lg border border-border cursor-pointer"
								/>
								<span className="text-xs text-muted-foreground font-mono">
									{primaryColor}
								</span>
							</div>
						</div>
					</div>

					{/* 폰트 */}
					<div className="bg-white rounded-xl border border-border p-5">
						<h2 className="text-sm font-semibold text-foreground mb-4">폰트</h2>
						<div className="flex flex-col gap-2">
							{fontPresets.map((font) => (
								<label
									key={font.id}
									className={cn(
										'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
										selectedFont === font.id
											? 'border-brand-400 bg-brand-50/50'
											: 'border-border hover:border-brand-200'
									)}
								>
									<input
										type="radio"
										name="font"
										checked={selectedFont === font.id}
										onChange={() => setSelectedFont(font.id)}
										className="accent-brand-500"
									/>
									<div>
										<p className="text-sm font-medium text-foreground">{font.label}</p>
										<p className="text-xs text-muted-foreground">{font.desc}</p>
									</div>
								</label>
							))}
						</div>
					</div>

					{/* 레이아웃 */}
					<div className="bg-white rounded-xl border border-border p-5">
						<h2 className="text-sm font-semibold text-foreground mb-4">레이아웃 스타일</h2>
						<div className="flex flex-col gap-2">
							{layoutPresets.map((layout) => (
								<label
									key={layout.id}
									className={cn(
										'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
										selectedLayout === layout.id
											? 'border-brand-400 bg-brand-50/50'
											: 'border-border hover:border-brand-200'
									)}
								>
									<input
										type="radio"
										name="layout"
										checked={selectedLayout === layout.id}
										onChange={() => setSelectedLayout(layout.id)}
										className="accent-brand-500"
									/>
									<div>
										<p className="text-sm font-medium text-foreground">{layout.label}</p>
										<p className="text-xs text-muted-foreground">{layout.desc}</p>
									</div>
								</label>
							))}
						</div>
					</div>

				</div>

				{/* 오른쪽 — 실시간 미리보기 */}
				<div className="flex-1">
					<div className="bg-white rounded-xl border border-border p-5 sticky top-6">
						<h2 className="text-sm font-semibold text-foreground mb-4">실시간 미리보기</h2>
						<SitePreview
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
						/>
					</div>
				</div>

			</div>
		</div>
	)
}