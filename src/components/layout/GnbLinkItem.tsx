


import { NavLink, useLocation } from 'react-router-dom'
import { GNB_ICON_W } from '@/config/gnb_navigation'
import type { GnbItem } from '@/config/gnb_navigation'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight, Plus, Minus } from 'lucide-react'


interface GnbLinkItemProps {
	item: GnbItem,
	collapsed?: boolean,
	isOpenSubMenus?: boolean
	toggleMenu?: () => void
}

export default function GnbLinkItem({ item, collapsed = false, isOpenSubMenus, toggleMenu }: GnbLinkItemProps) {

	const location = useLocation()
	// 서브메뉴 중 현재 경로와 일치하는 게 있는지
	const hasActiveChild = item.children?.some((c) => location.pathname === c.path) ?? false

	const navLinkClass = `flex items-center  w-full pt-2  pr-3 transition-colors text-gray-500 hover:text-gray-700 cursor-pointer `;
	const navItemLabelClass = `flex-1 pl-4 block text-left text-sm font-semibold whitespace-nowrap`

	return (
		<>
			{
				item.path ? (
					<NavLink
						to={item.path ?? '#'}
						end
						className={navLinkClass}
					>
						{({ isActive }) => (
							<>
								<IconArea icon={item.icon} active={isActive} />
								{!collapsed && (
									<span className={`${navItemLabelClass} ${isActive ? 'text-brand-600' : 'text-gray-500 hover:text-gray-700'}`} >
										{item.label}
									</span>
								)}
								{isActive && <ChevronRight size={13} strokeWidth={3} className="text-brand-600 hover:text-brand-700" />}

							</>
						)}
					</NavLink>
				) : (
					<button
						type='button'
						className={navLinkClass}
						onClick={toggleMenu}
					>
						<IconArea icon={item.icon} active={hasActiveChild} />
						{!collapsed && (
							<>
								<span className={navItemLabelClass}>
									{item.label}
								</span>
								{isOpenSubMenus ? <Minus size={13} strokeWidth={3} className="text-brand-600" /> : <Plus size={10} strokeWidth={2} className="text-gray-400" />}

							</>

						)}
					</button>
				)
			}

			{/* 서브메뉴 */}
			{
				isOpenSubMenus && !collapsed && item.children && (
					<div className="flex">
						{/* 세로선 — 아이콘 바 안 */}
						<div className="flex justify-center shrink-0 " style={{ width: GNB_ICON_W }}>
							<div className="w-px h-full bg-white/40" />
						</div>
						{/* 서브 메뉴 */}
						<div className="flex flex-col flex-1 pb-2">
							{item.children.map((child) => (
								<NavLink
									key={child.path}
									to={child.path ?? '#'}
									end
									className="flex items-center h-10 pl-6 pr-3 text-sm transition-colors"
								>
									{({ isActive }) => (
										<>
											<span className={`text-sm font-medium flex-1 text-left whitespace-nowrap ${isActive
												? 'text-brand-600 font-bold hover:text-brand-700'
												: 'text-gray-400 hover:text-gray-600'}`} >
												{child.label}
											</span>
											{isActive && <ChevronRight size={13} strokeWidth={3} className="text-brand-600 hover:text-brand-700" />}
										</>

									)}
								</NavLink>
							))}
						</div>
					</div>
				)
			}

		</>
	)

}


interface IconAreaProps {
	icon: LucideIcon
	active?: boolean
}

const IconArea = ({ icon: Icon, active = false }: IconAreaProps) => {
	return (
		<div className="flex items-center justify-center shrink-0" style={{ width: GNB_ICON_W }}>
			<div className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${active
				? 'bg-white text-brand-600'
				: 'text-white/70 hover:bg-white/15 hover:text-white'}`} >
				<Icon size={20} />
			</div>
		</div>
	)

}
