import { Save, Bell, CheckCircle2, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import { cn } from '@/lib/utils'

interface NotificationSetting {
	id: string
	label: string
	desc: string
	email: boolean
	kakao: boolean
}

const initialSettings: NotificationSetting[] = [
	{
		id: 'enrollment',
		label: '수강 신청 완료',
		desc: '수강생이 강의를 신청하면 수강생에게 알림을 보내요',
		email: true,
		kakao: true,
	},
	{
		id: 'completion',
		label: '강의 수료',
		desc: '수강생이 강의를 수료하면 수료증과 함께 알림을 보내요',
		email: true,
		kakao: false,
	},
	{
		id: 'qna_reply',
		label: 'Q&A 답변 등록',
		desc: '강사가 Q&A에 답변하면 수강생에게 알림을 보내요',
		email: true,
		kakao: false,
	},
	{
		id: 'notice',
		label: '공지사항 등록',
		desc: '새 공지사항이 등록되면 수강생에게 알림을 보내요',
		email: false,
		kakao: false,
	},
	{
		id: 'payment',
		label: '결제 완료',
		desc: '결제가 완료되면 수강생에게 영수증과 함께 알림을 보내요',
		email: true,
		kakao: true,
	},
]

export default function NotificationsPage() {
	const [settings, setSettings] = useState<NotificationSetting[]>(initialSettings)

	const toggle = (id: string, channel: 'email' | 'kakao') => {
		setSettings((prev) =>
			prev.map((s) => (s.id === id ? { ...s, [channel]: !s[channel] } : s))
		)
	}

	return (
		<div>
			<PageHeader
				title="자동 알림"
				description="이벤트 발생 시 수강생에게 자동으로 보내는 알림을 설정해요"
				actions={
					<Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white gap-1">
						<Save size={14} />
						저장
					</Button>
				}
			/>

			<div className="flex flex-col gap-5 max-w-2xl">

				{/* 채널 연결 안내 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-3">알림 채널</h2>
					<div className="flex gap-3">
						<div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-200 bg-brand-50 text-sm">
							<Mail size={14} className="text-brand-500" />
							<span className="text-brand-700 font-medium">이메일</span>
							<CheckCircle2 size={13} className="text-brand-500 ml-1" />
						</div>
						<div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground">
							<MessageCircle size={14} />
							<span>카카오 알림톡</span>
							<span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full ml-1">
								미연결
							</span>
						</div>
					</div>
					<p className="text-xs text-muted-foreground mt-2">
						카카오 알림톡은 마케팅 &gt; 채널 연결에서 카카오 채널을 연결하면 사용할 수 있어요
					</p>
				</div>

				{/* 알림 설정 목록 */}
				<div className="bg-white rounded-xl border border-border overflow-hidden">
					{/* 헤더 */}
					<div className="flex items-center px-5 py-3 bg-gray-50/50 border-b border-border">
						<span className="flex-1 text-xs font-medium text-muted-foreground">알림 종류</span>
						<div className="flex items-center gap-6 shrink-0">
							<span className="text-xs font-medium text-muted-foreground w-16 text-center flex items-center gap-1 justify-center">
								<Mail size={12} /> 이메일
							</span>
							<span className="text-xs font-medium text-muted-foreground w-16 text-center flex items-center gap-1 justify-center">
								<MessageCircle size={12} /> 카카오
							</span>
						</div>
					</div>

					{settings.map((setting, idx) => (
						<div
							key={setting.id}
							className={cn(
								'flex items-center px-5 py-4',
								idx !== settings.length - 1 && 'border-b border-border'
							)}
						>
							<div className="flex-1">
								<div className="flex items-center gap-1.5">
									<Bell size={13} className="text-brand-500 shrink-0" />
									<span className="text-sm font-medium text-foreground">{setting.label}</span>
								</div>
								<p className="text-xs text-muted-foreground mt-0.5 ml-5">{setting.desc}</p>
							</div>
							<div className="flex items-center gap-6 shrink-0">
								<div className="w-16 flex justify-center">
									<input
										type="checkbox"
										checked={setting.email}
										onChange={() => toggle(setting.id, 'email')}
										className="w-4 h-4 accent-brand-500 cursor-pointer"
									/>
								</div>
								<div className="w-16 flex justify-center">
									<input
										type="checkbox"
										checked={setting.kakao}
										onChange={() => toggle(setting.id, 'kakao')}
										className="w-4 h-4 accent-brand-500 cursor-pointer"
										disabled
									/>
								</div>
							</div>
						</div>
					))}
				</div>

			</div>
		</div>
	)
}