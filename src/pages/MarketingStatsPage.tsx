import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import PageHeader from '@/components/common/PageHeader'
import { Table, THead, TBody, TR, TH, TD } from '@/components/common/Table/Table'
import { cn } from '@/lib/utils'

const dummyChannelStats = [
	{ channel: '직접 접속', visitors: 320, conversions: 28, rate: 8.75 },
	{ channel: '카카오톡', visitors: 280, conversions: 31, rate: 11.07 },
	{ channel: '인스타그램', visitors: 210, conversions: 18, rate: 8.57 },
	{ channel: '유튜브', visitors: 180, conversions: 22, rate: 12.22 },
	{ channel: '네이버 블로그', visitors: 95, conversions: 6, rate: 6.32 },
	{ channel: '기타', visitors: 65, conversions: 3, rate: 4.62 },
]

const COLORS = ['#0bb489', '#099970', '#077a58', '#1fbd97', '#56d0b0', '#8de3ca']

function CustomTooltip({ active, payload, label }: any) {
	if (!active || !payload?.length) return null
	return (
		<div className="bg-white border border-border rounded-lg px-3 py-2 text-xs shadow-sm">
			<p className="font-medium text-foreground mb-1">{label}</p>
			<p className="text-muted-foreground">방문자 {payload[0]?.value}명</p>
		</div>
	)
}

export default function MarketingStatsPage() {
	const totalVisitors = dummyChannelStats.reduce((sum, c) => sum + c.visitors, 0)
	const totalConversions = dummyChannelStats.reduce((sum, c) => sum + c.conversions, 0)
	const avgRate = ((totalConversions / totalVisitors) * 100).toFixed(1)

	return (
		<div>
			<PageHeader
				title="유입 통계"
				description="채널별 방문자 수와 수강신청 전환율을 확인해요"
			/>

			{/* 요약 카드 */}
			<div className="grid grid-cols-3 gap-4 mb-6">
				<div className="bg-white rounded-xl border border-border p-4">
					<p className="text-sm text-muted-foreground">전체 방문자</p>
					<p className="text-2xl font-semibold text-foreground mt-1">
						{totalVisitors.toLocaleString()}명
					</p>
				</div>
				<div className="bg-white rounded-xl border border-border p-4">
					<p className="text-sm text-muted-foreground">수강신청 전환</p>
					<p className="text-2xl font-semibold text-brand-600 mt-1">
						{totalConversions}건
					</p>
				</div>
				<div className="bg-white rounded-xl border border-border p-4">
					<p className="text-sm text-muted-foreground">평균 전환율</p>
					<p className="text-2xl font-semibold text-foreground mt-1">
						{avgRate}%
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4 mb-4">

				{/* 채널별 방문자 바 차트 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">채널별 방문자</h2>
					<ResponsiveContainer width="100%" height={220}>
						<BarChart data={dummyChannelStats} layout="vertical" margin={{ left: 0, right: 16 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
							<XAxis
								type="number"
								tick={{ fontSize: 11, fill: '#94a3b8' }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								type="category"
								dataKey="channel"
								tick={{ fontSize: 11, fill: '#94a3b8' }}
								axisLine={false}
								tickLine={false}
								width={70}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Bar dataKey="visitors" radius={[0, 4, 4, 0]}>
								{dummyChannelStats.map((_, i) => (
									<Cell key={i} fill={COLORS[i % COLORS.length]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* 전환율 순위 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">전환율 순위</h2>
					<div className="flex flex-col gap-3">
						{[...dummyChannelStats]
							.sort((a, b) => b.rate - a.rate)
							.map((item, idx) => (
								<div key={item.channel} className="flex items-center gap-3">
									<span className={cn(
										'w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
										idx === 0 ? 'bg-brand-500 text-white' : 'bg-muted text-muted-foreground'
									)}>
										{idx + 1}
									</span>
									<span className="flex-1 text-sm text-foreground">{item.channel}</span>
									<div className="flex items-center gap-2">
										<div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
											<div
												className="h-1.5 bg-brand-500 rounded-full"
												style={{ width: `${(item.rate / 15) * 100}%` }}
											/>
										</div>
										<span className="text-xs font-medium text-foreground w-10 text-right">
											{item.rate}%
										</span>
									</div>
								</div>
							))}
					</div>
				</div>

			</div>

			{/* 채널별 상세 테이블 */}
			<Table>
				<THead>
					<TR>
						<TH>채널</TH>
						<TH>방문자</TH>
						<TH>수강신청</TH>
						<TH>전환율</TH>
						<TH>비중</TH>
					</TR>
				</THead>
				<TBody>
					{dummyChannelStats.map((item) => (
						<TR key={item.channel}>
							<TD className="font-medium">{item.channel}</TD>
							<TD className="text-muted-foreground">{item.visitors.toLocaleString()}명</TD>
							<TD className="text-muted-foreground">{item.conversions}건</TD>
							<TD>
								<span className={cn(
									'font-medium',
									item.rate >= 10 ? 'text-brand-600' : 'text-foreground'
								)}>
									{item.rate}%
								</span>
							</TD>
							<TD>
								<div className="flex items-center gap-2">
									<div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
										<div
											className="h-1.5 bg-brand-500 rounded-full"
											style={{ width: `${(item.visitors / totalVisitors) * 100}%` }}
										/>
									</div>
									<span className="text-xs text-muted-foreground">
										{((item.visitors / totalVisitors) * 100).toFixed(1)}%
									</span>
								</div>
							</TD>
						</TR>
					))}
				</TBody>
			</Table>
		</div>
	)
}