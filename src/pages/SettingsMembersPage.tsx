import { useState } from 'react'
import { Plus, Trash2, Crown, Shield, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PageHeader from '@/components/common/PageHeader'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { dummyUsers } from '@/data/users'
import { cn } from '@/lib/utils'

const roleConfig = {
	owner: { label: '오너', icon: <Crown size={13} />, className: 'bg-amber-50 text-amber-700 border-amber-200' },
	admin: { label: '관리자', icon: <Shield size={13} />, className: 'bg-blue-50 text-blue-700 border-blue-200' },
	instructor: { label: '강사', icon: <User size={13} />, className: 'bg-brand-50 text-brand-700 border-brand-200' },
	learner: { label: '수강생', icon: <User size={13} />, className: 'bg-gray-100 text-gray-500 border-gray-200' },
}

export default function SettingsMembersPage() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [inviteEmail, setInviteEmail] = useState('')
	const [inviteRole, setInviteRole] = useState<'admin' | 'instructor'>('instructor')

	const members = dummyUsers.filter((u) => u.role !== 'learner')

	return (
		<div>
			<PageHeader
				title="멤버 관리"
				description="관리자와 강사 권한을 관리해요"
				actions={
					<Button
						size="sm"
						className="bg-brand-500 hover:bg-brand-600 text-white gap-1"
						onClick={() => setIsModalOpen(true)}
					>
						<Plus size={15} />
						멤버 초대
					</Button>
				}
			/>

			<div className="flex flex-col gap-5 max-w-2xl">

				{/* 권한 안내 */}
				<div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
					<h2 className="text-sm font-semibold text-brand-800 mb-2">권한 안내</h2>
					<div className="grid grid-cols-3 gap-3 text-xs text-brand-700">
						<div className="flex items-start gap-1.5">
							<Crown size={12} className="text-amber-500 mt-0.5 shrink-0" />
							<div>
								<p className="font-medium">오너</p>
								<p className="text-brand-600 mt-0.5">모든 기능 접근, 결제·플랜 관리</p>
							</div>
						</div>
						<div className="flex items-start gap-1.5">
							<Shield size={12} className="text-blue-500 mt-0.5 shrink-0" />
							<div>
								<p className="font-medium">관리자</p>
								<p className="text-brand-600 mt-0.5">강의·수강생·정산 관리 (플랜 제외)</p>
							</div>
						</div>
						<div className="flex items-start gap-1.5">
							<User size={12} className="text-brand-500 mt-0.5 shrink-0" />
							<div>
								<p className="font-medium">강사</p>
								<p className="text-brand-600 mt-0.5">본인 강의·Q&A·공지사항만 관리</p>
							</div>
						</div>
					</div>
				</div>

				{/* 멤버 목록 */}
				<div className="bg-white rounded-xl border border-border overflow-hidden">
					{members.map((member, idx) => {
						const config = roleConfig[member.role as keyof typeof roleConfig]
						const isOwner = member.role === 'owner'

						return (
							<div
								key={member.id}
								className={cn(
									'flex items-center gap-3 px-5 py-4',
									idx !== members.length - 1 && 'border-b border-border'
								)}
							>
								<Avatar className="w-9 h-9 shrink-0">
									<AvatarFallback className="bg-brand-50 text-brand-700 text-sm font-medium">
										{member.name.slice(0, 2)}
									</AvatarFallback>
								</Avatar>

								<div className="flex-1">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium text-foreground">{member.name}</span>
										<span className={cn(
											'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
											config.className
										)}>
											{config.icon}
											{config.label}
										</span>
									</div>
									<p className="text-xs text-muted-foreground mt-0.5">{member.email}</p>
								</div>

								<div className="flex items-center gap-2 shrink-0">
									{!isOwner && (
										<>
											<Select defaultValue={member.role}>
												<SelectTrigger className="w-24 h-7 text-xs">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="admin">관리자</SelectItem>
													<SelectItem value="instructor">강사</SelectItem>
												</SelectContent>
											</Select>
											<button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
												<Trash2 size={13} />
											</button>
										</>
									)}
								</div>
							</div>
						)
					})}
				</div>

			</div>

			{/* 초대 모달 */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-sm">
					<DialogHeader>
						<DialogTitle>멤버 초대</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4 mt-2">
						<label className="flex flex-col gap-1.5">
							<Label>이메일</Label>
							<Input
								type="email"
								placeholder="초대할 멤버의 이메일"
								value={inviteEmail}
								onChange={(e) => setInviteEmail(e.target.value)}
							/>
						</label>

						<div className="flex flex-col gap-1.5">
							<Label htmlFor="inviteRole">권한</Label>
							<Select
								value={inviteRole}
								onValueChange={(v) => setInviteRole(v as 'admin' | 'instructor')}
							>
								<SelectTrigger id="inviteRole" className="h-9">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="admin">관리자</SelectItem>
									<SelectItem value="instructor">강사</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="flex justify-end gap-2">
							<Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
								취소
							</Button>
							<Button
								size="sm"
								className="bg-brand-500 hover:bg-brand-600 text-white"
								disabled={!inviteEmail.trim()}
							>
								초대 보내기
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}