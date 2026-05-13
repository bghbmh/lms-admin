import { useState, useMemo } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import { Table, THead, TBody, TR, TH, TD } from '@/components/common/Table/Table'
import { dummyPayments } from '@/data/payments'
import { dummyCourses } from '@/data/courses'
import { cn } from '@/lib/utils'

// 월별 정산 데이터 계산
const monthlySettlements = [
	{
		id: 'settle-001',
		month: '2025-02',
		revenue: 93100,
		pgFee: 1940,
		platformFee: 4655,
		payoutAmount: 86505,
		paymentCount: 2,
		status: 'paid' as const,
	},
	{
		id: 'settle-002',
		month: '2025-03',
		revenue: 59000,
		pgFee: 1180,
		platformFee: 2950,
		payoutAmount: 54870,
		paymentCount: 1,
		status: 'paid' as const,
	},
	{
		id: 'settle-003',
		month: '2025-04',
		revenue: 1240000,
		pgFee: 24800,
		platformFee: 62000,
		payoutAmount: 1153200,
		paymentCount: 28,
		status: 'pending' as const,
	},
]

const statusConfig = {
	paid: { label: '정산완료', className: 'bg-brand-50 text-brand-700 border-brand-200' },
	pending: { label: '정산예정', className: 'bg-amber-50 text-amber-700 border-amber-200' },
}

export default function SettlementsPage() {
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

	const currentMonthData = monthlySettlements.find(
		(s) => s.month === '2025-04'
	)

	return (
		<div>
			<PageHeader
				title="강사 정산"
				description="월별 정산 내역을 확인해요"
				actions={
					<Button variant="outline" size="sm" className="gap-1 text-xs">
						<Download size={13} />
						내역 다운로드
					</Button>
				}
			/>

			{/* 이번 달 정산 요약 */}
			{currentMonthData && (
				<div className="bg-white rounded-xl border border-brand-200 p-5 mb-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-sm font-semibold text-foreground">
							이번 달 정산 예정
						</h2>
						<span className={cn(
							'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
							statusConfig[currentMonthData.status].className
						)}>
							{statusConfig[currentMonthData.status].label}
						</span>
					</div>

					<div className="grid grid-cols-4 gap-4">
						<div>
							<p className="text-xs text-muted-foreground">총 결제액</p>
							<p className="text-lg font-semibold text-foreground mt-1">
								{currentMonthData.revenue.toLocaleString()}원
							</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">PG 수수료</p>
							<p className="text-lg font-semibold text-destructive mt-1">
								-{currentMonthData.pgFee.toLocaleString()}원
							</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">플랫폼 수수료</p>
							<p className="text-lg font-semibold text-destructive mt-1">
								-{currentMonthData.platformFee.toLocaleString()}원
							</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">정산 예정액</p>
							<p className="text-lg font-semibold text-brand-600 mt-1">
								{currentMonthData.payoutAmount.toLocaleString()}원
							</p>
						</div>
					</div>

					<div className="mt-3 pt-3 border-t border-border">
						<p className="text-xs text-muted-foreground">
							정산 기준일 2025-05-01 · 결제 건수 {currentMonthData.paymentCount}건
						</p>
					</div>
				</div>
			)}

			{/* 월별 정산 내역 */}
			<div className="mb-2">
				<h2 className="text-sm font-semibold text-foreground">월별 정산 내역</h2>
			</div>

			<Table>
				<THead>
					<TR>
						<TH>정산 월</TH>
						<TH>결제 건수</TH>
						<TH>총 결제액</TH>
						<TH>PG 수수료</TH>
						<TH>플랫폼 수수료</TH>
						<TH>정산액</TH>
						<TH>상태</TH>
					</TR>
				</THead>
				<TBody>
					{[...monthlySettlements].reverse().map((item) => (
						<TR key={item.id}>
							<TD className="font-medium">{item.month}</TD>
							<TD className="text-muted-foreground">{item.paymentCount}건</TD>
							<TD>{item.revenue.toLocaleString()}원</TD>
							<TD className="text-destructive">
								-{item.pgFee.toLocaleString()}원
							</TD>
							<TD className="text-destructive">
								-{item.platformFee.toLocaleString()}원
							</TD>
							<TD className="font-semibold text-brand-700">
								{item.payoutAmount.toLocaleString()}원
							</TD>
							<TD>
								<span className={cn(
									'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
									statusConfig[item.status].className
								)}>
									{statusConfig[item.status].label}
								</span>
							</TD>
						</TR>
					))}
				</TBody>
			</Table>

			{/* 결제 건별 상세 */}
			<div className="mt-6 mb-2">
				<h2 className="text-sm font-semibold text-foreground">결제 건별 상세</h2>
			</div>

			<Table>
				<THead>
					<TR>
						<TH>결제일</TH>
						<TH>강의</TH>
						<TH>결제액</TH>
						<TH>PG 수수료</TH>
						<TH>플랫폼 수수료</TH>
						<TH>정산 예정액</TH>
						<TH>정산 상태</TH>
					</TR>
				</THead>
				<TBody>
					{dummyPayments
						.filter((p) => p.status === 'success')
						.map((pay) => {
							const course = dummyCourses.find((c) => {
								return true
							})
							return (
								<TR key={pay.id}>
									<TD className="text-muted-foreground text-sm">
										{pay.paidAt?.slice(0, 10) ?? '-'}
									</TD>
									<TD className="text-sm text-muted-foreground">
										주문번호 {pay.orderId}
									</TD>
									<TD>{pay.amount.toLocaleString()}원</TD>
									<TD className="text-destructive text-sm">
										-{(pay.pgFee ?? 0).toLocaleString()}원
									</TD>
									<TD className="text-destructive text-sm">
										-{(pay.platformFee ?? 0).toLocaleString()}원
									</TD>
									<TD className="font-medium text-brand-700">
										{(pay.payoutAmount ?? 0).toLocaleString()}원
									</TD>
									<TD>
										<span className={cn(
											'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
											pay.payoutStatus === 'paid'
												? statusConfig.paid.className
												: statusConfig.pending.className
										)}>
											{pay.payoutStatus === 'paid' ? '정산완료' : '정산예정'}
										</span>
									</TD>
								</TR>
							)
						})}
				</TBody>
			</Table>
		</div>
	)
}