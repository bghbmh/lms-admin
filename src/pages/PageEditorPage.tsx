import { useState } from 'react'
import { Save, GripVertical, Eye, EyeOff, Plus, ChevronDown, ChevronRight, Image, Type, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/common/PageHeader'
import { cn } from '@/lib/utils'

interface PageBlock {
	id: string
	type: 'banner' | 'instructor' | 'achievement' | 'courses' | 'cta'
	label: string
	icon: React.ReactNode
	isVisible: boolean
	isOpen: boolean
}

const initialBlocks: PageBlock[] = [
	{ id: 'banner', type: 'banner', label: '메인 배너', icon: <Image size={15} />, isVisible: true, isOpen: true },
	{ id: 'courses', type: 'courses', label: '강의 목록', icon: <Type size={15} />, isVisible: true, isOpen: false },
	{ id: 'instructor', type: 'instructor', label: '강사 소개', icon: <Users size={15} />, isVisible: true, isOpen: false },
	{ id: 'achievement', type: 'achievement', label: '수료 실적', icon: <Star size={15} />, isVisible: true, isOpen: false },
	{ id: 'cta', type: 'cta', label: 'CTA 버튼', icon: <Type size={15} />, isVisible: false, isOpen: false },
]

// 블록별 편집 폼
function BlockForm({ type }: { type: PageBlock['type'] }) {
	if (type === 'banner') {
		return (
			<div className="flex flex-col gap-3 pt-3">
				<label className="flex flex-col gap-1.5">
					<Label>배너 제목</Label>
					<Input defaultValue="영어가 처음이어도 괜찮아요!" />
				</label>
				<label className="flex flex-col gap-1.5">
					<Label>배너 부제목</Label>
					<Input defaultValue="왕초보도 3개월이면 회화가 되는 홍쌤 영어연구소" />
				</label>
				<label className="flex flex-col gap-1.5">
					<Label>버튼 텍스트</Label>
					<Input defaultValue="강의 둘러보기" />
				</label>
				<div className="flex flex-col gap-1.5">
					<Label>배너 이미지</Label>
					<div className="aspect-[3/1] max-w-sm bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-brand-300 transition-colors">
						<p className="text-xs text-muted-foreground">이미지 업로드</p>
					</div>
				</div>
			</div>
		)
	}
	if (type === 'instructor') {
		return (
			<div className="flex flex-col gap-3 pt-3">
				<label className="flex flex-col gap-1.5">
					<Label>강사 이름</Label>
					<Input defaultValue="홍길동 강사" />
				</label>
				<label className="flex flex-col gap-1.5">
					<Label>강사 소개</Label>
					<textarea
						defaultValue="10년 이상의 영어 교육 경력을 가진 전문 강사입니다."
						rows={3}
						className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
					/>
				</label>
				<div className="flex flex-col gap-1.5">
					<Label>프로필 사진</Label>
					<div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-brand-300 transition-colors">
						<p className="text-xs text-muted-foreground text-center">업로드</p>
					</div>
				</div>
			</div>
		)
	}
	if (type === 'achievement') {
		return (
			<div className="flex flex-col gap-3 pt-3">
				<div className="grid grid-cols-3 gap-3">
					{[
						{ label: '누적 수강생', defaultValue: '1,200+' },
						{ label: '수료율', defaultValue: '94%' },
						{ label: '강의 수', defaultValue: '12개' },
					].map((item) => (
						<label key={item.label} className="flex flex-col gap-1.5">
							<Label>{item.label}</Label>
							<Input defaultValue={item.defaultValue} />
						</label>
					))}
				</div>
			</div>
		)
	}
	if (type === 'cta') {
		return (
			<div className="flex flex-col gap-3 pt-3">
				<label className="flex flex-col gap-1.5">
					<Label>CTA 문구</Label>
					<Input defaultValue="지금 바로 시작해보세요!" />
				</label>
				<label className="flex flex-col gap-1.5">
					<Label>버튼 텍스트</Label>
					<Input defaultValue="수강 신청하기" />
				</label>
			</div>
		)
	}
	return (
		<div className="pt-3">
			<p className="text-xs text-muted-foreground">강의 목록은 자동으로 표시돼요</p>
		</div>
	)
}

export default function PageEditorPage() {
	const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks)

	const toggleVisible = (id: string) => {
		setBlocks((prev) =>
			prev.map((b) => (b.id === id ? { ...b, isVisible: !b.isVisible } : b))
		)
	}

	const toggleOpen = (id: string) => {
		setBlocks((prev) =>
			prev.map((b) => (b.id === id ? { ...b, isOpen: !b.isOpen } : b))
		)
	}

	return (
		<div>
			<PageHeader
				title="페이지 편집"
				description="학습자 사이트에 표시될 블록을 편집해요"
				actions={
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" className="gap-1">
							<Eye size={13} />
							미리보기
						</Button>
						<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
							<Save size={14} />
							저장
						</Button>
					</div>
				}
			/>

			<div className="flex gap-5">
				{/* 블록 편집 영역 */}
				<div className="flex-1 flex flex-col gap-3 max-w-2xl">
					{blocks.map((block) => (
						<div
							key={block.id}
							className={cn(
								'bg-white rounded-xl border overflow-hidden transition-colors',
								!block.isVisible ? 'opacity-50 border-border' : 'border-border'
							)}
						>
							{/* 블록 헤더 */}
							<div className="flex items-center gap-2 px-4 py-3 bg-gray-50/50">
								<GripVertical size={15} className="text-muted-foreground cursor-grab shrink-0" />
								<div className="flex items-center gap-1.5 text-sm font-medium text-foreground flex-1">
									{block.icon}
									{block.label}
								</div>

								{/* 표시/숨김 토글 */}
								<button
									onClick={() => toggleVisible(block.id)}
									className={cn(
										'flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors',
										block.isVisible
											? 'text-brand-600 bg-brand-50 hover:bg-brand-100'
											: 'text-muted-foreground bg-muted hover:bg-gray-200'
									)}
								>
									{block.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
									{block.isVisible ? '표시' : '숨김'}
								</button>

								<button
									onClick={() => toggleOpen(block.id)}
									className="text-muted-foreground shrink-0"
								>
									{block.isOpen
										? <ChevronDown size={15} />
										: <ChevronRight size={15} />
									}
								</button>
							</div>

							{/* 블록 편집 폼 */}
							{block.isOpen && block.isVisible && (
								<div className="px-4 pb-4">
									<BlockForm type={block.type} />
								</div>
							)}
						</div>
					))}

					{/* 블록 추가 */}
					<button className="flex items-center justify-center gap-2 text-sm text-brand-600 hover:text-brand-700 py-3 rounded-xl border-2 border-dashed border-brand-200 hover:border-brand-400 hover:bg-brand-50/50 transition-colors">
						<Plus size={15} />
						블록 추가
					</button>
				</div>

				{/* 오른쪽 미리보기 패널 */}
				<div className="w-72 shrink-0">
					<div className="bg-white rounded-xl border border-border p-4 sticky top-6">
						<h3 className="text-xs font-semibold text-muted-foreground mb-3">페이지 구조</h3>
						<div className="flex flex-col gap-1.5">
							{blocks.map((block, idx) => (
								<div
									key={block.id}
									className={cn(
										'flex items-center gap-2 px-2 py-1.5 rounded-md text-xs',
										block.isVisible ? 'text-foreground' : 'text-muted-foreground line-through'
									)}
								>
									<span className="text-muted-foreground w-4 shrink-0">{idx + 1}</span>
									<span className="flex items-center gap-1.5">
										{block.icon}
										{block.label}
									</span>
									{!block.isVisible && (
										<span className="ml-auto text-xs text-muted-foreground">숨김</span>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}