import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { gnbItems, type GnbItem, GNB_ICON_W } from '@/config/gnb_navigation'
import { SidebarContainer, SidebarToggleButton, BrandLogo } from './SidebarContainer'

import GnbLinkItem from './GnbLinkItem'


export default function Sidebar() {
	const location = useLocation()
	const [collapsed, setCollapsed] = useState(false)

	const getDefaultOpen = () => {
		const open: Record<string, boolean> = {}
		gnbItems.forEach((item) => {
			if (item.children?.some((c) => location.pathname === c.path)) {
				open[item.label] = true
			}
		})
		return open
	}

	const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>(getDefaultOpen)

	const toggleMenu = (item: GnbItem) => {
		if (item.children) {
			setOpenSubMenus((prev) => ({ ...prev, [item.label]: !prev[item.label] }))
			//setOpenSubMenus((prev) => ({ [item.label]: !prev[item.label] }))
		}
	}

	return (
		<SidebarContainer collapsed={collapsed}>

			{/* 헤더: 햄버거 + 로고 */}
			<div className="flex items-center shrink-0" style={{ height: 56 }} >
				<div className="flex items-center justify-center shrink-0" style={{ width: GNB_ICON_W }}>
					<SidebarToggleButton
						toggleSidebar={() => setCollapsed((p) => !p)}
						SidebarIcon={Menu}
					/>
				</div>
				{!collapsed && <BrandLogo />}
			</div>

			{/* 네비게이션 */}
			<nav className="flex-1 overflow-y-auto pb-30">
				{gnbItems.map((item) => {
					return <GnbLinkItem
						key={item.label}
						item={item}
						collapsed={collapsed}
						isOpenSubMenus={openSubMenus[item.label]}
						toggleMenu={() => toggleMenu(item)}
					/>
				})}


			</nav>

			{/* 플랜 */}
			{!collapsed && (
				<div className="p-3 shrink-0 absolute bottom-3 left-0 w-full" >
					<div className="rounded-lg p-2.5 bg-black/70 shadow-lg backdrop-blur-md" >
						<div className='flex justify-between text-xs text-white/90 '>
							<p className="font-medium ">스타터 플랜</p>
							<p className=" mt-0.5">23 / 50건</p>
						</div>

						<div className="mt-1.5 h-1 rounded-full bg-white/20 " >
							<div className="h-1 bg-brand-500 rounded-full" style={{ width: '46%' }} />
						</div>
					</div>
				</div>
			)}

		</SidebarContainer>
	)
}