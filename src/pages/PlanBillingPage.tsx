import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import { Table, THead, TBody, TR, TH, TD } from '@/components/common/Table/Table'
import { cn } from '@/lib/utils'

const dummyBillings = [
	{ id: 'bill-001', date: '2025-04-01', plan: '스타터', amount: 29000, status: 'paid' as const },
	{ id: 'bill-002', date: '2025-03-01', plan: '스타터', amount: 29000, status: 'paid' as const },
	{ id: 'bill-003', date: '2025-02-01', plan: '스타터', amount: 29000, status: 'paid' as const },
	{ id: 'bill-004', date: '2025-01-01', plan: '프리', amount: 0, status: 'free' as const },
]

const statusConfig = {
	paid: { label: '결제완료', className: 'bg-brand-50 text-brand-700 border-brand-200' },
	free: { label: '무료', className: 'bg-gray-100 text-gray-500 border-gray-200' },
	failed: { label: '결제실패', className: 'bg-destructive/10 text-destructive border-destructive/20' },
}

export default function PlanBillingPage() {
	return (
		<div>
			<PageHeader title="결제 내역" description="플랜 구독 결제 내역을 확인해요" />

			<div className="flex flex-col gap-5">

				{/* 다음 결제 안내 */}
				<div className="bg-white rounded-xl border border-brand-200 p-5">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-semibold text-foreground">다음 결제 예정</p>
							<p className="text-2xl font-bold text-foreground mt-1">29,000원</p>
							<p className="text-xs text-muted-foreground mt-1">
								2025-05-01 · 스타터 플랜 · 카드 자동결제
							</p>
						</div>
						<Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
							구독 취소
						</Button>
					</div>
				</div>

				{/* 결제 내역 테이블 */}
				<Table>
					<THead>
						<TR>
							<TH>결제일</TH>
							<TH>플랜</TH>
							<TH>금액</TH>
							<TH>상태</TH>
							<TH className="text-right">영수증</TH>
						</TR>
					</THead>
					<TBody>
						{dummyBillings.map((bill) => {
							const config = statusConfig[bill.status]
							return (
								<TR key={bill.id}>
									<TD className="text-muted-foreground">{bill.date}</TD>
									<TD className="font-medium">{bill.plan} 플랜</TD>
									<TD>
										{bill.amount === 0 ? (
											<span className="text-muted-foreground">-</span>
										) : (
											`${bill.amount.toLocaleString()}원`
										)}
									</TD>
									<TD>
										<span
											className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border'
												, config.className)}>
											{config.label}
										</span>
									</TD>
									<TD className="text-right">
										{bill.amount > 0 && (
											<Button variant="outline" size="sm" className="gap-1 text-xs h-7">
												<Download size={11} />
												영수증
											</Button>
										)}
									</TD>
								</TR>
							)
						})}
					</TBody>
				</Table>

			</div>
		</div>
	)
}