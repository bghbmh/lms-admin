import { useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/common/PageHeader'

interface Category {
	id: string
	name: string
	courseCount: number
	sortOrder: number
}

const initialCategories: Category[] = [
	{ id: 'cat-001', name: '영어 회화', courseCount: 2, sortOrder: 1 },
	{ id: 'cat-002', name: '비즈니스 영어', courseCount: 1, sortOrder: 2 },
	{ id: 'cat-003', name: '발음 교정', courseCount: 1, sortOrder: 3 },
]

export default function CategoriesPage() {
	const [categories, setCategories] = useState<Category[]>(initialCategories)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editTarget, setEditTarget] = useState<Category | null>(null)
	const [formName, setFormName] = useState('')

	const openCreate = () => {
		setEditTarget(null)
		setFormName('')
		setIsModalOpen(true)
	}

	const openEdit = (cat: Category) => {
		setEditTarget(cat)
		setFormName(cat.name)
		setIsModalOpen(true)
	}

	const handleDelete = (id: string) => {
		setCategories((prev) => prev.filter((c) => c.id !== id))
	}

	const handleSubmit = () => {
		if (!formName.trim()) return
		if (editTarget) {
			setCategories((prev) =>
				prev.map((c) => (c.id === editTarget.id ? { ...c, name: formName } : c))
			)
		} else {
			setCategories((prev) => [
				...prev,
				{
					id: `cat-${Date.now()}`,
					name: formName,
					courseCount: 0,
					sortOrder: prev.length + 1,
				},
			])
		}
		setIsModalOpen(false)
	}

	return (
		<div>
			<PageHeader
				title="카테고리"
				description={`전체 ${categories.length}개`}
				actions={
					<Button
						size="sm"
						className="bg-brand-500 hover:bg-brand-600 text-white gap-1"
						onClick={openCreate}
					>
						<Plus size={15} />
						카테고리 추가
					</Button>
				}
			/>

			<div className="bg-white rounded-xl border border-border overflow-hidden max-w-lg">
				{categories.length === 0 ? (
					<div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
						카테고리가 없어요
					</div>
				) : (
					<ul>
						{categories.map((cat, idx) => (
							<li
								key={cat.id}
								className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors"
							>
								{/* 드래그 핸들 */}
								<GripVertical size={15} className="text-muted-foreground cursor-grab shrink-0" />

								{/* 순서 */}
								<span className="text-xs text-muted-foreground w-5 shrink-0">
									{idx + 1}
								</span>

								{/* 이름 */}
								<span className="flex-1 text-sm font-medium text-foreground">
									{cat.name}
								</span>

								{/* 강의 수 */}
								<span className="text-xs text-muted-foreground shrink-0">
									강의 {cat.courseCount}개
								</span>

								{/* 액션 */}
								<div className="flex items-center gap-1 shrink-0">
									<button
										onClick={() => openEdit(cat)}
										className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
									>
										<Pencil size={13} />
									</button>
									<button
										onClick={() => handleDelete(cat.id)}
										className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
										disabled={cat.courseCount > 0}
									>
										<Trash2 size={13} />
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>

			{categories.some((c) => c.courseCount > 0) && (
				<p className="text-xs text-muted-foreground mt-2">
					강의가 있는 카테고리는 삭제할 수 없어요
				</p>
			)}

			{/* 모달 */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>
							{editTarget ? '카테고리 수정' : '카테고리 추가'}
						</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4 mt-2">
						<div className="flex flex-col gap-1.5">
							<Label>카테고리 이름</Label>
							<Input
								placeholder="예: 영어 회화"
								value={formName}
								onChange={(e) => setFormName(e.target.value)}
								onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
							/>
						</div>
						<div className="flex justify-end gap-2">
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
								onClick={handleSubmit}
								disabled={!formName.trim()}
							>
								{editTarget ? '수정 완료' : '추가'}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}