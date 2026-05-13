import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SitePreviewProps {
	primaryColor: string
	secondaryColor: string
}

type PreviewTab = 'main' | 'courses' | 'detail'

// 브랜드 색상이 적용되는 부분을 하이라이트로 표시
function Highlight({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn('relative group', className)}>
			{children}
			{/* 하이라이트 링 */}
			<div className="absolute inset-0 ring-2 ring-blue-400 ring-offset-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
			{/* 툴팁 */}
			<div className="absolute -top-7 left-0 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
				브랜드 색상 적용
			</div>
		</div>
	)
}

// ── 메인 페이지 미리보기 ──────────────────────────────────
function MainPreview({ primary, secondary }: { primary: string; secondary: string }) {
	return (
		<div className="bg-white text-[10px]">
			{/* GNB */}
			<Highlight>
				<div
					className="flex items-center justify-between px-4 py-2"
					style={{ background: primary }}
				>
					<span className="text-white font-bold text-[11px]">홍쌤 영어연구소</span>
					<div className="flex gap-2 text-white/80">
						<span>강의</span>
						<span>소개</span>
					</div>
					<div
						className="px-2 py-0.5 rounded text-[9px] font-medium"
						style={{ background: 'white', color: primary }}
					>
						수강신청
					</div>
				</div>
			</Highlight>

			{/* 히어로 배너 */}
			<Highlight>
				<div
					className="px-4 py-6 flex flex-col items-center text-center"
					style={{ background: secondary }}
				>
					<p className="font-bold text-[13px] text-gray-800">영어가 처음이어도 괜찮아요!</p>
					<p className="text-gray-500 mt-1 text-[9px]">왕초보도 3개월이면 회화가 되는 홍쌤 영어연구소</p>
					<div
						className="mt-3 px-3 py-1.5 rounded-full text-white text-[9px] font-medium"
						style={{ background: primary }}
					>
						강의 둘러보기
					</div>
				</div>
			</Highlight>

			{/* 강의 카드 목록 */}
			<div className="px-4 py-4">
				<p className="font-semibold text-[11px] text-gray-700 mb-3">인기 강의</p>
				<div className="grid grid-cols-2 gap-2">
					{['왕초보 영어회화', '비즈니스 영어'].map((title) => (
						<div key={title} className="border border-gray-100 rounded-lg overflow-hidden">
							<div className="h-12" style={{ background: secondary }} />
							<div className="p-2">
								<p className="font-medium text-gray-800 text-[9px]">{title}</p>
								<Highlight className="mt-1">
									<span
										className="text-[9px] font-bold"
										style={{ color: primary }}
									>
										49,000원
									</span>
								</Highlight>
								<Highlight className="mt-1.5">
									<div
										className="text-center py-0.5 rounded text-white text-[8px]"
										style={{ background: primary }}
									>
										수강신청
									</div>
								</Highlight>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 수료 실적 */}
			<Highlight>
				<div
					className="px-4 py-3 flex justify-around text-center"
					style={{ background: secondary }}
				>
					{[['1,200+', '누적 수강생'], ['94%', '수료율'], ['12개', '강의 수']].map(([val, label]) => (
						<div key={label}>
							<p className="font-bold text-[11px]" style={{ color: primary }}>{val}</p>
							<p className="text-gray-500 text-[8px]">{label}</p>
						</div>
					))}
				</div>
			</Highlight>

			{/* 푸터 */}
			<div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
				<span className="text-gray-400 text-[8px]">© 2025 홍쌤 영어연구소</span>
				<Highlight>
					<span className="text-[8px] font-medium" style={{ color: primary }}>카카오 문의</span>
				</Highlight>
			</div>
		</div>
	)
}

// ── 강의 목록 미리보기 ──────────────────────────────────
function CoursesPreview({ primary, secondary }: { primary: string; secondary: string }) {
	return (
		<div className="bg-white text-[10px]">
			{/* GNB */}
			<Highlight>
				<div className="flex items-center px-4 py-2" style={{ background: primary }}>
					<span className="text-white font-bold text-[11px]">홍쌤 영어연구소</span>
				</div>
			</Highlight>

			<div className="px-4 py-4">
				<p className="font-bold text-[12px] text-gray-800 mb-3">전체 강의</p>

				{/* 탭 필터 */}
				<Highlight className="mb-3">
					<div className="flex gap-2">
						{['전체', 'VOD', '라이브'].map((tab, i) => (
							<div
								key={tab}
								className="px-2.5 py-1 rounded-full text-[9px] font-medium"
								style={
									i === 0
										? { background: primary, color: 'white' }
										: { background: '#f3f4f6', color: '#6b7280' }
								}
							>
								{tab}
							</div>
						))}
					</div>
				</Highlight>

				{/* 강의 카드 */}
				<div className="flex flex-col gap-2">
					{[
						{ title: '왕초보 영어회화', price: '49,000원', badge: '인기' },
						{ title: '비즈니스 영어 이메일', price: '59,000원', badge: 'NEW' },
						{ title: '영어 발음 교정', price: '89,000원', badge: '' },
					].map((course) => (
						<div key={course.title} className="flex gap-2 border border-gray-100 rounded-lg p-2">
							<div className="w-16 h-10 rounded shrink-0" style={{ background: secondary }} />
							<div className="flex-1">
								<div className="flex items-center gap-1">
									<p className="font-medium text-gray-800 text-[9px]">{course.title}</p>
									{course.badge && (
										<Highlight>
											<span
												className="text-[7px] px-1 py-0.5 rounded font-medium text-white"
												style={{ background: primary }}
											>
												{course.badge}
											</span>
										</Highlight>
									)}
								</div>
								<p className="text-gray-400 text-[8px] mt-0.5">수강생 128명</p>
								<Highlight className="mt-1">
									<span className="font-bold text-[9px]" style={{ color: primary }}>
										{course.price}
									</span>
								</Highlight>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

// ── 강의 상세 미리보기 ──────────────────────────────────
function DetailPreview({ primary, secondary }: { primary: string; secondary: string }) {
	return (
		<div className="bg-white text-[10px]">
			{/* GNB */}
			<Highlight>
				<div className="flex items-center px-4 py-2" style={{ background: primary }}>
					<span className="text-white font-bold text-[11px]">홍쌤 영어연구소</span>
				</div>
			</Highlight>

			{/* 강의 헤더 */}
			<Highlight>
				<div className="px-4 py-4" style={{ background: secondary }}>
					<p className="font-bold text-[12px] text-gray-800">왕초보 영어회화</p>
					<p className="text-gray-500 text-[9px] mt-1">영어가 처음인 분들을 위한 기초 회화</p>
					<div className="flex items-center gap-2 mt-2">
						<span className="text-[11px] font-bold" style={{ color: primary }}>49,000원</span>
						<span className="text-gray-400 line-through text-[9px]">79,000원</span>
					</div>
				</div>
			</Highlight>

			<div className="px-4 py-3">
				{/* 수강신청 버튼 */}
				<Highlight className="mb-3">
					<div
						className="text-center py-2 rounded-lg text-white text-[10px] font-bold"
						style={{ background: primary }}
					>
						수강신청하기
					</div>
				</Highlight>

				{/* 커리큘럼 */}
				<p className="font-semibold text-[11px] text-gray-700 mb-2">커리큘럼</p>
				<div className="flex flex-col gap-1">
					{['1차시. be동사란?', '2차시. be동사 부정문', '3차시. 의문문 만들기'].map((ch, i) => (
						<div key={ch} className="flex items-center gap-2 py-1.5 border-b border-gray-50">
							<Highlight>
								<div
									className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] shrink-0"
									style={{ background: i === 0 ? primary : '#e5e7eb' }}
								>
									{i + 1}
								</div>
							</Highlight>
							<span className="text-gray-700 text-[9px]">{ch}</span>
							{i === 0 && (
								<Highlight className="ml-auto">
									<span
										className="text-[7px] px-1 py-0.5 rounded border text-[8px]"
										style={{ color: primary, borderColor: primary }}
									>
										무료 공개
									</span>
								</Highlight>
							)}
						</div>
					))}
				</div>

				{/* 강사 소개 */}
				<div className="mt-3 flex items-center gap-2">
					<div className="w-8 h-8 rounded-full shrink-0" style={{ background: secondary }} />
					<div>
						<p className="font-medium text-[9px] text-gray-800">홍길동 강사</p>
						<Highlight>
							<p className="text-[8px]" style={{ color: primary }}>10년 경력 영어 전문가</p>
						</Highlight>
					</div>
				</div>
			</div>
		</div>
	)
}

// ── 메인 컴포넌트 ──────────────────────────────────────
export default function SitePreview({ primaryColor, secondaryColor }: SitePreviewProps) {
	const [activeTab, setActiveTab] = useState<PreviewTab>('main')

	const tabs: { id: PreviewTab; label: string }[] = [
		{ id: 'main', label: '메인' },
		{ id: 'courses', label: '강의목록' },
		{ id: 'detail', label: '강의상세' },
	]

	return (
		<div className="flex flex-col h-full">
			{/* 탭 */}
			<div className="flex items-center gap-1 mb-3">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={cn(
							'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
							activeTab === tab.id
								? 'text-white'
								: 'text-muted-foreground hover:bg-muted'
						)}
						style={activeTab === tab.id ? { background: primaryColor } : {}}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* 안내 텍스트 */}
			<div className="flex items-center gap-1.5 mb-2">
				<div className="w-2 h-2 rounded-full bg-blue-400" />
				<p className="text-xs text-muted-foreground">
					항목에 마우스를 올리면 브랜드 색상 적용 범위를 확인할 수 있어요
				</p>
			</div>

			{/* 브라우저 프레임 */}
			<div className="flex-1 border border-border rounded-xl overflow-hidden shadow-sm">
				{/* 브라우저 바 */}
				<div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-border">
					<div className="w-2.5 h-2.5 rounded-full bg-red-400" />
					<div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
					<div className="w-2.5 h-2.5 rounded-full bg-green-400" />
					<div className="flex-1 mx-2 bg-white rounded px-2 py-0.5 text-xs text-muted-foreground">
						honggd.lms.co.kr
					</div>
				</div>

				{/* 미리보기 컨텐츠 */}
				<div className="overflow-y-auto" style={{ maxHeight: 480 }}>
					{activeTab === 'main' && (
						<MainPreview primary={primaryColor} secondary={secondaryColor} />
					)}
					{activeTab === 'courses' && (
						<CoursesPreview primary={primaryColor} secondary={secondaryColor} />
					)}
					{activeTab === 'detail' && (
						<DetailPreview primary={primaryColor} secondary={secondaryColor} />
					)}
				</div>
			</div>
		</div>
	)
}