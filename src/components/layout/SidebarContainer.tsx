
import type { LucideIcon } from 'lucide-react'

interface Props {
	collapsed: boolean
	children: React.ReactNode
}


export function SidebarContainer({ collapsed, children }: Props) {
	return (
		<aside
			className="relative h-screen flex flex-col shrink-0 overflow-hidden  rounded-tr-lg rounded-br-lg"
			style={{
				width: collapsed ? 60 : 236,
				transition: 'width 0.2s ease',
				background: '#0bb489'
			}}
		>
			{/* 아이콘 바 배경 — 전체 높이 */}
			<div
				className="absolute block inset-y-0 right-0 z-0 rounded-lg"
				style={{ width: 'calc(100% - 60px)', background: '#ffffff', boxShadow: 'inset 10px 0 10px -10px #00000073' }}
			/>

			{/* 콘텐츠 */}
			<div className="relative z-10 flex flex-col h-full">
				{children}
			</div>
		</aside>
	)
}

interface SidebarToggleButtonProps {
	toggleSidebar: () => void
	SidebarIcon?: LucideIcon
}

export const SidebarToggleButton = ({ toggleSidebar, SidebarIcon }: SidebarToggleButtonProps) => {
	return (
		<>
			<button
				onClick={toggleSidebar}
				className="w-9 h-9 flex items-center justify-center rounded-full text-white/80 hover:bg-white/15 transition-colors"
			>
				{SidebarIcon && <SidebarIcon size={20} />}
			</button>
		</>
	)
}

export const BrandLogo = () => {

	return (
		<span className="pl-4 font-bold text-sm text-brand-600 tracking-tight whitespace-nowrap">
			{/* <img src="/logo.svg" alt="LMS Admin" className="w-6 h-6" /> */}
			LMS Admin_logo
		</span>
	)
}