import { useState } from 'react'
import { Save, GripVertical, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PageHeader from '@/components/common/PageHeader'
import { cn } from '@/lib/utils'

interface GnbMenu {
	id: string
	label: string
	url: string
	isVisible: boolean
	isExternal: boolean
}

const initialMenus: GnbMenu[] = [
	{ id: 'home', label: '홈', url: '/', isVisible: true, isExternal: false },
	{ id: 'courses', label: '강의', url: '/courses', isVisible: true, isExternal: false },
	{ id: 'instructor', label: '강사 소개', url: '/instructor', isVisible: true, isExternal: false },
	{ id: 'notice', label: '공지사항', url: '/notice', isVisible: false, isExternal: false },
]

export default function GnbSettingsPage() {
	const [menus, setMenus] = useState<GnbMenu[]>(initialMenus)

	const toggleVisible = (id: string) => {
		setMenus((prev) => prev.map((m) => (m.id === id ? { ...m, isVisible: !m.isVisible } : m)))
	}

	const updateMenu = (id: string, key: keyof GnbMenu, value: string | boolean) => {
		setMenus((prev) => prev.map((m) => (m.id === id ? { ...m, [key]: value } : m)))
	}

	const removeMenu = (id: string) => {
		setMenus((prev) => prev.filter((m) => m.id !== id))
	}

	const addMenu = () => {
		setMenus((prev) => [
			...prev,
			{ id: `menu-${Date.now()}`, label: '', url: '', isVisible: true, isExternal: false },
		])
	}

	return (
		<div>
			<PageHeader
				title="GNB 관리"
				description="학습자 사이트 상단 네비게이션 메뉴를 설정해요"
				actions={
					<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
						<Save size={14} />
						저장
					</Button>
				}
			/>

			<div className="flex flex-col gap-4 max-w-xl">

				<div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-xs text-brand-700">
					드래그로 순서를 변경하고, 눈 아이콘으로 표시/숨김을 설정해요
				</div>

				<div className="bg-white rounded-xl border border-border overflow-hidden">
					{menus.map((menu, idx) => (
						<div
							key={menu.id}
							className={cn(
								'flex items-center gap-3 px-4 py-3',
								idx !== menus.length - 1 && 'border-b border-border',
								!menu.isVisible && 'opacity-50'
							)}
						>
							<GripVertical size={15} className="text-muted-foreground cursor-grab shrink-0" />

							<div className="flex items-center gap-2 flex-1">
								<Input
									value={menu.label}
									onChange={(e) => updateMenu(menu.id, 'label', e.target.value)}
									placeholder="메뉴 이름"
									className="h-8 text-sm w-32"
								/>
								<Input
									value={menu.url}
									onChange={(e) => updateMenu(menu.id, 'url', e.target.value)}
									placeholder="URL"
									className="h-8 text-sm flex-1"
								/>
							</div>

							<div className="flex items-center gap-1 shrink-0">
								<button
									onClick={() => toggleVisible(menu.id)}
									className={cn(
										'w-7 h-7 flex items-center justify-center rounded-md transition-colors',
										menu.isVisible
											? 'text-brand-500 hover:bg-brand-50'
											: 'text-muted-foreground hover:bg-muted'
									)}
								>
									{menu.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
								</button>
								<button
									onClick={() => removeMenu(menu.id)}
									className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
								>
									<Trash2 size={13} />
								</button>
							</div>
						</div>
					))}
				</div>

				<button
					onClick={addMenu}
					className="flex items-center justify-center gap-2 text-sm text-brand-600 hover:text-brand-700 py-3 rounded-xl border-2 border-dashed border-brand-200 hover:border-brand-400 hover:bg-brand-50/50 transition-colors"
				>
					<Plus size={15} />
					메뉴 추가
				</button>
			</div>
		</div>
	)
}