import { useState } from 'react'
import { Plus, Pin, Pencil, Trash2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PageHeader from '@/components/common/PageHeader'
import { dummyNotices } from '@/data/notice'
import { dummyCourses } from '@/data/courses'
import { cn } from '@/lib/utils'

export default function NoticePage() {
	const [expandedId, setExpandedId] = useState<string | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editTarget, setEditTarget] = useState<typeof dummyNotices[0] | null>(null)
	const [form, setForm] = useState({
		title: '',
		body: '',
		courseId: 'all',
		isPinned: false,
	})

	const toggleExpand = (id: string) => {
		setExpandedId((prev) => (prev === id ? null : id))
	}

	const openCreate = () => {
		setEditTarget(null)
		setForm({ title: '', body: '', courseId: 'all', isPinned: false })
		setIsModalOpen(true)
	}

	const openEdit = (notice: typeof dummyNotices[0]) => {
		setEditTarget(notice)
		setForm({
			title: notice.title,
			body: notice.body,
			courseId: notice.courseTitle ? 'course' : 'all',
			isPinned: notice.isPinned,
		})
		setIsModalOpen(true)
	}

	// 고정글 위로 정렬
	const sorted = [...dummyNotices].sort((a, b) =>
		a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1
	)

	return (
		<div>
			<PageHeader
				title="공지사항"
				description={`전체 ${dummyNotices.length}개`}
				actions={
					<Button
						size="sm"
						className="bg-brand-500 hover:bg-brand-600 text-white gap-1"
						onClick={openCreate}
					>
						<Plus size={15} />
						공지 작성
					</Button>
				}
			/>

			<div className="flex flex-col gap-3">
				{sorted.map((notice) => {
					const isExpanded = expandedId === notice.id

					return (
						<div
							key={notice.id}
							className={cn(
								'bg-white rounded-xl border transition-colors',
								notice.isPinned ? 'border-brand-200' : 'border-border'
							)}
						>
							{/* 헤더 */}
							<div
								className="flex items-start gap-3 p-4 cursor-pointer"
								onClick={() => toggleExpand(notice.id)}
							>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 flex-wrap">
										{notice.isPinned && (
											<Pin size={12} className="text-brand-500 shrink-0" />
										)}
										<span className="font-medium text-foreground text-sm">
											{notice.title}
										</span>
										{notice.courseTitle && (
											<span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
												{notice.courseTitle}
											</span>
										)}
									</div>
									<div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
										<span>{notice.authorName}</span>
										<span>{notice.createdAt.slice(0, 10)}</span>
									</div>
								</div>

								{/* 액션 버튼 */}
								<div
									className="flex items-center gap-1 shrink-0"
									onClick={(e) => e.stopPropagation()}
								>
									<button
										onClick={() => openEdit(notice)}
										className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
									>
										<Pencil size={13} />
									</button>
									<button
										className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
									>
										<Trash2 size={13} />
									</button>
								</div>

								<ChevronDown
									size={16}
									className={cn(
										'text-muted-foreground transition-transform shrink-0 mt-0.5',
										isExpanded && 'rotate-180'
									)}
								/>
							</div>

							{/* 본문 */}
							{isExpanded && (
								<div className="border-t border-border px-4 py-4 bg-gray-50/50">
									<p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
										{notice.body}
									</p>
								</div>
							)}
						</div>
					)
				})}
			</div>

			{/* 공지 작성/수정 모달 */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-lg">
					<DialogHeader>
						<DialogTitle>
							{editTarget ? '공지 수정' : '공지 작성'}
						</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col gap-4 mt-2">
						{/* 제목 */}
						<div className="flex flex-col gap-1.5">
							<Label>제목</Label>
							<Input
								placeholder="공지 제목을 입력해주세요"
								value={form.title}
								onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
							/>
						</div>

						{/* 본문 */}
						<div className="flex flex-col gap-1.5">
							<Label>내용</Label>
							<textarea
								placeholder="공지 내용을 입력해주세요"
								value={form.body}
								onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
								rows={5}
								className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
							/>
						</div>

						{/* 적용 범위 */}
						<div className="flex flex-col gap-1.5">
							<Label>적용 범위</Label>
							<Select
								value={form.courseId}
								onValueChange={(v) => setForm((p) => ({ ...p, courseId: v }))}
							>
								<SelectTrigger className="h-9">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">전체 수강생</SelectItem>
									{dummyCourses.map((c) => (
										<SelectItem key={c.id} value={c.id}>
											{c.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* 상단 고정 */}
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={form.isPinned}
								onChange={(e) => setForm((p) => ({ ...p, isPinned: e.target.checked }))}
								className="w-4 h-4 accent-brand-500"
							/>
							<span className="text-sm text-foreground">상단 고정</span>
						</label>

						{/* 버튼 */}
						<div className="flex justify-end gap-2 mt-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsModalOpen(false)}
							>
								취소
							</Button>
							<Button
								size="sm"
								className="bg-brand-500 hover:bg-brand-600 text-white"
								disabled={!form.title || !form.body}
							>
								{editTarget ? '수정 완료' : '공지 등록'}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}