import {
	AreaChart, Area, BarChart, Bar,
	XAxis, YAxis, CartesianGrid, Tooltip,
	ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Users, CreditCard, ArrowDownLeft } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import { dummyMonthlyRevenue, dummyCourseRevenue, dummyRecentPayments } from '@/data/revenue'
import { cn } from '@/lib/utils'
import { Table, THead, TBody, TR, TH, TD } from '@/components/common/Table/Table'

// 통계 카드
const stats = [
	{
		label: '이번 달 매출',
		value: '1,240,000원',
		sub: '지난달 대비 +72%',
		icon: <TrendingUp size={18} className="text-brand-500" />,
		positive: true,
	},
	{
		label: '이번 달 수강신청',
		value: '28건',
		sub: '지난달 대비 +56%',
		icon: <Users size={18} className="text-brand-500" />,
		positive: true,
	},
	{
		label: '누적 매출',
		value: '3,710,000원',
		sub: '전체 기간',
		icon: <CreditCard size={18} className="text-brand-500" />,
	},
	{
		label: '이번 달 환불',
		value: '49,000원',
		sub: '1건',
		icon: <ArrowDownLeft size={18} className="text-destructive" />,
		negative: true,
	},
]

// 커스텀 툴팁
function CustomTooltip({ active, payload, label }: any) {
	if (!active || !payload?.length) return null
	return (
		<div className="bg-white border border-border rounded-lg px-3 py-2 text-xs shadow-sm">
			<p className="font-medium text-foreground mb-1">{label}</p>
			{payload.map((p: any) => (
				<p key={p.name} style={{ color: p.color }}>
					{p.name === 'revenue'
						? `매출 ${p.value.toLocaleString()}원`
						: `수강신청 ${p.value}건`}
				</p>
			))}
		</div>
	)
}

export default function RevenuePage() {
	return (
		<div>
			<PageHeader
				title="매출 통계"
				description="강의 매출과 수강신청 현황을 확인해요"
			/>

			{/* 통계 카드 */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				{stats.map((stat) => (
					<div key={stat.label} className="bg-white rounded-xl border border-border p-4">
						<div className="flex items-center justify-between mb-3">
							<span className="text-sm text-muted-foreground">{stat.label}</span>
							<div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
								{stat.icon}
							</div>
						</div>
						<p className={cn(
							'text-2xl font-semibold',
							stat.negative ? 'text-destructive' : 'text-foreground'
						)}>
							{stat.value}
						</p>
						<p className={cn(
							'text-xs mt-0.5',
							stat.positive ? 'text-brand-600' : 'text-muted-foreground'
						)}>
							{stat.sub}
						</p>
					</div>
				))}
			</div>

			<div className="grid grid-cols-3 gap-4 mb-4">

				{/* 월별 매출 그래프 */}
				<div className="col-span-2 bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">월별 매출 추이</h2>
					<ResponsiveContainer width="100%" height={220}>
						<AreaChart data={dummyMonthlyRevenue}>
							<defs>
								<linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#0bb489" stopOpacity={0.15} />
									<stop offset="95%" stopColor="#0bb489" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
							<XAxis
								dataKey="month"
								tick={{ fontSize: 12, fill: '#94a3b8' }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								tick={{ fontSize: 11, fill: '#94a3b8' }}
								axisLine={false}
								tickLine={false}
								tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Area
								type="monotone"
								dataKey="revenue"
								stroke="#0bb489"
								strokeWidth={2}
								fill="url(#revenueGradient)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>

				{/* 강의별 매출 바 차트 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">강의별 매출</h2>
					<ResponsiveContainer width="100%" height={220}>
						<BarChart
							data={dummyCourseRevenue}
							layout="vertical"
							margin={{ left: 0, right: 16 }}
						>
							<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
							<XAxis
								type="number"
								tick={{ fontSize: 11, fill: '#94a3b8' }}
								axisLine={false}
								tickLine={false}
								tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
							/>
							<YAxis
								type="category"
								dataKey="courseTitle"
								tick={{ fontSize: 11, fill: '#94a3b8' }}
								axisLine={false}
								tickLine={false}
								width={80}
								tickFormatter={(v) => v.length > 6 ? v.slice(0, 6) + '...' : v}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Bar dataKey="revenue" fill="#0bb489" radius={[0, 4, 4, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* 최근 결제 내역 */}
			<div className="bg-white rounded-xl border border-border p-5">
				<h2 className="text-sm font-semibold text-foreground mb-4">최근 결제 내역</h2>
				<Table>
					<THead>
						<TR>
							<TH>수강생</TH>
							<TH>강의</TH>
							<TH>결제일</TH>
							<TH>금액</TH>
							<TH>상태</TH>
						</TR>
					</THead>
					<TBody>
						{dummyRecentPayments.map((pay) => (
							<TR key={pay.id}>
								<TD className="font-medium">{pay.learnerName}</TD>
								<TD className="text-muted-foreground max-w-[200px] truncate">
									{pay.courseTitle}
								</TD>
								<TD className="text-muted-foreground">
									{pay.paidAt.slice(0, 10)}
								</TD>
								<TD className="font-medium">
									{pay.amount.toLocaleString()}원
								</TD>
								<TD>
									<span className={cn(
										'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
										pay.status === 'success'
											? 'bg-brand-50 text-brand-700 border-brand-200'
											: 'bg-destructive/10 text-destructive border-destructive/20'
									)}>
										{pay.status === 'success' ? '결제완료' : '환불'}
									</span>
								</TD>
							</TR>
						))}
					</TBody>
				</Table>
			</div>
		</div>
	)
}