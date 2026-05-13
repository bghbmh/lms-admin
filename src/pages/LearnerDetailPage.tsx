import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, BookOpen, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import PageHeader from '@/components/common/PageHeader'
import { Table, THead, TBody, TR, TH, TD } from '@/components/common/Table/Table'
import { dummyUsers } from '@/data/users'
import { dummyEnrollments } from '@/data/enrollments'
import { dummyPayments } from '@/data/payments'
import { cn } from '@/lib/utils'

export default function LearnerDetailPage() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	const learner = dummyUsers.find((u) => u.id === id)

	if (!learner) {
		return (
			<div className="flex flex-col items-center justify-center h-64 gap-4">
				<p className="text-muted-foreground">수강생을 찾을 수 없어요</p>
				<Button variant="outline" size="sm" onClick={() => navigate('/learners')}>
					수강생 목록으로
				</Button>
			</div>
		)
	}

	const enrollments = dummyEnrollments.filter((e) => e.learnerId === learner.id)
	const payments = dummyPayments.filter((p) => p.learnerId === learner.id)
	const totalPaid = payments
		.filter((p) => p.status === 'success')
		.reduce((sum, p) => sum + p.amount, 0)

	const statusConfig = {
		active: { label: '수강중', className: 'bg-brand-50 text-brand-700 border-brand-200' },
		completed: { label: '수료', className: 'bg-blue-50 text-blue-700 border-blue-200' },
		refunded: { label: '환불', className: 'bg-gray-100 text-gray-500 border-gray-200' },
	}

	return (
		<div>
			<PageHeader
				title="수강생 상세"
				actions={
					<Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/learners')}>
						<ArrowLeft size={13} />
						목록
					</Button>
				}
			/>

			<div className="flex flex-col gap-5">

				{/* 수강생 프로필 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<div className="flex items-start gap-4">
						<Avatar className="w-14 h-14 shrink-0">
							<AvatarFallback className="bg-brand-50 text-brand-700 text-lg font-semibold">
								{learner.name.slice(0, 2)}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<h2 className="text-lg font-semibold text-foreground">{learner.name}</h2>
							<div className="flex items-center gap-4 mt-1">
								<span className="flex items-center gap-1.5 text-sm text-muted-foreground">
									<Mail size={13} />
									{learner.email}
								</span>
								{learner.phone && (
									<span className="flex items-center gap-1.5 text-sm text-muted-foreground">
										<Phone size={13} />
										{learner.phone}
									</span>
								)}
							</div>
							<div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
								<span>가입일 {learner.createdAt.slice(0, 10)}</span>
								{learner.lastLoginAt && (
									<span>최근 접속 {learner.lastLoginAt.slice(0, 10)}</span>
								)}
							</div>
						</div>

						{/* 요약 통계 */}
						<div className="flex gap-6 shrink-0">
							<div className="text-center">
								<p className="text-2xl font-semibold text-foreground">{enrollments.length}</p>
								<p className="text-xs text-muted-foreground mt-0.5">수강 강의</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-semibold text-brand-600">
									{enrollments.filter((e) => e.status === 'completed').length}
								</p>
								<p className="text-xs text-muted-foreground mt-0.5">수료 완료</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-semibold text-foreground">
									{totalPaid.toLocaleString()}원
								</p>
								<p className="text-xs text-muted-foreground mt-0.5">총 결제액</p>
							</div>
						</div>
					</div>
				</div>

				{/* 수강 내역 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">수강 내역</h2>
					{enrollments.length === 0 ? (
						<p className="text-sm text-muted-foreground">수강 내역이 없어요</p>
					) : (
						<Table>
							<THead>
								<TR>
									<TH>강의</TH>
									<TH>수강신청일</TH>
									<TH>진도율</TH>
									<TH>상태</TH>
								</TR>
							</THead>
							<TBody>
								{enrollments.map((enrollment) => {
									const config = statusConfig[enrollment.status]
									return (
										<TR key={enrollment.id}>
											<TD>
												<div className="flex items-center gap-2">
													<BookOpen size={13} className="text-muted-foreground shrink-0" />
													<span className="text-sm font-medium text-foreground">
														{enrollment.courseTitle}
													</span>
												</div>
											</TD>
											<TD className="text-muted-foreground text-sm">
												{enrollment.enrolledAt.slice(0, 10)}
											</TD>
											<TD>
												<div className="flex items-center gap-2">
													<div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
														<div
															className={cn(
																'h-1.5 rounded-full',
																enrollment.progress === 100 ? 'bg-blue-500' : 'bg-brand-500'
															)}
															style={{ width: `${enrollment.progress ?? 0}%` }}
														/>
													</div>
													<span className="text-xs text-muted-foreground">
														{enrollment.progress ?? 0}%
													</span>
												</div>
											</TD>
											<TD>
												<span className={cn(
													'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
													config.className
												)}>
													{config.label}
												</span>
											</TD>
										</TR>
									)
								})}
							</TBody>
						</Table>
					)}
				</div>

				{/* 결제 내역 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-4">결제 내역</h2>
					{payments.length === 0 ? (
						<p className="text-sm text-muted-foreground">결제 내역이 없어요</p>
					) : (
						<Table>
							<THead>
								<TR>
									<TH>주문번호</TH>
									<TH>결제일</TH>
									<TH>금액</TH>
									<TH>상태</TH>
								</TR>
							</THead>
							<TBody>
								{payments.map((payment) => (
									<TR key={payment.id}>
										<TD className="font-mono text-xs text-muted-foreground">
											{payment.orderId}
										</TD>
										<TD className="text-sm text-muted-foreground">
											{payment.paidAt?.slice(0, 10) ?? '-'}
										</TD>
										<TD className="font-medium">
											{payment.amount.toLocaleString()}원
										</TD>
										<TD>
											<span className={cn(
												'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
												payment.status === 'success'
													? 'bg-brand-50 text-brand-700 border-brand-200'
													: 'bg-destructive/10 text-destructive border-destructive/20'
											)}>
												{payment.status === 'success' ? '결제완료' : '환불'}
											</span>
										</TD>
									</TR>
								))}
							</TBody>
						</Table>
					)}
				</div>

			</div>
		</div>
	)
}