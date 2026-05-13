import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PageHeader from '@/components/common/PageHeader'
import SearchFilterBar from '@/components/common/SearchFilterBar'
import { Table, THead, TBody, TR, TH, TD } from '@/components/common/Table/Table'
import { dummyCoupons } from '@/data/coupons'
import { cn } from '@/lib/utils'

// 쿠폰 상태 계산
function getCouponStatus(coupon: typeof dummyCoupons[0]) {
	if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return 'expired'
	if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return 'exhausted'
	return 'active'
}

const statusConfig = {
	active: { label: '사용중', className: 'bg-brand-50 text-brand-700 border-brand-200' },
	expired: { label: '기간만료', className: 'bg-gray-100 text-gray-500 border-gray-200' },
	exhausted: { label: '소진됨', className: 'bg-amber-50 text-amber-700 border-amber-200' },
}

export default function CouponsPage() {
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')
	const [isModalOpen, setIsModalOpen] = useState(false)

	// 새 쿠폰 폼 상태
	const [form, setForm] = useState({
		code: '',
		discountType: 'percent' as 'percent' | 'fixed',
		discountValue: '',
		maxUses: '',
		expiresAt: '',
		courseId: '',
	})

	const filtered = useMemo(() => {
		return dummyCoupons.filter((coupon) => {
			const status = getCouponStatus(coupon)
			const matchSearch = coupon.code.toLowerCase().includes(search.toLowerCase())
			const matchStatus = statusFilter === 'all' || status === statusFilter
			return matchSearch && matchStatus
		})
	}, [search, statusFilter])

	const handleFormChange = (key: string, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<div>
			<PageHeader
				title="쿠폰·할인"
				description={`전체 ${filtered.length}개`}
				actions={
					<Button
						size="sm"
						className="bg-brand-500 hover:bg-brand-600 text-white gap-1"
						onClick={() => setIsModalOpen(true)}
					>
						<Plus size={15} />
						쿠폰 만들기
					</Button>
				}
			/>

			<SearchFilterBar
				searchPlaceholder="쿠폰 코드 검색..."
				searchValue={search}
				onSearchChange={setSearch}
				filters={[
					{
						placeholder: '상태',
						value: statusFilter,
						onChange: setStatusFilter,
						options: [
							{ label: '사용중', value: 'active' },
							{ label: '기간만료', value: 'expired' },
							{ label: '소진됨', value: 'exhausted' },
						],
					},
				]}
			/>

			{filtered.length === 0 ? (
				<div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
					쿠폰이 없어요
				</div>
			) : (
				<Table>
					<THead>
						<TR>
							<TH>쿠폰 코드</TH>
							<TH>할인</TH>
							<TH>적용 강의</TH>
							<TH>사용 현황</TH>
							<TH>만료일</TH>
							<TH>상태</TH>
						</TR>
					</THead>
					<TBody>
						{filtered.map((coupon) => {
							const status = getCouponStatus(coupon)
							const config = statusConfig[status]
							const usagePercent = coupon.maxUses
								? Math.round((coupon.usedCount / coupon.maxUses) * 100)
								: null

							return (
								<TR key={coupon.id}>
									{/* 쿠폰 코드 */}
									<TD>
										<span className="font-mono font-semibold text-foreground tracking-wide">
											{coupon.code}
										</span>
									</TD>

									{/* 할인 */}
									<TD>
										<span className="font-medium text-brand-700">
											{coupon.discountType === 'percent'
												? `${coupon.discountValue}%`
												: `${coupon.discountValue.toLocaleString()}원`}
										</span>
										<span className="text-xs text-muted-foreground ml-1">
											{coupon.discountType === 'percent' ? '정률' : '정액'}
										</span>
									</TD>

									{/* 적용 강의 */}
									<TD className="text-muted-foreground text-sm">
										{coupon.courseTitle ?? '전체 강의'}
									</TD>

									{/* 사용 현황 */}
									<TD>
										<div className="flex flex-col gap-1">
											<span className="text-sm text-foreground">
												{coupon.usedCount}
												{coupon.maxUses ? ` / ${coupon.maxUses}건` : '건 사용'}
											</span>
											{usagePercent !== null && (
												<div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
													<div
														className={cn(
															'h-1 rounded-full',
															usagePercent >= 100
																? 'bg-destructive'
																: usagePercent >= 80
																	? 'bg-amber-500'
																	: 'bg-brand-500'
														)}
														style={{ width: `${Math.min(usagePercent, 100)}%` }}
													/>
												</div>
											)}
										</div>
									</TD>

									{/* 만료일 */}
									<TD className="text-muted-foreground text-sm">
										{coupon.expiresAt ? coupon.expiresAt.slice(0, 10) : '무기한'}
									</TD>

									{/* 상태 */}
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

			{/* 쿠폰 생성 모달 */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>쿠폰 만들기</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col gap-4 mt-2">
						{/* 쿠폰 코드 */}
						<div className="flex flex-col gap-1.5">
							<Label>쿠폰 코드</Label>
							<Input
								placeholder="SPRING2025"
								value={form.code}
								onChange={(e) => handleFormChange('code', e.target.value.toUpperCase())}
								className="font-mono"
							/>
						</div>

						{/* 할인 유형 + 값 */}
						<div className="flex gap-2">
							<div className="flex flex-col gap-1.5 w-32 shrink-0">
								<Label>할인 유형</Label>
								<Select
									value={form.discountType}
									onValueChange={(v) => handleFormChange('discountType', v)}
								>
									<SelectTrigger className="h-9">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="percent">정률 (%)</SelectItem>
										<SelectItem value="fixed">정액 (원)</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-1.5 flex-1">
								<Label>할인 값</Label>
								<div className="relative">
									<Input
										type="number"
										placeholder={form.discountType === 'percent' ? '20' : '5000'}
										value={form.discountValue}
										onChange={(e) => handleFormChange('discountValue', e.target.value)}
										className="pr-8"
									/>
									<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
										{form.discountType === 'percent' ? '%' : '원'}
									</span>
								</div>
							</div>
						</div>

						{/* 최대 사용 횟수 */}
						<div className="flex flex-col gap-1.5">
							<Label>최대 사용 횟수</Label>
							<Input
								type="number"
								placeholder="비워두면 무제한"
								value={form.maxUses}
								onChange={(e) => handleFormChange('maxUses', e.target.value)}
							/>
						</div>

						{/* 만료일 */}
						<div className="flex flex-col gap-1.5">
							<Label>만료일</Label>
							<Input
								type="date"
								value={form.expiresAt}
								onChange={(e) => handleFormChange('expiresAt', e.target.value)}
							/>
						</div>

						{/* 버튼 */}
						<div className="flex justify-end gap-2 mt-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsModalOpen(false)}
							>
								취소
							</Button>
							<Button
								size="sm"
								className="bg-brand-500 hover:bg-brand-600 text-white"
								disabled={!form.code || !form.discountValue}
							>
								쿠폰 생성
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}