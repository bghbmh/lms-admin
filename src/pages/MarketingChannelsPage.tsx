import { useState } from 'react'
import { ExternalLink, CheckCircle2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageHeader from '@/components/common/PageHeader'
import { cn } from '@/lib/utils'

interface Channel {
	id: string
	name: string
	description: string
	placeholder: string
	helpUrl: string
	color: string
	connected: boolean
	value: string
}

const initialChannels: Channel[] = [
	{
		id: 'kakao',
		name: '카카오톡 채널',
		description: '수강신청 완료 알림·쿠폰 발송. 친구 추가 버튼 사이트에 자동 삽입.',
		placeholder: '_xABCDE',
		helpUrl: 'https://business.kakao.com',
		color: '#FEE500',
		connected: true,
		value: '_xLMSAdmin',
	},
	{
		id: 'meta',
		name: 'Meta 픽셀 (페이스북·인스타)',
		description: '수강신청 전환 추적. 광고 집행 시 리타겟팅 활용.',
		placeholder: '1234567890123456',
		helpUrl: 'https://business.facebook.com',
		color: '#1877F2',
		connected: false,
		value: '',
	},
	{
		id: 'youtube',
		name: '유튜브 채널',
		description: '강의 상세 페이지에 유튜브 채널 링크 자동 노출.',
		placeholder: 'https://youtube.com/@채널명',
		helpUrl: 'https://youtube.com',
		color: '#FF0000',
		connected: false,
		value: '',
	},
	{
		id: 'blog',
		name: '네이버 블로그·카페',
		description: '사이트 푸터에 블로그/카페 링크 노출.',
		placeholder: 'https://blog.naver.com/아이디',
		helpUrl: 'https://blog.naver.com',
		color: '#03C75A',
		connected: false,
		value: '',
	},
]

export default function MarketingChannelsPage() {
	const [channels, setChannels] = useState<Channel[]>(initialChannels)
	const [editingId, setEditingId] = useState<string | null>(null)

	const handleChange = (id: string, value: string) => {
		setChannels((prev) =>
			prev.map((c) => (c.id === id ? { ...c, value } : c))
		)
	}

	const handleSave = (id: string) => {
		setChannels((prev) =>
			prev.map((c) =>
				c.id === id ? { ...c, connected: !!c.value.trim() } : c
			)
		)
		setEditingId(null)
	}

	const handleDisconnect = (id: string) => {
		setChannels((prev) =>
			prev.map((c) =>
				c.id === id ? { ...c, connected: false, value: '' } : c
			)
		)
		setEditingId(null)
	}

	const connectedCount = channels.filter((c) => c.connected).length

	return (
		<div>
			<PageHeader
				title="채널 연결"
				description={`${connectedCount}개 채널 연결됨`}
			/>

			<div className="flex flex-col gap-4 max-w-2xl">
				{channels.map((channel) => {
					const isEditing = editingId === channel.id

					return (
						<div
							key={channel.id}
							className={cn(
								'bg-white rounded-xl border p-5 transition-colors',
								channel.connected ? 'border-brand-200' : 'border-border'
							)}
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex items-start gap-3">
									{/* 아이콘 */}
									<div
										className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-bold"
										style={{ background: channel.color }}
									>
										{channel.name.slice(0, 1)}
									</div>

									<div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-semibold text-foreground">
												{channel.name}
											</span>
											{channel.connected ? (
												<span className="flex items-center gap-1 text-xs text-brand-600">
													<CheckCircle2 size={12} />
													연결됨
												</span>
											) : (
												<span className="flex items-center gap-1 text-xs text-muted-foreground">
													<Circle size={12} />
													미연결
												</span>
											)}
										</div>
										<p className="text-xs text-muted-foreground mt-0.5">
											{channel.description}
										</p>
									</div>
								</div>

								{/* 액션 버튼 */}
								<div className="flex items-center gap-2 shrink-0">

									<a href={channel.helpUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
									>
										가이드
										<ExternalLink size={11} />
									</a>
									{!isEditing && (
										<Button
											variant="outline"
											size="sm"
											className="text-xs h-7"
											onClick={() => setEditingId(channel.id)}
										>
											{channel.connected ? '수정' : '연결'}
										</Button>
									)}
								</div>
							</div>

							{/* 입력 폼 */}
							{isEditing && (
								<div className="mt-4 flex flex-col gap-3 pt-4 border-t border-border">
									<div className="flex flex-col gap-1.5">
										<Label className="text-xs">
											{channel.id === 'kakao' ? '채널 ID' :
												channel.id === 'meta' ? '픽셀 ID' : 'URL'}
										</Label>
										<Input
											placeholder={channel.placeholder}
											value={channel.value}
											onChange={(e) => handleChange(channel.id, e.target.value)}
											className="h-9 text-sm"
										/>
									</div>
									<div className="flex items-center gap-2">
										<Button
											size="sm"
											className="bg-brand-500 hover:bg-brand-600 text-white h-8 text-xs"
											onClick={() => handleSave(channel.id)}
											disabled={!channel.value.trim()}
										>
											저장
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="h-8 text-xs"
											onClick={() => setEditingId(null)}
										>
											취소
										</Button>
										{channel.connected && (
											<Button
												variant="outline"
												size="sm"
												className="h-8 text-xs text-destructive hover:text-destructive ml-auto"
												onClick={() => handleDisconnect(channel.id)}
											>
												연결 해제
											</Button>
										)}
									</div>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}