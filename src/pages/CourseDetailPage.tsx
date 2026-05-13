import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
	Plus, Trash2, GripVertical, ChevronDown,
	ChevronRight, Video, FileText, Save, ArrowLeft,
	Eye, Copy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import PageHeader from '@/components/common/PageHeader'
import { cn } from '@/lib/utils'
import { dummyCourses } from '@/data/courses'
import type { ChapterForm, LessonItemForm, CourseForm } from '@/types'

// 더미 커리큘럼 데이터
const dummyChapters: ChapterForm[] = [
	{
		id: 'ch-001',
		title: '1차시. be동사란?',
		isOpen: true,
		lessons: [
			{ id: 'ls-001', title: 'be동사 개념 이해', contentType: 'video', videoSource: 'youtube', youtubeUrl: 'https://youtu.be/example1', isFreePreview: true },
			{ id: 'ls-002', title: 'I am / You are / He is', contentType: 'video', videoSource: 'youtube', youtubeUrl: 'https://youtu.be/example2', isFreePreview: false },
			{ id: 'ls-003', title: '1차시 복습 자료', contentType: 'document', isFreePreview: false },
		],
	},
	{
		id: 'ch-002',
		title: '2차시. be동사 부정문',
		isOpen: false,
		lessons: [
			{ id: 'ls-004', title: 'not을 활용한 부정문', contentType: 'video', videoSource: 'youtube', youtubeUrl: 'https://youtu.be/example3', isFreePreview: false },
			{ id: 'ls-005', title: '부정문 연습 문제', contentType: 'document', isFreePreview: false },
		],
	},
]

