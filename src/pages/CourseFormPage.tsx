import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Plus, Trash2, GripVertical, ChevronDown,
	ChevronRight, Video, FileText, Save
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import PageHeader from '@/components/common/PageHeader'
import { cn } from '@/lib/utils'
import type { ChapterForm, LessonItemForm, CourseForm } from '@/types'

export default function CourseFormPage() {
	const navigate = useNavigate()

	const [form, setForm] = useState<CourseForm>({
		title: '',
		description: '',
		categoryId: '',
		courseType: 'vod',
		thumbnailUrl: '',
		price: '0',
		originalPrice: '',
		completionThreshold: '100',
		isPublished: false,
	})

	const [chapters, setChapters] = useState<ChapterForm[]>([
		{ id: 'chapter-1', title: '1차시.', lessons: [], isOpen: true },
	])

	// string 필드용 — 커링
	const handleTextChange = (key: keyof CourseForm) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setForm((prev) => ({ ...prev, [key]: e.target.value }))
		}

	// boolean 필드용
	const handleBoolChange = (key: keyof CourseForm, value: boolean) => {
		setForm((prev) => ({ ...prev, [key]: value }))
	}

	// Select — 제네릭으로 타입 안전
	const handleSelectChange = <K extends keyof CourseForm>(key: K, value: CourseForm[K]) => {
		setForm((prev) => ({ ...prev, [key]: value }))
	}

	// 차시 추가
	const addChapter = () => {
		setChapters((prev) => [
			...prev,
			{ id: `chapter-${Date.now()}`, title: `${prev.length + 1}차시.`, lessons: [], isOpen: true },
		])
	}

	// 차시 삭제
	const removeChapter = (chapterId: string) => {
		setChapters((prev) => prev.filter((c) => c.id !== chapterId))
	}

	// 차시 제목 수정
	const updateChapterTitle = (chapterId: string, title: string) => {
		setChapters((prev) => prev.map((c) => (c.id === chapterId ? { ...c, title } : c)))
	}

	// 차시 토글
	const toggleChapter = (chapterId: string) => {
		setChapters((prev) => prev.map((c) => (c.id === chapterId ? { ...c, isOpen: !c.isOpen } : c)))
	}

	// 레슨 추가
	const addLesson = (chapterId: string) => {
		setChapters((prev) =>
			prev.map((c) =>
				c.id === chapterId
					? {
						...c,
						lessons: [
							...c.lessons,
							{ id: `lesson-${Date.now()}`, title: '', contentType: 'video' as const, videoSource: 'youtube' as const, isFreePreview: false },
						],
					}
					: c
			)
		)
	}

	// 레슨 삭제
	const removeLesson = (chapterId: string, lessonId: string) => {
		setChapters((prev) =>
			prev.map((c) =>
				c.id === chapterId ? { ...c, lessons: c.lessons.filter((l) => l.id !== lessonId) } : c
			)
		)
	}

	// 레슨 수정
	const updateLesson = <K extends keyof LessonItemForm>(
		chapterId: string,
		lessonId: string,
		key: K,
		value: LessonItemForm[K]
	) => {
		setChapters((prev) =>
			prev.map((c) =>
				c.id === chapterId
					? { ...c, lessons: c.lessons.map((l) => (l.id === lessonId ? { ...l, [key]: value } : l)) }
					: c
			)
		)
	}

	const totalLessons = chapters.reduce((sum, c) => sum + c.lessons.length, 0)

	return (
		<div>
			<PageHeader
				title="강의 등록"
				description="새 강의를 만들어요"
				actions={
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" onClick={() => navigate('/courses')}>
							취소
						</Button>
						<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
							<Save size={14} />
							저장
						</Button>
					</div>
				}
			/>

			<Tabs defaultValue="basic" className="w-full">
				<TabsList className="mb-6 bg-white border border-border">
					<TabsTrigger value="basic">기본 정보</TabsTrigger>
					<TabsTrigger value="curriculum">
						커리큘럼
						<span className="ml-1.5 text-xs text-muted-foreground">
							{chapters.length}차시 · {totalLessons}개
						</span>
					</TabsTrigger>
					<TabsTrigger value="pricing">가격 · 공개</TabsTrigger>
				</TabsList>

				{/* ── 기본 정보 탭 ── */}
				<TabsContent value="basic">
					<div className="grid grid-cols-3 gap-5">
						<div className="col-span-2 flex flex-col gap-5">
							<div className="bg-white rounded-xl border border-border p-5">
								<h2 className="text-sm font-semibold text-foreground mb-4">강의 정보</h2>
								<div className="flex flex-col gap-4">

									{/* 강의 제목 */}
									<label className="flex flex-col gap-1.5">
										<Label>강의 제목 *</Label>
										<Input
											name="title"
											placeholder="예: 왕초보 영어회화 — be동사부터 시작"
											value={form.title}
											onChange={handleTextChange('title')}
										/>
									</label>

									{/* 강의 소개 */}
									<label className="flex flex-col gap-1.5">
										<Label>강의 소개</Label>
										<textarea
											name="description"
											placeholder="수강생에게 보여줄 강의 상세 설명을 입력해주세요"
											value={form.description}
											onChange={handleTextChange('description')}
											rows={5}
											className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
										/>
									</label>

									<div className="flex gap-3">
										{/* 강의 유형 — Select는 label로 감싸도 연결 안 되므로 htmlFor 방식 사용 */}
										<div className="flex flex-col gap-1.5 flex-1">
											<Label htmlFor="courseType">강의 유형</Label>
											<Select
												value={form.courseType}
												onValueChange={(v) =>
													handleSelectChange('courseType', v as CourseForm['courseType'])
												}
											>
												<SelectTrigger id="courseType" className="h-9">
													<SelectValue />
												</SelectTrigger>
												<SelectContent position="popper">
													<SelectItem value="vod">VOD (녹화 강의)</SelectItem>
													<SelectItem value="live">라이브 단독</SelectItem>
													<SelectItem value="live_bundle">라이브 + VOD</SelectItem>
												</SelectContent>
											</Select>
										</div>

										{/* 카테고리 */}
										<div className="flex flex-col gap-1.5 flex-1">
											<Label htmlFor="categoryId">카테고리</Label>
											<Select
												value={form.categoryId}
												onValueChange={(v) => handleSelectChange('categoryId', v as CourseForm['categoryId'])}
											>
												<SelectTrigger id="categoryId" className="h-9">
													<SelectValue placeholder="카테고리 선택" />
												</SelectTrigger>
												<SelectContent position="popper">
													<SelectItem value="cat-001">영어 회화</SelectItem>
													<SelectItem value="cat-002">비즈니스 영어</SelectItem>
													<SelectItem value="cat-003">발음 교정</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>

								</div>
							</div>
						</div>

						{/* 썸네일 */}
						<div className="flex flex-col gap-5">
							<div className="bg-white rounded-xl border border-border p-5">
								<h2 className="text-sm font-semibold text-foreground mb-4">썸네일</h2>
								<div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border cursor-pointer hover:border-brand-300 hover:bg-brand-50/50 transition-colors">
									<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
										<Plus size={18} className="text-muted-foreground" />
									</div>
									<p className="text-xs text-muted-foreground">이미지 업로드</p>
									<p className="text-xs text-muted-foreground">권장: 1280×720px</p>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>

				{/* ── 커리큘럼 탭 ── */}
				<TabsContent value="curriculum">
					<div className="flex flex-col gap-3 max-w-3xl">
						{chapters.map((chapter) => (
							<div key={chapter.id} className="bg-white rounded-xl border border-border overflow-hidden">

								{/* 차시 헤더 */}
								<div className="flex items-center gap-2 px-4 py-3 bg-gray-50/50 border-b border-border">
									<GripVertical size={15} className="text-muted-foreground cursor-grab shrink-0" />
									<button onClick={() => toggleChapter(chapter.id)} className="shrink-0 text-muted-foreground">
										{chapter.isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
									</button>
									<Input
										name="chapterTitle"
										value={chapter.title}
										onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
										className="flex-1 h-8 text-sm font-medium border-0 bg-transparent focus-visible:ring-0 px-0"
										placeholder="차시 제목 입력"
									/>
									<span className="text-xs text-muted-foreground shrink-0">{chapter.lessons.length}개</span>
									<button
										onClick={() => removeChapter(chapter.id)}
										className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
									>
										<Trash2 size={13} />
									</button>
								</div>

								{/* 레슨 목록 */}
								{chapter.isOpen && (
									<div className="p-3 flex flex-col gap-2">
										{chapter.lessons.map((lesson) => (
											<div key={lesson.id} className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-white">
												<div className="flex items-center gap-2">
													<GripVertical size={14} className="text-muted-foreground cursor-grab shrink-0" />

													{/* 콘텐츠 타입 토글 */}
													<div className="flex items-center border border-border rounded-md overflow-hidden shrink-0">
														<button
															onClick={() => updateLesson(chapter.id, lesson.id, 'contentType', 'video')}
															className={cn(
																'flex items-center gap-1 px-2 py-1 text-xs transition-colors',
																lesson.contentType === 'video' ? 'bg-brand-500 text-white' : 'text-muted-foreground hover:bg-muted'
															)}
														>
															<Video size={11} /> 영상
														</button>
														<button
															onClick={() => updateLesson(chapter.id, lesson.id, 'contentType', 'document')}
															className={cn(
																'flex items-center gap-1 px-2 py-1 text-xs transition-colors',
																lesson.contentType === 'document' ? 'bg-brand-500 text-white' : 'text-muted-foreground hover:bg-muted'
															)}
														>
															<FileText size={11} /> 문서
														</button>
													</div>

													<Input
														name="lessonTitle"
														value={lesson.title}
														onChange={(e) => updateLesson(chapter.id, lesson.id, 'title', e.target.value)}
														className="flex-1 h-8 text-sm"
														placeholder="콘텐츠 제목"
													/>

													{/* 무료 미리보기 — label로 감싸서 클릭 영역 확대 */}
													<label className="flex items-center gap-1 text-xs text-muted-foreground cursor-pointer shrink-0 whitespace-nowrap">
														<input
															type="checkbox"
															name="isFreePreview"
															checked={lesson.isFreePreview}
															onChange={(e) => updateLesson(chapter.id, lesson.id, 'isFreePreview', e.target.checked)}
															className="w-3.5 h-3.5 accent-brand-500"
														/>
														무료 공개
													</label>

													<button
														onClick={() => removeLesson(chapter.id, lesson.id)}
														className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
													>
														<Trash2 size={13} />
													</button>
												</div>

												{/* 영상 URL */}
												{lesson.contentType === 'video' && (
													<div className="flex gap-2 ml-6">
														<Select
															value={lesson.videoSource ?? 'youtube'}
															onValueChange={(v) => updateLesson(chapter.id, lesson.id, 'videoSource', v as LessonItemForm['videoSource'])}
														>
															<SelectTrigger className="w-28 h-8 text-xs">
																<SelectValue />
															</SelectTrigger>
															<SelectContent position="popper" >
																<SelectItem value="youtube">YouTube</SelectItem>
																<SelectItem value="bunny">Bunny.net</SelectItem>
															</SelectContent>
														</Select>
														<Input
															name="videoUrl"
															placeholder={lesson.videoSource === 'bunny' ? 'Bunny Video ID' : 'https://youtu.be/...'}
															value={lesson.youtubeUrl ?? ''}
															onChange={(e) => updateLesson(chapter.id, lesson.id, 'youtubeUrl', e.target.value)}
															className="flex-1 h-8 text-xs"
														/>
													</div>
												)}
											</div>
										))}

										<button
											onClick={() => addLesson(chapter.id)}
											className="flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 py-1.5 px-2 rounded-lg hover:bg-brand-50 transition-colors"
										>
											<Plus size={13} /> 콘텐츠 추가
										</button>
									</div>
								)}
							</div>
						))}

						<button
							onClick={addChapter}
							className="flex items-center justify-center gap-2 text-sm text-brand-600 hover:text-brand-700 py-3 rounded-xl border-2 border-dashed border-brand-200 hover:border-brand-400 hover:bg-brand-50/50 transition-colors"
						>
							<Plus size={15} /> 차시 추가
						</button>
					</div>
				</TabsContent>

				{/* ── 가격·공개 탭 ── */}
				<TabsContent value="pricing">
					<div className="flex flex-col gap-5 max-w-lg">

						{/* 가격 설정 */}
						<div className="bg-white rounded-xl border border-border p-5">
							<h2 className="text-sm font-semibold text-foreground mb-4">가격 설정</h2>
							<div className="flex gap-3">

								<label className="flex flex-col gap-1.5 flex-1">
									<Label>판매 가격</Label>
									<div className="relative">
										<Input
											name="price"
											type="number"
											placeholder="0"
											value={form.price}
											onChange={handleTextChange('price')}
											className="pr-8"
										/>
										<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">원</span>
									</div>
									{form.price === '0' && (
										<p className="text-xs text-brand-600">무료 강의로 설정돼요</p>
									)}
								</label>

								<label className="flex flex-col gap-1.5 flex-1">
									<Label>정가 (선택)</Label>
									<div className="relative">
										<Input
											name="originalPrice"
											type="number"
											placeholder="할인 전 가격"
											value={form.originalPrice}
											onChange={handleTextChange('originalPrice')}
											className="pr-8"
										/>
										<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">원</span>
									</div>
									<p className="text-xs text-muted-foreground">입력 시 취소선으로 표시돼요</p>
								</label>

							</div>
						</div>

						{/* 수료 설정 */}
						<div className="bg-white rounded-xl border border-border p-5">
							<h2 className="text-sm font-semibold text-foreground mb-4">수료 기준</h2>
							<label className="flex flex-col gap-1.5">
								<Label>수료 인정 진도율</Label>
								<div className="relative max-w-32">
									<Input
										name="completionThreshold"
										type="number"
										min="1"
										max="100"
										value={form.completionThreshold}
										onChange={handleTextChange('completionThreshold')}
										className="pr-8"
									/>
									<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
								</div>
								<p className="text-xs text-muted-foreground">이 진도율 이상 달성 시 수료증이 발급돼요</p>
							</label>
						</div>

						{/* 공개 설정 */}
						<div className="bg-white rounded-xl border border-border p-5">
							<h2 className="text-sm font-semibold text-foreground mb-4">공개 설정</h2>
							<div className="flex flex-col gap-3">
								{([
									{ value: false, label: '비공개', desc: '수강생에게 보이지 않아요' },
									{ value: true, label: '공개', desc: '수강생이 바로 볼 수 있어요' },
								] as const).map((opt) => (
									<label
										key={String(opt.value)}
										className={cn(
											'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
											form.isPublished === opt.value
												? 'border-brand-400 bg-brand-50/50'
												: 'border-border hover:border-brand-200'
										)}
									>
										<input
											type="radio"
											name="isPublished"
											checked={form.isPublished === opt.value}
											onChange={() => handleBoolChange('isPublished', opt.value)}
											className="accent-brand-500"
										/>
										<div>
											<p className="text-sm font-medium text-foreground">{opt.label}</p>
											<p className="text-xs text-muted-foreground">{opt.desc}</p>
										</div>
									</label>
								))}
							</div>
						</div>

					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}