import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Header() {
	return (
		<header className=" overflow-hidden">
			<div className='h-14  px-6   flex items-center gap-4 shrink-0 border-b border-[#e4ecdf] '>
				<div className="relative flex-1 max-w-sm">
					<Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="강의, 수강생 검색..."
						className="pl-9 h-9 text-sm bg-white border-0"
					/>
				</div>

				<div className="flex items-center gap-2 ml-auto">
					{/* 알림 */}
					<Button variant="ghost" size="icon" className="relative">
						<Bell size={18} />
						<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
					</Button>

					{/* 사이트 미리보기 */}
					<Button variant="outline" size="sm" className="text-xs h-8">
						내 사이트 보기
					</Button>

					{/* 유저 아바타 */}
					<Avatar className="w-8 h-8 cursor-pointer">
						<AvatarFallback className="bg-brand-100 text-brand-700 text-xs font-medium">
							김대
						</AvatarFallback>
					</Avatar>
				</div>

			</div>
			{/* 검색 */}

		</header>
	)
}