export default function CourseDetailPage() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	const course = dummyCourses.find((c) => c.id === id)

	if (!course) {
		return (
			<div className="flex flex-col items-center justify-center h-64 gap-4">
				<p className="text-muted-foreground">강의를 찾을 수 없어요</p>
				<Button variant="outline" size="sm" onClick={() => navigate('/courses')}>
					강의 목록으로
				</Button>
			</div>
		)
	}

	const [form, setForm] = useState<CourseForm>({
		title: course.title,
		description: course.description ?? '',
		categoryId: course.categoryId ?? '',
		courseType: course.courseType,
		thumbnailUrl: course.thumbnailUrl ?? '',
		price: String(course.price),
		originalPrice: course.originalPrice ? String(course.originalPrice) : '',
		completionThreshold: String(course.completionThreshold),
		isPublished: course.isPublished,
	})

	const [chapters, setChapters] = useState<ChapterForm[]>(dummyChapters)

	// 핸들러
	const handleTextChange = (key: keyof CourseForm) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setForm((prev) => ({ ...prev, [key]: e.target.value }))
		}

	const handleBoolChange = (key: keyof CourseForm, value: boolean) => {
		setForm((prev) => ({ ...prev, [key]: value }))
	}

	const handleSelectChange = <K extends keyof CourseForm>(key: K, value: CourseForm[K]) => {
		setForm((prev) => ({ ...prev, [key]: value }))
	}

	const addChapter = () => {
		setChapters((prev) => [
			...prev,
			{ id: `ch-${Date.now()}`, title: `${prev.length + 1}차시.`, lessons: [], isOpen: true },
		])
	}

	const removeChapter = (chapterId: string) => {
		setChapters((prev) => prev.filter((c) => c.id !== chapterId))
	}

	const updateChapterTitle = (chapterId: string, title: string) => {
		setChapters((prev) => prev.map((c) => (c.id === chapterId ? { ...c, title } : c)))
	}

	const toggleChapter = (chapterId: string) => {
		setChapters((prev) => prev.map((c) => (c.id === chapterId ? { ...c, isOpen: !c.isOpen } : c)))
	}

	const addLesson = (chapterId: string) => {
		setChapters((prev) =>
			prev.map((c) =>
				c.id === chapterId
					? {
						...c,
						lessons: [
							...c.lessons,
							{ id: `ls-${Date.now()}`, title: '', contentType: 'video' as const, videoSource: 'youtube' as const, isFreePreview: false },
						],
					}
					: c
			)
		)
	}

	const removeLesson = (chapterId: string, lessonId: string) => {
		setChapters((prev) =>
			prev.map((c) =>
				c.id === chapterId
					? { ...c, lessons: c.lessons.filter((l) => l.id !== lessonId) }
					: c
			)
		)
	}

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
	const shortUrl = course.shortUrlSlug
		? `https://honggd.lms.co.kr/l/${course.shortUrlSlug}`
		: null

	return (
		<div>
			<PageHeader
				title={form.title || '강의 상세'}
				description={`수강생 ${course.studentCount ?? 0}명 · ${course.chapterCount ?? chapters.length}차시`}
				actions={
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="gap-1"
							onClick={() => navigate('/courses')}
						>
							<ArrowLeft size={13} />
							목록
						</Button>
						{shortUrl && (
							<Button
								variant="outline"
								size="sm"
								className="gap-1"
								onClick={() => navigator.clipboard.writeText(shortUrl)}
							>
								<Copy size={13} />
								링크 복사
							</Button>
						)}
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

			{/* 공개 상태 뱃지 */}
			<div className="flex items-center gap-2 mb-5">
				<span className={cn(
					'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
					form.isPublished
						? 'bg-brand-50 text-brand-700 border-brand-200'
						: 'bg-amber-50 text-amber-700 border-amber-200'
				)}>
					{form.isPublished ? '공개 중' : '비공개'}
				</span>
				{shortUrl && (
					<span className="text-xs text-muted-foreground font-mono">{shortUrl}</span>
				)}
			</div>

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
					<TabsTrigger value="stats">수강 현황</TabsTrigger>
				</TabsList>

				{/* ── 기본 정보 탭 ── */}
				<TabsContent value="basic">
					<div className="grid grid-cols-3 gap-5">
						<div className="col-span-2 flex flex-col gap-5">
							<div className="bg-white rounded-xl border border-border p-5">
								<h2 className="text-sm font-semibold text-foreground mb-4">강의 정보</h2>
								<div className="flex flex-col gap-4">

									<label className="flex flex-col gap-1.5">
										<Label>강의 제목 *</Label>
										<Input
											name="title"
											value={form.title}
											onChange={handleTextChange('title')}
										/>
									</label>

									<label className="flex flex-col gap-1.5">
										<Label>강의 소개</Label>
										<textarea
											name="description"
											value={form.description}
											onChange={handleTextChange('description')}
											rows={5}
											className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
										/>
									</label>

									<div className="flex gap-3">
										<div className="flex flex-col gap-1.5 flex-1">
											<Label htmlFor="courseType">강의 유형</Label>
											<Select
												value={form.courseType}
												onValueChange={(v) => handleSelectChange('courseType', v as CourseForm['courseType'])}
											>
												<SelectTrigger id="courseType" className="h-9">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="vod">VOD (녹화 강의)</SelectItem>
													<SelectItem value="live">라이브 단독</SelectItem>
													<SelectItem value="live_bundle">라이브 + VOD</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="flex flex-col gap-1.5 flex-1">
											<Label htmlFor="categoryId">카테고리</Label>
											<Select
												value={form.categoryId}
												onValueChange={(v) => handleSelectChange('categoryId', v as CourseForm['categoryId'])}
											>
												<SelectTrigger id="categoryId" className="h-9">
													<SelectValue placeholder="카테고리 선택" />
												</SelectTrigger>
												<SelectContent>
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
								<div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
									{form.thumbnailUrl ? (
										<img src={form.thumbnailUrl} alt="썸네일" className="w-full h-full object-cover" />
									) : (
										<div className="w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border cursor-pointer hover:border-brand-300 hover:bg-brand-50/50 transition-colors">
											<Plus size={18} className="text-muted-foreground" />
											<p className="text-xs text-muted-foreground">이미지 업로드</p>
										</div>
									)}
								</div>
								{form.thumbnailUrl && (
									<Button variant="outline" size="sm" className="mt-2 w-full text-xs h-7">
										썸네일 변경
									</Button>
								)}
							</div>

							{/* 강의 정보 요약 */}
							<div className="bg-white rounded-xl border border-border p-5">
								<h2 className="text-sm font-semibold text-foreground mb-3">강의 요약</h2>
								<div className="flex flex-col gap-2 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">등록일</span>
										<span className="text-foreground">{course.createdAt.slice(0, 10)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">수강생</span>
										<span className="text-foreground">{course.studentCount ?? 0}명</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">총 차시</span>
										<span className="text-foreground">{chapters.length}차시</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">총 콘텐츠</span>
										<span className="text-foreground">{totalLessons}개</span>
									</div>
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

								{chapter.isOpen && (
									<div className="p-3 flex flex-col gap-2">
										{chapter.lessons.map((lesson) => (
											<div key={lesson.id} className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-white">
												<div className="flex items-center gap-2">
													<GripVertical size={14} className="text-muted-foreground cursor-grab shrink-0" />
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

												{lesson.contentType === 'video' && (
													<div className="flex gap-2 ml-6">
														<Select
															value={lesson.videoSource ?? 'youtube'}
															onValueChange={(v) => updateLesson(chapter.id, lesson.id, 'videoSource', v as LessonItemForm['videoSource'])}
														>
															<SelectTrigger className="w-28 h-8 text-xs">
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
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
						<div className="bg-white rounded-xl border border-border p-5">
							<h2 className="text-sm font-semibold text-foreground mb-4">가격 설정</h2>
							<div className="flex gap-3">
								<label className="flex flex-col gap-1.5 flex-1">
									<Label>판매 가격</Label>
									<div className="relative">
										<Input
											name="price"
											type="number"
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
							</label>
						</div>

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

				{/* ── 수강 현황 탭 ── */}
				<TabsContent value="stats">
					<div className="grid grid-cols-3 gap-4 mb-5">
						<div className="bg-white rounded-xl border border-border p-4">
							<p className="text-sm text-muted-foreground">전체 수강생</p>
							<p className="text-2xl font-semibold text-foreground mt-1">
								{course.studentCount ?? 0}명
							</p>
						</div>
						<div className="bg-white rounded-xl border border-border p-4">
							<p className="text-sm text-muted-foreground">수료 완료</p>
							<p className="text-2xl font-semibold text-blue-600 mt-1">1명</p>
						</div>
						<div className="bg-white rounded-xl border border-border p-4">
							<p className="text-sm text-muted-foreground">평균 진도율</p>
							<p className="text-2xl font-semibold text-brand-600 mt-1">65%</p>
						</div>
					</div>

					<div className="bg-white rounded-xl border border-border p-5">
						<h2 className="text-sm font-semibold text-foreground mb-4">수강생 목록</h2>
						<div className="flex flex-col divide-y divide-border">
							{[
								{ name: '박수강', email: 'park@example.com', progress: 65, status: '수강중' },
								{ name: '최학생', email: 'choi@example.com', progress: 100, status: '수료' },
							].map((learner) => (
								<div key={learner.email} className="flex items-center gap-3 py-3">
									<div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-xs font-medium text-brand-700 shrink-0">
										{learner.name.slice(0, 2)}
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium text-foreground">{learner.name}</p>
										<p className="text-xs text-muted-foreground">{learner.email}</p>
									</div>
									<div className="flex items-center gap-3">
										<div className="flex items-center gap-2">
											<div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
												<div
													className={cn(
														'h-1.5 rounded-full',
														learner.progress === 100 ? 'bg-blue-500' : 'bg-brand-500'
													)}
													style={{ width: `${learner.progress}%` }}
												/>
											</div>
											<span className="text-xs text-muted-foreground">{learner.progress}%</span>
										</div>
										<span className={cn(
											'text-xs px-2 py-0.5 rounded-full border font-medium',
											learner.progress === 100
												? 'bg-blue-50 text-blue-700 border-blue-200'
												: 'bg-brand-50 text-brand-700 border-brand-200'
										)}>
											{learner.status}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}